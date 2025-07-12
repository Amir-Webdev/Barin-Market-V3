function Button({
  children,
  color,
  isLoading,
  size = "md",
  wfull,
  outline = true,
  ...otherProps
}) {
  return (
    <button
      className={`btn rounded-lg btn-${size} btn-${outline && "outline"} ${
        color === "red"
          ? "btn-error hover:bg-[rgb(228,64,64)"
          : color === "green"
          ? "btn-success"
          : "btn-info hover:bg-primary-dark"
      } ${wfull && "w-full"}`}
      disabled={isLoading}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
