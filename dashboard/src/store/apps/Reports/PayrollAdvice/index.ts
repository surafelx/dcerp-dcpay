// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


// ** Fetch Branches
export const fetchData = createAsyncThunk('appPayrollAdvice/fetchData', async (params: any) => {
  const response = await apiRequest.get(`reports/payroll-advice`, { params })
  
return response.data
})


export const appPayrollAdviceSlice = createSlice({
  name: 'appPayrollAdvice',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.payrollAdvice
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appPayrollAdviceSlice.reducer
