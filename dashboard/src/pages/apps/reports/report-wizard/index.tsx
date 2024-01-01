// // ** React Imports
// import { useState, useEffect, SyntheticEvent } from 'react'

// import Checkbox from '@mui/material/Checkbox'
// import Accordion from '@mui/material/Accordion'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import AccordionDetails from '@mui/material/AccordionDetails'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** MUI Imports
// import Alert from '@mui/material/Alert'
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import FormControl from '@mui/material/FormControl'

// // ** Store Imports
// import { useDispatch, useSelector } from 'react-redux'

// import InputLabel from '@mui/material/InputLabel'
// import Select from '@mui/material/Select'
// import MenuItem from '@mui/material/MenuItem'

// // ** Third Party Imports
// import * as yup from 'yup'
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'


// // ** Actions Imports
// import { fetchData, deleteEmployee } from 'src/store/apps/File/EmployeeMaster'

// // ** Types Imports
// import { RootState, AppDispatch } from 'src/store'

// import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

// import Autocomplete from '@mui/material/Autocomplete'
// import EmployeeMasterTable from 'src/views/dc-pay/tables/File/EmployeeMaster/EmployeeMasterTable'



// // import format from 'date-fns/format'

// import { addEmployee, editEmployee } from 'src/store/apps/File/EmployeeMaster'
// import TextField from '@mui/material/TextField'
// import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
// import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'
// import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
// import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'


// // interface CustomInputProps {
// //     value: DateType
// //     label: string
// //     error: boolean
// //     onChange: (event: ChangeEvent) => void
// // }

// // const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
// //     return <TextField required size={'small'} inputRef={ref} {...props} sx={{ width: '100%' }} />
// // })


// // interface PickerProps {
// //     label?: string
// //     end: Date | number
// //     start: Date | number
// //     error: any
// // }

// // const RangeCustomInput = forwardRef((props: PickerProps, ref) => {
// //     const startDate = props.start !== null ? ` - ${format(props.start, 'MM/dd/yyyy')}` : ''
// //     const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : ''

// //     const value = `${startDate}${endDate !== null ? endDate : ''}`

// //     return <TextField size={'small'} inputRef={ref} label={props.label || ''} sx={{ width: '100%' }}  {...props} value={value} />
// // })




// const emptyValues = {

//     layout: '',

// }


// const employeeList = [
//     'Code',
//     'Name',
//     'TIN',
//     'Bank',
//     'Account',
//     'Pension',
//     'Pension No.'
// ]

// const deductionQuantityList = [
//     'Absence Hours',
//     'Credit Ass. Vol. Saving Rate',
//     'Leave Hours'
// ]

// const earningAmountList = [
//     'Salary',
//     'Position Allowance',
//     'Acting Allowance',
//     'Taxi Allowance',
//     'House Allowance',
//     'Overtime Amount 150%',
//     'Overtime Amount 175%',
//     'Overtime Amount 200%',
//     'Overtime Amount 250%',
//     'Medical Allowance',
//     'Other Earnings',
//     'Indemnity Allowance',
//     'Hardship Allowance 15%',
//     'Other Allowance',
//     'Hardship Allowance 20%',
//     'Hardship Allowance 20% Input',
//     'Hardship Allowance 15% Input',
// ];

// const deductionAmountList = [
//     'Income Tax',
//     'Pension Company',
//     'Pension Employee',
//     'Labour Union',
//     'Telephone Benefits',
//     'Abay Dam',
//     'Telephone Expenses',
//     'Medical Expenses',
//     'Fine',
//     'Other Loan',
//     'Long Term Loan',
//     'Credit Short Loan',
//     'Credit Sales',
//     'Credit Association Forced Saving',
//     'Credit Ass. Vol. Saving Amount',
//     'Edir',
//     'Other Deduction',
//     'Court',
//     'Red Cross',
//     'Advance',
//     'Cost Sharing',
//     'Contribution T-Shirt',
//     'Last Overpay',
//     'Absence Amount',
// ];

