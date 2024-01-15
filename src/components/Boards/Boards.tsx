import "./Boards.css";

interface Props {
  pieces: any[];
}

const Boards = (props: Props) => {
  if (props.pieces.length > 0) {
    const count = props.pieces[0].count;
    const initalHeight = props.pieces[0].height;
    const initalWidth = props.pieces[0].width;
    const height = Math.floor(initalHeight / 3);
    const width = Math.floor(initalWidth / 3);
    if (height === 0 || width === 0 || count === 0) {
      return <></>;
    }
    const boards: Array<any> = [];
    const restGapPixelsInRow = 1210 - Math.floor(1210 / width) * width;
    const restGapPixelsInCol = 610 - Math.floor(610 / height) * height;
    const countInRow = Math.floor(1210 / width);
    const countInCol = Math.floor(610 / height);
    const maxCountInBoard = countInCol * countInRow;
    const primaryIsRow = restGapPixelsInRow < restGapPixelsInCol;
    const primaryDirectionCount = primaryIsRow ? countInRow : countInCol;
    let marginTop = 0;
    let marginLeft = 0;
    const allBoardsArePerfect = !(count % maxCountInBoard);
    const perfectBoardsCount = Math.floor(count / maxCountInBoard);
    const restPiecesCount = count % maxCountInBoard;

    // draw perfect boards

    for (let i = 0; i < perfectBoardsCount; i++) {
      const pieces = [];
      for (let j = 0; j < maxCountInBoard; j++) {
        marginLeft = primaryIsRow
          ? (j % primaryDirectionCount) * width
          : Math.floor(j / primaryDirectionCount) * width;
        marginTop = primaryIsRow
          ? Math.floor(j / primaryDirectionCount) * height
          : (j % primaryDirectionCount) * height;
        pieces.push(
          <div
            key={Math.random().toString()}
            style={{
              height: height,
              width: width,
              marginLeft: marginLeft,
              marginTop: marginTop,
              borderRadius: 50,
              background: "blue",
              position: "absolute",
            }}>
            <div className="width-size">{initalWidth}</div>{" "}
            <div className="height-size">
              <span className="text-vert">{initalHeight}</span>
            </div>
          </div>
        );
      }
      boards.push(
        <div className="container" key={"board" + Math.random().toString()}>
          <div className="board">{pieces}</div>
        </div>
      );
    }

    // draw not perfect board
    if (!allBoardsArePerfect) {
      const secondaryDirectionCount = Math.floor(
        restPiecesCount / primaryDirectionCount
      );
      const pieces = [];
      for (let i = 0; i < secondaryDirectionCount; i++) {
        for (let j = 0; j < primaryDirectionCount; j++) {
          marginLeft = primaryIsRow
            ? (j % primaryDirectionCount) * width
            : i * width;
          marginTop = primaryIsRow
            ? i * height
            : (j % primaryDirectionCount) * height;
          pieces.push(
            <div
              key={Math.random().toString() + "rest"}
              style={{
                height: height,
                width: width,
                marginLeft: marginLeft,
                marginTop: marginTop,
                borderRadius: 50,
                background: "blue",
                position: "absolute",
              }}>
              <div className="width-size">{initalWidth}</div>{" "}
              <div className="height-size">
                <span className="text-vert">{initalHeight}</span>
              </div>
            </div>
          );
        }
      }

      const restItems =
        restPiecesCount - primaryDirectionCount * secondaryDirectionCount;
      for (let i = 0; i < restItems; i++) {
        marginLeft = primaryIsRow
          ? Math.floor(i / (countInCol - secondaryDirectionCount)) * width
          : (secondaryDirectionCount +
              (i % (countInRow - secondaryDirectionCount))) *
            width;
        marginTop = primaryIsRow
          ? (secondaryDirectionCount +
              (i % (countInCol - secondaryDirectionCount))) *
            height
          : Math.floor(i / (countInRow - secondaryDirectionCount)) * height;
        pieces.push(
          <div
            key={Math.random() + "rest"}
            style={{
              height: height,
              width: width,
              marginLeft: marginLeft,
              marginTop: marginTop,
              borderRadius: 50,
              background: "blue",
              position: "absolute",
            }}>
            <div className="width-size">{initalWidth}</div>{" "}
            <div className="height-size">
              <span className="text-vert">{initalHeight}</span>
            </div>
          </div>
        );
      }

      boards.push(
        <div className="container" key={Math.random().toString()}>
          <div className="board">{pieces}</div>
        </div>
      );
    }

    // for(let i = 0; i < restPiecesCount; i++) {
    //   marginLeft = primaryIsRow ?  primaryDirectionCount
    //   restPiecesCount
    // }

    // for (let j = 0; j < boardCount; j++) {
    //   const pieces: Array<any> = [];
    //   for (
    //     let i = 0;
    //     i <
    //     (j === boardCount - 1 && allBoardsArePerfect
    //       ? count - maximalPieceCountInBoard * (j - 1)
    //       : maximalPieceCountInBoard);
    //     i++
    //   ) {
    //     const countInPrimaryLine = Math.floor(j / primaryDirectionCount);
    //     const restPiecesCount = j - countInPrimaryLine * primaryDirectionCount;
    //     if (i < j - restPiecesCount) {
    //       if (primaryIsRow) {
    //         marginTop = Math.floor(i / primaryDirectionCount) * height;
    //         marginLeft = (i % primaryDirectionCount) * width;
    //       } else {
    //         marginTop = (i % primaryDirectionCount) * height;
    //         marginLeft = Math.floor(i / primaryDirectionCount) * width;
    //       }
    //     } else {
    //       if (primaryIsRow) {
    //         marginTop =
    //           (countInPrimaryLine +
    //             ((i - (j - restPiecesCount)) %
    //               (maximalPieceCountInCol - countInPrimaryLine))) *
    //           height;
    //         marginLeft =
    //           Math.floor(
    //             (i - (j - restPiecesCount)) /
    //               (maximalPieceCountInCol - countInPrimaryLine)
    //           ) * width;
    //       } else {
    //         marginTop =
    //           ((i - (j - restPiecesCount)) % maximalPieceCountInCol) * height;
    //         marginLeft = Math.floor(i / maximalPieceCountInCol) * width;
    //       }
    //     }
    //     pieces.push(
    //       <div
    //         key={j.toString() + i.toString()}
    //         style={{
    //           height: height,
    //           width: width,
    //           marginLeft: marginLeft,
    //           marginTop: marginTop,
    //           borderRadius: 50,
    //           background: "blue",
    //           position: "absolute",
    //         }}></div>
    //     );
    //   }
    //   boards.push(
    //     <div className="container">
    //       <div key={j.toString()} className="board">
    //         {pieces}
    //       </div>
    //     </div>
    //   );
    // }

    // const pieces = [];

    // for (let i = 0; i < restPiecesCount; i++) {
    //   const countInPrimaryLine = Math.floor(
    //     restPiecesCount / primaryDirectionCount
    //   );

    //   if (i < restPiecesCount - countInPrimaryLine * primaryDirectionCount) {
    //     if (primaryIsRow) {
    //       marginTop = Math.floor(i / primaryDirectionCount) * height;
    //       marginLeft = (i % primaryDirectionCount) * width;
    //     } else {
    //       marginTop = (i % primaryDirectionCount) * height;
    //       marginLeft = Math.floor(i / primaryDirectionCount) * width;
    //     }
    //   } else {
    //     if (primaryIsRow) {
    //       marginTop =
    //         (countInPrimaryLine +
    //           (i % (maximalPieceCountInCol - countInPrimaryLine))) *
    //         height;
    //       marginLeft =
    //         Math.floor(i / (maximalPieceCountInCol - countInPrimaryLine)) * width;
    //     } else {
    //       marginTop = (i % maximalPieceCountInCol) * height;
    //       marginLeft = Math.floor(i / maximalPieceCountInCol) * width;
    //     }
    //   }
    //   // if (primaryIsRow) {
    //   //   marginTop = Math.floor(i / primaryDirectionCount) * height;
    //   //   marginLeft = (i % primaryDirectionCount) * width;
    //   // } else {
    //   //   marginLeft = Math.floor(i / primaryDirectionCount) * width;
    //   //   marginTop = (i % primaryDirectionCount) * height;
    //   // }

    //   pieces.push(
    //     <div
    //       key={i.toString() + i.toString()}
    //       style={{
    //         height: height,
    //         width: width,
    //         marginLeft: marginLeft,
    //         marginTop: marginTop,
    //         borderRadius: 50,
    //         background: "blue",
    //         position: "absolute",
    //       }}></div>
    //   );
    // }
    // boards.push(
    //   <div className="container">
    //     <div key={"other"} className="board">
    //       {pieces}
    //     </div>
    //   </div>
    // );
    return <>{boards}</>;
  }
  return <></>;
};

export default Boards;
