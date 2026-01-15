import { Route , Routes } from "react-router-dom";
import About from "./Pages/About.jsx";
import Home from "./Pages/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import Signup from "./Pages/Signup.jsx";
import Signin from "./Pages/Signin.jsx";
import Header from "./Components/Header.jsx";
import Contact from "./Pages/Contact.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";


const App = () => {
  return (
    <div>
      {/*header*/}
      <Header />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRoute />} >
        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
