
import {
  Button,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'
import { EmailLayout } from './EmailLayout.tsx'

interface InvitationEmailProps {
  inviteUrl: string;
  invitedBy?: string;
}

export const InvitationEmail = ({
  inviteUrl,
  invitedBy,
}: InvitationEmailProps) => (
  <EmailLayout
    title="Invitation à rejoindre Progineer"
    preview="Vous avez été invité à rejoindre Progineer"
  >
    <Text style={paragraph}>Bonjour,</Text>
    
    <Text style={paragraph}>
      {invitedBy 
        ? `Vous avez été invité par ${invitedBy} à rejoindre Progineer.`
        : "Vous avez été invité à rejoindre Progineer."
      } Pour créer votre compte, cliquez sur le bouton ci-dessous :
    </Text>

    <Section style={buttonContainer}>
      <Button href={inviteUrl} style={button}>
        Créer mon compte
      </Button>
    </Section>

    <Text style={expireText}>
      Cette invitation est valable pendant une durée limitée.
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

