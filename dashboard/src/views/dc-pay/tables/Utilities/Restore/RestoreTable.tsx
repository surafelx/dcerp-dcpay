// ** React Imports
import { useState, useEffect } from 'react'



import Grid from '@mui/material/Grid'


import { useDispatch } from 'react-redux'


// ** Actions Imports
import { fetchData } from 'src/store/apps/File/EntityManagement/Branches'

// ** Types Imports
import { AppDispatch } from 'src/store'



// ** Custom Components Imports
import AddRestore from 'src/views/dc-pay/forms/Utilities/Restore/AddRestore'


const UserList = () => {
    // ** State
    const [value] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [formData,] = useState({
        id: '',
        branchCode: '',
        branchName: ''
    });


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    // const store = useSelector((state: RootState) => state.branches)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            dispatch(
                fetchData({
                    q: value
                })
            )
            setLoading(false)
        }, 3000)

    }, [dispatch, value])


    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <AddRestore loading={loading} setLoading={setLoading} formData={formData} />
                </Grid>

            </Grid >
        </>
    )
}

export default UserList
