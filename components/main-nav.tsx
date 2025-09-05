"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CalendarIcon, CreditCard, Home, PieChart, Settings, Smartphone } from "lucide-react";
import { supabase } from "@/lib/SupabaseClient";
import { useEffect, useState } from "react";

export function MainNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  // Fetch user on mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user?.user_metadata ?? null);
      console.log(data.user?.user_metadata)
    };
    getUser();

    // Listen for auth changes
    // const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    //   setUser(session?.user ?? null);
    // });

   
  }, []);

  useEffect(() => {
    console.log(user?.avatar_url);
  }, [user])

  const routes = [
    { href: "/", label: "Dashboard", icon: Home, active: pathname === "/" },
    { href: "/transactions", label: "Transactions", icon: CreditCard, active: pathname === "/transactions" },
    { href: "/sms", label: "SMS Transactions", icon: Smartphone, active: pathname === "/sms" },
    { href: "/analytics", label: "Analytics", icon: PieChart, active: pathname === "/analytics" },
    { href: "/calendar", label: "Calendar", icon: CalendarIcon, active: pathname === "/calendar" },
    { href: "/settings", label: "Settings", icon: Settings, active: pathname === "/settings" },
  ];

const signInWithGoogle = async () => {
  // Get the base URL from environment variables
  const redirectURL = process.env.NEXT_PUBLIC_SITE_URL;

  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectURL,
    },
  });
};

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="hidden md:flex md:justify-between space-x-4 lg:space-x-6">
      {routes.map((route) => {
        const Icon = route.icon;
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {route.label}
          </Link>
        );
      })}

      {user ? (
        <div className="flex items-center space-x-2">
          <img
            className="rounded-full w-8 h-8"
            src={user?.avatar_url || "/default-profile.png"}
            alt="Profile image"
          />
          <button
            onClick={signOut}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="flex items-center text-sm font-medium transition-colors hover:text-primary"
        >
          Sign in with Google
        </button>
      )}
    </nav>
  );
}
