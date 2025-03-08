"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { CalendarIcon, CreditCard, Home, PieChart, Settings, Smartphone } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/transactions",
      label: "Transactions",
      icon: CreditCard,
      active: pathname === "/transactions",
    },
    {
      href: "/sms",
      label: "SMS Transactions",
      icon: Smartphone,
      active: pathname === "/sms",
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: PieChart,
      active: pathname === "/analytics",
    },
    {
      href: "/calendar",
      label: "Calendar",
      icon: CalendarIcon,
      active: pathname === "/calendar",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ]

  return (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => {
        const Icon = route.icon
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {route.label}
          </Link>
        )
      })}
    </nav>
  )
}

