"use client";

import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/page-transition";
import { AnimatePresence } from "framer-motion";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}
