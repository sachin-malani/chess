import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import Loader from "../components/Loader";
import useSocket from "../hooks/useSocket";
import { GAME_OVER, INIT_GAME, MOVE } from "../utility/constant";
import { Chess, Square } from "chess.js";

const Game = () => {
  const socket = useSocket();
  const [chess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState<"white" | "black">("white");

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          setColor(message.payload.color);
          setBoard(chess.board());
          setStarted(true);
          break;

        case MOVE: {
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break;
        }

        case GAME_OVER:
          
          break;
      }
    };
  }, [socket]);

  const onClickHandler = () => {
    socket?.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
  };

  const handleMove = (from: Square, to: Square) => {
    const pieceColor = chess.get(from)?.color;
    if (
      (color === "white" && pieceColor !== "w") ||
      (color === "black" && pieceColor !== "b")
    )
      return;

    try {
      socket?.send(
        JSON.stringify({ type: MOVE, payload: { move: { from, to } } })
      );
      chess.move({ from, to });
      setBoard(chess.board());
    } catch (error) {
      console.log(error);
      return;
    }
  };

  if (!socket) return <Loader />;

  return (
    <div className="flex justify-center">
      <div className=" pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="col-span-4 w-full">
            <ChessBoard
              chess={chess}
              setBoard={setBoard}
              socket={socket}
              board={board}
              handleMove={handleMove}
            />
          </div>
          <div className="col-span-2 w-full bg-slate-800 flex items-center justify-center">
            <div className="w-11/12">
              {!started && <Button onClick={onClickHandler}>Play</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
