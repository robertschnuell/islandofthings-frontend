import React, { useEffect, useState } from 'react'
import i18n from 'i18next'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../Auth'
import Matrix from '../../Matrix'
import { Loading } from '../loading'

const Nav = () => {
  const auth = useAuth()
  const matrixClient = Matrix.getMatrixClient()
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkAdminPriviliges = async () => {
      setLoading(true)
      setAdmin(await matrixClient.isSynapseAdministrator().catch(console.log))
      setLoading(false)
    }
    checkAdminPriviliges()
  }, [admin, matrixClient])

  const changeLanguage = code => {
    localStorage.setItem('cr_lang', code)
    i18n.changeLanguage(code)
  }

  if (auth.user === null) {
    return null
  }
  if (loading) return <Loading />

  return (
    <>
      <nav>
        <div>
          <div>
            {auth.user
              ? (
              <a href={process.env.REACT_APP_MATRIX_BASE_URL + '/app'} rel="nofollow noopener noreferrer" target="_self">/app&nbsp;-&gt;</a>
                )
              : (
              <NavLink activeclassname="active" to="/login">/login</NavLink>
                )}
          </div>
          {auth.user && (
            <>
              <div>
                <NavLink activeclassname="active" to="/account">/account</NavLink>
                <NavLink activeclassname="active" to="/explore">/explore</NavLink>
                <NavLink activeclassname="active" to="/request">/request</NavLink>
                <NavLink activeclassname="active" to="/support">/support</NavLink>
                {admin && <NavLink activeClassName="active" to="/admin">/admin</NavLink>}
                {
                  // <NavLink activeclassname="active" to="/admin">/admin</NavLink>}
                  // matrixClient.isSynapseAdministrator() ?? console.log('with great power comes great responsibility')
                }
              </div>
              <div>
                <a href="https://pad.grid.valentinswerder.de" rel="external nofollow noopener noreferrer" target="_blank">pad.grid</a>
                <a href="https://map.grid.valentinswerder.de" rel="external nofollow noopener noreferrer" target="_blank">map.grid</a>
                {admin && <a href="https://config.grid.valentinswerder.de" rel="external nofollow noopener noreferrer" target="_blank">config.grid</a>}
              </div>
            </>
          )}
        </div>
      </nav>
      <section>
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('de')}>DE</button>
      </section>
    </>
  )
}

export default Nav
