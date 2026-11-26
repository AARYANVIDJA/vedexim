import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import Instagram from "./components/Instagram";
import Footer from "./sections/Footer";
import SmoothScroll from "./components/SmoothScroll";

import Home from "./pages/Home";
import CollectionsPage from "./pages/CollectionsPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import OurProcessPage from "./pages/OurProcessPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>

      <SmoothScroll />

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/collections"
          element={<CollectionsPage />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/process"
          element={<OurProcessPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

      </Routes>

      <WhatsAppButton />

      <Instagram />

      <Footer />

    </BrowserRouter>
  );
}

export default App;