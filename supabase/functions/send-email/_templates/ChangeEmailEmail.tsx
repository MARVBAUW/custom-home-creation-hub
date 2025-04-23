
import {
  Button,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { EmailLayout } from './EmailLayout.tsx'

interface ChangeEmailEmailProps {
  confirmationUrl: string;
  userName?: string;
  newEmail: string;
}

export const ChangeEmailEmail = ({
  confirmationUrl,
  userName,
  newEmail,
}: ChangeEmailEmailProps) => (
  <EmailLayout
    title="Confirmation de changement d'email - Progineer"
    preview="Confirmez votre nouvel email Progineer"
  >
    <Text style={paragraph}>
      {userName ? `Bonjour ${userName},` : 'Bonjour,'}
    </Text>
    
    <Text style={paragraph}>
      Vous avez demandé à changer votre adresse email pour : {newEmail}
    </Text>

    <Text style={paragraph}>
      Pour confirmer ce changement, cliquez sur le bouton ci-dessous :
    </Text>

    <Section style={buttonContainer}>
      <Button href={confirmationUrl} style={button}>
        Confirmer mon nouvel email
      </Button>
    </Section>

    <Text style={expireText}>
      Ce lien est valable pendant une durée limitée.
      Si vous n'avez pas demandé ce changement, vous pouvez ignorer cet email.
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

