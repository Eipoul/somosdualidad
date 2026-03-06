import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  email: string;
  siteUrl: string;
}

export function WelcomeEmail({ email, siteUrl }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Bienvenida a Somos Dualidad — Te alegra mucho tenerte aquí 🌿</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={brandName}>Somos Dualidad</Heading>
          </Section>

          {/* Body */}
          <Section style={content}>
            <Heading style={h1}>Bienvenida 🌿</Heading>
            <Text style={paragraph}>
              Nos alegra mucho tenerte aquí. Al suscribirte a Somos Dualidad, ahora formas parte de una comunidad que explora honestamente las complejidades de la vida.
            </Text>
            <Text style={paragraph}>
              Recibirás en tu correo cada nuevo episodio, junto con reflexiones y contenido exclusivo que no publicamos en otro lugar.
            </Text>

            <Section style={buttonContainer}>
              <Button href={`${siteUrl}/podcast`} style={button}>
                Escuchar episodios
              </Button>
            </Section>

            <Hr style={divider} />

            <Heading style={h2}>¿Qué puedes esperar?</Heading>
            <Text style={listItem}>🎙️ <strong>Nuevos episodios</strong> — los recibirás directamente aquí.</Text>
            <Text style={listItem}>✍️ <strong>Reflexiones exclusivas</strong> — contenido solo para suscriptores.</Text>
            <Text style={listItem}>🌿 <strong>Sin spam</strong> — solo escribimos cuando tenemos algo valioso.</Text>

            <Hr style={divider} />

            <Text style={paragraph}>
              Con cariño,
              <br />
              <strong>El equipo de Somos Dualidad</strong>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Recibiste este correo porque te suscribiste en{" "}
              <Link href={siteUrl} style={footerLink}>somosdualidad.com</Link>
            </Text>
            <Text style={footerText}>
              <Link
                href={`${siteUrl}/api/unsubscribe?email=${encodeURIComponent(email)}`}
                style={footerLink}
              >
                Cancelar suscripción
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#FAF7F2",
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px 0",
};

const header = {
  backgroundColor: "#2C1A0E",
  padding: "32px 40px",
  borderRadius: "16px 16px 0 0",
};

const brandName = {
  color: "#FAF7F2",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0",
};

const content = {
  backgroundColor: "#FFFFFF",
  padding: "40px",
};

const h1 = {
  color: "#2C1A0E",
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 16px",
};

const h2 = {
  color: "#2C1A0E",
  fontSize: "20px",
  fontWeight: "700",
  margin: "24px 0 16px",
};

const paragraph = {
  color: "#6B4C35",
  fontSize: "16px",
  lineHeight: "1.7",
  margin: "0 0 16px",
};

const listItem = {
  color: "#6B4C35",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 8px",
};

const buttonContainer = {
  margin: "32px 0",
};

const button = {
  backgroundColor: "#C4714F",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: "600",
  padding: "14px 28px",
  borderRadius: "100px",
  textDecoration: "none",
  display: "inline-block",
};

const divider = {
  borderColor: "#E8E1D7",
  margin: "32px 0",
};

const footer = {
  backgroundColor: "#FAF7F2",
  padding: "24px 40px",
  borderRadius: "0 0 16px 16px",
};

const footerText = {
  color: "#8F8678",
  fontSize: "12px",
  margin: "0 0 8px",
  textAlign: "center" as const,
};

const footerLink = {
  color: "#C4714F",
  textDecoration: "underline",
};
