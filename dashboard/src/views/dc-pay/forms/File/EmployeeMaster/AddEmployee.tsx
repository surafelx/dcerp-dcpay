// ** React Imports
import { useEffect, useState, forwardRef, ChangeEvent } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { RootState } from 'src/store'

// ** Actions Imports
import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'
import { addEmployee, editEmployee } from 'src/store/apps/File/EmployeeMaster'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'

import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import Grid from '@mui/material/Grid'
import format from 'date-fns/format'



interface CustomInputProps {
    value: DateType
    label: string
    error: boolean
    onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})


interface PickerProps {
    label?: string
    end: Date | number
    start: Date | number
}

const RangeCustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = format(props.start, 'MM/dd/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField inputRef={ref} label={props.label || ''} sx={{ width: '100%' }}  {...props} value={value} />
})



const schema = yup.object().shape({
    employeeCode: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
    sex: yup.string(),
    contractStartDate: yup.string(),
    contractEndDate: yup.string(),
    employmentDate: yup.string(),
    employeeStatus: yup.string(),
    employeeType: yup.string(),
    monthlyWorkingHours: yup.string(),
    basicSalary: yup.string(),
    pensionNumber: yup.string(),
    tinNumber: yup.string(),
    workingDays: yup.string(),
    employeeBankAccount: yup.string(),
    employeeBank: yup.string(),
    employeeBranch: yup.string(),
    employeeDepartment: yup.string(),
    employeePosition: yup.string(),
})

const emptyValues = {
    id: '',
    employeeCode: '',
    contractStartDate: '',
    contractEndDate: '',
    employmentDate: '',
    firstName: '',
    lastName: '',
    sex: '',
    employeeStatus: '',
    employeeType: '',
    monthlyWorkingHours: '',
    basicSalary: '',
    pensionNumber: '',
    tinNumber: '',
    workingDays: '',
    employeeBank: '',
    employeeBankAccount: '',
    employeeBranch: '',
    employeeDepartment: '',
    employeePosition: '',
    contractDate: '',
}



