"use client"

import { useState } from "react"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 mb-6">
          <div className="flex overflow-x-auto pb-4 mb-6 space-x-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                activeTab === "overview"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("daily")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                activeTab === "daily"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setActiveTab("monthly")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                activeTab === "monthly"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab("category")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                activeTab === "category"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Category
            </button>
            <button
              onClick={() => setActiveTab("location")}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                activeTab === "location"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Location
            </button>
          </div>

          {activeTab === "overview" && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</div>
                  <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">245</div>
                  <div className="mt-4 text-sm">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                      +12%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Average Transaction</div>
                  <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">$42.50</div>
                  <div className="mt-4 text-sm">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-1 rounded-full">
                      -3%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Top Category</div>
                  <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">Food & Dining</div>
                  <div className="mt-4 text-sm">
                    <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-400 px-2 py-1 rounded-full">
                      35%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">of total expenses</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Savings Rate</div>
                  <div className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">24.5%</div>
                  <div className="mt-4 text-sm">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                      +2.1%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Monthly Overview</h2>
                  <div className="h-80">
                    <MonthlyOverviewChart />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Expenses by Category</h2>
                  <div className="h-80">
                    <ExpensesByCategoryChart />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Daily Spending Trend</h2>
                  <div className="h-80">
                    <DailySpendingTrendChart />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
                    Transaction Type Distribution
                  </h2>
                  <div className="h-80">
                    <TransactionTypeChart />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "daily" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Daily Spending Trend</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Your spending pattern over the last 30 days
              </p>
              <div className="h-96">
                <DailySpendingTrendChart />
              </div>
            </div>
          )}

          {activeTab === "monthly" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Monthly Comparison</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Compare your spending across different months
              </p>
              <div className="h-96">
                <MonthlyComparisonChart />
              </div>
            </div>
          )}

          {activeTab === "category" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Expenses by Category</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Breakdown of your spending by category</p>
              <div className="h-96">
                <ExpensesByCategoryChart />
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Location-based Spending</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">View your spending patterns by location</p>
              <div className="h-96">
                <LocationSpendingChart />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Custom Chart Components
function MonthlyOverviewChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const incomeData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 4000, 3000, 2000, 2780, 1890]
  const expenseData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 9800, 3908, 4800]

  const maxValue = Math.max(...incomeData, ...expenseData)

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex justify-between mb-2 text-xs text-gray-500 dark:text-gray-400">
        <div>$0</div>
        <div>${Math.round(maxValue / 2)}</div>
        <div>${maxValue}</div>
      </div>
      <div className="flex-1 flex items-end">
        {months.map((month, index) => (
          <div key={month} className="flex-1 flex flex-col items-center group">
            <div className="w-full flex justify-center space-x-1">
              <div
                className="w-3 bg-green-500 dark:bg-green-400 rounded-t-md transition-all duration-500 ease-out group-hover:bg-green-600 dark:group-hover:bg-green-500 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                style={{
                  height: `${(incomeData[index] / maxValue) * 100}%`,
                  animation: `growUp 1s ease-out ${index * 0.1}s both`,
                }}
              ></div>
              <div
                className="w-3 bg-red-500 dark:bg-red-400 rounded-t-md transition-all duration-500 ease-out group-hover:bg-red-600 dark:group-hover:bg-red-500 group-hover:shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                style={{
                  height: `${(expenseData[index] / maxValue) * 100}%`,
                  animation: `growUp 1s ease-out ${index * 0.1 + 0.05}s both`,
                }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">{month}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Income</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 dark:bg-red-400 rounded mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Expense</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes growUp {
          from { height: 0; }
          to { height: ${100}%; }
        }
      `}</style>
    </div>
  )
}

function ExpensesByCategoryChart() {
  const categories = [
    { name: "Food & Dining", value: 400, color: "bg-indigo-500 dark:bg-indigo-400" },
    { name: "Transportation", value: 300, color: "bg-sky-500 dark:bg-sky-400" },
    { name: "Shopping", value: 300, color: "bg-teal-500 dark:bg-teal-400" },
    { name: "Entertainment", value: 200, color: "bg-green-500 dark:bg-green-400" },
    { name: "Accommodation", value: 150, color: "bg-amber-500 dark:bg-amber-400" },
    { name: "Sightseeing", value: 100, color: "bg-red-500 dark:bg-red-400" },
    { name: "Other", value: 50, color: "bg-gray-500 dark:bg-gray-400" },
  ]

  const total = categories.reduce((sum, category) => sum + category.value, 0)

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-56 h-56">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" className="dark:opacity-20" />
            {categories.map((category, index) => {
              const percentage = (category.value / total) * 100
              const offset = categories.slice(0, index).reduce((sum, cat) => sum + (cat.value / total) * 100, 0)

              return (
                <circle
                  key={category.name}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="20"
                  strokeDasharray={`${percentage} ${100 - percentage}`}
                  strokeDashoffset={`${-offset}`}
                  className={`${category.color} transition-all duration-500 hover:opacity-90 cursor-pointer`}
                  style={{
                    animation: `fillCircle 1s ease-out ${index * 0.2}s both`,
                    transformOrigin: "center",
                    transform: "rotate(-90deg)",
                  }}
                />
              )
            })}
            <circle cx="50" cy="50" r="30" fill="white" className="dark:fill-gray-800" />
          </svg>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${category.color} mr-1`}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">{category.name}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fillCircle {
          from { stroke-dasharray: 0 100; }
        }
      `}</style>
    </div>
  )
}

function DailySpendingTrendChart() {
  const days = Array.from({ length: 30 }, (_, i) => (i + 1).toString().padStart(2, "0"))
  const amounts = [
    120, 90, 75, 180, 45, 120, 35, 65, 95, 145, 25, 60, 110, 75, 200, 65, 45, 90, 115, 70, 85, 95, 120, 45, 60, 110, 75,
    35, 85, 95,
  ]

  const maxAmount = Math.max(...amounts)

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex justify-between mb-2 text-xs text-gray-500 dark:text-gray-400">
        <div>$0</div>
        <div>${Math.round(maxAmount / 2)}</div>
        <div>${maxAmount}</div>
      </div>
      <div className="flex-1 flex items-end">
        {days.map((day, index) => (
          <div key={day} className="flex-1 flex flex-col items-center group">
            <div
              className="w-full max-w-[8px] bg-indigo-500 dark:bg-indigo-400 rounded-t-md transition-all duration-300 ease-out group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              style={{
                height: `${(amounts[index] / maxAmount) * 100}%`,
                animation: `growUp 1s ease-out ${index * 0.03}s both`,
              }}
            ></div>
            {index % 5 === 0 && <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">{day}</div>}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-xs text-gray-600 dark:text-gray-400">Day of Month</div>
      <style jsx>{`
        @keyframes growUp {
          from { height: 0; }
          to { height: ${100}%; }
        }
      `}</style>
    </div>
  )
}

function MonthlyComparisonChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const data2022 = [4000, 3000, 2000, 2780, 1890, 2390]
  const data2023 = [2400, 1398, 9800, 3908, 4800, 3800]

  const maxValue = Math.max(...data2022, ...data2023)

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex justify-between mb-2 text-xs text-gray-500 dark:text-gray-400">
        <div>$0</div>
        <div>${Math.round(maxValue / 2)}</div>
        <div>${maxValue}</div>
      </div>
      <div className="flex-1 flex items-end">
        {months.map((month, index) => (
          <div key={month} className="flex-1 flex flex-col items-center group">
            <div className="w-full flex justify-center space-x-2">
              <div
                className="w-4 bg-indigo-500 dark:bg-indigo-400 rounded-t-md transition-all duration-300 ease-out group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                style={{
                  height: `${(data2022[index] / maxValue) * 100}%`,
                  animation: `growUp 1s ease-out ${index * 0.1}s both`,
                }}
              ></div>
              <div
                className="w-4 bg-sky-500 dark:bg-sky-400 rounded-t-md transition-all duration-300 ease-out group-hover:bg-sky-600 dark:group-hover:bg-sky-500 group-hover:shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                style={{
                  height: `${(data2023[index] / maxValue) * 100}%`,
                  animation: `growUp 1s ease-out ${index * 0.1 + 0.05}s both`,
                }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">{month}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-500 dark:bg-indigo-400 rounded mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">2022</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-sky-500 dark:bg-sky-400 rounded mr-1"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">2023</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes growUp {
          from { height: 0; }
          to { height: ${100}%; }
        }
      `}</style>
    </div>
  )
}

