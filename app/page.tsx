"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  CreditCard,
  DollarSign,
  Plus,
  Sun,
  Moon,
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

const getTransactionDetails = (transaction) => {
  let transactionType = transaction.type?.toUpperCase() || "UNKNOWN"
  let amount = transaction.amount || 0
  let recipient = transaction.recipient || "N/A"
  let description = transaction.description || "No description available"

  if (transaction.type === "SMS" && transaction.raw_message) {
    const message = transaction.raw_message.toLowerCase()

    if (message.includes("debited") || message.includes("spent") || message.includes("purchase")) {
      transactionType = "DEBIT"
    } else if (message.includes("credited") || message.includes("received")) {
      transactionType = "CREDIT"
    } else {
      transactionType = "SMS"
    }

    const amountMatch = message.match(/(?:rs|inr|rs\.|by)\s?([\d,]+\.?\d*)/)
    if (amountMatch && amountMatch[1]) {
      amount = Number.parseFloat(amountMatch[1].replace(/,/g, ""))
    }

    const toMatch = message.match(/(?:to|trf to)\s+([a-z0-9\s.&'-]+?)(?=\s+refno|\s+on\s|\.|$)/i)
    if (toMatch && toMatch[1]) {
      recipient = toMatch[1]
        .trim()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    }

    description = `Transaction via SMS to ${recipient}`
  }

  return { transactionType, amount, description, recipient }
}

async function fetchTransactions() {
  const { data, error } = await supabase.from("transactions").select("*").order("timestamp", { ascending: false })
  if (error) {
    console.error("Error fetching transactions:", error.message)
    return []
  }
  return data || []
}

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState({ totalBalance: 0, income: 0, expenses: 0, savingsRate: 0 })
  const [categoryData, setCategoryData] = useState([])
  const [typeData, setTypeData] = useState([])
  const [monthlyData, setMonthlyData] = useState({ income: Array(12).fill(0), expenses: Array(12).fill(0) })
  const [topExpenses, setTopExpenses] = useState([])
  const [topCredits, setTopCredits] = useState([])
  const [dailyTrends, setDailyTrends] = useState([])
  const [weeklyComparison, setWeeklyComparison] = useState([])
  const [expenseGrowth, setExpenseGrowth] = useState([])

  useEffect(() => {
    setMounted(true)
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

    async function loadData() {
      const fetchedTransactions = await fetchTransactions()
      setTransactions(fetchedTransactions)

      let income = 0
      let expenses = 0
      const categoryExpenses = {}
      const typeCounts = {}
      const monthlyIncome = Array(12).fill(0)
      const monthlyExpenses = Array(12).fill(0)
      const recipientExpenses = {}
      const recipientCredits = {}
      const dailyData = {}
      const weeklyData = Array(7)
        .fill(0)
        .map((_, i) => ({ day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i], amount: 0, count: 0 }))
      const monthlyGrowth = Array(12)
        .fill(0)
        .map((_, i) => ({
          month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
          expenses: 0,
          income: 0,
        }))

      fetchedTransactions.forEach((tx) => {
        const details = getTransactionDetails(tx)
        const month = new Date(tx.timestamp).getMonth()
        const date = new Date(tx.timestamp).toDateString()
        const dayOfWeek = new Date(tx.timestamp).getDay()

        typeCounts[details.transactionType] = (typeCounts[details.transactionType] || 0) + 1

        if (!dailyData[date]) {
          dailyData[date] = { date, income: 0, expenses: 0, transactions: 0 }
        }
        dailyData[date].transactions += 1

        if (details.transactionType === "CREDIT") {
          income += details.amount
          monthlyIncome[month] += details.amount
          monthlyGrowth[month].income += details.amount
          dailyData[date].income += details.amount

          if (details.recipient && details.recipient !== "N/A") {
            recipientCredits[details.recipient] = (recipientCredits[details.recipient] || 0) + details.amount
          }
        } else if (details.transactionType === "DEBIT" || details.transactionType === "UPI") {
          expenses += details.amount
          monthlyExpenses[month] += details.amount
          monthlyGrowth[month].expenses += details.amount
          dailyData[date].expenses += details.amount
          weeklyData[dayOfWeek].amount += details.amount
          weeklyData[dayOfWeek].count += 1

          const category = tx.category || "other"
          categoryExpenses[category] = (categoryExpenses[category] || 0) + details.amount

          if (details.recipient && details.recipient !== "N/A") {
            recipientExpenses[details.recipient] = (recipientExpenses[details.recipient] || 0) + details.amount
          }
        }
      })

      const totalBalance = income - expenses
      const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0
      setSummary({ totalBalance, income, expenses, savingsRate })

      const formattedCategoryData = Object.entries(categoryExpenses)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
      setCategoryData(formattedCategoryData)

      const formattedTypeData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }))
      setTypeData(formattedTypeData)

      setMonthlyData({ income: monthlyIncome, expenses: monthlyExpenses })

      setTopExpenses(
        Object.entries(recipientExpenses)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10),
      )
      setTopCredits(
        Object.entries(recipientCredits)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10),
      )
      setDailyTrends(
        Object.values(dailyData)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(-30),
      )
      setWeeklyComparison(weeklyData)
      setExpenseGrowth(monthlyGrowth)
    }

    loadData()
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
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Financial Dashboard</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link
                href="/transactions/new"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white flex items-center space-x-2 hover:bg-indigo-700 shadow-md transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>New Transaction</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <SummaryCard title="Total Balance" value={summary.totalBalance} icon={DollarSign} color="indigo" />
            <SummaryCard title="Monthly Income" value={summary.income} icon={ArrowUpRight} color="green" />
            <SummaryCard title="Monthly Expenses" value={summary.expenses} icon={ArrowDownLeft} color="red" />
            <SummaryCard
              title="Savings Rate"
              value={summary.savingsRate}
              isPercentage={true}
              icon={CreditCard}
              color="sky"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Daily Transaction Trends (Last 30 Days)
              </h2>
              <div className="h-80">
                <DailyTrendsChart data={dailyTrends} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Monthly Growth Analysis
              </h2>
              <div className="h-80">
                <ExpenseGrowthChart data={expenseGrowth} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                Top Expenses
              </h2>
              <TopExpensesList data={topExpenses} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Top Credits
              </h2>
              <TopCreditsList data={topCredits} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Spending Pattern
              </h2>
              <div className="h-80">
                <WeeklyComparisonChart data={weeklyComparison} />
              </div>
            </div>
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Monthly Overview</h2>
              <div className="h-80">
                <MonthlyOverviewChart data={monthlyData} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-8">
            <div className="lg:col-span-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Expenses by Category</h2>
              <div className="h-80">
                <ExpensesByCategoryChart data={categoryData} />
              </div>
            </div>
            <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Transaction Types</h2>
              <div className="h-80">
                <TransactionTypeChart data={typeData} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Recent Transactions</h2>
              <RecentTransactions transactions={transactions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SummaryCard({ title, value, icon: Icon, color, isPercentage = false }) {
  const formatCurrency = (num) =>
    `₹${num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const displayValue = isPercentage ? `${value.toFixed(1)}%` : formatCurrency(value)
  const colorClasses = {
    indigo: `bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400`,
    green: `bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400`,
    red: `bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400`,
    sky: `bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400`,
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-5 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">{displayValue}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

function RecentTransactions({ transactions }) {
  const getCategoryIcon = (category) => {
    const icons = { food_and_dining: "🍔", transportation: "🚗", shopping: "🛍️", entertainment: "🎬", other: "📦" }
    return icons[category?.toLowerCase()] || "🧾"
  }
  const getTypeAttributes = (type) => {
    const types = {
      CREDIT: { color: "text-green-600 dark:text-green-400", bgColor: "bg-green-50 dark:bg-green-900/30", sign: "+" },
      DEBIT: { color: "text-red-600 dark:text-red-400", bgColor: "bg-red-50 dark:bg-red-900/30", sign: "-" },
      UPI: { color: "text-indigo-600 dark:text-indigo-400", bgColor: "bg-indigo-50 dark:bg-indigo-900/30", sign: "-" },
      SMS: { color: "text-yellow-600 dark:text-yellow-400", bgColor: "bg-yellow-50 dark:bg-yellow-900/30", sign: "" },
      UNKNOWN: { color: "text-gray-600 dark:text-gray-400", bgColor: "bg-gray-100 dark:bg-gray-700/30", sign: "" },
    }
    return types[type] || types.UNKNOWN
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-10 h-full flex flex-col justify-center items-center">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No transactions found</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Your recent transactions will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.slice(0, 5).map((transaction) => {
        const { transactionType, amount, recipient } = getTransactionDetails(transaction)
        const typeAttr = getTypeAttributes(transactionType)
        return (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/20 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl shadow-sm">
                {getCategoryIcon(transaction.category)}
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">{recipient}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(transaction.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold text-lg ${typeAttr.color}`}>
                {typeAttr.sign}₹{amount.toFixed(2)}
              </p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${typeAttr.bgColor} ${typeAttr.color}`}
              >
                {transactionType}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function MonthlyOverviewChart({ data }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const { income: incomeData, expenses: expenseData } = data
  const maxValue = Math.max(1, ...incomeData, ...expenseData) // Ensure maxValue is at least 1 to avoid division by zero

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 flex items-end justify-between px-2">
        {months.map((month, index) => (
          <div key={month} className="flex-1 flex flex-col items-center group">
            <div className="w-full flex justify-center space-x-1" style={{ height: "100%" }}>
              <div
                className="w-3 bg-green-400 rounded-t-md transition-all duration-300"
                style={{ height: `${(incomeData[index] / maxValue) * 100}%` }}
              ></div>
              <div
                className="w-3 bg-red-400 rounded-t-md transition-all duration-300"
                style={{ height: `${(expenseData[index] / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">{month}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded mr-2"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Income</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Expense</span>
        </div>
      </div>
    </div>
  )
}

function ExpensesByCategoryChart({ data }) {
  const colors = [
    "bg-indigo-500",
    "bg-sky-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-red-500",
    "bg-gray-500",
  ]
  const total = data.reduce((sum, category) => sum + category.value, 0)

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 flex items-center justify-center h-full">
        No expense data available.
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-2">
        {data.map((category, index) => {
          const percentage = total > 0 ? (category.value / total) * 100 : 0
          return (
            <div key={category.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300 capitalize">{category.name.replace(/_/g, " ")}</span>
                <span className="font-medium text-gray-800 dark:text-white">₹{category.value.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className={`${colors[index % colors.length]} h-2.5 rounded-full`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TransactionTypeChart({ data }) {
  const colors = {
    CREDIT: "bg-green-500",
    DEBIT: "bg-red-500",
    UPI: "bg-indigo-500",
    SMS: "bg-yellow-500",
    UNKNOWN: "bg-gray-500",
  }
  const total = data.reduce((sum, type) => sum + type.value, 0)

  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 flex items-center justify-center h-full">
        No transaction types to show.
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          {
            data.reduce(
              (acc, type) => {
                const percentage = total > 0 ? (type.value / total) * 100 : 0
                const offset = acc.offset
                acc.elements.push(
                  <circle
                    key={type.name}
                    className={`${colors[type.name] || colors.UNKNOWN}`}
                    strokeWidth="4"
                    fill="none"
                    cx="18"
                    cy="18"
                    r="15.915"
                    strokeDasharray={`${percentage}, 100`}
                    strokeDashoffset={`-${offset}`}
                  />,
                )
                acc.offset += percentage
                return acc
              },
              { elements: [], offset: 0 },
            ).elements
          }
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">{total}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 text-center">
        {data.map((type) => (
          <div key={type.name} className="flex items-center justify-center">
            <div className={`w-3 h-3 rounded-full ${colors[type.name] || colors.UNKNOWN} mr-2`}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {type.name} ({type.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DailyTrendsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
          className="text-gray-600 dark:text-gray-400"
        />
        <YAxis className="text-gray-600 dark:text-gray-400" />
        <Tooltip
          formatter={(value, name) => [`₹${value.toFixed(2)}`, name === "income" ? "Income" : "Expenses"]}
          labelFormatter={(value) => new Date(value).toLocaleDateString("en-IN")}
          contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
        />
        <Area
          type="monotone"
          dataKey="income"
          stackId="1"
          stroke="hsl(var(--chart-2))"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.6}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stackId="1"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function ExpenseGrowthChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
        <YAxis className="text-gray-600 dark:text-gray-400" />
        <Tooltip
          formatter={(value, name) => [`₹${value.toFixed(2)}`, name === "income" ? "Income" : "Expenses"]}
          contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
        />
        <Bar dataKey="income" fill="hsl(var(--chart-2))" />
        <Bar dataKey="expenses" fill="hsl(var(--chart-1))" />
      </BarChart>
    </ResponsiveContainer>
  )
}

function WeeklyComparisonChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis type="number" className="text-gray-600 dark:text-gray-400" />
        <YAxis dataKey="day" type="category" className="text-gray-600 dark:text-gray-400" />
        <Tooltip
          formatter={(value) => [`₹${value.toFixed(2)}`, "Amount"]}
          contentStyle={{ backgroundColor: "var(--color-card)", border: "1px solid var(--color-border)" }}
        />
        <Bar dataKey="amount" fill="hsl(var(--chart-3))" />
      </BarChart>
    </ResponsiveContainer>
  )
}

function TopExpensesList({ data }) {
  if (data.length === 0) {
    return <div className="text-center text-gray-500 py-8">No expense data available</div>
  }

  return (
    <div className="space-y-3">
      {data.map((expense, index) => (
        <div
          key={expense.name}
          className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 font-semibold text-sm">
              {index + 1}
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">{expense.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Recipient</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-red-600 dark:text-red-400">₹{expense.value.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TopCreditsList({ data }) {
  if (data.length === 0) {
    return <div className="text-center text-gray-500 py-8">No credit data available</div>
  }

  return (
    <div className="space-y-3">
      {data.map((credit, index) => (
        <div
          key={credit.name}
          className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 font-semibold text-sm">
              {index + 1}
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">{credit.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Source</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-green-600 dark:text-green-400">₹{credit.value.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
