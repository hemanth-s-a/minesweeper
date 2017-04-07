import React from "react";

import View from "./View.jsx";
import constants from "../../utils/constants.js";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.startGame = this.startGame.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            tiles: []
        };
    }

    startGame(rows = 10, columns = 10, mines = 15) {
        let i, j, tiles = [];
        for (i = 0; i < rows; i++) {
            tiles[i] = [];
            for (j = 0; j < columns; j++) {
                tiles[i][j] = {
                    status: constants.UNOPENED
                };
            }
        }

        for (i = 0; i < mines; i++) {
            const
                row = Math.floor(Math.random() * 1000) % rows,
                column = Math.floor(Math.random() * 1000) % columns;
            if (tiles[row][column].value == constants.MINE) {
                i--;
            } else {
                tiles[row][column].value = constants.MINE;
            }
        }

        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                if (tiles[row][column].value) {
                    continue;
                }
                let numberOfMines = 0;
                if (tiles[row][column - 1] && tiles[row][column - 1].value == constants.MINE) {
                    numberOfMines++;
                }
                if (tiles[row][column + 1] && tiles[row][column + 1].value == constants.MINE) {
                    numberOfMines++;
                }
                if (tiles[row - 1] && tiles[row - 1][column - 1] && tiles[row - 1][column - 1].value == constants.MINE) {
                    numberOfMines++;
                }
                if (tiles[row - 1] && tiles[row - 1][column] && tiles[row - 1][column].value == constants.MINE) {
                    numberOfMines++;
                }
                if (tiles[row - 1] && tiles[row - 1][column + 1] && tiles[row - 1][column + 1].value == constants.MINE) {
                    numberOfMines++;
                }
                if (tiles[row + 1] && tiles[row + 1][column - 1] && tiles[row + 1][column - 1].value == constants.MINE) {
                    numberOfMines++;
                }
                if (tiles[row + 1] && tiles[row + 1][column] && tiles[row + 1][column].value == constants.MINE) {
                    numberOfMines++;
                }
                if (tiles[row + 1] && tiles[row + 1][column + 1] && tiles[row + 1][column + 1].value == constants.MINE) {
                    numberOfMines++;
                }
                tiles[row][column] = Object.assign({}, tiles[row][column], {
                    value: constants.NUMBER,
                    adjacentMines: numberOfMines
                });
            }
        }

        this.setState({
            tiles: tiles
        });
    }

    componentDidMount() {
        this.startGame();
    }

    handleClick(row, column) {
        let tiles = this.state.tiles.slice();
        if (tiles[row][column].value == constants.MINE) {
            alert("Busted");
        }
        tiles[row][column].status = constants.OPENED;
        this.setState({
            tiles: tiles
        });
        console.log(tiles[row][column].value + " " + tiles[row][column].adjacentMines);
    }

    render() {
        return (
            <View
                tiles={this.state.tiles}
                onClickHandler={this.handleClick}
            />
        );
    }
}

export default Game;
