// ** React Imports
import { useState, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'




// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { RootState } from 'src/store'



// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addMembership, editMembership } from 'src/store/apps/Tasks/Membership'
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'
import { fetchTransactionDefinitionByGroup } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'


const schema = yup.object().shape({
    employeeId: yup.string(),
    transactionId: yup.string(),
})

const emptyValues = {
    id: '',
    employeeId: '',
    transactionId: '',
}



const AddMembership = ({
    formData,
}: any) => {

    const [employee, setEmployee] = useState<string>('')
    const [employeeObject, setEmployeeObject] = useState<any>(null)
    const [transaction, setTransaction] = useState<string>('')
    const [transactionObject, setTransactionObject] = useState<any>(null)

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const [, setMainParameterDefinition] = useState<string>('')

    useEffect(() => {
        dispatch(
            fetchEmployee({
                q: ''
            })
        )
    }, [dispatch])


    useEffect(() => {
        dispatch(
            fetchTransactionDefinitionByGroup({
                group: 'Membership'
            })
        )
    }, [dispatch])




    const {
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(formData);
    }, [formData, reset])

    // any type used
    const onSubmit = (data: any) => {
        data.transactionId = transaction
        data.employeeId = employee
        if (data.id) {
            dispatch(editMembership({ ...data }))
        } else {
            dispatch(addMembership({ ...data }))
        }
        reset(emptyValues)
        setMainParameterDefinition('')
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


    const employeeStore = useSelector((state: RootState) => state.employee)
    const transactionDefinitionStore = useSelector((state: RootState) => state.transactionDefinition)

    return (
        <Card>
            <CardHeader title='Add Membership' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
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
                        <Grid item xs={4} >
                            <FormControl fullWidth>
                                <Autocomplete
                                    autoSelect
                                    size={'small'}
                                    value={transactionObject}
                                    options={transactionDefinitionStore.data.filter((tran: any) => tran.updateTypeName === 'Input' && tran.transactionGroupName !== 'Loan' && tran.transactionName !== 'None')}
                                    onChange={handleTransactionChange}
                                    id='autocomplete-controlled'
                                    isOptionEqualToValue={(option: any, value: any) => option.transactionName == value.transactionName}
                                    getOptionLabel={option => option.transactionName}
                                    renderInput={params => <TextField {...params} label='Select Transaction' />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <Button fullWidth size='small' type='submit' variant='contained'>
                                    Submit
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <Button fullWidth size='small' color='secondary' onClick={() => reset()} type='reset' variant='contained'>
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

export default AddMembership
