import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navigation = ({ items }) => {
  return (
    <nav className="w-40 h-screen flex flex-col justify-between bg-[#0f0f0f] border-r-[1px]  border-opacity-25 border-white">
      <ul className="flex flex-col items-start space-y-2 p-4 ">
        {items.map((item, index) => (
          <li
            key={index}
            className="transition-colors text-slate-400  hover:text-white font-medium cursor-pointer"
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


Navigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navigation;
