// ** React Imports
import { Fragment, useState, useEffect, } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addDepartment, editDepartment, fetchData, deleteDepartment } from 'src/store/apps/File/EntityManagement/Department'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import DepartmentTable from 'src/views/dc-pay/tables/File/EntityManagement/Department/DepartmentTable'


import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'




const schema = yup.object().shape({
    branchId: yup.string().required('Branch is Required.'),
    departmentCode: yup.number().typeError('Department Code is required').required("Department Code is required"),
    departmentName: yup.string().required('Department Name is Required.'),
    permanentAccount: yup.string(),
    contractAccount: yup.string()
})

const emptyValues = {
    id: '',
    branchId: '',
    departmentCode: 0,
    departmentName: '',
    permanentAccount: '',
    contractAccount: ''
}


const UserList = () => {
    // ** State
    const [page, setPage] = useState<number>(0)
    const [branch, setBranch] = useState<string>('')
    const [branchObject, setBranchObject] = useState<any>(null)
    const [alertText, setAlertText] = useState<any>('')
    const [value] = useState<string>('')
    const [formData, setFormData] = useState({
        id: '',
        branchId: '',
        departmentCode: 0,
        departmentName: '',
        permanentAccount: '',
        contractAccount: ''
    });
    const [open, setOpen] = useState<boolean>(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.department)
    const storeProcess = useSelector((state: RootState) => state.department.isLoading)

    useEffect(() => {

        dispatch(
            fetchData({
                q: value,
                branch
            })
        )

    }, [dispatch, value, branch])



    const branchStore = useSelector((state: RootState) => state.branches)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors: departmentErrors }
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
                    <DialogTitle id='alert-dialog-title'>Department Update</DialogTitle>
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
        data.branchId = branch
        if (data.id) {
            dispatch(editDepartment({ ...data, }))
            setAlertText('')
        } else {
            dispatch(addDepartment({ ...data, }))
            setAlertText('')
        }
        setBranchObject({ id: '', branchName: '' })
        reset(emptyValues)

        if (!storeProcess) {
            reset(emptyValues)
            handleClickOpen()
        }

    }


    const handleBranchChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setBranchObject(newValue)
            setBranch(newValue.id)
            reset({ id: '', branchId: newValue?.id, departmentCode: 0, departmentName: '' })
            setPage(0)
        }
    }

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={4}>
                    <Card>
                        <CardHeader title='Add Department' titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                autoSelect
                                                size={'small'}
                                                value={branchObject}
                                                options={branchStore.data}
                                                onChange={handleBranchChange}
                                                isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
                                                id='autocomplete-controlled'
                                                getOptionLabel={(option: any) => option.branchName}
                                                renderInput={params => <TextField
                                                    {...params}
                                                    name={'branchId'}
                                                    error={Boolean(departmentErrors.branchId)}
                                                    label='Select Branch' />}
                                            />

                                        </FormControl>
                                        {departmentErrors.branchId && <Alert sx={{ my: 4 }} severity='error'>{departmentErrors.branchId.message}</Alert>}
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='departmentCode'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        type={'number'}
                                                        label='Department Code'
                                                        value={value}
                                                        onBlur={(e) => {
                                                            onBlur()
                                                            const selectedDepartment: any = store?.data?.filter(({ departmentCode }: any) => departmentCode == e.target.value)[0]
                                                            if (selectedDepartment) {
                                                                reset(selectedDepartment)
                                                                setBranchObject(branchStore?.data?.filter((branch: any) => branch.id == selectedDepartment?.branchId)[0])
                                                            }

                                                        }
                                                        }
                                                        onChange={onChange}
                                                        error={Boolean(departmentErrors.departmentCode)}
                                                        placeholder='Enter Department Code'
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        {departmentErrors.departmentCode && <Alert sx={{ my: 4 }} severity='error'>{departmentErrors.departmentCode.message}</Alert>}
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='departmentName'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        label='Department Name'
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(departmentErrors.departmentName)}
                                                        placeholder='Enter Department Name'
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        {departmentErrors.departmentName && <Alert sx={{ my: 4 }} severity='error'>{departmentErrors.departmentName.message}</Alert>}
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='permanentAccount'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        label='Permanent Account'
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(departmentErrors.permanentAccount)}
                                                        placeholder='Permanent Account'
                                                    />
                                                )}
                                            />
                                            {departmentErrors.permanentAccount && <Alert sx={{ my: 4 }} severity='error'>{departmentErrors.permanentAccount.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='contractAccount'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        label='Contract Account'
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(departmentErrors.contractAccount)}
                                                        placeholder='Contract Account'
                                                    />
                                                )}
                                            />
                                            {departmentErrors.contractAccount && <Alert sx={{ my: 4 }} severity='error'>{departmentErrors.contractAccount.message}</Alert>}
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
                                            <Button
                                                color='secondary'
                                                fullWidth size='small'
                                                onClick={() => {
                                                    reset(emptyValues)
                                                    setBranchObject({ id: '', branchName: '' })
                                                    setBranch('')
                                                }} type='reset' variant='contained'>
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
                            <DepartmentTable
                                rows={store.data}
                                formData={formData}
                                setFormData={setFormData}
                                deleteDepartment={deleteDepartment}
                                reset={reset}
                                branches={branchStore.data}
                                setBranchObject={setBranchObject}
                                page={page}
                                setPage={setPage}
                            />
                        </CardContent>
                    </Card >
                    <DialogAlert />
                </Grid>
            </Grid >
        </>
    )
}

export default UserList
