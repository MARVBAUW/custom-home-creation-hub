
import {
  Button,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { EmailLayout } from './EmailLayout.tsx'

interface MagicLinkEmailProps {
  magicLink: string;
  userName?: string;
}

export const MagicLinkEmail = ({
  magicLink,
  userName,
}: MagicLinkEmailProps) => (
  <EmailLayout
    title="Connexion à Progineer"
    preview="Votre lien de connexion à Progineer"
  >
    <Text style={paragraph}>
      {userName ? `Bonjour ${userName},` : 'Bonjour,'}
    </Text>
    
    <Text style={paragraph}>
      Voici votre lien de connexion à Progineer. Cliquez sur le bouton ci-dessous pour vous connecter :
    </Text>

    <Section style={buttonContainer}>
      <Button href={magicLink} style={button}>
        Se connecter
      </Button>
    </Section>

    <Text style={expireText}>
      Ce lien est valable pendant une durée limitée et ne peut être utilisé qu'une seule fois.
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

