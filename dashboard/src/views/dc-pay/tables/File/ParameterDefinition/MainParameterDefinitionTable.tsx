// ** React Imports
import { useState, useEffect, MouseEvent, } from 'react'

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

// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import PencilOutline from 'mdi-material-ui/PencilOutline'
// import DeleteOutline from 'mdi-material-ui/DeleteOutline'
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchData, deleteMainParameterDefinition } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { MainParameterDefinitionType } from 'src/types/apps/File/ParameterDefinition/mainParameterDefinitionTypes'

// ** Custom Components Imports

import AddMainParameterDefinition from 'src/views/dc-pay/forms/File/ParameterDefinition/AddMainParameterDefinition'


interface CellType {
    row: MainParameterDefinitionType
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
    const [value, ] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [pageSize, setPageSize] = useState<number>(10)

    const [formData, setFormData] = useState({
        id: '',
        parameterName: '',
    });


    const RowOptions = ({ id, parameterName }: any) => {
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
                    parameterName,
                }
            )
        }

        useEffect(() => {
            if (formData) {
                setFormData(formData);
            }
        }, []);

        const handleDelete = () => {
            setLoading(true)
            setTimeout(() => {
                dispatch(deleteMainParameterDefinition(id))
                handleRowOptionsClose()
                setLoading(false)
            }, 3000)
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
            field: 'parameterName',
            headerName: 'Parameter Name',
            renderCell: ({ row }: CellType) => {
                const { parameterName } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${parameterName}`}
                            </Typography>
                        </Box>
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
                    parameterName={row.parameterName}
                />)
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const store = useSelector((state: RootState) => state.mainParameterDefinition)


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            dispatch(
                fetchData({
                    q: value
                })
            )
            setLoading(false)
        }, 3000)

    }, [dispatch, value])

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={4}>
                    <AddMainParameterDefinition loading={loading} setLoading={setLoading} formData={formData} />
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <Card>
                        <CardContent>
                            <Grid item xs={12}>
                                <DataGrid
                                 rowHeight={40}
                                    autoHeight
                                    rows={store.data}
                                    columns={columns}
                                    pageSize={pageSize}
                                    rowsPerPageOptions={[10, 25, 50]}
                                    onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
                                />
                            </Grid>
                        </CardContent>
                    </Card >
                </Grid>
            </Grid >
        </>
    )
}

export default UserList
