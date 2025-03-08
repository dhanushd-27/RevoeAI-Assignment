'use client'

import { Provider } from "react-redux";
import { store } from '@/lib/store/store';
import DialogButton from '@/components/dialog'
import DynamicTable from '@/components/table-cols'
import React from 'react'

export default function Page() {
  return (
    <Provider store={store}>
      <div>
        <DialogButton />
        <DynamicTable columns={["hi", "hello", "hello", "hi"]} data={[]} />
      </div>
    </Provider>
  )
}
