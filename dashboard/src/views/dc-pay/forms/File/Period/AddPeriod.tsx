// ** React Imports
import { useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'


// ** Third Party Imports
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addPeriod, editPeriod } from 'src/store/apps/File/Period'

// ** Types Imports
import { AppDispatch } from 'src/store'


const schema = yup.object().shape({
    holidayName: yup.string(),
    holidayDate: yup.string(),

})

const emptyValues = {
    holidayName: '',
    holidayDate: '',
}


const AddPeriod = ({ formData }: any) => {

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const {
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: formData,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    
    useEffect(() => {
        reset(formData);
    }, [formData, reset])


    const onSubmit = (data: any) => {
        if (data.id) {
            dispatch(editPeriod({ ...data, }))
        } else {
            dispatch(addPeriod({ ...data, }))
        }
        reset(emptyValues)

    }

    return (
        <Card>
            <CardHeader title='Payroll Period' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth>
                        <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                            Create
                        </Button>
                    </FormControl>
                </form>

            </CardContent>
        </Card >
    )
}

export default AddPeriod
