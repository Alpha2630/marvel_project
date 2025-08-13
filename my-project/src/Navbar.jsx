import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-500">Marvel Heroes</h1>
        <div className="flex space-x-4">
          <span className="cursor-pointer hover:text-red-400 transition">Accueil</span>
          <span className="cursor-pointer hover:text-red-400 transition">À propos</span>
          <span className="cursor-pointer hover:text-red-400 transition">Contact</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;