// const otherList = [
//     'Basic Salary',
//     'Family',
//     'Total Overtime',
//     'Gross Taxable Salary',
//     'Gross Salary',
//     'Leave Amount',
//     'Overpay',
//     'Net Pay',
//     'Contribution',
//     'Medical Contribution'
// ]
// const EarningAmountList = ({ transactionList, isAllChecked, onCheckboxChange, }: any) => {

//     console.log(isAllChec)
//     const [checkboxStates, setCheckboxStates] = useState(
//         transactionList.reduce((acc: any, allowance: any) => {
//             acc[allowance] = false;
//             return acc;
//         }, {})
//     );

//     const handleItemChecked = (selectedItem: any) => {
//         setCheckboxStates((prevCheckboxStates: any) => ({
//             ...prevCheckboxStates,
//             [selectedItem]: !prevCheckboxStates[selectedItem],
//         }));

//         const updatedSelectedItems = Object.keys(checkboxStates).filter(
//             (item) => checkboxStates[item]
//         );

//         // Notify parent component about the checkbox change
//         onCheckboxChange(updatedSelectedItems);
//     };

//     return (
//         <div>
//             {transactionList.map((allowance: any, index: any) => (
//                 <div key={index}>
//                     <FormControlLabel
//                         label={allowance}
//                         aria-label='Acknowledge'
//                         control={<Checkbox
//                             checked={checkboxStates[allowance]}
//                             onChange={() => handleItemChecked(allowance)}
//                             disableRipple />}
//                         onClick={event => event.stopPropagation()}
//                         onFocus={event => event.stopPropagation()}
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// };

// const UserList = () => {

//     const [selectedItems, setSelectedItems] = useState([]);

//     // Rest of your component code...

//     const handleCheckboxChange = (item: any) => {
//         const updatedSelectedItems: any = [...selectedItems];
//         if (updatedSelectedItems.includes(item)) {
//             updatedSelectedItems.splice(updatedSelectedItems.indexOf(item), 1);
//         } else {
//             updatedSelectedItems.push(item);
//         }
//         setSelectedItems(updatedSelectedItems);
//         console.log(selectedItems)

//     };


//     // @ts-ignore
//     const userData = JSON.parse(window.localStorage.getItem('userData'))

//     // const { start_date: startDate, end_date: endDate } = userData.currentPeriod || { start_date: '', end_date: '' }
//     // const [employmentTypeValue, setEmploymentTypeValue] = useState<any>('')
//     // const [contractStart, setContractStart] = useState<any>(null)
//     // const [contractEnd, setContractEnd] = useState<any>(null)
//     // const [employmentDateError,] = useState(null)

//     // ** State
//     const [filterValue, setFilterValue] = useState<string>('')
//     const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
//     const [branch, setBranch] = useState<string>('All')
//     const [branchObject, setBranchObject] = useState<any>({ id: 'All', branchName: 'All Branches' })
//     const [formBranchObject, setFormBranchObject] = useState<any>({ id: '', branchName: '' })
//     const [formDepartmentObject, setFormDepartmentObject] = useState<any>({ id: '', departmentName: '' })
//     const [department, setDepartment] = useState<string>('All')
//     const [departmentObject, setDepartmentObject] = useState<any>({ id: 'All', departmentName: 'All Departments' })
//     const [workingDaysPeriod, setWorkingDaysPeriod] = useState<any>('')

//     const handleFilter = (val: string) => {
//         setFilterValue(val)
//     }


//     const [formData, setFormData] = useState(emptyValues);


//     // ** Hooks
//     const dispatch = useDispatch<AppDispatch>()
//     const store = useSelector((state: RootState) => state.employee)

//     const branchStore = useSelector((state: RootState) => state.branches)
//     const departmentStore = useSelector((state: RootState) => state.department)

//     const subParameters = useSelector((state: RootState) => state.subParameterDefinition)
//     const mainParameters = useSelector((state: RootState) => state.mainParameterDefinition)

