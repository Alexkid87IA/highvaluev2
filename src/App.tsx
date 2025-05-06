import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Business from './pages/Business';
import Mental from './pages/Mental';
import Story from './pages/Story';
import Society from './pages/Society';
import Emission from './pages/Emission';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#001F3F] to-[#87CEEB]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business" element={<Business />} />
          <Route path="/mental" element={<Mental />} />
          <Route path="/story" element={<Story />} />
          <Route path="/societe" element={<Society />} />
          <Route path="/emission" element={<Emission />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;