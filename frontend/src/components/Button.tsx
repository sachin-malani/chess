const Button = ({onClick, children}: {onClick?: () => void, children: React.ReactNode}) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-400 text-xl w-full max-w-96 hover:bg-green-600 font-bold md:h-24 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
