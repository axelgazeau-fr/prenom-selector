import { NextResponse } from 'next/server'
import userStore from '../userStore'

export async function GET() {
  const users = userStore.getAll()
  const allConnected = userStore.allConnected()
  const count = userStore.getCount()
  
  return NextResponse.json({
    users,
    allConnected,
    count
  })
}
