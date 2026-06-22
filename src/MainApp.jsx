import React from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";

function MainApp() {
  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="experience">
          <Experience header="Experience" />
        </section>
        <section id="projects">
          <Projects header="Projects" />
        </section>
      </main>
    </div>
  );
}

export default MainApp;
