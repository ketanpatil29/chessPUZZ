import React from "react";

import loginButton from "../assets/login.png";

const Header = ({ onLoginClick }) => {
    return (
        <section className="flex flex-col items-center mt-10 mb-4 px-2 sm:px-4">
            <div className="flex flex-col items-center">
                <h1 className="font-[Qanect] flex items-center text-4xl mb-2">ChessPU<img src={loginButton} alt="Login" className="w-7 h-7 mt-1" />Z</h1>
                <p className="text-center text-lg mb-4">Solve as much as puzzles based on your chess.com elo and rating or level</p>
            </div>

            <div className="w-full flex items-end justify-end mb-2">
                <button onClick={onLoginClick} className="flex items-center gap-1 border rounded hover:text-gray-600 px-1 cursor-pointer">
                    <img src={loginButton} alt="Login" className="w-5 h-5" />
                    Login
                </button>
            </div>

            <hr className="w-full border-t border-gray-500" />
        </section>
    );
};

export default Header;