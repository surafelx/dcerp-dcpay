// ** React Imports
import { Ref, useEffect, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { AppDispatch } from 'src/store'
import { useDispatch } from 'react-redux'


// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Tab Content Imports
// import DialogTabApp from 'src/views/dc-pay/setup-dialog/setup-dialog-tabs/DialogTabApp'

import DialogTabCompany from 'src/views/dc-pay/setup-dialog/setup-dialog-tabs/DialogTabCompany'
import DialogTabPeriod from 'src/views/dc-pay/setup-dialog/setup-dialog-tabs/DialogTabPeriod'

// import DialogTabParameters from 'src/views/dc-pay/setup-dialog/setup-dialog-tabs/DialogTabParameters'
// import DialogTabUsers from 'src/views/dc-pay/setup-dialog/setup-dialog-tabs/DialogTabUsers'


import { addCompany } from 'src/store/apps/Settings/GeneralSetup/CompanySetup'

interface TabLabelProps {
  title: string
  active: boolean
  subtitle: string
  icon: ReactElement
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const TabLabel = (props: TabLabelProps) => {
  const { icon, title, subtitle, active } = props

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            ...(active
              ? { color: 'common.white', backgroundColor: 'primary.main' }
              : { backgroundColor: 'action.selected' })
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='body1' sx={{ textTransform: 'none' }} >{title}</Typography>
          <Typography variant='caption' sx={{ textTransform: 'none' }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

const tabsArr = ['companyInformationTab', 'periodTab', 'submitTab']

const emptyAppObj = {
  application: {
    name: 'App Description',
    category: '',
  },
  company: {
    name: '',
    address: '',
    tinNumber: '',
    branchCode: '',
    branchName: ''
  },
  period: {
    currentPeriod: '',
    calendar: ''
  },
  parameters: {
    default: true,
    custom: {
      mainParameters: [],
      subParameters: []
    }
  },
  userRole: {
    default: true,
    custom: []
  },
  userAccount: {
    default: true,
    custom: []
  }
}


const createAppObject = {
  application: {
    name: 'App Description',
    category: '',
  },
  company: {
    name: '',
    address: '',
    tinNumber: '',
    branchCode: '',
    branchName: ''
  },
  period: {
    currentPeriod: '',
    calendar: ''
  },
  parameters: {
    default: true,
    custom: {
      mainParameters: [],
      subParameters: []
    }
  },
  userRole: {
    default: true,
    custom: []
  },
  userAccount: {
    default: true,
    custom: []
  }
}

const DialogCreateApp = () => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('companyInformationTab')
  const [appObj, setAppObj] = useState<any>(createAppObject)


  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

  const handleClose = () => {
    setShow(false)
    setActiveTab('companyInformationTab')
  }

  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = (data: any) => {
    dispatch(addCompany({ ...data }))
  }


  useEffect(() => {
    setAppObj(createAppObject)
  }, [])

  const nextArrow = direction === 'ltr' ? 'mdi:arrow-right' : 'mdi:arrow-left'
  const previousArrow = direction === 'ltr' ? 'mdi:arrow-left' : 'mdi:arrow-right'

  const renderTabFooter = () => {
    const prevTab = tabsArr[tabsArr.indexOf(activeTab) - 1]
    const nextTab = tabsArr[tabsArr.indexOf(activeTab) + 1]

    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant='outlined'
          color='secondary'
          disabled={activeTab === 'applicationDetailsTab'}
          onClick={() => setActiveTab(prevTab)}
          startIcon={<Icon icon={previousArrow} />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={activeTab === 'submitTab' ? 'success' : 'primary'}
          endIcon={<Icon icon={activeTab === 'submitTab' ? 'mdi:check' : nextArrow} />}
          onClick={() => {
            if (activeTab !== 'submitTab') {
              setActiveTab(nextTab)
            } else {
              onSubmit(appObj)
              setAppObj(emptyAppObj)
              handleClose()
            }
          }}
        >
          {activeTab === 'submitTab' ? 'Submit' : 'Next'}
        </Button>
      </Box>
    )
  }

  return (
    <Card>
      <Button fullWidth size='large' variant='contained' onClick={() => setShow(true)}>
        Setup Application
      </Button>
      <Dialog
        fullWidth
        open={show}
        scroll='body'
        maxWidth='md'
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            pt: { xs: 8, sm: 12.5 },
            pr: { xs: 5, sm: 12 },
            pb: { xs: 5, sm: 9.5 },
            pl: { xs: 4, sm: 11 },
            position: 'relative'
          }}
        >
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Setup
            </Typography>
            <Typography variant='body2'>Provide data with this form to create specifications for your system.</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <TabContext value={activeTab}>
              <TabList
                orientation='vertical'
                onChange={(e, newValue: string) => setActiveTab(newValue)}
                sx={{
                  border: 0,
                  minWidth: 300,
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTabs-flexContainer': {
                    alignItems: 'flex-start',
                    '& .MuiTab-root': {
                      width: '100%',
                      alignItems: 'flex-start'
                    }
                  }
                }}
              >
                {/* <Tab
                  disableRipple
                  value='applicationDetailsTab'
                  label={
                    <TabLabel
                      title='Application'
                      subtitle='Setup Application'
                      active={activeTab === 'applicationDetailsTab'}
                      icon={<Icon icon='mdi:file-document-outline' />}
                    />
                  }
                /> */}
                <Tab
                  disableRipple
                  value='companyInformationTab'
                  label={
                    <TabLabel
                      title='Company'
                      icon={<Icon icon='mdi:cube-outline' />}
                      subtitle='Enter Details'
                      active={activeTab === 'companyInformationTab'}
                    />
                  }
                />
                <Tab
                  disableRipple
                  value='periodTab'
                  label={
                    <TabLabel
                      title='Period'
                      active={activeTab === 'periodTab'}
                      subtitle='Initialize Period'
                      icon={<Icon icon='mdi:database-outline' />}
                    />
                  }
                />
                {/* <Tab
                  disableRipple
                  value='parametersTab'
                  label={
                    <TabLabel
                      title='Parameters'
                      active={activeTab === 'parametersTab'}
                      subtitle='Define Parameters'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                />
                <Tab
                  disableRipple
                  value='usersTab'
                  label={
                    <TabLabel
                      title='User Management'
                      active={activeTab === 'usersTab'}
                      subtitle='Setup Users'
                      icon={<Icon icon='mdi:credit-card-outline' />}
                    />
                  }
                /> */}
                <Tab
                  disableRipple
                  value='submitTab'
                  label={
                    <TabLabel
                      title='Submit'
                      subtitle='Submit'
                      icon={<Icon icon='mdi:check' />}
                      active={activeTab === 'submitTab'}
                    />
                  }
                />
              </TabList>
              {/* <TabPanel value='applicationDetailsTab' sx={{ flexGrow: 1 }}>
                <DialogTabApp createAppObject={createAppObject} />
                {renderTabFooter()}
              </TabPanel> */}
              <TabPanel value='companyInformationTab' sx={{ flexGrow: 1 }}>
                <DialogTabCompany createAppObject={createAppObject} />
                {renderTabFooter()}
              </TabPanel>
              <TabPanel value='periodTab' sx={{ flexGrow: 1 }}>
                <DialogTabPeriod createAppObject={createAppObject} />
                {renderTabFooter()}
              </TabPanel>
              {/* <TabPanel value='parametersTab' sx={{ flexGrow: 1 }}>
                <DialogTabParameters createAppObject={createAppObject} />
                {renderTabFooter()}
              </TabPanel>
              <TabPanel value='usersTab' sx={{ flexGrow: 1 }}>
                <DialogTabUsers createAppObject={createAppObject} />
                {renderTabFooter()}
              </TabPanel> */}
              <TabPanel value='submitTab' sx={{ flexGrow: 1 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6' sx={{ mb: 2 }}>
                    Submit 🥳
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 6 }}>
                    Submit to kickstart your project.
                  </Typography>

                  <img width={250} height={152} alt='submit-img' src='/images/cards/illustration-john.png' />
                </Box>
                {renderTabFooter()}
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogCreateApp
