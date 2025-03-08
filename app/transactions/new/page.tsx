"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarIcon } from "lucide-react"

export default function NewTransactionPage() {
  const [date, setDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <Link
            href="/transactions"
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Transaction</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Transaction Type
                </label>
                <select className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">Select type</option>
                  <option value="CREDIT">Credit</option>
                  <option value="DEBIT">Debit</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">Select category</option>
                  <option value="food_and_dining">Food & Dining</option>
                  <option value="transportation">Transportation</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="shopping">Shopping</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="sightseeing">Sightseeing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent flex items-center justify-between"
                  >
                    <span>{date.toLocaleDateString()}</span>
                    <CalendarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                  {showCalendar && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-7 gap-2">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                          <div key={day} className="text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {day}
                          </div>
                        ))}
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => {
                              const newDate = new Date(date)
                              newDate.setDate(day)
                              setDate(newDate)
                              setShowCalendar(false)
                            }}
                            className={`text-center p-2 rounded-full text-sm ${
                              date.getDate() === day
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                placeholder="Enter transaction description"
                rows={3}
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bank</label>
                <input
                  type="text"
                  placeholder="Bank name"
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account</label>
                <input
                  type="text"
                  placeholder="Account number/name"
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recipient</label>
              <input
                type="text"
                placeholder="Recipient name"
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity"
              >
                Save Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

