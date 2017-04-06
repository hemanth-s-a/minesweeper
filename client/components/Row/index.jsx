import React from "react";

import Tile from "../Tile/index.jsx";

class Row extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.tiles.map((tile, i) => {
                        return (<Tile key={i} />);
                    })
                }
            </div>
        );
    }
}

export default Row;
