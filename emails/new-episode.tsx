import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface NewEpisodeEmailProps {
  email: string;
  episode: {
    title: string;
    description: string;
    coverImageUrl?: string;
    slug: string;
  };
  siteUrl: string;
}

export function NewEpisodeEmail({ email, episode, siteUrl }: NewEpisodeEmailProps) {
  const episodeUrl = `${siteUrl}/podcast/${episode.slug}`;

  return (
    <Html>
      <Head />
      <Preview>Nuevo episodio: {episode.title} — ya disponible en Somos Dualidad 🎙️</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={brandName}>Somos Dualidad</Heading>
            <Text style={headerSubtitle}>Nuevo episodio disponible 🎙️</Text>
          </Section>

          {/* Episode cover */}
          {episode.coverImageUrl && (
            <Section style={{ backgroundColor: "#FFFFFF" }}>
              <Img
                src={episode.coverImageUrl}
                alt={episode.title}
                width="600"
                style={coverImage}
              />
            </Section>
          )}

          {/* Content */}
          <Section style={content}>
            <Text style={label}>NUEVO EPISODIO</Text>
            <Heading style={h1}>{episode.title}</Heading>

            {episode.description && (
              <Text style={paragraph}>{episode.description}</Text>
            )}

            <Section style={buttonContainer}>
              <Button href={episodeUrl} style={button}>
                Escuchar ahora
              </Button>
            </Section>

            <Hr style={divider} />

            <Text style={paragraph}>
              Gracias por ser parte de esta comunidad. Esperamos que este episodio resuene contigo.
            </Text>

            <Text style={paragraph}>
              Con cariño,
              <br />
              <strong>El equipo de Somos Dualidad</strong>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Visita{" "}
              <Link href={`${siteUrl}/podcast`} style={footerLink}>
                todos los episodios
              </Link>{" "}
              en somosdualidad.com
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
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 4px",
};

const headerSubtitle = {
  color: "#C4714F",
  fontSize: "14px",
  margin: "0",
};

const coverImage = {
  width: "100%",
  maxHeight: "320px",
  objectFit: "cover" as const,
  display: "block",
};

const content = {
  backgroundColor: "#FFFFFF",
  padding: "40px",
};

const label = {
  color: "#C4714F",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "2px",
  margin: "0 0 12px",
};

const h1 = {
  color: "#2C1A0E",
  fontSize: "26px",
  fontWeight: "700",
  lineHeight: "1.3",
  margin: "0 0 16px",
};

const paragraph = {
  color: "#6B4C35",
  fontSize: "16px",
  lineHeight: "1.7",
  margin: "0 0 16px",
};

const buttonContainer = {
  margin: "32px 0",
};

const button = {
  backgroundColor: "#C4714F",
  color: "#FFFFFF",
  fontSize: "15px",
  fontWeight: "600",
  padding: "16px 32px",
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
