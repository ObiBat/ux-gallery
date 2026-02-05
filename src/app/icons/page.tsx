"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Search, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ICON_LIST = [
  "lucide:home", "lucide:user", "lucide:settings", "lucide:mail", "lucide:search",
  "lucide:bell", "lucide:calendar", "lucide:camera", "lucide:check", "lucide:chevron-down",
  "lucide:chevron-left", "lucide:chevron-right", "lucide:chevron-up", "lucide:clock",
  "lucide:cloud", "lucide:code", "lucide:copy", "lucide:credit-card", "lucide:database",
  "lucide:delete", "lucide:download", "lucide:edit", "lucide:eye", "lucide:file",
  "lucide:filter", "lucide:flag", "lucide:folder", "lucide:heart", "lucide:image",
  "lucide:info", "lucide:layers", "lucide:link", "lucide:list", "lucide:lock",
  "lucide:map", "lucide:menu", "lucide:message-square", "lucide:mic", "lucide:minus",
  "lucide:moon", "lucide:more-horizontal", "lucide:more-vertical", "lucide:music",
  "lucide:package", "lucide:paperclip", "lucide:phone", "lucide:play", "lucide:plus",
  "lucide:power", "lucide:printer", "lucide:refresh-cw", "lucide:save", "lucide:send",
  "lucide:share", "lucide:shield", "lucide:shopping-cart", "lucide:star", "lucide:sun",
  "lucide:tag", "lucide:target", "lucide:thumbs-up", "lucide:trash", "lucide:triangle",
  "lucide:unlock", "lucide:upload", "lucide:video", "lucide:volume-2", "lucide:wifi",
  "logos:react", "logos:nextjs-icon", "logos:tailwindcss-icon", "logos:typescript-icon",
  "logos:framer", "logos:figma", "logos:github-icon", "logos:visual-studio-code",
];

export default function IconBrowser() {
  const [search, setSearch] = useState("");
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const filteredIcons = ICON_LIST.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (icon: string) => {
    const snippet = `<Icon icon="${icon}" />`;
    navigator.clipboard.writeText(snippet);
    setCopiedIcon(icon);
    toast.success("Copied to clipboard!", {
      description: snippet,
    });
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Icon Browser</h1>
          <p className="text-muted-foreground">
            Browse and search for icons from the Iconify library.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 glass-card"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AnimatePresence>
          {filteredIcons.map((icon) => (
            <motion.div
              key={icon}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="glass-card border-none cursor-pointer group relative overflow-hidden h-32 flex flex-col items-center justify-center gap-3 p-4"
                onClick={() => copyToClipboard(icon)}
              >
                <div className="text-3xl group-hover:scale-110 transition-transform">
                  <Icon icon={icon} />
                </div>
                <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                  {icon.split(":")[1]}
                </span>

                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {copiedIcon === icon ? (
                    <Check className="h-6 w-6 text-primary" />
                  ) : (
                    <Copy className="h-6 w-6 text-primary" />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground italic">No icons found matching &quot;{search}&quot;</p>
        </div>
      )}
    </div>
  );
}
