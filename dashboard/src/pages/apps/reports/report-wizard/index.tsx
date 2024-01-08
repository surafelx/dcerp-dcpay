// ** React Imports
import { useState, useEffect, SyntheticEvent } from 'react'

import Checkbox from '@mui/material/Checkbox'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import FormControlLabel from '@mui/material/FormControlLabel'
import AccordionDetails from '@mui/material/AccordionDetails'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


import { utils, writeFile } from 'sheetjs-style';

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/Reports/PayrollSheet'
import { fetchData as fetchBranch } from 'src/store/apps/File/EntityManagement/Branches'
import { fetchData as fetchDepartment } from 'src/store/apps/File/EntityManagement/Department'


import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Actions Imports

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

import Autocomplete from '@mui/material/Autocomplete'


// import format from 'date-fns/format'
import TextField from '@mui/material/TextField'

const emptyValues = {
    branch: '',
    department: '',
    format: '',
    layout: '',

}


const employeeList = [
    'Code',
    'Name',
    'TIN',
    'Bank',
    'Account',
    'Pension',
    'Pension No.'
]

const deductionQuantityList = [
    'Absence Hours',
    'Credit Ass. Vol. Saving Rate',
    'Leave Hours'
]

const earningQuantityList = [
    'Days Worked',
    'Overtime Hours 150%',
    'Overtime Hours 175%',
    'Overtime Hours 200%',
    'Overtime Hours 250%',
];

const earningAmountList = [
    'Salary',
    'Position Allowance',
    'Acting Allowance',
    'Taxi Allowance',
    'House Allowance',
    'Overtime Amount 150%',
    'Overtime Amount 175%',
    'Overtime Amount 200%',
    'Overtime Amount 250%',
    'Medical Allowance',
    'Other Earnings',
    'Indemnity Allowance',
    'Hardship Allowance 15%',
    'Other Allowance',
    'Hardship Allowance 20%',
    'Hardship Allowance 20% Input',
    'Hardship Allowance 15% Input',
];

const deductionAmountList = [
    'Income Tax',
    'Pension Company',
    'Pension Employee',
    'Labour Union',
    'Telephone Benefits',
    'Abay Dam',
    'Telephone Expenses',
    'Medical Expenses',
    'Fine',
    'Other Loan',
    'Long Term Loan',
    'Credit Short Loan',
    'Credit Sales',
    'Credit Association Forced Saving',
    'Credit Ass. Vol. Saving Amount',
    'Edir',
    'Other Deduction',
    'Court',
    'Red Cross',
    'Advance',
    'Cost Sharing',
    'Contribution T-Shirt',
    'Last Overpay',
    'Absence Amount',
];

