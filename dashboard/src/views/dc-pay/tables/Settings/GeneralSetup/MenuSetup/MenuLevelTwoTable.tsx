// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

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
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import PencilOutline from 'mdi-material-ui/PencilOutline'
// import DeleteOutline from 'mdi-material-ui/DeleteOutline'
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData, deleteMenuLevelTwo } from 'src/store/apps/Settings/GeneralSetup/MenuSetup/MenuLevelTwo'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'

import AddMenuLevelTwo from 'src/views/dc-pay/forms/Settings/GeneralSetup/MenuSetup/AddMenuLevelTwo'
import { MenuLevelTwoType } from 'src/types/apps/Settings/GeneralSetup/MenuSetup/menuLevelTwoTypes'



interface CellType {
    row: MenuLevelTwoType
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
    const [role, setRole] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

    const [formData, setFormData] = useState({
        id: '',
        menuLevelOneId: '',
        menuTitle: '',
    });


    const RowOptions = ({ id, menuLevelOneId, menuTitle }: any) => {
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
                    menuLevelOneId,
                    menuTitle,
                }
            )
        }

        useEffect(() => {
            if (formData) {
                setFormData(formData);
            }
        }, []);

        const handleDelete = () => {
            dispatch(deleteMenuLevelTwo(id))
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
            field: 'menuLevelOneTitle',
            headerName: 'Level 1 Title',
            renderCell: ({ row }: CellType) => {
                const { menuLevelOneTitle } = row
                
return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${menuLevelOneTitle}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            field: 'menuTitle',
            headerName: 'Menu Title',
            renderCell: ({ row }: CellType) => {
                const { menuTitle } = row
                
return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${menuTitle}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.2,
            minWidth: 230,
            field: 'menuPath',
            headerName: 'Menu Path',
            renderCell: ({ row }: CellType) => {
                const { menuPath } = row
                
return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${menuPath}`}
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
                    menuLevelOneId={row.menuLevelOneId}
                    menuTitle={row.menuTitle}
                    menuLevelOneTitle={row.menuLevelOneTitle}
                />)
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const store = useSelector((state: RootState) => state.menuLevelTwo)


    const handleStatusChange = useCallback((e: SelectChangeEvent) => {
        setStatus(e.target.value)
    }, [])


    useEffect(() => {
        dispatch(
            fetchData({
                q: value
            })
        )
    }, [dispatch, value])

    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])


    const handleRoleChange = useCallback((e: SelectChangeEvent) => {
        setRole(e.target.value)
    }, [])

    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

    return (
        <Grid container spacing={6}>
            <Grid item  xs={12} md={12} lg={4}>
                <AddMenuLevelTwo formData={formData} />
            </Grid>
            <Grid item  xs={12} md={12} lg={8}>
                <Card>
                    <CardContent>
                        <Grid container spacing={6}>
                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='role-select'>Select Role</InputLabel>
                                    <Select
                                        fullWidth
                                        value={role}
                                        id='select-role'
                                        label='Select Role'
                                        labelId='role-select'
                                        onChange={handleRoleChange}
                                        inputProps={{ placeholder: 'Select Role' }}
                                    >
                                        <MenuItem value=''>Select Role</MenuItem>
                                        <MenuItem value='admin'>Admin</MenuItem>
                                        <MenuItem value='author'>Author</MenuItem>
                                        <MenuItem value='editor'>Editor</MenuItem>
                                        <MenuItem value='maintainer'>Maintainer</MenuItem>
                                        <MenuItem value='subscriber'>Subscriber</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id='status-select'>Select Status</InputLabel>
                                    <Select
                                        fullWidth
                                        value={status}
                                        id='select-status'
                                        label='Select Status'
                                        labelId='status-select'
                                        onChange={handleStatusChange}
                                        inputProps={{ placeholder: 'Select Role' }}
                                    >
                                        <MenuItem value=''>Select Role</MenuItem>
                                        <MenuItem value='pending'>Pending</MenuItem>
                                        <MenuItem value='active'>Active</MenuItem>
                                        <MenuItem value='inactive'>Inactive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
                            <DataGrid
                             rowHeight={30}
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
    )
}

export default UserList
