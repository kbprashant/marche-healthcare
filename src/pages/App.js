import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Careers from "./pages/careers";
import CareersApply from "./pages/careersapply";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careersapply" element={<CareersApply />} /> {/* ✅ Add this */}
      </Routes>
    </Router>
  );
}

export default App;
