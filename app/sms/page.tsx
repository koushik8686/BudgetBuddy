"use client"

import { useState } from "react"
import { Download, Filter, Search, Upload } from "lucide-react"

export default function SMSPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const smsTransactions = [
    {
      id: "1",
      message:
        "HDFC Bank: Rs.1,200.50 debited from your A/c XX1234 on 15-03-2023 to AMAZON RETAIL. Avl bal: Rs.24,567.89",
      amount: -1200.5,
      type: "DEBIT",
      bank: "HDFC Bank",
      date: new Date(2023, 2, 15),
      confidence: 98,
    },
    {
      id: "2",
      message:
        "SBI: Your a/c no. XX5678 is credited with INR 45,000.00 on 10-03-2023 by transfer from EMPLOYER INC. Available balance is INR 67,890.12",
      amount: 45000.0,
      type: "CREDIT",
      bank: "SBI Bank",
      date: new Date(2023, 2, 10),
      confidence: 95,
    },
    {
      id: "3",
      message:
        "ICICI Bank: Rs.350.00 debited from your A/c via UPI-PHONEPE to UBER on 05-03-2023. UPI Ref: 123456789012. Balance: Rs.12,345.67",
      amount: -350.0,
      type: "UPI",
      bank: "ICICI Bank",
      date: new Date(2023, 2, 5),
      confidence: 92,
    },
    {
      id: "4",
      message:
        "Axis Bank: Rs.2,500.00 spent on your Axis Bank Credit Card XX9876 at FLIPKART on 01-03-2023. Available limit: Rs.47,500.00",
      amount: -2500.0,
      type: "DEBIT",
      bank: "Axis Bank",
      date: new Date(2023, 2, 1),
      confidence: 90,
    },
    {
      id: "5",
      message:
        "HDFC Bank: Rs.1,500.00 transferred via UPI-GPAY to FRIEND NAME on 28-02-2023. UPI Ref: 987654321098. Balance: Rs.22,345.67",
      amount: -1500.0,
      type: "UPI",
      bank: "HDFC Bank",
      date: new Date(2023, 1, 28),
      confidence: 94,
    },
  ]

  const filteredSMS = smsTransactions.filter((sms) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        sms.message.toLowerCase().includes(query) ||
        sms.bank.toLowerCase().includes(query) ||
        sms.type.toLowerCase().includes(query)
      )
    }
    return true
  })

  const getTypeColor = (type) => {
    const colors = {
      CREDIT: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      DEBIT: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      UPI: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    }
    return colors[type] || ""
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 95) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (confidence >= 90) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">SMS Transactions</h1>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center space-x-1 hover:opacity-90 transition-opacity">
            <Upload className="h-4 w-4" />
            <span>Import SMS</span>
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">SMS Analysis</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              We've analyzed 124 SMS messages and extracted 87 transactions with an average confidence score of 92%.
            </p>
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search SMS messages..."
                  className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <Filter className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 font-medium">Message</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Bank</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {filteredSMS.map((sms) => (
                  <tr
                    key={sms.id}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
                  >
                    <td className="py-4 font-medium text-gray-800 dark:text-white max-w-xs truncate">{sms.message}</td>
                    <td
                      className={`py-4 font-medium ${sms.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {sms.amount > 0 ? "+" : ""}
                      {sms.amount.toFixed(2)}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(sms.type)}`}>{sms.type}</span>
                    </td>
                    <td className="py-4 text-gray-600 dark:text-gray-300">{sms.bank}</td>
                    <td className="py-4 text-gray-600 dark:text-gray-300">{sms.date.toLocaleDateString()}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getConfidenceColor(sms.confidence)}`}>
                        {sms.confidence}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSMS.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No SMS transactions found. Try adjusting your search.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

