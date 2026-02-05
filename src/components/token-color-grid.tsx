import { tokens } from "@/data/tokens";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TokenColorGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tokens.colors.map((color) => (
        <Card key={color.name} className="glass-card border-none overflow-hidden">
          <div
            className="h-24 w-full"
            style={{ backgroundColor: `var(${color.variable})` }}
          />
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-bold">{color.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <code className="text-xs text-muted-foreground">{color.variable}</code>
            <div className="text-xs font-mono mt-1">{color.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
