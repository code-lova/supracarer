export function ProfileFill({ color = "currentColor", ...props }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1.2em"
        height="1.2em"
        {...props}
      >
        <path
          fill={color}
          fillRule="evenodd"
          d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
          clipRule="evenodd"
        ></path>
      </svg>
    )
  }
  