// ** React Imports
import { useEffect, useState, MouseEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'

type Order = 'asc' | 'desc'


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
        id: 'code',
        numeric: false,
        disablePadding: true,
        label: 'Code'
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name'
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: true,
        label: 'Actions'
    },

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

const EnhancedTable = ({ rows, reset, formData, handleClickOpen, setAlertText, setFormData, storeProcess, deleteBranch }: any) => {
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


    const RowOptions = ({ id, branchCode, branchName }: any) => {
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
            reset(
                {
                    id,
                    branchCode,
                    branchName
                }
            )
        }

        useEffect(() => {
            if (formData) {
                setFormData(formData);
            }
        }, []);

        const handleDelete = () => {
            dispatch(deleteBranch(id))
            setAlertText(`${branchCode} ${branchName} has been successfully deleted.`)
            if (!storeProcess) {
                handleClickOpen()
            }
            handleRowOptionsClose()
        }


        return (
            <>
                <div style={{ fontSize: 10 }} onClick={handleRowOptionsClick}>
                    {/* <DotsVertical /> */}
                    Options
                </div>
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

    return (
        <>
            {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size={'small'} aria-labelledby='tableTitle'>
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
                                            padding: 0
                                        }}
                                    >
                                        <TableCell sx={{ fontSize: 11 }}>{row.branchCode}</TableCell>
                                        <TableCell sx={{ fontSize: 11 }}>{row.branchName}</TableCell>
                                        <TableCell sx={{ fontSize: 11 }}>
                                            <RowOptions
                                                id={row.id}
                                                branchCode={row.branchCode}
                                                branchName={row.branchName}
                                            /></TableCell>
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
