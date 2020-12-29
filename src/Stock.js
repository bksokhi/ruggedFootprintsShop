import React, { Component } from "react";

export class Stock extends Component {
  constructor() {
    super();

    this.state = {
      prints: 10,
    }
  }

  handleCounter = () => {
    this.props.cartList();
  };


  ////// adding to shopping list menu //////
  render() {

    return (
      <div className="galleryItem">
        <li key={this.props.galleryObject.key}>

          <button onClick={this.handleCounter}>
              <img src={this.props.galleryObject.data.image} alt={this.props.galleryObject.data.title} />
              <div className="overlay">
                <p>Add to Cart</p>
              </div>
          </button>

          <h3>{this.props.galleryObject.data.title}</h3> {/*title*/}
          <h4>Price: {this.props.galleryObject.data.price}</h4> {/*price*/}
          
          {/* prints available counter */}
          {/*prints in stock*/}
          {this.state.prints - this.props.printsSelected <= 0 ? (
            <p>Out of Stock</p>
          ) : (
            <p>Prints Available: {this.state.prints - this.props.printsSelected}</p>
              
          )}

        </li>
      </div>
    );
  }
}

export default Stock;