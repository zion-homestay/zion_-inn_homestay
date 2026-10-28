import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INITIAL_ROOMS, HOMESTAY_FAQS, ATTRACTIONS_LIST, CONTACT_INFO } from '../src/data/homestayData.js';
import { 
  getLodgingBusinessSchema, 
  getRoomsSchema, 
  getGallerySchema, 
  getContactSchema,
  BASE_URL 
} from '../src/data/seoSchemas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function renderHeader() {
  return `
    <header class="fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 px-4 sm:px-8">
      <nav aria-label="Main Navigation" class="bg-white/95 rounded-full px-5 py-2.5 sm:px-7 sm:py-3 flex items-center justify-between border border-[#EAE5DB] max-w-4xl mx-auto shadow-sm">
        <a href="/" class="flex items-center gap-2.5">
          <img src="/images/logo.webp" alt="Zion Inn Homestay" width="36" height="36" class="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          <div class="flex flex-col text-left">
            <span class="font-semibold text-base sm:text-lg text-[#1F2421] leading-none uppercase">Zion Inn</span>
            <span class="text-[9px] uppercase text-[#6B726C] font-medium leading-tight mt-0.5 tracking-wider">Homestay</span>
          </div>
        </a>
        <div class="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#2C322D]">
          <a href="/" class="hover:text-[#3A4B3D]">Home</a>
          <a href="/rooms" class="hover:text-[#3A4B3D]">Rooms</a>
          <a href="/gallery" class="hover:text-[#3A4B3D]">Gallery</a>
          <a href="/contact" class="hover:text-[#3A4B3D]">Contact</a>
        </div>
        <a href="/contact" class="hidden md:inline-flex px-5 py-2 rounded-full text-xs font-medium bg-[#3A4B3D] text-[#FBF9F5]">Book Stay</a>
      </nav>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="bg-[#1F2421] text-[#E5E0D8] pt-16 pb-12 mt-20 border-t border-[#313B33]">
      <div class="max-w-7xl mx-auto px-4 sm:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span class="p-1 rounded bg-[#FBF9F5]/10 inline-flex">
                <img src="/images/logo.webp" alt="Zion Inn Homestay" width="36" height="36" class="w-8 h-8 object-contain" />
              </span>
              <span class="text-xl font-semibold text-white tracking-wider">ZION INN</span>
            </div>
            <p class="text-xs text-[#A8B2A9] leading-relaxed mb-4">
              Your quiet sanctuary in Neyyoor, Kanyakumari (Ministry of Tourism Approved). Handcrafted comfort, breezy verandas, and peaceful gardens.
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Explore</h3>
            <ul class="space-y-2 text-xs text-[#A8B2A9]">
              <li><a href="/" class="hover:text-white">Home</a></li>
              <li><a href="/rooms" class="hover:text-white">Rooms & Rates</a></li>
              <li><a href="/gallery" class="hover:text-white">Photo Gallery</a></li>
              <li><a href="/contact" class="hover:text-white">Contact & Directions</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Nearby Attractions</h3>
            <ul class="space-y-2 text-xs text-[#A8B2A9]">
              <li>Padmanabhapuram Palace (6.9 km)</li>
              <li>Muttom Beach & Lighthouse (11.6 km)</li>
              <li>Mathur Hanging Aqueduct (16.2 km)</li>
              <li>Eraniel Railway Station (750 m)</li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact & Location</h3>
            <address class="not-italic text-xs text-[#A8B2A9] space-y-2">
              <p>Zion Inn Homestay, Neyyoor</p>
              <p>Kanyakumari District, Tamil Nadu – 629802</p>
              <p>Phone: <a href="tel:${CONTACT_INFO.phone1Raw}" class="hover:text-white">${CONTACT_INFO.phone1}</a> / <a href="tel:${CONTACT_INFO.phone2Raw}" class="hover:text-white">${CONTACT_INFO.phone2}</a></p>
              <p>WhatsApp: <a href="https://wa.me/${CONTACT_INFO.whatsapp}" class="hover:text-white">${CONTACT_INFO.whatsappDisplay}</a></p>
              <p>Email: <a href="mailto:${CONTACT_INFO.email}" class="hover:text-white">${CONTACT_INFO.email}</a></p>
            </address>
          </div>
        </div>
        <div class="mt-12 pt-6 border-t border-[#2A342C] text-center text-xs text-[#7F8B80]">
          <p>© ${new Date().getFullYear()} Zion Inn Homestay. All rights reserved. Neyyoor, Kanyakumari, Tamil Nadu, India.</p>
        </div>
      </div>
    </footer>
  `;
}

