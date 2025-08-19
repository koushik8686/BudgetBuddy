// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Download, Plus, Search, ArrowUpDown, Calendar, AlertCircle } from "lucide-react"
// import { supabase,} from "@/lib/SupabaseClient"

// export default function TransactionsPage() {
//   const [activeTab, setActiveTab] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [transactions, setTransactions] = useState<>([])
//   const [loading, setLoading] = useState(true)
//   const [sortBy, setSortBy] = useState("date")
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
//   const [dateFilter, setDateFilter] = useState<"all" | "7d" | "30d" | "90d">("all")

//   useEffect(() => {
//     fetchTransactions()
//   }, [])

//   const fetchTransactions = async () => {
//     try {
//       setLoading(true)

   

//       const { data, error } = await supabase.from("transactions").select("*").order("created_at", { ascending: false })
//       console.log(data)
//       if (error) {
//         console.error("Error fetching transactions:", error)
//         // Fallback to mock data on error
//         setTransactions([])
//         return
//       }

//       const transformedData =
//         data?.map((item) => ({
//           id: item.id,
//           created_at: item.created_at,
//           amount: item.amount,
//           recipient: item.recipient || "Unknown",
//           category: item.category || "Other",
//           transaction_type: item.transaction_type || "DEBIT",
//           bank_name: item.bank_name || "Unknown Bank",
//           description: item.description || item.recipient || "Transaction",
//           date: item.created_at,
//         })) || []

//       setTransactions(transformedData)
//     } catch (error) {
//       console.error("Error:", error)
//       // Fallback to mock data on error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getDateFilteredTransactions = (transactions: Transaction[]) => {
//     if (dateFilter === "all") return transactions

//     const now = new Date()
//     const days = dateFilter === "7d" ? 7 : dateFilter === "30d" ? 30 : 90
//     const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

//     return transactions.filter((t) => new Date(t.date) >= cutoffDate)
//   }

//   const getSortedTransactions = (transactions: Transaction[]) => {
//     return [...transactions].sort((a, b) => {
//       let comparison = 0

//       if (sortBy === "date") {
//         comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
//       } else if (sortBy === "amount") {
//         comparison = Math.abs(a.amount) - Math.abs(b.amount)
//       }

//       return sortOrder === "asc" ? comparison : -comparison
//     })
//   }

//   const filteredTransactions = getSortedTransactions(
//     getDateFilteredTransactions(transactions).filter((transaction) => {
//       // Filter by tab
//       if (activeTab === "income" && transaction.amount <= 0) return false
//       if (activeTab === "expense" && transaction.amount > 0) return false

//       // Filter by search query
//       if (searchQuery) {
//         const query = searchQuery.toLowerCase()
//         return (
//           transaction.description.toLowerCase().includes(query) ||
//           transaction.category.toLowerCase().includes(query) ||
//           transaction.recipient.toLowerCase().includes(query) ||
//           transaction.bank_name.toLowerCase().includes(query)
//         )
//       }

//       return true
//     }),
//   )

//   const getTypeColor = (type: string) => {
//     const colors = {
//       CREDIT: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
//       DEBIT: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
//       UPI: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
//     }
//     return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
//   }

//   const handleSort = (field: "date" | "amount") => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc")
//     } else {
//       setSortBy(field)
//       setSortOrder("desc")
//     }
//   }

//   const exportTransactions = () => {
//     const csvContent = [
//       ["Date", "Description", "Category", "Amount", "Type", "Bank", "Recipient"].join(","),
//       ...filteredTransactions.map((t) =>
//         [
//           new Date(t.date).toLocaleDateString(),
//           `"${t.description}"`,
//           t.category,
//           t.amount,
//           t.transaction_type,
//           `"${t.bank_name}"`,
//           `"${t.recipient}"`,
//         ].join(","),
//       ),
//     ].join("\n")

