import { TokenColorGrid } from "@/components/token-color-grid";
import { TokenSpacingTable } from "@/components/token-spacing-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TokensPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Design Tokens</h1>
        <p className="text-muted-foreground">
          Core building blocks of our design system. Colors, spacing, and typography.
        </p>
      </div>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="glass p-1">
          <TabsTrigger value="colors" className="rounded-md">Colors</TabsTrigger>
          <TabsTrigger value="spacing" className="rounded-md">Spacing</TabsTrigger>
          <TabsTrigger value="typography" className="rounded-md">Typography</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Color Palette</h2>
              <p className="text-sm text-muted-foreground mb-4">Foundation colors used across the application.</p>
            </div>
            <TokenColorGrid />
          </div>
        </TabsContent>

        <TabsContent value="spacing" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Spacing Scale</h2>
              <p className="text-sm text-muted-foreground mb-4">Values used for margins, padding, and layout.</p>
            </div>
            <TokenSpacingTable />
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Typography Scale</h2>
              <p className="text-sm text-muted-foreground mb-4">Standardized font sizes and line heights.</p>
            </div>
            <div className="rounded-xl border glass-card p-6 space-y-8">
              {[
                { name: "xs", size: "0.75rem", line: "1rem" },
                { name: "sm", size: "0.875rem", line: "1.25rem" },
                { name: "base", size: "1rem", line: "1.5rem" },
                { name: "lg", size: "1.125rem", line: "1.75rem" },
                { name: "xl", size: "1.25rem", line: "1.75rem" },
                { name: "2xl", size: "1.5rem", line: "2rem" },
                { name: "3xl", size: "1.875rem", line: "2.25rem" },
              ].map((font) => (
                <div key={font.name} className="flex flex-col md:flex-row md:items-center gap-4 justify-between border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="font-bold text-sm uppercase text-primary">{font.name}</p>
                    <p className="text-xs text-muted-foreground">Size: {font.size} / Line: {font.line}</p>
                  </div>
                  <p style={{ fontSize: font.size, lineHeight: font.line }} className="max-w-md">
                    The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
