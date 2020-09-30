import React, { Component } from "react";

export class Stock extends Component {
  constructor() {
    super();
    this.state = {
      stock: 10,
    };
  }

    handleCounter = () => {
    this.props.cartList();
    
    this.setState({
      stock: this.state.stock - 1,
    });
  };
    
    
  render() {
    return (
      <div className="galleryItem">
        <li key={this.props.galleryObject.key}>
          <button onClick={this.handleCounter}>
            <img src={this.props.galleryObject.data.image} alt="" />
          </button>
          <h3>{this.props.galleryObject.data.title}</h3> {/*title*/}
          <h4>Price: {this.props.galleryObject.data.price}</h4> {/*price*/}
          <p>Prints Available: {this.state.stock}</p> {/*prints in stock*/}
          {/* <button onClick={this.handleCounter}>Add to Cart</button> */}
        </li>

      </div>
    );
  }
}

export default Stock;