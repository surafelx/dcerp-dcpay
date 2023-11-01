// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'


// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import PencilOutline from 'mdi-material-ui/PencilOutline'
// import DeleteOutline from 'mdi-material-ui/DeleteOutline'
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchData, deleteMainParameterDefinition } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Custom Components Imports

import AddMainParameterDefinition from 'src/views/dc-pay/forms/File/ParameterDefinition/AddMainParameterDefinition'
import MainParameterDefinitionTable from 'src/views/dc-pay/tables/File/ParameterDefinition/MainParameterDefinition/MainParameterDefinitionTable/MainParameterDefinitionTable'

const UserList = () => {
    // ** State
    const [loading, setLoading] = useState<boolean>(true)

    const [formData, setFormData] = useState({
        id: '',
        parameterName: '',
    });


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const store = useSelector((state: RootState) => state.mainParameterDefinition)


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            dispatch(
                fetchData({
                })
            )
            setLoading(false)
        }, 3000)

    }, [dispatch])

    return (
        <>
            {loading ? <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <CircularProgress sx={{ mb: 4 }} />
                <Typography>Loading...</Typography>
            </Box> : (
                <Grid container spacing={6}>
                    <Grid item xs={12} md={12} lg={4}>
                        <AddMainParameterDefinition loading={loading} setLoading={setLoading} formData={formData} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={8}>
                        <Card>
                            <CardContent>
                                <MainParameterDefinitionTable
                                    rows={store.data}
                                    formData={formData}
                                    setFormData={setFormData}
                                    deleteMainParameterDefinition={deleteMainParameterDefinition}
                                />
                            </CardContent>
                        </Card >
                    </Grid>
                </Grid >
            )}
        </>
    )
}

export default UserList
