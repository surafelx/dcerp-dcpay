// ** React Imports
import { useState, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'

import TextField from '@mui/material/TextField'

import Autocomplete from '@mui/material/Autocomplete'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


import Button from '@mui/material/Button'
import { utils, writeFile } from 'xlsx';

// ** Actions Imports
import { fetchData } from 'src/store/apps/Reports/PayrollDisplay'
import { fetchData as fetchEmployee } from 'src/store/apps/File/EmployeeMaster'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { PayrollDisplayType } from 'src/types/apps/Reports/payrollDisplayType'

interface CellType {
    row: PayrollDisplayType
}



const UserList = () => {
    // ** State
    const [employee, setEmployee] = useState<string>('')
    const [employeeObject, setEmployeeObject] = useState<any>(null)
    const [value] = useState<string>('')
    const [status,] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)

    const columns = [
        {
            flex: 0.2,
            minWidth: 230,
            field: 'transactionName',
            headerName: 'Transaction',
            renderCell: ({ row }: CellType) => {
                const { transactionName } = row

                return (

                    <div>
                        {transactionName}
                    </div>
                )
            }
        },
        {
            flex: 0.15,
            field: 'transactionQuantity',
            minWidth: 150,
            headerAlign: 'right',
            headerName: 'Quantity',
            renderCell: ({ row }: CellType) => {
                return (
                    <div style={{ width: '100%' }}>
                        <div style={{ 'textAlign': 'right' }}>
                            {(row.transactionTypeName === "Deduction Quantity" || row.transactionTypeName === "Earning Quantity") ? parseFloat(row.transactionAmount).toFixed(2) : ''}
                        </div>
                    </div>
                )
            }
        },
        {
            flex: 0.15,
            field: 'transactionAmount',
            minWidth: 150,
            headerAlign: 'right',
            headerName: 'Amount',
            renderCell: ({ row }: CellType) => {
                return (
                    <div style={{ width: '100%' }}>
                        <div style={{ 'textAlign': 'right' }}>
                            {((row.transactionTypeName === "Deduction Amount" || row.transactionTypeName === "Earning Amount")) ? parseFloat(row.transactionAmount).toFixed(2) : ''}
                        </div>
                    </div>
                )
            }
        },
    ]


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

        const workbook = utils.book_new();
        const worksheet = utils.aoa_to_sheet(tableData);

        utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        writeFile(workbook, 'your_file_name.xlsx');
    };

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payrollDisplay)
    const employeeStore = useSelector((state: RootState) => state.employee)
    const deductionStore = store.data.filter(({ transactionTypeName, transactionAmount }) => ((transactionTypeName === "Deduction Quantity" || transactionTypeName === "Deduction Amount") && parseFloat(transactionAmount) != 0))
    const earningStore = store.data.filter(({ transactionTypeName, transactionAmount }) => ((transactionTypeName === "Earning Quantity" || transactionTypeName === "Earning Amount") && parseFloat(transactionAmount) != 0))
    const deductionAmounts = deductionStore.filter((transaction: any) => transaction.transactionTypeName == 'Deduction Amount')
    const totalDeductions = deductionAmounts.reduce((sum, transaction: any) => { return (sum + parseFloat(transaction.transactionAmount)) }, 0)
    const earningAmounts = earningStore.filter((transaction: any) => transaction.transactionTypeName == 'Earning Amount')
    const totalEarnings = earningAmounts.reduce((sum, transaction: any) => { return (sum + parseFloat(transaction.transactionAmount)) }, 0)
    const grossTaxable: any = store.data.filter(({ transactionName }: any) => (transactionName === "Gross Taxable Salary"))
    
    useEffect(() => {
        dispatch(
            fetchData({
                employee,
                q: value,
                currentPlan: ''
            })
        )
        dispatch(
            fetchEmployee({
                q: ''
            })
        )
    }, [dispatch, employee, status, value])


    const handleEmployeeChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setEmployeeObject(newValue)
            setEmployee(newValue.id)
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Payroll Display' />
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
                            <Grid item xs={4}>
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
                            <Grid item xs={6}></Grid>
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
                                <Button
                                    size='small'
                                    fullWidth
                                    color='primary'
                                    variant='outlined'
                                    onClick={generateExcelFile}
                                >
                                    Print
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
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
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={6}>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title='Earnings' />
                            <DataGrid
                                rowHeight={30}
                                autoHeight
                                rows={earningStore}

                                // @ts-ignore
                                columns={columns}
                                pageSize={pageSize}
                                rowsPerPageOptions={[10, 25, 50]}
                                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title='Deductions' />
                            <DataGrid
                                rowHeight={30}
                                autoHeight
                                rows={deductionStore}

                                // @ts-ignore
                                columns={columns}
                                pageSize={pageSize}
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
                                <FormControl fullWidth sx={{ mb: 4 }}>
                                    <TextField
                                        dir={'rtl'}
                                        disabled={true}
                                        label='Gross Taxable'
                                        value={`${Number(grossTaxable[0]?.transactionAmount).toFixed(2)}`}
                                        placeholder='Gross Taxable'
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item sm={3} xs={12}>
                                <FormControl fullWidth sx={{ mb: 4 }}>
                                    <TextField
                                        dir={'rtl'}
                                        disabled={true}
                                        label='Total Earning'
                                        value={`${Number(totalEarnings).toFixed(2)}`}
                                        placeholder='Total Earning'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                                <FormControl fullWidth sx={{ mb: 4 }}>
                                    <TextField
                                        dir={'rtl'}
                                        disabled={true}
                                        label='Total Deductions'
                                        value={`${Number(totalDeductions).toFixed(2)}`}
                                        placeholder='Total Deductions'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                                <FormControl fullWidth sx={{ mb: 4 }}>
                                    <TextField
                                        dir={'rtl'}
                                        disabled={true}
                                        label='Net Pay'
                                        value={`${Number(totalEarnings - totalDeductions).toFixed(2)}`}
                                        placeholder='Net Pay'
                                    />
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