const AddMenuLevelTwo = ({
    formData,
}: any) => {

    // @ts-ignore
    const userData = JSON.parse(window.localStorage.getItem('userData'))
    const { start_date: startDate, end_date: endDate } = userData.currentPeriod || { start_date: '', end_date: '' }

    const [employmentTypeValue, setEmploymentTypeValue] = useState<any>('')
    const [contractStart, setContractStart] = useState<any>(new Date(startDate))
    const [contractEnd, setContractEnd] = useState<any>(new Date(endDate))
    const [workingDaysPeriod, setWorkingDaysPeriod] = useState<any>(30)

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()


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

    useEffect(() => {
        dispatch(
            fetchDepartment({
                q: ''
            })
        )
    }, [dispatch])

    useEffect(() => {
        dispatch(
            fetchBranch({
                q: ''
            })
        )
    }, [dispatch])





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

    useEffect(() => {
        reset(formData);
    }, [formData, reset])

    // any type used

    const onSubmit = (data: any) => {
        data.workingDays = workingDaysPeriod
        if(data.contractDate) {
            console.log(data.contractDate)
            data.contractStartDate = data.contractDate[0]
            data.contractEndDate = data.contractDate[1]
        }
       
        if (data.id) {
            dispatch(editEmployee({ ...data }))
        } else {
            dispatch(addEmployee({ ...data }))
        }
        reset(emptyValues)
    }




    const subParameters = useSelector((state: RootState) => state.subParameterDefinition)
    const mainParameters = useSelector((state: RootState) => state.mainParameterDefinition)
    const branchOptions = useSelector((state: RootState) => state.branches)
    const departmentOptions = useSelector((state: RootState) => state.department)



    const filterSubParametersByName = (parentParamName: any) => {
        const parent: any = mainParameters.allData.find((parent: any) => parent.parameterName === parentParamName);
        if (!parent) {
            return [];
        }

        const filteredChild = subParameters.allData.filter((child: any) => child.parameterId === parent.id);

        return filteredChild
    }

    const bankOptions = filterSubParametersByName('Bank')
    const sexOptions = filterSubParametersByName('Sex')
    const employeeStatusOptions = filterSubParametersByName('Employee Status')
    const employmentTypeOptions = filterSubParametersByName('Employee Type')
    const employeePositionOptions = filterSubParametersByName('Employee Position')


    const handleOnChangeRange = (dates: any) => {
        const [start, end] = dates
        const timeDiff = new Date(endDate).getTime() - new Date(start).getTime()
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        setWorkingDaysPeriod(daysDiff)
        formData.workingDays = workingDaysPeriod
        setContractEnd(end)
        setContractStart(start)
    }




    return (
        <Card>
            <CardHeader title='Add Employee' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>


                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={2}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeCode'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Code'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={(e) => {
                                                onChange(e)
                                                console.log(e.target.value)
                                            }
                                            }
                                            placeholder='Employee Code'
                                        />
                                    )}
                                />
                                {errors.employeeCode && <FormHelperText sx={{ color: 'error.main' }}>{errors.employeeCode.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='firstName'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='First Name'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.firstName)}
                                            placeholder='First Name'
                                        />
                                    )}
                                />
                                {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='lastName'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Last Name'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.lastName)}
                                            placeholder='Last Name'
                                        />
                                    )}
                                />
                                {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        {/* {workin} */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='sex'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Sex</InputLabel>
                                            <Select
                                                label='Sex'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    sexOptions.map(({ id, parameterName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>

                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeStatus'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Employee Status</InputLabel>
                                            <Select
                                                label='Employee Status'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    employeeStatusOptions.map(({ id, parameterName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>

                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeType'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Employment Type</InputLabel>
                                            <Select
                                                label='Employment Type'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={(e) => {
                                                    onChange(e)
                                                    const selectedType: any = employmentTypeOptions.find((obj: any) => obj.id === e.target.value);
                                                    console.log(selectedType)
                                                    setEmploymentTypeValue(selectedType.parameterName)
                                                }
                                                }
                                            >
                                                {
                                                    employmentTypeOptions.map(({ id, parameterName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        {employmentTypeValue === '' && (
                            <Grid item xs={12} sm={6}>
                            </Grid>
                        )}
                        {employmentTypeValue === 'Contract' && (
                            <>
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth sx={{ mb: 4 }}>
                                            <Controller
                                                name='contractDate'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <DatePicker
                                                        selectsRange
                                                        monthsShown={2}
                                                        endDate={contractEnd}
                                                        minDate={new Date(startDate)}
                                                        selected={contractStart}
                                                        startDate={contractStart}
                                                        shouldCloseOnSelect={true}
                                                        id='date-range-picker-months'
                                                        onChange={(e) => {
                                                            onChange(e)
                                                            handleOnChangeRange(e)

                                                        }
                                                        }
                                                        value={value}
                                                       
                                                        customInput={
                                                            <RangeCustomInput
                                                                label='Contract Dates'
                                                                end={contractEnd as Date | number}
                                                                start={contractStart as Date | number}
                                                            />
                                                        }
                                                    />
                                                )}
                                            />
                                            {errors.contractStartDate && (
                                                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                                                    This field is required
                                                </FormHelperText>
                                            )}
                                            {errors.contractStartDate && <FormHelperText sx={{ color: 'error.main' }}>{errors.contractStartDate.message}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                </>
                            </>
                        )}
                        {employmentTypeValue === 'Permanent' && (
                            <>
                                <>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth sx={{ mb: 4 }}>
                                            <Controller
                                                name='employmentDate'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <DatePicker
                                                        selected={value ? new Date(value) : null}
                                                        minDate={new Date(startDate)}
                                                        maxDate={new Date(endDate)}
                                                        onChange={(e: any) => {
                                                            onChange(e)
                                                            const timeDiff = new Date(endDate).getTime() - new Date(e).getTime()
                                                            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
                                                            setWorkingDaysPeriod(daysDiff)
                                                            formData.workingDays = workingDaysPeriod
                                                        }}
                                                        placeholderText='MM/DD/YYYY'
                                                        customInput={
                                                            <CustomInput
                                                                value={value ? new Date(value) : null}
                                                                onChange={onChange}
                                                                label='Employment Date'
                                                                error={Boolean(errors.employmentDate)}
                                                                aria-describedby='validation-basic-dob'
                                                            />
                                                        }
                                                    />
                                                )}
                                            />
                                            {errors.employmentDate && (
                                                <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                                                    This field is required
                                                </FormHelperText>
                                            )}
                                            {errors.employmentDate && <FormHelperText sx={{ color: 'error.main' }}>{errors.employmentDate.message}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                </>
                            </>
                        )}


                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='basicSalary'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Basic Salary'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.basicSalary)}
                                            placeholder='Basic Salary'
                                        />
                                    )}
                                />
                                {errors.basicSalary && <FormHelperText sx={{ color: 'error.main' }}>{errors.basicSalary.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='workingDays'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: {  onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Working Days'
                                            value={workingDaysPeriod}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.workingDays)}
                                        />
                                    )}
                                />
                                {errors.workingDays && <FormHelperText sx={{ color: 'error.main' }}>{errors.workingDays.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='monthlyWorkingHours'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Monthly Working Hours'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.monthlyWorkingHours)}
                                            placeholder='Monthly Working Hours'
                                        />
                                    )}
                                />
                                {errors.monthlyWorkingHours && <FormHelperText sx={{ color: 'error.main' }}>{errors.monthlyWorkingHours.message}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='pensionNumber'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Pension Number'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.pensionNumber)}
                                            placeholder='Pension Number'
                                        />
                                    )}
                                />
                                {errors.pensionNumber && <FormHelperText sx={{ color: 'error.main' }}>{errors.pensionNumber.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='tinNumber'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='TIN Number'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.tinNumber)}
                                            placeholder='TIN Number'
                                        />
                                    )}
                                />
                                {errors.tinNumber && <FormHelperText sx={{ color: 'error.main' }}>{errors.tinNumber.message}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeBank'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Select Bank Account</InputLabel>
                                            <Select
                                                label='Select Bank Account'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    bankOptions.map(({ id, parameterName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeBankAccount'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            autoFocus
                                            label='Bank Account'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.employeeBankAccount)}
                                            placeholder='Bank Account'
                                        />
                                    )}
                                />
                                {errors.employeeBankAccount && <FormHelperText sx={{ color: 'error.main' }}>{errors.employeeBankAccount.message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeBranch'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Branch</InputLabel>
                                            <Select
                                                label='Branch'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    branchOptions.data.map(({ id, branchName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{branchName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeeDepartment'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Department</InputLabel>
                                            <Select
                                                label='Department'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    departmentOptions.data.map(({ id, departmentName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{departmentName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth sx={{ mb: 4 }}>
                                <Controller
                                    name='employeePosition'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <>
                                            <InputLabel id='demo-simple-select-autoWidth-label'>Position</InputLabel>
                                            <Select
                                                label='Position'
                                                value={value}
                                                id='demo-simple-select-autoWidth'
                                                labelId='demo-simple-select-autoWidth-label'
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            >
                                                {
                                                    employeePositionOptions.map(({ id, parameterName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Button color='primary' fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                    Submit
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Button color='secondary' fullWidth size='large' onClick={() => reset()} type='reset' variant='contained' sx={{ mb: 7 }}>
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

export default AddMenuLevelTwo