"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, RefreshCw, Palette } from "lucide-react";
import { motion } from "framer-motion";

export default function ColorGenerator() {
  const [baseColor, setBaseColor] = useState("#3b82f6");

  const hexToHsl = (hex: string) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const hslToHex = (h: number, s: number, lVal: number) => {
    const l = lVal / 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const palette = useMemo(() => {
    try {
      const [h, s] = hexToHsl(baseColor);
      return [
        { name: "50", h, s, l: 95 },
        { name: "100", h, s, l: 90 },
        { name: "200", h, s, l: 80 },
        { name: "300", h, s, l: 70 },
        { name: "400", h, s, l: 60 },
        { name: "500", h, s, l: 50 },
        { name: "600", h, s, l: 40 },
        { name: "700", h, s, l: 30 },
        { name: "800", h, s, l: 20 },
        { name: "900", h, s, l: 10 },
      ].map(color => ({
        ...color,
        hex: hslToHex(color.h, color.s, color.l)
      }));
    } catch {
      return [];
    }
  }, [baseColor]);

  const copyToClipboard = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success(`Copied ${val} to clipboard!`);
  };

  const generateRandom = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setBaseColor(randomHex);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Color Palette Generator</h1>
          <p className="text-muted-foreground">
            Generate monochromatic palettes from a base color.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="base-color">Base Color</Label>
            <div className="flex gap-2">
              <Input
                id="base-color"
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-12 p-1 h-10 glass-card"
              />
              <Input
                type="text"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-32 glass-card"
              />
              <Button variant="outline" size="icon" onClick={generateRandom} className="glass-card bg-transparent">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {palette.map((color, i) => (
          <motion.div
            key={color.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="glass-card border-none overflow-hidden group">
              <div
                className="h-24 w-full cursor-pointer transition-transform group-hover:scale-105"
                style={{ backgroundColor: color.hex }}
                onClick={() => copyToClipboard(color.hex)}
              />
              <CardContent className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{color.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(color.hex)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs font-mono text-muted-foreground uppercase">{color.hex}</p>
                <p className="text-[10px] text-muted-foreground/60">
                  hsl({color.h}, {color.s}%, {color.l}%)
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 rounded-2xl">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Export Variables
        </h3>
        <pre className="bg-background/50 p-6 rounded-xl overflow-x-auto text-xs font-mono border">
{`:root {
${palette.map(c => `  --color-primary-${c.name}: ${c.hex};`).join('\n')}
}`}
        </pre>
        <Button
          className="mt-4"
          onClick={() => copyToClipboard(palette.map(c => `--color-primary-${c.name}: ${c.hex};`).join('\n'))}
        >
          Copy CSS Variables
        </Button>
      </div>
    </div>
  );
}
