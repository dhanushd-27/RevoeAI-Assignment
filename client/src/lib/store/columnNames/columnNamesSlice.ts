import { createSlice ,PayloadAction } from "@reduxjs/toolkit"


type columnNameType = {
  value: string[]
}

const initialState: columnNameType = {
  value: [],
}

export const columnNames = createSlice({
  name: 'columnNames',
  initialState,
  reducers: {
    addColNames: (state, action: PayloadAction<{ index: number, name: string}>) => {
      state.value[action.payload.index] = action.payload.name;
    }
  }
})

export const { addColNames } = columnNames.actions
export default columnNames.reducer