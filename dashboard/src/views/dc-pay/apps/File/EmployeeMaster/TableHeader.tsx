// ** MUI Imports
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'




const TableHeader = (props: any) => {

    // ** Props
    const { handleFilter, value, branches, departments, handleBranchChange, handleDepartmentChange, departmentObject, branchObject } = props

    return (

        <Grid container spacing={3}>
            <Grid item xs={4} >
                <FormControl fullWidth>
                    <Autocomplete
                        autoSelect
                        size={'small'}
                        value={branchObject}
                        options={branches}
                        onChange={handleBranchChange}
                        isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
                        id='autocomplete-controlled'
                        getOptionLabel={(option: any) => option.branchName}
                        renderInput={params => <TextField {...params} label='Select Branch' />}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth>
                    <Autocomplete
                        autoSelect
                        size={'small'}
                        value={departmentObject}
                        options={[...departments.filter((department: any) => department?.branchId == branchObject?.id), {id: 'All', departmentName: 'All Departments'}]}
                        onChange={handleDepartmentChange}
                        isOptionEqualToValue={(option: any, value: any) => option.departmentName == value.departmentName}
                        id='autocomplete-controlled'
                        getOptionLabel={(option: any) => option.departmentName}
                        renderInput={params => <TextField {...params} label='Select Department' />}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    size='small'
                    value={value}
                    placeholder='Search Employee'
                    onChange={e => handleFilter(e.target.value)}
                />
            </Grid>
        </Grid>

    )
}

export default TableHeader
