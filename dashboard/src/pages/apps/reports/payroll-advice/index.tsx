// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import Link from 'next/link'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


import Button from '@mui/material/Button'



// ** Actions Imports
import { fetchData } from 'src/store/apps/Reports/PayrollAdvice'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'


// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { PayrollAdviceType } from 'src/types/apps/Reports/payrollAdviceType'


interface CellType {
    row: PayrollAdviceType
}



const UserList = () => {
    // ** State
    const [branch, setBranch] = useState<string>('')
    const [department, setDepartment] = useState<string>('')
    const [value] = useState<string>('')
    const [status,] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)

    const columns = [
        {
            flex: 0.2,
            minWidth: 230,
            field: 'employeeName',
            headerName: 'Employee Name',
            renderCell: ({ row }: CellType) => {
                const { employeeName } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            noWrap
                            component='a'
                            variant='body2'
                            sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                        >
                            {employeeName}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            field: 'earnings',
            headerName: 'Earnings',
            renderCell: ({ row }: CellType) => {
                const { totalEarnings } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            noWrap
                            component='a'
                            variant='body2'
                            sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                        >
                            {totalEarnings}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            field: 'deductions',
            headerName: 'Deductions',
            renderCell: ({ row }: CellType) => {
                const { totalDeductions } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            noWrap
                            component='a'
                            variant='body2'
                            sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                        >
                            {totalDeductions}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            field: 'netPay',
            headerName: 'Net Pay',
            renderCell: ({ row }: CellType) => {
                const { netPay } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            noWrap
                            component='a'
                            variant='body2'
                            sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                        >
                            {netPay}
                        </Typography>
                    </Box>
                )
            }
        }
    ]


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



    const handleBranchChange = useCallback((e: SelectChangeEvent) => {
        setBranch(e.target.value)
    }, [])

    const handleDepartmentChange = useCallback((e: SelectChangeEvent) => {
        setDepartment(e.target.value)
    }, [])


    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Payroll Advice' />
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={4} xs={12}>
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
                                        [{id: 'All', branchName: 'All'}, ...branchStore.data].map(({ id, branchName }, index) => {
                                                return (
                                                    <MenuItem key={index} value={id}>{`${branchName}`}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item sm={4} xs={12}>
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
                                             [{id: 'All', departmentName: 'All'}, ...departmentStore.data].map(({ id, departmentName }, index) => {
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
                    <Grid item xs={12}>
                        <Card>
                            <DataGrid
                                autoHeight
                                rows={store.data}
                                columns={columns}
                                checkboxSelection
                                pageSize={pageSize}
                                disableSelectionOnClick
                                rowsPerPageOptions={[10, 25, 50]}
                                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={3} xs={12}>
                            <FormControl fullWidth>
                            <Button sx={{ mb: 2 }} component={Link} variant='contained' href='/apps/reports/payroll-advice/preview/4987'>
                                Create Report
                            </Button>
                            </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserList
