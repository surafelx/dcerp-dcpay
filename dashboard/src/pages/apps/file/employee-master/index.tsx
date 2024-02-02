// ** React Imports
import { useState, useEffect, forwardRef, ChangeEvent } from 'react'


// ** MUI Imports
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

// ** Actions Imports
import { fetchData, deleteEmployee } from 'src/store/apps/File/EmployeeMaster'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import moment from 'moment'

// ** Custom Components Imports
import TableHeader from 'src/views/dc-pay/apps/File/EmployeeMaster/TableHeader'

import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

import Autocomplete from '@mui/material/Autocomplete'
import EmployeeMasterTable from 'src/views/dc-pay/tables/File/EmployeeMaster/EmployeeMasterTable'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import format from 'date-fns/format'
import { addEmployee, editEmployee } from 'src/store/apps/File/EmployeeMaster'
import TextField from '@mui/material/TextField'
import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'


interface CustomInputProps {
    value: DateType
    label: string
    error: boolean
    onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
    return <TextField required size={'small'} inputRef={ref} {...props} sx={{ width: '100%' }} />
})


interface PickerProps {
    label?: string
    end: Date | number
    start: Date | number
    error: any
}

const RangeCustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? ` - ${format(props.start, 'MM/dd/yyyy')}` : ''
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : ''

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField size={'small'} inputRef={ref} label={props.label || ''} sx={{ width: '100%' }}  {...props} value={value} />
})




const emptyValues = {
    id: '',
    employeeCode: 0,
    employeeTitle: '',
    contractStartDate: '',
    contractEndDate: '',
    employeeTypeName: '',
    employmentDate: '',
    firstName: '',
    middleName: '',
    lastName: '',
    sex: '',
    employeeStatus: '',
    employeeType: '',
    monthlyWorkingHours: '',
    basicSalary: '',
    pensionNumber: '',
    pensionStatus: false,
    tinNumber: '',
    workingDays: 0,
    employeeBank: '',
    employeeBankAccount: '',
    employeeBranch: '',
    employeeDepartment: '',
    employeePosition: '',
    contractDate: '',
}


