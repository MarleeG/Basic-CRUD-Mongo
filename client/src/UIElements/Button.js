import "./Button.css";
const Button = (props) => {
  const { type, text, classes, method, id } = props;
  return (
    <button type={type || "button"} className={classes} onClick={() => {
        if(method){
            method(id)
        }
    }}>
      {text}
    </button>
  );
};

export default Button;