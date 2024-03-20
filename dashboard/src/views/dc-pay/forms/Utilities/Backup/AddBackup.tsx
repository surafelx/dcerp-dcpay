// ** React Imports
import { Fragment, useEffect, useState } from 'react'


// ** MUI Imports
import Grid from '@mui/material/Grid'
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
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/Utilities/Backup'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'

import moment from 'moment'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'


const schema = yup.object().shape({
    branchCode: yup.string(),
    branchName: yup.string()
})

const emptyValues = {
    branchCode: '',
    branchName: ''
}


const AddMonthClosing = ({ formData }: any) => {


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    // @ts-ignore
    const userData = JSON.parse(window.localStorage.getItem('userData'))
    const { start_date: startDate, end_date: endDate } = userData?.currentPeriod || { start_date: '', end_date: '' }


    const [open, setOpen] = useState<boolean>(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
    }

    const DialogAlert = () => {
        // ** State


        return (
            <Fragment>
                <Dialog
                    open={storeProcess ? false : open}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='alert-dialog-title'>Backup Complete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            Backup has completed.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='dialog-actions-dense'>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }

    const storeProcess = useSelector((state: RootState) => state.closing.isLoading)


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
        dispatch(fetchData({ ...data, }))
        if (!storeProcess) {
            handleClickOpen()
        }
        reset(emptyValues)
    }

    return (
        <Card>
            <CardHeader title='Add Backup' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Controller
                                    name='currentPeriod'
                                    control={control}

                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur } }) => (
                                        <TextField
                                            size={'small'}
                                            autoFocus
                                            label='Current Backup Period'
                                            value={`${moment(startDate).format("YYYY/MM/DD") || ""} - ${moment(endDate).format("YYYY/MM/DD") || ""}`}
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
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <Button disabled={storeProcess} fullWidth size='small' type='submit' variant='contained'>
                                    {storeProcess ? ("Loading") : ("Backup")}
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
            <DialogAlert />
        </Card >
    )
}

export default AddMonthClosing
