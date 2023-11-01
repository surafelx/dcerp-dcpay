// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'

import moment from 'moment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

type Order = 'asc' | 'desc'


interface EnhancedTableToolbarProps {
    numSelected: number
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }

    return 0
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order

        return a[1] - b[1]
    })

    return stabilizedThis.map(el => el[0])
}

const headCells: readonly any[] = [
    {
        id: 'count',
        numeric: false,
        disablePadding: true,
        label: 'Count'
    },
    {
        id: 'period',
        numeric: false,
        disablePadding: true,
        label: 'Period'
    },
    {
        id: 'year',
        numeric: false,
        disablePadding: true,
        label: 'Year'
    },
    {
        id: 'month',
        numeric: false,
        disablePadding: true,
        label: 'Month'
    },
    {
        id: 'start',
        numeric: false,
        disablePadding: true,
        label: 'Start'
    },
    {
        id: 'end',
        numeric: false,
        disablePadding: true,
        label: 'End'
    },
    {
        id: 'paid',
        numeric: false,
        disablePadding: true,
        label: 'Paid'
    },
    {
        id: 'current',
        numeric: false,
        disablePadding: true,
        label: 'Current'
    },
    {
        id: 'protein',
        numeric: false,
        disablePadding: true,
        label: 'Back'
    },
    {
        id: 'protein',
        numeric: false,
        disablePadding: true,
        label: 'Proof'
    },
    {
        id: 'final',
        numeric: false,
        disablePadding: true,
        label: 'Final'
    },
    {
        id: 'process',
        numeric: false,
        disablePadding: true,
        label: 'Process'
    },
    {
        id: 'report',
        numeric: false,
        disablePadding: true,
        label: 'Report'
    }
]

function EnhancedTableHead(props: any) {
    // ** Props
    const { order, orderBy, onRequestSort } = props
    const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        align={'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            onClick={createSortHandler(headCell.id)}
                            direction={orderBy === headCell.id ? order : 'asc'}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component='span' sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    // ** Prop
    const { numSelected } = props

    return (
        <Toolbar
            sx={{
                px: theme => `${theme.spacing(5)} !important`,
                ...(numSelected > 0 && {
                    bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    Periods
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title='Delete'>
                    <Icon icon='mdi:delete-outline' />

                </Tooltip>
            ) : null}
        </Toolbar>
    )
}

const EnhancedTable = ({ rows }: any) => {
    // ** States
    const [page, setPage] = useState<number>(0)
    const [order, setOrder] = useState<Order>('asc')
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)
    const [orderBy, setOrderBy] = useState<any>('count')
    const [selected] = useState<readonly string[]>([])

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    return (
        <>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 950 }} size={'small'} aria-labelledby='tableTitle'>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        rowCount={rows.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {

                                return (
                                    <TableRow
                                        tabIndex={index}
                                        key={row.name}
                                        sx={{
                                            height: 5,
                                        }}
                                    >
                                        <TableCell sx={{ fontSize: 11 }}>{row.periodCount}</TableCell>
                                        <TableCell sx={{ fontSize: 11 }}>{row.periodName}</TableCell>
                                        <TableCell sx={{ fontSize: 11 }}>{row.periodYear}</TableCell>
                                        <TableCell sx={{ fontSize: 11 }}>{row.monthName}</TableCell>
                                        <TableCell sx={{ fontSize: 11 }}> {`${moment(row.startDate).format("YYYY/MM/DD")}`}</TableCell>
                                        <TableCell sx={{ fontSize: 11 }}> {`${moment(row.endDate).format("YYYY/MM/DD")}`}</TableCell>
                                        <TableCell sx={{ fontSize: 11 }}>{row.periodPaid ? (

                                            <Icon icon='mdi:check-bold' fontSize={11} color={'green'} />
                                        ) : (

                                            <Icon icon='mdi:close-thick' fontSize={11} color={'red'} />
                                        )}
                                        </TableCell>
                                        <TableCell>{row.periodCurrent ? (

                                            <Icon icon='mdi:check-bold' fontSize={11} color={'green'} />

                                            ) : (

                                            <Icon icon='mdi:close-thick' fontSize={11} color={'red'} />

                                        )}
                                        </TableCell>
                                        <TableCell>{row.periodBack ? (

                                            <Icon icon='mdi:check-bold' fontSize={11} color={'green'} />

                                        ) : (

                                            <Icon icon='mdi:close-thick' fontSize={11} color={'red'} />

                                        )}
                                        </TableCell>
                                        <TableCell>{row.periodProof ? (

                                            <Icon icon='mdi:check-bold' fontSize={11} color={'green'} />

                                        ) : (

                                            <Icon icon='mdi:close-thick' fontSize={11} color={'red'} />

                                        )}
                                        </TableCell>
                                        <TableCell>{row.periodFinal ? (

                                            <Icon icon='mdi:check-bold' fontSize={11} color={'green'} />

                                        ) : (

                                            <Icon icon='mdi:close-thick' fontSize={11} color={'red'} />

                                        )}
                                        </TableCell>
                                        <TableCell>{row.periodProcess ? (

                                            <Icon icon='mdi:check-bold' fontSize={11} color={'green'} />

                                        ) : (

                                            <Icon icon='mdi:close-thick' fontSize={11} color={'red'} />

                                        )}
                                        </TableCell>
                                        <TableCell>{row.periodReport ? (

                                            <Icon icon='mdi:check-bold' fontSize={11} color={'green'} />

                                        ) : (

                                            <Icon icon='mdi:close-thick' fontSize={11} color={'red'} />

                                        )}
                                        </TableCell>

                                    </TableRow>
                                )
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                sx={{
                                    height: 10 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                page={page}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default EnhancedTable
