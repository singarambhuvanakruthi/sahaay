import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import AccessibilityPanel from "./components/AccessibilityPanel";
import Header from "./components/Header";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Eligibility from "./pages/Eligibility";
import Result from "./pages/Result";
import Application from "./pages/Application";
import Review from "./pages/Review";
import Success from "./pages/Success";
import Tracker from "./pages/Tracker";
import ServicePage from "./pages/ServicePage";

function AppLayout() {
  const [language, setLanguage] = useState("en-IN");
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  return (
    <>
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onAccessibilityClick={() => setAccessibilityOpen(true)}
      />
      <AccessibilityPanel
        open={accessibilityOpen}
        onClose={() => setAccessibilityOpen(false)}
      />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/result" element={<Result />} />
          <Route path="/application" element={<Application />} />
          <Route path="/review" element={<Review />} />
          <Route path="/success" element={<Success />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/education" element={<ServicePage />} />
          <Route path="/healthcare" element={<ServicePage />} />
          <Route path="/banking" element={<ServicePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;