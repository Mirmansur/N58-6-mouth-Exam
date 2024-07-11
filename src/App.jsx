import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./componets/Header";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./App.css";

const App = () => {
  return (
    <div className="All">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
