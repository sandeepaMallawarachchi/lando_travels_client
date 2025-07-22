import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
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
import ScrollButton from "./components/ScrollButton";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminHeader from "./components/admin/AdminHeader";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminSidebar from "./components/admin/AdminSidebar";
import Inbox from "./components/admin/Inbox";
import AdminRegister from "./components/admin/AdminRegister";
import AllAdmins from "./components/admin/AllAdmins";
import ManageCards from "./components/admin/ManageCards";
import Documentation from "./components/admin/Documentation";
import Help from "./components/admin/Help";
import SoftwareHub from "./pages/SoftwareHub";
import { Analytics } from "@vercel/analytics/react";
import TawkToWidget from "./components/TawkToWidget";
import Support from "./pages/Support";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isSoftwareHub = location.pathname === "/admin/softwarehub";

  if (isSoftwareHub) {
    return <>{children}</>;
  }

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
        <ScrollButton />
        <CustomCursor />
        <TawkToWidget />
        <main className="flex-grow mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inbound" element={<InboundTours />} />
            <Route path="/outbound" element={<OutboundTours />} />
            <Route path="/corporate" element={<CorporateTravels />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/support" element={<Support />} />

            {/* admin routes */}
            <Route
              path="/admin/softwarehub"
              element={
                <ProtectedRoute>
                  <SoftwareHub />
                </ProtectedRoute>
              }
            />
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
            <Route
              path="/admin/allUsers"
              element={
                <ProtectedRoute>
                  <AllAdmins />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/adminCards"
              element={
                <ProtectedRoute>
                  <ManageCards />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/documentation"
              element={
                <ProtectedRoute>
                  <Documentation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/helps"
              element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              }
            />

            {/* not NotFound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Layout>
      <Analytics />
    </>
  );
}

export default App;
