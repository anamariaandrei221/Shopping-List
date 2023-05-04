import React, { useState } from "react";
import Card from "./Card";
import { increaseQuantity, decreaseQuantity, markItem } from "./helpers";

export default function Main() {
  const [values, setValues] = useState({
    id: "",
    name: "",
    quantity: "",
    isCompleted: false,
  }); //state for the inputs
  const [items, setItems] = useState([]); // state for the array of objects (items to buy)
  const [nextId, setNextId] = useState(0); //state for the id for every object
  const [itemsPurchased, setItemsPurchased] = useState([]); //state for the array of objects ( items purchased)
  const [warningMessage, setWarningMessage] = useState(null); //state for the warning message when the inputs are empty

  function handleInputChange(event) {
    // handle form inputs value change
    setValues((prevValues) => {
      return {
        ...prevValues,
        [event.target.name]: event.target.value,
      };
    });
    if (warningMessage) {
      setWarningMessage(null);
    }
  }

  const addItem = (event) => {
    //when the button add is clicked a new item is added to the items array with the inputs values
    event.preventDefault();
    if (values.name.trim() && values.quantity.trim()) {
      setItems((prevItems) => [
        ...prevItems,
        {
          id: nextId,
          name: values.name,
          quantity: values.quantity,
          isCompleted: false,
        },
      ]);
      setValues({ name: "", quantity: "" });
      setNextId((prevId) => prevId + 1);
    } else setWarningMessage("Please enter a value!");
  };

  const cardsToBuy = items.map((item, index) => {
    return (
      <Card
        key={index}
        name={item.name}
        quantity={item.quantity}
        id={item.id}
        isCompleted={item.isCompleted}
        increase={() =>
          increaseQuantity(item.id, items, setItems, setItemsPurchased)
        }
        decrease={() =>
          decreaseQuantity(item.id, items, setItems, setItemsPurchased)
        }
        complete={() =>
          markItem(
            item.id,
            items,
            setItems,
            itemsPurchased,
            setItemsPurchased,
            item.isCompleted
          )
        }
        buttonName="COMPLETED"
      />
    );
  });

  const cardPurchased = itemsPurchased.map((itemPurchased, index) => {
    return (
      <Card
        key={index}
        name={itemPurchased.name}
        quantity={itemPurchased.quantity}
        id={itemPurchased.id}
        increase={() =>
          increaseQuantity(itemPurchased.id, items, setItems, setItemsPurchased)
        }
        decrease={() =>
          decreaseQuantity(itemPurchased.id, items, setItems, setItemsPurchased)
        }
        buttonName="UNCOMPLETED"
        isCompleted={itemPurchased.isCompleted}
        uncomplete={() =>
          markItem(
            itemPurchased.id,
            items,
            setItems,
            itemsPurchased,
            setItemsPurchased,
            itemPurchased.isCompleted
          )
        }
      />
    );
  });
  return (
    <main className="main">
      <div className="form">
        <label className="input--label" htmlFor="name">
          What do I need to buy?
        </label>
        <input
          className="form--input"
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
          value={values.name}
        ></input>
        <label className="input--label" htmlFor="quantity">
          What quantity do I need?
        </label>
        <input
          className="form--input"
          type="number"
          placeholder="Quantity"
          name="quantity"
          onChange={handleInputChange}
          value={values.quantity}
        ></input>
        <button className="form--button" onClick={addItem}>
          Add
        </button>
        {warningMessage && <p className="error--message">{warningMessage}</p>}
      </div>

      <div className="div--columns">
        <div className="columns">
          <h2 className="column--title">Items to buy: {items.length}</h2>
          {cardsToBuy}
        </div>
        <div className="columns">
          <h2 className="column--title">
            Purchased items: {itemsPurchased.length}
          </h2>
          {cardPurchased}
        </div>
      </div>
    </main>
  );
}
