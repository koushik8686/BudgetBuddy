"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

const data = [
  { name: "Credit", value: 400 },
  { name: "Debit", value: 300 },
  { name: "UPI", value: 300 },
]

const COLORS = ["#4ade80", "#f87171", "#60a5fa"]

export function TransactionTypeDistribution() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

