import React from 'react';
import './TabBarMenu.css';
import {NavLink} from "react-router-dom";

function TabBarMenu() {
  return (
    <nav className="tab-bar">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive && 'active'}>
            Vandaag
          </NavLink>
        </li>
        <li>
          <NavLink to="/komende-week" className={({ isActive }) => isActive && 'active'}>
            Komende week
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default TabBarMenu;
