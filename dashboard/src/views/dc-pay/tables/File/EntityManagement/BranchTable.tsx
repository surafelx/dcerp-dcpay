// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchData, deleteBranch } from 'src/store/apps/File/EntityManagement/Branches'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'


// ** Custom Components Imports
import AddBranch from 'src/views/dc-pay/forms/File/EntityManagement/AddBranch'
import BranchTable from 'src/views/dc-pay/tables/File/EntityManagement/Branch/BranchTable'



const UserList = () => {
    // ** State
    const [loading, setLoading] = useState<boolean>(true)
    const [formData, setFormData] = useState({
        id: '',
        branchCode: '',
        branchName: ''
    });


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const store = useSelector((state: RootState) => state.branches)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            dispatch(
                fetchData({
                })
            )
            setLoading(false)
        }, 3000)

    }, [dispatch,])


    return (
        <>

            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={4}>
                    <AddBranch loading={loading} setLoading={setLoading} formData={formData} />
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <Card>
                        <CardContent>
                            <BranchTable
                                rows={store.data}
                                formData={formData}
                                setFormData={setFormData}
                                deleteBranch={deleteBranch}

                            />
                        </CardContent>
                    </Card >
                </Grid>
            </Grid >
        </>
    )
}

export default UserList
