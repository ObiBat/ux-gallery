import { tokens } from "@/data/tokens";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TokenSpacingTable() {
  return (
    <div className="rounded-xl border glass-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-white/10">
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Pixels</TableHead>
            <TableHead className="text-right">Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tokens.spacing.map((space) => (
            <TableRow key={space.name} className="border-white/10 hover:bg-white/5">
              <TableCell className="font-medium">{space.name}</TableCell>
              <TableCell>{space.size}</TableCell>
              <TableCell>{space.value}</TableCell>
              <TableCell className="text-right">
                <div
                  className="bg-primary rounded ml-auto"
                  style={{ width: space.size, height: "16px" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
