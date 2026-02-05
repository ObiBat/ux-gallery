"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function TypographyExplorer() {
  const [fontSize, setFontSize] = useState(32);
  const [fontWeight, setFontWeight] = useState("400");
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
  const [fontFamily, setFontFamily] = useState("var(--font-geist-sans)");

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Typography Explorer</h1>
        <p className="text-muted-foreground">
          Experiment with different typographic settings and preview them in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 glass-card border-none">
          <CardContent className="p-6 space-y-8">
            <div className="space-y-4">
              <Label>Font Family</Label>
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="var(--font-geist-sans)">Geist Sans</SelectItem>
                  <SelectItem value="var(--font-geist-mono)">Geist Mono</SelectItem>
                  <SelectItem value="serif">System Serif</SelectItem>
                  <SelectItem value="sans-serif">System Sans</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Font Size: {fontSize}px</Label>
              </div>
              <Slider
                value={[fontSize]}
                onValueChange={(v) => setFontSize(v[0])}
                min={12}
                max={120}
                step={1}
              />
            </div>

            <div className="space-y-4">
              <Label>Font Weight</Label>
              <Select value={fontWeight} onValueChange={setFontWeight}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">Thin (100)</SelectItem>
                  <SelectItem value="300">Light (300)</SelectItem>
                  <SelectItem value="400">Regular (400)</SelectItem>
                  <SelectItem value="500">Medium (500)</SelectItem>
                  <SelectItem value="600">SemiBold (600)</SelectItem>
                  <SelectItem value="700">Bold (700)</SelectItem>
                  <SelectItem value="900">Black (900)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Line Height: {lineHeight}</Label>
              </div>
              <Slider
                value={[lineHeight]}
                onValueChange={(v) => setLineHeight(v[0])}
                min={1}
                max={2}
                step={0.1}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Letter Spacing: {letterSpacing}px</Label>
              </div>
              <Slider
                value={[letterSpacing]}
                onValueChange={(v) => setLetterSpacing(v[0])}
                min={-5}
                max={20}
                step={0.5}
              />
            </div>

            <div className="space-y-4">
              <Label>Preview Text</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-background/50"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 glass-card border-none min-h-[400px] flex items-center justify-center overflow-hidden">
          <CardContent className="p-12 w-full text-center">
            <motion.p
              animate={{
                fontSize: `${fontSize}px`,
                fontWeight: fontWeight,
                lineHeight: lineHeight,
                letterSpacing: `${letterSpacing}px`,
                fontFamily: fontFamily,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="break-words"
            >
              {text}
            </motion.p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
