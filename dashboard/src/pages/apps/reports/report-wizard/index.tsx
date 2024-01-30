// ** React Imports
import { useState, useEffect, SyntheticEvent } from 'react'

import Checkbox from '@mui/material/Checkbox'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import FormControlLabel from '@mui/material/FormControlLabel'
import AccordionDetails from '@mui/material/AccordionDetails'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// import ExcelJS from 'exceljs'

import { utils, writeFile } from 'sheetjs-style';

// ** MUI Imports
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


// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Actions Imports

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'


import Autocomplete from '@mui/material/Autocomplete'

import moment from 'moment'

// import format from 'date-fns/format'
import TextField from '@mui/material/TextField'

const emptyValues = {
    branch: '',
    department: '',
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
const EarningAmountList = ({ expanded, subExpanded, setSubExpanded, setExpanded, onCheckboxChange, checkboxStates, setCheckboxStates }: any) => {


    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }


    const handleSubChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setSubExpanded(isExpanded ? panel : false)
    }


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
    const [expanded, setExpanded] = useState<string | false>(false)
    const [subExpanded, setSubExpanded] = useState<string | false>(false)

    const transactionList = [...employeeList, ...earningQuantityList, ...earningAmountList, ...deductionQuantityList, ...deductionAmountList, ...otherList]

    const [selectedItems, setSelectedItems] = useState<any>([]);
    const [checkboxStates, setCheckboxStates] = useState(
        transactionList.reduce((acc: any, allowance: any) => {
            acc[allowance] = false;

            return acc;
        }, {})
    );

    const resetAll = () => {
        // Reset checkbox states
        setCheckboxStates(
            transactionList.reduce((acc: any, allowance: any) => {
                acc[allowance] = false;

                return acc;
            }, {})
        );

        // Collapse all accordion panels
        setExpanded(false);
        setSubExpanded(false);
    };

    // Rest of your component code...

    const handleCheckboxChange = (item: any) => {
        const selectedChecks: any = Object.keys(item).filter(key => item[key]);
        const updateSelectedItems = [...selectedChecks]
        setSelectedItems(updateSelectedItems);

    };


    const generateExcelFile = (store: any) => {
        const headers = [...selectedItems]
        const merges = [];

        merges.push({ s: { r: 0, c: 0 }, e: { r: 2, c: 6 } }, { s: { r: 3, c: 2 }, e: { r: 3, c: 3 } }, { s: { r: 3, c: 5 }, e: { r: 3, c: 6 } }, { s: { r: 4, c: 2 }, e: { r: 4, c: 3 } }, { s: { r: 4, c: 5 }, e: { r: 4, c: 6 } }, { s: { r: 5, c: 2 }, e: { r: 5, c: 3 } }, { s: { r: 5, c: 5 }, e: { r: 5, c: 6 } });

        const uppercaseHeaders = headers.map(header => header.toUpperCase());

        // @ts-ignore
        const userData = JSON.parse(window.localStorage.getItem('userData'))

        const { start_date: startDate, end_date: endDate } = userData.currentPeriod || { start_date: '', end_date: '' }
        let firstName = 'Default'
        let lastName = 'User'


        if (userData) {
            firstName = userData.first_name
            lastName = userData.last_name
        }

        const capitalizeFirstLetter = (str: any) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }


        const tableData: any = [
            ['DIREDAWA FOOD COMPLEX S.C.', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', '', '', '', '', '', ''],
            ['', 'OPERATOR', `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName)}`, '', 'BRANCH', `${branchObject.branchName}`, ''], ['', 'DATE', `${moment().format("LL")} `, '', 'DEPARTMENT', `${departmentObject.departmentName}`, ''],
            ['', 'PERIOD', `${moment(startDate).format("YYYY/MM/DD") || ""} - ${moment(endDate).format("YYYY/MM/DD") || ""}`, '', 'POWERED BY', 'ASUN SOLUTIONS', ''],
            [],
            [],
            ['NO.', ...uppercaseHeaders]]
        const totalRow = ['TOTAL', '', ''];

        const transactionTotals: { [key: string]: number } = {};
        let employeeDetailsLength = 0

        const selectedTransactions = selectedItems
        .filter((item: any) => item !== 'Code' && item !== 'Name' && item !== 'TIN' && item !== 'Pension' && item !== 'Bank' && item !== 'Pension No.' && item !== 'Account');

        store.data.filter(({ employeeStatusName, transactions }: any) => employeeStatusName === 'Active' && transactions.some((transaction: any) => selectedTransactions.includes(transaction.transaction_name) && Number(transaction.transaction_amount) > 0)).forEach(({ employeeCode, employeeName, tinNumber, bankName, employeeAccountNumber, pensionStatus, pensionNumber, transactions, }: any, index: any) => {
            const employeeDetails = []
            if (selectedItems.includes('Code'))
                employeeDetails.push(employeeCode)
            if (selectedItems.includes('Name'))
                employeeDetails.push(employeeName)
            if (selectedItems.includes('TIN'))
                employeeDetails.push(tinNumber)
            if (selectedItems.includes('Bank'))
                employeeDetails.push(bankName)
            if (selectedItems.includes('Account'))
                employeeDetails.push(employeeAccountNumber)
            if (selectedItems.includes('Pension'))
                employeeDetails.push(pensionStatus)
            if (selectedItems.includes('Pension No.'))
                employeeDetails.push(pensionNumber)

            employeeDetailsLength = employeeDetails.length;

            const selectedTransactionsAmountsFormatted = selectedItems.filter((item: any) => item !== 'Code' && item !== 'Name' && item !== 'TIN' && item !== 'Pension' && item !== 'Bank' && item !== 'Pension No.' && item !== 'Account').map((itemName: any) => {
                const matchingTransaction = transactions.find(({ transaction_name }: any) => transaction_name === itemName);
                const transactionAmount = matchingTransaction ? Number(matchingTransaction.transaction_amount) : '0'

                // Update the running total for each transaction

                // @ts-ignore
                if (transactionTotals[itemName]) {

                    // @ts-ignore
                    transactionTotals[itemName] += transactionAmount;
                } else {

                    // @ts-ignore
                    transactionTotals[itemName] = transactionAmount;
                }

                return {
                    transaction_amount: matchingTransaction
                        ? Number(matchingTransaction.transaction_amount).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })
                        : '0.00',
                    transaction_name: itemName,
                };
            }).sort((a: any, b: any) => {
                const indexA = selectedItems.indexOf(a.transaction_name);
                const indexB = selectedItems.indexOf(b.transaction_name);

                return indexA - indexB;
            }).map(({ transaction_amount }: any) => transaction_amount);



            tableData.push([
                index + 1,
                ...employeeDetails,
                ...selectedTransactionsAmountsFormatted,

            ])
        })


        // Populate the totalRow with the transaction totals
       selectedItems
    .filter((item: any) => item !== 'Code' && item !== 'Name' && item !== 'TIN' && item !== 'Pension' && item !== 'Bank' && item !== 'Pension No.' && item !== 'Account')
    .forEach((itemName: any) => {
        const totalAmount = transactionTotals[itemName];
        const formattedTotal = typeof totalAmount === 'number' && !isNaN(totalAmount)
            ? totalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
            : '0.00';

        totalRow.push(formattedTotal);
    });
    
        // Push the total row to the tableData array

        // Assuming employeeDetails is an array

        // Pushing empty strings based on the length of employeeDetails

        for (let i = 0; i < employeeDetailsLength; ++i) {
            tableData.push("");
        }

        tableData.push(totalRow);

        const workbook = utils.book_new();
        const worksheet = utils.aoa_to_sheet(tableData);


        worksheet['!cols'] = [
            { wpx: 50 }, // No.
            { wpx: 100 }, // Code
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

        console.log(tableData)
        tableData.forEach((row: any, rowIndex: any) => {
            try {
                if (rowIndex !== 0 || rowIndex !== 0) { // Skip the header row
                    row?.forEach((_: any, colIndex: any) => {
                        const cellAddress = utils.encode_cell({ c: colIndex, r: rowIndex });
                        if (rowIndex === tableData.length - 1) {

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
                    row?.forEach((_: any, colIndex: any) => {
                        const cellAddress = utils.encode_cell({ c: colIndex, r: rowIndex });
                        worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: headerStyle });
                    });
                }

                if (rowIndex == 0) { // Skip the header row
                    row?.forEach((_: any, colIndex: any) => {
                        const cellAddress = utils.encode_cell({ c: colIndex, r: rowIndex });
                        worksheet[cellAddress] = Object.assign({}, worksheet[cellAddress], { s: headerStyle });

                    });
                }

            } catch (e) {
                console.log(row)

            }


        });

        if (merges.length > 0) {
            worksheet['!merges'] = merges;
        }


        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        writeFile(workbook, `Report ${moment().format("LL")}.xlsx`);
    };

    // const exportToExcel = (store: any) => {
    //     const workbook = new ExcelJS.Workbook();
    //     const sheet = workbook.addWorksheet("Hello", {
    //         headerFooter: { firstHeader: "Hello Exceljs", firstFooter: "Hello World" },
    //     });
    //     sheet.properties.defaultRowHeight = 20;

    //     // Add 4 empty rows at the beginning
    //     selectedItems.map((item: any, index: any) => {
    //         sheet.addRow([])
    //     });

    //     // Apply styling to the empty rows

    //     // Define columns based on selected items starting from the 5th row
    //     selectedItems.map((item: any, index: any) => {
    //         return {
    //             header: item,
    //             key: item.toLowerCase(),
    //         };
    //     });

    //     // Add data rows starting from the 5th row
    //     store.data.filter(({ employeeStatusName }: any) => employeeStatusName == 'Active').forEach(
    //         ({ employeeCode, employeeName, tinNumber, bankName, employeeAccountNumber, pensionStatus, pensionNumber, transactions, }: any, index: any) => {
    //             const employeeDetails = {
    //                 code: employeeCode,
    //                 name: employeeName,
    //             };
    //             sheet.addRow(employeeDetails);
    //         }
    //     );

    //     // Export the workbook to Excel
    //     workbook.xlsx.writeBuffer().then(function (data) {
    //         const blob = new Blob([data], {
    //             type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //         });
    //         const url = window.URL.createObjectURL(blob);
    //         const anchor = document.createElement("a");
    //         anchor.href = url;
    //         anchor.download = "download.xlsx";
    //         anchor.click();
    //         window.URL.revokeObjectURL(url);
    //     });
    // };

    // @ts-ignore

    // ** State

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
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })




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
                                <Grid item sm={12}>
                                    <EarningAmountList subExpanded={subExpanded} setSubExpanded={setSubExpanded} expanded={expanded} setExpanded={setExpanded} checkboxStates={checkboxStates} setCheckboxStates={setCheckboxStates} resetAll={resetAll} onCheckboxChange={(item: any) => handleCheckboxChange(item)} />
                                </Grid>

                                {/* <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <Button size='small' color='primary' fullWidth type='submit' variant='contained' sx={{ mb: 7 }}>
                                            Preview
                                        </Button>
                                    </FormControl>
                                </Grid> */}

                                <Grid item xs={12} sm={4}>
                                    <Button
                                        size='small'
                                        fullWidth
                                        disabled={(store.data.length > 0 && selectedItems.length > 0) ? false : true}
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
                                            resetAll()
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

            {/* <Grid item xs={12} md={12} lg={7}>
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
            <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}

        </Grid>
    )
}

export default UserList
