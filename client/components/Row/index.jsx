import React from "react";

import Tile from "../Tile/index.jsx";

class Row extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.tiles.map((tile, i) => {
                        return (
                            <Tile
                                key={i}
                                row={this.props.row}
                                column={i}
                                tile={tile}
                                onClickHandler={this.props.onClickHandler}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

Row.propTypes = {
    tiles: React.PropTypes.array,
    row: React.PropTypes.number,
    onClickHandler: React.PropTypes.func
};

export default Row;
