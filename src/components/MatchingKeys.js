import React, { Component } from 'react';
import getKeys from './getKeys.js';
import Key from './Key.js';
import { Stage } from 'react-konva';

const allKeys = getKeys();

class MatchingKeys extends Component {
  constructor() {
    super();

    this.state = {
      showRed: true,
      showBlue: true
    };

    this.getMatchingKeyComponent = this.getMatchingKeyComponent.bind(this);
    this.getMatchingKeyComponents = this.getMatchingKeyComponents.bind(this);
  }

  getMatchingKeyComponent(matchingKey, keyLength, isOdd) {
    const { dimension, stageLength, colors, borderWidth } = this.props;
    return (
      <Key
        keyCard={matchingKey}
        entryHeight={stageLength / dimension}
        keyLength={keyLength}
        background={
          allKeys.indexOf(matchingKey) < allKeys.length / 2
            ? colors[1]
            : colors[2]
        }
        changeColor={(row, col) => {}}
        colors={colors}
        borderWidth={borderWidth}
      />
    );
  }

  getMatchingKeyComponents(matchingKeys) {
    const { dimension, stageLength, borderWidth, innerWidth } = this.props;

    if (matchingKeys.length > 20) {
      return (
        <center>
          <p>There are too many matches to show.</p>
        </center>
      );
    }

    const offsetX = (innerWidth - stageLength) / 2;
    const stageHeight = stageLength + borderWidth * (dimension + 1);
    const keyLength = stageLength + borderWidth * (dimension + 1);

    const matchingKeyComponents = [];
    for (let x = 0; x < matchingKeys.length; x++) {
      matchingKeyComponents[x] = (
        <>
          <Stage
            height={stageHeight + stageLength / dimension}
            width={stageHeight + offsetX}
            offsetX={-offsetX}
          >
            {this.getMatchingKeyComponent(matchingKeys[x], keyLength, false)}
          </Stage>
        </>
      );
    }

    return matchingKeyComponents;
  }

  render() {
    let { matchingKeys } = this.props;
    const { showRed, showBlue } = this.state;
    let matchingKeyComponents;
    let numMatches = 160;
    if (matchingKeys) {
      if (!showRed) {
        matchingKeys = matchingKeys.filter(
          key => allKeys.indexOf(key) >= allKeys.length / 2
        );
      }
      if (!showBlue) {
        matchingKeys = matchingKeys.filter(
          key => allKeys.indexOf(key) < allKeys.length / 2
        );
      }
      numMatches = matchingKeys.length;
      matchingKeyComponents = this.getMatchingKeyComponents(matchingKeys);
    }
    return (
      <div>
        <center>
          {numMatches === 1 ? (
            <p>There is {numMatches} match.</p>
          ) : (
            <p>There are {numMatches} matches.</p>
          )}
          <p>
            <input
              type="checkbox"
              checked={showRed}
              onClick={() => this.setState({ showRed: !showRed })}
            />
            Show matches where red goes first.
          </p>
          <p>
            <input
              type="checkbox"
              checked={showBlue}
              onClick={() => this.setState({ showBlue: !showBlue })}
            />
            Show matches where blue goes first.
          </p>
        </center>

        {matchingKeyComponents}
      </div>
    );
  }
}

export default MatchingKeys;
