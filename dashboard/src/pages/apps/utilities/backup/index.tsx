
import Grid from '@mui/material/Grid'
import BackupTabs from 'src/views/dc-pay/components/tabs/Utilities/Backuo/BackupTabs'


const EntityManagement = () => {
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={12} lg={12}>
                <BackupTabs />
            </Grid>
        </Grid>
    )
}

export default EntityManagement