const otherList = [
    'Basic Salary',
    'Family',
    'Total Overtime',
    'Gross Taxable Salary',
    'Gross Salary',
    'Leave Amount',
    'Overpay',
    'Net Pay',
    'Contribution',
    'Medical Contribution'
]
const EarningAmountList = ({ transactionList, employeeList, earningQuantityList, onCheckboxChange, }: any) => {
    const [expanded, setExpanded] = useState<string | false>(false)
    const [subExpanded, setSubExpanded] = useState<string | false>(false)

    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }


    const handleSubChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setSubExpanded(isExpanded ? panel : false)
    }

    const [checkboxStates, setCheckboxStates] = useState(
        transactionList.reduce((acc: any, allowance: any) => {
            acc[allowance] = false;

            return acc;
        }, {})
    );
    const handleItemChecked = (selectedItem: any) => {
        setCheckboxStates((prevCheckboxStates: any) => {
            const updatedCheckboxStates = {
                ...prevCheckboxStates,
                [selectedItem]: !prevCheckboxStates[selectedItem],
            };

            // Notify parent component about the checkbox change using the updated state
            onCheckboxChange(updatedCheckboxStates);

            return updatedCheckboxStates;
        });
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    id='actions-panel-header-3'
                    aria-controls='actions-panel-content-3'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                >
                    <FormControlLabel
                        label='Employee'
                        aria-label='Acknowledge'
                        control={<></>}
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    {employeeList.map((allowance: any, index: any) => (
                        <div key={index}>
                            <FormControlLabel
                                label={allowance}
                                aria-label='Acknowledge'
                                control={<Checkbox
                                    checked={checkboxStates[allowance]}
                                    onChange={() => handleItemChecked(allowance)}
                                    disableRipple />}
                                onClick={event => event.stopPropagation()}
                                onFocus={event => event.stopPropagation()}
                            />
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    id='actions-panel-header-3'
                    aria-controls='actions-panel-content-3'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                >
                    <FormControlLabel
                        label='Earning'
                        aria-label='Acknowledge'
                        control={<></>}
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    <Accordion expanded={subExpanded === 'subPanel1'} onChange={handleSubChange('subPanel1')}>
                        <AccordionSummary
                            id='actions-panel-header-3'
                            aria-controls='actions-panel-content-3'
                            expandIcon={<Icon icon='mdi:chevron-down' />}
                        >
                            <FormControlLabel
                                label='Earning Quantity'
                                aria-label='Acknowledge'
                                control={<></>}
                                onClick={event => event.stopPropagation()}
                                onFocus={event => event.stopPropagation()}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            {earningQuantityList.map((allowance: any, index: any) => (
                                <div key={index}>
                                    <FormControlLabel
                                        label={allowance}
                                        aria-label='Acknowledge'
                                        control={<Checkbox
                                            checked={checkboxStates[allowance]}
                                            onChange={() => handleItemChecked(allowance)}
                                            disableRipple />}
                                        onClick={event => event.stopPropagation()}
                                        onFocus={event => event.stopPropagation()}
                                    />
                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={subExpanded === 'subPanel2'} onChange={handleSubChange('subPanel2')}>
                        <AccordionSummary
                            id='actions-panel-header-3'
                            aria-controls='actions-panel-content-3'
                            expandIcon={<Icon icon='mdi:chevron-down' />}
                        >
                            <FormControlLabel
                                label='Earning Amount'
                                aria-label='Acknowledge'
                                control={<></>}
                                onClick={event => event.stopPropagation()}
                                onFocus={event => event.stopPropagation()}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            {earningAmountList.map((allowance: any, index: any) => (
                                <div key={index}>
                                    <FormControlLabel
                                        label={allowance}
                                        aria-label='Acknowledge'
                                        control={<Checkbox
                                            checked={checkboxStates[allowance]}
                                            onChange={() => handleItemChecked(allowance)}
                                            disableRipple />}
                                        onClick={event => event.stopPropagation()}
                                        onFocus={event => event.stopPropagation()}
                                    />
                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>

                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    id='actions-panel-header-3'
                    aria-controls='actions-panel-content-3'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                >
                    <FormControlLabel
                        label='Deduction'
                        aria-label='Acknowledge'
                        control={<></>}
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    <Accordion expanded={subExpanded === 'subPanel3'} onChange={handleSubChange('subPanel3')}>
                        <AccordionSummary
                            id='actions-panel-header-3'
                            aria-controls='actions-panel-content-3'
                            expandIcon={<Icon icon='mdi:chevron-down' />}
                        >
                            <FormControlLabel
                                label='Deduction Quantity'
                                aria-label='Acknowledge'
                                control={<></>}
                                onClick={event => event.stopPropagation()}
                                onFocus={event => event.stopPropagation()}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            {deductionQuantityList.map((allowance: any, index: any) => (
                                <div key={index}>
                                    <FormControlLabel
                                        label={allowance}
                                        aria-label='Acknowledge'
                                        control={<Checkbox
                                            checked={checkboxStates[allowance]}
                                            onChange={() => handleItemChecked(allowance)}
                                            disableRipple />}
                                        onClick={event => event.stopPropagation()}
                                        onFocus={event => event.stopPropagation()}
                                    />
                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={subExpanded === 'subPanel4'} onChange={handleSubChange('subPanel4')}>
                        <AccordionSummary
                            id='actions-panel-header-3'
                            aria-controls='actions-panel-content-3'
                            expandIcon={<Icon icon='mdi:chevron-down' />}
                        >
                            <FormControlLabel
                                label='Deduction Amount'
                                aria-label='Acknowledge'
                                control={<></>}
                                onClick={event => event.stopPropagation()}
                                onFocus={event => event.stopPropagation()}
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            {deductionAmountList.map((allowance: any, index: any) => (
                                <div key={index}>
                                    <FormControlLabel
                                        label={allowance}
                                        aria-label='Acknowledge'
                                        control={<Checkbox
                                            checked={checkboxStates[allowance]}
                                            onChange={() => handleItemChecked(allowance)}
                                            disableRipple />}
                                        onClick={event => event.stopPropagation()}
                                        onFocus={event => event.stopPropagation()}
                                    />
                                </div>
                            ))}
                        </AccordionDetails>
                    </Accordion>

                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    id='actions-panel-header-3'
                    aria-controls='actions-panel-content-3'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                >
                    <FormControlLabel
                        label='Other'
                        aria-label='Acknowledge'
                        control={<></>}
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    {otherList.map((allowance: any, index: any) => (
                        <div key={index}>
                            <FormControlLabel
                                label={allowance}
                                aria-label='Acknowledge'
                                control={<Checkbox
                                    checked={checkboxStates[allowance]}
                                    onChange={() => handleItemChecked(allowance)}
                                    disableRipple />}
                                onClick={event => event.stopPropagation()}
                                onFocus={event => event.stopPropagation()}
                            />
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>

        </div>
    );
};

const UserList = () => {

    const [selectedItems, setSelectedItems] = useState<any>([]);

    // Rest of your component code...

    const handleCheckboxChange = (item: any) => {
        const selectedChecks: any = Object.keys(item).filter(key => item[key]);
        const updateSelectedItems = [...selectedChecks]
        console.log(updateSelectedItems)
        setSelectedItems(updateSelectedItems);

    };


    const generateExcelFile = (store: any) => {
        const headers = [...selectedItems]

        const uppercaseHeaders = headers.map(header => header.toUpperCase());

        const tableData: any = [['NO.', ...uppercaseHeaders], [], []]

        store.data.filter(({ employeeStatusName }: any) => employeeStatusName == 'Active').forEach(({ employeeCode, employeeName, transactions, }: any, index: any) => {
            const employeeDetails = []
            if (selectedItems.includes('Code'))
                employeeDetails.push(employeeCode)
            if (selectedItems.includes('Name'))
                employeeDetails.push(employeeName)
            console.log(transactions.filter(({ transaction_name }: any) => transaction_name == 'Overtime Amount 150%'))
            const selectedTransactionsAmountsFormatted = selectedItems.filter((item: any) => item !== 'Code' && item !== 'Name').map((itemName: any) => {
                const matchingTransaction = transactions.find(({ transaction_name }: any) => transaction_name === itemName);

                return {
                    transaction_amount: matchingTransaction
                        ? Number(matchingTransaction.transaction_amount).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                        : '0.00',
                    transaction_name: itemName,
                };
            })
                .sort((a: any, b: any) => {
                    const indexA = selectedItems.indexOf(a.transaction_name);
                    const indexB = selectedItems.indexOf(b.transaction_name);

                    return indexA - indexB;
                })
                .map(({ transaction_amount }: any) => transaction_amount);


            console.log(selectedTransactionsAmountsFormatted, selectedItems)

            tableData.push([
                index + 1,
                ...employeeDetails,
                ...selectedTransactionsAmountsFormatted
            ])
        })

        const workbook = utils.book_new();
        const worksheet = utils.aoa_to_sheet(tableData);

        worksheet['!cols'] = [
            { wpx: 30 }, // No.
            { wpx: 50 }, // Code
            { wpx: 150 }, // Name
            { wpx: 100 }, // Deductions
            { wpx: 100 }, // Earnings
            { wpx: 100 }, // Net
            { wpx: 100 }, // Name
            { wpx: 100 }, // Deductions
            { wpx: 100 }, // Earnings
            { wpx: 100 }, // Net
            { wpx: 100 }, // Name
            { wpx: 100 }, // Deductions
            { wpx: 100 }, // Earnings
            { wpx: 100 }, // Net
            { wpx: 100 }, // Name
            { wpx: 100 }, // Deductions
            { wpx: 100 }, // Earnings
            { wpx: 100 }, // Net
            { wpx: 100 }, // Deductions
            { wpx: 100 }, // Earnings
            { wpx: 100 }, // Net
            { wpx: 100 }, // Name
            { wpx: 100 }, // Deductions
            { wpx: 100 }, // Earnings
            { wpx: 100 }, // Net
            { wpx: 100 }, // Name
            { wpx: 100 }, // Deductions
            { wpx: 100 }, // Earnings
            { wpx: 100 }, // Net
            { wpx: 100 }, // Name
            { wpx: 100 }, // Deductions
            { wpx: 100 }, // Earnings
            { wpx: 100 }, // Net
            { wpx: 100 }, // Deductions
            { wpx: 100 }, // Earnings
            { wpx: 100 }, // Net
            { wpx: 100 }, // Name
            { wpx: 100 }, // Deductions
            { wpx: 100 }, // Earnings
            { wpx: 100 }, // Net
        ];


        const headerStyle = {
            font: { bold: true },
            border: {
                top: { style: 'thin', color: { auto: 1 } },
                bottom: { style: 'thin', color: { auto: 1 } },
                left: { style: 'thin', color: { auto: 1 } },
                right: { style: 'thin', color: { auto: 1 } },
            },
            alignment: { horizontal: 'center', vertical: 'center' },
        };

        const numberStyle = {
            alignment: { horizontal: 'right' },
            border: {
                top: { style: 'thin', color: { auto: 1 } },
                bottom: { style: 'thin', color: { auto: 1 } },
                left: { style: 'thin', color: { auto: 1 } },
                right: { style: 'thin', color: { auto: 1 } },
            },
            font: { bold: true },
        }

        const dataRowStyle = {
            font: { bold: true },
            border: {
                top: { style: 'thin', color: { auto: 1 } },
                bottom: { style: 'thin', color: { auto: 1 } },
                left: { style: 'thin', color: { auto: 1 } },
                right: { style: 'thin', color: { auto: 1 } },
            },
        }

        tableData.forEach((row: any, rowIndex: any) => {
            const isTotalRow = row[0] === 'TOTAL';

            if (rowIndex !== 0) { // Skip the header row
                row.forEach((_: any, colIndex: any) => {
                    const cellAddress = utils.encode_cell({ c: colIndex, r: rowIndex });
                    if (isTotalRow || rowIndex === tableData.length - 1) {

                        // Apply totalStyle for total rows and the last row
                        worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: dataRowStyle });
                    } else if (colIndex >= 3) { // Apply numberStyle for data rows
                        worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: numberStyle });
                    } else {
                        worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: dataRowStyle });
                    }
                });
            }

            if (rowIndex >= 0 && rowIndex <= 2) { // Rows 1 to 3
                row.forEach((_: any, colIndex: any) => {
                    const cellAddress = utils.encode_cell({ c: colIndex, r: rowIndex });
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: headerStyle });
                });
            }

            if (rowIndex == 0) { // Skip the header row
                row.forEach((_: any, colIndex: any) => {
                    const cellAddress = utils.encode_cell({ c: colIndex, r: rowIndex });
                    worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: headerStyle });

                });
            }

        });



        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        writeFile(workbook, `Payroll Detail Styled.xlsx`);
    };


    // @ts-ignore

    // ** State

    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
    const [branch, setBranch] = useState<string>('All')
    const [branchObject, setBranchObject] = useState<any>({ id: 'All', branchName: 'All Branches' })
    const [department, setDepartment] = useState<string>('All')
    const [departmentObject, setDepartmentObject] = useState<any>({ id: 'All', departmentName: 'All Departments' })


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.payrollSheet)

    const branchStore = useSelector((state: RootState) => state.branches)
    const departmentStore = useSelector((state: RootState) => state.department)

    const schema = yup.object().shape({
        branch: yup.string().required('Required'),
        department: yup.string().required('Required'),
        layout: yup.string().required('Required'),
        format: yup.string().required('Required'),

    })

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
            fetchData({
                branch,
                department,
                currentPlan: ''
            })
        )
    }, [dispatch, branch, department])

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })




    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)




    const onSubmit = (data: any) => {
        data.branch = branch
        data.department = department
        dispatch(
            fetchData({
                branch,
                department,
                currentPlan: ''
            })
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


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={5}>
                <Card>
                    <CardHeader title="Report Wizard" />
                    <CardContent    >
                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth >
                                        <Controller
                                            name='layout'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <>
                                                    <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Layout *</InputLabel>
                                                    <Select
                                                        size={'small'}
                                                        label='Layout *'
                                                        value={value}
                                                        id='demo-simple-select-autoWidth'
                                                        labelId='demo-simple-select-autoWidth-label'
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(errors.layout)}
                                                    >
                                                        <MenuItem value={'portrait'}>Portrait</MenuItem>
                                                        <MenuItem value={'landscape'}>Landscape</MenuItem>
                                                    </Select>
                                                </>

                                            )}
                                        />
                                        {errors.layout && <Alert sx={{ my: 4 }} severity='error'>{errors.layout.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth >
                                        <Controller
                                            name='format'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <>
                                                    <InputLabel size={'small'} id='demo-simple-select-autoWidth-label'>Format *</InputLabel>
                                                    <Select
                                                        size={'small'}
                                                        label='Format *'
                                                        value={value}
                                                        id='demo-simple-select-autoWidth'
                                                        labelId='demo-simple-select-autoWidth-label'
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(errors.format)}
                                                    >
                                                        <MenuItem value={'XlSX'}>XLSX</MenuItem>
                                                        <MenuItem value={'PDF'}>PDF</MenuItem>
                                                    </Select>
                                                </>

                                            )}
                                        />
                                        {errors.format && <Alert sx={{ my: 4 }} severity='error'>{errors.format.message}</Alert>}
                                    </FormControl>
                                </Grid>

                                <Grid item sm={12}>
                                    <EarningAmountList employeeList={employeeList} earningQuantityList={earningQuantityList} deductionQuantityList={deductionQuantityList} earningAmountList={earningAmountList} deductionAmountList={deductionAmountList} transactionList={[...employeeList, ...earningQuantityList, ...earningAmountList, ...deductionQuantityList, ...deductionAmountList, ...otherList]} onCheckboxChange={(item: any) => handleCheckboxChange(item)} />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <Button size='small' color='primary' fullWidth type='submit' variant='contained' sx={{ mb: 7 }}>
                                            Preview
                                        </Button>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Button
                                        size='small'
                                        fullWidth
                                        disabled={store.data.length > 0 ? false : true}
                                        color='primary'
                                        variant='outlined'
                                        onClick={() => generateExcelFile(store)}
                                    >
                                        Download
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <Button size='small' color='secondary' fullWidth onClick={() => {
                                            reset(emptyValues)
                                        }} type='reset' variant='contained' sx={{ mb: 7 }}>
                                            Reset
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent   >
                </Card>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
                <Card>
                    <CardHeader title='Report View' />

                    <CardContent>
                        <Grid sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }} container spacing={6}>
                            <Grid item xs={12} sm={4}>

                            </Grid>
                            <Grid item xs={12} sm={4}>

                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button
                                    fullWidth
                                    color='secondary' size='large' onClick={() => {
                                        reset(emptyValues)
                                    }} type='reset' variant='contained' >
                                    <Icon icon='mdi:printer' />
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button
                                    fullWidth
                                    color='secondary' size='large' onClick={() => {
                                        reset(emptyValues)
                                    }} type='reset' variant='contained' >
                                    <Icon icon='mdi:download' />

                                </Button>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Grid>
            <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        </Grid>
    )
}

export default UserList
