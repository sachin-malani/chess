import { useNavigate } from "react-router-dom";
import jpeg from "../../assets/ChessBoard.jpeg";
import Button from "../components/Button";

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
            <Button onClick={onClickButton}>Play Online</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
