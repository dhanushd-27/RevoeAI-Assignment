import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DynamicTableProps {
  columns: string[]
  data: any[];
}

export default function DynamicTable({ columns, data }: DynamicTableProps) {

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Table className="w-full border-collapse border border-gray-300">
        <TableHeader className="border-b border-gray-300">
          <TableRow className="border-b border-gray-300">
            {columns.map((col, index) => (
              <TableHead key={index} className="border-r border-gray-300 px-4 py-2 text-left">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {/* <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-b border-gray-300">
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} className="border-r border-gray-300 px-4 py-2">
                    {row[col] || "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-2">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody> */}
      </Table>
    </div>
  );
}
