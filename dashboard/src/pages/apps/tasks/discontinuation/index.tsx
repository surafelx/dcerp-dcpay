// ** React Imports
import { useState, useEffect, forwardRef, ChangeEvent } from 'react'

import Autocomplete from '@mui/material/Autocomplete'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
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
import DiscontinuationTable from 'src/views/dc-pay/tables/Tasks/Discontinuation/DiscontinuationTable'



import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'


const emptyValues = {
    id: '',
    employeeId: '',
    actionDate: '',
    actionType: '',
    referrenceNumber: ''
}

interface CustomInputProps {
    value: DateType
    label: string
    error: boolean
    onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
    return <TextField size={'small'} inputRef={ref} {...props} sx={{ width: '100%' }} />
})



const schema = yup.object().shape({
    employeeId: yup.string(),
    transactionAmount: yup.string(),
    actionDate: yup.string(),
    actionType: yup.string(),
    referrenceNumber: yup.string()

})



const UserList = () => {

    // @ts-ignore
    const userData = JSON.parse(window.localStorage.getItem('userData'))
    const { start_date: startDate, end_date: endDate } = userData.currentPeriod || { start_date: '', end_date: '' }

    // ** State
    const [employee, setEmployee] = useState<string>('')
    const [employeeObject, setEmployeeObject] = useState<any>(null)
    const [actionType, setActionType] = useState<string>('')
    const [actionTypeObject, setActionTypeObject] = useState<any>(null)
    const [value] = useState<string>('')

    const [formData, setFormData] = useState({
        id: '',
        employeeId: employee,
        referenceNumber: '',
        actionType,
        actionDate: ''

    });



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

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payTransaction)

    const employeeStore = useSelector((state: RootState) => state.employee)
    const earningStore = store.data.filter(({ transactionTypeName, transactionAmount, parameterName }: any) => ((transactionTypeName === "Earning Quantity" || transactionTypeName === "Earning Amount") && Number(transactionAmount)) || parameterName === 'Basic Salary')
    const transactionDefinitionStore = useSelector((state: RootState) => state.transactionDefinition)

    useEffect(() => {
        dispatch(
            fetchData({
                employee,
                q: value,
            })
        )
    }, [dispatch, employee, value])

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

    useEffect(() => {
        dispatch(
            fetchMainParameterDefinitions({
                q: ''
            })
        )
    }, [dispatch])

    useEffect(() => {
        dispatch(
            fetchSubParameterDefinition({
                q: ''
            })
        )
    }, [dispatch])



    const subParameters = useSelector((state: RootState) => state.subParameterDefinition)
    const mainParameters = useSelector((state: RootState) => state.mainParameterDefinition)

    const filterSubParametersByName = (parentParamName: any) => {
        const parent: any = mainParameters.allData.find((parent: any) => parent.parameterName === parentParamName);
        if (!parent) {
            return [];
        }

        const filteredChild = subParameters.allData.filter((child: any) => child.parameterId === parent.id);

        return filteredChild
    }

    const actionTypeOptions = filterSubParametersByName('Action Type')

    const clearAllFields = () => {
        setEmployeeObject({ id: '', firstName: '', employeeCode: '' })
        setActionTypeObject({ id: '', parameterName: '' })
        setEmployee('')
        setActionType('')
        reset(emptyValues)
    }

    const handleEmployeeChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setEmployeeObject(newValue)
            setEmployee(newValue.id)
            setActionTypeObject({ id: '', parameterName: '' })
        }
    }

    const handleAActionTypeChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setActionTypeObject(newValue)
            setActionType(newValue.id)
        }
    }

    const onSubmit = (data: any) => {
        data.employeeId = employee
        data.actionType = actionType
        if (data.id) {
            dispatch(editPayTransaction({ ...data }))
        } else {
            dispatch(addPayTransaction({ ...data }))
        }
        clearAllFields()
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {/* <Card>
                    <CardHeader title={'Discontinuation'} />
                    <CardContent> */}
                <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item sm={2}>
                            <FormControl fullWidth >
                                <Controller
                                    name='referrenceNumber'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            size={'small'}
                                            autoFocus
                                            type={'number'}
                                            label='Ref. No.'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.referrenceNumber)}
                                            placeholder='Ref. No.'
                                        />
                                    )}
                                />
                                {errors.referrenceNumber && <FormHelperText sx={{ color: 'error.main' }}>{errors.referrenceNumber.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
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
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    autoSelect
                                    size={'small'}
                                    value={actionTypeObject}
                                    options={actionTypeOptions}
                                    onChange={handleAActionTypeChange}
                                    id='autocomplete-controlled'
                                    isOptionEqualToValue={(option: any, value: any) => option.parameterName == value.parameterName}
                                    getOptionLabel={option => option.parameterName}
                                    renderInput={params => <TextField {...params} label='Select Action' />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <>
                                    <Controller
                                        name='actionDate'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <DatePicker
                                                selected={value ? new Date(value) : null}
                                                minDate={new Date(startDate)}
                                                maxDate={new Date(endDate)}
                                                onChange={onChange}
                                                placeholderText='MM/DD/YYYY'
                                                customInput={
                                                    <CustomInput
                                                        value={new Date(value)}
                                                        onChange={onChange}
                                                        label='Action Date'
                                                        error={Boolean(errors.actionDate)}
                                                        aria-describedby='validation-basic-dob'
                                                    />
                                                }
                                            />
                                        )}
                                    />
                                    {errors.actionDate && (
                                        <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                                            This field is required
                                        </FormHelperText>
                                    )}
                                    {errors.actionDate && <FormHelperText sx={{ color: 'error.main' }}>{errors.actionDate.message}</FormHelperText>}
                                </>
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
                                <Button color='secondary' fullWidth size='small' onClick={() => clearAllFields()} type='reset' variant='contained' sx={{ mb: 7 }}>
                                    Reset
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
                {/* </CardContent>
                </Card> */}

            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Card>
                    <CardContent>
                        <DiscontinuationTable
                            rows={earningStore}
                            formData={formData}
                            setFormData={setFormData}
                            deletePayTransaction={deletePayTransaction}
                            setEmployeeObject={setEmployeeObject}
                            setEmployee={setEmployee}
                            setTransaction={setActionType}
                            setActionTypeObject={setActionTypeObject}
                            reset={reset}
                            transaction={actionType}
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
