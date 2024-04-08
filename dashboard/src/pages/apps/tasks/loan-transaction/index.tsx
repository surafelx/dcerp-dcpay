// ** React Imports
import { Fragment, useState, useEffect, useRef } from 'react'


// ** MUI Imports
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'


// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchData, deleteLoanTransaction } from 'src/store/apps/Tasks/LoanTransaction'
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'
import { fetchData as fetchTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import FormHelperText from '@mui/material/FormHelperText'
import { addLoanTransaction, editLoanTransaction } from 'src/store/apps/Tasks/LoanTransaction'

import Autocomplete from '@mui/material/Autocomplete'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import LoanTransactionTable from 'src/views/dc-pay/tables/Tasks/LoanTransaction/LoanTransactionTable'


// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'


const emptyValues = {
    id: '',
    employeeId: '',
    transactionId: '',
    transactionAmount: '',
    totalLoan: '',
    remainingBalance: ''
}


const schema = yup.object().shape({
    employeeId: yup.string().required('Employee ID is required'),
    transactionId: yup.string().required('Transaction ID is required'),
    transactionAmount: yup.number().typeError('Amount must be a valid number').required("Amount is required").test('not-zero', 'Amount cannot be 0', (value) => value !== 0),
    remainingBalance: yup.number().typeError('Amount must be a valid number').required("Amount is required").test('not-zero', 'Amount cannot be 0', (value) => value !== 0).test('valid-balance', 'Remaining Balance cannot be greater than Total Loan', (value: any, { parent }: any) => {
        const totalLoan = parent?.totalLoan || 0;

        return value <= totalLoan;
    }),
    totalLoan: yup.number().typeError('Total Loan must be a valid number').required("Total Loan is required").test('not-zero', 'Loan cannot be 0', (value) => value !== 0),
});



const UserList = () => {
    // ** State
    const [employee, setEmployee] = useState<string>('')
    const [employeeObject, setEmployeeObject] = useState<any>(null)
    const [transaction, setTransaction] = useState<string>('')
    const [alertText, setAlertText] = useState<any>('')
    const [transactionObject, setTransactionObject] = useState<any>(null)
    const [value,] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const transactionAmountRef: any = useRef()

    const [formData, setFormData] = useState({
        id: '',
        employeeId: '',
        transactionId: '',
        totalLoan: '',
        transactionAmount: '',
        remainingBalance: ''
    });


    const clearAllFields = () => {
        reset(emptyValues)
        setEmployeeObject({ id: '', firstName: '', employeeCode: '' })
        setTransactionObject({ id: '', transactionName: '', transactionCode: '' })
        setEmployee('')
        setTransaction('')
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
                    <DialogTitle id='alert-dialog-title'>Loan Transaction</DialogTitle>
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
        data.employeeId = employee
        data.transactionId = transaction

        if (!storeProcess) {
            setAlertText(`${employeeObject.employeeCode} ${employeeObject.firstName} has a total loan of ${data.totalLoan}, a transaction amount of ${data.transactionAmount} and a remaining balance of ${data.totalLoan}.`)
            if (data.id) {
                dispatch(editLoanTransaction({ ...data }))
            } else {
                dispatch(addLoanTransaction({ ...data }))
            }
            clearAllFields()
            handleClickOpen()
        }
    }

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.loanTransaction)
    const storeProcess = useSelector((state: RootState) => state.department.isLoading)

    useEffect(() => {
        dispatch(
            fetchData({
                employee,
                transaction,
                q: value,
            })
        )
    }, [dispatch, employee, transaction, value])

    useEffect(() => {
        dispatch(
            fetchEmployee({
                q: ''
            })
        )
        dispatch(
            fetchTransactionDefinition({
                q: ''
            })
        )
    }, [dispatch])



    const employeeStore = useSelector((state: RootState) => state.employee)
    const transactionDefinitionStore = useSelector((state: RootState) => state.transactionDefinition)

    const activeEmployees = employeeStore.data.filter(({ employeeStatusName }: any) => (employeeStatusName === "Active"))

    const handleTransactionValue = (transactionValue: any) => {
        const selectedTransactionId = transactionValue
        const existingObject: any = store.data.find(obj => (obj["transactionId"] === selectedTransactionId))
        if (existingObject) {
            reset(
                {
                    id: existingObject.id,
                    employeeId: employee,
                    transactionId: selectedTransactionId,
                    transactionAmount: existingObject.transactionAmount,
                    totalLoan: existingObject.totalLoan
                }
            )
        } else {
            reset({
                id: '',
                employeeId: employee,
                transactionId: selectedTransactionId,
                transactionAmount: '',
                totalLoan: ''
            })
        }

        setTransaction(selectedTransactionId)
    }



    const {
        control,
        handleSubmit,
        reset,
        setValue,
        trigger,
        formState: { errors }
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })


    console.log(store.data)

    const handleEmployeeChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setEmployeeObject(newValue)
            setEmployee(newValue.id)
            setValue('employeeId', newValue.id)
            trigger('employeeId')
            setTransactionObject({ id: '', transactionName: '', transactionCode: '' })
            reset({ employeeId: newValue?.id, transactionId: '', totalLoan: '', remainingBalance: '', transactionAmount: '' })
        }
    }

    const handleTransactionChange = (e: any, newValue: any) => {
        if (newValue?.id && employee) {
            setTransactionObject(newValue)
            handleTransactionValue(newValue.id)
            setValue('transactionId', newValue.id)
            trigger('transactionId')
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>

                    <Card>
                        <CardHeader title='Loan Transaction' />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={2}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={employeeObject}
                                            options={activeEmployees}
                                            onChange={handleEmployeeChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.employeeCode == value.employeeCode}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.employeeCode}
                                            renderInput={params => <TextField name={'employeeCode'} required type={'number'} error={Boolean(errors.employeeId)}  {...params} label='Select Employee' />}
                                        />
                                    </FormControl>
                                    {errors.employeeId && <Alert sx={{ my: 4 }} severity='error'>{errors.employeeId.message}</Alert>}
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={employeeObject}
                                            options={activeEmployees}
                                            onChange={handleEmployeeChange}
                                            id='autocomplete-controlled'
                                            isOptionEqualToValue={(option: any, value: any) => option.firstName == value.firstName}
                                            getOptionLabel={(option: any) => option.firstName}
                                            renderInput={params => <TextField required error={Boolean(errors.employeeId)}  {...params} label='Select Employee' />}
                                        />
                                        {errors.employeeId && <Alert sx={{ my: 4 }} severity='error'>{errors.employeeId.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={transactionObject}
                                            options={transactionDefinitionStore.data.filter((tran: any) => tran.transactionGroupName == 'Loan')}
                                            onChange={handleTransactionChange}
                                            id='autocomplete-controlled'
                                            isOptionEqualToValue={(option: any, value: any) => option.transactionCode == value.transactionCode}
                                            getOptionLabel={(option: any) => option.transactionCode}
                                            renderInput={params => <TextField required error={Boolean(errors.transactionId)}  {...params} label='Select Transaction' />}
                                        />
                                    </FormControl>
                                    {errors.transactionId && <Alert sx={{ my: 4 }} severity='error'>{errors.transactionId.message}</Alert>}
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={transactionObject}
                                            options={transactionDefinitionStore.data.filter((tran: any) => tran.transactionGroupName == 'Loan')}
                                            onChange={handleTransactionChange}
                                            id='autocomplete-controlled'
                                            isOptionEqualToValue={(option: any, value: any) => option.transactionName == value.transactionName}
                                            getOptionLabel={option => option.transactionName}
                                            renderInput={params => <TextField required error={Boolean(errors.transactionId)}  {...params} label='Select Transaction' />}
                                        />
                                    </FormControl>
                                    {errors.transactionId && <Alert sx={{ my: 4 }} severity='error'>{errors.transactionId.message}</Alert>}
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Controller
                                            name='transactionAmount'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    size={'small'}
                                                    autoFocus
                                                    label='Transaction Amount'
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.transactionAmount)}
                                                    placeholder='Enter Transaction Amount'
                                                    inputRef={transactionAmountRef}
                                                    type='number'
                                                    inputProps={{
                                                        style: { textAlign: 'right' },
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.transactionAmount && <FormHelperText sx={{ color: 'error.main' }}>{errors.transactionAmount.message}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Controller
                                            name='totalLoan'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    size={'small'}
                                                    autoFocus
                                                    label='Total Loan'
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.totalLoan)}
                                                    placeholder='Enter Total Loan'
                                                    type='number'
                                                    inputProps={{
                                                        style: { textAlign: 'right' },
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.totalLoan && <FormHelperText sx={{ color: 'error.main' }}>{errors.totalLoan.message}</FormHelperText>}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={4}>
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Controller
                                            name='remainingBalance'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    size={'small'}
                                                    autoFocus
                                                    label='Remaining Balance'
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.remainingBalance)}
                                                    placeholder='Enter Remaining Balance'
                                                    type='number'
                                                    inputProps={{
                                                        style: { textAlign: 'right' },
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.remainingBalance && <FormHelperText sx={{ color: 'error.main' }}>{errors.remainingBalance.message}</FormHelperText>}
                                    </FormControl>
                                </Grid>

                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth>
                                        <Button color='primary' fullWidth size='small' type='submit' variant='contained'>
                                            Submit
                                        </Button>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth>
                                        <Button color='secondary' fullWidth size='small' onClick={() => clearAllFields()} type='reset' variant='contained'>
                                            Reset
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </form>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Card>
                    <CardHeader title={'Loan Transaction'} />
                    <CardContent>
                        <LoanTransactionTable
                            setTransaction={setTransaction}
                            rows={store.data}
                            formData={formData}
                            setFormData={setFormData}
                            employeeObject={employeeObject}
                            deleteLoanTransaction={deleteLoanTransaction}
                            setEmployeeObject={setEmployeeObject}
                            setTransactionObject={setTransactionObject}
                            reset={reset}
                            transaction={transaction}
                            transactionDefinitionStore={transactionDefinitionStore}
                            employeeStore={employeeStore}
                            handleClickOpen={handleClickOpen}
                            setAlertText={setAlertText}
                            storeProcess={storeProcess}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <DialogAlert />
        </Grid>
    )
}

export default UserList
