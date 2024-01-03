// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import Link from 'next/link'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'



// import LinearProgress from '@mui/material/LinearProgress'

// ** Store  Imports
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'

// ** Actions Imports
import { fetchData } from 'src/store/apps/Reports/PayrollSheet'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'


const emptyValues = {
    branch: '',
    department: '',
    bank: ''
}


const schema = yup.object().shape({
    branch: yup.string().required('Required'),
    department: yup.string().required('Required'),
    bank: yup.string().required('Required')
})



import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const PayrollAdvice = () => {


    // ** State
    const [branch, setBranch] = useState<string>('')
    const [branchObject, setBranchObject] = useState<any>({ id: 'All', branchName: 'All Branches' })
    const [department, setDepartment] = useState<string>('')
    const [departmentObject, setDepartmentObject] = useState<any>({ id: 'All', departmentName: 'All Departments' })
    const [bankObject, setBankObject] = useState<any>({ id: 'All', parameterName: 'All' })
    const [bank, setBank] = useState<string>('')
    const [value] = useState<string>('')


    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payrollSheet)

    const departmentStore = useSelector((state: RootState) => state.department)
    const branchStore = useSelector((state: RootState) => state.branches)

    const subParameters = useSelector((state: RootState) => state.subParameterDefinition)
    const mainParameters = useSelector((state: RootState) => state.mainParameterDefinition)


    useEffect(() => {
        dispatch(
            fetchBranch({
                q: ''
            })
        )
        dispatch(
            fetchDepartment({
                q: ''
            })
        )
        dispatch(
            fetchMainParameterDefinitions({
                q: ''
            })
        )
        dispatch(
            fetchSubParameterDefinition({
                q: ''
            })
        )
        dispatch(
            fetchData({
                branch,
                department,
                bank,
                q: value,
                report: 'sheet'
            })
        )
    }, [dispatch, branch, department, bank, value])

    const filterSubParametersByName = (parentParamName: any) => {
        const parent: any = mainParameters.allData.find((parent: any) => parent.parameterName === parentParamName);
        if (!parent) {
            return [];
        }

        const filteredChild = subParameters.allData.filter((child: any) => child.parameterId === parent.id);

        return filteredChild
    }



    const bankOptions: any = filterSubParametersByName('Bank')

    // const generateExcelFile = () => {
    //     const tableData = [
    //         ['Code', 'Name', 'Deductions', 'Earnings', 'Net'],
    //         ...store.data.map(({ employeeCode, employeeName, totalDeductions, totalEarnings, netPay }) => [
    //             employeeCode,
    //             employeeName,
    //             parseFloat(totalDeductions).toFixed(2),
    //             parseFloat(totalEarnings).toFixed(2),
    //             parseFloat(netPay).toFixed(2),
    //         ]),
    //     ]
    //     const workbook = utils.book_new();
    //     const worksheet = utils.aoa_to_sheet(tableData);
    //     utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //     writeFile(workbook, 'your_file_name.xlsx');
    // };


    const {
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        trigger,
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })


    const handleBranchChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setBranchObject(newValue)
            setBranch(newValue.id)
            setValue('branch', newValue.id)
            trigger('branch')
            setDepartmentObject({ departmentName: '', id: '' })
            setDepartment('')
            setValue('department', '')
        }
    }


    const handleDepartmentChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setDepartmentObject(newValue)
            setDepartment(newValue.id)
            setValue('department', newValue.id)
            trigger('department')
        }
    }

    const handleBankChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setBankObject(newValue)
            setBank(newValue.id)
            setValue('bank', newValue.id)
            trigger('bank')
        }
    }



    const onSubmit = (data: any) => {
        data.branch = branch
        data.department = department
        dispatch(
            fetchData({
                branch,
                department,
                bank,
                q: value,
                currentPlan: ''
            })
        )
    }


    const clearAllFields = () => {
        reset(emptyValues)
        setBranchObject({ id: '', branchName: '' })
        setDepartmentObject({ id: '', departmentName: '' })
        setBankObject({ id: '', parameterName: '' })
        setBranch('')
        setDepartment('')
        setBank('')
        setValue('branch', '')
        setValue('department', '')
        setValue('bank', '')
    }

    return (
        <Grid container spacing={3}>
            <Grid item xl={12} md={12} xs={12}>
                <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader title='Payroll Sheet' />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={branchObject}
                                            options={[{ id: "All", branchName: 'All Branches' }, ...branchStore.data,]}
                                            onChange={handleBranchChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.branchName}
                                            renderInput={params => <TextField error={Boolean(errors.branch)}  {...params} label='Select Branch' />}
                                        />
                                        {errors.branch && <Alert sx={{ my: 4 }} severity='error'>{errors.branch.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={departmentObject}
                                            options={[{ id: 'All', departmentName: 'All Departments' }, ...departmentStore.data.filter((dep: any) => dep.branchId == branch || branchObject.branchName == 'All' || dep.departmentName == 'All'),]}
                                            onChange={handleDepartmentChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.departmentName == value.departmentName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.departmentName}
                                            renderInput={params => <TextField error={Boolean(errors.department)} {...params} label='Select Department' />}
                                        />
                                        {errors.department && <Alert sx={{ my: 4 }} severity='error'>{errors.department.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={bankObject}
                                            options={[{ id: 'All', parameterName: 'All' }, ...bankOptions]}
                                            onChange={handleBankChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.parameterName == value.parameterName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.parameterName}
                                            renderInput={params => <TextField error={Boolean(errors.bank)}  {...params} label='Select Bank' />}
                                        />
                                        {errors.bank && <Alert sx={{ my: 4 }} severity='error'>{errors.bank.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Button
                                        color='primary'
                                        fullWidth size='small'
                                        type='submit'
                                        variant='contained'
                                    >
                                        Preview
                                    </Button>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Button color='secondary' fullWidth size='small' onClick={() => clearAllFields()} type='reset' variant='contained'>
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Button
                                        fullWidth
                                        size={'small'}
                                        target='_blank'
                                        disabled={store.data.length > 0 && (branch && department && bank) ? false : true}
                                        component={Link}
                                        color='primary'
                                        variant='outlined'
                                        href={`/apps/reports/payroll-sheet/print?branchn=${branchObject.branchName}&departmentn=${departmentObject.departmentName}&bankn=${bankObject.parameterName}&branch=${branch}&department=${department}&bank=${bank}`}
                                    >
                                        Print
                                    </Button>
                                </Grid>

                                {/* <Grid item sm={3} xs={12}>
                                    <Button
                                        size='small'
                                        fullWidth
                                        color='primary'
                                        variant='outlined'
                                        onClick={generateExcelFile}
                                    >
                                        Download
                                    </Button>
                                </Grid> */}
                            </Grid>

                        </CardContent>
                    </Card>
                </form>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size='small' >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>A/C No.</TableCell>
                                    <TableCell>
                                        <div style={{ width: '100%' }}>
                                            <div style={{ 'textAlign': 'right' }}>
                                                Net Pay
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow> 
                            </TableHead>
                            <TableBody>
                                {
                                    store.data.filter(({ employeeStatusName }) => employeeStatusName == 'Active').map(({ employeeCode, employeeName, employeeAccountNumber, transactions, }: any, index) => {
                                        const netPay = transactions?.filter(({ transaction_code }: any) => transaction_code == '99')[0]?.transaction_amount

                                        return (
                                            <TableRow key={index} >
                                                <TableCell>{`${employeeCode}`}</TableCell>
                                                <TableCell>{`${employeeName}`}</TableCell>
                                                <TableCell>{`${employeeAccountNumber}`}</TableCell>
                                                <TableCell>
                                                    <div style={{ width: '100%' }}>
                                                        <div style={{ 'textAlign': 'right' }}>
                                                            {`${Number(netPay).toFixed(2)}`}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Grid>
        </Grid>

    )
}

export default PayrollAdvice


