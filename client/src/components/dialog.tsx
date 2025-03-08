"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { setColNo } from '@/lib/store/columnNo/columnNoSlice'
import { addColNames } from '@/lib/store/columnNames/columnNamesSlice'


export default function DialogButton() {
  const numFields = useAppSelector(state => state.columnNo);
  const dispatch = useAppDispatch();
  const columnCollection = useAppSelector(state => state.columnNames);

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
              id="name" type='number' placeholder="Enter No of Columns" className="col-span-3" value={ numFields.value } 
              onChange={ (e) => { dispatch(setColNo(e.target.value))}} 
            />
          </div>
          { Array.from({ length: numFields.value })
            .map((_, index) => (
            <div className="grid grid-cols-4 items-center gap-4" key={ index }>
              <Label htmlFor="name" className="text-right">
                Column Name
              </Label>

              <Input id="name" type='text' placeholder="Enter Column Name" className="col-span-3"
              value={columnCollection.value[index] || ""} 
              onChange={(e) => { 
                  dispatch(addColNames({ index, name: e.target.value }))
                }} />
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
