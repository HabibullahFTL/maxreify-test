type ButtonType = {
  text: string;
  type: 'button' | 'submit';
  className?: string;
  isLoading?: boolean;
  onClick?: any;
};

const Button = ({
  text,
  type = 'button',
  className,
  isLoading,
  onClick,
}: ButtonType) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center bg-black text-white font-medium px-2 py-3 w-full ${className}`}
      type={type || 'button'}
    >
      {isLoading && (
        <span className="flex w-7 animate-spin items-center justify-center">
          <span className="h-5 w-5 rounded-full border-t-2 border-b-2 border-white"></span>
        </span>
      )}
      {isLoading ? 'Loading...' : text}
    </button>
  );
};

export default Button;
