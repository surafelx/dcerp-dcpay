// ** React Imports
import { useEffect, useState } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'


import Autocomplete from '@mui/material/Autocomplete'


// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { RootState } from 'src/store'

// ** Actions Imports
import { addDepartment, editDepartment } from 'src/store/apps/File/EntityManagement/Department'
import { fetchData as fetchBranches } from 'src/store/apps/File/EntityManagement/Branches'

// ** Types Imports
import { AppDispatch } from 'src/store'

import { useSelector } from 'react-redux'


const schema = yup.object().shape({
    branchId: yup.string(),
    departmentCode: yup.string(),
    departmentName: yup.string(),
    permanentAccount: yup.string(),
    contractAccount: yup.string()
})

const emptyValues = {
    branchId: '',
    departmentCode: '',
    departmentName: '',
    permanentAccount: '',
    contractAccount: ''
}



const AddDepartment = ({ formData, branch, setBranch }: any) => {


    const [branchObject, setBranchObject] = useState<any>(null)

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const branchStore = useSelector((state: RootState) => state.branches)


    useEffect(() => {
        dispatch(
            fetchBranches({
                q: ''
            })
        )
    }, [dispatch])



    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: formData,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(formData);
    }, [formData, reset])

    const onSubmit = (data: any) => {
        data.branchId = branch
        if (data.id) {
            dispatch(editDepartment({ ...data, }))
        } else {
            dispatch(addDepartment({ ...data, }))
        }
        reset(emptyValues)

    }


    const handleBranchChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setBranchObject(newValue)
            setBranch(newValue.id)
        }
    }

    return (
        <Card>
            <CardHeader title='Add Department' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <Autocomplete
                                    autoSelect
                                    size={'small'}
                                    value={branchObject}
                                    options={branchStore.data}
                                    onChange={handleBranchChange}
                                    isOptionEqualToValue={(option: any, value: any) => option.branchName == value.branchName}
                                    id='autocomplete-controlled'
                                    getOptionLabel={(option: any) => option.branchName}
                                    renderInput={params => <TextField {...params} label='Select Branch' />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth >
                                <Controller
                                    name='departmentCode'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            size={'small'}
                                            autoFocus
                                            label='Department Code'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.departmentCode)}
                                            placeholder='Enter Department Code'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth >
                                <Controller
                                    name='departmentName'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            size={'small'}
                                            autoFocus
                                            label='Department Name'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.departmentName)}
                                            placeholder='Enter Department Name'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth >
                                <Controller
                                    name='permanentAccount'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            size={'small'}
                                            autoFocus
                                            label='Permanent Account'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.permanentAccount)}
                                            placeholder='Permanent Account'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth >
                                <Controller
                                    name='contractAccount'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <TextField
                                            size={'small'}
                                            autoFocus
                                            label='Contract Account'
                                            value={value}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.contractAccount)}
                                            placeholder='Contract Account'
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Button fullWidth size='small' type='submit' variant='contained'>
                                    Submit
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <Button
                                    color='secondary'
                                    fullWidth size='small'
                                    onClick={() => {
                                        reset(emptyValues)
                                        setBranchObject({ id: '', branchName: '' })
                                        setBranch()
                                    }} type='reset' variant='contained'>
                                    Reset
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>

            </CardContent>
        </Card >
    )
}

export default AddDepartment
