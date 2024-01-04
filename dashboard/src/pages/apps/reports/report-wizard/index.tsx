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

//   layout: '',

// }


// const employeeList = [
//   'Code',
//   'Name',
//   'TIN',
//   'Bank',
//   'Account',
//   'Pension',
//   'Pension No.'
// ]

// const deductionQuantityList = [
//   'Absence Hours',
//   'Credit Ass. Vol. Saving Rate',
//   'Leave Hours'
// ]

// const earningAmountList = [
//   'Salary',
//   'Position Allowance',
//   'Acting Allowance',
//   'Taxi Allowance',
//   'House Allowance',
//   'Overtime Amount 150%',
//   'Overtime Amount 175%',
//   'Overtime Amount 200%',
//   'Overtime Amount 250%',
//   'Medical Allowance',
//   'Other Earnings',
//   'Indemnity Allowance',
//   'Hardship Allowance 15%',
//   'Other Allowance',
//   'Hardship Allowance 20%',
//   'Hardship Allowance 20% Input',
//   'Hardship Allowance 15% Input',
// ];

// const deductionAmountList = [
//   'Income Tax',
//   'Pension Company',
//   'Pension Employee',
//   'Labour Union',
//   'Telephone Benefits',
//   'Abay Dam',
//   'Telephone Expenses',
//   'Medical Expenses',
//   'Fine',
//   'Other Loan',
//   'Long Term Loan',
//   'Credit Short Loan',
//   'Credit Sales',
//   'Credit Association Forced Saving',
//   'Credit Ass. Vol. Saving Amount',
//   'Edir',
//   'Other Deduction',
//   'Court',
//   'Red Cross',
//   'Advance',
//   'Cost Sharing',
//   'Contribution T-Shirt',
//   'Last Overpay',
//   'Absence Amount',
// ];

// const otherList = [
//   'Basic Salary',
//   'Family',
//   'Total Overtime',
//   'Gross Taxable Salary',
//   'Gross Salary',
//   'Leave Amount',
//   'Overpay',
//   'Net Pay',
//   'Contribution',
//   'Medical Contribution'
// ]
// const EarningAmountList = ({ transactionList, isAllChecked, onCheckboxChange, }: any) => {

//   const [checkboxStates, setCheckboxStates] = useState(
//     transactionList.reduce((acc: any, allowance: any) => {
//       acc[allowance] = false;
//       return acc;
//     }, {})
//   );

//   const handleItemChecked = (selectedItem: any) => {
//     setCheckboxStates((prevCheckboxStates: any) => ({
//       ...prevCheckboxStates,
//       [selectedItem]: !prevCheckboxStates[selectedItem],
//     }));

//     const updatedSelectedItems = Object.keys(checkboxStates).filter(
//       (item) => checkboxStates[item]
//     );

//     // Notify parent component about the checkbox change
//     onCheckboxChange(updatedSelectedItems);
//   };

//   return (
//     <div>
//       {transactionList.map((allowance: any, index: any) => (
//         <div key={index}>
//           <FormControlLabel
//             label={allowance}
//             aria-label='Acknowledge'
//             control={<Checkbox
//               checked={checkboxStates[allowance]}
//               onChange={() => handleItemChecked(allowance)}
//               disableRipple />}
//             onClick={event => event.stopPropagation()}
//             onFocus={event => event.stopPropagation()}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// const UserList = () => {

//   const [selectedItems, setSelectedItems] = useState([]);

//   // Rest of your component code...

//   const handleCheckboxChange = (item: any) => {
//     const updatedSelectedItems: any = [...selectedItems];
//     if (updatedSelectedItems.includes(item)) {
//       updatedSelectedItems.splice(updatedSelectedItems.indexOf(item), 1);
//     } else {
//       updatedSelectedItems.push(item);
//     }
//     setSelectedItems(updatedSelectedItems);

//   };


//   // @ts-ignore
//   const userData = JSON.parse(window.localStorage.getItem('userData'))

