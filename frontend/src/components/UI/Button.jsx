function Button({
  children,
  color,
  isLoading,
  size = "md",
  wfull,
  ...otherProps
}) {
  return (
    <button
      className={`btn rounded-lg btn-${size} btn-outline ${
        color === "red"
          ? "btn-error hover:bg-[rgb(228,64,64)"
          : color === "green"
          ? "bg-success hover:bg-[rgb(30,200,129)]"
          : "bg-primary hover:bg-primary-dark text-white"
      } ${wfull && "w-full"}`}
      disabled={isLoading}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
