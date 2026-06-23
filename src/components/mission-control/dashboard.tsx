"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Building2,
  CircleAlert,
  CircleCheckBig,
  Cpu,
  DatabaseZap,
  Layers2,
  Menu,
  Radar,
  RefreshCcw,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Tickets,
  Workflow,
} from "lucide-react";
import {
  activityFeed,
  integrationNodes,
  missionAgents,
  missionSummary,
  orchestrationFlows,
  revenueTrend,
  systemAlerts,
  taskQueue,
  vpsHealth,
  type AgentRecord,
  type AgentStatus,
} from "@/lib/mission-control-data";
import { cn, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RevenuePanelCharts = dynamic(
  () => import("./revenue-charts").then((module) => module.RevenuePanelCharts),
  {
    ssr: false,
    loading: () => (
      <>
        <div className="h-[280px] rounded-[24px] border border-white/8 bg-black/20 p-3">
          <div className="flex h-full items-end gap-3">
            {revenueTrend.map((item) => (
              <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-cyan-500/20 to-cyan-300/70"
                  style={{ height: `${item.revenue / 120}px` }}
                />
                <span className="font-mono text-xs text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
              Weekly Uplift
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-50">0.0%</p>
            <p className="mt-1 text-sm text-slate-400">No revenue data yet.</p>
          </div>
          <div className="h-[170px] rounded-[24px] border border-white/8 bg-black/20 p-3">
            <div className="flex h-full items-end gap-3">
              {revenueTrend.map((item) => (
                <div key={item.label} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <div
                    className="w-full rounded-t-2xl bg-gradient-to-t from-violet-500/30 to-violet-300/80"
                    style={{ height: `${item.pipeline * 7}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    ),
  },
);

const statusVariant: Record<
  AgentStatus,
  "default" | "secondary" | "warning" | "destructive" | "success"
> = {
  Working: "default",
  Waiting: "secondary",
  Error: "destructive",
  Complete: "success",
};

const sidebarSections = [
  {
    label: "Mission Control",
    items: ["Operations Grid", "Agent Rooms", "Revenue Core", "System Alerts"],
  },
  {
    label: "Orchestration",
    items: ["Claude Code", "OpenClaw", "Task Mesh", "VPS Sentinel"],
  },
  {
    label: "Quick Actions",
    items: ["Dispatch Task", "Promote Build", "Open Logs", "Failover Runbook"],
  },
];

const pulseClasses: Record<AgentStatus, string> = {
  Working: "bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.85)]",
  Waiting: "bg-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.7)]",
  Error: "bg-rose-400 shadow-[0_0_14px_rgba(251,113,133,0.85)]",
  Complete: "bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.85)]",
};

function DashboardSidebar() {
  return (
    <div className="flex h-full flex-col gap-6">
      <div className="space-y-3">
        <Badge className="w-fit" variant="secondary">
          Mission Control
        </Badge>
        <div>
          <h1 className="text-3xl font-semibold tracking-[0.24em] text-slate-50 uppercase">
            AI OPS CENTER
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Autonomous command deck for agent orchestration, revenue tracking, and infrastructure
            health.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {sidebarSections.map((section) => (
          <Card key={section.label} className="glass-border rounded-3xl">
            <CardHeader className="pb-3">
              <CardDescription className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                {section.label}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {section.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
                >
                  <span>{item}</span>
                  <ArrowUpRight className="size-4 text-cyan-300" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: typeof Sparkles;
}) {
  return (
    <Card className="glass-border rounded-[24px]">
      <CardContent className="flex items-center justify-between gap-4 px-5 py-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">{value}</p>
          <p className="mt-1 text-sm text-slate-400">{helper}</p>
        </div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-200">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: AgentStatus }) {
  return (
    <Badge variant={statusVariant[status]} className="gap-2 px-3 py-1">
      <span className={cn("size-1.5 rounded-full", pulseClasses[status])} />
      {status}
    </Badge>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.02] p-6">
      <p className="text-sm font-semibold text-slate-100">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function AgentDetailSheet({
  agent,
  open,
  onOpenChange,
}: {
  agent?: AgentRecord;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  if (!agent) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-2xl border-l border-white/10">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">{agent.room}</Badge>
            <StatusBadge status={agent.status} />
          </div>
          <SheetTitle>{agent.name}</SheetTitle>
          <SheetDescription>
            {agent.role} • {agent.zone} • {agent.model}
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-3xl">
            <CardContent className="px-5 py-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
                Revenue
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-50">
                {formatCurrency(agent.revenueGenerated)}
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl">
            <CardContent className="px-5 py-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
                Efficiency
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-50">{agent.efficiency}%</p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl">
            <CardContent className="px-5 py-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
                Integrations
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-50">{agent.integrations.length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="logs">
          <TabsList className="w-fit">
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="queue">Queue</TabsTrigger>
          </TabsList>

          <TabsContent value="logs">
            <Card className="rounded-3xl">
              <CardContent className="pt-6">
                <ScrollArea className="h-[320px] pr-4">
                  {agent.logs.length > 0 ? (
                    <div className="space-y-3">
                      {agent.logs.map((log) => (
                        <div
                          key={`${log.time}-${log.message}`}
                          className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <Badge
                              variant={
                                log.level === "error"
                                  ? "destructive"
                                  : log.level === "warning"
                                    ? "warning"
                                    : log.level === "success"
                                      ? "success"
                                      : "secondary"
                              }
                            >
                              {log.level}
                            </Badge>
                            <span className="font-mono text-xs text-slate-400">{log.time}</span>
                          </div>
                          <p className="mt-3 text-sm text-slate-200">{log.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      title="No logs yet"
                      description="This workstation has not reported any activity yet."
                    />
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="rounded-3xl">
              <CardContent className="pt-6">
                {agent.history.length > 0 ? (
                  <div className="space-y-3">
                    {agent.history.map((item) => (
                      <div
                        key={`${item.time}-${item.label}`}
                        className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
                      >
                        <CircleCheckBig className="mt-0.5 size-4 text-emerald-300" />
                        <div className="space-y-1">
                          <p className="text-sm text-slate-100">{item.label}</p>
                          <p className="font-mono text-xs text-slate-400">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No history yet"
                    description="Completed milestones will appear here once this workstation starts running."
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queue">
            <Card className="rounded-3xl">
              <CardContent className="space-y-3 pt-6">
                {agent.queue.length > 0 ? (
                  agent.queue.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-200"
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <EmptyState
                    title="No queued tasks"
                    description="New assignments will show up here after the workstation is connected."
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

function RevenuePanel() {
  return (
    <Card className="glass-border scanline relative overflow-hidden rounded-[30px]">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardDescription className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
              Revenue Analytics
            </CardDescription>
            <CardTitle>Mission Revenue Grid</CardTitle>
          </div>
          <Badge>Data Feed</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_280px]">
        <RevenuePanelCharts />
      </CardContent>
    </Card>
  );
}

export function MissionControlDashboard() {
  const agents = missionAgents;
  const queue = taskQueue;
  const feed = activityFeed;
  const alerts = systemAlerts;
  const [selectedAgentId, setSelectedAgentId] = useState(missionAgents[0]?.id);
  const [detailOpen, setDetailOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const selectedAgent = useMemo(
    () => agents.find((agent) => agent.id === selectedAgentId) ?? agents[0],
    [agents, selectedAgentId],
  );

  const metrics = useMemo(() => {
    const totalRevenue = agents.reduce((sum, agent) => sum + agent.revenueGenerated, 0);
    const activeAgents = agents.filter((agent) => agent.status === "Working").length;
    const runningTasks = queue.filter((item) => item.status === "Running").length;

    return {
      totalRevenue: formatCurrency(totalRevenue),
      activeAgents: String(activeAgents),
      runningTasks: String(runningTasks),
      currentModel: missionSummary.currentModel,
      uptime: missionSummary.uptime,
    };
  }, [agents, queue]);

  const groupedFloors = useMemo(
    () =>
      [...agents]
        .sort((left, right) => right.floor - left.floor)
        .reduce<Record<number, AgentRecord[]>>((accumulator, agent) => {
          accumulator[agent.floor] = [...(accumulator[agent.floor] ?? []), agent];
          return accumulator;
        }, {}),
    [agents],
  );
  const networkMetric = vpsHealth.find((metric) => metric.label.toLowerCase().includes("network"));
  const packetLoss = `${networkMetric?.value ?? 0}%`;
  const failoverReadiness =
    vpsHealth.length > 0
      ? `${Math.round(vpsHealth.reduce((sum, metric) => sum + metric.value, 0) / vpsHealth.length)}%`
      : "0%";

  return (
    <main id="main-content" className="min-h-screen overflow-hidden bg-[#030712] text-slate-50">
      <div className="mission-grid min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-[1800px] flex-col gap-6 px-4 py-4 md:px-6 xl:px-8">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="xl:hidden">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-sm">
                  <DashboardSidebar />
                </SheetContent>
              </Sheet>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cyan-200/80">
                  Mission Control
                </p>
                <h2 className="text-2xl font-semibold uppercase tracking-[0.16em] md:text-3xl">
                  AI Operations Center
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Awaiting sync</Badge>
              <Button variant="secondary">
                <RefreshCcw className="size-4" />
                Resync mesh
              </Button>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <MetricCard label="Total Revenue" value={metrics.totalRevenue} helper="Attributed revenue" icon={DatabaseZap} />
            <MetricCard label="Active Agents" value={metrics.activeAgents} helper="Working rooms online" icon={Bot} />
            <MetricCard label="Tasks Running" value={metrics.runningTasks} helper="Parallel workflows in flight" icon={Workflow} />
            <MetricCard label="Current Model" value={metrics.currentModel} helper="Primary orchestration stack" icon={BrainCircuit} />
            <MetricCard label="Uptime" value={metrics.uptime} helper="Cluster mission runtime" icon={ServerCog} />
          </section>

          <div className="grid flex-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
            <aside className="hidden xl:block">
              <DashboardSidebar />
            </aside>

            <section className="grid gap-6">
              <Card className="glass-border scanline relative overflow-hidden rounded-[34px]">
                <CardHeader>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardDescription className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                        Building View
                      </CardDescription>
                      <CardTitle>Agent Workstations</CardTitle>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{agents.length} Rooms Online</Badge>
                      <Badge>Multi-agent orchestration</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/20 p-4 md:p-6">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%)]" />
                    <div className="grid gap-4">
                      {Object.entries(groupedFloors).map(([floor, floorAgents]) => (
                        <motion.div
                          key={floor}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                          className="rounded-[28px] border border-white/10 bg-slate-950/55 p-4"
                        >
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">Floor {floor}</Badge>
                              <span className="font-mono text-xs uppercase tracking-[0.28em] text-slate-400">
                                Secure Zone
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Building2 className="size-4 text-cyan-300" />
                              Digital office cluster
                            </div>
                          </div>
                          <div className="grid gap-4 md:grid-cols-2">
                            {floorAgents.map((agent) => (
                              <motion.button
                                key={agent.id}
                                whileHover={{ y: -3 }}
                                onClick={() => {
                                  setSelectedAgentId(agent.id);
                                  setDetailOpen(true);
                                }}
                                className={cn(
                                  "glass-border rounded-[24px] border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-cyan-300/40 hover:bg-white/[0.05]",
                                  selectedAgentId === agent.id && "border-cyan-300/40 bg-cyan-400/[0.06]",
                                )}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
                                      {agent.room}
                                    </p>
                                    <h3 className="mt-2 text-xl font-semibold text-slate-50">{agent.name}</h3>
                                    <p className="text-sm text-cyan-200">{agent.role}</p>
                                  </div>
                                  <StatusBadge status={agent.status} />
                                </div>
                                <p className="mt-4 text-sm leading-6 text-slate-300">{agent.currentTask}</p>
                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                  <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
                                      Revenue
                                    </p>
                                    <p className="mt-1 text-lg font-semibold text-slate-50">
                                      {formatCurrency(agent.revenueGenerated)}
                                    </p>
                                  </div>
                                  <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
                                      Efficiency
                                    </p>
                                    <p className="mt-1 text-lg font-semibold text-slate-50">{agent.efficiency}%</p>
                                  </div>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
                <RevenuePanel />

                <Card className="glass-border rounded-[30px]">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <CardDescription className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                          Task Queue
                        </CardDescription>
                        <CardTitle>Task Queue Manager</CardTitle>
                      </div>
                      <Badge variant="secondary">
                        <Tickets className="mr-1 size-3.5" />
                        {queue.length} tasks
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                   {queue.length > 0 ? (
                     queue.map((item) => (
                       <div
                         key={item.id}
                         className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                       >
                         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                           <div>
                             <div className="flex items-center gap-2">
                               <Badge
                                 variant={
                                   item.priority === "Critical"
                                     ? "destructive"
                                     : item.priority === "High"
                                       ? "warning"
                                       : "secondary"
                                 }
                               >
                                 {item.priority}
                               </Badge>
                               <Badge variant="secondary">{item.status}</Badge>
                             </div>
                             <h3 className="mt-3 text-base font-semibold text-slate-50">{item.title}</h3>
                             <p className="mt-1 text-sm text-slate-400">
                               {item.owner} • ETA {item.eta}
                             </p>
                           </div>
                           <div className="sm:w-32">
                             <p className="mb-2 text-right font-mono text-xs text-slate-400">
                               {item.progress}%
                             </p>
                             <Progress value={item.progress} />
                           </div>
                         </div>
                       </div>
                     ))
                   ) : (
                     <EmptyState
                       title="No tasks yet"
                       description="Task assignments will appear here after your first workflow is dispatched."
                     />
                   )}
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-border rounded-[30px]">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardDescription className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                        Integration Matrix
                      </CardDescription>
                      <CardTitle>Claude Code + OpenClaw</CardTitle>
                    </div>
                    <Badge>Orchestration mesh</Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <div className="grid gap-4">
                    {integrationNodes.map((node) => (
                      <div
                        key={node.name}
                        className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-lg font-semibold text-slate-50">{node.name}</p>
                            <p className="text-sm text-slate-400">{node.note}</p>
                          </div>
                          <Badge variant={node.status === "Connected" ? "success" : "secondary"}>
                            {node.status}
                          </Badge>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
                              Latency
                            </p>
                            <p className="mt-1 text-lg font-semibold text-slate-50">{node.latency}</p>
                          </div>
                          <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
                              Sync
                            </p>
                            <p className="mt-1 text-lg font-semibold text-slate-50">{node.sync}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4">
                    {orchestrationFlows.length > 0 ? (
                      orchestrationFlows.map((flow) => (
                        <div
                          key={flow.id}
                          className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-lg font-semibold text-slate-50">{flow.label}</p>
                              <p className="mt-1 text-sm text-slate-400">{flow.description}</p>
                            </div>
                            <Badge variant="secondary">{flow.completion}%</Badge>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {flow.agents.map((agent) => (
                              <Badge key={agent} variant="secondary">
                                {agent}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4">
                            <Progress value={flow.completion} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <EmptyState
                        title="No orchestration yet"
                        description="Connected automations will appear here once the mission-control mesh is configured."
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>

            <aside className="grid gap-6">
              <Card className="glass-border rounded-[30px]">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardDescription className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                        Activity Feed
                      </CardDescription>
                      <CardTitle>Mission Events</CardTitle>
                    </div>
                    <Activity className="size-5 text-cyan-300" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[320px] pr-4">
                    <AnimatePresence initial={false}>
                      {feed.length > 0 ? (
                        <div className="space-y-3">
                          {feed.map((item) => (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <Badge
                                  variant={
                                    item.tone === "success"
                                      ? "success"
                                      : item.tone === "warning"
                                        ? "warning"
                                        : "secondary"
                                  }
                                >
                                  {item.source}
                                </Badge>
                                <span className="font-mono text-xs text-slate-400">{item.timestamp}</span>
                              </div>
                              <p className="mt-3 text-sm leading-6 text-slate-200">{item.message}</p>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <EmptyState
                          title="No activity yet"
                          description="Mission activity will appear here after your first agent connects."
                        />
                      )}
                    </AnimatePresence>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="glass-border rounded-[30px]">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardDescription className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                        System Alerts
                      </CardDescription>
                      <CardTitle>Alert Board</CardTitle>
                    </div>
                    <AlertTriangle className="size-5 text-amber-300" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alerts.length > 0 ? (
                    alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 rounded-full bg-white/8 p-2">
                            {alert.severity === "critical" ? (
                              <CircleAlert className="size-4 text-rose-300" />
                            ) : alert.severity === "warning" ? (
                              <AlertTriangle className="size-4 text-amber-300" />
                            ) : (
                              <ShieldCheck className="size-4 text-cyan-300" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-slate-100">{alert.title}</p>
                              <Badge
                                variant={
                                  alert.severity === "critical"
                                    ? "destructive"
                                    : alert.severity === "warning"
                                      ? "warning"
                                      : "secondary"
                                }
                              >
                                {alert.time}
                              </Badge>
                            </div>
                            <p className="text-sm leading-6 text-slate-400">{alert.message}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyState
                      title="No alerts yet"
                      description="System notices will appear here if the cluster needs attention."
                    />
                  )}
                </CardContent>
              </Card>

              <Card className="glass-border rounded-[30px]">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardDescription className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200/80">
                        VPS Health
                      </CardDescription>
                      <CardTitle>Infrastructure Sentinel</CardTitle>
                    </div>
                    <Radar className="size-5 text-cyan-300" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {vpsHealth.map((metric) => (
                    <div key={metric.label} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {metric.label.toLowerCase().includes("cpu") ? (
                            <Cpu className="size-4 text-cyan-300" />
                          ) : metric.label.toLowerCase().includes("memory") ? (
                            <Layers2 className="size-4 text-violet-300" />
                          ) : metric.label.toLowerCase().includes("disk") ? (
                            <TerminalSquare className="size-4 text-emerald-300" />
                          ) : (
                            <ServerCog className="size-4 text-sky-300" />
                          )}
                          <span className="font-semibold text-slate-100">{metric.label}</span>
                        </div>
                        <Badge
                          variant={
                            metric.status === "Critical"
                              ? "destructive"
                              : metric.status === "Watch"
                                ? "warning"
                                : "success"
                          }
                        >
                          {metric.status}
                        </Badge>
                      </div>
                      <p className="mt-3 text-sm text-slate-400">{metric.detail}</p>
                      <div className="mt-3">
                        <Progress value={metric.value} />
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
                        Packet Loss
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-slate-50">{packetLoss}</p>
                    </div>
                    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
                        Failover Readiness
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-slate-50">{failoverReadiness}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>

      <AgentDetailSheet agent={selectedAgent} open={detailOpen} onOpenChange={setDetailOpen} />
    </main>
  );
}
