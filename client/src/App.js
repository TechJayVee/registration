import "./App.css";
import Register from "./register";
import Login from "./login";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import NotFound from "./notFound";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
