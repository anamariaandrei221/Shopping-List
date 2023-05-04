export function decreaseQuantity(id, items, setItems, setItemsPurchased) {
  // it decreases the quantity of an item when the button is clicked and if the quantity is 0 it deletes the item
  setItems((prevItems) =>
    prevItems
      .map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: Number(item.quantity) - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
  setItemsPurchased((prevItemsPurchased) =>
    prevItemsPurchased
      .map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: Number(item.quantity) - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}

export function increaseQuantity(id, items, setItems, setItemsPurchased) {
  //it increases the quantity of an item when the button is clicked
  setItems((prevItems) =>
    prevItems.map((item) =>
      item.id === id ? { ...item, quantity: Number(item.quantity) + 1 } : item
    )
  );
  setItemsPurchased((prevItemsPurchased) =>
    prevItemsPurchased.map((item) =>
      item.id === id ? { ...item, quantity: Number(item.quantity) + 1 } : item
    )
  );
}

export function markItem( //it moves the items from the column of items that need to be purchased to the column of items that are purchased and viceversa
  id,
  items,
  setItems,
  itemsPurchased,
  setItemsPurchased,
  isCompleted
) {
  const itemToMark = !isCompleted
    ? items.find((item) => item.id === id)
    : itemsPurchased.find((item) => item.id === id);

  if (itemToMark) {
    if (!isCompleted) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setItemsPurchased((prevItemsPurchased) => [
        ...prevItemsPurchased,
        { ...itemToMark, isCompleted: true },
      ]);
    } else {
      setItemsPurchased((prevItemsPurchased) =>
        prevItemsPurchased.filter((item) => item.id !== id)
      );
      setItems((prevItems) => [
        ...prevItems,
        { ...itemToMark, isCompleted: false },
      ]);
    }
  }
}
