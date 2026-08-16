interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  image: string;
}

const SITE_NAME = "Lando Travels";
const SITE_URL = "https://www.landotravels.com";

const SEO = ({
  title,
  description,
  canonical,
  image,
}: SEOProps) => {
  const fullImageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}${image}`;

  return (
    <>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_LK" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:type" content="image/webp" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
    </>
  );
};

export default SEO;