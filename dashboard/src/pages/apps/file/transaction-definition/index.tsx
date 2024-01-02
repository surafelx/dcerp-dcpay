// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import { fetchData as fetchMainParameterDefinitions } from 'src/store/apps/File/ParameterDefinition/MainParameterDefinition'
import { fetchData as fetchSubParameterDefinition } from 'src/store/apps/File/ParameterDefinition/SubParameterDefinition'
import { addTransactionDefinition, editTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Actions Imports
import { fetchData, deleteTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Custom Components Imports

import TransactionDefinitionTable from 'src/views/dc-pay/tables/File/TransactionDefinition/TransactionDefinitionTable'



const UserList = () => {
    // ** State
    const [role] = useState<string>('')
    const [status] = useState<string>('')

    const [transactionTypeObject, setTransactionTypeObject] = useState<any>({ id: '', parameterName: '' })
    const [transactionGroupObject, setTransactionGroupObject] = useState<any>({ id: '', parameterName: '' })
    const [filterValue, setFilterValue] = useState<string>('')

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.transactionDefinition)

    useEffect(() => {
        dispatch(
            fetchData({
                q: filterValue,
            })
        )
    }, [dispatch, role, status, filterValue])


    useEffect(() => {
        dispatch(
            fetchMainParameterDefinitions({
                q: ''
            })
        )
    }, [dispatch])

    useEffect(() => {
        dispatch(
            fetchSubParameterDefinition({
                q: ''
            })
        )
    }, [dispatch])


    const handleFilter = (val: string) => {
        setFilterValue(val)
    }

    const subParameters = useSelector((state: RootState) => state.subParameterDefinition)
    const mainParameters = useSelector((state: RootState) => state.mainParameterDefinition)


    const filterSubParametersByName = (parentParamName: any) => {
        const parent: any = mainParameters.allData.find((parent: any) => parent.parameterName === parentParamName);
        if (!parent) {
            return [];
        }

        const filteredChild = subParameters.allData.filter((child: any) => child.parameterId === parent.id);

        return filteredChild
    }

    const transactionTypeOptions = filterSubParametersByName('Transaction Type')
    const transactionGroupOptions = filterSubParametersByName('Transaction Group')
    const updateTypeOptions = filterSubParametersByName('Transaction Update Type')



    const schema = yup.object().shape({
        transactionCode: yup.number().typeError('Code has to be a valid number.').required("Code is required").test('not-zero', 'Code cannot be 0', (value) => value !== 0),
        transactionName: yup.string().required('Required'),
        shortName: yup.string().required('Required'),
        transactionType: yup.string().required('Required'),
        updateType: yup.string().required('Required'),
        permanent: yup.boolean().required('Required'),
        taxable: yup.boolean().required('Required'),
        unTaxableLimit: yup.number().typeError('Untaxable Limit has to be a valid number.').required("Untaxable Limit is required"),
        affectByLeave: yup.boolean().required('Required'),
        leaveDays: yup.number().typeError('Leave Days has to be a valid number.').required("Leave Days is required"),
        affectBackPayroll: yup.boolean().required('Required'),
        affectBeneficiary: yup.boolean().required('Required'),
        transactionGroup: yup.string().required('Required'),
        glEntryBy: yup.string().required('Required'),
        directAccount: yup.string(),
        contractGLAccount: yup.string()
    })


    const emptyValues = {
        id: '',
        transactionCode: 0,
        transactionName: '',
        shortName: '',
        transactionType: '',
        updateType: '',
        permanent: false,
        taxable: false,
        unTaxableLimit: 0,
        affectByLeave: false,
        leaveDays: 0,
        affectBackPayroll: false,
        affectBeneficiary: false,
        transactionGroup: '',
        glEntryBy: '',
        directAccount: '',
        contractGLAccount: ''
    }

    const [formData, setFormData] = useState(emptyValues);



    const {
        control,
        handleSubmit,
        reset,
        setValue,
        trigger,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm({
        defaultValues: formData,
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(formData);
    }, [formData, reset])

    // any type used
    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editTransactionDefinition({ ...data }))
        } else {
            dispatch(addTransactionDefinition({ ...data }))
        }
        setTransactionTypeObject({ id: '', parameterName: '' })
        setTransactionGroupObject({ id: '', parameterName: '' })
        reset(emptyValues)
    }

    const handleTransactionTypeChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setTransactionTypeObject(newValue)
            setValue('transactionType', newValue.id)
            trigger('transactionType')
        }
    }

    const handleTranscationGroupChange = (e: any, newValue: any) => {
        if (newValue?.id) {
            setTransactionGroupObject(newValue)
            setValue('transactionGroup', newValue.id)
            trigger('transactionGroup')
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={4}>
                <Card>
                    <CardHeader title='Add Transaction Definition' titleTypographyProps={{ variant: 'h6' }} />
                    <CardContent>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='transactionCode'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    size={'small'}
                                                    autoFocus
                                                    label='Code'
                                                    type={'number'}
                                                    value={value}
                                                    onBlur={(e) => {
                                                        onBlur()
                                                        const selectedTransaction: any = store?.data?.filter(({ transactionCode }: any) => transactionCode == e.target.value)[0]
                                                        if (selectedTransaction) {
                                                            setTransactionTypeObject(transactionTypeOptions.filter((transaction: any) => transaction.id == selectedTransaction?.transactionType)[0])
                                                            setTransactionGroupObject(transactionGroupOptions.filter((transaction: any) => transaction.id == selectedTransaction?.transactionGroup)[0])
                                                            reset(selectedTransaction)
                                                        } else {
                                                            setTransactionTypeObject({ id: '', parameterName: '' })
                                                            setTransactionGroupObject({ id: '', parameterName: '' })
                                                            reset(emptyValues)
                                                            setValue('transactionCode', Number(e.target.value))
                                                        }
                                                    }
                                                    }
                                                    onChange={onChange}
                                                    error={Boolean(errors.transactionCode)}
                                                    placeholder='Code'
                                                />
                                            )}
                                        />
                                        {errors.transactionCode && <Alert sx={{ my: 4 }} severity='error'>{errors.transactionCode.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='transactionName'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    size={'small'}
                                                    autoFocus
                                                    label='Name'
                                                    value={value}
                                                    onBlur={(e) => {
                                                        onBlur()
                                                        const selectedTransaction: any = store?.data?.filter(({ transactionName }: any) => transactionName == e.target.value)[0]
                                                        if (selectedTransaction) {
                                                            setError('transactionName', {
                                                                type: 'manual',
                                                                message: 'Transaction Name already exists.',
                                                            })
                                                        } else {
                                                            clearErrors('transactionName')
                                                        }
                                                    }
                                                    }
                                                    onChange={onChange}
                                                    error={Boolean(errors.transactionName)}
                                                    placeholder='Transaction Name'
                                                />
                                            )}
                                        />
                                        {errors.transactionName && <Alert sx={{ my: 4 }} severity='error'>{errors.transactionName.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='shortName'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    size={'small'}
                                                    autoFocus
                                                    label='Short Name'
                                                    value={value}
                                                    onBlur={(e) => {
                                                        onBlur()
                                                        const selectedTransaction: any = store?.data?.filter(({ shortName }: any) => shortName == e.target.value)[0]
                                                        if (selectedTransaction) {
                                                            setError('shortName', {
                                                                type: 'manual',
                                                                message: 'Short Name already exists.',
                                                            })
                                                        } else {
                                                            clearErrors('shortName')
                                                        }
                                                    }
                                                    }
                                                    onChange={onChange}
                                                    error={Boolean(errors.shortName)}
                                                    placeholder='Short Name'
                                                />
                                            )}
                                        />
                                        {errors.shortName && <Alert sx={{ my: 4 }} severity='error'>{errors.shortName.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            autoSelect
                                            size={'small'}
                                            value={transactionTypeObject}
                                            options={transactionTypeOptions}
                                            onChange={handleTransactionTypeChange}
                                            isOptionEqualToValue={(option: any, value: any) => option.parameterName == value.parameterName}
                                            id='autocomplete-controlled'
                                            getOptionLabel={(option: any) => option.parameterName}
                                            renderInput={params => <TextField required error={Boolean(errors.transactionType)} {...params} label='Select Transaction Type' />}
                                        />
                                        {errors.transactionType && <Alert sx={{ my: 4 }} severity='error'>{errors.transactionType.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='updateType'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                                <>
                                                    <FormLabel >Update Type</FormLabel>
                                                    <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={onChange}>
                                                        {
                                                            updateTypeOptions.map(({ id, parameterName }: any, index: any) => {

                                                                return (
                                                                    <FormControlLabel key={index} value={id} control={<Radio size={'small'} />} label={parameterName} />
                                                                )
                                                            })
                                                        }
                                                    </RadioGroup>
                                                </>
                                            )}
                                        />
                                        {errors.updateType && <Alert sx={{ my: 4 }} severity='error'>{errors.updateType.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormGroup row>
                                        <Controller

                                            name='permanent'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel
                                                    label='Permanent'
                                                    control={<Checkbox size={'small'} checked={value} onChange={onChange} name='controlled' />}
                                                />
                                            )}
                                        />
                                        {errors.permanent && <Alert sx={{ my: 4 }} severity='error'>{errors.permanent.message}</Alert>}

                                        <Controller
                                            name='taxable'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel
                                                    label='Taxable'
                                                    control={<Checkbox size={'small'} checked={value} onChange={onChange} name='controlled' />}
                                                />
                                            )}
                                        />
                                        {errors.taxable && <Alert sx={{ my: 4 }} severity='error'>{errors.taxable.message}</Alert>}
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='unTaxableLimit'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    size={'small'}
                                                    autoFocus
                                                    type={'number'}
                                                    label='UnTaxable Limit'
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.unTaxableLimit)}
                                                    placeholder='UnTaxable Limit'
                                                />
                                            )}
                                        />
                                        {errors.unTaxableLimit && <Alert sx={{ my: 4 }} severity='error'>{errors.unTaxableLimit.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormGroup row>
                                        <Controller
                                            name='affectByLeave'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, } }) => (
                                                <FormControlLabel
                                                    label='Affect By Leave'
                                                    control={<Checkbox size={'small'} checked={value} onChange={onChange} name='controlled' />}
                                                />
                                            )}
                                        />
                                        {errors.affectByLeave && <Alert sx={{ my: 4 }} severity='error'>{errors.affectByLeave.message}</Alert>}
                                    </FormGroup>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='leaveDays'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    size={'small'}
                                                    autoFocus
                                                    type={'number'}
                                                    label='Leave Days'
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.leaveDays)}
                                                    placeholder='Leave Days'
                                                />
                                            )}
                                        />
                                        {errors.leaveDays && <Alert sx={{ my: 4 }} severity='error'>{errors.leaveDays.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormGroup row>
                                        <Controller
                                            name='affectBackPayroll'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, } }) => (
                                                <FormControlLabel
                                                    label='Affect Back Payroll'
                                                    control={<Checkbox size={'small'} checked={value} onChange={onChange} name='controlled' />}
                                                />
                                            )}
                                        />
                                        {errors.affectBackPayroll && <Alert sx={{ my: 4 }} severity='error'>{errors.affectBackPayroll.message}</Alert>}
                                        <Controller
                                            name='affectBeneficiary'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, } }) => (
                                                <FormControlLabel
                                                    label='Beneficiary'
                                                    control={<Checkbox size={'small'} checked={value} onChange={onChange} name='controlled' />}
                                                />
                                            )}
                                        />
                                        {errors.affectBeneficiary && <Alert sx={{ my: 4 }} severity='error'>{errors.affectBeneficiary.message}</Alert>}
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <Autocomplete
                                                autoSelect
                                                size={'small'}
                                                value={transactionGroupObject}
                                                options={transactionGroupOptions}
                                                onChange={handleTranscationGroupChange}
                                                isOptionEqualToValue={(option: any, value: any) => option.parameterName == value.parameterName}
                                                id='autocomplete-controlled'
                                                getOptionLabel={(option: any) => option.parameterName}
                                                renderInput={params => <TextField required error={Boolean(errors.transactionGroup)} {...params} label='Select Transaction Group' />}
                                            />
                                            {errors.transactionGroup && <Alert sx={{ my: 4 }} severity='error'>{errors.transactionGroup.message}</Alert>}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='glEntryBy'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, } }) => (
                                                <>
                                                    <FormLabel>GL-Entry By</FormLabel>
                                                    <RadioGroup row aria-label='controlled' name='controlled' value={value} onChange={onChange}>
                                                        <FormControlLabel value='total' control={<Radio size={'small'} />} label='Total' />
                                                        <FormControlLabel value='department' control={<Radio size={'small'} />} label='Department' />
                                                        <FormControlLabel value='individual' control={<Radio size={'small'} />} label='Individual' />
                                                        <FormControlLabel value='na' control={<Radio size={'small'} />} label='N/A' />
                                                    </RadioGroup>
                                                </>
                                            )}
                                        />
                                        {errors.glEntryBy && <Alert sx={{ my: 4 }} severity='error'>{errors.glEntryBy.message}</Alert>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='directAccount'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    size={'small'}
                                                    autoFocus
                                                    label='Direct Account'
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.directAccount)}
                                                    placeholder='Direct Account'
                                                />
                                            )}
                                        />
                                        {errors.directAccount && <Alert sx={{ my: 4 }} severity='error'>{errors.directAccount.message}</Alert>}

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='contractGLAccount'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    size={'small'}

                                                    autoFocus
                                                    label='Contra. GL Account'
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    error={Boolean(errors.contractGLAccount)}
                                                    placeholder='Contra. GL Account'
                                                />
                                            )}
                                        />
                                        {errors.contractGLAccount && <Alert sx={{ my: 4 }} severity='error'>{errors.contractGLAccount.message}</Alert>}

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Button color='primary' fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                                            Submit
                                        </Button>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <Button color='secondary' fullWidth size='large' onClick={() => {
                                            reset(emptyValues)
                                            setTransactionTypeObject({ id: '', parameterName: '' })
                                            setTransactionGroupObject({ id: '', parameterName: '' })
                                        }} type='reset' variant='contained' sx={{ mb: 7 }}>
                                            Reset
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>

                    </CardContent>
                </Card >
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
                <Card>
                    <CardHeader title='Transaction Definition' />
                    <Grid container spacing={3}>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                            <TextField
                                size='small'
                                value={filterValue}
                                placeholder='Search'
                                onChange={e => handleFilter(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <CardContent>
                        <TransactionDefinitionTable
                            rows={store.data}
                            formData={formData}
                            setFormData={setFormData}
                            deleteTransactionDefinition={deleteTransactionDefinition}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserList
