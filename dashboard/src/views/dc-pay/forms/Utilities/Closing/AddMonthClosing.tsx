// ** React Imports
import {  useEffect } from 'react'


// ** MUI Imports
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

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'





// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addMonthClosing } from 'src/store/apps/Utilities/Closing'

// ** Types Imports
import { AppDispatch } from 'src/store'

import moment from 'moment'


const schema = yup.object().shape({
    branchCode: yup.string(),
    branchName: yup.string()
})

const emptyValues = {
    branchCode: '',
    branchName: ''
}


const AddMonthClosing = ({ formData, setLoading }: any) => {
 

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
        
    // @ts-ignore
    const userData = JSON.parse(window.localStorage.getItem('userData'))
    const {start_date: startDate, end_date: endDate} = userData.currentPeriod || {start_date: '', end_date: ''}
    const {start_date: nextStartDate, end_date: nextEndDate} = userData.nextPeriod || {start_date: '', end_date: ''}

   

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
        dispatch(addMonthClosing({ ...data, }))
        reset(emptyValues)
    }
    
    return (
        <Card>
            
                <CardHeader title='Month End Closing' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='currentPeriod'
                            control={control}
                           
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Current Period'
                                    value= {`${moment(startDate).format("YYYY/MM/DD") || ""} - ${moment(endDate).format("YYYY/MM/DD") || ""}`}
                                    disabled={true}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.branchCode)}
                                    placeholder='Current Period'
                                />
                            )}
                        />
                        {/* {errors.branchCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.branchCode.message}</FormHelperText>} */}
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 4 }}>
                        <Controller
                            name='Next Period'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextField
                                    autoFocus
                                    label='Next Period'
                                    value= {`${moment(nextStartDate).format("YYYY/MM/DD") || ""} - ${moment(nextEndDate).format("YYYY/MM/DD") || ""}`}
                                    disabled={true}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    error={Boolean(errors.branchName)}
                                    placeholder='Next Period'
                                />
                            )}
                        />
                        {/* {errors.branchName && <FormHelperText sx={{ color: 'error.main' }}>{errors.branchName.message}</FormHelperText>} */}
                    </FormControl>
                    <FormControl fullWidth>
                        <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                            Continue
                        </Button>
                    </FormControl>
                </form>
            </CardContent>
        </Card >
    )
}

export default AddMonthClosing
