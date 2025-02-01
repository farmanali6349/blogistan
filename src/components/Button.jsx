function Button({ loader, text, classes, ...props }) {
  return (
    <button className={`btn ${classes}`} {...props}>
      {loader && <div className="btn-loader"></div>}
      {text}
    </button>
  );
}

export default Button;
