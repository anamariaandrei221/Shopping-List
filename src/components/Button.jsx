export default function Button(props) {
  const styles = {
    backgroundColor: props.color,
    borderRadius: "50%",
    border: "none",
    textAlign: "center",
    width: "30px",
    height: "30px",
    fontSize: "25px",
    marginRight: "5px",
    cursor: "pointer",
  };

  function handleModifyQuantity() {
    props.color === "green" ? props.increase() : props.decrease();
  }
  return (
    <button style={styles} onClick={handleModifyQuantity}>
      {props.symbol}
    </button>
  );
}
