import React, { Component } from 'react';
import { Layer, Rect } from 'react-konva';

class Key extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {
      keyCard,
      entryHeight,
      keyLength,
      background,
      changeColor,
      colors,
      borderWidth
    } = this.props;

    const entryLength = entryHeight + borderWidth;

    const renderedKey = keyCard.map(row =>
      row.map(cell => (
        <Rect
          x={borderWidth + entryLength * cell.row}
          y={borderWidth + entryLength * cell.col}
          height={entryHeight}
          width={entryHeight}
          fill={colors[cell.colorID]}
          onClick={() => changeColor(cell.row, cell.col)}
          onTap={() => changeColor(cell.row, cell.col)}
        />
      ))
    );

    return (
      <>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={keyLength}
            height={keyLength}
            fill={background}
          />
        </Layer>
        <Layer>{renderedKey}</Layer>
      </>
    );
  }
}

export default Key;
