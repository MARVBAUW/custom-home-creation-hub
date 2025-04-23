
import {
  Button,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { EmailLayout } from './EmailLayout.tsx'

interface ReauthenticationEmailProps {
  reauthUrl: string;
  userName?: string;
}

export const ReauthenticationEmail = ({
  reauthUrl,
  userName,
}: ReauthenticationEmailProps) => (
  <EmailLayout
    title="Confirmation de connexion - Progineer"
    preview="Confirmez votre connexion à Progineer"
  >
    <Text style={paragraph}>
      {userName ? `Bonjour ${userName},` : 'Bonjour,'}
    </Text>
    
    <Text style={paragraph}>
      Pour des raisons de sécurité, nous avons besoin de confirmer votre identité. 
      Cliquez sur le bouton ci-dessous pour vous reconnecter :
    </Text>

    <Section style={buttonContainer}>
      <Button href={reauthUrl} style={button}>
        Confirmer ma connexion
      </Button>
    </Section>

    <Text style={expireText}>
      Ce lien est valable pendant une durée limitée.
      Si vous n'avez pas tenté de vous connecter, vous pouvez ignorer cet email.
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