//   // const { start_date: startDate, end_date: endDate } = userData.currentPeriod || { start_date: '', end_date: '' }
//   // const [employmentTypeValue, setEmploymentTypeValue] = useState<any>('')
//   // const [contractStart, setContractStart] = useState<any>(null)
//   // const [contractEnd, setContractEnd] = useState<any>(null)
//   // const [employmentDateError,] = useState(null)

//   // ** State
//   const [filterValue, setFilterValue] = useState<string>('')
//   const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
//   const [branch, setBranch] = useState<string>('All')
//   const [branchObject, setBranchObject] = useState<any>({ id: 'All', branchName: 'All Branches' })
//   const [formBranchObject, setFormBranchObject] = useState<any>({ id: '', branchName: '' })
//   const [formDepartmentObject, setFormDepartmentObject] = useState<any>({ id: '', departmentName: '' })
//   const [department, setDepartment] = useState<string>('All')
//   const [departmentObject, setDepartmentObject] = useState<any>({ id: 'All', departmentName: 'All Departments' })
//   const [workingDaysPeriod, setWorkingDaysPeriod] = useState<any>('')

//   const handleFilter = (val: string) => {
//     setFilterValue(val)
//   }


//   const [formData, setFormData] = useState(emptyValues);


//   // ** Hooks
//   const dispatch = useDispatch<AppDispatch>()
//   const store = useSelector((state: RootState) => state.employee)

//   const branchStore = useSelector((state: RootState) => state.branches)
//   const departmentStore = useSelector((state: RootState) => state.department)

//   const subParameters = useSelector((state: RootState) => state.subParameterDefinition)
//   const mainParameters = useSelector((state: RootState) => state.mainParameterDefinition)

//   const filterSubParametersByName = (parentParamName: any) => {
//     const parent: any = mainParameters.allData.find((parent: any) => parent.parameterName === parentParamName);
//     if (!parent) {
//       return [];
//     }

//     const filteredChild = subParameters.allData.filter((child: any) => child.parameterId === parent.id);

//     return filteredChild
//   }



//   const bankOptions: any = filterSubParametersByName('Bank')
//   const sexOptions = filterSubParametersByName('Sex')
//   const employeeStatusOptions = filterSubParametersByName('Employee Status')
//   const employmentTypeOptions: any = filterSubParametersByName('Employee Type')
//   const employeePositionOptions = filterSubParametersByName('Employee Position')
//   const employeeTitleOptions = filterSubParametersByName('Employee Title')

//   const permanentEmploymentTypeValue = employmentTypeOptions.filter((parameter: any) => parameter.parameterName == 'Permanent')[0]?.id
//   const contractEmploymentTypeValue = employmentTypeOptions.filter((parameter: any) => parameter.parameterName == 'Contract')[0]?.id

//   const naBank = bankOptions.filter((parameter: any) => parameter.parameterName == 'NA')[0]?.id

//   const schema = yup.object().shape({
//     layout: yup.string().required('Required'),

//   })

//   useEffect(() => {
//     dispatch(
//       fetchMainParameterDefinitions({
//         q: ''
//       })
//     )
//   }, [dispatch])

//   useEffect(() => {
//     dispatch(
//       fetchSubParameterDefinition({
//         q: ''
//       })
//     )
//   }, [dispatch])

//   useEffect(() => {
//     dispatch(
//       fetchDepartment({
//         q: ''
//       })
//     )
//   }, [dispatch])

//   useEffect(() => {
//     dispatch(
//       fetchBranch({
//         q: ''
//       })
//     )
//   }, [dispatch])

//   useEffect(() => {
//     dispatch(
//       fetchData({
//         branch: branchObject?.id || '',
//         department: departmentObject?.id || '',
//         q: filterValue,
//       })
//     )
//   }, [dispatch, branchObject, departmentObject, filterValue])


//   const {
//     control,
//     handleSubmit,
//     reset,
//     setValue,
//     trigger,
//     formState: { errors }
//   } = useForm({
//     defaultValues: emptyValues,
//     mode: 'onSubmit',
//     resolver: yupResolver(schema)
//   })




//   const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)



