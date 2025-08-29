import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaEllipsisV } from "react-icons/fa";

/**
 * A reusable three-dot dropdown menu.
 *
 * Props:
 * - options: Array of { label: string, onClick: function, icon?: JSX.Element, danger?: boolean }
 * - buttonClass: string (optional, additional classes for trigger button)
 * - dropdownClass: string (optional, additional classes for dropdown)
 * - menuId: string (optional, unique id for dropdown, defaults to "dropdown-menu")
 */
const ThreeDotDropdown = ({
  options = [],
  buttonClass = "",
  dropdownClass = "",
  menuId = "dropdown-menu",
}) => {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const btnRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (open && btnRef.current) {
        const dropdown = document.getElementById(menuId);
        if (
          !btnRef.current.contains(e.target) &&
          (!dropdown || !dropdown.contains(e.target))
        ) {
          setOpen(false);
        }
      }
    }
    function handleScroll() {
      if (open) setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      window.addEventListener("scroll", handleScroll, true);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open, menuId]);

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY + 4,
        left: rect.right + window.scrollX - 140,
        zIndex: 9999,
        minWidth: 140,
      });
    }
  }, [open]);

  return (
    <>
      <button
        className={`p-2 rounded hover:bg-gray-100 ${buttonClass}`}
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-label="Actions"
        type="button"
      >
        <FaEllipsisV />
      </button>
      {open &&
        createPortal(
          <div
            id={menuId}
            style={dropdownStyle}
            className={`bg-white shadow-lg rounded text-sm ${dropdownClass}`}
          >
            {options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                className={`flex w-full text-left px-4 py-2 hover:bg-gray-50 items-center gap-2 ${
                  option.danger ? "text-red-600" : ""
                }`}
                onClick={() => {
                  setOpen(false);
                  if (typeof option.onClick === "function") option.onClick();
                }}
              >
                {option.icon && <span>{option.icon}</span>}
                <span>{option.label}</span>
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default ThreeDotDropdown;
