
import {
  Button,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { EmailLayout } from './EmailLayout.tsx'

interface ConfirmationEmailProps {
  confirmationUrl: string;
  userName?: string;
}

export const ConfirmationEmail = ({
  confirmationUrl,
  userName,
}: ConfirmationEmailProps) => (
  <EmailLayout
    title="Confirmation d'inscription - Progineer"
    preview="Confirmez votre inscription à Progineer"
  >
    <Text style={paragraph}>
      {userName ? `Bonjour ${userName},` : 'Bonjour,'}
    </Text>
    
    <Text style={paragraph}>
      Merci de vous être inscrit sur Progineer. Pour finaliser votre inscription et activer votre compte, 
      cliquez sur le bouton ci-dessous :
    </Text>

    <Section style={buttonContainer}>
      <Button
        href={confirmationUrl}
        style={button}
      >
        Confirmer mon adresse email
      </Button>
    </Section>

    <Text style={expireText}>
      Ce lien est valable pendant une durée limitée.
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
