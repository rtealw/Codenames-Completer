import React, { Component } from 'react';
import { Stage } from 'react-konva';
import Key from './components/Key.js';
import MatchingKeys from './components/MatchingKeys.js';
import getKeys from './components/getKeys.js';

const dimension = 5;

const colors = [
  '#CEC286', // tan
  '#DA192C', // red
  '#16729F', // blue
  '#2B2C2D', // black
  '#FFFFFF' // white
];

const allKeys = getKeys();

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentKey: undefined,
      matchingKeys: undefined,
      stageLength: undefined,
      innerWidth: undefined
    };

    this.generateCurrentKey = this.generateCurrentKey.bind(this);
    this.updateDimension = this.updateDimension.bind(this);
    this.doesMatch = this.doesMatch.bind(this);
    this.getMatchingKeys = this.getMatchingKeys.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  generateCurrentKey() {
    const currentKey = [];
    for (let i = 0; i < dimension; i++) {
      const newRow = [];
      for (let j = 0; j < dimension; j++) {
        newRow[j] = {
          colorID: 4,
          row: j,
          col: i
        };
      }
      currentKey[i] = newRow;
    }
    return currentKey;
  }

  updateDimension() {
    this.setState({
      stageLength: (Math.min(window.innerHeight, window.innerWidth) * 2) / 3,
      innerWidth: window.innerWidth
    });
  }

  componentDidMount() {
    const currentKey = this.generateCurrentKey();
    this.setState({
      currentKey: currentKey
    });
    this.updateDimension();
    window.addEventListener('resize', this.updateDimension);
  }

  doesMatch(possibleMatch) {
    const { currentKey } = this.state;
    if (currentKey.length !== possibleMatch.length) return false;
    for (let i = 0; i < currentKey.length; i++) {
      if (currentKey[i].length !== possibleMatch[i].length) return false;
      for (let j = 0; j < currentKey[i].length; j++) {
        const currentID = currentKey[i][j].colorID;
        if (currentID !== 4 && currentID !== possibleMatch[i][j].colorID) {
          return false;
        }
      }
    }
    return true;
  }

  getMatchingKeys() {
    const newMatchingKeys = allKeys.filter(possibleMatch => {
      return this.doesMatch(possibleMatch);
    });
    this.setState({ matchingKeys: newMatchingKeys });
  }

  changeColor(row, col) {
    const { currentKey } = this.state;
    const newKey = Array.from(currentKey);
    newKey[col][row] = Object.assign(currentKey[col][row], {
      colorID: (currentKey[col][row].colorID + 1) % colors.length
    });
    this.setState({ currentKey: newKey });
    this.getMatchingKeys();
  }

  render() {
    const { currentKey, matchingKeys, stageLength, innerWidth } = this.state;
    const offsetX = (innerWidth - stageLength) / 2;
    const borderWidth = 3;
    const stageHeight = stageLength + borderWidth * (dimension + 1);

    return (
      <div className="App">
        {currentKey && (
          <div>
            <Stage
              height={stageHeight}
              width={stageHeight + offsetX}
              offsetX={-offsetX}
            >
              <Key
                keyCard={currentKey}
                entryHeight={stageLength / dimension}
                keyLength={stageHeight}
                background={'#000000'}
                changeColor={this.changeColor}
                colors={colors}
                borderWidth={borderWidth}
              />
            </Stage>
            <MatchingKeys
              matchingKeys={matchingKeys}
              dimension={dimension}
              stageLength={stageLength}
              colors={colors}
              borderWidth={borderWidth}
              innerWidth={innerWidth}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
