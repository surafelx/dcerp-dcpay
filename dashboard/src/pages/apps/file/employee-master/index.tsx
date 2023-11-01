// ** React Imports
import { useState, useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'


// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchData, deleteEmployee } from 'src/store/apps/File/EmployeeMaster'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Custom Components Imports
import TableHeader from 'src/views/dc-pay/apps/File/EmployeeMaster/TableHeader'

import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'


import AddEmployee from 'src/views/dc-pay/forms/File/EmployeeMaster/AddEmployee'
import EmployeeMasterTable from 'src/views/dc-pay/tables/File/EmployeeMaster/EmployeeMasterTable'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'


const UserList = () => {

    // ** State
    const [value, setValue] = useState<string>('')
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
    const [branch, setBranch] = useState<string>('All')
    const [branchObject, setBranchObject] = useState<any>({ id: 'All', branchName: 'All Branches' })
    const [formBranchObject, setFormBranchObject] = useState<any>({ id: '', branchName: '' })
    const [formDepartmentObject, setFormDepartmentObject] = useState<any>({ id: '', departmentName: '' })
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
                    <AddEmployee
                        departmentObject={formDepartmentObject}
                        branchObject={formBranchObject}
                        setBranchObject={setFormBranchObject}
                        setDepartmentObject={setFormDepartmentObject}
                        formData={formData}
                        mployees={store.data} />
                </DatePickerWrapper>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
                <Card>
                    <CardHeader title='Employees' />
                    <Grid item xs={12} sx={{ pl: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TableHeader
                            branches={[...branchStore.data, { id: "All", branchName: 'All Branches' }]}
                            departments={[...departmentStore.data.filter((department: any) => department.branchId == branch), { id: "All", departmentName: 'All Departments' }]}
                            handleBranchChange={handleBranchChange}
                            handleDepartmentChange={handleDepartmentChange}
                            departmentObject={departmentObject}
                            branchObject={branchObject}
                            handleFilter={handleFilter}
                            value={value} />
                    </Grid>
                    <CardContent>
                        <EmployeeMasterTable
                            setDepartmentObject={setFormDepartmentObject}
                            departments={departmentStore.data}
                            branches={branchStore.data}
                            setBranchObject={setFormBranchObject}
                            rows={store.data}
                            formData={formData}
                            setFormData={setFormData}
                            deleteEmployee={deleteEmployee}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        </Grid>
    )
}

export default UserList
