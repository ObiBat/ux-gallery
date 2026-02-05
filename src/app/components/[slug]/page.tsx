"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { components } from "@/data/components";
import { ComponentPreview } from "@/components/component-preview";
import { PlaygroundRenderer } from "@/components/playground-renderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ComponentDetailPage() {
  const { slug } = useParams();
  const component = components.find((c) => c.slug === slug);

  const initialProps = useMemo(() => {
    if (!component) return {};
    return component.props.reduce((acc, prop) => {
      acc[prop.name] = prop.default;
      return acc;
    }, {} as Record<string, string | number | boolean>);
  }, [component]);

  const [props, setProps] = useState<Record<string, string | number | boolean>>(initialProps);

  if (!component) {
    return <div>Component not found</div>;
  }

  const updateProp = (name: string, value: string | number | boolean) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  };

  const generatedCode = component.code.replace(/\{(\w+)\}/g, (_, key) => {
    return String(props[key] ?? "");
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link href="/components">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2 text-muted-foreground">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Components
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{component.name}</h1>
        <p className="text-muted-foreground">{component.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <ComponentPreview code={generatedCode}>
            <PlaygroundRenderer slug={component.slug} props={props} />
          </ComponentPreview>
        </div>

        <div className="lg:col-span-1">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider">Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {component.props.map((prop) => (
                <div key={prop.name} className="space-y-2">
                  <Label className="capitalize">{prop.name}</Label>

                  {prop.type === "select" && (
                    <Select
                      value={props[prop.name] as string}
                      onValueChange={(v) => updateProp(prop.name, v)}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {prop.options?.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {prop.type === "text" && (
                    <Input
                      value={props[prop.name] as string}
                      onChange={(e) => updateProp(prop.name, e.target.value)}
                      className="bg-background/50"
                    />
                  )}

                  {prop.type === "slider" && (
                    <Slider
                      value={[props[prop.name] as number]}
                      onValueChange={(v) => updateProp(prop.name, v[0])}
                      min={prop.min}
                      max={prop.max}
                      step={prop.step}
                    />
                  )}

                  {prop.type === "switch" && (
                    <Switch
                      checked={props[prop.name] as boolean}
                      onCheckedChange={(v) => updateProp(prop.name, v)}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
