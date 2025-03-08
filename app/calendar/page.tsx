"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

// Mock transaction data with dates
const transactionsByDate = {
  "2023-03-01": [
    { id: 1, description: "Grocery shopping", amount: -75.5, type: "DEBIT" },
    { id: 2, description: "Movie tickets", amount: -15.99, type: "UPI" },
  ],
  "2023-03-05": [{ id: 3, description: "Uber ride", amount: -35.75, type: "DEBIT" }],
  "2023-03-10": [{ id: 4, description: "Salary deposit", amount: 1500.0, type: "CREDIT" }],
  "2023-03-15": [{ id: 5, description: "Dinner at Italian Restaurant", amount: -120.5, type: "DEBIT" }],
  "2023-03-20": [
    { id: 6, description: "Online purchase", amount: -45.0, type: "UPI" },
    { id: 7, description: "Electricity bill", amount: -85.3, type: "DEBIT" },
  ],
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDayTransactions, setSelectedDayTransactions] = useState<any[]>([])

  // Function to handle date change
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      setSelectedDayTransactions(transactionsByDate[formattedDate] || [])
    } else {
      setSelectedDayTransactions([])
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transaction Calendar</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>View your transactions by date</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              className="rounded-md border"
              modifiers={{
                hasTransaction: (date) => {
                  const formattedDate = format(date, "yyyy-MM-dd")
                  return formattedDate in transactionsByDate
                },
              }}
              modifiersStyles={{
                hasTransaction: {
                  fontWeight: "bold",
                  backgroundColor: "rgba(136, 132, 216, 0.2)",
                  borderRadius: "50%",
                },
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{date ? format(date, "MMMM d, yyyy") : "Select a date"}</CardTitle>
            <CardDescription>
              {selectedDayTransactions.length > 0
                ? `${selectedDayTransactions.length} transactions on this day`
                : "No transactions on this day"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDayTransactions.length > 0 ? (
              <div className="space-y-4">
                {selectedDayTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount.toFixed(2)}
                      </p>
                      <Badge
                        variant="outline"
                        className={`
                        ${
                          transaction.type === "CREDIT"
                            ? "bg-green-100 text-green-800"
                            : transaction.type === "DEBIT"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                        }
                      `}
                      >
                        {transaction.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                No transactions found for this date
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

