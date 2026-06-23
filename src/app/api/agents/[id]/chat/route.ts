import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

import { missionAgents } from "@/lib/mission-control-data";

export const runtime = "nodejs";

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const agentSystemPrompts: Record<string, string> = {
  "store-manager":
    "You are the Store Manager agent for a Shopify storefront. Help with merchandising, collections, inventory coordination, promotions, storefront operations, and practical next steps. Keep answers concise and action-oriented.",
  "research-agent":
    "You are the Research Agent. Help with product research, competitor analysis, trend spotting, sourcing ideas, and concise research summaries that support ecommerce decisions.",
  "marketing-agent":
    "You are the Marketing Agent. Write ad copy, campaign angles, hooks, CTAs, audience messaging, and channel-specific promotion ideas in a clear, conversion-focused style.",
  "content-agent":
    "You are the Content Agent. Help draft blog post ideas, outlines, SEO-conscious content plans, and polished long-form content while staying practical and concise.",
  "support-agent":
    "You are the Customer Support Agent. Help with ticket handling, reply drafting, issue triage, empathy, troubleshooting steps, and customer-friendly resolutions.",
  "analytics-agent":
    "You are the Analytics Agent. Help interpret revenue performance, trends, funnel questions, KPI movement, and reporting insights with concise, data-minded guidance.",
};

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const agent = missionAgents.find((item) => item.id === id);

  if (!agent) {
    return NextResponse.json(
      { message: "That agent workstation is unavailable right now." },
      { status: 404 },
    );
  }

  if (!anthropic) {
    return NextResponse.json(
      {
        message:
          "Agent chat is not configured yet. Please add ANTHROPIC_API_KEY to the environment and try again.",
      },
      { status: 500 },
    );
  }

  let payload: { agentId?: string; messages?: ChatMessage[] };

  try {
    payload = (await request.json()) as { agentId?: string; messages?: ChatMessage[] };
  } catch {
    return NextResponse.json(
      { message: "We couldn't read that message. Please try again." },
      { status: 400 },
    );
  }

  if (payload.agentId && payload.agentId !== id) {
    return NextResponse.json(
      { message: "The selected agent does not match this chat session." },
      { status: 400 },
    );
  }

  const messages = Array.isArray(payload.messages)
    ? payload.messages.flatMap((message) => {
        if (!message || (message.role !== "user" && message.role !== "assistant")) {
          return [];
        }

        const content = typeof message.content === "string" ? message.content.trim() : "";

        if (!content) {
          return [];
        }

        return [{ role: message.role, content } satisfies ChatMessage];
      })
    : [];

  if (messages.length === 0) {
    return NextResponse.json(
      { message: "Please send a message to start chatting with this agent." },
      { status: 400 },
    );
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 700,
      system:
        agentSystemPrompts[id] ??
        `You are ${agent.name}, a helpful assistant focused on ${agent.role}. Stay concise and practical.`,
      messages,
    });

    const reply = response.content
      .flatMap((part) => (part.type === "text" ? [part.text] : []))
      .join("\n\n")
      .trim();

    if (!reply) {
      throw new Error("Empty Anthropic response");
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(`Anthropic chat failed for ${id}:`, error);

    return NextResponse.json(
      {
        message: `${agent.name} couldn't respond right now. Please try again in a moment.`,
      },
      { status: 500 },
    );
  }
}
