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
    <span className="relative inline-block px-5 py-3 overflow-hidden text-white bg-haven-blue rounded-sm transition-all duration-500 ease-in-out group z-0">
      <span className="absolute inset-0 bg-tranquil-teal transition-transform duration-500 ease-in-out transform translate-y-full group-hover:translate-y-0"></span>
      <span className="relative text-white group-hover:text-white transition-all duration-500 uppercase">
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

const colorVariants = {
  green: {
    base: "bg-custom-green",
    hover: "hover:bg-tranquil-teal",
  },
  red: {
    base: "bg-red-600",
    hover: "hover:bg-red-700",
  },
  darkblue: {
    base: "bg-haven-blue",
    hover: "hover:bg-tranquil-teal",
  },
  gray: {
    base: "bg-slate-gray2",
    hover: "hover:bg-gray-300 hover:text-slate-gray2",
  },
  carerBlue: {
    base: "bg-carer-blue",
    hover: "hover:bg-dark-gray-blue",
  }
};

export const SmallBtn = ({
  onClick,
  color = "green",
  children = "",
  type = "button",
  icon = null,
}) => {
  const { base, hover } = colorVariants[color] || colorVariants.green;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-1 ${base} ${hover} text-white rounded-sm text-xs flex items-center gap-2`}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export const MediumBtn = ({ loading, text, type, onClick, loadingText, color = "green", }) => {
  const { base, hover } = colorVariants[color] || colorVariants.darkblue;
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={`px-4 py-2 ${base} ${hover} text-white rounded-sm text-md`}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="loader mr-2" />
          {loadingText}
        </div>
      ) : (
        text
      )}
    </button>
  );
};