//     const filterSubParametersByName = (parentParamName: any) => {
//         const parent: any = mainParameters.allData.find((parent: any) => parent.parameterName === parentParamName);
//         if (!parent) {
//             return [];
//         }

//         const filteredChild = subParameters.allData.filter((child: any) => child.parameterId === parent.id);

//         return filteredChild
//     }



//     const bankOptions: any = filterSubParametersByName('Bank')
//     const sexOptions = filterSubParametersByName('Sex')
//     const employeeStatusOptions = filterSubParametersByName('Employee Status')
//     const employmentTypeOptions: any = filterSubParametersByName('Employee Type')
//     const employeePositionOptions = filterSubParametersByName('Employee Position')
//     const employeeTitleOptions = filterSubParametersByName('Employee Title')

//     const permanentEmploymentTypeValue = employmentTypeOptions.filter((parameter: any) => parameter.parameterName == 'Permanent')[0]?.id
//     const contractEmploymentTypeValue = employmentTypeOptions.filter((parameter: any) => parameter.parameterName == 'Contract')[0]?.id

//     const naBank = bankOptions.filter((parameter: any) => parameter.parameterName == 'NA')[0]?.id

//     const schema = yup.object().shape({
//         layout: yup.string().required('Required'),

//     })

//     useEffect(() => {
//         dispatch(
//             fetchMainParameterDefinitions({
//                 q: ''
//             })
//         )
//     }, [dispatch])

//     useEffect(() => {
//         dispatch(
//             fetchSubParameterDefinition({
//                 q: ''
//             })
//         )
//     }, [dispatch])

//     useEffect(() => {
//         dispatch(
//             fetchDepartment({
//                 q: ''
//             })
//         )
//     }, [dispatch])

//     useEffect(() => {
//         dispatch(
//             fetchBranch({
//                 q: ''
//             })
//         )
//     }, [dispatch])

//     useEffect(() => {
//         dispatch(
//             fetchData({
//                 branch: branchObject?.id || '',
//                 department: departmentObject?.id || '',
//                 q: filterValue,
//             })
//         )
//     }, [dispatch, branchObject, departmentObject, filterValue])


//     const {
//         control,
//         handleSubmit,
//         reset,
//         setValue,
//         trigger,
//         formState: { errors }
//     } = useForm({
//         defaultValues: emptyValues,
//         mode: 'onSubmit',
//         resolver: yupResolver(schema)
//     })




//     const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)



//     const onSubmit = (data: any) => {
//         data.employeeBranch = formBranchObject.id
//         data.employeeDepartment = formDepartmentObject.id
//         data.workingDays = workingDaysPeriod
//         if (data.contractDate) {
//             data.contractStartDate = data.contractDate[0]
//             data.contractEndDate = data.contractDate[1]
//         }
//         console.log(data)
//         if (data.id) {
//             dispatch(editEmployee({ ...data }))
//         } else {
//             dispatch(addEmployee({ ...data }))
//         }
//         setBranchObject({ id: 'All', branchName: 'All Branches' })
//         setDepartmentObject({ id: 'All', departmentName: 'All Departments' })
//         setFormBranchObject(null)
//         setFormDepartmentObject(null)
//         reset(emptyValues)
//     }


//     const [expanded, setExpanded] = useState<string | false>(false)

//     const handleChange = (panel: string) => (, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false)
// }

// const [employeeExpanded, setEmployeeExpanded] = useState<string | false>(false)
// const [employeeListChecked, setEmployeeListChecked] = useState<Boolean | false>(false)
// const [amountExpanded, setEarningAmountExpanded] = useState<string | false>(false)
// const [quantityExpanded, setEarningQuantityExpanded] = useState<string | false>(false)

// const handleEmployeeChange = (panel: string) => (, isExpanded: boolean) => {
//     setEmployeeExpanded(isExpanded ? panel : false)
// }
// const handleEmployeeSelectChange = (event: any) => {
//     setEmployeeListChecked(!employeeListChecked)
// }

