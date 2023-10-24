// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
// import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'

// import Card from '@mui/material/Card'
// import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'

// import { DataGrid } from '@mui/x-data-grid'
// import MenuItem from '@mui/material/MenuItem'

// import { styled } from '@mui/material/styles'

// import IconButton from '@mui/material/IconButton'

import Typography from '@mui/material/Typography'

// import CardContent from '@mui/material/CardContent'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import DotsVertical from 'mdi-material-ui/DotsVertical'
// import PencilOutline from 'mdi-material-ui/PencilOutline'
// import DeleteOutline from 'mdi-material-ui/DeleteOutline'
// ** Store Imports
import { useDispatch } from 'react-redux'


// ** Actions Imports
import { fetchData } from 'src/store/apps/File/EntityManagement/Branches'

// ** Types Imports
import { AppDispatch } from 'src/store'


// ** Custom Components Imports
import AddMonthClosing from 'src/views/dc-pay/forms/Utilities/Closing/AddMonthClosing'


// ** Styled component for the link inside menu
// const MenuItemLink = styled('a')(({ theme }) => ({
//     width: '100%',
//     display: 'flex',
//     alignItems: 'center',
//     textDecoration: 'none',
//     padding: theme.spacing(1.5, 4),
//     color: theme.palette.text.primary
// }))

const UserList = () => {
    // ** State
    const [value] = useState<string>('')
    const [loading, setLoading]=useState<boolean>(true)
    const [formData, ] = useState({
        id: '',
        branchCode: '',
        branchName: ''
    });


    // const RowOptions = ({ id, branchCode, branchName }: any) => {
    //     // ** Hooks
    //     const dispatch = useDispatch<AppDispatch>()

    //     // ** State
    //     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
        

    //     const rowOptionsOpen = Boolean(anchorEl)

    //     const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    //         setAnchorEl(event.currentTarget)
    //     }
    //     const handleRowOptionsClose = () => {
    //         setAnchorEl(null)
    //     }

    //     const handleEdit = () => {
    //         setFormData(
    //             {
    //                 id,
    //                 branchCode,
    //                 branchName
    //             }
    //         )
    //     }

    //     useEffect(() => {
    //         if (formData) {
    //             setFormData(formData);
    //         }
    //     }, []);

    //     const handleDelete = () => {
    //         setLoading(true)
    //     setTimeout(() => {
    //         dispatch(deleteBranch(id))
    //         handleRowOptionsClose()
    //         setLoading(false)
    //     }, 3000) 
    //     }


    //     return (
    //         <>
    //             <IconButton size='small' onClick={handleRowOptionsClick}>
    //                 {/* <DotsVertical /> */}
    //                 Options
    //             </IconButton>
    //             <Menu
    //                 keepMounted
    //                 anchorEl={anchorEl}
    //                 open={rowOptionsOpen}
    //                 onClose={handleRowOptionsClose}
    //                 anchorOrigin={{
    //                     vertical: 'bottom',
    //                     horizontal: 'right'
    //                 }}
    //                 transformOrigin={{
    //                     vertical: 'top',
    //                     horizontal: 'right'
    //                 }}
    //                 PaperProps={{ style: { minWidth: '8rem' } }}
    //             >
    //                 <MenuItem sx={{ p: 0 }}>
    //                     <Link href={`/apps/settings/user-management/view/${id}`} passHref>
    //                         <MenuItemLink>
    //                             {/* <EyeOutline fontSize='small' sx={{ mr: 2 }} /> */}
    //                             View
    //                         </MenuItemLink>
    //                     </Link>
    //                 </MenuItem>
    //                 <MenuItem onClick={handleEdit}>
    //                     {/* <PencilOutline fontSize='small' sx={{ mr: 2 }} /> */}
    //                     Edit
    //                 </MenuItem>
    //                 <MenuItem onClick={handleDelete}>
    //                     {/* <DeleteOutline fontSize='small' sx={{ mr: 2 }} /> */}
    //                     Delete
    //                 </MenuItem>
    //             </Menu>
    //         </>
    //     )
    // }


    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    // const store = useSelector((state: RootState) => state.branches)

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
        {loading ?    <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <CircularProgress sx={{ mb: 4 }} />
                  <Typography>Loading...</Typography>
                </Box> : (
        <Grid container spacing={6}>
            <Grid item  xs={12} md={12} lg={4}>
                <AddMonthClosing loading={loading} setLoading={setLoading} formData={formData} />
            </Grid>
            
        </Grid >
         )}
         </>
    )
}

export default UserList