"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

const transactions = [
  {
    id: "1",
    type: "DEBIT",
    amount: 120.5,
    category: "food_and_dining",
    description: "Dinner at Italian Restaurant",
    recipient: "Italian Bistro",
    timestamp: new Date(2023, 2, 15),
  },
  {
    id: "2",
    type: "CREDIT",
    amount: 1500.0,
    category: "other",
    description: "Salary deposit",
    recipient: "Employer Inc.",
    timestamp: new Date(2023, 2, 10),
  },
  {
    id: "3",
    type: "UPI",
    amount: 45.0,
    category: "shopping",
    description: "Online purchase",
    recipient: "E-commerce Store",
    timestamp: new Date(2023, 2, 8),
  },
  {
    id: "4",
    type: "DEBIT",
    amount: 35.75,
    category: "transportation",
    description: "Uber ride",
    recipient: "Uber",
    timestamp: new Date(2023, 2, 5),
  },
  {
    id: "5",
    type: "UPI",
    amount: 15.99,
    category: "entertainment",
    description: "Movie tickets",
    recipient: "Cinema World",
    timestamp: new Date(2023, 2, 1),
  },
]

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    food_and_dining: "🍔",
    transportation: "🚗",
    accommodation: "🏠",
    shopping: "🛍️",
    entertainment: "🎬",
    sightseeing: "🏞️",
    other: "📦",
  }
  return icons[category] || "📦"
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    CREDIT: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    DEBIT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    UPI: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  }
  return colors[type] || ""
}

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{getCategoryIcon(transaction.category)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">{transaction.recipient}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(transaction.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className={`text-sm font-medium ${transaction.type === "CREDIT" ? "text-green-600" : "text-red-600"}`}>
              {transaction.type === "CREDIT" ? "+" : "-"}${transaction.amount.toFixed(2)}
            </p>
            <Badge variant="outline" className={`${getTypeColor(transaction.type)}`}>
              {transaction.type}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

