import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAppSelector } from "@/hooks/redux-hooks";

export default function DynamicTable() {
  const columns = useAppSelector(state => state.columnNames);

  const data = [
    ["Dhanush", "21", "3223", "Bangalore", "A"],
    ["Rohit", "37", "2323", "Mumbai", "B"],
    ["Virat", "36", "1212", "Delhi", "A"],
    ["Sachin", "45", "5678", "Pune", "A+"],
    ["Rahul", "29", "9101", "Hyderabad", "B+"],
    ["Kartik", "24", "1121", "Chennai", "A"],
    ["Arjun", "33", "3141", "Kolkata", "B"],
    ["Surya", "27", "5161", "Ahmedabad", "A+"],
    ["Manish", "30", "7181", "Jaipur", "B"],
    ["Deepak", "26", "9202", "Lucknow", "A"]
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Table className="w-full border-collapse border border-gray-300">
        <TableHeader className="border-b border-gray-300">
          <TableRow className="border-b border-gray-300">
            {columns.value.map((col: string, index: number) => (
              <TableHead key={index} className="border-r border-gray-300 px-4 py-2 text-left">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-b border-gray-300">
                {row.map((cell, colIndex) => (
                  <TableCell key={colIndex} className="border-r border-gray-300 px-4 py-2">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.value.length} className="text-center py-2">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