// const handleEarningAmountChange = (panel: string) => (, isExpanded: boolean) => {
//     setEarningAmountExpanded(isExpanded ? panel : false)
// }
// const handleEarningQuantityChange = (panel: string) => (, isExpanded: boolean) => {
//     setEarningQuantityExpanded(isExpanded ? panel : false)
// }




// const handleBranchChange = (e: any, newValue: any) => {
//     if (newValue?.id) {
//         setBranchObject(newValue)
//         setBranch(newValue.id)
//         setDepartmentObject({ departmentName: '', id: '' })
//     }
// }


// const handleDepartmentChange = (e: any, newValue: any) => {
//     if (newValue?.id) {
//         setDepartmentObject(newValue)
//         setDepartment(newValue.id)
//     }
// }


// return (
//     <Grid container spacing={3}>
//         <Grid item xs={12} md={12} lg={5}>
//             <Card>
//                 <CardHeader title="Report Wizard" />
//                 <CardContent    >
//                     <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
//                         <Grid container spacing={3}>

//                             <Grid item xs={6}>
//                                 <FormControl fullWidth>
//                                     <Autocomplete
//                                         autoSelect
//                                         size={'small'}
//                                         value={branchObject}
//                                         options={[...branchStore.data, { id: "All", branchName: 'All Branches' }]}
//                                         onChange={handleBranchChange}
//                                         isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
//                                         id='autocomplete-controlled'
//                                         getOptionLabel={(option: any) => option.branchName}
//                                         renderInput={params => <TextField {...params} label='Select Branch' />}
//                                     />
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <FormControl fullWidth>
//                                     <Autocomplete
//                                         autoSelect
//                                         size={'small'}
//                                         value={departmentObject}
//                                         options={[...departmentStore.data.filter((dep: any) => dep.branchId == branch || branchObject.branchName == 'All' || dep.departmentName == 'All'), { id: 'All', departmentName: 'All Departments' }]}
//                                         onChange={handleDepartmentChange}
//                                         isOptionEqualToValue={(option: any, value: any) => option.departmentName == value.departmentName}
//                                         id='autocomplete-controlled'
//                                         getOptionLabel={(option: any) => option.departmentName}
//                                         renderInput={params => <TextField {...params} label='Select Department' />}
//                                     />
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <FormControl fullWidth >
//                                     <Controller
//                                         name='layout'
//                                         control={control}
//                                         rules={{ required: true }}
//                                         render={({ field: { value, onChange, onBlur } }) => (
//                                             <>
//                                                 <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Layout *</InputLabel>
//                                                 <Select
//                                                     size={'small'}
//                                                     label='Layout *'
//                                                     value={value}
//                                                     id='demo-simple-select-autoWidth'
//                                                     labelId='demo-simple-select-autoWidth-label'
//                                                     onBlur={onBlur}
//                                                     onChange={onChange}
//                                                     error={Boolean(errors.layout)}
//                                                 >
//                                                     <MenuItem value={'portrait'}>Portrait</MenuItem>
//                                                     <MenuItem value={'landscape'}>Landscape</MenuItem>
//                                                 </Select>
//                                             </>

//                                         )}
//                                     />
//                                     {errors.layout && <Alert sx={{ my: 4 }} severity='error'>{errors.layout.message}</Alert>}
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <FormControl fullWidth >
//                                     <Controller
//                                         name='layout'
//                                         control={control}
//                                         rules={{ required: true }}
//                                         render={({ field: { value, onChange, onBlur } }) => (
//                                             <>
//                                                 <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Format *</InputLabel>
//                                                 <Select
//                                                     size={'small'}
//                                                     label='Format *'
//                                                     value={value}
//                                                     id='demo-simple-select-autoWidth'
//                                                     labelId='demo-simple-select-autoWidth-label'
//                                                     onBlur={onBlur}
//                                                     onChange={onChange}
//                                                     error={Boolean(errors.layout)}
//                                                 >
//                                                     <MenuItem value={'portrait'}>Portrait</MenuItem>
//                                                     <MenuItem value={'landscape'}>Landscape</MenuItem>
//                                                 </Select>
//                                             </>

