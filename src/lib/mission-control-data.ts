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
  { label: "Mon", revenue: 14200, pipeline: 9 },
  { label: "Tue", revenue: 16840, pipeline: 11 },
  { label: "Wed", revenue: 18120, pipeline: 14 },
  { label: "Thu", revenue: 21350, pipeline: 16 },
  { label: "Fri", revenue: 24410, pipeline: 18 },
  { label: "Sat", revenue: 23180, pipeline: 15 },
  { label: "Sun", revenue: 26740, pipeline: 19 },
];

export const missionAgents: AgentRecord[] = [
  {
    id: "store-manager",
    name: "Store Manager",
    role: "Shopify management",
    currentTask: "Optimizing flash sale product bundles",
    status: "Working",
    revenueGenerated: 18240,
    room: "F3-A1",
    floor: 3,
    zone: "Commerce Core",
    efficiency: 94,
    model: "Claude Code",
    integrations: ["Shopify", "Claude Code", "OpenClaw"],
    queue: ["Variant reconciliation", "Inventory drift check", "Discount sync"],
    logs: [
      { time: "22:01:12", level: "success", message: "Published 12 product updates to Shopify." },
      { time: "21:58:44", level: "info", message: "Bundle pricing guardrails passed." },
      { time: "21:54:02", level: "warning", message: "Awaiting supplier stock confirmation for SKU-AX19." },
    ],
    history: [
      { time: "21:52", label: "Triggered catalog remediation flow" },
      { time: "21:31", label: "Closed abandoned cart pricing anomaly" },
      { time: "21:12", label: "Shipped storefront merchandising update" },
    ],
  },
  {
    id: "research-agent",
    name: "Research Agent",
    role: "Product research",
    currentTask: "Mapping competitor price movements across 8 niches",
    status: "Working",
    revenueGenerated: 11960,
    room: "F3-A2",
    floor: 3,
    zone: "Signal Lab",
    efficiency: 91,
    model: "Claude Code",
    integrations: ["Search Mesh", "OpenClaw", "Claude Code"],
    queue: ["Keyword gaps", "Trend scan", "Competitor briefs"],
    logs: [
      { time: "22:02:09", level: "info", message: "Competitive analysis refreshed for home goods vertical." },
      { time: "21:56:19", level: "success", message: "Detected high-margin product cluster opportunity." },
      { time: "21:48:38", level: "info", message: "Scanning emerging search demand signals." },
    ],
    history: [
      { time: "21:41", label: "Synced watchlist with marketing squad" },
      { time: "21:18", label: "Flagged two underpriced bundles" },
      { time: "20:52", label: "Generated competitor matrix" },
    ],
  },
  {
    id: "marketing-agent",
    name: "Marketing Agent",
    role: "Ad copy",
    currentTask: "Launching social content for summer campaign",
    status: "Working",
    revenueGenerated: 14680,
    room: "F2-B1",
    floor: 2,
    zone: "Acquisition Bay",
    efficiency: 97,
    model: "Claude Code",
    integrations: ["Meta Ads", "Claude Code", "Campaign Grid"],
    queue: ["Creative testing", "Headline variants", "Audience split"],
    logs: [
      { time: "22:00:31", level: "success", message: "Generated 6 ad copy variants with CTR uplift predictions." },
      { time: "21:57:24", level: "info", message: "Queued social content pack for approval." },
      { time: "21:43:05", level: "warning", message: "Audience saturation approaching threshold in retargeting set." },
    ],
    history: [
      { time: "21:34", label: "Rotated creative set for paid social" },
      { time: "21:05", label: "Pushed lifecycle email refresh" },
      { time: "20:47", label: "Completed promo teaser sprint" },
    ],
  },
  {
    id: "content-agent",
    name: "Content Agent",
    role: "Blog posts",
    currentTask: "Drafting product descriptions for new arrivals",
    status: "Waiting",
    revenueGenerated: 10740,
    room: "F2-B2",
    floor: 2,
    zone: "Content Forge",
    efficiency: 88,
    model: "Claude Code",
    integrations: ["CMS", "Claude Code", "SEO Hub"],
    queue: ["Long-form outline", "FAQ schema", "Description rewrites"],
    logs: [
      { time: "21:59:53", level: "info", message: "Waiting on enriched research briefing from Signal Lab." },
      { time: "21:50:02", level: "success", message: "Completed 14 SEO product descriptions." },
      { time: "21:29:44", level: "info", message: "Updated blog calendar for Q3 launch sequence." },
    ],
    history: [
      { time: "21:16", label: "Generated collection landing page copy" },
      { time: "20:58", label: "Published FAQ refresh set" },
      { time: "20:21", label: "Synced editorial queue" },
    ],
  },
  {
    id: "customer-support-agent",
    name: "Customer Support Agent",
    role: "Ticket handling",
    currentTask: "Resolving priority refund and FAQ escalation mix",
    status: "Error",
    revenueGenerated: 9360,
    room: "F1-C1",
    floor: 1,
    zone: "Response Deck",
    efficiency: 82,
    model: "Claude Code",
    integrations: ["Helpdesk", "OpenClaw", "Knowledge Base"],
    queue: ["VIP ticket triage", "FAQ sync", "Return policy audit"],
    logs: [
      { time: "22:01:45", level: "error", message: "Knowledge base sync timed out while processing escalation batch." },
      { time: "21:55:48", level: "warning", message: "Refund workflow paused pending billing callback." },
      { time: "21:40:17", level: "success", message: "Closed 18 support tickets with 97% confidence." },
    ],
    history: [
      { time: "21:26", label: "Escalated billing sync incident" },
      { time: "20:46", label: "Completed FAQ response training set" },
      { time: "20:15", label: "Resolved overnight queue backlog" },
    ],
  },
  {
    id: "analytics-agent",
    name: "Analytics Agent",
    role: "Revenue tracking",
    currentTask: "Monitoring KPI drift across the revenue pipeline",
    status: "Complete",
    revenueGenerated: 22190,
    room: "F1-C2",
    floor: 1,
    zone: "Telemetry Vault",
    efficiency: 99,
    model: "Claude Code",
    integrations: ["BI Warehouse", "Claude Code", "OpenClaw"],
    queue: ["Attribution cleanup", "KPI anomaly scan", "Forecast digest"],
    logs: [
      { time: "22:02:22", level: "success", message: "Closed daily revenue digest and pushed KPI summary." },
      { time: "21:53:40", level: "info", message: "Forecast variance holding inside target band." },
      { time: "21:37:10", level: "success", message: "Published updated conversion benchmark set." },
    ],
    history: [
      { time: "21:22", label: "Promoted daily revenue dashboard" },
      { time: "20:54", label: "Refreshed pipeline risk model" },
      { time: "20:33", label: "Completed attribution reconciliation" },
    ],
  },
];

