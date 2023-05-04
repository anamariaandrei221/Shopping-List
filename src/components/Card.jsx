import Button from "./Button";
export default function Card(props) {
  function handleMove() {
    props.isCompleted ? props.uncomplete(props.id) : props.complete(props.id);
  }

  return (
    <div
      className={`item--card ${
        props.isCompleted ? "completed" : "uncompleted"
      }`}
    >
      <h4 className="titles--card">Name: {props.name}</h4>
      <h4 className="titles--card">Quantity: {props.quantity}</h4>
      <div className="modify--card">
        <h4 className="titles--card">Modify quantity:</h4>
        <Button
          color="green"
          symbol="+"
          increase={() => props.increase(props.id)}
        />
        <Button
          color="red"
          symbol="-"
          decrease={() => props.decrease(props.id)}
        />
      </div>
      <button className="mark--button" onClick={handleMove}>
        MARK AS {props.buttonName}
      </button>
    </div>
  );
}
