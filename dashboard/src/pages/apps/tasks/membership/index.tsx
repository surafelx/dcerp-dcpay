// ** React Imports
import { useState, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'



// ** Actions Imports
import { fetchData, deleteMembership } from 'src/store/apps/Tasks/Membership'
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'
import { fetchData as fetchTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import { useForm, } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { addMembership, editMembership } from 'src/store/apps/Tasks/Membership'

import MembershipTable from 'src/views/dc-pay/tables/Tasks/Membership/MembershipTable'


const emptyValues = {
    id: '',
    employeeId: '',
    transactionId: '',
}


const schema = yup.object().shape({
    employeeId: yup.string(),
    transactionId: yup.string(),

})

const UserList = () => {
    // ** State
    const [employee, setEmployee] = useState<string>('')
    const [employeeObject, setEmployeeObject] = useState<any>(null)
    const [transaction, setTransaction] = useState<string>('')
    const [transactionObject, setTransactionObject] = useState<any>(null)
    const [value] = useState<string>('')

    const [formData, setFormData] = useState({
        id: '',
        employeeId: employee,
        transactionId: transaction,
    });

    const {
        handleSubmit,
        reset,
       
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })




    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.membership)



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
        setTransactionObject({ id: '', transactionName: '' })
        setEmployee('')
        setTransaction('')
        reset(emptyValues)
    }

    const handleEmployeeChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setEmployeeObject(newValue)
            setEmployee(newValue.id)
            setTransactionObject({ id: '', transactionName: '' })
        }
    }

    const handleTransactionChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setTransactionObject(newValue)
            setTransaction(newValue.id)
        }
    }

    const onSubmit = (data: any) => {
        data.employeeId = employee
        data.transactionId = transaction
        if (data.id) {
            dispatch(editMembership({ ...data }))
        } else {
            dispatch(addMembership({ ...data }))
        }
        setTransaction('')
    }

    const employeeStore = useSelector((state: RootState) => state.employee)
    const transactionDefinitionStore = useSelector((state: RootState) => state.transactionDefinition)

    console.log(transactionDefinitionStore)

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>

                    <Card>
                        <CardHeader title='Membership' />
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
                                <Grid item xs={5}>
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
                                <Grid item xs={5}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={transactionObject}
                                            options={transactionDefinitionStore.data.filter((tran: any) => tran.transactionGroupName == 'Membership')}
                                            onChange={handleTransactionChange}
                                            id='autocomplete-controlled'
                                            isOptionEqualToValue={(option: any, value: any) => option.transactionName == value.transactionName}
                                            getOptionLabel={option => option.transactionName}
                                            renderInput={params => <TextField {...params} label='Select Transaction' />}
                                        />
                                    </FormControl>
                                </Grid>

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
                                        <Button color='secondary' fullWidth size='small' onClick={() => clearAllFields()} type='reset' variant='contained' sx={{ mb: 7 }}>
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
                        <MembershipTable
                            rows={store.data}
                            formData={formData}
                            setFormData={setFormData}
                            deleteMembership={deleteMembership}
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
        </Grid >
    )
}

export default UserList
