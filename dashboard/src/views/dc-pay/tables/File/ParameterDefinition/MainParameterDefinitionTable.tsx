// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Actions Imports
import { fetchData, deleteMainParameterDefinition } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Actions Imports
import { addMainParameterDefinition, editMainParameterDefinition } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'


// ** Custom Components Imports
import MainParameterDefinitionTable from 'src/views/dc-pay/tables/File/ParameterDefinition/MainParameterDefinition/MainParameterDefinitionTable/MainParameterDefinitionTable'


const schema = yup.object().shape({
    parameterName: yup.string().required('Parameter Name is Required.')
})

const emptyValues = {
    parameterName: ''
}


const UserList = () => {
    // ** State
    const [, setLoading] = useState<boolean>(true)

    const [formData, setFormData] = useState({
        id: '',
        parameterName: '',
    });


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: formData,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })



    useEffect(() => {
        reset(formData);
    }, [formData, reset])

    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editMainParameterDefinition({ ...data, }))
        } else {
            dispatch(addMainParameterDefinition({ ...data, }))
        }
        reset(emptyValues)
    }



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
                    {/* <AddMainParameterDefinition loading={loading} setLoading={setLoading} formData={formData} /> */}
                    <Card>
                        <CardHeader title='Add Main Parameter' titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='parameterName'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        required
                                                        label='Parameter Name'
                                                        value={value}
                                                        onBlur={(e) => {
                                                            onBlur()
                                                            const selectedParameter: any = store?.data?.filter(({ parameterName }: any) => parameterName == e.target.value)[0]
                                                            if (selectedParameter) {
                                                                reset(selectedParameter)
                                                            }

                                                        }
                                                        }
                                                        onChange={onChange}
                                                        error={Boolean(errors.parameterName)}
                                                        placeholder='Enter Parameter Name'
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        {errors.parameterName && <Alert sx={{ my: 4 }} severity='error'>{errors.parameterName.message}</Alert>}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Button fullWidth size='small' type='submit' variant='contained'>
                                                Submit
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>

                                        <FormControl fullWidth>
                                            <Button fullWidth size='small' color='secondary' onClick={() => reset()} type='reset' variant='contained'>
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