//   const onSubmit = (data: any) => {
//     data.employeeBranch = formBranchObject.id
//     data.employeeDepartment = formDepartmentObject.id
//     data.workingDays = workingDaysPeriod
//     if (data.contractDate) {
//       data.contractStartDate = data.contractDate[0]
//       data.contractEndDate = data.contractDate[1]
//     }
//     if (data.id) {
//       dispatch(editEmployee({ ...data }))
//     } else {
//       dispatch(addEmployee({ ...data }))
//     }
//     setBranchObject({ id: 'All', branchName: 'All Branches' })
//     setDepartmentObject({ id: 'All', departmentName: 'All Departments' })
//     setFormBranchObject(null)
//     setFormDepartmentObject(null)
//     reset(emptyValues)
//   }


//   const [expanded, setExpanded] = useState<string | false>(false)

//   const handleChange = (panel: string) => (quantity: any, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false)
//   }

//   const [employeeExpanded, setEmployeeExpanded] = useState<string | false>(false)
//   const [employeeListChecked, setEmployeeListChecked] = useState<Boolean | false>(false)
//   const [amountExpanded, setEarningAmountExpanded] = useState<string | false>(false)
//   const [quantityExpanded, setEarningQuantityExpanded] = useState<string | false>(false)

//   const handleEmployeeChange = (panel: string) => (quantity: any, isExpanded: boolean) => {
//     setEmployeeExpanded(isExpanded ? panel : false)
//   }
//   const handleEmployeeSelectChange = (event: any) => {
//     setEmployeeListChecked(!employeeListChecked)
//   }

//   const handleEarningAmountChange = (panel: string) => (quantity: any, isExpanded: boolean) => {
//     setEarningAmountExpanded(isExpanded ? panel : false)
//   }
//   const handleEarningQuantityChange = (panel: string) => (quantity: any, isExpanded: boolean) => {
//     setEarningQuantityExpanded(isExpanded ? panel : false)
//   }




//   const handleBranchChange = (e: any, newValue: any) => {
//     if (newValue?.id) {
//       setBranchObject(newValue)
//       setBranch(newValue.id)
//       setDepartmentObject({ departmentName: '', id: '' })
//     }
//   }


//   const handleDepartmentChange = (e: any, newValue: any) => {
//     if (newValue?.id) {
//       setDepartmentObject(newValue)
//       setDepartment(newValue.id)
//     }
//   }


//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={12} lg={5}>
//         <Card>
//           <CardHeader title="Report Wizard" />
//           <CardContent    >
//             <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
//               <Grid container spacing={3}>

//                 <Grid item xs={6}>
//                   <FormControl fullWidth>
//                     <Autocomplete
//                       autoSelect
//                       size={'small'}
//                       value={branchObject}
//                       options={[...branchStore.data, { id: "All", branchName: 'All Branches' }]}
//                       onChange={handleBranchChange}
//                       isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
//                       id='autocomplete-controlled'
//                       getOptionLabel={(option: any) => option.branchName}
//                       renderInput={params => <TextField {...params} label='Select Branch' />}
//                     />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <FormControl fullWidth>
//                     <Autocomplete
//                       autoSelect
//                       size={'small'}
//                       value={departmentObject}
//                       options={[...departmentStore.data.filter((dep: any) => dep.branchId == branch || branchObject.branchName == 'All' || dep.departmentName == 'All'), { id: 'All', departmentName: 'All Departments' }]}
//                       onChange={handleDepartmentChange}
//                       isOptionEqualToValue={(option: any, value: any) => option.departmentName == value.departmentName}
//                       id='autocomplete-controlled'
//                       getOptionLabel={(option: any) => option.departmentName}
//                       renderInput={params => <TextField {...params} label='Select Department' />}
//                     />
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth >
//                     <Controller
//                       name='layout'
//                       control={control}
//                       rules={{ required: true }}
//                       render={({ field: { value, onChange, onBlur } }) => (
//                         <>
//                           <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Layout *</InputLabel>
//                           <Select
//                             size={'small'}
//                             label='Layout *'
//                             value={value}
//                             id='demo-simple-select-autoWidth'
//                             labelId='demo-simple-select-autoWidth-label'
//                             onBlur={onBlur}
//                             onChange={onChange}
//                             error={Boolean(errors.layout)}
//                           >
//                             <MenuItem value={'portrait'}>Portrait</MenuItem>
//                             <MenuItem value={'landscape'}>Landscape</MenuItem>
//                           </Select>
//                         </>

