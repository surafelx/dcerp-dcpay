// ** React Imports
import { useState, useEffect, } from 'react'


// ** MUI Imports
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

const emptyValues = {
    id: '',
    employeeId: '',
    transactionId: '',
    transactionAmount: '',
    totalLoan: '',
    remainingBalance: ''
}


const schema = yup.object().shape({
    employeeId: yup.string(),
    transactionId: yup.string(),
    transactionAmount: yup.string(),
    remainingBalance: yup.string(),
    totalLoan: yup.string()

})


const UserList = () => {
    // ** State
    const [employee, setEmployee] = useState<string>('')
    const [employeeObject, setEmployeeObject] = useState<any>(null)
    const [transaction, setTransaction] = useState<string>('')
    const [transactionObject, setTransactionObject] = useState<any>(null)
    const [value,] = useState<string>('')

    const [formData, setFormData] = useState({
        id: '',
        employeeId: '',
        transactionId: '',
        totalLoan: '',
        transactionAmount: '',
        remainingBalance: ''
    });


    const clearAllFields = () => {
        setEmployeeObject({ id: '', firstName: '', employeeCode: '' })
        setTransactionObject({ id: '', transactionName: '' })
        setEmployee('')
        setTransaction('')
        reset(emptyValues)
    }




    const onSubmit = (data: any) => {
        data.employeeId = employee
        data.transactionId = transaction
        if (data.id) {
            dispatch(editLoanTransaction({ ...data }))
        } else {
            dispatch(addLoanTransaction({ ...data }))
        }
        clearAllFields()
    }

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.loanTransaction)

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

    const handleTransactionValue = (transactionValue: any) => {
        const selectedTransactionId = transactionValue
        const existingObject: any = store.data.find(obj => (obj["transactionId"] === selectedTransactionId))
        if (existingObject) {
            reset(
                {
                    id: existingObject.id,
                    employeeId: employee,
                    transactionId: selectedTransactionId,
                    transactionAmount: existingObject.transactionAmount
                }
            )
        } else {
            reset({
                transactionAmount: ''
            })
        }

        setTransaction(selectedTransactionId)
    }

    const handleEmployeeChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setEmployeeObject(newValue)
            setEmployee(newValue.id)
            setTransactionObject({ id: '', transactionName: '' })
            reset({ transactionAmount: '' })
        }
    }

    const handleTransactionChange = (e: any, newValue: any) => {
        if (newValue?.id && employee) {
            setTransactionObject(newValue)
            handleTransactionValue(newValue.id)
        }
    }



    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

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
                                            options={employeeStore.data}
                                            onChange={handleEmployeeChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.employeeCode == value.employeeCode}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.employeeCode}
                                            renderInput={params => <TextField {...params} label='Select Employee' />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={employeeObject}
                                            options={employeeStore.data}
                                            onChange={handleEmployeeChange}
                                            id='autocomplete-controlled'
                                            isOptionEqualToValue={(option: any, value: any) => option.firstName == value.firstName}
                                            getOptionLabel={(option: any) => option.firstName}
                                            renderInput={params => <TextField {...params} label='Select Employee' />}
                                        />
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
                                            isOptionEqualToValue={(option: any, value: any) => option.transactionName == value.transactionName}
                                            getOptionLabel={option => option.transactionName}
                                            renderInput={params => <TextField {...params} label='Select Transaction' />}
                                        />
                                    </FormControl>
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
                                                   
                                                    dir={'rtl'}
                                                    label='Transaction Amount'
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.transactionAmount)}
                                                    placeholder='Enter Transaction Amount'
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
                                                    dir={'rtl'}
                                                    label='Total Loan'
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.totalLoan)}
                                                    placeholder='Enter Total Loan'
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
                                                    dir={'rtl'}
                                                    value={value}
                                                    onBlur={onBlur}
                                                    disabled={true}
                                                    onChange={onChange}
                                                    error={Boolean(errors.remainingBalance)}
                                                    placeholder='Enter Remaining Balance'
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
                    <CardContent>
                        <LoanTransactionTable
                            rows={store.data}
                            formData={formData}
                            setFormData={setFormData}
                            deleteLoanTransaction={deleteLoanTransaction}
                            setEmployeeObject={setEmployeeObject}
                            setTransactionObject={setTransactionObject}
                            reset={reset}
                            transaction={transaction}
                            transactionDefinitionStore={transactionDefinitionStore}
                            employeeStore={employeeStore}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserList
