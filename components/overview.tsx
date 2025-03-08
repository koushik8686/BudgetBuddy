"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Jun",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Jul",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Sep",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Oct",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Nov",
    income: 2780,
    expense: 3908,
  },
  {
    name: "Dec",
    income: 1890,
    expense: 4800,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" name="Income" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" name="Expense" fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

