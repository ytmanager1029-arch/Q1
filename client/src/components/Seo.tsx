import { Helmet } from "react-helmet-async";
import { site, siteUrl } from "@/data/site";

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
};

export function Seo({
  title,
  description = site.description,
  path = "/",
  image = "/images/og.jpg",
  noindex = false,
}: SeoProps) {
  const fullTitle = title ? `${title} — Quadrick` : "Quadrick — Web Development Agency";
  const url = `${siteUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}
      {siteUrl ? <link rel="canonical" href={url} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Quadrick" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {siteUrl ? <meta property="og:url" content={url} /> : null}
      {siteUrl ? <meta property="og:image" content={imageUrl} /> : <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
