/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/color/96/pokeball--v1.png"
            alt="pokeball--v1"
          />
        </Link>
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <img
            src="https://fontmeme.com/permalink/230830/8722c5594bf496d216d8d5c4536edc68.png"
            alt="pokemon Title"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
