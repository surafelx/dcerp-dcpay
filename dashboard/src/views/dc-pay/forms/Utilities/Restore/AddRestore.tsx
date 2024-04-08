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

import Autocomplete from '@mui/material/Autocomplete'

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
import { useForm, } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'




// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData, addRestore } from 'src/store/apps/Utilities/Restore'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'


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




const AddMonthClosing = ({ formData }: any) => {
    const [backupObject, setBackupObject] = useState({id:'', databaseName: ''})

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.restore)


  const backupOptions = store.data.map(str => ({
    id: str,
    databaseName: str,
}));


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
                    <DialogTitle id='alert-dialog-title'>Restore Complete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            Restore has completed.
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
        handleSubmit,
    } = useForm({
        defaultValues: formData,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        dispatch(
            fetchData({
                q: ''
            })
        )
    }, [dispatch])

    const onSubmit = () => {
        dispatch(addRestore(backupObject))
        if (!storeProcess) {
            handleClickOpen()
        }
        setBackupObject({id: '', databaseName: ''})
    }


    const handleBackupChange = (e: any, newValue: any) => {
        console.log(e)
        if (newValue?.id) {
            setBackupObject(newValue)
        }
    }

    return (
        <Card>
            <CardHeader title='Restore' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                            <Autocomplete
                                    autoSelect
                                    size={'small'}
                                    value={backupObject}
                                    options={backupOptions}
                                    onChange={handleBackupChange}
                                    isOptionEqualToValue={(option: any, value: any) => option.databaseName == value.databaseName}
                                    id='autocomplete-controlled'
                                    getOptionLabel={(option: any) => option.databaseName}
                                    renderInput={params => <TextField {...params} label='Select Backup' />}
                                />
                                {/* {errors.branchCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.branchCode.message}</FormHelperText>} */}
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <Button disabled={storeProcess} fullWidth size='small' type='submit' variant='contained'>
                                    {storeProcess ? ("Loading") : ("Restore")}
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
