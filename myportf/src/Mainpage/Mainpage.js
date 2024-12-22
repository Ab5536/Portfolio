import React from "react";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Projects from "./Components/Projects/Projects";
import Skills from "./Components/Skills/Skills";
import Contact from "./Components/Contact/Contact";
import Signin from "./Components/Signin/Signin"
const Mainpage = () => {
  return (
    <div>
      <Header/>
      
      {/*<Projects /> */}
      <Skills />
      <Contact />
      <About/>
    </div>
  );
};
export default Mainpage;