//     const blob = new Blob([csvContent], { type: "text/csv" })
//     const url = window.URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`
//     a.click()
//     window.URL.revokeObjectURL(url)
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto">
//         {!isSupabaseConfigured && (
//           <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
//             <div className="flex items-center space-x-2">
//               <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
//               <div>
//                 <p className="text-yellow-800 dark:text-yellow-200 font-medium">Supabase Not Configured</p>
//                 <p className="text-yellow-700 dark:text-yellow-300 text-sm">
//                   Currently showing mock data. To connect your Supabase database, add the integration in Project
//                   Settings.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Transactions</h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-1">
//               {filteredTransactions.length} transactions found
//               {!isSupabaseConfigured && " (mock data)"}
//             </p>
//           </div>
//           <Link
//             href="/"
//             className="px-4 py-2 rounded-lg bg-indigo-600 text-white flex items-center space-x-1 hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-indigo-900/20 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30"
//           >
//             <Plus className="h-4 w-4" />
//             <span>Back to Dashboard</span>
//           </Link>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-6 mb-6">
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => setActiveTab("all")}
//                 className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//                   activeTab === "all"
//                     ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20"
//                     : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
//                 }`}
//               >
//                 All Transactions
//               </button>
//               <button
//                 onClick={() => setActiveTab("income")}
//                 className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//                   activeTab === "income"
//                     ? "bg-green-600 text-white shadow-md shadow-green-200 dark:shadow-green-900/20"
//                     : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
//                 }`}
//               >
//                 Income
//               </button>
//               <button
//                 onClick={() => setActiveTab("expense")}
//                 className={`px-4 py-2 rounded-lg transition-all duration-200 ${
//                   activeTab === "expense"
//                     ? "bg-red-600 text-white shadow-md shadow-red-200 dark:shadow-red-900/20"
//                     : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
//                 }`}
//               >
//                 Expenses
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {[
//                 { key: "all", label: "All Time" },
//                 { key: "7d", label: "Last 7 Days" },
//                 { key: "30d", label: "Last 30 Days" },
//                 { key: "90d", label: "Last 90 Days" },
//               ].map(({ key, label }) => (
//                 <button
//                   key={key}
//                   onClick={() => setDateFilter(key as any)}
//                   className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
//                     dateFilter === key
//                       ? "bg-blue-600 text-white"
//                       : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
//                   }`}
//                 >
//                   <Calendar className="h-3 w-3 inline mr-1" />
//                   {label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
//             <div className="flex space-x-2">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="search"
//                   placeholder="Search transactions..."
//                   className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => handleSort("date")}
//                 className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center space-x-1"
//                 title="Sort by date"
//               >
//                 <Calendar className="h-4 w-4" />
//                 <ArrowUpDown className="h-3 w-3" />
//               </button>
//               <button
//                 onClick={() => handleSort("amount")}
//                 className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center space-x-1"
//                 title="Sort by amount"
//               >
//                 <span className="text-sm">₹</span>
//                 <ArrowUpDown className="h-3 w-3" />
//               </button>
//               <button
//                 onClick={exportTransactions}
//                 className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
//                 title="Export to CSV"
//               >
//                 <Download className="h-5 w-5" />
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
//                   <th className="pb-3 font-medium">Description</th>
//                   <th className="pb-3 font-medium">Recipient</th>
//                   <th className="pb-3 font-medium">Category</th>
//                   <th className="pb-3 font-medium">Date</th>
//                   <th className="pb-3 font-medium">Amount</th>
//                   <th className="pb-3 font-medium">Type</th>
//                   <th className="pb-3 font-medium">Bank</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTransactions.map((transaction, index) => (
//                   <tr
//                     key={transaction.id}
//                     className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
//                     style={{ animation: `fadeIn 0.5s ease-out ${index * 0.05}s both` }}
//                   >
//                     <td className="py-4 font-medium text-gray-800 dark:text-white">{transaction.description}</td>
//                     <td className="py-4 text-gray-600 dark:text-gray-300">{transaction.recipient}</td>
//                     <td className="py-4 text-gray-600 dark:text-gray-300">{transaction.category}</td>
//                     <td className="py-4 text-gray-600 dark:text-gray-300">
//                       {new Date(transaction.date).toLocaleDateString()}
//                     </td>
//                     <td
//                       className={`py-4 font-medium ${transaction.amount > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
//                     >
//                       {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toFixed(2)}
//                     </td>
//                     <td className="py-4">
//                       <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(transaction.transaction_type)}`}>
//                         {transaction.transaction_type}
//                       </span>
//                     </td>
//                     <td className="py-4 text-gray-600 dark:text-gray-300">{transaction.bank_name}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filteredTransactions.length === 0 && !loading && (
//             <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//               <div className="mb-4">
//                 <Search className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
//               </div>
//               <p className="text-lg font-medium mb-2">No transactions found</p>
//               <p>Try adjusting your filters or search terms.</p>
//             </div>
//           )}
//         </div>
//       </div>
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   )
// }
