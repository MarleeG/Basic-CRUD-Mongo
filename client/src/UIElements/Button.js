import "./Button.css";
const Button = (props) => {
  const { type, text, classes, method, disabled, id, updating } = props;
  return (
    <button disabled={disabled} type={type || "button"} className={classes} onClick={() => {
        if(method && updating){
            method(id, updating)
        }else if(method){
            method(id)
        }
        
    }}>
      {text}
    </button>
  );
};

export default Button;