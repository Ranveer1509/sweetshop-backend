import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sweets from "./pages/Sweets";

function Home() {
  return (
    <div>
      <h1>Sweet Shop Management System</h1>
      <p>Frontend connected to Spring Boot Backend</p>
    </div>
  );
}

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <div className="container mt-4">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/sweets" element={<Sweets />} />

        </Routes>

      </div>

    </BrowserRouter>

  );

}

export default App;