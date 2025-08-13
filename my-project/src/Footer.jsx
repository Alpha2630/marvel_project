import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10 border-t border-gray-700">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-red-400 transition">Twitter</a>
          <a href="#" className="hover:text-red-400 transition">Facebook</a>
          <a href="#" className="hover:text-red-400 transition">Instagram</a>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Marvel Heroes App. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;