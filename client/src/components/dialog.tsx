"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState } from 'react'


export default function DialogButton() {
  const [numFields, setNumFields] = useState<number>(0);
  const [columnCollection, setColumnCollection] = useState<string[]>([]);

  const handleColumnCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(0, parseInt(e.target.value) || 0);

    setNumFields(count);
    setColumnCollection(new Array(count).fill(""));
  };

  const handleColumnNameChange = (index: number, value: string) => {
    const updatedColumns = [...columnCollection];
    updatedColumns[index] = value;
    setColumnCollection(updatedColumns);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className='flex justify-center items-center'>
          Add Table
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Table</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Column No.
            </Label>
            <Input 
              id="name" type='number' placeholder="Enter No of Columns" className="col-span-3" value={ numFields } 
              onChange={handleColumnCountChange} 
            />
          </div>
          { Array.from({ length: numFields })
            .map((_, index) => (
            <div className="grid grid-cols-4 items-center gap-4" key={ index }>
              <Label htmlFor="name" className="text-right">
                Column Name
              </Label>

              <Input id="name" type='text' placeholder="Enter Column Name" className="col-span-3"
              value={columnCollection[index] || ""} 
              onChange={(e) => handleColumnNameChange(index, e.target.value)} />
            </div>
            ))
          }
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
