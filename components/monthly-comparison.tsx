"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    "2022": 4000,
    "2023": 2400,
  },
  {
    name: "Feb",
    "2022": 3000,
    "2023": 1398,
  },
  {
    name: "Mar",
    "2022": 2000,
    "2023": 9800,
  },
  {
    name: "Apr",
    "2022": 2780,
    "2023": 3908,
  },
  {
    name: "May",
    "2022": 1890,
    "2023": 4800,
  },
  {
    name: "Jun",
    "2022": 2390,
    "2023": 3800,
  },
]

export function MonthlyComparison() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="2022" fill="#8884d8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="2023" fill="#82ca9d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

