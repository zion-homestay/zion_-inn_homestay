export const INITIAL_ROOMS = [
  {
    id: 'ac-room',
    name: 'AC Room',
    roomType: 'ac',
    view: 'Garden View',
    capacity: 2,
    occupancyNote: '2 Adults (Two kids go free)',
    kidPolicy: 'Two kids go free',
    price: 1200,
    status: 'Available',
    image: '/images/ac-room1.jpg',
    gallery: [
      '/images/ac-room1.jpg',
      '/images/ac-room1-tv.jpg',
      '/images/ac-room2.jpg',
      '/images/bathroom.jpg',
      '/images/reception.jpg'
    ],
    description: 'A cool, tranquil haven with a handcrafted king-size bed, warm teakwood furnishings, and peaceful morning garden views. Rate covers two adults, and two kids go free.',
    bed: '1 King Bed (6ft)',
    features: ['1 King Bed (6ft)', 'Free Wi-Fi', 'Private Balcony', 'Attached Bathroom', 'Two kids go free'],
    amenities: ['High-speed Wi-Fi', 'Air Conditioning', 'En-suite Bathroom', 'Daily Housekeeping', 'Complementary Drinking Water', 'Toiletries'],
    size: '180 sq.ft'
  },
  {
    id: 'non-ac-room',
    name: 'Non-AC Room',
    roomType: 'non-ac',
    view: 'Garden View',
    capacity: 2,
    occupancyNote: '2 Adults (Two kids go free)',
    kidPolicy: 'Two kids go free',
    price: 1000,
    status: 'Available',
    image: '/images/non-ac room2 view2.jpg',
    gallery: [
      '/images/non-ac room.jpg',
      '/images/non-ac room2 view2.jpg',
      '/images/bathroom2.jpg',
    ],
    description: 'A breezy, comfortable room with a handcrafted king-size bed, warm teakwood furnishings, and tranquil garden views. Rate covers two adults, and two kids go free.',
    bed: '1 King Bed (6ft)',
    features: ['1 King Bed (6ft)', 'Free Wi-Fi', 'Private Balcony', 'Attached Bathroom', 'Two kids go free'],
    amenities: ['High-speed Wi-Fi', 'Ceiling Fan', 'En-suite Bathroom', 'Daily Housekeeping', 'Complementary Drinking Water', 'Toiletries'],
    size: '180 sq.ft'
  }
];

export const AMENITIES_LIST = [
  {
    id: 'wifi',
    name: 'High-speed Wi-Fi',
    desc: 'Seamless fiber internet across all rooms and garden verandas.',
    iconName: 'Wifi'
  },
  {
    id: 'balcony',
    name: 'Private Balconies',
    desc: 'Breathe fresh morning air with views of flowering greenery.',
    iconName: 'DoorOpen'
  },
  {
    id: 'parking',
    name: 'Free Parking',
    desc: 'Secure on-premises parking space for cars and two-wheelers.',
    iconName: 'Car'
  },
  {
    id: 'amenities',
    name: 'Amenities',
    desc: 'Complementary drinking water, brush, shampoo. Etc.',
    iconName: 'Sparkles'
  },
  {
    id: 'power',
    name: '24/7 Power Backup',
    desc: 'Uninterrupted power support for lights, fans, and Wi-Fi.',
    iconName: 'Zap'
  },
  {
    id: 'garden',
    name: 'Garden',
    desc: 'Lush outdoor greenery and peaceful open spaces to relax and unwind.',
    iconName: 'Trees'
  }
];

