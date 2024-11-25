import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navigation = ({ items }) => {
  return (
    <nav className="w-40 h-screen flex flex-col justify-between bg-[#111416]">
      <ul className="flex flex-col items-start space-y-2 p-4 ">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-slate-400  hover:text-white font-medium cursor-pointer"
          >
            <Link to={item.path} className="block px-4 py-2">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="bg-white">
        <a href="#">Usuario</a>
      </div>
    </nav>
  );
};

export default Navigation;

items.PropTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};
