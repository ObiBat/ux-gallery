"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Palette,
  Type,
  SquareStack,
  Component,
  Moon,
  Sun,
  Search,
  Menu,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Tokens", href: "/tokens", icon: LayoutDashboard },
  { name: "Colors", href: "/colors", icon: Palette },
  { name: "Typography", href: "/typography", icon: Type },
  { name: "Icons", href: "/icons", icon: SquareStack },
  { name: "Components", href: "/components", icon: Component },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [search, setSearch] = useState("");

  const filteredNavigation = navigation.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={cn("flex h-screen flex-col glass", className)}>
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <div className="h-6 w-6 rounded-lg bg-primary" />
          <span>UX Gallery</span>
        </Link>
      </div>
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 bg-background/50 backdrop-blur-sm"
          />
        </div>
      </div>
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-2">
          {filteredNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          {filteredNavigation.length === 0 && (
            <p className="text-xs text-muted-foreground px-3 py-2">No results found</p>
          )}
        </div>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-full justify-start gap-3 px-3"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <div className="relative flex items-center justify-center h-4 w-4">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
          <span>Toggle Theme</span>
        </Button>
      </div>
    </div>
  );
}

export function MobileNav() {
  return (
    <div className="md:hidden flex h-14 items-center border-b px-6 glass sticky top-0 z-40 w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 border-none">
          <Sidebar className="w-full border-none" />
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
        <div className="h-6 w-6 rounded-lg bg-primary" />
        <span>UX Gallery</span>
      </Link>
    </div>
  );
}
