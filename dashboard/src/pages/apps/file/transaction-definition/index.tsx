// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Actions Imports
import { fetchData, deleteTransactionDefinition } from 'src/store/apps/File/TransactionDefinition'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// ** Custom Components Imports

import AddTransactionDefinition from 'src/views/dc-pay/forms/File/TransactionDefinition/AddTransactionDefinition'
import TransactionDefinitionTable from 'src/views/dc-pay/tables/File/TransactionDefinition/TransactionDefinitionTable'



const UserList = () => {
    // ** State
    const [role] = useState<string>('')
    const [value,] = useState<string>('')
    const [status] = useState<string>('')

    const [formData, setFormData] = useState({
        id: '',
        transactionCode: '',
        transactionName: '',
        shortName: '',
        transactionType: '',
        updateType: '',
        permanent: '',
        taxable: '',
        unTaxableLimit: '',
        affectByLeave: '',
        leaveDays: '',
        affectBackPayroll: '',
        affectBeneficiary: '',
        transactionGroup: '',
        glEntryBy: '',
        directAccount: '',
        contractGLAccount: ''
    });



    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.transactionDefinition)

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
            <Grid item xs={12} md={12} lg={5}>
                <AddTransactionDefinition formData={formData} />
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
                <Card>
                    <CardHeader title='Transaction Definition' />
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
