// ** React Imports
import { useState, useEffect, MouseEvent } from 'react'

// ** Next Import
import Link from 'next/link'

import Autocomplete from '@mui/material/Autocomplete'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
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
import { PayTransactionType } from 'src/types/apps/Tasks/payTransactionTypes'

import * as yup from 'yup'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { addPayTransaction, editPayTransaction } from 'src/store/apps/Tasks/PayTransaction'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


interface CellType {
    row: PayTransactionType
}


const emptyValues = {
    id: '',
    employeeId: '',
    transactionId: '',
    transactionAmount: ''
}


const schema = yup.object().shape({
    employeeId: yup.string(),
    transactionId: yup.string(),
    transactionAmount: yup.string()

})

// ** Styled component for the link inside menu
const MenuItemLink = styled('a')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    padding: theme.spacing(1.5, 4),
    color: theme.palette.text.primary
}))

const UserList = () => {
    // ** State
    const [employee, setEmployee] = useState<string>('')
    const [employeeObject, setEmployeeObject] = useState<any>(null)
    const [transaction, setTransaction] = useState<string>('')
    const [transactionObject, setTransactionObject] = useState<any>(null)
    const [value] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)

    const [formData, setFormData] = useState({
        id: '',
        employeeId: employee,
        transactionId: transaction,
        transactionAmount: ''
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

    const RowOptions = ({
        id,
        transactionId,
        transactionAmount
    }: any) => {
        // ** Hooks
        const dispatch = useDispatch<AppDispatch>()

        // ** State
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

        const rowOptionsOpen = Boolean(anchorEl)

        const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget)
        }
        const handleRowOptionsClose = () => {
            setAnchorEl(null)
        }

        const handleEdit = () => {
            setEmployee(employee)
            setTransaction(transactionId)
            reset(
                {
                    id,
                    employeeId: employee,
                    transactionId,
                    transactionAmount,
                }
            )
        }


        useEffect(() => {
            if (formData) {
                setFormData(formData);
            }
        }, []);

        const handleDelete = () => {
            dispatch(deletePayTransaction(id))
            handleRowOptionsClose()
        }

        return (
            <>
                <IconButton size='small' onClick={handleRowOptionsClick}>
                    {/* <DotsVertical /> */}
                    Options
                </IconButton>
                <Menu
                    keepMounted
                    anchorEl={anchorEl}
                    open={rowOptionsOpen}
                    onClose={handleRowOptionsClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    PaperProps={{ style: { minWidth: '8rem' } }}
                >
                    <MenuItem sx={{ p: 0 }}>
                        <Link href={`/apps/settings/user-management/view/${id}`} passHref>
                            <MenuItemLink>
                                {/* <EyeOutline fontSize='small' sx={{ mr: 2 }} /> */}
                                View
                            </MenuItemLink>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleEdit}>
                        {/* <PencilOutline fontSize='small' sx={{ mr: 2 }} /> */}
                        Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        {/* <DeleteOutline fontSize='small' sx={{ mr: 2 }} /> */}
                        Delete
                    </MenuItem>
                </Menu>
            </>
        )
    }

    const columns = [
        {
            flex: 0.2,
            minWidth: 250,
            field: 'transactionName',
            headerName: ' Name',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography noWrap variant='body2'>
                        {row.transactionName}
                    </Typography>
                )
            }
        },
          {
            flex: 0.15,
            field: 'transactionQuantity',
            minWidth: 150,
            headerName: 'Quantity',
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                        {(row.transactionTypeName === "Deduction Quantity" || row.transactionTypeName === "Earning Quantity") ? parseFloat(row.transactionAmount).toFixed(2)  : ''}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            field: 'transactionAmount',
            minWidth: 150,
            headerName: 'Amount',
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {(row.transactionTypeName === "Deduction Amount" || row.transactionTypeName === "Earning Amount") ? parseFloat(row.transactionAmount).toFixed(2)  : ''}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 90,
            sortable: false,
            field: 'actions',
            headerName: 'Actions',
            renderCell: ({ row }: CellType) => (
                <RowOptions
                    id={row.id}
                    employeeId={row.employeeId}
                    transactionId={row.transactionId}
                    transactionAmount={row.transactionAmount}
                />)
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payTransaction)

    const employeeStore = useSelector((state: RootState) => state.employee)
    const deductionStore = store.data.filter(({ transactionTypeName, transactionAmount }: any) => (transactionTypeName === "Deduction Quantity" || transactionTypeName === "Deduction Amount") && Number(transactionAmount))
    const earningStore = store.data.filter(({ transactionTypeName, transactionAmount }: any) => (transactionTypeName === "Earning Quantity" || transactionTypeName === "Earning Amount") && Number(transactionAmount))
    const transactionDefinitionStore = useSelector((state: RootState) => state.transactionDefinition)

    const handleTransactionValue = (transactionValue: any) => {
        const selectedTransactionId = transactionValue
        const existingObject: any = store.data.find(obj => (obj["transactionId"] === selectedTransactionId))
        if (existingObject) {
            reset(
                {
                    id: existingObject.id,
                    employeeId: employee,
                    transactionId: selectedTransactionId,
                    transactionAmount: existingObject.transactionAmount
                }
            )
        } else {
            reset({
                transactionAmount: ''
            })
        }
       
        setTransaction(selectedTransactionId)
    }


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

    const clearAllFields = () => {
        setEmployeeObject({id: '', firstName: '', employeeCode: ''})
        setTransactionObject({id: '', transactionName: ''})
        setEmployee('')
        setTransaction('')
        reset(emptyValues)
    }

    const handleEmployeeChange = (e: any, newValue: any) => {
        if(newValue?.id) {
            setEmployeeObject(newValue)
            setEmployee(newValue.id)
            setTransactionObject({id: '', transactionName: ''})
            reset({transactionAmount: ''})
        }
      }

        const handleTransactionChange = (e: any, newValue: any) => {
        if(newValue?.id) {
            setTransactionObject(newValue)
            handleTransactionValue(newValue.id)
        }
      }

    const onSubmit = (data: any) => {
        data.employeeId = employee
        data.transactionId = transaction
        if (data.id) {
            dispatch(editPayTransaction({ ...data }))
        } else {
            dispatch(addPayTransaction({ ...data }))
        }
        setTransaction('')
        reset({transactionAmount: ''})
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>

                    <Card>
                        <CardHeader title='Pay Transaction'  />
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
                                <Grid item xs={3}>
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
                                <Grid item xs={4}>
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <Controller
                                            name='transactionAmount'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                size={'small'}
                                                    autoFocus
                                                    label='Transaction Amount'
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.transactionAmount)}
                                                    placeholder='Enter Transaction Amount'
                                                />
                                            )}
                                        />
                                        {errors.transactionAmount && <FormHelperText sx={{ color: 'error.main' }}>{errors.transactionAmount.message}</FormHelperText>}
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
                        </CardContent>
                    </Card>
                </form>

            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <Card>
                    <CardHeader title='Earnings' titleTypographyProps={{ variant: 'body2' }}  />
                    <CardContent>
                        <Grid item xs={12}>
                            <DataGrid
                                autoHeight
                                rows={earningStore}
                                columns={columns}
                                pageSize={pageSize}
                                disableSelectionOnClick
                                rowsPerPageOptions={[10, 25, 50]}
                                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
                <Card>
                    <CardHeader title='Deductions' titleTypographyProps={{ variant: 'body2' }} />
                    <CardContent>
                        <Grid item xs={12}>
                            <DataGrid
                                autoHeight
                                rows={deductionStore}
                                columns={columns}
                                pageSize={pageSize}
                                disableSelectionOnClick
                                rowsPerPageOptions={[10, 25, 50]}
                                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserList
