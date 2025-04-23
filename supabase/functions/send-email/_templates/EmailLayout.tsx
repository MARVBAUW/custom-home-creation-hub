
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface EmailLayoutProps {
  children: React.ReactNode;
  title: string;
  preview?: string;
}

export const EmailLayout = ({
  children,
  title,
  preview
}: EmailLayoutProps) => (
  <Html>
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
    </Head>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img
            src="https://91ebbb69-1cec-4b94-987f-8a34d9dae720.lovableproject.com/images/progineer-logo.png"
            alt="Logo Progineer"
            style={logo}
          />
          <Text style={heading}>Bienvenue chez <span style={brandSpan}>Progineer</span></Text>
          <Text style={subheading}>L'architecture pensée pour demain</Text>
        </Section>
        
        <Section style={content}>
          {children}
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Si vous n'avez pas créé de compte, ignorez simplement cet e-mail.
          </Text>
          <Text style={footerCopyright}>
            © Progineer - Tous droits réservés
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: '#f4f4f4',
  fontFamily: "'Helvetica Neue', sans-serif",
  color: '#333',
}

const container = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  overflow: 'hidden',
}

const header = {
  backgroundColor: '#d4d2c5',
  padding: '30px 20px',
  textAlign: 'center' as const,
}

const logo = {
  maxHeight: '60px',
  marginBottom: '20px',
}

const heading = {
  margin: '0',
  fontSize: '28px',
  color: '#333',
}

const brandSpan = {
  color: '#556b2f',
}

const subheading = {
  marginTop: '8px',
  fontSize: '16px',
}

const content = {
  padding: '30px 20px',
}

const footer = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  textAlign: 'center' as const,
}

const footerText = {
  fontSize: '14px',
  color: '#999',
  margin: '0',
}

const footerCopyright = {
  fontSize: '14px',
  color: '#999',
  marginTop: '5px',
}

