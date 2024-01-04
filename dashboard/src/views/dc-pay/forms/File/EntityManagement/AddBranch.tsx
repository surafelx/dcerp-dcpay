// ** React Imports
import { useEffect } from 'react'


// ** MUI Imports
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'


// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'


// ** Icons Imports
// import Phone from 'mdi-material-ui/Phone'
// import EmailOutline from 'mdi-material-ui/EmailOutline'
// import AccountOutline from 'mdi-material-ui/AccountOutline'
// import MessageOutline from 'mdi-material-ui/MessageOutline'
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addBranch, editBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchRights } from 'src/store/apps/Settings/RightsManagement/Branch'

// ** Types Imports
import { AppDispatch } from 'src/store'




const schema = yup.object().shape({
    branchCode: yup.number().typeError('Branch Code is required').required("Branch Code is required"),
    branchName: yup.string().typeError('Branch Name is required').required("Branch Name is required"),
})

const emptyValues = {
    branchCode: 0,
    branchName: ''
}


const AddBranch = ({ formData }: any) => {


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(
            fetchRights({
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
        defaultValues: formData,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(formData);
    }, [formData, reset])

    const onSubmit = (data: any) => {
       
        if (data.id) {
            dispatch(editBranch({ ...data, }))
        } else {
            dispatch(addBranch({ ...data, }))
        }
        reset(emptyValues)

    }

    return (
        <Card>
            <CardHeader title='Add Branch' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth >
                                <Controller
                                    name='branchCode'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            size={'small'}
                                            autoFocus
                                            type={'number'}
                                            label='Branch Code'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.branchCode)}
                                            placeholder='Branch Code'
                                        />
                                    )}
                                />
                                {errors.branchCode && <Alert sx={{ my: 4 }} severity='error'>{String(errors.branchCode.message)}</Alert>}
                            </FormControl>
                        </Grid>
                        <Grid item sm={12}>
                            <FormControl fullWidth >
                                <Controller
                                    name='branchName'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            size={'small'}
                                            autoFocus
                                            label='Branch Name'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.branchName)}
                                            placeholder='Branch Name'
                                        />
                                    )}
                                />
                                {errors.branchName && <Alert sx={{ my: 4 }} severity='error'>{String(errors.branchName.message)}</Alert>}
                            </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                            <FormControl fullWidth>
                                <Button fullWidth size='small' type='submit' variant='contained'>
                                    Submit
                                </Button>
                            </FormControl>
                        </Grid>

                        <Grid item sm={6}>                    <FormControl fullWidth>
                            <Button fullWidth size='small' color='secondary' onClick={() => reset({ emptyValues })} type='reset' variant='contained'>
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

export default AddBranch
