// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/File/Period'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { PeriodType } from 'src/types/apps/File/periodTypes'

// import AddPeriod from 'src/views/dc-pay/forms/File/Period/AddPeriod'

import moment from 'moment'

import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'


interface CellType {
    row: PeriodType
}

const UserList = () => {

    // ** State
    const [role] = useState<string>('')
    const [value] = useState<string>('')
    const [status] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)

    // const [formData, ] = useState({
    //     id: '',
    //     firstTransaction: '',
    //     secondTransaction: '',
    //     thirdTransaction: '',
    //     calculationUnit: '',
    //     firstOption: '',
    //     secondOption: '',
    //     rate: ''
    // });


    const columns = [
        {
            headerName: 'Count',
            field: 'periodCount',
            renderCell: ({ row }: CellType) => {
                const { periodCount } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${periodCount}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            headerName: 'Period',
            field: 'periodName',
            renderCell: ({ row }: CellType) => {
                const { periodName } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${periodName}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            headerName: 'Year',
            field: 'periodYear',
            renderCell: ({ row }: CellType) => {
                const { periodYear } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${periodYear}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            headerName: 'Month',
            field: 'monthName',
            renderCell: ({ row }: CellType) => {
                const { monthName } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${monthName}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            headerName: 'Start',
            field: 'startDate',
            renderCell: ({ row }: CellType) => {
                const { startDate } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${moment(startDate).format("YYYY/MM/DD")}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            headerName: 'End',
            field: 'end',
            renderCell: ({ row }: CellType) => {
                const { endDate } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${moment(endDate).format("YYYY/MM/DD")}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: 'periodPaid',
            headerName: 'Paid',
            renderCell: ({ row }: CellType) => {
                const { periodPaid } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            {periodPaid ? (
                                <IconButton>
                                    <Icon icon='mdi:check-bold' fontSize={20} color={'green'} />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <Icon icon='mdi:close-thick' fontSize={20} color={'red'} />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: 'periodCurrent',
            headerName: 'Current',
            renderCell: ({ row }: CellType) => {
                const { periodCurrent } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {periodCurrent ? (
                                    <IconButton>
                                        <Icon icon='mdi:check-bold' fontSize={20} color={'green'} />
                                    </IconButton>
                                ) : (
                                    <IconButton>
                                        <Icon icon='mdi:close-thick' fontSize={20} color={'red'} />
                                    </IconButton>
                                )}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: 'periodBack',
            headerName: 'Back',
            renderCell: ({ row }: CellType) => {
                const { periodBack } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {periodBack ? (
                                    <IconButton>
                                        <Icon icon='mdi:check-bold' fontSize={20} color={'green'} />
                                    </IconButton>
                                ) : (
                                    <IconButton>
                                        <Icon icon='mdi:close-thick' fontSize={20} color={'red'} />
                                    </IconButton>
                                )}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: 'periodProof',
            headerName: 'Proof',
            renderCell: ({ row }: CellType) => {
                const { periodProof } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            {periodProof ? (
                                <IconButton>
                                    <Icon icon='mdi:check-bold' fontSize={20} color={'green'} />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <Icon icon='mdi:close-thick' fontSize={20} color={'red'} />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: 'periodFinal',
            headerName: 'Final',
            renderCell: ({ row }: CellType) => {
                const { periodFinal } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            {periodFinal ? (
                                <IconButton>
                                    <Icon icon='mdi:check-bold' fontSize={20} color={'green'} />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <Icon icon='mdi:close-thick' fontSize={20} color={'red'} />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: 'periodProcess',
            headerName: 'Process',
            renderCell: ({ row }: CellType) => {
                const { periodProcess } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            {periodProcess ? (
                                <IconButton>
                                    <Icon icon='mdi:check-bold' fontSize={20} color={'green'} />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <Icon icon='mdi:close-thick' fontSize={20} color={'red'} />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                )
            }
        },
        {
            field: 'periodReport',
            headerName: 'Report',
            renderCell: ({ row }: CellType) => {
                const { periodReport } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            {periodReport ? (
                                <IconButton>
                                    <Icon icon='mdi:check-bold' fontSize={20} color={'green'} />
                                </IconButton>
                            ) : (
                                <IconButton>
                                    <Icon icon='mdi:close-thick' fontSize={20} color={'red'} />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                )
            }
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.periods)

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
