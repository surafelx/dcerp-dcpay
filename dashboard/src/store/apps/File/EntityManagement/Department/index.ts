// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// ** Utils Imports
import apiRequest from 'src/utils/apiRequest'


interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Departments
export const fetchData = createAsyncThunk('appDepartments/fetchData', async (params: any) => {
  const response = await apiRequest.get(`file/entity-management/department`, { params })

  return response.data
})

// ** Add User
export const addDepartment = createAsyncThunk(
  'appDepartments/addDepartment',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.post(`file/entity-management/department`, { data })
    dispatch(fetchData(getState().user.params))
    
    return response.data
  }
)

// ** Delete User
export const deleteDepartment = createAsyncThunk(
  'appDepartments/deleteDepartment',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await apiRequest.delete(`file/entity-management/department/${id}`)
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)

// ** Edit User
export const editDepartment = createAsyncThunk(
  'appDepartments/editDepartment',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await apiRequest.put(`file/entity-management/department`, { data })
    dispatch(fetchData(getState().user.params))

    return response.data
  }
)


export const appDepartmentsSlice = createSlice({
  name: 'appDepartments',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true; 
      })
    builder
      .addCase(addDepartment.pending, (state,) => {
        state.isLoading = true;
      })
    builder
      .addCase(addDepartment.rejected, (state, action) => {
        state.isLoading = false;

        //@ts-ignore
        state.error = action.error;
      })
    builder
      .addCase(editDepartment.pending, (state,) => {
        state.isLoading = true;
      })
    builder
      .addCase(editDepartment.rejected, (state, action) => {
        state.isLoading = false;

        //@ts-ignore
        state.error = action.error;
      })
    builder
      .addCase(deleteDepartment.pending, (state,) => {
        state.isLoading = true;
      })
    builder
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.isLoading = false;

        //@ts-ignore
        state.error = action.error;
      })
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.department;
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

export default appDepartmentsSlice.reducer
