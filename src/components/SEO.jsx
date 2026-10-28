import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SITE_DOMAIN = 'https://zion-homestay.com';
export const SITE_NAME = 'Zion Inn Homestay';

export default function SEO({
  title,
  description,
  path = '/',
  image = '/og-image.jpg',
  schema = null,
  noindex = false
}) {
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${SITE_DOMAIN}${cleanPath || '/'}`;
  const fullImageUrl = image.startsWith('http') 
    ? image 
    : `${SITE_DOMAIN}${image.startsWith('/') ? image : `/${image}`}`;

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
