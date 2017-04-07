import React from "react";

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.props.onClickHandler(this.props.row, this.props.column);
    }

    render() {
        return (
            <div
                className={`tile ${this.props.tile.status}`}
                onClick={this.clickHandler}
            >
            </div>
        );
    }
}

Tile.propTypes = {
    tile: React.PropTypes.object,
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    onClickHandler: React.PropTypes.func
};

export default Tile;
