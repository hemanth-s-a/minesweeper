import React from "react";

import Row from "../Row/index.jsx";

class Game extends React.Component {
    render() {
        return (
            <div className="minesweeper-game">
                <div>
                    <input type="button" value="Start game" />
                </div>
                <div>
                    {
                        this.props.tiles.map((row, i) => {
                            return (<Row tiles={row} key={i} />);
                        })
                    }
                </div>
            </div>
        );
    }
}

Game.propTypes = {
    tiles: React.PropTypes.array
};

Game.defaultProps = {
    tiles: [[1, 2, 3], [4, 5, 6]]
};

export default Game;