function LocationSpendingChart() {
  const locations = [
    { name: "New York", value: 400, color: "bg-indigo-500 dark:bg-indigo-400" },
    { name: "San Francisco", value: 300, color: "bg-sky-500 dark:bg-sky-400" },
    { name: "Chicago", value: 300, color: "bg-teal-500 dark:bg-teal-400" },
    { name: "Los Angeles", value: 200, color: "bg-green-500 dark:bg-green-400" },
    { name: "Miami", value: 150, color: "bg-amber-500 dark:bg-amber-400" },
  ]

  const total = locations.reduce((sum, location) => sum + location.value, 0)

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-56 h-56">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" className="dark:opacity-20" />
            {locations.map((location, index) => {
              const percentage = (location.value / total) * 100
              const offset = locations.slice(0, index).reduce((sum, loc) => sum + (loc.value / total) * 100, 0)

              return (
                <circle
                  key={location.name}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="20"
                  strokeDasharray={`${percentage} ${100 - percentage}`}
                  strokeDashoffset={`${-offset}`}
                  className={`${location.color} transition-all duration-500 hover:opacity-90 cursor-pointer`}
                  style={{
                    animation: `fillCircle 1s ease-out ${index * 0.2}s both`,
                    transformOrigin: "center",
                    transform: "rotate(-90deg)",
                  }}
                />
              )
            })}
            <circle cx="50" cy="50" r="30" fill="white" className="dark:fill-gray-800" />
          </svg>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {locations.map((location) => (
          <div key={location.name} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${location.color} mr-1`}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">{location.name}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fillCircle {
          from { stroke-dasharray: 0 100; }
        }
      `}</style>
    </div>
  )
}

function TransactionTypeChart() {
  const types = [
    { name: "Credit", value: 400, color: "bg-green-500 dark:bg-green-400" },
    { name: "Debit", value: 300, color: "bg-red-500 dark:bg-red-400" },
    { name: "UPI", value: 300, color: "bg-indigo-500 dark:bg-indigo-400" },
  ]

  const total = types.reduce((sum, type) => sum + type.value, 0)

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-56 h-56">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" className="dark:opacity-20" />
            {types.map((type, index) => {
              const percentage = (type.value / total) * 100
              const offset = types.slice(0, index).reduce((sum, t) => sum + (t.value / total) * 100, 0)

              return (
                <circle
                  key={type.name}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="20"
                  strokeDasharray={`${percentage} ${100 - percentage}`}
                  strokeDashoffset={`${-offset}`}
                  className={`${type.color} transition-all duration-500 hover:opacity-90 cursor-pointer`}
                  style={{
                    animation: `fillCircle 1s ease-out ${index * 0.2}s both`,
                    transformOrigin: "center",
                    transform: "rotate(-90deg)",
                  }}
                />
              )
            })}
            <circle cx="50" cy="50" r="30" fill="white" className="dark:fill-gray-800" />
            <text x="50" y="45" textAnchor="middle" className="text-lg font-bold fill-gray-800 dark:fill-white">
              1,000
            </text>
            <text x="50" y="55" textAnchor="middle" className="text-xs fill-gray-500 dark:fill-gray-400">
              Transactions
            </text>
          </svg>
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        {types.map((type) => (
          <div key={type.name} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${type.color} mr-1`}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">{type.name}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes fillCircle {
          from { stroke-dasharray: 0 100; }
        }
      `}</style>
    </div>
  )
}