//                                         )}
//                                     />
//                                     {errors.layout && <Alert sx={{ my: 4 }} severity='error'>{errors.layout.message}</Alert>}
//                                 </FormControl>
//                             </Grid>

//                             <Grid item sm={12}>
//                                 <Accordion expanded={employeeExpanded === 'employeePanel'} onChange={handleEmployeeChange('employeePanel')}>
//                                     <AccordionSummary
//                                         id='actions-panel-header-3'
//                                         aria-controls='actions-panel-content-3'
//                                         expandIcon={<Icon icon='mdi:chevron-down' />}
//                                     >
//                                         <FormControlLabel
//                                             label='Employee'
//                                             aria-label='Acknowledge'
//                                             control={<Checkbox checked={Boolean(employeeListChecked)} onChange={handleEmployeeSelectChange} />}
//                                             onClick={event => event.stopPropagation()}
//                                             onFocus={event => event.stopPropagation()}
//                                         />
//                                     </AccordionSummary>
//                                     <AccordionDetails>
//                                         <EarningAmountList isAllChecked={employeeListChecked} transactionList={employeeList} onCheckboxChange={(item: any) => handleCheckboxChange(item)} />
//                                     </AccordionDetails>
//                                 </Accordion>
//                                 <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//                                     <AccordionSummary
//                                         id='actions-panel-header-1'
//                                         aria-controls='actions-panel-content-1'
//                                         expandIcon={<Icon icon='mdi:chevron-down' />}
//                                     >
//                                         <FormControlLabel
//                                             label='Earning'
//                                             aria-label='Acknowledge'
//                                             control={<Checkbox disableRipple />}
//                                             onClick={event => event.stopPropagation()}
//                                             onFocus={event => event.stopPropagation()}
//                                         />
//                                     </AccordionSummary>
//                                     <AccordionDetails>
//                                         <Accordion expanded={quantityExpanded === 'quantityExpanded'} onChange={handleEarningQuantityChange('quantityExpanded')}>
//                                             <AccordionSummary
//                                                 id='actions-panel-header-1'
//                                                 aria-controls='actions-panel-content-1'
//                                                 expandIcon={<Icon icon='mdi:chevron-down' />}
//                                             >
//                                                 <FormControlLabel
//                                                     label='Quantity'
//                                                     aria-label='Acknowledge'
//                                                     control={<Checkbox disableRipple />}
//                                                     onClick={event => event.stopPropagation()}
//                                                     onFocus={event => event.stopPropagation()}
//                                                 />
//                                             </AccordionSummary>
//                                             <AccordionDetails>
//                                                 <div>
//                                                     <EarningAmountList transactionList={deductionAmountList} />
//                                                 </div>
//                                             </AccordionDetails>
//                                         </Accordion>
//                                         <Accordion expanded={amountExpanded === 'amountPanel'} onChange={handleEarningAmountChange('amountPanel')}>
//                                             <AccordionSummary
//                                                 id='actions-panel-header-2'
//                                                 aria-controls='actions-panel-content-2'
//                                                 expandIcon={<Icon icon='mdi:chevron-down' />}
//                                             >
//                                                 <FormControlLabel
//                                                     label='Amount'
//                                                     aria-label='Acknowledge'
//                                                     control={<Checkbox disableRipple />}
//                                                     onClick={event => event.stopPropagation()}
//                                                     onFocus={event => event.stopPropagation()}
//                                                 />
//                                             </AccordionSummary>
//                                             <AccordionDetails>
//                                                 <EarningAmountList transactionList={earningAmountList} />
//                                             </AccordionDetails>
//                                         </Accordion>
//                                     </AccordionDetails>
//                                 </Accordion>
//                                 <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
//                                     <AccordionSummary
//                                         id='actions-panel-header-2'
//                                         aria-controls='actions-panel-content-2'
//                                         expandIcon={<Icon icon='mdi:chevron-down' />}
//                                     >
//                                         <FormControlLabel
//                                             label='Deduction'
//                                             aria-label='Acknowledge'
//                                             control={<Checkbox disableRipple />}
//                                             onClick={event => event.stopPropagation()}
//                                             onFocus={event => event.stopPropagation()}
//                                         />
//                                     </AccordionSummary>
//                                     <AccordionDetails>
//                                         <Accordion expanded={quantityExpanded === 'quantityExpanded'} onChange={handleEarningQuantityChange('quantityExpanded')}>
//                                             <AccordionSummary
//                                                 id='actions-panel-header-1'
//                                                 aria-controls='actions-panel-content-1'
//                                                 expandIcon={<Icon icon='mdi:chevron-down' />}
//                                             >
//                                                 <FormControlLabel
//                                                     label='Quantity'
//                                                     aria-label='Acknowledge'
//                                                     control={<Checkbox disableRipple />}
//                                                     onClick={event => event.stopPropagation()}
//                                                     onFocus={event => event.stopPropagation()}
//                                                 />
//                                             </AccordionSummary>
//                                             <AccordionDetails>
//                                                 <div>
//                                                     <EarningAmountList transactionList={deductionQuantityList} />
//                                                 </div>
//                                             </AccordionDetails>
//                                         </Accordion>
//                                         <Accordion expanded={amountExpanded === 'amountPanel'} onChange={handleEarningAmountChange('amountPanel')}>
//                                             <AccordionSummary
//                                                 id='actions-panel-header-2'
//                                                 aria-controls='actions-panel-content-2'
//                                                 expandIcon={<Icon icon='mdi:chevron-down' />}
//                                             >
//                                                 <FormControlLabel
//                                                     label='Amount'
//                                                     aria-label='Acknowledge'
//                                                     control={<Checkbox disableRipple />}
//                                                     onClick={event => event.stopPropagation()}
//                                                     onFocus={event => event.stopPropagation()}
//                                                 />
//                                             </AccordionSummary>
//                                             <AccordionDetails>
//                                                 <EarningAmountList transactionList={deductionAmountList} />
//                                             </AccordionDetails>
//                                         </Accordion>
//                                     </AccordionDetails>
//                                 </Accordion>
//                                 <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//                                     <AccordionSummary
//                                         id='actions-panel-header-3'
//                                         aria-controls='actions-panel-content-3'
//                                         expandIcon={<Icon icon='mdi:chevron-down' />}
//                                     >
//                                         <FormControlLabel
//                                             label='Other'
//                                             aria-label='Acknowledge'
//                                             control={<Checkbox disableRipple />}
//                                             onClick={event => event.stopPropagation()}
//                                             onFocus={event => event.stopPropagation()}
//                                         />
//                                     </AccordionSummary>
//                                     <AccordionDetails>
//                                         <EarningAmountList transactionList={otherList} />
//                                     </AccordionDetails>
//                                 </Accordion>
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <FormControl fullWidth>
//                                     <Button color='primary' fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
//                                         Preview
//                                     </Button>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <FormControl fullWidth>
//                                     <Button color='secondary' fullWidth size='large' onClick={() => {
//                                         reset(emptyValues)
//                                     }} type='reset' variant='contained' sx={{ mb: 7 }}>
//                                         Reset
//                                     </Button>
//                                 </FormControl>
//                             </Grid>
//                         </Grid>
//                     </form>
//                 </CardContent   >
//             </Card>
//         </Grid>
//         <Grid item xs={12} md={12} lg={7}>
//             <Card>
//                 <CardHeader title='Report View' />

