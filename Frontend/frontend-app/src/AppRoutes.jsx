import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop.jsx';
import { metaFor } from './seo/routes.js';

import Home from './pages/home/Home.jsx';
import Packages from './pages/packages/Packages.jsx';
import About from './pages/about/About.jsx';
import Gallery from './pages/gallery/Gallery.jsx';
import Blogs from './pages/blogs/Blogs.jsx';
import Contact from './pages/contact/Contact.jsx';
import SlugPage from './pages/SlugPage.jsx';
import NotFound from './pages/NotFound.jsx';

// Keeps the browser tab title in step with the page when moving around the site.
function RouteTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = metaFor(pathname).title;
  }, [pathname]);
  return null;
}

// Paths match the old WordPress site (tours999.com) so existing links and search results keep working.
// Shared by the browser (App.jsx) and the build step that pre-renders every page (entry-server.jsx).
export default function AppRoutes() {
  return (
    <>
      <ScrollToTop/>
      <RouteTitle/>
      <Routes>

        <Route index element={<Home/>}/>
        <Route path="/home" element={<Navigate to="/" replace/>}/>

        <Route path="/itinerary" element={<Packages/>}/>
        <Route path="/about"     element={<About/>}/>
        <Route path="/gallery"   element={<Gallery/>}/>
        <Route path="/blogs"     element={<Blogs/>}/>
        <Route path="/contact"   element={<Contact/>}/>

        {/* Tour packages and blog posts live at top-level slugs, e.g. /5-day-sri-lanka-tour-package/ */}
        <Route path="/:slug"     element={<SlugPage/>}/>

        <Route path="*" element={<NotFound/>}/>

      </Routes>
    </>
  );
}
