import Link from "next/link";

export const styledBtn = () => {
  return (
    <div>
      <button>send one</button>
    </div>
  );
};

export const NormalBtn = ({
  children = "Request a Nurse",
  href,
  onClick,
  type = "button",
  className = "",
}) => {
  const buttonContent = (
    <span className="relative inline-block px-6 py-4 overflow-hidden text-white bg-green-600 rounded-sm transition-all duration-500 ease-in-out group">
      <span className="absolute inset-0 bg-white transition-transform duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0"></span>
      <span className="relative text-white group-hover:text-green-600 transition-all duration-500">
        {children}
      </span>
    </span>
  );

  return href ? (
    <Link href={href} className={`inline-block ${className}`}>
      {buttonContent}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
    >
      {buttonContent}
    </button>
  );
};
