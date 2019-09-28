import React from "react";
class MyClickableQutions extends React.Component {
  handleQutionsClick = () => this.props.onClick(this.props.index);

  render() {
    return (
      <button
        type="button"
        className={
          this.props.isActive
            ? "btn btn-secondary actives"
            : "btn btn-secondary"
        }
        onClick={this.handleQutionsClick}
      >
        {this.props.name}
      </button>

      // <button
      //   type="button"
      //   className={this.props.isActive ? "active" : "album"}
      //   onClick={this.handleClick}
      // >
      //   <span>{this.props.name}</span>
      // </button>
    );
  }
}

export default MyClickableQutions;