export const activityFeed: FeedItem[] = [
  {
    id: "feed-1",
    source: "Analytics Agent",
    message: "Forecast confidence climbed to 96% after latest revenue sync.",
    timestamp: "22:02",
    tone: "success",
  },
  {
    id: "feed-2",
    source: "Marketing Agent",
    message: "Creative launch package moved into paid social deployment queue.",
    timestamp: "22:00",
    tone: "info",
  },
  {
    id: "feed-3",
    source: "Customer Support Agent",
    message: "Incident opened for delayed FAQ sync on the helpdesk connector.",
    timestamp: "21:58",
    tone: "warning",
  },
  {
    id: "feed-4",
    source: "Store Manager",
    message: "Shopify storefront update raised projected AOV by 4.3%.",
    timestamp: "21:55",
    tone: "success",
  },
];

export const taskQueue: QueueItem[] = [
  {
    id: "queue-1",
    title: "Rebuild summer landing page assortment",
    owner: "Store Manager",
    priority: "Critical",
    progress: 72,
    status: "Running",
    eta: "09 min",
  },
  {
    id: "queue-2",
    title: "Competitor benchmark refresh",
    owner: "Research Agent",
    priority: "High",
    progress: 54,
    status: "Running",
    eta: "14 min",
  },
  {
    id: "queue-3",
    title: "Launch paid social variant set",
    owner: "Marketing Agent",
    priority: "High",
    progress: 33,
    status: "Running",
    eta: "22 min",
  },
  {
    id: "queue-4",
    title: "Rewrite product description cluster",
    owner: "Content Agent",
    priority: "Medium",
    progress: 18,
    status: "Queued",
    eta: "28 min",
  },
];

export const baseAlerts: AlertItem[] = [
  {
    id: "alert-1",
    title: "Knowledge Base Connector",
    message: "Customer Support Agent hit a helpdesk sync timeout and entered recovery mode.",
    severity: "critical",
    time: "1 min ago",
  },
  {
    id: "alert-2",
    title: "Campaign Saturation Watch",
    message: "Retargeting audience overlap rose above 82% for summer launch traffic.",
    severity: "warning",
    time: "6 min ago",
  },
  {
    id: "alert-3",
    title: "Claude Code Deployment",
    message: "All Claude Code orchestration workers are online and within latency budget.",
    severity: "info",
    time: "11 min ago",
  },
];

export const healthMetrics: HealthMetric[] = [
  { label: "CPU", value: 63, detail: "6 vCPU • burst ready", status: "Optimal" },
  { label: "Memory", value: 71, detail: "22.7 / 32 GB", status: "Watch" },
  { label: "Disk I/O", value: 46, detail: "1.8 TB NVMe", status: "Optimal" },
  { label: "Network", value: 58, detail: "2.6 Gbps ingress", status: "Optimal" },
];

export const integrationNodes: IntegrationNode[] = [
  {
    name: "Claude Code",
    latency: "82 ms",
    sync: "96%",
    status: "Connected",
    note: "Primary coding and orchestration engine",
  },
  {
    name: "OpenClaw",
    latency: "118 ms",
    sync: "92%",
    status: "Connected",
    note: "Parallel execution and tool mesh routing",
  },
  {
    name: "VPS Sentinel",
    latency: "44 ms",
    sync: "88%",
    status: "Warm",
    note: "System telemetry and watchdog automation",
  },
];

export const orchestrationFlows: OrchestrationFlow[] = [
  {
    id: "flow-1",
    label: "Launch Sequence",
    description: "Research → Marketing → Content → Store rollout",
    agents: ["Research Agent", "Marketing Agent", "Content Agent", "Store Manager"],
    completion: 84,
  },
  {
    id: "flow-2",
    label: "Support Recovery",
    description: "Customer support backlog resolution with knowledge base failover",
    agents: ["Customer Support Agent", "Analytics Agent"],
    completion: 61,
  },
  {
    id: "flow-3",
    label: "Revenue Watch",
    description: "Telemetry-driven KPI anomaly detection and forecasting",
    agents: ["Analytics Agent", "Store Manager", "Research Agent"],
    completion: 93,
  },
];
