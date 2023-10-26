// ** React Imports
import { useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addMainParameterDefinition, editMainParameterDefinition } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'

// ** Types Imports
import { AppDispatch } from 'src/store'




const schema = yup.object().shape({
    parameterName: yup.string()
})

const emptyValues = {
    parameterName: ''
}

const AddMenuLevelOne = ({ formData, setLoading }: any) => {

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()



    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: formData,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })


    useEffect(() => {
        reset(formData);
    }, [formData, reset])

    const onSubmit = (data: any) => {
        setLoading(true)
        setTimeout(() => {
            if (data.id) {
                dispatch(editMainParameterDefinition({ ...data, }))
            } else {
                dispatch(addMainParameterDefinition({ ...data, }))
            }
            reset(emptyValues)
            setLoading(false)
        }, 3000)
    }


    return (
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
                                            label='Parameter Name'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.parameterName)}
                                            placeholder='Enter Parameter Name'
                                        />
                                    )}
                                />
                            </FormControl>
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
    )
}

export default AddMenuLevelOne
