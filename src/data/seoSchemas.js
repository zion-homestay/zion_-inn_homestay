export const BASE_URL = 'https://zion-homestay.com';

export function getLodgingBusinessSchema(faqs = null) {
  const lodgingEntity = {
    '@type': ['LodgingBusiness', 'BedAndBreakfast'],
    '@id': `${BASE_URL}/#homestay`,
    name: 'Zion Inn Homestay',
    alternateName: [
      'Zion Inn Rooms',
      'Zion Inn',
      'Zion Inn Neyyoor',
      'Zion Inn Homestay Kanyakumari',
      'சீயோன் இன் ஹோம்ஸ்டே'
    ],
    description: 'Ministry of Tourism approved family homestay in Neyyoor, Kanyakumari. Handcrafted AC and Non-AC king bedrooms, private verandas, 24/7 power backup, high-speed fiber Wi-Fi, and gated parking—just 750 m from Eraniel Railway Station and 6.9 km from Padmanabhapuram Palace.',
    award: 'Ministry of Tourism Approved',
    url: `${BASE_URL}/`,
    telephone: ['+918148437600', '+919385668505'],
    email: 'zioninn.bnb@gmail.com',
    priceRange: '₹1000 - ₹1200',
    checkinTime: '14:00:00+05:30',
    checkoutTime: '11:00:00+05:30',
    image: [
      `${BASE_URL}/images/hero-banner-v3.webp`,
      `${BASE_URL}/images/ac-room1.webp`,
      `${BASE_URL}/images/the-space.webp`,
      `${BASE_URL}/images/reception.jpg`
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zion Inn Homestay, Near Eraniel Railway Station, Neyyoor',
      addressLocality: 'Neyyoor',
      addressRegion: 'Tamil Nadu',
      postalCode: '629802',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 8.2145,
      longitude: 77.2918
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Neyyoor',
        '@id': 'https://www.wikidata.org/wiki/Q7021677'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Kanyakumari District',
        '@id': 'https://www.wikidata.org/wiki/Q15155'
      },
      {
        '@type': 'LandmarksOrHistoricalBuildings',
        name: 'Padmanabhapuram Palace',
        '@id': 'https://www.wikidata.org/wiki/Q2231267'
      }
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'High-speed Fiber Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: '24/7 Power Backup', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Private Balconies', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Secure On-Site Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'En-suite Bathroom', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Tranquil Flowering Garden', value: true }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Homestay Accommodation Options',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'HotelRoom',
            name: 'AC Room',
            description: 'Cool tranquil room with handcrafted king bed, private veranda, air conditioning and attached bathroom. Rate covers 2 adults; two kids go free.',
            bed: '1 King Bed (6ft)',
            occupancy: { '@type': 'QuantitativeValue', value: 2, unitText: 'person' }
          },
          price: 1200,
          priceCurrency: 'INR'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'HotelRoom',
            name: 'Non-AC Room',
            description: 'Breezy comfortable room with handcrafted king bed, garden view, and attached bathroom. Rate covers 2 adults; two kids go free.',
            bed: '1 King Bed (6ft)',
            occupancy: { '@type': 'QuantitativeValue', value: 2, unitText: 'person' }
          },
          price: 1000,
          priceCurrency: 'INR'
        }
      ]
    },
    sameAs: [
      'https://maps.google.com/?q=Neyyoor,+Kanyakumari+District,+Tamil+Nadu+629802'
    ]
  };

  if (!faqs || faqs.length === 0) {
    return {
      '@context': 'https://schema.org',
      ...lodgingEntity
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      lodgingEntity,
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a
          }
        }))
      }
    ]
  };
}

export function getRoomsSchema(rooms) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Rooms & Rates',
            item: `${BASE_URL}/rooms`
          }
        ]
      },
      {
        '@type': 'ItemList',
        name: 'Rooms & Suites at Zion Inn Homestay',
        itemListElement: (rooms || []).map((room, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'HotelRoom',
            name: room.name,
            description: room.description,
            bed: room.bed,
            image: `${BASE_URL}${room.image}`,
            occupancy: {
              '@type': 'QuantitativeValue',
              value: room.capacity,
              unitText: 'person'
            },
            offers: {
              '@type': 'Offer',
              price: room.price,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
              url: `${BASE_URL}/rooms`
            }
          }
        }))
      }
    ]
  };
}

export function getGallerySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Photo Gallery',
        item: `${BASE_URL}/gallery`
      }
    ]
  };
}

export function getContactSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${BASE_URL}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Contact & Location',
            item: `${BASE_URL}/contact`
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: (faqs || []).map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a
          }
        }))
      }
    ]
  };
}
