// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'



// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchData, deleteBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { addBranch, editBranch } from 'src/store/apps/File/EntityManagement/Branches'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'


// ** Custom Components Imports
import BranchTable from 'src/views/dc-pay/tables/File/EntityManagement/Branch/BranchTable'


// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const emptyValues = {
    branchCode: 0,
    branchName: ''
}


const UserList = () => {
    // ** State
    const [alertText, setAlertText] = useState<any>('')
    const [open, setOpen] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        id: '',
        branchCode: 0,
        branchName: ''
    });
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const store = useSelector((state: RootState) => state.branches)
    const storeProcess = useSelector((state: RootState) => state.branches.isLoading)
    const storeError = useSelector((state: RootState) => state.branches.error)

    useEffect(() => {
        dispatch(
            fetchData({
            })
        )
    }, [dispatch])

    const schema = yup.object().shape({
        branchCode: yup.number().typeError('Branch Code has to be a valid number.').required("Branch Code is required").test('not-zero', 'Branch Code cannot be 0', (value) => value !== 0),
        branchName: yup.string().typeError('Branch Name is required').required("Branch Name is required"),
    })


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors: branchErrors }
    } = useForm({
        defaultValues: formData,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })


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
                    <DialogTitle id='alert-dialog-title'>Branch Update</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            {alertText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='dialog-actions-dense'>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }


    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editBranch({ ...data, }))
            setAlertText(`${data.branchCode} ${data.branchName} has been successfully edited.`)
        } else {
            dispatch(addBranch({ ...data, }))
            setAlertText(`${data.branchCode} ${data.branchName} has been successfully added.`)
        }

        if(storeError) {
            setAlertText('What')

        }

        if (!storeProcess) {
            reset(emptyValues)
            handleClickOpen()
        }
    }


    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={4}>
                    <Card>
                        <CardHeader title='Add Branch' titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            <form noValidate={true} autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
                                                        onBlur={(e) => {
                                                            onBlur()
                                                            const selectedBranch = store?.data?.filter(({ branchCode }: any) => branchCode == e.target.value)[0]
                                                            if (selectedBranch)
                                                                reset(selectedBranch)
                                                        }
                                                        }
                                                        onChange={onChange}
                                                        error={Boolean(branchErrors.branchCode)}
                                                        placeholder='Branch Code'
                                                    />
                                                )}
                                            />
                                            {branchErrors.branchCode && <Alert sx={{ my: 4 }} severity='error'>{branchErrors.branchCode.message}</Alert>}
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
                                                        error={Boolean(branchErrors.branchName)}
                                                        placeholder='Branch Name'
                                                    />
                                                )}
                                            />
                                            {branchErrors.branchName && <Alert sx={{ my: 4 }} severity='error'>{branchErrors.branchName.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={6}>
                                        <FormControl fullWidth>
                                            <Button fullWidth size='small' type='submit' variant='contained'>
                                                {storeProcess ? ("Loading") : ("Submit")}
                                            </Button>
                                        </FormControl>
                                    </Grid>

                                    <Grid item sm={6}>
                                        <FormControl fullWidth>
                                            <Button fullWidth size='small' color='secondary' onClick={() => reset(emptyValues)} type='reset' variant='contained'>
                                                Reset
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <Card>
                        <CardContent>
                            <BranchTable
                                rows={store.data}
                                formData={formData}
                                setFormData={setFormData}
                                deleteBranch={deleteBranch}
                                handleClickOpen={handleClickOpen}
                                setAlertText={setAlertText}
                                storeProcess={storeProcess}
                                reset={reset}
                            />
                        </CardContent>
                    </Card >
                </Grid>
            </Grid >
            <DialogAlert />
        </>
    )
}

export default UserList
