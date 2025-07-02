function Loader({ size = "lg" }) {
  // Map size prop to Tailwind's loading spinner classes
  const sizeClasses = {
    xs: "loading-xs",
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
    xl: "loading-xl",
    "2xl": "w-[50px] h-[50px]",
    "3xl": "w-[80px] h-[80px]",
  };

  return (
    <div
      className={`loading loading-spinner ${sizeClasses[size]} mx-auto`}
      aria-busy="true"
      role="status"
    ></div>
  );
}

export default Loader;
