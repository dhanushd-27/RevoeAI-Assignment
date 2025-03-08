import { createSlice } from "@reduxjs/toolkit"

type columnNoState = {
  value: number,
}

const initialState: columnNoState = {
  value: 0,
}

export const columnNo = createSlice({
  name: 'columnNo',
  initialState,
  reducers: {
    setColNo: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setColNo } = columnNo.actions
export default columnNo.reducer