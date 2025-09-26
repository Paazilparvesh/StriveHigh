import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Navbar from '/src/Layout/Header.jsx';

// Blog Pages
import BlogPage1 from "/src/Pages/BlogPage/BlogPage1.jsx";
import BlogPage2 from "/src/Pages/BlogPage/BlogPage2.jsx";
import BlogPage3 from "/src/Pages/BlogPage/BlogPage3.jsx";

import AdminPage from "/src/Pages/Admin/AdminPage.jsx";

import Termscondition from './Pages/TermsConditions';
import Privacy from './Pages/PrivacyPolicy';
import CourseContent from './Pages/Courses';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Course Page */}
        <Route path='/' element={<CourseContent />} />
        {/* Blog Pages */}
        <Route path="/blog/1" element={<BlogPage1 />} />
        <Route path="/blog/2" element={<BlogPage2 />} />
        <Route path="/blog/3" element={<BlogPage3 />} />
        {/* Admin Page */}
        <Route path="/admin" element={<AdminPage />} />
        {/* Privacy Page */}
        <Route path='/info' element={<Termscondition />} />
        <Route path='/privacy' element={<Privacy />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
