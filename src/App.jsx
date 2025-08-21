import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Stats from "./components/Stats/Stats";
import Footer from "./components/Footer/Footer";
import "./index.css";
import Header from "./components/Header/Header";
import Cards from "./components/cards/Cards";
import FamilyAssistant from "./components/Family/FamilyAssistant";
import Waitlist from "./components/Waitlist/Waitlist";
import Streamline from "./components/Streamline/Streamline";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";

// Main landing page component
function LandingPage() {
  return (
    <>
      <Header/>
      <Hero />
      <Cards/>
      <FamilyAssistant/>
      <Streamline/>
      <Stats />
      <Waitlist />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
