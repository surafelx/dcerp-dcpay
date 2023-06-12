// ** React Imports
import { useState, useEffect, MouseEvent } from 'react'

// ** Next Import
import Link from 'next/link'

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
import CardContent from '@mui/material/CardContent'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchData, deletePeriod } from 'src/store/apps/File/Period'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { PeriodType } from 'src/types/apps/File/periodTypes'


import AddPeriod from 'src/views/dc-pay/forms/File/Period/AddPeriod'





interface CellType {
    row: PeriodType
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
    const [role] = useState<string>('')
    const [value] = useState<string>('')
    const [status] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)

    const [formData, setFormData] = useState({
        id: '',
        firstTransaction: '',
        secondTransaction: '',
        thirdTransaction: '',
        calculationUnit: '',
        firstOption: '',
        secondOption: '',
        rate: ''
    });


    const RowOptions = ({ id,
        firstTransaction,
        secondTransaction,
        thirdTransaction,
        calculationUnit,
        firstOption,
        secondOption,
        rate }: any) => {
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
                    firstTransaction,
                    secondTransaction,
                    thirdTransaction,
                    calculationUnit,
                    firstOption,
                    secondOption,
                    rate
                }
            )
        }


        useEffect(() => {
            if (formData) {
                setFormData(formData);
            }
        }, []);

        const handleDelete = () => {
            dispatch(deletePeriod(id))
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
            minWidth: 230,
            headerName: 'Period',
            field: 'period',
            renderCell: ({ row }: CellType) => {
                const {  firstTransactionName } = row
                
return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${firstTransactionName}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            headerName: 'Year',
            field: 'year',
            renderCell: ({ row }: CellType) => {
                const {  firstTransactionName } = row
                
return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${firstTransactionName}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            headerName: 'Month Name',
            field: 'month',
            renderCell: ({ row }: CellType) => {
                const {  firstTransactionName } = row
                
return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${firstTransactionName}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            headerName: 'Start',
            field: 'start',
            renderCell: ({ row }: CellType) => {
                const {  firstTransactionName } = row
                
return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${firstTransactionName}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            headerName: 'End',
            field: 'end',
            renderCell: ({ row }: CellType) => {
                const {  firstTransactionName } = row
                
return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${firstTransactionName}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            field: 'paid',
            headerName: 'Paid',
            renderCell: ({ row }: CellType) => {
                const {  firstTransactionName } = row
                
return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${firstTransactionName}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 250,
            field: 'current',
            headerName: 'Current',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography noWrap variant='body2'>
                        {row.secondTransactionName}
                    </Typography>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 50,
            field: 'back',
            headerName: 'Back Period',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography noWrap variant='body2'>
                        {row.firstOptionName}
                    </Typography>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 250,
            field: 'proof',
            headerName: 'Proof',
            renderCell: ({ row }: CellType) => {
                return (
                    <Typography noWrap variant='body2'>
                        {row.calculationUnitName}
                    </Typography>
                )
            }
        },
        {
            flex: 0.15,
            minWidth: 150,
            field: 'final',
            headerName: 'Final',
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {row.thirdTransactionName}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            minWidth: 150,
            field: 'process',
            headerName: 'Process',
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {row.secondOptionName}
                        </Typography>
                    </Box>
                )
            }
        },
        {
            flex: 0.15,
            minWidth: 150,
            field: 'report',
            headerName: 'Report',
            renderCell: ({ row }: CellType) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {row.rate}
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
                    firstTransaction={row.firstTransaction}
                    secondTransaction={row.secondTransaction}
                    thirdTransaction={row.thirdTransaction}
                    calculationUnit={row.calculationUnit}
                    firstOption={row.firstOption}
                    secondOption={row.secondOption}
                    rate={row.rate}
                />)
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.period)

    useEffect(() => {
        dispatch(
            fetchData({
                role,
                status,
                q: value,
                currentPlan: ''
            })
        )
    }, [dispatch, role, status, value])

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <AddPeriod formData={formData} />
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid item xs={12}>
                            <DataGrid
                                autoHeight
                                rows={store.data}

                                // @ts-ignore */
                                columns={columns}
                                checkboxSelection
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
