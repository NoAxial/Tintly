import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Wardrobe from "../pages/Wardrobe";
import Generate from "../pages/Generate";
import Upload from "../pages/Upload";
import ItemDetail from "../pages/ItemDetail";
import Settings from "../pages/Settings";
import About from "../pages/About";
import Favorites from "../pages/Favorites";
import { WardrobeProvider } from "../context/WardrobeContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ToastContainer } from "../components/ui/ToastContainer";
import { useToast } from "../hooks/useToast";

function AppContent(): JSX.Element {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/wardrobe" replace />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Navigate to="/wardrobe" replace />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <WardrobeProvider>
          <AppContent />
        </WardrobeProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}