//                       )}
//                     />
//                     {errors.layout && <Alert sx={{ my: 4 }} severity='error'>{errors.layout.message}</Alert>}
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth >
//                     <Controller
//                       name='layout'
//                       control={control}
//                       rules={{ required: true }}
//                       render={({ field: { value, onChange, onBlur } }) => (
//                         <>
//                           <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Format *</InputLabel>
//                           <Select
//                             size={'small'}
//                             label='Format *'
//                             value={value}
//                             id='demo-simple-select-autoWidth'
//                             labelId='demo-simple-select-autoWidth-label'
//                             onBlur={onBlur}
//                             onChange={onChange}
//                             error={Boolean(errors.layout)}
//                           >
//                             <MenuItem value={'portrait'}>Portrait</MenuItem>
//                             <MenuItem value={'landscape'}>Landscape</MenuItem>
//                           </Select>
//                         </>

//                       )}
//                     />
//                     {errors.layout && <Alert sx={{ my: 4 }} severity='error'>{errors.layout.message}</Alert>}
//                   </FormControl>
//                 </Grid>

//                 <Grid item sm={12}>
//                   <Accordion expanded={employeeExpanded === 'employeePanel'} onChange={handleEmployeeChange('employeePanel')}>
//                     <AccordionSummary
//                       id='actions-panel-header-3'
//                       aria-controls='actions-panel-content-3'
//                       expandIcon={<Icon icon='mdi:chevron-down' />}
//                     >
//                       <FormControlLabel
//                         label='Employee'
//                         aria-label='Acknowledge'
//                         control={<Checkbox checked={Boolean(employeeListChecked)} onChange={handleEmployeeSelectChange} />}
//                         onClick={event => event.stopPropagation()}
//                         onFocus={event => event.stopPropagation()}
//                       />
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <EarningAmountList isAllChecked={employeeListChecked} transactionList={employeeList} onCheckboxChange={(item: any) => handleCheckboxChange(item)} />
//                     </AccordionDetails>
//                   </Accordion>
//                   <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//                     <AccordionSummary
//                       id='actions-panel-header-1'
//                       aria-controls='actions-panel-content-1'
//                       expandIcon={<Icon icon='mdi:chevron-down' />}
//                     >
//                       <FormControlLabel
//                         label='Earning'
//                         aria-label='Acknowledge'
//                         control={<Checkbox disableRipple />}
//                         onClick={event => event.stopPropagation()}
//                         onFocus={event => event.stopPropagation()}
//                       />
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <Accordion expanded={quantityExpanded === 'quantityExpanded'} onChange={handleEarningQuantityChange('quantityExpanded')}>
//                         <AccordionSummary
//                           id='actions-panel-header-1'
//                           aria-controls='actions-panel-content-1'
//                           expandIcon={<Icon icon='mdi:chevron-down' />}
//                         >
//                           <FormControlLabel
//                             label='Quantity'
//                             aria-label='Acknowledge'
//                             control={<Checkbox disableRipple />}
//                             onClick={event => event.stopPropagation()}
//                             onFocus={event => event.stopPropagation()}
//                           />
//                         </AccordionSummary>
//                         <AccordionDetails>
//                           <div>
//                             <EarningAmountList transactionList={deductionAmountList} />
//                           </div>
//                         </AccordionDetails>
//                       </Accordion>
//                       <Accordion expanded={amountExpanded === 'amountPanel'} onChange={handleEarningAmountChange('amountPanel')}>
//                         <AccordionSummary
//                           id='actions-panel-header-2'
//                           aria-controls='actions-panel-content-2'
//                           expandIcon={<Icon icon='mdi:chevron-down' />}
//                         >
//                           <FormControlLabel
//                             label='Amount'
//                             aria-label='Acknowledge'
//                             control={<Checkbox disableRipple />}
//                             onClick={event => event.stopPropagation()}
//                             onFocus={event => event.stopPropagation()}
//                           />
//                         </AccordionSummary>
//                         <AccordionDetails>
//                           <EarningAmountList transactionList={earningAmountList} />
//                         </AccordionDetails>
//                       </Accordion>
//                     </AccordionDetails>
//                   </Accordion>
//                   <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
//                     <AccordionSummary
//                       id='actions-panel-header-2'
//                       aria-controls='actions-panel-content-2'
//                       expandIcon={<Icon icon='mdi:chevron-down' />}
//                     >
//                       <FormControlLabel
//                         label='Deduction'
//                         aria-label='Acknowledge'
//                         control={<Checkbox disableRipple />}
//                         onClick={event => event.stopPropagation()}
//                         onFocus={event => event.stopPropagation()}
//                       />
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <Accordion expanded={quantityExpanded === 'quantityExpanded'} onChange={handleEarningQuantityChange('quantityExpanded')}>
//                         <AccordionSummary
//                           id='actions-panel-header-1'
//                           aria-controls='actions-panel-content-1'
//                           expandIcon={<Icon icon='mdi:chevron-down' />}
//                         >
//                           <FormControlLabel
//                             label='Quantity'
//                             aria-label='Acknowledge'
//                             control={<Checkbox disableRipple />}
//                             onClick={event => event.stopPropagation()}
//                             onFocus={event => event.stopPropagation()}
//                           />
//                         </AccordionSummary>
//                         <AccordionDetails>
//                           <div>
//                             <EarningAmountList transactionList={deductionQuantityList} />
//                           </div>
//                         </AccordionDetails>
//                       </Accordion>
//                       <Accordion expanded={amountExpanded === 'amountPanel'} onChange={handleEarningAmountChange('amountPanel')}>
//                         <AccordionSummary
//                           id='actions-panel-header-2'
//                           aria-controls='actions-panel-content-2'
//                           expandIcon={<Icon icon='mdi:chevron-down' />}
//                         >
//                           <FormControlLabel
//                             label='Amount'
//                             aria-label='Acknowledge'
//                             control={<Checkbox disableRipple />}
//                             onClick={event => event.stopPropagation()}
//                             onFocus={event => event.stopPropagation()}
//                           />
//                         </AccordionSummary>
//                         <AccordionDetails>
//                           <EarningAmountList transactionList={deductionAmountList} />
//                         </AccordionDetails>
//                       </Accordion>
//                     </AccordionDetails>
//                   </Accordion>
//                   <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//                     <AccordionSummary
//                       id='actions-panel-header-3'
//                       aria-controls='actions-panel-content-3'
//                       expandIcon={<Icon icon='mdi:chevron-down' />}
//                     >
//                       <FormControlLabel
//                         label='Other'
//                         aria-label='Acknowledge'
//                         control={<Checkbox disableRipple />}
//                         onClick={event => event.stopPropagation()}
//                         onFocus={event => event.stopPropagation()}
//                       />
//                     </AccordionSummary>
//                     <AccordionDetails>
//                       <EarningAmountList transactionList={otherList} />
//                     </AccordionDetails>
//                   </Accordion>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <Button color='primary' fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
//                       Preview
//                     </Button>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth>
//                     <Button color='secondary' fullWidth size='large' onClick={() => {
//                       reset(emptyValues)
//                     }} type='reset' variant='contained' sx={{ mb: 7 }}>
//                       Reset
//                     </Button>
//                   </FormControl>
//                 </Grid>
//               </Grid>
//             </form>
//           </CardContent   >
//         </Card>
//       </Grid>
//       <Grid item xs={12} md={12} lg={7}>
//         <Card>
//           <CardHeader title='Report View' />

