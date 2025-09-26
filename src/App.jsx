import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Content from './Pages/Content';
import QuizCreate from './Pages/Quizcreation';
import './App.css';
import UserDetails from './Pages/UserDetails';
import Navbar from './Components/Bars/Navbar';
import Sidebar from './Components/Bars/Sidebar';
import AI_Feed from './Pages/AI_Feed';
import Termscondition from './Pages/TermsConditions';
import Privacy from './Pages/PrivacyPolicy';
import CourseContent from './Pages/Courses';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar open={true} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/quizcreate" element={<QuizCreate />} />
          <Route path="/aifeed" element={<AI_Feed />} />
          <Route path="/user/:email" element={<UserDetails />} />
          <Route path='/info' element={<Termscondition />} />
          <Route path='/privacy' element={<Privacy/>} />
          <Route path='/course' element={<CourseContent/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