//                 <CardContent>
//                     <Grid sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }} container spacing={6}>
//                         <Grid item xs={12} sm={4}>

//                         </Grid>
//                         <Grid item xs={12} sm={4}>

//                         </Grid>
//                         <Grid item xs={12} sm={2}>
//                             <Button
//                                 fullWidth
//                                 color='secondary' size='large' onClick={() => {
//                                     reset(emptyValues)
//                                 }} type='reset' variant='contained' >
//                                 <Icon icon='mdi:printer' />
//                             </Button>
//                         </Grid>
//                         <Grid item xs={12} sm={2}>
//                             <Button
//                                 fullWidth
//                                 color='secondary' size='large' onClick={() => {
//                                     reset(emptyValues)
//                                 }} type='reset' variant='contained' >
//                                 <Icon icon='mdi:download' />

//                             </Button>
//                         </Grid>
//                     </Grid>
//                     <EmployeeMasterTable
//                         departments={departmentStore.data}
//                         branches={branchStore.data}
//                         setBranch={setBranch}
//                         setDepartment={setDepartment}
//                         setDepartmentObject={setFormDepartmentObject}
//                         setBranchObject={setFormBranchObject}
//                         setEmploymentTypeValue={setEmploymentTypeValue}
//                         employmentTypeOptions={employmentTypeOptions}
//                         rows={store.data}
//                         reset={reset}
//                         formData={formData}
//                         setFormData={setFormData}
//                         deleteEmployee={deleteEmployee}
//                         setWorkingDaysPeriod={setWorkingDaysPeriod}
//                     />
//                 </CardContent>
//             </Card>
//         </Grid>
//         <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
//     </Grid>
// )
// }

