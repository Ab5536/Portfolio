import React from "react";
import "./Skills.css";

const Skills = () => {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js"];

  return (
    <section id="skills" className="skills">
      <h2>Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;