
import {
  Button,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { EmailLayout } from './EmailLayout.tsx'

interface ResetPasswordEmailProps {
  resetUrl: string;
  userName?: string;
}

export const ResetPasswordEmail = ({
  resetUrl,
  userName,
}: ResetPasswordEmailProps) => (
  <EmailLayout
    title="Réinitialisation de mot de passe - Progineer"
    preview="Réinitialisez votre mot de passe Progineer"
  >
    <Text style={paragraph}>
      {userName ? `Bonjour ${userName},` : 'Bonjour,'}
    </Text>
    
    <Text style={paragraph}>
      Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous 
      pour choisir un nouveau mot de passe :
    </Text>

    <Section style={buttonContainer}>
      <Button href={resetUrl} style={button}>
        Réinitialiser mon mot de passe
      </Button>
    </Section>

    <Text style={expireText}>
      Ce lien est valable pendant une durée limitée.
      Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.
    </Text>
  </EmailLayout>
)

const paragraph = {
  fontSize: '16px',
  marginBottom: '20px',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
}

const button = {
  backgroundColor: '#556b2f',
  color: '#ffffff',
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '6px',
  fontWeight: 'bold',
  fontSize: '16px',
}

const expireText = {
  fontSize: '14px',
  color: '#777',
  textAlign: 'center' as const,
}

