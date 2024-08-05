import { useNavigate } from "react-router-dom";
import jpeg from "../../assets/ChessBoard.jpeg";

const Landing = () => {
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate("/game");
  };

  return (
    <div className="pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center">
          <img className="max-w-96" src={jpeg} />
        </div>
        <div className="text-white flex flex-col items-center justify-center md:w-1/2">
          <p className="text-4xl ">Play Chess Online</p>
          <div className="mt-4 max-w-xl w-full flex justify-center">
            <button
              onClick={onClickButton}
              className="bg-green-400 text-xl w-full max-w-96 hover:bg-green-600 font-bold md:h-24 rounded"
            >
              Play Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
