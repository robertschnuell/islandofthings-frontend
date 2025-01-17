import React, { useEffect, useState } from 'react'
import { Loading } from '../../components/loading'
import Matrix from '../../Matrix'

import AddUser from './components/AddUser'
import ChangePassword from './components/ChangePassword'
import DeleteUser from './components/DeleteUser'
import { useTranslation, Trans } from 'react-i18next'
import CreatePublicRoom from './components/CreatePublicRoom'

// import { useAuth } from '../../Auth'

// const auth = useAuth()

const Admin = () => {
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selection, setSelection] = useState('add')
  const { t } = useTranslation('admin')

  const matrixClient = Matrix.getMatrixClient()

  useEffect(() => {
    const checkAdminPriviliges = async () => {
      setLoading(true)
      setAdmin(await matrixClient.isSynapseAdministrator().catch(console.log))
      console.log(admin ? 'you are a server admin' : 'you are not a server admin')
      setLoading(false)
    }
    checkAdminPriviliges()
  }, [admin, matrixClient])

  const renderSelection = () => {
    switch (selection) {
      case 'add':
        return <AddUser />
      case 'password':
        return <ChangePassword />
      case 'delete':
        return <DeleteUser />
      case 'create':
        return <CreatePublicRoom matrixClient={matrixClient}/>
      default:
        return <AddUser matrixClient={matrixClient} />
    }
  }

  if (!matrixClient || loading) return <Loading />
  if (!admin) return <Trans t={t} i18nKey="adminPriviliges">You need admin priviliges to see this page.</Trans>

  return (
    <>
      <section className="request">
        <div id="formchooser">
        <input type="radio" id="add-user" name={t('Add Account')} checked={selection === 'add'} onChange={() => setSelection('add')} />
        <label htmlFor="add-user">{t('Add Account')}</label>
        <input type="radio" id="change-password" name={t('Reset Password')} value="change-password" checked={selection === 'password'} onChange={() => setSelection('password')} />
        <label htmlFor="change-password">{t('Reset Password')}</label>
          <input type="radio" id="delete-user" name={t('Delete user')} value="delete-user" checked={selection === 'delete'} onChange={() => setSelection('delete')} />
          <label htmlFor="delete-user">{t('Delete user')}</label>
          <input type="radio" id="create-room" name={t('Create public room')} value="create-room" checked={selection === 'create'} onChange={() => setSelection('create')} />
        <label htmlFor="create-room">{t('Delete user')}</label>
      </div>
      </section>
      {renderSelection()}
  </>
  )
}

export default Admin
