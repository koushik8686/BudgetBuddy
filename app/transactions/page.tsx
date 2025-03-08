"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, Filter, Plus, Search } from "lucide-react"

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const transactions = [
    {
      id: "1",
      description: "Dinner at Italian Restaurant",
      category: "Food & Dining",
      date: new Date(2023, 2, 15),
      amount: -120.5,
      type: "DEBIT",
      bank: "HDFC Bank",
    },
    {
      id: "2",
      description: "Salary deposit",
      category: "Other",
      date: new Date(2023, 2, 10),
      amount: 1500.0,
      type: "CREDIT",
      bank: "ICICI Bank",
    },
    {
      id: "3",
      description: "Online purchase",
      category: "Shopping",
      date: new Date(2023, 2, 8),
      amount: -45.0,
      type: "UPI",
      bank: "Google Pay",
    },
    {
      id: "4",
      description: "Uber ride",
      category: "Transportation",
      date: new Date(2023, 2, 5),
      amount: -35.75,
      type: "DEBIT",
      bank: "SBI Bank",
    },
    {
      id: "5",
      description: "Movie tickets",
      category: "Entertainment",
      date: new Date(2023, 2, 1),
      amount: -15.99,
      type: "UPI",
      bank: "PhonePe",
    },
    {
      id: "6",
      description: "Freelance payment",
      category: "Other",
      date: new Date(2023, 1, 28),
      amount: 350.0,
      type: "CREDIT",
      bank: "HDFC Bank",
    },
    {
      id: "7",
      description: "Grocery shopping",
      category: "Food & Dining",
      date: new Date(2023, 1, 25),
      amount: -85.25,
      type: "DEBIT",
      bank: "ICICI Bank",
    },
    {
      id: "8",
      description: "Mobile bill payment",
      category: "Utilities",
      date: new Date(2023, 1, 20),
      amount: -45.99,
      type: "UPI",
      bank: "PhonePe",
    },
    {
      id: "9",
      description: "Gym membership",
      category: "Health & Fitness",
      date: new Date(2023, 1, 15),
      amount: -50.0,
      type: "DEBIT",
      bank: "SBI Bank",
    },
    {
      id: "10",
      description: "Bonus payment",
      category: "Other",
      date: new Date(2023, 1, 10),
      amount: 250.0,
      type: "CREDIT",
      bank: "HDFC Bank",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by tab
    if (activeTab === "income" && transaction.amount <= 0) return false
    if (activeTab === "expense" && transaction.amount > 0) return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.bank.toLowerCase().includes(query)
      )
    }

    return true
  })

  const getTypeColor = (type) => {
    const colors = {
      CREDIT: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      DEBIT: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      UPI: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    }
    return colors[type] || ""
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Transactions</h1>
          <Link
            href="/transactions/new"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white flex items-center space-x-1 hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-indigo-900/20 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30"
          >
            <Plus className="h-4 w-4" />
            <span>Add Transaction</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === "all"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                All Transactions
              </button>
              <button
                onClick={() => setActiveTab("income")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === "income"
                    ? "bg-green-600 text-white shadow-md shadow-green-200 dark:shadow-green-900/20"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Income
              </button>
              <button
                onClick={() => setActiveTab("expense")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === "expense"
                    ? "bg-red-600 text-white shadow-md shadow-red-200 dark:shadow-red-900/20"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                Expenses
              </button>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                <Filter className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Bank/Account</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                    style={{ animation: `fadeIn 0.5s ease-out ${index * 0.05}s both` }}
                  >
                    <td className="py-4 font-medium text-gray-800 dark:text-white">{transaction.description}</td>
                    <td className="py-4 text-gray-600 dark:text-gray-300">{transaction.category}</td>
                    <td className="py-4 text-gray-600 dark:text-gray-300">{transaction.date.toLocaleDateString()}</td>
                    <td
                      className={`py-4 font-medium ${transaction.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toFixed(2)}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600 dark:text-gray-300">{transaction.bank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No transactions found. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

