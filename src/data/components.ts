export interface ComponentDefinition {
  slug: string;
  name: string;
  description: string;
  code: string;
  props: {
    name: string;
    type: "select" | "slider" | "switch" | "text";
    options?: string[];
    min?: number;
    max?: number;
    step?: number;
    default: string | number | boolean;
  }[];
}

export const components: ComponentDefinition[] = [
  {
    slug: "button",
    name: "Button",
    description: "Displays a button or a component that looks like a button.",
    code: `import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return (
    <Button variant="{variant}" size="{size}">
      {text}
    </Button>
  )
}`,
    props: [
      { name: "variant", type: "select", options: ["default", "destructive", "outline", "secondary", "ghost", "link"], default: "default" },
      { name: "size", type: "select", options: ["default", "sm", "lg", "icon"], default: "default" },
      { name: "text", type: "text", default: "Button" },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    description: "Displays a badge or a component that looks like a badge.",
    code: `import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <Badge variant="{variant}">
      {text}
    </Badge>
  )
}`,
    props: [
      { name: "variant", type: "select", options: ["default", "secondary", "outline", "destructive"], default: "default" },
      { name: "text", type: "text", default: "Badge" },
    ],
  },
  {
    slug: "card",
    name: "Card",
    description: "Displays a card with header, content, and footer.",
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}`,
    props: [
      { name: "title", type: "text", default: "Create project" },
      { name: "description", type: "text", default: "Deploy your new project in one-click." },
    ],
  },
];
