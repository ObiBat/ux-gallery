"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, Palette, Component } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20px)] p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Internal UX Design Gallery
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          A modern showcase of design tokens, components, and brand assets for our internal design system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Tokens", icon: LayoutDashboard, href: "/tokens", desc: "Colors, spacing, and typography." },
            { title: "Colors", icon: Palette, href: "/colors", desc: "Palette generator and exports." },
            { title: "Components", icon: Component, href: "/components", desc: "Interactive UI library." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (i + 1) }}
              className="glass-card p-6 rounded-2xl text-left"
            >
              <item.icon className="h-10 w-10 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
              <Link href={item.href}>
                <Button variant="ghost" className="group p-0 h-auto hover:bg-transparent">
                  Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/components">
            <Button size="lg" className="rounded-full px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/tokens">
            <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
              View Tokens
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
