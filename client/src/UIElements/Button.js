import "./Button.css";
const Button = (props) => {
  const { type, text, classes, deleteTask, id } = props;
  return (
    <button type={type || "button"} className={classes} onClick={() => {
        if(deleteTask){
            deleteTask(id)
        }
    }}>
      {text}
    </button>
  );
};

export default Button;