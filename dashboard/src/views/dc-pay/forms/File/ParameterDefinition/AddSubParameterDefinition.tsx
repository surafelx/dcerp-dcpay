// ** React Imports
import { useEffect, useState } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

import Grid from '@mui/material/Grid'


import Autocomplete from '@mui/material/Autocomplete'



// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'



import { RootState } from 'src/store'



// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { fetchData as fetchMainParameterDefinition } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { addSubParameterDefinition, editSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'


const schema = yup.object().shape({
    parameterId: yup.string(),
    parameterName: yup.string()

})

const emptyValues = {
    id: '',
    parameterId: '',
    parameterName: ''
}



const AddMenuLevelTwo = ({
    mainParameterDefinition,
    setMainParameterDefinition,
    formData
}: any) => {

    const [mainParameterDefinitionObject, setMainParameterDefinitionObject] = useState<any>(null)
    
    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(
            fetchMainParameterDefinition({
                q: ''
            })
        )
    }, [dispatch])

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(formData);
    }, [formData, reset])

    // any type used
    const onSubmit = (data: any) => {
        data.parameterId = mainParameterDefinition
        if (data.id) {
            dispatch(editSubParameterDefinition({ ...data, }))
        } else {
            dispatch(addSubParameterDefinition({ ...data, }))
        }
        reset(emptyValues)

    }


    const mainParameterDefinitions = useSelector((state: RootState) => state.mainParameterDefinition)


    const handleMainParameterDefinitionChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setMainParameterDefinitionObject(newValue)
            setMainParameterDefinition(newValue.id)
        }
    }


    return (
        <Card>
            <CardHeader title='Add Sub Parameter' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    autoSelect
                                    size={'small'}
                                    value={mainParameterDefinitionObject}
                                    options={mainParameterDefinitions.data}
                                    onChange={handleMainParameterDefinitionChange}
                                    isOptionEqualToValue={(option: any, value: any) => option.parameterName == value.parameterName}
                                    id='autocomplete-controlled'
                                    getOptionLabel={(option: any) => option.parameterName}
                                    renderInput={params => <TextField {...params} label='Select Main Parameter' />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='parameterName'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            size={'small'}
                                            autoFocus
                                            label='Sub Parameter Name'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.parameterName)}
                                            placeholder='Sub Parameter Name'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Button fullWidth size='small' type='submit' variant='contained' sx={{ mb: 7 }}>
                                    Submit
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Button fullWidth size='small' color='secondary' onClick={() =>{ 
                                    reset()
                                    setMainParameterDefinitionObject({id: "", parameterName: ''})
                                    setMainParameterDefinition()
                                    }} type='reset' variant='contained' sx={{ mb: 7 }}>
                                    Reset
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>

            </CardContent>
        </Card >
    )
}

export default AddMenuLevelTwo
