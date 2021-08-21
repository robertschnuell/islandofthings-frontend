import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Auth'

const Header = () => {
  const auth = useAuth()

  return (
    <header>
      <Link to={auth.user ? '/dashboard' : '/'}><h1>grid.valentinswerder</h1></Link>
    </header>
  )
}

export default Header
