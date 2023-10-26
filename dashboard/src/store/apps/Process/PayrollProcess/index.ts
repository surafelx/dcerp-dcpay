// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


// ** Fetch Branches
export const fetchData = createAsyncThunk('appPayrollProcess/fetchData', async (params: any) => {
  const response = await apiRequest.get(`process/payroll-process`, { params })
  
return response.data
})


export const appPayrollProcessSlice = createSlice({
  name: 'appPayrollProcess',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.payrollProcess
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appPayrollProcessSlice.reducer
