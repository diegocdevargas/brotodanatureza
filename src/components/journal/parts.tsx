// Blog pieces: dark hero, post meta row, featured card, grid card and prev/next card (WordPress posts).
import Link from "next/link";
import { postMeta, type Post } from "@/lib/wordpress";
import { decodeEntities, formatDate, plainText, readingTime } from "@/lib/format";
import { Arrow, PlantImage } from "../ui";
import { Reveal } from "../motion";

export const postHref = (p: Post) => `/blog/${p.slug}`;

/** Dark rounded hero. Appear: eyebrow 0, title .08, copy .16 (tween .9s, y 28). */
export function JoHero({ eyebrow, line1, line2, copy, variant = "blog" }: {
  eyebrow: string; line1: string; line2: string; copy: string; variant?: "blog" | "doc";
}) {
  return (
    <section className={`jo-hero jo-hero--${variant}`}>
      <div className="jo-hero__media" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/forest.jpg" alt="" />
        <div className="jo-hero__tint" />
        <div className="jo-hero__shade" />
      </div>
      <div className="jo-hero__inner">
        <Reveal y={28}><span className="eyebrow dark">{eyebrow}</span></Reveal>
        <Reveal as="h1" y={28} delay={0.08} className="jo-h78 jo-hero__title">
          <span>{line1}</span><br /><span className="lime">{line2}</span>
        </Reveal>
        <Reveal as="p" y={28} delay={0.16} className="jo-lead jo-hero__copy">{copy}</Reveal>
      </div>
    </section>
  );
}

/** Author / date / read-time row with 4px dots. */
export function Meta({ post, withAuthor, className = "" }: { post: Post; withAuthor?: boolean; className?: string }) {
  const { author } = postMeta(post);
  return (
    <div className={`jo-meta ${className}`}>
      {withAuthor && author && <><span className="jo-meta__author">{author}</span><i className="jo-dot" aria-hidden /></>}
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <i className="jo-dot" aria-hidden />
      <span>{readingTime(post.content?.rendered)}</span>
    </div>
  );
}

export function FeaturedCard({ post }: { post: Post }) {
  const { image, category } = postMeta(post);
  return (
    <Link href={postHref(post)} className="jo-feat">
      <div className="jo-feat__cover"><PlantImage src={image} /></div>
      <div className="jo-feat__copy">
        {category && <span className="jo-pill jo-pill--lime">{category}</span>}
        <h3 className="jo-h40 jo-feat__title">{decodeEntities(post.title.rendered)}</h3>
        <p className="t-15 soft jo-feat__ex jo-clamp">{plainText(post.excerpt.rendered)}</p>
        <Meta post={post} withAuthor className="jo-meta--stack" />
        <span className="btn btn--dark jo-readbtn"><span>Ler artigo</span><span className="btn__arrow"><Arrow /></span></span>
      </div>
    </Link>
  );
}

export function ArticleCard({ post }: { post: Post }) {
  const { image, category } = postMeta(post);
  return (
    <Link href={postHref(post)} className="jo-card">
      <div className="jo-card__cover">
        <PlantImage src={image} />
        {category && <span className="jo-pill jo-pill--glass">{category}</span>}
      </div>
      <div className="jo-card__copy">
        <h3 className="jo-h25">{decodeEntities(post.title.rendered)}</h3>
        <p className="t-13 soft jo-card__ex jo-clamp">{plainText(post.excerpt.rendered)}</p>
        <Meta post={post} />
      </div>
    </Link>
  );
}

export function NeighbourCard({ post, label }: { post: Post; label: string }) {
  const { image } = postMeta(post);
  return (
    <Link href={postHref(post)} className="jo-nb">
      <div className="jo-nb__cover"><PlantImage src={image} /></div>
      <div className="jo-nb__copy">
        <p className="t-12b accent">{label}</p>
        <h3 className="jo-h25">{decodeEntities(post.title.rendered)}</h3>
        <p className="t-13 muted">{readingTime(post.content?.rendered)}</p>
      </div>
    </Link>
  );
}
