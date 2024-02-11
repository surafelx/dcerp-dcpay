// ** React Imports
import { useState, useEffect, useRef } from 'react'

import Autocomplete from '@mui/material/Autocomplete'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'

// ** Actions Imports
import { fetchData, deletePayTransaction } from 'src/store/apps/Tasks/PayTransaction'
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'
import { fetchData as fetchTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import * as yup from 'yup'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { addPayTransaction, editPayTransaction } from 'src/store/apps/Tasks/PayTransaction'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PayTransactionTable from 'src/views/dc-pay/tables/Tasks/PayTransaction/PayTransactionTable'



const emptyValues = {
    id: '',
    employeeId: '',
    transactionId: '',
    transactionAmount: ''
}


const schema = yup.object().shape({
    employeeId: yup.string(),
    transactionId: yup.string(),
    transactionAmount: yup.string()

})



const UserList = () => {
    // ** State
    const [loading, setLoading] = useState<boolean>(false)
    const [employee, setEmployee] = useState<string>('')
    const [employeeObject, setEmployeeObject] = useState<any>(null)
    const [transaction, setTransaction] = useState<string>('')
    const [transactionObject, setTransactionObject] = useState<any>(null)
    const [value] = useState<string>('')

    const [formData, setFormData] = useState({
        id: '',
        employeeId: employee,
        transactionId: transaction,
        transactionAmount: ''
    });


    const employeeCodeRef: any = useRef();
    const transactionRef: any = useRef();
    const transactionAmountRef: any = useRef()


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payTransaction)
    const employeeStore = useSelector((state: RootState) => state.employee)

    const activeEmployees = employeeStore.data.filter(({ employeeStatusName }: any) => (employeeStatusName === "Active"))
    const deductionStore = store.data.filter(({ transactionTypeName, transactionAmount }: any) => (transactionTypeName === "Deduction Quantity" || transactionTypeName === "Deduction Amount") && Number(transactionAmount))
    const earningStore = store.data.filter(({ transactionTypeName, transactionAmount, transactionName }: any) => ((transactionTypeName === "Earning Quantity" || transactionTypeName === "Earning Amount") && Number(transactionAmount)) || transactionName === 'Basic Salary')
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


    useEffect(() => {
        dispatch(
            fetchData({
                employee,
                q: value,
            })
        )

    }, [dispatch, employee, setEmployee, value, loading])


    useEffect(() => {
        dispatch(
            fetchEmployee({
                q: ''
            })
        )
    }, [dispatch])


    useEffect(() => {
        dispatch(
            fetchTransactionDefinition({
                q: ''
            })
        )
    }, [dispatch])


    const clearAllFields = () => {
        setEmployeeObject({ id: '', firstName: '', employeeCode: '' })
        setTransactionObject({ id: '', transactionName: '', transactionCode: '' })
        setEmployee('')
        setTransaction('')
        reset(
            {
                id: '',
                employeeId: '',
                transactionId: '',
                transactionAmount: '',
            }
        )

    }

    const handleEmployeeChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setEmployeeObject(newValue)
            setEmployee(newValue.id)
            setTransactionObject({ id: '', transactionName: '', transactionCode: '' })
            reset({ transactionAmount: '' })
        }
    }

    const handleTransactionChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setTransactionObject(newValue)
            handleTransactionValue(newValue.id)
        }
    }

    const onSubmit = (data: any) => {
        setLoading(true)
        const copyEmp = employeeObject
        data.employeeId = employeeObject.id
        data.transactionId = transaction
        if (data.id) {
            dispatch(editPayTransaction({ ...data }))
        } else {
            dispatch(addPayTransaction({ ...data }))
        }
        clearAllFields()
        setEmployeeObject({ id: copyEmp.id, firstName: copyEmp.firstName, employeeCode: copyEmp.employeeCode })
        setEmployee(copyEmp.id)
        setLoading(false)
        transactionRef.current.focus()
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>

                    <Card>
                        <CardHeader title='Pay Transaction' />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={2}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={employeeObject}
                                            options={activeEmployees}
                                            onChange={(e, v) => {
                                                handleEmployeeChange(e, v)
                                                transactionRef.current.focus()
                                            }
                                            }
                                            onBlur={() => {
                                                transactionRef.current.focus()
                                            }}
                                            isOptionEqualToValue={(option: any, value: any) => option.employeeCode == value.employeeCode}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.employeeCode}
                                            renderInput={params => <TextField {...params} inputRef={employeeCodeRef} label='Select Employee' />}
                                        />
                                    </FormControl>
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
                                            options={transactionDefinitionStore.data.filter((tran: any) => tran.updateTypeName === 'Input' && tran.transactionGroupName !== 'Loan' && tran.transactionName !== 'None')}
                                            onChange={(e, v) => {
                                                handleTransactionChange(e, v)
                                                transactionAmountRef.current.focus()
                                            }
                                            }
                                            id='autocomplete-controlled'
                                            isOptionEqualToValue={(option: any, value: any) => option.transactionCode == value.transactionCode}
                                            getOptionLabel={option => option.transactionCode}
                                            renderInput={params => <TextField {...params} inputRef={transactionRef} label='Select Transaction' />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={transactionObject}
                                            options={transactionDefinitionStore.data.filter((tran: any) => tran.updateTypeName === 'Input' && tran.transactionGroupName !== 'Loan' && tran.transactionName !== 'None')}
                                            onChange={(e, v) => {
                                                handleTransactionChange(e, v)
                                                transactionAmountRef.current.focus()
                                            }
                                            }
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
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth>
                                        <Button color='primary' fullWidth size='small' type='submit' variant='contained' sx={{ mb: 7 }}>
                                            Submit
                                        </Button>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth>
                                        <Button color='secondary' fullWidth size='small' onClick={clearAllFields} type='reset' variant='contained' sx={{ mb: 7 }}>
                                            Reset
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
            </Grid>
            {!loading && (
<>
<Grid item xs={12} md={12} lg={6}>
                <Card>
                    <CardHeader title='Earnings' titleTypographyProps={{ variant: 'body2' }} />
                    <CardContent>
                        <PayTransactionTable
                            rows={earningStore}
                            employee={employee}
                            formData={formData}
                            setFormData={setFormData}
                            deletePayTransaction={deletePayTransaction}
                            setEmployeeObject={setEmployeeObject}
                            setEmployee={setEmployee}
                            setTransaction={setTransaction}
                            setTransactionObject={setTransactionObject}
                            reset={reset}
                            transactionRef={transactionRef}
                            transaction={transaction}
                            transactionDefinitionStore={transactionDefinitionStore}
                            employeeStore={employeeStore}
                            employeeObject={employeeObject}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <Card>
                    <CardHeader title='Deductions' titleTypographyProps={{ variant: 'body2' }} />
                    <CardContent>
                        <PayTransactionTable
                        employeeObject={employeeObject}
                            rows={deductionStore}
                            formData={formData}
                            employee={employee}
                            setFormData={setFormData}
                            deletePayTransaction={deletePayTransaction}
                            setEmployeeObject={setEmployeeObject}
                            setEmployee={setEmployee}
                            setTransaction={setTransaction}
                            setTransactionObject={setTransactionObject}
                            reset={reset}
                            transaction={transaction}
                            transactionDefinitionStore={transactionDefinitionStore}
                            employeeStore={employeeStore}
                            transactionRef={transactionRef}
                        />
                    </CardContent>
                </Card>
            </Grid>
</>
            )}
          
        </Grid>
    )
}

export default UserList
