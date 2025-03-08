"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

const data = [
  { name: "Food & Dining", value: 400 },
  { name: "Transportation", value: 300 },
  { name: "Shopping", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Accommodation", value: 150 },
  { name: "Sightseeing", value: 100 },
  { name: "Other", value: 50 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"]

export function ExpensesByCategory() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

