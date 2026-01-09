import React from "react";

const Header = () => {
    return (
        <section className="flex flex-col items-center mt-10 mb-4 px-2 sm:px-4">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl">ChessPUZZ</h1>
                <p className="text-center text-lg mb-4">Solve as much as puzzles based on your chess.com elo and rating or level</p>
            </div>

            <div className="w-full flex items-end justify-end mb-2">
                <button className="border rounded px-2">Login</button>
            </div>

            <hr className="w-full border-t border-gray-500" />
        </section>
    );
};

export default Header;