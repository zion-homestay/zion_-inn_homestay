import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import MobileNavDrawer from './components/MobileNavDrawer';
import Hero from './components/Hero';
import AboutSpace from './components/AboutSpace';
import RoomShowcase from './components/RoomShowcase';
import RoomDetailDrawer from './components/RoomDetailDrawer';
import Amenities from './components/Amenities';
import SurroundingGuide from './components/SurroundingGuide';
import BookingContact from './components/BookingContact';
import HomeFaq from './components/HomeFaq';
import MobileStickyBar from './components/MobileStickyBar';
import StoryModal from './components/StoryModal';
import Footer from './components/Footer';
import SEO from './components/SEO';
import { 
  getLodgingBusinessSchema, 
  getRoomsSchema, 
  getGallerySchema, 
  getContactSchema 
} from './data/seoSchemas';
import { INITIAL_ROOMS, HOMESTAY_FAQS } from './data/homestayData';

// Code-split non-home secondary pages for minimal initial bundle and zero TBT
const RoomsPage = lazy(() => import('./pages/RoomsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Helper to determine route from current pathname and hash
function resolveCurrentRoute() {
  if (typeof window === 'undefined') return 'home';

  const hash = window.location.hash;
  // Handle legacy hash URLs and normalize them cleanly to path URLs
  if (hash === '#/rooms' || hash === '#rooms-page') {
    window.history.replaceState(null, '', '/rooms');
    return 'rooms';
  }
  if (hash === '#/gallery' || hash === '#gallery-page') {
    window.history.replaceState(null, '', '/gallery');
    return 'gallery';
  }
  if (hash === '#/contact' || hash === '#contact-page') {
    window.history.replaceState(null, '', '/contact');
    return 'contact';
  }
  if (hash === '#/' || hash === '#home') {
    window.history.replaceState(null, '', '/');
    return 'home';
  }

  // Pathname-based resolution
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/' || path === '/index.html') return 'home';
  if (path === '/rooms') return 'rooms';
  if (path === '/gallery') return 'gallery';
  if (path === '/contact') return 'contact';

  return '404';
}

export default function App() {
  // Page routing state ('home' | 'rooms' | 'gallery' | 'contact' | '404')
  const [currentPage, setCurrentPage] = useState(resolveCurrentRoute);

  // Room content and photo paths are maintained in the source data file.
  const rooms = INITIAL_ROOMS;

  // Booking parameters
  const [checkInDate, setCheckInDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split('T')[0];
  });
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 9);
    return today.toISOString().split('T')[0];
  });
  const [guestCount, setGuestCount] = useState(2);

  // Modals & Drawers state
  const [selectedRoomForDrawer, setSelectedRoomForDrawer] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  // Scroll to section helper
  const handleScrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Listen to browser Back/Forward (popstate) and legacy hash changes
  useEffect(() => {
    const handlePopState = () => {
      const route = resolveCurrentRoute();
      setCurrentPage(route);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Handle section scrolling on initial load if hash is present
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const sectionId = window.location.hash.replace(/^#/, '');
      if (['about', 'rooms', 'amenities', 'guide', 'booking', 'contact'].includes(sectionId)) {
        setTimeout(() => handleScrollToSection(sectionId), 150);
      }
    }
  }, [handleScrollToSection]);

  // Clean navigation handler supporting both path changes and section anchors
  const handleNavigate = (page, targetSectionId = null) => {
    if (page === 'rooms') {
      if (window.location.pathname !== '/rooms') {
        window.history.pushState(null, '', '/rooms');
      }
      setCurrentPage('rooms');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'gallery') {
      if (window.location.pathname !== '/gallery') {
        window.history.pushState(null, '', '/gallery');
      }
      setCurrentPage('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'contact') {
      if (window.location.pathname !== '/contact') {
        window.history.pushState(null, '', '/contact');
      }
      setCurrentPage('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Home navigation
      if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        window.history.pushState(null, '', targetSectionId ? `/#${targetSectionId}` : '/');
      } else if (targetSectionId) {
        window.history.replaceState(null, '', `/#${targetSectionId}`);
      }
      setCurrentPage('home');
      if (targetSectionId) {
        setTimeout(() => handleScrollToSection(targetSectionId), 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleCheckAvailability = () => {
    handleNavigate('rooms');
  };

  const handleBookStayClick = () => {
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#222623] flex flex-col justify-between selection:bg-[#3A4B3D]/15 selection:text-[#1F2421]">
      {/* Top Navigation */}
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onBookStayClick={handleBookStayClick}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Mobile Drawer */}
      <MobileNavDrawer 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onBookStayClick={handleBookStayClick}
      />

      {/* Main Content Sections: Conditionally render Rooms, Gallery, Contact, Homepage, or 404 */}
      <main className="flex-1 w-full">
        <Suspense fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#3A4B3D]/20 border-t-[#3A4B3D] animate-spin" />
          </div>
        }>
          {currentPage === 'rooms' && (
            <>
              <SEO 
                title="Rooms & Rates | Zion Inn Homestay Neyyoor, Kanyakumari"
                description="Spacious AC & Non-AC rooms with handcrafted king beds, en-suite bathrooms, fiber Wi-Fi & verandas in Neyyoor. Direct booking rates from ₹1000."
                path="/rooms"
                schema={getRoomsSchema(rooms)}
              />
              <RoomsPage 
                rooms={rooms}
                onSelectRoom={(room) => setSelectedRoomForDrawer(room)}
                onNavigateHome={() => handleNavigate('home')}
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
                guestCount={guestCount}
                setGuestCount={setGuestCount}
              />
            </>
          )}

          {currentPage === 'gallery' && (
            <>
              <SEO 
                title="Photo Gallery | Zion Inn Homestay Neyyoor & Attractions"
                description="Explore photos of Zion Inn Homestay rooms, flowering garden, verandas, plus Padmanabhapuram Palace, Muttom Beach, and local Kanyakumari highlights."
                path="/gallery"
                schema={getGallerySchema()}
              />
              <GalleryPage 
                onNavigateHome={() => handleNavigate('home')}
                onNavigateRooms={() => handleNavigate('rooms')}
              />
            </>
          )}

          {currentPage === 'contact' && (
            <>
              <SEO 
                title="Contact & Location | Zion Inn Homestay Neyyoor"
                description="Reach Zion Inn Homestay in Neyyoor, Kanyakumari. Just 750 m from Eraniel Railway Station. WhatsApp direct booking, room inquiries, route directions & FAQs."
                path="/contact"
                schema={getContactSchema(HOMESTAY_FAQS)}
              />
              <ContactPage 
                onNavigateHome={() => handleNavigate('home')}
                onNavigateRooms={() => handleNavigate('rooms')}
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
                guestCount={guestCount}
                setGuestCount={setGuestCount}
              />
            </>
          )}

          {currentPage === '404' && (
            <NotFoundPage 
              onNavigateHome={() => handleNavigate('home')}
              onNavigateRooms={() => handleNavigate('rooms')}
              onNavigateGallery={() => handleNavigate('gallery')}
              onNavigateContact={() => handleNavigate('contact')}
            />
          )}
        </Suspense>

        {currentPage === 'home' && (
          <>
            <SEO 
              title="Zion Inn Homestay Neyyoor | Family Rooms Near Eraniel &amp; Padmanabhapuram"
              description="Ministry of Tourism approved family homestay in Neyyoor, Kanyakumari. AC king rooms from ₹1,000/night, 2 kids free, fiber Wi-Fi &amp; parking. 750 m to Eraniel Station. Book direct."
              path="/"
              schema={getLodgingBusinessSchema(HOMESTAY_FAQS)}
            />

            {/* Hero Section */}
            <Hero 
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              guestCount={guestCount}
              setGuestCount={setGuestCount}
              onCheckAvailability={handleCheckAvailability}
            />

            {/* 01. The Space Section */}
            <AboutSpace onOpenStory={() => setIsStoryOpen(true)} />

            {/* 04. Room Showcase Section */}
            <RoomShowcase 
              rooms={rooms}
              onSelectRoom={(room) => setSelectedRoomForDrawer(room)}
              onQuickInquire={(room) => setSelectedRoomForDrawer(room)}
              onViewAllRooms={() => handleNavigate('rooms')}
            />

            {/* 05. Amenities Section */}
            <Amenities />

            {/* 06. Surrounding Guide Section */}
            <SurroundingGuide />

            {/* 07. FAQ Section */}
            <HomeFaq />

            {/* 08. Booking & Contact Section */}
            <BookingContact 
              rooms={rooms}
              selectedRoom={selectedRoomForDrawer}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              guestCount={guestCount}
            />
          </>
        )}
      </main>

      {/* Room Detail Drawer */}
      <RoomDetailDrawer 
        key={selectedRoomForDrawer?.id || 'room-drawer'}
        room={selectedRoomForDrawer}
        isOpen={Boolean(selectedRoomForDrawer)}
        onClose={() => setSelectedRoomForDrawer(null)}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guestCount={guestCount}
      />

      {/* Homestay Story Modal */}
      <StoryModal 
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
      />

      {/* Mobile Sticky Action Bar (< 768px) */}
      <MobileStickyBar />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
