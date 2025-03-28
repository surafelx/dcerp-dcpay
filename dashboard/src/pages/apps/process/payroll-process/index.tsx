// ** React Imports
import { Fragment, useState, useEffect } from 'react'



// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'

// import LinearProgress from '@mui/material/LinearProgress'

// ** Store  Imports
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'

// ** Actions Imports
import { fetchData } from 'src/store/apps/Process/PayrollProcess'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'



const emptyValues = {
    branch: 'All',
    department: 'All'
}


const schema = yup.object().shape({
    branch: yup.string(),
    department: yup.string()
})



import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'


// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'



const PayrollAdvice = () => {


    // ** State
    const [branch, setBranch] = useState<string>('')
    const [branchObject, setBranchObject] = useState<any>({ id: '', branchName: '' })
    const [department, setDepartment] = useState<string>('')
    const [departmentObject, setDepartmentObject] = useState<any>({ id: '', departmentName: '' })
    const [open, setOpen] = useState<boolean>(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [value] = useState<string>('')


    const dispatch = useDispatch<AppDispatch>()
    const storeProcess = useSelector((state: RootState) => state.payrollProcess.isLoading)

    const departmentStore = useSelector((state: RootState) => state.department)
    const branchStore = useSelector((state: RootState) => state.branches)

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


    const DialogAlert = () => {
        // ** State


        return (
            <Fragment>
                <Dialog
                    open={storeProcess ? false : open}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='alert-dialog-title'>Processing Complete</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            Payroll processing is completed. You may go to the Reports page to check the data.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='dialog-actions-dense'>
                        <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }


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
        dispatch(
            fetchData({
                branch,
                department,
                q: value,
                currentPlan: ''
            })
        )
        if (!storeProcess) {
            handleClickOpen()
        }

    }

    return (
        <Grid container spacing={3}>
            <Grid item xl={12} md={12} xs={12}>
                <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader title='Payroll Process' />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={branchObject}
                                            options={[...branchStore.data, { id: "All", branchName: 'All Branches' }]}
                                            onChange={handleBranchChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.branchName}
                                            renderInput={params => <TextField {...params} label='Select Branch' />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={departmentObject}
                                            options={[...departmentStore.data.filter((dep: any) => dep.branchId == branch || branchObject.branchName == 'All' || dep.departmentName == 'All'), { id: 'All', departmentName: 'All Departments' }]}
                                            onChange={handleDepartmentChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.departmentName == value.departmentName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.departmentName}
                                            renderInput={params => <TextField {...params} label='Select Department' />}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Button
                                        color='primary'
                                        fullWidth size='small'
                                        type='submit'
                                        disabled={storeProcess}
                                        variant='contained'
                                    >
                                        {storeProcess ? ("Loading") : ("Process")}

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
                                        Preview
                                    </Button>
                                </Grid>
                                <Grid item sm={3} xs={12}>
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
                                <Grid item sm={3} xs={12}>
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
                        <DialogAlert />
                    </Card>
                </form>
            </Grid>
            {/* <Grid item xs={12}>
                <Card>
                    <TableContainer>
                        <Table  sx={{ minWidth: 650 }} size='small' >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>
                                        <div style={{ width: '100%' }}>
                                            <div style={{ 'textAlign': 'right' }}>
                                                Deductions
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ width: '100%' }}>
                                            <div style={{ 'textAlign': 'right' }}>
                                                Earnings
                                            </div>
                                        </div>

                                    </TableCell>
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
                                    store.data.map(({ employeeCode, employeeName, transactions, }: any, index) => {
                                        const grossSalary = transactions?.filter(({ transaction_code }: any) => transaction_code == '52')[0]?.transaction_amount
                                        const netPay = transactions?.filter(({ transaction_code }: any) => transaction_code == '99')[0]?.transaction_amount
                                        const totalDeductions = grossSalary - netPay

                                        return (
                                            <TableRow key={index} >
                                                <TableCell>{`${employeeCode}`}</TableCell>
                                                <TableCell>{`${employeeName}`}</TableCell>
                                                <TableCell>
                                                    <div style={{ width: '100%' }}>
                                                        <div style={{ 'textAlign': 'right' }}>
                                                            {`${Number(totalDeductions).toFixed(2)}`}
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div style={{ width: '100%' }}>
                                                        <div style={{ 'textAlign': 'right' }}>
                                                            {`${Number(grossSalary).toFixed(2)}`}
                                                        </div>
                                                    </div>
                                                </TableCell>
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
            </Grid> */}
        </Grid>

    )
}

export default PayrollAdvice