const UserList = () => {
    // @ts-ignore
    const userData = JSON.parse(window.localStorage.getItem('userData'))
    const { start_date: startDate, end_date: endDate } = userData.currentPeriod || { start_date: '', end_date: '' }
    const [employmentTypeValue, setEmploymentTypeValue] = useState<any>('')
    const [contractStart, setContractStart] = useState<any>(null)
    const [contractEnd, setContractEnd] = useState<any>(null)
    const [employmentDateError,] = useState(null)

    // ** State
    const [filterValue, setFilterValue] = useState<string>('')
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
    const [, setBranch] = useState<string>('All')
    const [branchObject, setBranchObject] = useState<any>({ id: 'All', branchName: 'All Branches' })
    const [formBranchObject, setFormBranchObject] = useState<any>({ id: '', branchName: '' })
    const [formDepartmentObject, setFormDepartmentObject] = useState<any>({ id: '', departmentName: '' })
    const [, setDepartment] = useState<string>('All')
    const [departmentObject, setDepartmentObject] = useState<any>({ id: 'All', departmentName: 'All Departments' })
    const [workingDaysPeriod, setWorkingDaysPeriod] = useState<any>('')
    const [tempValidation, setTempValidation] = useState<boolean>(false)

    const handleFilter = (val: string) => {
        setFilterValue(val)
    }


    const [formData, setFormData] = useState(emptyValues);


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.employee)

    const branchStore = useSelector((state: RootState) => state.branches)
    const departmentStore = useSelector((state: RootState) => state.department)

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



    const bankOptions: any = filterSubParametersByName('Bank')
    const sexOptions = filterSubParametersByName('Sex')
    const employeeStatusOptions = filterSubParametersByName('Employee Status')
    const employmentTypeOptions: any = filterSubParametersByName('Employee Type')
    const employeePositionOptions = filterSubParametersByName('Employee Position')
    const employeeTitleOptions = filterSubParametersByName('Employee Title')

    const permanentEmploymentTypeValue = employmentTypeOptions.filter((parameter: any) => parameter.parameterName == 'Permanent')[0]?.id

    const naBank = bankOptions.filter((parameter: any) => parameter.parameterName == 'CASH')[0]?.id

    const schema = yup.object().shape({
        id: yup.string(),
        employeeCode: yup.number().typeError('Code has to be a valid number.').required("Code is required").test('not-zero', 'Code cannot be 0', (value) => value !== 0),
        employeeTitle: yup.string().required('Required'),
        firstName: yup.string().required('Required'),
        middleName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        sex: yup.string().required('Required'),
        contractStartDate: yup.string(),
        contractDate: yup.mixed(),
        contractEndDate: yup.string(),
        employmentDate: yup.string().when('employeeType', {
            is: permanentEmploymentTypeValue,
            then: yup.string().required('Employment Date is required.'),
            otherwise: yup.string(),
        }),
        employeeStatus: yup.string().required('Required'),
        employeeType: yup.string().required('Required'),
        monthlyWorkingHours: yup.number().typeError('Cannot be empty.').required('Required').test('not-zero', 'Cannot be 0.', (value) => value !== 0),
        basicSalary: yup.number().typeError('Cannot be empty.').required('Required').test('not-zero', 'Cannot be 0.', (value) => value !== 0),
        pensionStatus: yup.boolean(),
        pensionNumber: yup.string().nullable(),
        tinNumber: yup.string(),
        workingDays: yup.number().required('Required'),
        employeeBankAccount: yup.string().when('employeeBank', {
            is: naBank,
            then: yup.string(),
            otherwise: yup.string().required('Account Number is Required').matches(/^\d+$/, 'Bank account must only contain digits').min(5, 'Bank account must be greater than 4 digits'),
        }),
        employeeBank: yup.string().required('Required'),
        employeeBranch: yup.string().required('Required'),
        employeeDepartment: yup.string().required('Required'),
        employeePosition: yup.string().required('Required'),
    })

    const emptySchema = yup.object({});

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

    useEffect(() => {
        dispatch(
            fetchData({
                branch: branchObject?.id || '',
                department: departmentObject?.id || '',
                q: filterValue,
            })
        )
    }, [dispatch, branchObject, departmentObject, filterValue])


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
        resolver: yupResolver(tempValidation ? emptySchema : schema)
    })

    useEffect(() => {
        const formattedEndDate = moment(endDate)
        const formattedStartDate = moment(startDate)
        const daysDiff = formattedEndDate.diff(formattedStartDate, 'days') + 1;
        setWorkingDaysPeriod(daysDiff)
        setValue('workingDays', daysDiff)
        trigger('workingDays')
    }, [endDate, setValue, startDate, trigger])

    const handleBranchChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setBranchObject(newValue)
        }
    }


    const handleDepartmentChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setDepartmentObject(newValue)
        }
    }

    const handleFormBranchChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setFormBranchObject(newValue)
            setValue('employeeBranch', newValue.id)
            trigger('employeeBranch')
        }
    }


    const handleFormDepartmentChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setFormDepartmentObject(newValue)
            setValue('employeeDepartment', newValue.id)
            trigger('employeeDepartment')
        }
    }



    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)



    const onSubmit = (data: any) => {
        data.employeeBranch = formBranchObject.id
        data.employeeDepartment = formDepartmentObject.id
        data.workingDays = workingDaysPeriod
        if (data.contractDate) {
            data.contractStartDate = data.contractDate[0]
            data.contractEndDate = data.contractDate[1]
        }
        if (data.id) {
            dispatch(editEmployee({ ...data }))
        } else {
            dispatch(addEmployee({ ...data }))
        }
        setBranchObject({ id: 'All', branchName: 'All Branches' })
        setDepartmentObject({ id: 'All', departmentName: 'All Departments' })
        setFormBranchObject(null)
        setFormDepartmentObject(null)
        reset(emptyValues)
        setTempValidation(false)
    }






    const handleOnChangeRange = (dates: any) => {
        const [start, end] = dates
        const formattedEndDate = moment(end)
        const formattedStartDate = moment(start)
        const daysDiff = formattedEndDate.diff(formattedStartDate, 'days') + 1;
        setWorkingDaysPeriod(daysDiff)
        setValue('contractStartDate', String(formattedStartDate))
        trigger('contractStartDate')
        setValue('contractEndDate', String(formattedEndDate))
        trigger('contractEndDate')
        setValue('workingDays', daysDiff)
        trigger('workingDays')
        setContractEnd(end)
        setContractStart(start)
    }



    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={5}>
                <DatePickerWrapper>

                    <Card>
                        <CardHeader title="Add Employee" />
                        <CardContent    >
                            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='employeeCode'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        required
                                                        label='Code'
                                                        type={'number'}
                                                        value={value}
                                                        disabled={store.data ? false : true}
                                                        error={Boolean(errors.employeeCode)}
                                                        onBlur={(e) => {
                                                            onBlur()
                                                            const selectedEmployee: any = store?.data?.filter(({ employeeCode }: any) => employeeCode == e.target.value)[0]
                                                            if (selectedEmployee) {
                                                                setTempValidation(true)
                                                              
                                                                reset(selectedEmployee)
                                                                if(selectedEmployee.employeeTypeName == 'Contract') {
                                                                    const contSD = new Date(selectedEmployee.contractStartDate) || new Date()
                                                                    const contED = new Date(selectedEmployee.contractEndDate) || new Date()
                                                                    setContractStart(contSD)
                                                                    setContractEnd(contED)
                                                                } 
                                                                if(selectedEmployee.employeeTypeName == 'Permanent') {
                                                                    setValue('employmentDate', selectedEmployee.employmentDate)
                                                                } 
                                                                setWorkingDaysPeriod(selectedEmployee?.workingDays)
                                                                setFormBranchObject(branchStore?.data.filter((branch: any) => branch.id == selectedEmployee?.employeeBranch)[0])
                                                                setFormDepartmentObject(departmentStore?.data.filter((department: any) => department.id == selectedEmployee?.employeeDepartment)[0])
                                                                setEmploymentTypeValue(selectedEmployee.employeeTypeName)
                                                               
                                                            } else {
                                                                    setFormBranchObject({ id: '', branchName: '' })
                                                                    setFormDepartmentObject({ id: '', departmentName: '' })
                                                                    reset(emptyValues)
                                                                    setValue('employeeCode', Number(e.target.value))
                                                            }
                                                        }
                                                        }
                                                        onChange={(e) => {
                                                            onChange(e)
                                                        }
                                                        }
                                                        placeholder='Code'
                                                    />
                                                )}
                                            />
                                            {errors.employeeCode && <Alert sx={{ my: 4 }} severity='error'>{errors.employeeCode.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='firstName'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        required
                                                        autoFocus
                                                        label='First'
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(errors.firstName)}
                                                        placeholder='First'
                                                    />
                                                )}
                                            />
                                            {errors.firstName && <Alert sx={{ my: 4 }} severity='error'>{errors.firstName.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='middleName'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        required
                                                        label='Middle'
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChange={(e) => {
                                                            onChange(e)
                                                        }
                                                        }
                                                        placeholder='Middle'
                                                        error={Boolean(errors.middleName)}
                                                    />
                                                )}
                                            />
                                            {errors.middleName && <Alert sx={{ my: 4 }} severity='error'>{errors.middleName.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={4}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='lastName'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        label='Last'
                                                        required
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(errors.lastName)}
                                                        placeholder='Last'
                                                    />
                                                )}
                                            />
                                            {errors.lastName && <Alert sx={{ my: 4 }} severity='error'>{errors.lastName.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='sex'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <>
                                                        <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Sex *</InputLabel>
                                                        <Select
                                                            size={'small'}
                                                            label='Sex *'
                                                            value={value}
                                                            id='demo-simple-select-autoWidth'
                                                            labelId='demo-simple-select-autoWidth-label'
                                                            onBlur={onBlur}
                                                            onChange={onChange}
                                                            error={Boolean(errors.sex)}
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
                                            {errors.sex && <Alert sx={{ my: 4 }} severity='error'>{errors.sex.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='employeeTitle'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <>
                                                        <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Title *</InputLabel>
                                                        <Select
                                                            size={'small'}
                                                            label='Title *'
                                                            value={value}
                                                            id='demo-simple-select-autoWidth'
                                                            labelId='demo-simple-select-autoWidth-label'
                                                            onBlur={onBlur}
                                                            error={Boolean(errors.employeeTitle)}
                                                            onChange={onChange}
                                                        >
                                                            {
                                                                employeeTitleOptions.map(({ id, parameterName }, index) => {
                                                                    return (
                                                                        <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </>

                                                )}
                                            />
                                            {errors.employeeTitle && <Alert sx={{ my: 4 }} severity='error'>{errors.employeeTitle.message}</Alert>}
                                        </FormControl>

                                    </Grid>

                                    <Grid item xs={6} >
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                autoSelect
                                                size={'small'}
                                                value={formBranchObject}
                                                options={branchStore.data}
                                                onChange={handleFormBranchChange}
                                                isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
                                                id='autocomplete-controlled'
                                                getOptionLabel={(option: any) => option.branchName}
                                                renderInput={params => <TextField required error={Boolean(errors.employeeBranch)} {...params} label='Select Branch' />}
                                            />
                                            {errors.employeeBranch && <Alert sx={{ my: 4 }} severity='error'>{errors.employeeBranch.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                autoSelect
                                                size={'small'}
                                                value={formDepartmentObject}
                                                options={departmentStore.data.filter((department: any) => department.branchId == formBranchObject?.id)}
                                                onChange={handleFormDepartmentChange}
                                                isOptionEqualToValue={(option: any, value: any) => option.departmentName == value.departmentName}
                                                id='autocomplete-controlled'
                                                getOptionLabel={(option: any) => option.departmentName}
                                                renderInput={params => <TextField required error={Boolean(errors.employeeDepartment)} {...params} label='Select Department' />}
                                            />
                                            {errors.employeeDepartment && <Alert sx={{ my: 4 }} severity='error'>{errors.employeeDepartment.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='employeeStatus'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <>
                                                        <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Status *</InputLabel>
                                                        <Select
                                                            size={'small'}
                                                            label='Status *'
                                                            value={value}
                                                            id='demo-simple-select-autoWidth'
                                                            labelId='demo-simple-select-autoWidth-label'
                                                            onBlur={onBlur}
                                                            onChange={onChange}
                                                            error={Boolean(errors.employeeStatus)}
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
                                            {errors.employeeStatus && <Alert sx={{ my: 4 }} severity='error'>{errors.employeeStatus.message}</Alert>}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='employeePosition'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <>
                                                        <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Position *</InputLabel>
                                                        <Select
                                                            size={'small'}
                                                            label='Position *'
                                                            value={value}
                                                            placeholder='Position'
                                                            id='demo-simple-select-autoWidth'
                                                            labelId='demo-simple-select-autoWidth-label'
                                                            onBlur={onBlur}
                                                            required
                                                            onChange={onChange}
                                                            error={Boolean(errors.employeePosition)}

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
                                            {errors.employeePosition && <Alert sx={{ my: 4 }} severity='error'>{errors.employeePosition.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='employeeType'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <>
                                                        <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Employee Type *</InputLabel>
                                                        <Select
                                                            size={'small'}
                                                            label='Employee Type *'
                                                            value={value}
                                                            id='demo-simple-select-autoWidth'
                                                            labelId='demo-simple-select-autoWidth-label'
                                                            onBlur={onBlur}
                                                            error={Boolean(errors.employeeType)}
                                                            required
                                                            onChange={(e) => {
                                                                onChange(e)
                                                                setWorkingDaysPeriod("")
                                                                const selectedType: any = employmentTypeOptions.find((obj: any) => obj.id === e.target.value);
                                                                setEmploymentTypeValue(selectedType.parameterName)
                                                            }
                                                            }
                                                        >
                                                            {
                                                                employmentTypeOptions.map(({ id, parameterName }: any, index: any) => {
                                                                    return (
                                                                        <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </>
                                                )}
                                            />
                                            {errors.employeeType && <Alert sx={{ my: 4 }} severity='error'>{errors.employeeType.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            {(employmentTypeValue == 'Permanent') ? (
                                                <>
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
                                                                    const formattedEndDate = moment(endDate)
                                                                    const formattedSelectedDate = moment(e)
                                                                    const daysDiff = formattedEndDate.diff(formattedSelectedDate, 'days') + 1;
                                                                    setWorkingDaysPeriod(daysDiff)
                                                                    setValue('workingDays', daysDiff)
                                                                    trigger('workingDays')
                                                                    formData.workingDays = workingDaysPeriod
                                                                }}
                                                                placeholderText='MM/DD/YYYY'
                                                                customInput={
                                                                    <CustomInput
                                                                        value={value ? new Date(workingDaysPeriod) : null}
                                                                        onChange={onChange}
                                                                        label='Employment Date *'
                                                                        error={Boolean(errors.employmentDate)}
                                                                        aria-describedby='validation-basic-dob'
                                                                    />
                                                                }
                                                            />
                                                        )}
                                                    />
                                                    {errors.employmentDate && <Alert sx={{ my: 4 }} severity='error'>{errors.employmentDate.message}</Alert>}
                                                    {employmentDateError && <Alert sx={{ my: 4 }} severity='error'>{employmentDateError}</Alert>}
                                                </>
                                            ) : (employmentTypeValue == 'Contract') ? (
                                                <>
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
                                                                        label='Contract Dates *'
                                                                        end={contractEnd as Date | number}
                                                                        start={contractStart as Date | number}
                                                                        error={Boolean(errors.contractDate)}
                                                                    />
                                                                }
                                                            />
                                                        )}
                                                    />
                                                    {errors.contractDate && <Alert sx={{ my: 4 }} severity='error'>{errors.contractDate.message}</Alert>}
                                                </>
                                            ) : (
                                                <>
                                                </>
                                            )}
                                        </FormControl>

                                    </Grid>



                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='basicSalary'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        required
                                                        size={'small'}
                                                        autoFocus
                                                        label='Basic Salary'
                                                        value={value}
                                                        type={'number'}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(errors.basicSalary)}
                                                        placeholder='Basic Salary'
                                                    />
                                                )}
                                            />
                                            {errors.basicSalary && <Alert sx={{ my: 4 }} severity='error'>{errors.basicSalary.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='workingDays'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        required
                                                        disabled={true}
                                                        autoFocus
                                                        label='Days'
                                                        type={'number'}
                                                        value={workingDaysPeriod}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(errors.workingDays)}
                                                    />
                                                )}
                                            />
                                            {errors.workingDays && <Alert sx={{ my: 4 }} severity='error'>{errors.workingDays.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='monthlyWorkingHours'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        label='Hours'
                                                        required
                                                        value={value}
                                                        type={'number'}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(errors.monthlyWorkingHours)}
                                                        placeholder='Hours'
                                                    />
                                                )}
                                            />
                                            {errors.monthlyWorkingHours && <Alert sx={{ my: 4 }} severity='error'>{errors.monthlyWorkingHours.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='tinNumber'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        label='TIN'
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(errors.tinNumber)}
                                                        placeholder='TIN'
                                                    />
                                                )}
                                            />
                                            {errors.tinNumber && <Alert sx={{ my: 4 }} severity='error'>{errors.tinNumber.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='employeeBank'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <>
                                                        <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Select Bank Account *</InputLabel>
                                                        <Select
                                                            size={'small'}
                                                            label='Select Bank Account *'
                                                            value={value}
                                                            id='demo-simple-select-autoWidth'
                                                            labelId='demo-simple-select-autoWidth-label'
                                                            onBlur={onBlur}
                                                            onChange={onChange}
                                                            required
                                                            error={Boolean(errors.employeeBank)}
                                                        >
                                                            {
                                                                bankOptions.map(({ id, parameterName }: any, index: any) => {
                                                                    return (
                                                                        <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </>
                                                )}
                                            />
                                            {errors.employeeBank && <Alert sx={{ my: 4 }} severity='error'>{errors.employeeBank.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='employeeBankAccount'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
                                                        autoFocus
                                                        label='Bank Account'
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        required
                                                        error={Boolean(errors.employeeBankAccount)}
                                                        placeholder='Bank Account'
                                                    />
                                                )}
                                            />
                                            {errors.employeeBankAccount && <Alert sx={{ my: 4 }} severity='error'>{errors.employeeBankAccount.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth >
                                            <Controller
                                                name='pensionStatus'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange } }) => (
                                                    <FormControlLabel
                                                        label='Pension'
                                                        control={<Checkbox required color={Boolean(errors.pensionStatus) ? 'error' : 'primary'} checked={Boolean(value)} onChange={onChange} name='controlled' />}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                        {errors.pensionStatus && <Alert sx={{ my: 4 }} severity='error'>{errors.pensionStatus.message}</Alert>}
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Controller
                                                name='pensionNumber'
                                                control={control}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        size={'small'}
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
                                            {errors.pensionNumber && <Alert sx={{ my: 4 }} severity='error'>{errors.pensionNumber.message}</Alert>}
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
                                            <Button color='secondary' fullWidth size='large' onClick={() => {
                                                reset(emptyValues)
                                                setWorkingDaysPeriod("")
                                                setContractStart(null)
                                                setContractEnd(null)
                                                setFormBranchObject({ id: '', branchName: '' })
                                                setFormDepartmentObject({ id: '', departmentName: '' })
                                                setBranch('')
                                            }} type='reset' variant='contained' sx={{ mb: 7 }}>
                                                Reset
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent   >
                    </Card>
                </DatePickerWrapper>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
                <Card>
                    <CardHeader title='Employees' />
                    <Grid item xs={12} sx={{ pl: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TableHeader
                            branches={[...branchStore.data, { id: "All", branchName: 'All Branches' }]}
                            departments={[...departmentStore.data.filter((department: any) => department.branchId == branchObject?.id), { id: "All", departmentName: 'All Departments' }]}
                            handleBranchChange={handleBranchChange}
                            handleDepartmentChange={handleDepartmentChange}
                            departmentObject={departmentObject}
                            branchObject={branchObject}
                            handleFilter={handleFilter}
                            value={filterValue} />
                    </Grid>
                    <CardContent>
                        <EmployeeMasterTable
                            departments={departmentStore.data}
                            branches={branchStore.data}
                            setBranch={setBranch}
                            setDepartment={setDepartment}
                            setDepartmentObject={setFormDepartmentObject}
                            setBranchObject={setFormBranchObject}
                            setEmploymentTypeValue={setEmploymentTypeValue}
                            employmentTypeOptions={employmentTypeOptions}
                            setValue={setValue}
                            setContractStart={setContractStart}
                            setContractEnd={setContractEnd}
                            rows={store.data}
                            reset={reset}
                            formData={formData}
                            setFormData={setFormData}
                            deleteEmployee={deleteEmployee}
                            setWorkingDaysPeriod={setWorkingDaysPeriod}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        </Grid>
    )
}

export default UserList
