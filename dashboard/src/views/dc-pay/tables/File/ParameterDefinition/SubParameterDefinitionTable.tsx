// ** React Imports
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'


// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Actions Imports
import { fetchData, deleteSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'
import { addSubParameterDefinition, editSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import SubParameterDefinitionTable from 'src/views/dc-pay/tables/File/ParameterDefinition/SubParameterDefinition/SubParameterDefinitionTable/SubParameterDefinitionTable'


const schema = yup.object().shape({
    parameterId: yup.string().required('Main Parameter is Required.'),
    parameterName: yup.string().required('Sub Parameter Name is Required.')

})

const emptyValues = {
    id: '',
    parameterId: '',
    parameterName: ''
}


const UserList = () => {
    // ** State
    const [mainParameterDefinition, setMainParameterDefinition] = useState<string>('')
    const [, setMainParameterDefinitionObject] = useState<any>(null)
    const [formMainParameterDefinitionObject, setFormMainParameterDefinitionObject] = useState<any>(null)
    const [parameter, setParameter] = useState<string>('')
    const [parameterDefinitionFilterValue, setParameterDefinitionValue] = useState<string>('')


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
        formState: { errors },
        setValue,
        setError,
        clearErrors,
        trigger
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })


    useEffect(() => {
        dispatch(
            fetchData({
                parameter: mainParameterDefinition,
                q: parameterDefinitionFilterValue
            })
        )

    }, [dispatch, mainParameterDefinition, parameterDefinitionFilterValue])


    const onSubmit = (data: any) => {
        data.parameterId = mainParameterDefinition
        if (data.id) {
            dispatch(editSubParameterDefinition({ ...data, }))
        } else {
            dispatch(addSubParameterDefinition({ ...data, }))
        }
        reset(emptyValues)
        setFormMainParameterDefinitionObject({ id: "", parameterName: '' })
        setMainParameterDefinitionObject({ id: "", parameterName: '' })
        setMainParameterDefinition('')
    }


    const mainParameterDefinitions = useSelector((state: RootState) => state.mainParameterDefinition)


    const handleMainParameterDefinitionChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setMainParameterDefinitionObject(newValue)
            setMainParameterDefinition(newValue.id)
        }
    }


    const handleFormMainParameterDefinitionChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setFormMainParameterDefinitionObject(newValue)
            setValue('parameterId', newValue.id)
            trigger('parameterId')
            setMainParameterDefinition(newValue.id)
        }
    }


    const handleParameterDefinitionValue = (val: string) => {
        setParameterDefinitionValue(val)
    }

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={4}>
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
                                                value={formMainParameterDefinitionObject}
                                                options={mainParameterDefinitions.data}
                                                onChange={handleFormMainParameterDefinitionChange}
                                                isOptionEqualToValue={(option: any, value: any) => option.parameterName == value.parameterName}
                                                id='autocomplete-controlled'
                                                getOptionLabel={(option: any) => option.parameterName}
                                                renderInput={params => <TextField error={Boolean(errors.parameterId)} {...params} label='Select Main Parameter' />}
                                            />
                                        </FormControl>
                                        {errors.parameterId && <Alert sx={{ my: 4 }} severity='error'>{errors.parameterId.message}</Alert>}
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
                                                        onBlur={(e) => {
                                                            onBlur()
                                                            const selectedParameter: any = store?.data?.filter(({ parameterName }: any) => parameterName == e.target.value)[0]
                                                            if (selectedParameter) {
                                                                setError('parameterName', {
                                                                    type: 'manual',
                                                                    message: 'Parameter Name already exists.',
                                                                })
                                                            } else {
                                                                clearErrors('parameterName')
                                                            }

                                                        }
                                                        }
                                                        onChange={(e) => {
                                                            onChange(e)
                                                            const selectedParameter: any = store?.data?.filter(({ parameterName }: any) => parameterName == e.target.value)[0]
                                                            if (selectedParameter) {
                                                                setError('parameterName', {
                                                                    type: 'manual',
                                                                    message: 'Parameter Name already exists.',
                                                                })
                                                            } else {
                                                                clearErrors('parameterName')
                                                            }

                                                        }
                                                        }
                                                        error={Boolean(errors.parameterName)}
                                                        placeholder='Sub Parameter Name'
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        {errors.parameterName && <Alert sx={{ my: 4 }} severity='error'>{errors.parameterName.message}</Alert>}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Button disabled={Object.keys(errors).length > 0} fullWidth size='small' type='submit' variant='contained' sx={{ mb: 7 }}>
                                                Submit
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Button fullWidth size='small' color='secondary' onClick={() => {
                                                reset(emptyValues)
                                                setFormMainParameterDefinitionObject({ id: "", parameterName: '' })
                                                setMainParameterDefinition('')
                                            }} type='reset' variant='contained' sx={{ mb: 7 }}>
                                                Reset
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </form>

                        </CardContent>
                    </Card >
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <Card>
                        <CardHeader title={'Sub Parameter Definition'} />
                        <Grid container spacing={3}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    autoSelect
                                    size={'small'}
                                    value={formMainParameterDefinitionObject}
                                    options={mainParameterDefinitions.data}
                                    onChange={handleMainParameterDefinitionChange}
                                    isOptionEqualToValue={(option: any, value: any) => option.parameterName == value.parameterName}
                                    id='autocomplete-controlled'
                                    getOptionLabel={(option: any) => option.parameterName}
                                    renderInput={params => <TextField  {...params} label='Search Parameter' />}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size='small'
                                    value={parameterDefinitionFilterValue}
                                    placeholder='Search'
                                    onChange={e => handleParameterDefinitionValue(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <CardContent>
                            <SubParameterDefinitionTable
                                rows={store.data}
                                formData={formData}
                                mainParameters={mainParameterDefinitions.data}
                                setFormMainParameterDefinitionObject={setFormMainParameterDefinitionObject}
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
