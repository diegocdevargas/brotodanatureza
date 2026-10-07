'use client'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle,
  PieChart, Pie, Legend, type BarShapeProps,
} from 'recharts'
import { useTheme } from 'next-themes'

// Forest → lime ramp from the site palette (ordered by value, largest first).
const COLORS = ['#3f6b45', '#5b8a55', '#7aa865', '#9cc377', '#bcdb85', '#d8f28a', '#2c4f33', '#1d3b2a']

export default function DashboardCharts({ categories }: { categories: Record<string, number> }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const ink = isDark ? '#e8efe4' : '#0e2419'
  const tick = isDark ? 'rgba(232,239,228,0.55)' : 'rgba(14,36,25,0.55)'
  const tooltipStyle = {
    background: isDark ? '#162219' : '#ffffff',
    border: `1px solid ${isDark ? 'rgba(232,239,228,0.1)' : 'rgba(14,36,25,0.1)'}`,
    borderRadius: 14,
    fontSize: 13,
    color: ink,
    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
  }
  const cursor = { fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(14,36,25,0.04)' }

  const data = Object.entries(categories)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .map((d, i) => ({ ...d, fill: COLORS[i % COLORS.length] }))

  if (data.length === 0) {
    return <p className="t-15 soft">Os gráficos aparecem assim que houver plantas cadastradas.</p>
  }

  return (
    <div className="db-charts">
      <figure className="db-chart" style={{ margin: 0 }}>
        <figcaption className="db-chart__head">
          <span className="ca-kicker">Acervo</span>
          <h2 className="ca-h32">Plantas por categoria</h2>
        </figcaption>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: tick }} axisLine={false} tickLine={false} interval={0} />
            <YAxis tick={{ fontSize: 11, fill: tick }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: ink }} labelStyle={{ color: ink }} cursor={cursor} />
            <Bar dataKey="value" radius={[10, 10, 4, 4]} name="Plantas"
              shape={(props: BarShapeProps) => <Rectangle {...props} fill={(props.payload as { fill: string }).fill} />} />
          </BarChart>
        </ResponsiveContainer>
      </figure>

      <figure className="db-chart" style={{ margin: 0 }}>
        <figcaption className="db-chart__head">
          <span className="ca-kicker">Proporção</span>
          <h2 className="ca-h32">Distribuição por categoria</h2>
        </figcaption>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={88} innerRadius={52} paddingAngle={3} stroke="none" />
            <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: ink }} />
            <Legend iconSize={8} iconType="circle" formatter={(v) => <span style={{ fontSize: 12, color: tick }}>{v}</span>} />
          </PieChart>
        </ResponsiveContainer>
      </figure>
    </div>
  )
}
