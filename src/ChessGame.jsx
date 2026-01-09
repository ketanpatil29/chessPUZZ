import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());

  function onPieceDrop(sourceSquare, targetSquare) {
    const gameCopy = new Chess(game.fen());

    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;
    setGame(gameCopy);
    return true;
  }

  return (
    <div className="w-full max-w-[500px] px-6 sm:px-4 mx-auto">
      <Chessboard
        id="BasicBoard"
        position={game.fen()}
        onPieceDrop={onPieceDrop}
        customLightSquareStyle={{ backgroundColor: "red" }}
        customDarkSquareStyle={{ backgroundColor: "#769656" }}
      />
    </div>
  );
}
