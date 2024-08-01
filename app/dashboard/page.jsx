import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Header from './_components/Header'

function Dashboard() {
  return (
    <div>
    <Header/>
    <UserButton/>
      
    </div>
  )
}

export default Dashboard
