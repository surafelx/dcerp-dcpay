// ** React Imports
import { useState, useEffect } from 'react'


import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'



// ** Actions Imports
import { fetchData, deleteSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'



import AddSubParameterDefinition from 'src/views/dc-pay/forms/File/ParameterDefinition/AddSubParameterDefinition'
import SubParameterDefinitionTable from 'src/views/dc-pay/tables/File/ParameterDefinition/SubParameterDefinition/SubParameterDefinitionTable/SubParameterDefinitionTable'


const schema = yup.object().shape({
    parameterId: yup.string(),
    parameterName: yup.string()

})

const emptyValues = {
    id: '',
    parameterId: '',
    parameterName: ''
}


const UserList = () => {
    // ** State
    const [mainParameterDefinition, setMainParameterDefinition] = useState<string>('')
    const [parameter, setParameter] = useState<string>('')


    const [formData, setFormData] = useState({
        id: '',
        parameterId: '',
        parameterName: '',
    });


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const store = useSelector((state: RootState) => state.subParameterDefinition)

    const {
        reset,
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })


    useEffect(() => {
        dispatch(
            fetchData({
                parameter: mainParameterDefinition
            })
        )

    }, [dispatch, mainParameterDefinition])



    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={4}>
                   <AddSubParameterDefinition formData={formData} mainParameterDefinition={mainParameterDefinition} setMainParameterDefinition={setMainParameterDefinition}/>
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <Card>
                        <CardContent>
                            <SubParameterDefinitionTable
                                rows={store.data}
                                formData={formData}
                                setFormData={setFormData}
                                deleteSubParameterDefinition={deleteSubParameterDefinition}
                                parameter={parameter}
                                setParameter={setParameter}
                                reset={reset}
                            />
                        </CardContent>
                    </Card >
                </Grid>
            </Grid >
        </>
    )
}

export default UserList
