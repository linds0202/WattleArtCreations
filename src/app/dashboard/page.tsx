'use client'

import '../globals.css'
import { useAuth } from '../firebase/auth'

export default function Dashboard() {
  const { isLoading } = useAuth()
  return (isLoading ? 
    <></>
    :
    <div>Dashboard</div>
  )
}

