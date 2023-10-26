// ** React Imports
import { useState, useEffect, } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import Link from 'next/link'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import { BoxProps } from '@mui/material/Box'

// ** Store  Imports
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'

// ** Actions Imports
import { fetchData } from 'src/store/apps/Reports/PayrollAdvice'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import { utils, writeFile } from 'xlsx';

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import Autocomplete from '@mui/material/Autocomplete'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:not(:last-of-type)': {
        marginBottom: theme.spacing(2)
    }
}))


const emptyValues = {
    branch: '',
    department: ''
}


const schema = yup.object().shape({
   branch: yup.string(),
   department: yup.string()
})



const PayrollSheet = () => {
   
    // ** State
    const [branch, setBranch] = useState<string>('')
    const [department, setDepartment] = useState<string>('')
    const [value] = useState<string>('')
    const [status,] = useState<string>('')
    const [branchObject, setBranchObject] = useState<any>({ id: '', branchName: '' })
    const [departmentObject, setDepartmentObject] = useState<any>({ id: '', departmentName: '' })
    const [filterValue, setFilterValue] = useState<any>('Select')

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payrollAdvice)

    const departmentStore = useSelector((state: RootState) => state.department)
    const branchStore = useSelector((state: RootState) => state.branches)



    useEffect(() => {
        dispatch(
            fetchData({
                branch,
                department,
                q: value,
                currentPlan: ''
            })
        )
    }, [dispatch, branch, department, status, value])


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
    }, [dispatch])

    const generateExcelFile = () => {
        const tableData = [
            ['Code', 'Name', 'Deductions', 'Earnings', 'Net'],
            ...store.data.map(({ employeeCode, employeeName, totalDeductions, totalEarnings, netPay }) => [
                employeeCode,
                employeeName,
                parseFloat(totalDeductions).toFixed(2),
                parseFloat(totalEarnings).toFixed(2),
                parseFloat(netPay).toFixed(2),
            ]),
        ]
        const workbook = utils.book_new();
        const worksheet = utils.aoa_to_sheet(tableData);
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        writeFile(workbook, 'your_file_name.xlsx');
    };




    const handleBranchChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setBranchObject(newValue)
            setBranch(newValue.id)
            setDepartmentObject({ departmentName: '', id: '' })
        }
    }


    const handleDepartmentChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setDepartmentObject(newValue)
            setDepartment(newValue.id)
        }
    }

    const handleFilterChange = (e: any) => {
        const selectedFilter = e.target.value
        setFilterValue(selectedFilter)
        setBranchObject({id: '', branchName: ''})
        setDepartmentObject({id: '', departmentName: ''})
        if (selectedFilter == 'All') {
            setBranch('All')
            setDepartment('All')
        } else {
        }
    }


    const {
        handleSubmit,
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        data.branch = branch
        data.department = department
      
        // dispatch(
        //             fetchData({
        //                 branch,
        //                 department,
        //                 q: value,
        //                 currentPlan: ''
        //             })
        //         )
    }

    return (
        <Grid container spacing={6}>
            <Grid item xl={12} md={12} xs={12}>
                <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader title='Payroll Sheet' />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item sm={2} xs={12}>
                                    <FormControl fullWidth>
                                        <RadioGroup row aria-label='controlled' name='controlled' value={filterValue} onChange={handleFilterChange}>
                                            <FormControlLabel key={0} value={'All'} control={<Radio size={'small'} />} label={'All'} />
                                            <FormControlLabel key={1} value={'Select'} control={<Radio size={'small'} />} label={'Select'} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                {filterValue !== 'All' ? (
                                    <>
                                        <Grid item sm={5} xs={12}>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    autoSelect
                                                    size={'small'}
                                                    value={branchObject}
                                                    options={[...branchStore.data,]}
                                                    onChange={handleBranchChange}
                                                    isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
                                                    id='autocomplete-controlled'
                                                    getOptionLabel={(option: any) => option.branchName}
                                                    renderInput={params => <TextField {...params} label='Select Branch' />}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item sm={5} xs={12}>
                                            <FormControl fullWidth>
                                                <Autocomplete
                                                    autoSelect
                                                    size={'small'}
                                                    value={departmentObject}
                                                    options={[...departmentStore.data.filter((dep: any) => dep.branchId == branch || branchObject.branchName == 'All' || dep.departmentName == 'All'), { id: 'all', departmentName: 'All' }]}
                                                    onChange={handleDepartmentChange}
                                                    isOptionEqualToValue={(option: any, value: any) => option.departmentName == value.departmentName}
                                                    id='autocomplete-controlled'
                                                    getOptionLabel={(option: any) => option.departmentName}
                                                    renderInput={params => <TextField {...params} label='Select Department' />}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item sm={12} xs={12}></Grid>
                                    </>
                                )}

                                <Grid item sm={4} xs={12}>
                                    <Button
                                        size='small'
                                        fullWidth
                                        color='primary'
                                        variant='outlined'
                                        onClick={generateExcelFile}
                                    >
                                        Preview
                                    </Button>
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Button
                                        fullWidth
                                        size={'small'}
                                        target='_blank'
                                        component={Link}
                                        color='primary'
                                        variant='outlined'
                                        href={`/apps/process/payroll-process/print?branch=${branch}&department=${department}`}
                                    >
                                        Print
                                    </Button>
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Button
                                        size='small'
                                        fullWidth
                                        color='primary'
                                        variant='outlined'
                                        onClick={generateExcelFile}
                                    >
                                        Download
                                    </Button>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </form>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Code</TableCell>
                                            <TableCell>A/C No.</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Net</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            store.data.map(({ employeeCode, employeeName, netPay }, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>{`${employeeCode}`}</TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell>{`${employeeName}`}</TableCell>
                                                        <TableCell>{`${Number(netPay).toFixed(2)}`}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12} sm={4} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>

                                    </Grid>
                                    <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
                                        <Divider />
                                        <CalcWrapper>
                                            <Typography variant='body2'>Total:</Typography>
                                            <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                                {Number(store.data.reduce((sum, { netPay }) => sum + netPay, 0)).toFixed(2)}
                                            </Typography>
                                        </CalcWrapper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default PayrollSheet