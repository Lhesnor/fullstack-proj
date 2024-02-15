import React from "react";
import { Outlet, Link } from "react-router-dom";
import { logoUrl } from "./constants";
export class Root extends React.Component {
  render() {
    return (
      <div className="app">
        <div className={"topnav"}>
          <Link to={"search"}>
            <img src={logoUrl} className={"logo"} alt={"logo"} />
          </Link>
          <div>
            <ul className={"navbar-links-list"}>
              <li className={"navbar-link"}>
                <Link to={"search"}>Search</Link>
              </li>
              <li className={"navbar-link"}>
                <Link to={"upload"}>Upload</Link>
              </li>
              <div className="dot" />
              <li className={"navbar-link"}>
                <Link to={"about"}>About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={"main"}>
          <Outlet />
        </div>
      </div>
    );
  }
}
