// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/File/Period'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import PeriodTable from 'src/views/dc-pay/tables/File/Period/PeriodTable'


const UserList = () => {

    // ** State
    const [role] = useState<string>('')
    const [value] = useState<string>('')
    const [status] = useState<string>('')

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
                            <PeriodTable rows={store.data} />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UserList
