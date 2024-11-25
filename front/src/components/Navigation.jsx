import React from "react";

const Navigation = ({ items }) => {
  return (
    <nav className="w-40 h-screen flex flex-col justify-between bg-[#111416]">
      <ul className="flex flex-col items-start space-y-2 p-4 ">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-slate-400  hover:text-white font-medium cursor-pointer"
          >
            {item}
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