const routes = [
  {
    path: '/',
    outputPath: path.join(distDir, 'index.html'),
    title: 'Zion Inn Homestay Neyyoor | Family Rooms Near Eraniel & Padmanabhapuram',
    description: 'Ministry of Tourism approved family homestay in Neyyoor, Kanyakumari. AC king rooms from ₹1,000/night, 2 kids free, fiber Wi-Fi & parking. 750 m to Eraniel Station. Book direct.',
    canonical: `${BASE_URL}/`,
    schema: getLodgingBusinessSchema(HOMESTAY_FAQS),
    content: `
      ${renderHeader()}
      <main class="pt-24">
        <section class="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div class="mb-4">
            <span class="inline-block px-4 py-2 rounded-full bg-white/95 text-xs sm:text-[13px] font-medium text-[#222E25] border border-[#EAE5DB] shadow-xs mb-2">Ministry of Tourism Approved</span>
            <h1 class="sr-only">Family-Run Luxury Homestay in Neyyoor, Kanyakumari – Zion Inn Rooms</h1>
          </div>
          <h2 class="text-4xl sm:text-6xl font-serif text-[#1F2421] mb-4">Your quiet<br />sanctuary in<br />Neyyoor</h2>
          <p class="text-base sm:text-lg text-[#2D352F] max-w-md leading-relaxed mb-8">
            Comfortable stays. Warm hospitality. A place that feels like home.
          </p>
          <div class="mt-8 rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[21/9] bg-[#EAE5DB]/40 border border-[#EAE5DB]">
            <img 
              src="/images/hero-banner-v3.webp" 
              srcset="/images/hero-banner-v3-mobile.webp 768w, /images/hero-banner-v3.webp 1360w"
              sizes="100vw"
              alt="Zion Inn Homestay Neyyoor front exterior and lush garden courtyard" 
              width="1360" 
              height="896" 
              loading="eager" 
              fetchpriority="high" 
              decoding="async" 
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex flex-wrap gap-4 mt-6">
            <a href="/rooms" class="px-6 py-3 rounded-full bg-[#3A4B3D] text-white font-medium">Explore Rooms</a>
            <a href="/contact" class="px-6 py-3 rounded-full border border-[#3A4B3D] text-[#3A4B3D] font-medium">Contact & Booking</a>
          </div>
        </section>

        <section class="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-[#EAE5DB]">
          <h2 class="text-3xl font-serif text-[#1F2421] mb-2">A Peaceful Homestay in Neyyoor for Families &amp; Travelers</h2>
          <p class="italic text-base text-[#3A4B3D] mb-4">More than just a stay, it's a feeling.</p>
          <p class="text-sm text-[#5D645E] leading-relaxed mb-8">
            Starting from ₹1,000 per night with our two kids stay free policy, Zion Inn is a family-run retreat in Neyyoor crafted for comfort and peace. Situated just 750 m from Eraniel Railway Station, guests enjoy handcrafted king beds, breezy verandas, and quick access to Padmanabhapuram Palace (6.9 km) and Muttom Beach (11.6 km).
          </p>
        </section>

        <section class="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-[#EAE5DB]">
          <h2 class="text-3xl font-serif text-[#1F2421] mb-6">Handcrafted Accommodations</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            ${INITIAL_ROOMS.map(r => `
              <article class="p-6 bg-white rounded-3xl border border-[#EAE5DB]">
                <h3 class="text-2xl font-serif text-[#1F2421] mb-2">${r.name}</h3>
                <p class="text-xs font-semibold text-[#3A4B3D] mb-3">₹${r.price} / night • ${r.bed} • Two kids go free</p>
                <p class="text-sm text-[#5D645E] leading-relaxed mb-4">${r.description}</p>
                <ul class="text-xs text-[#4D5A50] space-y-1 mb-6">
                  ${r.amenities.map(a => `<li>✓ ${a}</li>`).join('')}
                </ul>
                <a href="/rooms" class="text-xs font-semibold text-[#3A4B3D] underline">View Room Details →</a>
              </article>
            `).join('')}
          </div>
        </section>

        <section class="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-[#EAE5DB]">
          <h2 class="text-3xl font-serif text-[#1F2421] mb-4">Nearby Cultural & Coastal Attractions</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${ATTRACTIONS_LIST.map(a => `
              <div class="p-5 bg-white rounded-2xl border border-[#EAE5DB]">
                <h3 class="text-lg font-semibold text-[#1F2421]">${a.name}</h3>
                <p class="text-xs text-[#3A4B3D] font-medium mb-2">${a.distance} • ${a.driveTime}</p>
                <p class="text-xs text-[#5D645E] leading-relaxed">${a.description}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="max-w-4xl mx-auto px-4 sm:px-8 py-16 border-t border-[#EAE5DB]">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-serif text-[#1F2421] mb-2">Frequently Asked Questions</h2>
            <p class="text-sm text-[#5D645E]">Quick, clear answers to common questions about our location, room amenities, transit proximity, and booking policies.</p>
          </div>
          <div class="space-y-4 text-left">
            ${HOMESTAY_FAQS.map(f => `
              <div class="p-5 bg-white rounded-2xl border border-[#EAE5DB]">
                <h3 class="text-base font-semibold text-[#1F2421] mb-1">${f.q}</h3>
                <p class="text-sm text-[#5D645E] leading-relaxed">${f.a}</p>
              </div>
            `).join('')}
          </div>
        </section>
      </main>
      ${renderFooter()}
    `
  },
  {
    path: '/rooms',
    outputPath: path.join(distDir, 'rooms/index.html'),
    title: 'Rooms & Rates | Zion Inn Homestay Neyyoor, Kanyakumari',
    description: 'Spacious AC & Non-AC rooms with handcrafted king beds, en-suite bathrooms, fiber Wi-Fi & verandas in Neyyoor. Direct booking rates from ₹1000.',
    canonical: `${BASE_URL}/rooms`,
    schema: getRoomsSchema(INITIAL_ROOMS),
    content: `
      ${renderHeader()}
      <main class="pt-24 max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <nav aria-label="Breadcrumb" class="text-xs text-[#6B726C] mb-4">
          <a href="/" class="hover:text-[#1F2421]">Home</a> / <span class="text-[#1F2421] font-semibold">Rooms & Rates</span>
        </nav>
        <h1 class="text-4xl sm:text-5xl font-serif text-[#1F2421] mb-4">Rooms & Suites in Neyyoor</h1>
        <p class="text-sm sm:text-base text-[#5D645E] max-w-2xl mb-12 leading-relaxed">
          Choose between our tranquil AC Room and airy Non-AC Room. Every room is outfitted with handcrafted teakwood king beds, private verandas, en-suite bathrooms, and uninterrupted power backup.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${INITIAL_ROOMS.map(r => `
            <article class="p-8 bg-white rounded-3xl border border-[#EAE5DB]">
              <h2 class="text-2xl font-serif text-[#1F2421] mb-2">${r.name}</h2>
              <p class="text-sm font-semibold text-[#3A4B3D] mb-4">₹${r.price} per night • ${r.bed} • 2 Adults (Two kids go free)</p>
              <p class="text-sm text-[#5D645E] leading-relaxed mb-6">${r.description}</p>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-[#1F2421] mb-3">Included Amenities</h3>
              <ul class="text-xs text-[#4D5A50] space-y-2 mb-8">
                ${r.amenities.map(a => `<li>✓ ${a}</li>`).join('')}
              </ul>
              <a href="/contact" class="inline-block px-6 py-2.5 rounded-full bg-[#3A4B3D] text-white text-xs font-semibold">Reserve Room on WhatsApp</a>
            </article>
          `).join('')}
        </div>
      </main>
      ${renderFooter()}
    `
  },
  {
    path: '/gallery',
    outputPath: path.join(distDir, 'gallery/index.html'),
    title: 'Photo Gallery | Zion Inn Homestay Neyyoor & Attractions',
    description: 'Explore photos of Zion Inn Homestay rooms, flowering garden, verandas, plus Padmanabhapuram Palace, Muttom Beach, and local Kanyakumari highlights.',
    canonical: `${BASE_URL}/gallery`,
    schema: getGallerySchema(),
    content: `
      ${renderHeader()}
      <main class="pt-24 max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <nav aria-label="Breadcrumb" class="text-xs text-[#6B726C] mb-4">
          <a href="/" class="hover:text-[#1F2421]">Home</a> / <span class="text-[#1F2421] font-semibold">Gallery</span>
        </nav>
        <h1 class="text-4xl sm:text-5xl font-serif text-[#1F2421] mb-4">Photo Gallery</h1>
        <p class="text-sm sm:text-base text-[#5D645E] max-w-2xl mb-12 leading-relaxed">
          Take a visual journey through Zion Inn Homestay’s king bedrooms, teakwood furnishings, quiet verandas, flowering gardens, and nearby landmarks including Padmanabhapuram Palace and Muttom Beach.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/reception.jpg" alt="Zion Inn Homestay Reception and Lounge" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Warm Reception &amp; Welcoming Lounge</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/ac-room1.webp" alt="AC King Bedroom at Zion Inn Homestay" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">AC King Bedroom with Garden Veranda</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/the-space.webp" alt="Tranquil garden courtyard at Zion Inn Homestay" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Lush Flowering Greenery</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/padmanabhapuram.webp" alt="Padmanabhapuram Palace near Neyyoor" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Padmanabhapuram Palace (6.9 km)</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/muttom-beach.webp" alt="Muttom Beach and Lighthouse near Neyyoor" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Muttom Beach &amp; Lighthouse (11.6 km)</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/mathur-aqueduct.webp" alt="Mathur Hanging Aqueduct near Neyyoor" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Mathur Hanging Aqueduct (16.2 km)</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/poovar-backwaters.webp" alt="Poovar Backwaters & Boating" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Poovar Backwaters &amp; Boating</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/thirparappu-waterfalls.webp" alt="Thirparappu Waterfalls" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Thirparappu Waterfalls</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/kalikesam-forest.jpeg" alt="Kalikesam Forest & River" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Kalikesam Forest &amp; River</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/sanguthurai-beach.jpg" alt="Sanguthurai Beach" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Sanguthurai Beach</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/sothavilai-beach.jpg" alt="Sothavilai Beach" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Sothavilai Beach</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/kanyakumari-rock.jpeg" alt="Vivekananda Rock & Thiruvalluvar Statue" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Vivekananda Rock &amp; Thiruvalluvar Statue</figcaption>
          </figure>
          <figure class="p-2 bg-white rounded-2xl border border-[#EAE5DB]">
            <img src="/images/suchindram-temple.jpg" alt="Suchindram Thanumalayan Temple" width="400" height="250" loading="lazy" decoding="async" class="w-full h-48 object-cover rounded-xl" />
            <figcaption class="text-xs text-[#5D645E] mt-2 text-center">Suchindram Thanumalayan Temple</figcaption>
          </figure>
        </div>
      </main>
      ${renderFooter()}
    `
  },
  {
    path: '/contact',
    outputPath: path.join(distDir, 'contact/index.html'),
    title: 'Contact & Location | Zion Inn Homestay Neyyoor',
    description: 'Reach Zion Inn Homestay in Neyyoor, Kanyakumari. 750 m from Eraniel Railway Station. WhatsApp direct booking, room inquiries, route directions & FAQs.',
    canonical: `${BASE_URL}/contact`,
    schema: getContactSchema(HOMESTAY_FAQS),
    content: `
      ${renderHeader()}
      <main class="pt-24 max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <nav aria-label="Breadcrumb" class="text-xs text-[#6B726C] mb-4">
          <a href="/" class="hover:text-[#1F2421]">Home</a> / <span class="text-[#1F2421] font-semibold">Contact & Location</span>
        </nav>
        <h1 class="text-4xl sm:text-5xl font-serif text-[#1F2421] mb-4">Contact & Location</h1>
        <p class="text-sm sm:text-base text-[#5D645E] max-w-2xl mb-12 leading-relaxed">
          We welcome inquiries, room reservations, and local sightseeing questions. Connect with us directly via WhatsApp or phone.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div class="p-8 bg-white rounded-3xl border border-[#EAE5DB]">
            <h2 class="text-2xl font-serif text-[#1F2421] mb-6">Direct Inquiries</h2>
            <address class="not-italic text-sm text-[#4D5A50] space-y-4">
              <p><strong>Address:</strong><br />Zion Inn Homestay, Near Eraniel Railway Station (750 m), Neyyoor, Kanyakumari District, Tamil Nadu – 629802</p>
              <p><strong>Phone:</strong> <a href="tel:${CONTACT_INFO.phone1Raw}" class="text-[#3A4B3D] underline">${CONTACT_INFO.phone1}</a> / <a href="tel:${CONTACT_INFO.phone2Raw}" class="text-[#3A4B3D] underline">${CONTACT_INFO.phone2}</a></p>
              <p><strong>WhatsApp:</strong> <a href="https://wa.me/${CONTACT_INFO.whatsapp}" class="text-[#3A4B3D] underline">${CONTACT_INFO.whatsappDisplay}</a></p>
              <p><strong>Email:</strong> <a href="mailto:${CONTACT_INFO.email}" class="text-[#3A4B3D] underline">${CONTACT_INFO.email}</a></p>
              <p><strong>Transit:</strong> 2 min (750 m) from Eraniel (ERL) Station • 30 min from Nagercoil Junction • 60 km from Trivandrum (TRV) Airport</p>
            </address>
          </div>

          <div class="p-8 bg-white rounded-3xl border border-[#EAE5DB]">
            <h2 class="text-2xl font-serif text-[#1F2421] mb-6">Frequently Asked Questions</h2>
            <div class="space-y-4">
              ${HOMESTAY_FAQS.map(f => `
                <div class="border-b border-[#EAE5DB] pb-3">
                  <h3 class="text-sm font-semibold text-[#1F2421] mb-1">${f.q}</h3>
                  <p class="text-xs text-[#5D645E] leading-relaxed">${f.a}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </main>
      ${renderFooter()}
    `
  },
  {
    path: '/404',
    outputPath: path.join(distDir, '404.html'),
    title: 'Page Not Found | Zion Inn Homestay Neyyoor',
    description: 'The page you are looking for does not exist. Explore rooms, photo gallery, or contact Zion Inn Homestay in Neyyoor.',
    canonical: `${BASE_URL}/404`,
    noindex: true,
    schema: null,
    content: `
      ${renderHeader()}
      <main class="pt-32 pb-24 max-w-xl mx-auto px-4 text-center">
        <span class="text-6xl font-serif text-[#3A4B3D] block mb-2">404</span>
        <h1 class="text-3xl font-serif text-[#1F2421] mb-4">Sanctuary Not Found</h1>
        <p class="text-sm text-[#5D645E] mb-8 leading-relaxed">
          The page or path you followed does not exist. Explore our rooms, gallery, or contact Zion Inn Homestay in Neyyoor.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <a href="/" class="px-5 py-2.5 rounded-full bg-[#3A4B3D] text-white text-xs font-semibold">Return Home</a>
          <a href="/rooms" class="px-5 py-2.5 rounded-full border border-[#3A4B3D] text-[#3A4B3D] text-xs font-semibold">View Rooms</a>
          <a href="/gallery" class="px-5 py-2.5 rounded-full border border-[#3A4B3D] text-[#3A4B3D] text-xs font-semibold">Photo Gallery</a>
          <a href="/contact" class="px-5 py-2.5 rounded-full border border-[#3A4B3D] text-[#3A4B3D] text-xs font-semibold">Contact &amp; Location</a>
        </div>
      </main>
      ${renderFooter()}
    `
  }
];

for (const route of routes) {
  let html = baseTemplate;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Robots tag
  if (route.noindex) {
    html = html.replace(
      /<meta\s+name="robots"\s+content=".*?"\s*\/?>/i,
      `<meta name="robots" content="noindex, nofollow" />`
    );
  }

  // Open Graph & Twitter replacements
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${route.description}" />`
  );

  // Inject Schema if present
  if (route.schema) {
    const schemaScript = `\n    <script type="application/ld+json">\n${JSON.stringify(route.schema, null, 2)}\n    </script>\n  </head>`;
    html = html.replace('</head>', schemaScript);
  }

  // Inject static body markup inside #root
  if (route.content) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${route.content}</div>`
    );
  }

  // Ensure output directory exists and write file
  const outDir = path.dirname(route.outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(route.outputPath, html, 'utf-8');
  console.log(`[prerender] Pre-rendered: ${route.path} -> ${path.relative(process.cwd(), route.outputPath)}`);
}

console.log('[prerender] Static pre-rendering successfully completed for all routes.');
