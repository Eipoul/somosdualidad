import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log("Seeding database...");

  // 1. Sample episode
  const { data: episode, error: epError } = await supabase
    .from("episodes")
    .upsert(
      {
        title: "Episodio 1: Las dos caras del amor",
        slug: "episodio-1-las-dos-caras-del-amor",
        description:
          "En este primer episodio exploramos cómo el amor tiene dos caras: la que nos eleva y la que nos desafía. Una conversación honesta sobre lo que significa amar y ser amado.",
        show_notes:
          "<h2>Notas del episodio</h2><p>En este episodio hablamos sobre la dualidad del amor: cómo puede ser nuestra fuente de mayor alegría y también de nuestro mayor dolor.</p><h3>Temas que tocamos</h3><ul><li>¿Qué significa amar incondicionalmente?</li><li>La diferencia entre el amor propio y el amor hacia otros</li><li>Cómo las heridas del pasado moldean nuestra forma de amar</li></ul>",
        duration: "52 min",
        season: 1,
        tags: ["amor", "relaciones", "crecimiento personal"],
        status: "published",
        published_at: new Date("2024-01-15").toISOString(),
      },
      { onConflict: "slug" }
    )
    .select()
    .single();

  if (epError) console.error("Episode seed error:", epError.message);
  else console.log("✓ Episode created:", episode.title);

  // 2. Sample blog post
  const { data: post, error: postError } = await supabase
    .from("posts")
    .upsert(
      {
        title: "Por qué las dualidades nos hacen más humanos",
        slug: "por-que-las-dualidades-nos-hacen-mas-humanos",
        content:
          "<p>Vivimos en un mundo que nos exige elegir: estar feliz <em>o</em> estar triste, ser fuerte <em>o</em> ser vulnerable, avanzar <em>o</em> quedarse. Pero la realidad humana es mucho más rica que cualquier dicotomía.</p><p>Las dualidades no son contradicciones que debemos resolver. Son tensiones creativas que nos definen. Somos capaces de sostener alegría y duelo al mismo tiempo, de ser valientes y tener miedo en el mismo momento.</p><h2>Aprendiendo a vivir en el entre</h2><p>El espacio entre los opuestos es donde ocurre la vida real. No es la certeza total ni la duda absoluta: es la exploración honesta de ambas.</p>",
        cover_image_url: null,
        category: "Reflexiones",
        status: "published",
        published_at: new Date("2024-01-20").toISOString(),
      },
      { onConflict: "slug" }
    )
    .select()
    .single();

  if (postError) console.error("Post seed error:", postError.message);
  else console.log("✓ Blog post created:", post.title);

  // 3. Default page config
  const { error: configError } = await supabase
    .from("page_configs")
    .upsert(
      {
        page: "home",
        config: [
          {
            id: "block-hero-1",
            type: "hero",
            order: 0,
            props: {
              title: "Somos Dualidad",
              subtitle: "Un podcast sobre las dualidades de la vida",
              ctaPrimary: "Escuchar ahora",
              ctaSecondary: "Suscribirse",
            },
          },
          {
            id: "block-about-1",
            type: "about",
            order: 1,
            props: {
              title: "Nuestra Historia",
              description: "Somos Dualidad nació de la necesidad de hablar con honestidad sobre la complejidad de ser humano.",
            },
          },
          {
            id: "block-newsletter-1",
            type: "newsletter-cta",
            order: 2,
            props: {
              title: "No te pierdas ningún episodio",
              description: "Suscríbete y recibe cada nuevo episodio en tu correo.",
              buttonLabel: "Suscribirme",
            },
          },
        ],
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page" }
    );

  if (configError) console.error("Page config seed error:", configError.message);
  else console.log("✓ Home page config created");

  console.log("\nSeed complete! 🌿");
}

seed().catch(console.error);
