const Input = (props) => {
  const { type, name, value, classes, handleChange } = props;

  return (
    <input
      type={type || "text"}
      name={name}
      value={value}
      className={classes}
      onChange={handleChange}
    />
  );
};

export default Input;