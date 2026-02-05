"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface PlaygroundRendererProps {
  slug: string;
  props: Record<string, string | number | boolean>;
}

export function PlaygroundRenderer({ slug, props }: PlaygroundRendererProps) {
  switch (slug) {
    case "button":
      return (
        <Button
          variant={props.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"}
          size={props.size as "default" | "sm" | "lg" | "icon"}
        >
          {props.text as string}
        </Button>
      );
    case "badge":
      return (
        <Badge variant={props.variant as "default" | "secondary" | "outline" | "destructive"}>
          {props.text as string}
        </Badge>
      );
    case "card":
      return (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>{props.title as string}</CardTitle>
            <CardDescription>{props.description as string}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      );
    default:
      return <div>Component not found</div>;
  }
}
