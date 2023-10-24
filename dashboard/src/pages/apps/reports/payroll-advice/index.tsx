// ** React Imports
import { useState, useEffect, useCallback } from 'react'



// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
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



const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:not(:last-of-type)': {
        marginBottom: theme.spacing(2)
    }
}))



import {utils, writeFile} from 'xlsx';


const PayrollAdvice = () => {
    // ** State
    const [branch, setBranch] = useState<string>('')
    const [department, setDepartment] = useState<string>('')
    const [value] = useState<string>('')
    const [status,] = useState<string>('')

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

    // Your data should be structured as an array of arrays


    const tableData = [
        ['Code', 'Name', 'Deductions', 'Earnings', 'Net'], // Table headers
        ...store.data.map(({ employeeCode, employeeName, totalDeductions, totalEarnings, netPay }) => [
          employeeCode,
          employeeName,
          parseFloat(totalDeductions).toFixed(2),
          parseFloat(totalEarnings).toFixed(2),
          parseFloat(netPay).toFixed(2),
        ]),
      ]
      console.log(store, tableData)
    const workbook = utils.book_new();
    const worksheet = utils.aoa_to_sheet(tableData);

    utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    writeFile(workbook, 'your_file_name.xlsx');
  };

    const handleBranchChange = useCallback((e: SelectChangeEvent) => {
        setBranch(e.target.value)
    }, [])

    const handleDepartmentChange = useCallback((e: SelectChangeEvent) => {
        setDepartment(e.target.value)
    }, [])


    return (
        <Grid container spacing={6}>
            <Grid item xl={9} md={8} xs={12}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title='Payroll Advice' />
                            <CardContent>
                                <Grid container spacing={6}>
                                    <Grid item sm={6} xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id='branch-select'>Select Branch</InputLabel>
                                            <Select
                                                fullWidth
                                                value={branch}
                                                id='select-branch'
                                                label='Select Branch'
                                                labelId='branch-select'
                                                onChange={handleBranchChange}
                                                inputProps={{ placeholder: 'Select Branch' }}
                                            >
                                                {
                                                    [{ id: 'All', branchName: 'All' }, ...branchStore.data].map(({ id, branchName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{`${branchName}`}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id='department-select'>Select Department</InputLabel>
                                            <Select
                                                fullWidth
                                                value={department}
                                                id='select-department'
                                                label='Select Department'
                                                labelId='department-select'
                                                onChange={handleDepartmentChange}
                                                inputProps={{ placeholder: 'Select Department' }}
                                            >
                                                {
                                                    [{ id: 'All', departmentName: 'All' }, ...departmentStore.data].map(({ id, departmentName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{`${departmentName}`}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>p
                                <Card>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Code</TableCell>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>Deductions</TableCell>
                                                    <TableCell>Earnings</TableCell>
                                                    <TableCell>Net</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    store.data.map(({ employeeCode, employeeName, totalDeductions, totalEarnings, netPay }, index) => {
                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell>{`${employeeCode}`}</TableCell>
                                                                <TableCell>{`${employeeName}`}</TableCell>
                                                                <TableCell>{`${Number(totalDeductions).toFixed(2)}`}</TableCell>
                                                                <TableCell>{`${Number(totalEarnings).toFixed(2)}`}</TableCell>
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
            </Grid>
            <Grid item xl={3} md={4} xs={12}>
                <Card>
                    <CardContent>
                        <Grid mb={4}>
                        <Button
                            fullWidth
                            target='_blank'
                            component={Link}
                            color='primary'
                            variant='outlined'
                            href={`/apps/reports/payroll-advice/print?branch=${branch}&department=${department}`}
                        >
                            Print
                        </Button>
                        </Grid>
                       
                        <Button
                            fullWidth
                            color='primary'
                            variant='outlined'
                            onClick={generateExcelFile}
                        >
                            Download
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    )
}

export default PayrollAdvice