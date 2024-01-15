import { useReducer } from "react";
import "./App.css";
import Boards from "./components/Boards/Boards";
import UserInput from "./components/UserInput/UserInput";

function App() {
  const [state, dispatch] = useReducer(
    (state: any, action: any) => {
      if (action.type === "add") {
        const newPieces = [...state.pieces, action.payload];
        return { pieces: newPieces };
      }
      if (action.type === "update") {
        const updatedPieceIndex = state.pieces.findIndex(
          (piece: any) => piece.id === action.payload.id
        );
        console.log(updatedPieceIndex);
        const newPieces = [...state.pieces];
        newPieces[updatedPieceIndex] = action.payload;
        return { pieces: newPieces };
      }
      if (action.type === "remove") {
        const removedPieceIndex = state.pieces.findIndex(
          (piece: any) => piece.id === action.payload
        );
        const newPieces = state.pieces.splice(removedPieceIndex, 1);
        return { pieces: newPieces };
      }
      return state;
    },
    { pieces: [] }
  );
  const formSubmitHandler = (width: number, height: number, count: number) => {
    dispatch({
      type: "add",
      payload: {
        id: Math.random().toString(),
        width,
        height,
        count,
      },
    });
  };

  const formUpdateHandler = (piece: any) => {
    dispatch({
      type: "update",
      payload: piece,
    });
  };

  const formRemoveHandler = (pieceId: string) => {
    dispatch({
      type: "remove",
      payload: pieceId,
    });
  };

  const userInputs = state.pieces.map((piece: any) => (
    <UserInput
      key={piece.id}
      piece={piece}
      onRemove={formRemoveHandler}
      onUpdate={formUpdateHandler}
      onFormSubmit={formSubmitHandler}
    />
  ));
  userInputs.push(
    <UserInput
      piece={null}
      onRemove={formRemoveHandler}
      onUpdate={formUpdateHandler}
      onFormSubmit={formSubmitHandler}
    />
  );
  return (
    <div className="App">
      {userInputs}
      <Boards pieces={state.pieces} />
    </div>
  );
}

export default App;
