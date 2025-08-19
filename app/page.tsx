"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  CalendarIcon,
  CreditCard,
  DollarSign,
  Home,
  PieChart,
  Plus,
  Settings,
  Smartphone,
  Sun,
  Moon,
} from "lucide-react"

import { signIn } from "next-auth/react"

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for user preference
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }
 
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="md:hidden bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                ET
              </div>
              <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">ExpenseTracker</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                <Link
                  href="/transactions/new"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white flex items-center space-x-1 hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-indigo-900/20 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Transaction</span>
                </Link>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance</p>
                      <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">$12,231.00</p>
                    </div>
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                      <DollarSign className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                      +2.5%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Income</p>
                      <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">$4,935.00</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                      <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                      +20.1%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Expenses</p>
                      <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">$2,345.00</p>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">
                      <CreditCard className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-1 rounded-full">
                      +7%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Savings Rate</p>
                      <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">52.5%</p>
                    </div>
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-lg">
                      <CreditCard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                      +5.2%
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-8">
                <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Monthly Overview</h2>
                  <div className="h-80">
                    <MonthlyOverviewChart />
                  </div>
                </div>

                <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Expenses by Category</h2>
                  <div className="h-80">
                    <ExpensesByCategoryChart />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
                <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Recent Transactions</h2>
                  <div className="space-y-4">
                    <RecentTransactions />
                  </div>
                </div>

                <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
                    Transaction Type Distribution
                  </h2>
                  <div className="h-80">
                    <TransactionTypeChart />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  )
}

// Custom Chart Components using Tailwind CSS
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

function RecentTransactions() {
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

  const getCategoryIcon = (category) => {
    const icons = {
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

  const getTypeColor = (type) => {
    const colors = {
      CREDIT: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      DEBIT: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      UPI: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    }
    return colors[type] || ""
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-lg shadow-sm">
              {getCategoryIcon(transaction.category)}
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">{transaction.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.recipient}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.timestamp.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p
              className={`font-medium ${transaction.type === "CREDIT" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {transaction.type === "CREDIT" ? "+" : "-"}${transaction.amount.toFixed(2)}
            </p>
            <span className={`text-xs px-2 py-1 rounded-full mt-1 ${getTypeColor(transaction.type)}`}>
              {transaction.type}
            </span>
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

