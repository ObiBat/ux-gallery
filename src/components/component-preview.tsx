"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ComponentPreviewProps {
  code: string;
  children: React.ReactNode;
}

export function ComponentPreview({ code, children }: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tabs defaultValue="preview" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <TabsList className="glass p-1">
          <TabsTrigger value="preview" className="rounded-md">Preview</TabsTrigger>
          <TabsTrigger value="code" className="rounded-md">Code</TabsTrigger>
        </TabsList>
        <Button variant="outline" size="icon" onClick={copyCode} className="h-8 w-8 glass-card bg-transparent">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <TabsContent value="preview" className="mt-0">
        <div className="glass-card rounded-2xl p-12 flex items-center justify-center min-h-[300px]">
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <div className="rounded-2xl overflow-hidden border">
          <SyntaxHighlighter
            language="tsx"
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "24px",
              fontSize: "14px",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </TabsContent>
    </Tabs>
  );
}
