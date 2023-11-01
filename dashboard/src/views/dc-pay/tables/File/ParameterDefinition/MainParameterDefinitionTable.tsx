// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

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
        </>
    )
}

export default UserList
