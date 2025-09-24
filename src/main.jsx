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
<RouterProvider router={router} />
</AuthProvider>
</React.StrictMode>,
)
