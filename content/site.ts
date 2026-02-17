export const siteContent = {
  brand: {
    name: "Somos Dualidad",
    logoText: "Somos Dualidad",
    tagline: "TODO: Escribe un tagline breve que exprese la esencia de tu propuesta.",
    valueProposition:
      "TODO: Define en 1-2 frases cómo acompañas procesos de transformación de forma concreta y humana.",
    primaryCta: {
      label: "TODO: Reservar / Unirme / Empezar",
      href: "/contacto"
    },
    secondaryCta: {
      label: "TODO: Conocer el método",
      href: "/sobre"
    }
  },
  navigation: [
    { label: "Inicio", href: "/" },
    { label: "Sobre", href: "/sobre" },
    { label: "Experiencias", href: "/sobre#experiencias" },
    { label: "Recursos", href: "/recursos" },
    { label: "Contacto", href: "/contacto" }
  ],
  trustIndicators: [
    "TODO: Acompañamiento 1:1",
    "TODO: Rituales conscientes",
    "TODO: Comunidad viva"
  ],
  manifestoShort:
    "TODO: Somos un espacio para integrar luz y sombra con presencia, estructura y práctica real.",
  manifestoLong:
    "TODO: Cuenta aquí la historia extendida de la marca, el porqué del proyecto y el impacto que buscas generar. Usa lenguaje simple, honesto y directo.",
  aboutIntro:
    "TODO: Describe qué es Somos Dualidad y para quién fue creado, sin frases vacías.",
  experiences: [
    {
      title: "TODO: Experiencia 01",
      description:
        "TODO: Explica en dos líneas qué incluye, cómo se vive y qué resultado puede esperar la persona.",
      cta: "Ver más"
    },
    {
      title: "TODO: Experiencia 02",
      description:
        "TODO: Explica en dos líneas qué incluye, cómo se vive y qué resultado puede esperar la persona.",
      cta: "Ver más"
    },
    {
      title: "TODO: Experiencia 03",
      description:
        "TODO: Explica en dos líneas qué incluye, cómo se vive y qué resultado puede esperar la persona.",
      cta: "Ver más"
    }
  ],
  methodSteps: [
    {
      title: "TODO: Paso 1",
      description: "TODO: Define el primer contacto o diagnóstico de forma clara y breve."
    },
    {
      title: "TODO: Paso 2",
      description: "TODO: Define el trabajo central, ritual o práctica principal."
    },
    {
      title: "TODO: Paso 3",
      description: "TODO: Define integración, seguimiento y próximos pasos sostenibles."
    }
  ],
  values: [
    {
      title: "TODO: Valor 1",
      description: "TODO: Explica el valor en una frase concreta."
    },
    {
      title: "TODO: Valor 2",
      description: "TODO: Explica el valor en una frase concreta."
    },
    {
      title: "TODO: Valor 3",
      description: "TODO: Explica el valor en una frase concreta."
    }
  ],
  testimonials: [
    {
      quote:
        "TODO: Testimonio breve y auténtico sobre una experiencia real de transformación.",
      name: "TODO: Nombre Apellido",
      role: "TODO: Rol / profesión"
    },
    {
      quote: "TODO: Testimonio breve sobre claridad, bienestar o enfoque personal.",
      name: "TODO: Nombre Apellido",
      role: "TODO: Rol / profesión"
    },
    {
      quote:
        "TODO: Testimonio breve sobre resultados concretos en hábitos, energía o decisiones.",
      name: "TODO: Nombre Apellido",
      role: "TODO: Rol / profesión"
    }
  ],
  resources: [
    {
      title: "TODO: Recurso 01",
      type: "Guía",
      description: "TODO: Describe qué aprenderá la persona en este recurso.",
      href: "/recursos"
    },
    {
      title: "TODO: Recurso 02",
      type: "Audio",
      description: "TODO: Describe cómo este recurso acompaña una práctica cotidiana.",
      href: "/recursos"
    },
    {
      title: "TODO: Recurso 03",
      type: "Artículo",
      description: "TODO: Resume el beneficio principal de leer este contenido.",
      href: "/recursos"
    }
  ],
  faq: [
    {
      question: "TODO: ¿Cómo sé si Somos Dualidad es para mí?",
      answer: "TODO: Aclara perfil ideal, momento vital y objetivo esperado."
    },
    {
      question: "TODO: ¿Necesito experiencia previa?",
      answer: "TODO: Explica nivel de entrada y acompañamiento inicial."
    },
    {
      question: "TODO: ¿Las sesiones son online, presenciales o mixtas?",
      answer: "TODO: Detalla formato disponible y alcance geográfico."
    },
    {
      question: "TODO: ¿Cuánto duran los procesos?",
      answer: "TODO: Explica duración estándar y flexibilidad."
    },
    {
      question: "TODO: ¿Qué incluye cada experiencia?",
      answer: "TODO: Resume entregables, soporte y materiales."
    },
    {
      question: "TODO: ¿Cómo puedo reservar o empezar?",
      answer: "TODO: Explica pasos para agendar y primer contacto."
    }
  ],
  finalCta: {
    title: "TODO: Una invitación clara para empezar tu proceso con presencia.",
    description:
      "TODO: Explica el siguiente paso con una promesa realista y medible en pocas palabras.",
    buttonLabel: "TODO: Quiero empezar"
  },
  contact: {
    email: "TODO: correo@dominio.com",
    newsletterPlaceholder: "Tu correo electrónico",
    formSuccess: "Gracias. Tu mensaje fue enviado con éxito.",
    formError: "No se pudo enviar tu mensaje. Intenta nuevamente o usa email directo."
  },
  social: [
    { label: "Instagram", href: "TODO: https://instagram.com/tuusuario" },
    { label: "YouTube", href: "TODO: https://youtube.com/@tu-canal" },
    { label: "Spotify", href: "TODO: https://open.spotify.com/show/..." }
  ],
  legal: [
    { label: "TODO: Aviso legal", href: "TODO: /legal" },
    { label: "TODO: Política de privacidad", href: "TODO: /privacidad" },
    { label: "TODO: Términos y condiciones", href: "TODO: /terminos" }
  ],
  seo: {
    siteUrl: "TODO: https://tudominio.com",
    defaultTitle: "Somos Dualidad | TODO: Título SEO principal",
    defaultDescription:
      "TODO: Describe en 140-160 caracteres la propuesta de valor y el beneficio principal.",
    ogImage: "/opengraph-image"
  }
} as const;

export type SiteContent = typeof siteContent;
