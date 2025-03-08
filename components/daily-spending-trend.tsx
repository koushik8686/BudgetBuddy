"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  { date: "01", amount: 120 },
  { date: "02", amount: 90 },
  { date: "03", amount: 75 },
  { date: "04", amount: 180 },
  { date: "05", amount: 45 },
  { date: "06", amount: 120 },
  { date: "07", amount: 35 },
  { date: "08", amount: 65 },
  { date: "09", amount: 95 },
  { date: "10", amount: 145 },
  { date: "11", amount: 25 },
  { date: "12", amount: 60 },
  { date: "13", amount: 110 },
  { date: "14", amount: 75 },
  { date: "15", amount: 200 },
  { date: "16", amount: 65 },
  { date: "17", amount: 45 },
  { date: "18", amount: 90 },
  { date: "19", amount: 115 },
  { date: "20", amount: 70 },
  { date: "21", amount: 85 },
  { date: "22", amount: 95 },
  { date: "23", amount: 120 },
  { date: "24", amount: 45 },
  { date: "25", amount: 60 },
  { date: "26", amount: 110 },
  { date: "27", amount: 75 },
  { date: "28", amount: 35 },
  { date: "29", amount: 85 },
  { date: "30", amount: 95 },
]

export function DailySpendingTrend() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

