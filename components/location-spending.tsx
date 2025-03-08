"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

const data = [
  { name: "New York", value: 400 },
  { name: "San Francisco", value: 300 },
  { name: "Chicago", value: 300 },
  { name: "Los Angeles", value: 200 },
  { name: "Miami", value: 150 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function LocationSpending() {
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

