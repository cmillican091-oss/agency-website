"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { revenueTrend } from "@/lib/mission-control-data";

export function RevenuePanelCharts() {
  return (
    <>
      <div className="h-[280px] rounded-[24px] border border-white/8 bg-black/20 p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueTrend}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
            <YAxis
              stroke="#94a3b8"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(2, 6, 23, 0.92)",
                border: "1px solid rgba(34,211,238,0.2)",
                borderRadius: "18px",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#22d3ee"
              strokeWidth={3}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-4">
        <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-400">
            Weekly Uplift
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-50">+18.4%</p>
          <p className="mt-1 text-sm text-slate-400">
            Revenue acceleration led by Store Manager and Analytics Agent.
          </p>
        </div>
        <div className="h-[170px] rounded-[24px] border border-white/8 bg-black/20 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueTrend}>
              <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
              <XAxis dataKey="label" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(2, 6, 23, 0.92)",
                  border: "1px solid rgba(34,211,238,0.2)",
                  borderRadius: "18px",
                }}
              />
              <Bar dataKey="pipeline" fill="#a855f7" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