//           <CardContent>
//             <Grid sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }} container spacing={6}>
//               <Grid item xs={12} sm={4}>

//               </Grid>
//               <Grid item xs={12} sm={4}>

//               </Grid>
//               <Grid item xs={12} sm={2}>
//                 <Button
//                   fullWidth
//                   color='secondary' size='large' onClick={() => {
//                     reset(emptyValues)
//                   }} type='reset' variant='contained' >
//                   <Icon icon='mdi:printer' />
//                 </Button>
//               </Grid>
//               <Grid item xs={12} sm={2}>
//                 <Button
//                   fullWidth
//                   color='secondary' size='large' onClick={() => {
//                     reset(emptyValues)
//                   }} type='reset' variant='contained' >
//                   <Icon icon='mdi:download' />

//                 </Button>
//               </Grid>
//             </Grid>
//             <EmployeeMasterTable
//               departments={departmentStore.data}
//               branches={branchStore.data}
//               setBranch={setBranch}
//               setDepartment={setDepartment}
//               setDepartmentObject={setFormDepartmentObject}
//               setBranchObject={setFormBranchObject}
//               employmentTypeOptions={employmentTypeOptions}
//               rows={store.data}
//               reset={reset}
//               formData={formData}
//               setFormData={setFormData}
//               deleteEmployee={deleteEmployee}
//               setWorkingDaysPeriod={setWorkingDaysPeriod}
//             />
//           </CardContent>
//         </Card>
//       </Grid>
//       <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
//     </Grid>
//   )
// }

