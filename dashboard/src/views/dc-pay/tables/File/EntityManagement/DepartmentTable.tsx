// ** React Imports
import { useState, useEffect,  } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import CardContent from '@mui/material/CardContent'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData, deleteDepartment } from 'src/store/apps/File/EntityManagement/Department'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import AddDepartment from 'src/views/dc-pay/forms/File/EntityManagement/AddDepartment'
import DepartmentTable from 'src/views/dc-pay/tables/File/EntityManagement/Department/DepartmentTable'


const UserList = () => {
    // ** State
    const [branch, setBranch] = useState<string>('')
    const [value] = useState<string>('')
    const [formData, setFormData] = useState({
        id: '',
        branchId: '',
        departmentCode: '',
        departmentName: '',
        permanentAccount: '',
        contractAccount: ''
    });


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.department)

    useEffect(() => {

        dispatch(
            fetchData({
                q: value,
                branch
            })
        )

    }, [dispatch, value, branch])


    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={4}>
                    <AddDepartment branch={branch} setBranch={setBranch} formData={formData} />
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <Card>
                        <CardContent>
                            <DepartmentTable
                                rows={store.data}
                                formData={formData}
                                setFormData={setFormData}
                                deleteDepartment={deleteDepartment}
                            />
                        </CardContent>
                    </Card >

                </Grid>
            </Grid >
        </>
    )
}

export default UserList
