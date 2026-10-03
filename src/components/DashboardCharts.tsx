'use client'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from 'recharts'
import { useTheme } from 'next-themes'

const CORES = [
  '#2D9E72','#4CAF85','#6BBF98','#85CFAB',
  '#9FDFBE','#B9EFD1','#3B6D11','#639922',
]

export default function DashboardCharts({
  categories,
}: {
  categories: Record<string, number>
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const tooltipStyle = {
    background: isDark ? '#0F1A0E' : '#F5F0E8',
    border: `0.5px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: 8,
    fontSize: 12,
    color: isDark ? '#F5F0E8' : '#1A2E1A',
  }

  const cursorStyle = isDark
    ? { fill: 'rgba(255,255,255,0.03)' }
    : { fill: 'rgba(0,0,0,0.03)' }

  const tickColor = isDark ? '#8CB89A' : '#6B7E6B'

  const chartData = Object.entries(categories)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div
        className="rounded-2xl p-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <h2
          className="text-xs font-mono-dm tracking-[2px] uppercase mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          Plantas por categoria
        </h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: tickColor }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: tickColor }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} cursor={cursorStyle} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} name="Plantas">
              {chartData.map((_, i) => <Cell key={i} fill={CORES[i % CORES.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <h2
          className="text-xs font-mono-dm tracking-[2px] uppercase mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          Distribuição por categoria
        </h2>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%" cy="50%"
              outerRadius={80} innerRadius={40}
              paddingAngle={3}
            >
              {chartData.map((_, i) => <Cell key={i} fill={CORES[i % CORES.length]} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              iconSize={8}
              iconType="circle"
              formatter={(v) => (
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{v}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}