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



// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import PencilOutline from 'mdi-material-ui/PencilOutline'
// import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'



// ** Actions Imports
import { fetchData, deleteSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { SubParameterDefinitionType } from 'src/types/apps/File/ParameterDefinition/subParameterDefinitionTypes'



import AddSubParameterDefinition from 'src/views/dc-pay/forms/File/ParameterDefinition/AddSubParameterDefinition'


const schema = yup.object().shape({
    parameterId: yup.string(),
    parameterName: yup.string()

})

const emptyValues = {
    id: '',
    parameterId: '',
    parameterName: ''
}




interface CellType {
    row: SubParameterDefinitionType
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
    const [mainParameterDefinition, setMainParameterDefinition] = useState<string>('')
    const [value, ] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)
    const [parameter, setParameter] = useState<string>('')


    const [formData, setFormData] = useState({
        id: '',
        parameterId: '',
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
            reset(
                {
                    id,
                    parameterId: parameter,
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
            dispatch(deleteSubParameterDefinition(id))
            setParameter('')
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
            field: 'mainParameter',
            headerName: 'Main',
            renderCell: ({ row }: CellType) => {
                const { mainParameterName } = row

                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography
                                noWrap
                                component='a'
                                variant='body2'
                                sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none' }}
                            >
                                {`${mainParameterName}`}
                            </Typography>
                        </Box>
                    </Box>
                )
            }
        },
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
                    parameterId={row.parameterId}
                    parameterName={row.parameterName}
                    mainParameterName={row.mainParameterName}
                />)
        }
    ]


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const store = useSelector((state: RootState) => state.subParameterDefinition)

    const {
        reset,
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })


    useEffect(() => {
        dispatch(
            fetchData({
                q: value,
                parameter: mainParameterDefinition
            })
        )

    }, [dispatch, mainParameterDefinition, value])



    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={4}>
                   <AddSubParameterDefinition formData={formData} mainParameterDefinition={mainParameterDefinition} setMainParameterDefinition={setMainParameterDefinition}/>
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <Card>
                        <CardContent>
                            <Grid item xs={12}>
                                <DataGrid
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
