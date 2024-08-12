//App.js File

import { Route, Routes } from "react-router-dom";
import SignIn from "./components/LoginSigninPage/SignIn";
import SignUp from "./components/LoginSigninPage/SignUp";
import TicketPage from "./components/SlotsLayoutPage/TicketPage";
import SlotsLayout from "./components/SlotsLayoutPage/SlotsLayout";
import Home from "./components/HomePage/Home";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PersonalInformation from "./components/ProfilePage/PersonalInformation";
import About from "./components/HomePage/About";
import Contact from "./components/HomePage/Contact";

function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/slots-layout" element={<SlotsLayout />} />
      <Route path="/" element={<Home />} />
      <Route path="/ticket" element={<TicketPage />} />
      <Route path="/pid" element={<PersonalInformation />} />
     
    </Routes>
  );
}

export default App;