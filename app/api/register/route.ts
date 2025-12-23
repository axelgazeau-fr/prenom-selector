import { NextRequest, NextResponse } from 'next/server'
import userStore from '../userStore'

export async function POST(request: NextRequest) {
  try {
    const { prenom } = await request.json()
    
    if (!prenom || !['raphael', 'papa', 'maman', 'marion', 'guillaume', 'valentine'].includes(prenom.toLowerCase())) {
      return NextResponse.json(
        { error: 'Prénom invalide' },
        { status: 400 }
      )
    }
    
    // Enregistrer l'utilisateur
    const users = userStore.setUser(prenom.toLowerCase() as 'raphael' | 'papa' | 'maman' | 'marion' | 'guillaume' | 'valentine', true)
    
    return NextResponse.json({
      success: true,
      users,
      allConnected: userStore.allConnected(),
      message: `${prenom} enregistré avec succès`
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// Reset endpoint (optionnel, pour les tests)
export async function DELETE() {
  const users = userStore.reset()
  
  return NextResponse.json({
    success: true,
    users,
    message: 'Statuts réinitialisés'
  })
}
