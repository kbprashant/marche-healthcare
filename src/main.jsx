// css


import './index.css'
// other
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import NewsPage from './pages/NewsPage';
import VideoPage from './pages/VideoPage';
import ContactPage from './pages/ContactPage';
import Timeline from './pages/Timeline';
import SocialPostAdmin from './pages/SocialPostAdmin';
import AdminLogin from './pages/admin/AdminLogin';
import { AuthProvider } from './auth/AuthContext';
import RequireAuth from './auth/RequireAuth';
import Careers from './pages/careers'
import CareersApply from './pages/careersapply'
import { AdminLayout, VideosAdmin, CareersAdmin, BroadcastsAdmin, TestimonialsAdmin } from './pages/admin';
import SearchResults from './pages/SearchResults';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsCondition from './pages/TermsCondition';
import Incubation from './pages/Incubation';
import Investor from './pages/Investor';
import Journal from './pages/Journal';
import NewsEvent from './pages/NewsEvent';
import CookieConsent from './components/CookieConsent';
import { setupConsentAnalytics } from './utils/consent-analytics';
import SEOJsonLd from './components/SEOJsonLd';



const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404 not found</div>,
  },{
    path:'/home',
    element:<HomePage/>,
  },
   {
    path: '/about',
    element: <AboutPage />
  }, {
    path: '/products',
    element: <ProductPage />
  }, {
    path: '/news',
    element: <NewsPage />
  }, {
    path: '/videos',
    element: <VideoPage />
  }, {
    path: '/contact',
    element: <ContactPage />
  }, {
    path: '/search',
    element: <SearchResults />
  }, {
    path: '/careers',        // 👈 New route
    element: <Careers />,
  },

   {
  path: '/Privacy-Policy',   // 👈 Add this route
  element: <PrivacyPolicy />,
},

  {
  path: '/TermsCondition',   // 👈 Add this route
  element: <TermsCondition/>,
},
  
{
  path: '/Incubation',   // 👈 Add this route
  element: <Incubation/>,
},

{
  path: '/Investor',   // 👈 Add this route
  element: <Investor/>,
},

{
  path: '/Journal',   // 👈 Add this route
  element: <Journal/>,
},
{
  path: '/NewsEvent',   // 👈 Add this route
  element: <NewsEvent/>,
},



  {
  path: '/careersapply',   // 👈 Add this route
  element: <CareersApply />,
}, {
    path: '/timeline',
    element: <Timeline />
  },
  { path: '/admin/login', element: <AdminLogin /> },
  {
    path: '/admin',
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <VideosAdmin /> },
      { path: 'videos', element: <VideosAdmin /> },
      { path: 'careers', element: <CareersAdmin /> },
      { path: 'broadcasts', element: <BroadcastsAdmin /> },
      { path: 'testimonials', element: <TestimonialsAdmin /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<AuthProvider>
{/* Cookie consent banner appears globally once */}
<CookieConsent />
{/* Global Organization & Website JSON-LD for rich results */}
<SEOJsonLd id="org-jsonld" data={{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Marche Healthcare",
  "url": typeof window !== 'undefined' ? window.location.origin : "https://marchehealthcare.example",
  "logo": `${typeof window !== 'undefined' ? window.location.origin : ''}/logo_icon.png`,
  "sameAs": [
    "https://www.linkedin.com/company/marche-healthcare/",
    "https://x.com/info_march49738",
    "https://youtube.com/@marchehealthcare"
  ],
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "info@marchehealthcare.com",
    "areaServed": "IN",
    "availableLanguage": ["en"]
  }]
}} />
<SEOJsonLd id="website-jsonld" data={{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": typeof window !== 'undefined' ? window.location.origin : "https://marchehealthcare.example",
  "name": "Marche Healthcare",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${typeof window !== 'undefined' ? window.location.origin : ''}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
}} />
<RouterProvider router={router} />
</AuthProvider>
</React.StrictMode>,
)

// Boot optional analytics after mount; it respects consent state
setupConsentAnalytics();
