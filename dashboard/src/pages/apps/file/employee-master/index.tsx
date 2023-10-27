// ** React Imports
import { useState, useEffect, MouseEvent } from 'react'

// ** Next Import
import Link from 'next/link'


import moment from 'moment'


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
import CardContent from '@mui/material/CardContent'


// ** Icons Imports
// import Laptop from 'mdi-material-ui/Laptop'
// import ChartDonut from 'mdi-material-ui/ChartDonut'
// import CogOutline from 'mdi-material-ui/CogOutline'
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import PencilOutline from 'mdi-material-ui/PencilOutline'
// import DeleteOutline from 'mdi-material-ui/DeleteOutline'
// import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchData, deleteEmployee } from 'src/store/apps/File/EmployeeMaster'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { EmployeesType } from 'src/types/apps/File/employeesTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/dc-pay/apps/File/EmployeeMaster/TableHeader'

import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'


import AddEmployee from 'src/views/dc-pay/forms/File/EmployeeMaster/AddEmployee'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface CellType {
    row: EmployeesType
}

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
    const [value, setValue] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
    const [branch, setBranch] = useState<string>('All')
    const [branchObject, setBranchObject] = useState<any>({ id: 'All', branchName: 'All Branches' })
    const [department, setDepartment] = useState<string>('All')
    const [departmentObject, setDepartmentObject] = useState<any>({ id: 'All', departmentName: 'All Departments' })

    const handleFilter = (val: string) => {
        setValue(val)
    }

    const [formData, setFormData] = useState({
        id: '',
        employeeCode: '',
        employeeTitle: '',
        contractStartDate: '',
        contractEndDate: '',
        employmentDate: '',
        firstName: '',
        middleName: '',
        lastName: '',
        sex: '',
        employeeStatus: '',
        employeeType: '',
        employeeTypeName: '',
        monthlyWorkingHours: '',
        basicSalary: '',
        pensionNumber: '',
        pensionStatus: '',
        tinNumber: '',
        workingDays: '',
        employeeBank: '',
        employeeBankAccount: '',
        employeeBranch: '',
        employeeDepartment: '',
        employeePosition: '',
    });


    const RowOptions = ({ id, employeeCode,
        contractStartDate,
        contractEndDate,
        employmentDate,
        employeeTitle,
        employeeTypeName,
        firstName,
        middleName,
        lastName,
        sex,
        employeeStatus,
        employeeType,
        monthlyWorkingHours,
        basicSalary,
        pensionNumber,
        pensionStatus,
        tinNumber,
        workingDays,
        employeeBank,
        employeeBankAccount,
        employeeBranch,
        employeeDepartment,
        employeePosition
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
            setFormData(
                {
                    id,
                    employeeCode,
                    employeeTitle,
                    contractStartDate,
                    contractEndDate,
                    employmentDate,
                    firstName,
                    middleName,
                    lastName,
                    sex,
                    employeeStatus,
                    employeeType,
                    monthlyWorkingHours,
                    basicSalary,
                    pensionNumber,
                    pensionStatus,
                    tinNumber,
                    workingDays,
                    employeeBank,
                    employeeBankAccount,
                    employeeBranch,
                    employeeDepartment,
                    employeeTypeName,
                    employeePosition
                }
            )
        }

        useEffect(() => {
            if (formData) {
                setFormData(formData);
            }
        }, []);

        const handleDelete = () => {
            dispatch(deleteEmployee(id))
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
            minWidth: 100,
            field: 'code',
            headerName: 'Code',
            renderCell: ({ row }: CellType) => {
                const { employeeCode } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${employeeCode}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            field: 'fullName',
            headerName: 'Name',
            renderCell: ({ row }: CellType) => {
                const { employeeTitleName, firstName, middleName, lastName } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            {/* <Link href={`/apps/user/view/${id}`} passHref> */}
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${employeeTitleName} ${firstName} ${middleName} ${lastName}`}
                            </Typography>
                            {/* </Link> */}
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 150,
            field: 'basicSalary',
            headerName: 'Basic Salary',
            renderCell: ({ row }: CellType) => {

                return (
                    <div style={{ width: '100%' }}>
                        <div style={{ 'textAlign': 'right' }}>
                            {parseFloat(row.basicSalary).toFixed(2)}
                        </div>
                    </div>
                )
            }
        },
        {
            flex: 0.15,
            field: 'employmentDate',
            minWidth: 150,
            headerName: 'Employment Date',
            renderCell: ({ row }: CellType) => {

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap variant='body2'>
                            {`${moment(row.employmentDate).format("YYYY-MM-DD")}`}
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
                    employeeCode={row.employeeCode}
                    employeeBranch={row.employeeBranch}
                    employeeDepartment={row.employeeDepartment}
                    firstName={row.firstName}
                    lastName={row.lastName}
                    basicSalary={row.basicSalary}
                    employmentDate={row.employmentDate}
                    sex={row.sex}
                    employeeStatus={row.employeeStatus}
                    employeeType={row.employeeType}
                    employeePosition={row.employeePosition}
                    contractStartDate={row.contractStartDate}
                    contractEndDate={row.contractEndDate}
                    monthlyWorkingHours={row.monthlyWorkingHours}
                    pensionNumber={row.pensionNumber}
                    pensionStatus={row.pensionStatus}
                    tinNumber={row.tinNumber}
                    workingDays={row.workingDays}
                    employeeBankAccount={row.employeeBankAccount}
                    employeeBank={row.employeeBank}
                    employeeTitle={row.employeeTitle}
                    employeeTitleName={row.employeeTitleName}
                    employeeTypeName={row.employeeTypeName}
                    middleName={row.middleName}

                />)
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.employee)

    const departmentStore = useSelector((state: RootState) => state.department)
    const branchStore = useSelector((state: RootState) => state.branches)

    useEffect(() => {
        dispatch(
            fetchData({
                branch,
                department,
                q: value,
            })
        )
    }, [dispatch, branch, department, value])



    const handleBranchChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setBranchObject(newValue)
            setBranch(newValue.id)
        }
    }



    const handleDepartmentChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setDepartmentObject(newValue)
            setDepartment(newValue.id)
        }
    }


    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={5}>
                <DatePickerWrapper>
                    <AddEmployee formData={formData} employees={store.data} />
                </DatePickerWrapper>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
                <Card>
                    <CardHeader title='Employees' />
                    <Grid item xs={12} sx={{ pl: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TableHeader
                            branches={[...branchStore.data, {id: "All", branchName: 'All Branches'}]}
                            departments={[...departmentStore.data.filter((department: any) => department.branchId == branch), {id: "All", departmentName: 'All Departments'}]}
                            handleBranchChange={handleBranchChange}
                            handleDepartmentChange={handleDepartmentChange}
                            departmentObject={departmentObject}
                            branchObject={branchObject}
                            handleFilter={handleFilter}
                            value={value} />
                    </Grid>
                    <CardContent>
                        <Grid item xs={12}>
                            <DataGrid
                                autoHeight
                                disableSelectionOnClick
                                rows={store.data}
                                columns={columns}
                                pageSize={pageSize}
                                rowsPerPageOptions={[10, 25, 50]}
                                onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                            />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        </Grid>
    )
}

export default UserList
