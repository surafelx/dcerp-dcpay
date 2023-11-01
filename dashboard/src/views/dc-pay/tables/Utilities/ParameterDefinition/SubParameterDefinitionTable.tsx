// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormControl from '@mui/material/FormControl'
import CardHeader from '@mui/material/CardHeader'

import Button from '@mui/material/Button'

// ** Actions Imports
import  { fetchData, deleteSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Custom Components Imports
import { addSubParameterDefinition, editSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// import AddSubParameterDefinition from 'src/views/dc-pay/forms/File/ParameterDefinition/AddSubParameterDefinition'
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
        dispatch(
            fetchData({
                parameter
            })
        )

    }, [dispatch, parameter])


    const handleParameterChange = useCallback((e: SelectChangeEvent) => {
        reset({ parameterName: '' })
        setParameter(e.target.value)
    }, [reset])




    const onSubmit = (data: any) => {
        data.parameterId = parameter
        if (data.id) {
            dispatch(editSubParameterDefinition({ ...data, }))
        } else {
            dispatch(addSubParameterDefinition({ ...data, }))
        }
        dispatch(
            fetchData({
                parameter
            })
        )
        reset({ parameterName: '' })
    }

    const mainParameterDefinitions = useSelector((state: RootState) => state.mainParameterDefinition)

    const clearAllFields = () => {
        // setEmployee('')
        // setTransaction('')
        reset(emptyValues)
    }

    return (
        <>

            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={4}>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <CardHeader title='Sub Parameter Definition' />
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id='parameter-select'>Select Main Parameter</InputLabel>
                                            <Select
                                                fullWidth
                                                value={parameter}
                                                id='select-parameter'
                                                label='Select Main Parameter'
                                                labelId='parameter-select'
                                                onChange={handleParameterChange}
                                                inputProps={{ placeholder: 'Select Main Parameter' }}
                                            >
                                                {
                                                    mainParameterDefinitions.data.map(({ id, parameterName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth sx={{ mb: 4 }}>
                                            <Controller
                                                name='parameterName'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        autoFocus
                                                        label='Sub Parameter Name'
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(errors.parameterName)}
                                                        placeholder='Enter Sub Parameter Name'
                                                    />
                                                )}
                                            />
                                            {errors.parameterName && <FormHelperText sx={{ color: 'error.main' }}>{errors.parameterName.message}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Button color='primary' fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                                Submit
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Button color='secondary' fullWidth size='large' onClick={() => clearAllFields()} type='reset' variant='contained' sx={{ mb: 7 }}>
                                                Reset
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>

                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <Card>
                        <CardContent>
                            <SubParameterDefinitionTable
                                rows={store.data}
                                formData={formData}
                                setFormData={setFormData}
                                deleteSubParameterDefinition={deleteSubParameterDefinition}
                            />
                        </CardContent>
                    </Card >

                </Grid>

            </Grid >
        </>
    )
}

export default UserList
