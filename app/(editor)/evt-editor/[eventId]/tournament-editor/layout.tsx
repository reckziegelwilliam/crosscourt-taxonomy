import React from 'react'
import { TournamentProvider } from 'context/tournament-form-context'

const CreateEvtLayout = ({ children } : {children: React.ReactNode }) => {
  return (
        <TournamentProvider>
            {children}
        </TournamentProvider>
  )
}

export default CreateEvtLayout