export const ATTRACTIONS_LIST = [
  {
    id: 'padmanabhapuram',
    name: 'Padmanabhapuram Wooden Palace',
    distance: '6.9 km',
    category: 'History & Culture',
    image: '/images/padmanabhapuram.webp',
    description: 'Renowned 16th-century wooden palace of the Travancore Maharajas, famed for intricate wood carvings, cool black granite floors, and regal heritage.',
    driveTime: '12 min drive',
    bestTime: 'Morning (9:00 AM - 1:00 PM)'
  },
  {
    id: 'thirparappu-waterfalls',
    name: 'Thirparappu Waterfalls',
    distance: '24 km',
    category: 'Waterfalls',
    image: '/images/thirparappu-waterfalls.webp',
    description: 'A 50-foot cascading multi-tiered waterfall fed by the Kodayar River, featuring a picturesque bathing pool and the historic Lord Shiva temple.',
    driveTime: '38 min drive',
    bestTime: 'Morning (9:00 AM - 1:00 PM)'
  },
  {
    id: 'thiruvithancode-arappally',
    name: 'Historical Thomayar Kovil (Thiruvithancode Arappally)',
    distance: '3.7 km',
    category: 'Spiritual Heritage',
    image: '/images/thiruvithancode-arappally.webp',
    description: 'Ancient historic stone church built around 64 AD by St. Thomas, disciple of Jesus Christ. Known as Arappally or Thomayar Kovil, it is venerated as one of the oldest standing church monuments in the world.',
    driveTime: '8 min drive',
    bestTime: 'Morning (8:00 AM - 12:00 PM) or Evening (4:00 PM - 7:00 PM)'
  },
  {
    id: 'periya-nayagi-shrine',
    name: 'Periya Nayagi Annai Shrine (Church of Ascension)',
    tamilName: 'பெரிய நாயகி அன்னை திருத்தலம், திருவிதாங்கோடு',
    distance: '3.1 km',
    category: 'Spiritual Heritage',
    image: '/images/church-of-ascension.webp',
    description: 'Historic Church of the Ascension of Our Lord and sacred pilgrimage shrine of Periya Nayagi Annai (பெரிய நாயகி அன்னை திருத்தலம், திருவிதாங்கோடு), celebrated for its peaceful atmosphere and spiritual heritage.',
    driveTime: '7 min drive',
    bestTime: 'Morning or Evening'
  },
  {
    id: 'muttom',
    name: 'Muttom Rocky Beach & Lighthouse',
    distance: '11.6 km',
    category: 'Coastline',
    image: '/images/muttom-beach.webp',
    description: 'A striking rocky coastline featuring an iconic century-old colonial lighthouse, dramatic sea waves, panoramic sunset vistas, and tranquil shores.',
    driveTime: '20 min drive',
    bestTime: 'Sunset (4:30 PM - 6:30 PM)'
  },
  {
    id: 'mathur',
    name: 'Mathur Hanging Aqueduct',
    distance: '16.2 km',
    category: 'Scenic Landmark',
    image: '/images/mathur-aqueduct.webp',
    description: 'One of Asia’s longest and highest hanging trough aqueducts, towering 115 ft above dense green coconut groves with breathtaking valley vistas.',
    driveTime: '25 min drive',
    bestTime: 'Late Afternoon (3:30 PM - 6:00 PM)'
  },
  {
    id: 'villukuri-aqueduct',
    name: 'Villukuri Aqueduct',
    distance: '9 km',
    category: 'Historic Canal',
    image: '/images/villukuri-aqueduct.webp',
    description: 'Historic canal water bridge (Thaneer Palam) carrying freshwater irrigation channels high above scenic, tranquil village roads and paddy fields.',
    driveTime: '15 min drive',
    bestTime: 'Morning or Early Evening'
  },
  {
    id: 'manichithrathazhu-viewpoint',
    name: 'Manichithrathazhu View Point',
    distance: '14 km',
    category: 'Hill Viewpoint',
    image: '/images/manichithrathazhu-viewpoint.webp',
    description: 'Elevated panoramic hilltop viewpoint offering breathtaking 360-degree vistas across misty Western Ghats slopes, wind farms, and lush emerald valleys.',
    driveTime: '25 min drive',
    bestTime: 'Sunrise or Sunset'
  },
  {
    id: 'lemur-beach',
    name: 'Lemur Beach',
    distance: '16 km',
    category: 'Coastline',
    image: '/images/lemur-beach.webp',
    description: 'Pristine coastal haven celebrated for peaceful golden sands, whispering coconut groves, and calm turquoise Arabian Sea waves away from crowds.',
    driveTime: '28 min drive',
    bestTime: 'Morning or Late Afternoon'
  },
  {
    id: 'colachel-harbour',
    name: 'Colachel Harbour View Point',
    distance: '10 km',
    category: 'Historic Harbour',
    image: '/images/colachel-harbour-viewpoint.jpg',
    description: 'Historic natural harbour and breakwater viewpoint overlooking active fishing vessels and sweeping Arabian Sea horizons.',
    driveTime: '18 min drive',
    bestTime: 'Evening (4:00 PM - 6:30 PM)'
  },
  {
    id: 'poovar-backwaters',
    name: 'Poovar Backwaters & Boating',
    distance: '35 km',
    category: 'Backwaters & Boating',
    image: '/images/poovar-backwaters.webp',
    description: 'Enchanting Kerala backwaters with motorized boat cruises through dense mangrove estuaries leading to the golden sand beach and Neyyar river.',
    driveTime: '45 min drive',
    bestTime: 'Morning (8:00 AM - 11:00 AM) or Sunset'
  },
  {
    id: 'kalikesam-forest-river',
    name: 'Kalikesam Forest & River',
    distance: '32 km',
    category: 'Forest & River Area',
    image: '/images/kalikesam-forest.jpeg',
    description: 'Lush tropical evergreen reserve forest tucked within the Western Ghats with pristine natural stream waters, forest walking trails, and sacred shrines.',
    driveTime: '45 min drive',
    bestTime: 'Morning (8:30 AM - 2:00 PM)'
  },
  {
    id: 'sanguthurai-beach',
    name: 'Sanguthurai Beach',
    distance: '26 km',
    category: 'Coastline',
    image: '/images/sanguthurai-beach.jpg',
    description: 'A serene coastline famous for its iconic white conch shell monument, golden sands, soothing sea breeze, and sweeping Indian Ocean horizons.',
    driveTime: '35 min drive',
    bestTime: 'Evening (4:30 PM - 6:30 PM)'
  },
  {
    id: 'sothavilai-beach',
    name: 'Sothavilai Beach',
    distance: '28 km',
    category: 'Coastline',
    image: '/images/sothavilai-beach.jpg',
    description: 'One of Tamil Nadu’s longest natural beaches with soft golden sands, shallow waters, thatched resting umbrellas, and stunning sunset views.',
    driveTime: '38 min drive',
    bestTime: 'Sunset (4:00 PM - 6:30 PM)'
  },
  {
    id: 'kanyakumari-monuments',
    name: 'Vivekananda Rock & Thiruvalluvar Statue',
    distance: '34 km',
    category: 'Historic Monument',
    image: '/images/kanyakumari-rock.jpeg',
    description: 'Iconic offshore monuments sitting at the confluence of the Indian Ocean, Arabian Sea, and Bay of Bengal at the southernmost tip of mainland India.',
    driveTime: '45 min drive',
    bestTime: 'Morning (8:00 AM - 12:00 PM)'
  },
  {
    id: 'suchindram-temple',
    name: 'Suchindram Thanumalayan Temple',
    distance: '22 km',
    category: 'Spiritual Heritage',
    image: '/images/suchindram-temple.jpg',
    description: 'Famous 17th-century Dravidian architectural masterpiece dedicated to the Trinity (Shiva, Vishnu, and Brahma), renowned for musical pillars and grand temple tank.',
    driveTime: '30 min drive',
    bestTime: 'Morning (6:00 AM - 11:00 AM) or Evening'
  }
];

