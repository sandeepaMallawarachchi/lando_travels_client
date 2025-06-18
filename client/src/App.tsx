import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom"
import type { ReactNode } from "react";
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
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminHeader from "./components/admin/AdminHeader";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminSidebar from "./components/admin/AdminSidebar";
import Inbox from "./components/admin/Inbox";
import AdminRegister from "./components/admin/AdminRegister";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? (
        <>
          <AdminHeader />
          <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <div className="flex-grow mt-24 overflow-y-auto">{children}</div>
          </div>
        </>
      ) : (
        <>
          <Header />
          <div>{children}</div>
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <>
      <Layout>
        <Toaster position="top-center" />
        <ScrollToTop />
        <CustomCursor />
        <main className="flex-grow container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inbound" element={<InboundTours />} />
            <Route path="/outbound" element={<OutboundTours />} />
            <Route path="/corporate" element={<CorporateTravels />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />

            {/* admin routes */}
            <Route
              path="/admin/admindashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/inbox"
              element={
                <ProtectedRoute>
                  <Inbox />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/adminregister"
              element={
                <ProtectedRoute>
                  <AdminRegister />
                </ProtectedRoute>
              }
            />

            {/* not NotFound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
}

export default App