// export default UserList


// ** React Imports
import { Fragment, ReactNode, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'


// ** Store Imports
import { useDispatch } from 'react-redux'

import { AppDispatch, RootState } from 'src/store'

import { fetchData } from 'src/store/apps/Reports/PayrollSheet'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import moment from 'moment'


const InvoicePrint = () => {


  const router = useRouter();

  // get the id param from the route query object
  const { branch, department } = router.query;


  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    dispatch(
      fetchData({
        branch,
        department,
        currentPlan: ''
      })
    )
  }, [dispatch, branch, department])


  const store = useSelector((state: RootState) => state.payrollSheet)


  // @ts-ignore
  const userData = JSON.parse(window.localStorage.getItem('userData'))

  // const { organizationName } = userData
  const { start_date: startDate, end_date: endDate } = userData.currentPeriod || { start_date: '', end_date: '' }

  useEffect(() => {
    setTimeout(() => {
      window.print()
    }, 5000)
  }, [])





  return (
    <Box sx={{ width: '100%', pb: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', verticalAlign: 'middle', gap: '4' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="DDFC Logo" height={"60px"} src="/images/logos/ddfc.png" />
              </div>
              <div>
                <div
                  style={{ fontWeight: 600, fontSize: "0.8rem", lineHeight: 'normal', marginBottom: "5px", textTransform: 'uppercase' }}
                >
                  Dire Dawa Food Complex S.Co
                </div>
                <div>
                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:location-outline'} fontSize='0.8rem' />
                    Lideta, Awash Bldg. #807
                  </div>
                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:home-outline'} fontSize='0.8rem' />
                    Addis Ababa, Ethiopia
                  </div>

                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:phone-outline'} fontSize='0.8rem' />
                    +251911217763 | +251929249081
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </div>
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', verticalAlign: 'middle', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt="Asun Logo" height={"60px"} src="/images/logos/asun-logo.png" />
              </div>
              <div>
                <div
                  style={{ fontWeight: 600, fontSize: "0.8rem", lineHeight: 'normal', marginBottom: "5px", textTransform: 'uppercase' }}
                >
                  Asun Pay
                </div>
                <div>
                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:web'} fontSize='0.8rem' />
                    www.asun.org
                  </div>
                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:email-outline'} fontSize='0.8rem' />
                    contact@asuns.org
                  </div>

                  <div style={{ fontSize: '10px', display: 'flex', gap: '4px' }}>
                    <Icon icon={'mdi:phone-outline'} fontSize='0.8rem' />
                    +251972262728 | +251945514370</div>
                </div>
              </div>
            </Box>

          </Box>
        </div>

      </div>

      <div style={{ fontSize: '22px', marginTop: '20px', backgroundColor: '#368FC8', color: 'white', padding: '5px', marginBottom: '5px', textTransform: 'uppercase', fontWeight: 700 }}>Payroll Sheet</div>
      <Grid container>
        <Grid item xs={5}>
          <div >
            <span style={{ fontWeight: 600, paddingLeft: '10px' }}> DATE:</span>
            <span style={{ color: '#368FC8', fontWeight: 600, }}>  {`${moment().format("LL")} `} </span>
          </div>
          <div >
            <span style={{ fontWeight: 600, paddingLeft: '10px' }}> PERIOD:</span>
            <span style={{ color: '#368FC8', fontWeight: 600 }}>  {`${moment(startDate).format("YYYY/MM/DD") || ""} - ${moment(endDate).format("YYYY/MM/DD") || ""}`}</span>
          </div>
        </Grid>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={3} >
          <div >
            <span style={{ fontWeight: 600 }}> BRANCH:</span>
            <span style={{ color: '#368FC8', fontWeight: 600 }}> {`${branch}`} </span>
          </div>
          <div >
            <span style={{ fontWeight: 600 }}> DEPARTMENT:</span>
            <span style={{ color: '#368FC8', fontWeight: 600 }}> {`${branch}`} </span>
          </div>

        </Grid>
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <Grid container columnSpacing={0}>
          <Grid item xs={12}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ backgroundColor: '#C1272D', border: '0.5px solid #C1272D' }} >
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>No.</th>
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Code</th>
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Name</th>
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Bank</th>
                  <th style={{
                    textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px'
                  }}>Account</th>
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Net Pay</th>
                  <th style={{ textTransform: 'uppercase', textAlign: 'center', color: 'white', fontSize: '12px', fontWeight: '600', padding: '5px' }}>Signature</th>
                </tr>

                {
                  store.data.filter(({ transactions, employeeStatusName }: any) => transactions.length > 3 && employeeStatusName === 'Active').map(({ employeeCode, employeeName, employeeAccountNumber, bankName, transactions, employeeDepartment }: any, index: any, array: any) => {
                    const netPay = transactions?.filter(({ transaction_code }: any) => transaction_code === '99')[0]?.transaction_amount;


                    const currentEmployeeDepartment = employeeDepartment;
                    const previousEmployeeDepartment = index > 0 ? array[index - 1].employeeDepartment : null;
                    const shouldDisplayDepartmentRow = currentEmployeeDepartment !== previousEmployeeDepartment;


                    const departmentRow = shouldDisplayDepartmentRow ? (
                      <tr style={{ backgroundColor: '#368FC8', color: 'white' }} key={`department-${employeeCode}`}>
                        <td colSpan={7} style={{ border: '0.5px solid #368FC8', padding: '5px', fontWeight: '600', fontSize: '10px', textAlign: 'center' }}>
                          <div >
                            {employeeDepartment}
                          </div>
                        </td>
                      </tr>
                    ) : null;

                    return (
                      <>
                        <Fragment key={`employee-${employeeCode}`}>
                          {departmentRow}
                          <tr>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}>{`${index + 1}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}>{`${employeeCode}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}>{`${employeeName.toUpperCase()}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}>{`${bankName}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}>{`${employeeAccountNumber}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'right' }}>{`${Number(netPay).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</td>
                            <td style={{ border: '0.5px solid #9C9FA4', padding: '3px', color: 'black', fontSize: '10px', textAlign: 'left' }}></td>
                          </tr>
                        </Fragment>
                       
                      </>

                    );
                  })

                }

              </tbody>
            </table>
          </Grid>

        </Grid>
      </div>
    </Box >


  )

}

InvoicePrint.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

InvoicePrint.setConfig = () => {
  return {
    mode: 'light'
  }
}


export default InvoicePrint
