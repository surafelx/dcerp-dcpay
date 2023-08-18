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
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'



// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import PencilOutline from 'mdi-material-ui/PencilOutline'
// import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormControl from '@mui/material/FormControl'
import CardHeader from '@mui/material/CardHeader'

import Button from '@mui/material/Button'

// ** Actions Imports
import { fetchData, deleteSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { SubParameterDefinitionType } from 'src/types/apps/File/ParameterDefinition/subParameterDefinitionTypes'


// ** Custom Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeader'
import { addSubParameterDefinition, editSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'

// import AddSubParameterDefinition from 'src/views/dc-pay/forms/File/ParameterDefinition/AddSubParameterDefinition'


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
    const [value, setValue] = useState<string>('')
    const [pageSize, setPageSize] = useState<number>(10)
    const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
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
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: emptyValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })


    useEffect(() => {
        dispatch(
            fetchData({
                q: value,
                parameter
            })
        )

    }, [dispatch, parameter, value])

    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])


    const handleParameterChange = useCallback((e: SelectChangeEvent) => {
        reset({ parameterName: '' })
        setParameter(e.target.value)
    }, [])



    const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

    const onSubmit = (data: any) => {
        data.parameterId = parameter
        if (data.id) {
            dispatch(editSubParameterDefinition({ ...data, }))
        } else {
            dispatch(addSubParameterDefinition({ ...data, }))
        }
        dispatch(
            fetchData({
                q: value,
                parameter
            })
        )
        reset({ parameterName: '' })
    }

    const mainParameterDefinitions = useSelector((state: RootState) => state.mainParameterDefinition)

    const clearAllFields = () => {
        // setEmployee('')
        // setTransaction('')
        reset(emptyValues)
    }



    return (
        <>

            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={4}>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                        <Card>
                            <CardHeader title='Sub Parameter Definition' />
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id='parameter-select'>Select Main Parameter</InputLabel>
                                            <Select
                                                fullWidth
                                                value={parameter}
                                                id='select-parameter'
                                                label='Select Main Parameter'
                                                labelId='parameter-select'
                                                onChange={handleParameterChange}
                                                inputProps={{ placeholder: 'Select Main Parameter' }}
                                            >
                                                {
                                                    mainParameterDefinitions.data.map(({ id, parameterName }, index) => {
                                                        return (
                                                            <MenuItem key={index} value={id}>{parameterName}</MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth sx={{ mb: 4 }}>
                                            <Controller
                                                name='parameterName'
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field: { value, onChange, onBlur } }) => (
                                                    <TextField
                                                        autoFocus
                                                        label='Sub Parameter Name'
                                                        value={value}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        error={Boolean(errors.parameterName)}
                                                        placeholder='Enter Sub Parameter Name'
                                                    />
                                                )}
                                            />
                                            {errors.parameterName && <FormHelperText sx={{ color: 'error.main' }}>{errors.parameterName.message}</FormHelperText>}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5}>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Button color='primary' fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                                Submit
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <Button color='secondary' fullWidth size='large' onClick={() => clearAllFields()} type='reset' variant='contained' sx={{ mb: 7 }}>
                                                Reset
                                            </Button>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>

                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <Card>
                        <CardContent>
                            <Grid item xs={12}>
                                <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
                                <DataGrid
                                    autoHeight
                                    rows={store.data}
                                    columns={columns}
                                    checkboxSelection
                                    pageSize={pageSize}
                                    disableSelectionOnClick
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
