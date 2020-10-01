import React, { Component } from "react";

export class Stock extends Component {

    handleCounter = () => {
    this.props.cartList();
    
    
  };
    
    
  render() {
    return (
      <div className="galleryItem">
        <li key={this.props.galleryObject.key}>
          <button onClick={this.handleCounter}>
              <img src={this.props.galleryObject.data.image} alt="" />
              <div className="overlay">
                <p>Add to Cart</p>
              </div>
          </button>

          <h3>{this.props.galleryObject.data.title}</h3> {/*title*/}
          <h4>Price: {this.props.galleryObject.data.price}</h4> {/*price*/}
          <p>Prints Available: {10 - this.props.printsSelected}</p>{/*prints in stock*/}
          {/* <button onClick={this.handleCounter}>Add to Cart</button> */}
        </li>

      </div>
    );
  }
}

export default Stock;