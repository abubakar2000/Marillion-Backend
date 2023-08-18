interface TobparProps {
  label?: string;
  button?: string | JSX.Element | JSX.Element[];
}

const Topbar = ({ label, button }: TobparProps) => {
  return (
    <div className="text-lg px-2 text-gray-700 flex items-center justify-between w-full">
      <div>{label}</div>
      <div>{button}</div>
    </div>
  );
};

export default Topbar;
