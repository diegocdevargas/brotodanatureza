// Blog teaser: featured dark card + latest rows, from WordPress posts.
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Arrow, PlantImage } from "@/components/ui";
import { postMeta, type Post } from "@/lib/wordpress";
import { decodeEntities, plainText, readingTime } from "@/lib/format";
import { Cta, Head } from "./bits";

export default function Blog({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;
  const [featured, ...latest] = posts;
  const f = postMeta(featured);
  return (
    <section className="ho ho-narrow ho-blog" aria-labelledby="blog-title">
      <Reveal y={32} amount={0.3}>
        <Head id="blog-title" eyebrow="Blog" title={<>Histórias e saberes<br />do <span className="accent">mundo verde.</span></>}
          copy="Artigos sobre plantas medicinais, saúde natural e fitoterapia — escritos para serem lidos com calma."
          cta={<Cta href="/blog">Ver todos os artigos</Cta>} />
      </Reveal>
      <div className="ho-blog__grid">
        <Reveal className="ho-blog__feat" delay={0.1} y={32}>
          <Link href={`/blog/${featured.slug}`} className="ho-feat ho-lift">
            <PlantImage className="ho-feat__cover" src={f.image} />
            <div className="ho-feat__copy">
              <div className="ho-meta">
                {f.category && <span className="ho-cat">{f.category}</span>}
                <span className="t-13" style={{ color: "var(--white-55)" }}>{readingTime(featured.content?.rendered)}</span>
              </div>
              <h3 className="d-40 ho-h16">{decodeEntities(featured.title.rendered)}</h3>
              <p className="t-15 ho-clamp" style={{ color: "var(--white-75)" }}>{plainText(featured.excerpt.rendered)}</p>
              <span className="ho-feat__read">Ler artigo <Arrow size={16} /></span>
            </div>
          </Link>
        </Reveal>
        {latest.length > 0 && (
          <Reveal className="ho-blog__list" delay={0.2} y={32}>
            {latest.map((p) => {
              const m = postMeta(p);
              return (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="ho-row ho-lift">
                  <PlantImage className="ho-row__cover" src={m.image} />
                  <div className="ho-row__copy">
                    <div className="ho-meta">
                      {m.category && <span className="ho-cat">{m.category}</span>}
                      <span className="t-13 muted">{readingTime(p.content?.rendered)}</span>
                    </div>
                    <h3 className="d-25 ho-h16">{decodeEntities(p.title.rendered)}</h3>
                    <p className="t-15 soft ho-clamp">{plainText(p.excerpt.rendered)}</p>
                  </div>
                </Link>
              );
            })}
          </Reveal>
        )}
      </div>
    </section>
  );
}
