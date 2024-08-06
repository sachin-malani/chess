import { Chess, Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";

const ChessBoard = ({
  socket,
  setBoard,
  chess,
  board,
  handleMove,
}: {
  socket: WebSocket;
  setBoard: React.Dispatch<
    React.SetStateAction<
      ({
        square: Square;
        type: PieceSymbol;
        color: Color;
      } | null)[][]
    >
  >;
  chess: Chess;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  handleMove: (from: Square, representSquare: Square) => void;
}) => {
  const [from, setFrom] = useState<null | Square>(null);

  return (
    <div className="">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const representSquare = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(representSquare);
                    } else {
                      // socket.send(
                      //   JSON.stringify({
                      //     type: MOVE,
                      //     payload: {
                      //       move: {
                      //         from,
                      //         to: representSquare,
                      //       },
                      //     },
                      //   })
                      // );
                      handleMove(from, representSquare);
                      setFrom(null);

                      // chess.move({
                      //   from,
                      //   to: representSquare,
                      // });

                      // setBoard(chess.board());
                    }
                  }}
                  key={j}
                  className={`w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 ${
                    (i + j) % 2 === 0 ? "bg-green-500" : "bg-white"
                  }`}
                >
                  <div className="w-full h-full flex justify-center items-center">
                    {square ? (
                      <img
                        className="w-8"
                        src={`/assets/${
                          square?.color === "b"
                            ? `${square?.type}`
                            : `w${square?.type}`
                        }.png`}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
