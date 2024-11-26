import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

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
    </nav>
  );
};

export default Navigation;

Navigation.propTypes = {
  items: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      path: propTypes.string.isRequired,
    })
  ).isRequired,
};
