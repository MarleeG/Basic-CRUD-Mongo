import "./Button.css";
const Button = (props) => {
  const { type, text, classes } = props;
  return <button type={type || "button"} className={classes}>{text}</button>;
};


export default Button;