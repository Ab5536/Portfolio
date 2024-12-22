import React from "react";
import "./Projects.css";
import Header from "../Header/Header";
const Projects = () => {
  const projects = [
    { name: "Project 1", description: "Description of project 1" },
    { name: "Project 2", description: "Description of project 2" },
    { name: "Project 3", description: "Description of project 3" },
  ];

  return (
    <><Header/>
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <div key={index} className="project">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section></>
  );
};

export default Projects;