"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CalendarIcon, CreditCard, Home, Menu, PieChart, Settings, Smartphone } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold" onClick={() => setOpen(false)}>
            <CreditCard className="h-5 w-5" />
            <span>Expense Tracker</span>
          </Link>
          <div className="grid gap-3">
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    route.active ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {route.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

