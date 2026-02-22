const apiKey = process.env.BUILDER_PRIVATE_API_KEY

if (!apiKey) {
  console.error('Missing BUILDER_PRIVATE_API_KEY')
  process.exit(1)
}

const body = {
  name: 'Home',
  modelName: 'page',
  published: 'published',
  query: [{property: 'urlPath', operator: 'is', value: '/'}],
  data: {
    title: 'Somos Dualidad',
    blocks: [
      {
        '@type': '@builder.io/sdk:Element',
        component: {name: 'HeroSection', options: {headline: 'Somos Dualidad', subheading: 'Conversaciones para habitar los matices.', ctaLabel: 'Escuchar ahora', ctaHref: '/episodios'}},
      },
      {
        '@type': '@builder.io/sdk:Element',
        component: {name: 'TextBlockSection', options: {title: '¿Qué es Somos Dualidad?', text: 'Un espacio editorial para explorar las contradicciones que nos vuelven humanos.'}},
      },
      {'@type': '@builder.io/sdk:Element', component: {name: 'LatestEpisodesSection', options: {title: 'Últimos episodios'}}},
      {'@type': '@builder.io/sdk:Element', component: {name: 'FeaturedEpisodeSection', options: {title: 'Episodio destacado'}}},
      {'@type': '@builder.io/sdk:Element', component: {name: 'NewsletterSection', options: {title: 'Recibe nuevos episodios', subtitle: 'Una nota curada en tu correo.'}}},
    ],
  },
}

const response = await fetch('https://builder.io/api/v1/write/page', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
})

if (!response.ok) {
  console.error('Builder seed failed', await response.text())
  process.exit(1)
}

console.log('Builder homepage template created/updated.')
