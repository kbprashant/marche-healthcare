import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Careers from "./pages/careers";
import CareersApply from "./pages/careersapply";
import SearchResults from "./SearchResults";
import PrivacyPolicy from "./pages/PrivacyPolicy"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careersapply" element={<CareersApply />} /> {/* ✅ Add this */}
        <Route path="/search" element={<SearchResults />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} /> {/* ✅ route */}
      </Routes>
    </Router>
  );
}

export default App;
