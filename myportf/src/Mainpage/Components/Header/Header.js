import React, { use } from 'react';
import './Header.css';
import { Navigate, useNavigate } from "react-router-dom";
const Header = () => {
    const route=useNavigate();
  return (
    
    <header className="header">
      <div className="logo">
        <h1>My Portfolio</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li onClick={()=>{route('/Skills')}}>
            Skills
          </li>
          <li onClick={()=>{
                    route('/Signin')
                }}
            >
               Signin        
             </li>
             <li onClick={()=>{
                    route('/Signup')
                }}
            >
               Signup        
             </li>
            <li onClick={()=>{
                    route('/Project')
                }}
            >
               Projects         
             </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
