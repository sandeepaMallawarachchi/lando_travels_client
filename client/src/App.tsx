import "./App.css";
import { Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import Header from "./components/Header";
import Home from "./pages/Home";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import InboundTours from "./pages/InboundTours";
import CorporateTravels from "./pages/CorporateTravels";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import OutboundTours from "./pages/OutboundTours";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <ScrollToTop />
      <CustomCursor />
      <Header />
      <main className="flex-grow container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inbound" element={<InboundTours />} />
          <Route path="/outbound" element={<OutboundTours />} />
          <Route path="/corporate" element={<CorporateTravels />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />

          {/* not NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App
