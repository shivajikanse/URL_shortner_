import Header from "./components/Header";
import Footer from "./components/Footer.jsx";

import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
