// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


// ** Fetch Branches
export const fetchData = createAsyncThunk('appLoanTransactions/fetchData', async (params: any) => {
  const response = await apiRequest.get(`tasks/loan-transaction`, { params })

  return response.data
})

// ** Add User
export const addLoanTransaction = createAsyncThunk(
  'appLoanTransactions/addLoanTransaction',
  async (data: { [key: string]: number | string }) => {
    const response = await apiRequest.post(`tasks/loan-transaction`, { data })
    
    // dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Delete User
export const deleteLoanTransaction = createAsyncThunk(
  'appLoanTransactions/deleteLoanTransaction',
  async (id: number | string) => {
    const response = await apiRequest.delete(`tasks/loan-transaction/${id}`)

    // dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Edit User
export const editLoanTransaction = createAsyncThunk(
  'appLoanTransactions/editLoanTransaction',
  async (data: { [key: string]: number | string }) => {
    const response = await apiRequest.put(`tasks/loan-transaction`, { data })

    return response.data
  }
)


export const appLoanTransactionsSlice = createSlice({
  name: 'appLoanTransactions',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true; // Loading state when the request starts
      })
    builder
      .addCase(addLoanTransaction.pending, (state,) => {
        state.isLoading = true;
      })
    builder
      .addCase(addLoanTransaction.rejected, (state, action) => {
        state.isLoading = false;

        //@ts-ignore
        state.error = action.error;
      })
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.loanTransaction;
        state.total = action.payload.total;
        state.params = action.payload.params;
        state.allData = action.payload.allData;
        state.isLoading = false;
        state.error = null;
      })
    builder.addCase(fetchData.rejected, (state) => {
      state.isLoading = false;
    });
  },
})

export default appLoanTransactionsSlice.reducer
