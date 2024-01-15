import { useState } from "react";
import "./UserInput.module.css";

interface Props {
  piece?: any;
  onFormSubmit: (width: number, height: number, count: number) => void;
  onUpdate: (piece: any) => void;
  onRemove: (id: string) => void;
}

const UserInput = (props: Props) => {
  const pieceId = props.piece ? props.piece.id : null;
  const [width, setWidth] = useState(props.piece ? props.piece.width : "");
  const [height, setHeight] = useState(props.piece ? props.piece.height : "");
  const [quantity, setQuantity] = useState(
    props.piece ? props.piece.count : ""
  );

  const widthChangeHandler = (event: any) => {
    setWidth(event.target.value);
  };

  const heightChangeHandler = (event: any) => {
    setHeight(event.target.value);
  };

  const quantityChangeHandler = (event: any) => {
    setQuantity(event.target.value);
  };

  const formSubmitHandler = (event: any) => {
    event.preventDefault();
    if (
      +width > 0 &&
      +width < 3630 &&
      +height > 0 &&
      +height < 1830 &&
      +quantity > 0
    ) {
      props.onFormSubmit(+width, +height, +quantity);
    }
  };

  const removeHandler = (event: any) => {
    event.preventDefault();

    props.onRemove(pieceId);
  };

  const updateHandler = (event: any) => {
    event.preventDefault();

    props.onUpdate({
      id: pieceId,
      width: +width,
      height: +height,
      count: +quantity,
    });
  };

  return (
    <form>
      <input
        name="width"
        value={width}
        onChange={widthChangeHandler}
        type="number"
      />
      <input
        name="height"
        value={height}
        onChange={heightChangeHandler}
        type="number"
      />
      <input
        name="quantity"
        value={quantity}
        onChange={quantityChangeHandler}
        type="number"
      />
      {!pieceId && (
        <button onClick={formSubmitHandler} type="submit">
          Add
        </button>
      )}
      {pieceId && <button onClick={updateHandler}>Update</button>}
      {pieceId && <button onClick={removeHandler}>Remove</button>}
    </form>
  );
};

export default UserInput;
