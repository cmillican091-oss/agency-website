export type AgentStatus = "Working" | "Waiting" | "Error" | "Complete";

export interface AgentLog {
  time: string;
  level: "info" | "success" | "warning" | "error";
  message: string;
}

export interface AgentHistory {
  time: string;
  label: string;
}

export interface AgentRecord {
  id: string;
  name: string;
  role: string;
  currentTask: string;
  status: AgentStatus;
  revenueGenerated: number;
  room: string;
  floor: number;
  zone: string;
  efficiency: number;
  model: string;
  integrations: string[];
  queue: string[];
  logs: AgentLog[];
  history: AgentHistory[];
}

export interface FeedItem {
  id: string;
  source: string;
  message: string;
  timestamp: string;
  tone: "info" | "success" | "warning";
}

export interface QueueItem {
  id: string;
  title: string;
  owner: string;
  priority: "Critical" | "High" | "Medium";
  progress: number;
  status: "Queued" | "Running" | "Complete";
  eta: string;
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info";
  time: string;
}

export interface HealthMetric {
  label: string;
  value: number;
  detail: string;
  status: "Optimal" | "Watch" | "Critical";
}

export interface IntegrationNode {
  name: string;
  latency: string;
  sync: string;
  status: "Connected" | "Warm" | "Delayed";
  note: string;
}

export interface OrchestrationFlow {
  id: string;
  label: string;
  description: string;
  agents: string[];
  completion: number;
}

export const revenueTrend = [
  { label: "Mon", revenue: 0, pipeline: 0 },
  { label: "Tue", revenue: 0, pipeline: 0 },
  { label: "Wed", revenue: 0, pipeline: 0 },
  { label: "Thu", revenue: 0, pipeline: 0 },
  { label: "Fri", revenue: 0, pipeline: 0 },
  { label: "Sat", revenue: 0, pipeline: 0 },
  { label: "Sun", revenue: 0, pipeline: 0 },
  ];

const makeAgent = (id: string, name: string, role: string, room: string, floor: number, zone: string): AgentRecord => ({
  id,
  name,
  role,
  currentTask: "Not connected yet",
  status: "Waiting",
  revenueGenerated: 0,
  room,
  floor,
  zone,
  efficiency: 0,
  model: "Not connected",
  integrations: [],
  queue: [],
  logs: [],
  history: [],
});

export const missionAgents: AgentRecord[] = [
  makeAgent("store-manager", "Store Manager", "Shopify management", "F3-A1", 3, "Commerce Core"),
  makeAgent("research-agent", "Research Agent", "Product research", "F3-A2", 3, "Commerce Core"),
  makeAgent("marketing-agent", "Marketing Agent", "Ad copy", "F2-B1", 2, "Growth Wing"),
  makeAgent("content-agent", "Content Agent", "Blog posts", "F2-B2", 2, "Growth Wing"),
  makeAgent("support-agent", "Customer Support Agent", "Ticket handling", "F1-C1", 1, "Secure Zone"),
  makeAgent("analytics-agent", "Analytics Agent", "Revenue tracking", "F1-C2", 1, "Secure Zone"),
  ];

export const activityFeed: FeedItem[] = [];

export const taskQueue: QueueItem[] = [];

export const systemAlerts: AlertItem[] = [];

export const vpsHealth: HealthMetric[] = [
  { label: "CPU Load", value: 0, detail: "Idle", status: "Optimal" },
  { label: "Memory", value: 0, detail: "Idle", status: "Optimal" },
  { label: "Disk", value: 0, detail: "Idle", status: "Optimal" },
  { label: "Network", value: 0, detail: "Idle", status: "Optimal" },
  ];

export const integrationNodes: IntegrationNode[] = [
  { name: "Claude Code", latency: "-", sync: "Not connected", status: "Delayed", note: "Not configured yet" },
  { name: "OpenClaw", latency: "-", sync: "Not connected", status: "Delayed", note: "Not configured yet" },
  { name: "Shopify", latency: "-", sync: "Not connected", status: "Delayed", note: "Not configured yet" },
  ];

export const orchestrationFlows: OrchestrationFlow[] = [];

export const missionSummary = {
  totalRevenue: 0,
  activeAgents: 0,
  tasksRunning: 0,
  currentModel: "Not connected",
  uptime: "0m",
};