// export default UserList

// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import Link from 'next/link'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'


// import LinearProgress from '@mui/material/LinearProgress'

// ** Store  Imports
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'

// ** Actions Imports
import { fetchData } from 'src/store/apps/Reports/PayrollSheet'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'


const emptyValues = {
    branch: '',
    department: '',
    bank: ''
}


const schema = yup.object().shape({
    branch: yup.string().required('Required'),
    department: yup.string().required('Required'),
    bank: yup.string().required('Required')
})



import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const PayrollAdvice = () => {


    // ** State
    const [branch, setBranch] = useState<string>('')
    const [branchObject, setBranchObject] = useState<any>({ id: 'All', branchName: 'All Branches' })
    const [department, setDepartment] = useState<string>('')
    const [departmentObject, setDepartmentObject] = useState<any>({ id: 'All', departmentName: 'All Departments' })
    const [bankObject, setBankObject] = useState<any>({ id: 'All', parameterName: 'All' })
    const [bank, setBank] = useState<string>('')
    const [value] = useState<string>('')


    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payrollSheet)

    const departmentStore = useSelector((state: RootState) => state.department)
    const branchStore = useSelector((state: RootState) => state.branches)

    const subParameters = useSelector((state: RootState) => state.subParameterDefinition)
    const mainParameters = useSelector((state: RootState) => state.mainParameterDefinition)


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
        dispatch(
            fetchMainParameterDefinitions({
                q: ''
            })
        )
        dispatch(
            fetchSubParameterDefinition({
                q: ''
            })
        )
        dispatch(
            fetchData({
                branch,
                department,
                bank,
                q: value,
                report: 'sheet'
            })
        )
    }, [dispatch, branch, department, bank, value])

    const filterSubParametersByName = (parentParamName: any) => {
        const parent: any = mainParameters.allData.find((parent: any) => parent.parameterName === parentParamName);
        if (!parent) {
            return [];
        }

        const filteredChild = subParameters.allData.filter((child: any) => child.parameterId === parent.id);

        return filteredChild
    }



    const bankOptions: any = filterSubParametersByName('Bank')

    // const generateExcelFile = () => {
    //     const tableData = [
    //         ['Code', 'Name', 'Deductions', 'Earnings', 'Net'],
    //         ...store.data.map(({ employeeCode, employeeName, totalDeductions, totalEarnings, netPay }) => [
    //             employeeCode,
    //             employeeName,
    //             parseFloat(totalDeductions).toFixed(2),
    //             parseFloat(totalEarnings).toFixed(2),
    //             parseFloat(netPay).toFixed(2),
    //         ]),
    //     ]
    //     const workbook = utils.book_new();
    //     const worksheet = utils.aoa_to_sheet(tableData);
    //     utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //     writeFile(workbook, 'your_file_name.xlsx');
    // };


    const {
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        trigger,
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })


    const handleBranchChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setBranchObject(newValue)
            setBranch(newValue.id)
            setValue('branch', newValue.id)
            trigger('branch')
            setDepartmentObject({ departmentName: '', id: '' })
            setDepartment('')
            setValue('department', '')
        }
    }


    const handleDepartmentChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setDepartmentObject(newValue)
            setDepartment(newValue.id)
            setValue('department', newValue.id)
            trigger('department')
        }
    }

    const handleBankChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setBankObject(newValue)
            setBank(newValue.id)
            setValue('bank', newValue.id)
            trigger('bank')
        }
    }



    const onSubmit = (data: any) => {
        data.branch = branch
        data.department = department
        dispatch(
            fetchData({
                branch,
                department,
                bank,
                q: value,
                currentPlan: ''
            })
        )
    }


    const clearAllFields = () => {
        reset(emptyValues)
        setBranchObject({ id: '', branchName: '' })
        setDepartmentObject({ id: '', departmentName: '' })
        setBankObject({ id: '', parameterName: '' })
        setBranch('')
        setDepartment('')
        setBank('')
        setValue('branch', '')
        setValue('department', '')
        setValue('bank', '')
    }

    return (
        <Grid container spacing={3}>
            <Grid item xl={12} md={12} xs={12}>
                <form noValidate autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader title='Payroll Sheet' />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={branchObject}
                                            options={[{ id: "All", branchName: 'All Branches' }, ...branchStore.data,]}
                                            onChange={handleBranchChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.branchName}
                                            renderInput={params => <TextField error={Boolean(errors.branch)}  {...params} label='Select Branch' />}
                                        />
                                        {errors.branch && <Alert sx={{ my: 4 }} severity='error'>{errors.branch.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={departmentObject}
                                            options={[{ id: 'All', departmentName: 'All Departments' }, ...departmentStore.data.filter((dep: any) => dep.branchId == branch || branchObject.branchName == 'All' || dep.departmentName == 'All'),]}
                                            onChange={handleDepartmentChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.departmentName == value.departmentName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.departmentName}
                                            renderInput={params => <TextField error={Boolean(errors.department)} {...params} label='Select Department' />}
                                        />
                                        {errors.department && <Alert sx={{ my: 4 }} severity='error'>{errors.department.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={bankObject}
                                            options={[{ id: 'All', parameterName: 'All' }, ...bankOptions]}
                                            onChange={handleBankChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.parameterName == value.parameterName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.parameterName}
                                            renderInput={params => <TextField error={Boolean(errors.bank)}  {...params} label='Select Bank' />}
                                        />
                                        {errors.bank && <Alert sx={{ my: 4 }} severity='error'>{errors.bank.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Button
                                        color='primary'
                                        fullWidth size='small'
                                        type='submit'
                                        variant='contained'
                                    >
                                        Preview
                                    </Button>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Button color='secondary' fullWidth size='small' onClick={() => clearAllFields()} type='reset' variant='contained'>
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Button
                                        fullWidth
                                        size={'small'}
                                        target='_blank'
                                        disabled={store.data.length > 0 && (branch && department && bank) ? false : true}
                                        component={Link}
                                        color='primary'
                                        variant='outlined'
                                        href={`/apps/reports/payroll-sheet/print?branchn=${branchObject.branchName}&departmentn=${departmentObject.departmentName}&bankn=${bankObject.parameterName}&branch=${branch}&department=${department}&bank=${bank}`}
                                    >
                                        Print
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
                                        Download
                                    </Button>
                                </Grid> */}
                            </Grid>

                        </CardContent>
                    </Card>
                </form>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} size='small' >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>A/C No.</TableCell>
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
                                    store.data.filter(({ employeeStatusName }) => employeeStatusName == 'Active').map(({ employeeCode, employeeName, employeeAccountNumber, transactions, }: any, index) => {
                                        const netPay = transactions?.filter(({ transaction_code }: any) => transaction_code == '99')[0]?.transaction_amount

                                        return (
                                            <TableRow key={index} >
                                                <TableCell>{`${employeeCode}`}</TableCell>
                                                <TableCell>{`${employeeName}`}</TableCell>
                                                <TableCell>{`${employeeAccountNumber}`}</TableCell>
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
                </Card>
            </Grid>
        </Grid>

    )
}

export default PayrollAdvice