export const POLICIES = {
  checkIn: '2:00 PM - 10:00 PM',
  checkOut: '11:00 AM',
  noPets: true,
  noSmoking: true,
  cancellation: 'Free cancellation up to 48 hours before check-in.'
};

export const CONTACT_INFO = {
  name: 'Zion Inn Homestay',
  subtitle: 'Family-Run Luxury Homestay',
  tagline: 'Stay. Relax. Feel at Home.',
  accreditation: 'Ministry of Tourism Approved',
  addressLine1: 'Zion Inn Homestay, Neyyoor',
  addressLine2: 'Kanyakumari District, Tamil Nadu – 629802',
  landmark: 'Near Eraniel Railway Station (750 m), close to CSI Hospital Neyyoor',
  phone1: '+91 81484 37600',
  phone1Raw: '+918148437600',
  phone2: '+91 93856 68505',
  phone2Raw: '+919385668505',
  whatsapp: '917418220321',
  whatsappNumber: '917418220321',
  whatsappDisplay: '+91 74182 20321',
  email: 'zioninn.bnb@gmail.com',
  googleMapsUrl: 'https://maps.google.com/?q=Neyyoor,+Kanyakumari+District,+Tamil+Nadu+629802'
};

export const HOMESTAY_FAQS = [
  {
    q: 'How far is Zion Inn Homestay from Eraniel Railway Station?',
    a: 'Zion Inn is just 750 m (2 minutes drive / easy walking distance) from Eraniel Railway Station (ERL). Local auto-rickshaws and taxis are readily available at the station, or we can assist in arranging a local driver to receive you.'
  },
  {
    q: 'What are the check-in and check-out timings?',
    a: 'Standard check-in is between 2:00 PM – 10:00 PM, and check-out is by 11:00 AM. Early check-in or late check-out is accommodated whenever the room schedule permits.'
  },
  {
    q: 'Is high-speed Wi-Fi available for remote work?',
    a: 'Yes, we provide dual-band high-speed fiber Wi-Fi throughout all rooms, verandas, and the garden courtyard, backed by uninterrupted solar and inverter power support.'
  },
  {
    q: 'What amenities are included in each room?',
    a: 'All rooms include private en-suite bathrooms, complementary drinking water, toiletries, high-speed fiber Wi-Fi, 24/7 power backup, and private garden-facing verandas. Authentic local dining spots are also just minutes away.'
  },
  {
    q: 'Can children stay with us? What is the kids policy?',
    a: 'Yes! Families with children are warmly welcome. Room rates cover two adults, and two kids stay free.'
  },
  {
    q: 'Is safe parking available on premises?',
    a: 'Yes, we have secure, gated on-site parking for both cars and two-wheelers inside the homestay compound.'
  }
];
