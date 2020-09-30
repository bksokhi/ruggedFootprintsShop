import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';
import Stock from './Stock.js';


export class App extends Component {
  constructor() {
    super();

    this.state = {
      gallery: [],
      cart: [],
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      console.log(response.val());

      const newState = [];
      const data = response.val();

      for (const key in data) {
        newState.push({
          key: key,
          data: data[key]
        });
      }

      this.setState({
        gallery: newState,
      });
    });
  }

// update cart list
  cartList = galleryObject => {
    // created new array 
    const galleryItems = [...this.state.cart];
    galleryItems.push(galleryObject);

    this.setState({
      cart: galleryItems,
    });
  }

// remove function for shopping cart list
  handleRemove = mapIndex => {
    const cartList = [...this.state.cart];
    const updatedCart = cartList.filter((item, i) => i !== mapIndex);
    this.setState({
      cart: updatedCart,
    })
  }

  
  render() {
    return (
      <div className="App">
        {/* header */}
        <header>
          <nav>
            <div className="wrapper nav">
              <ul>
                <li>
                  <a href="https://www.ruggedfootprints.com/category/travel/">
                    // Travel Blog
                  </a>
                </li>
              </ul>
              <a href="https://www.instagram.com/ruggedfootprints/">
                <i className="fab fa-instagram"></i>{" "}
              </a>
            </div>
          </nav>

          <div className="heroContainer wrapper">
            <h1>Rugged // Footprints Shop</h1>
            <h2>Photography by Sakib I.</h2>
            <p>
              Mid-20s, currently lives in Silicon Valley, California but raised
              in Scarborough/Toronto, ON, Canada. By occupation is a hardware
              engineer. Avid traveller, advocate of health & fitness,
              photography noobie.
            </p>
          </div>
        </header>

      {/* main */}
        <main className="wrapper">
          {/* photo gallery */}
          <ul className="gallery">
            {this.state.gallery.map((galleryObject) => {
              return (
                // prints available counter
                <Stock
                  galleryObject={galleryObject}
                  cartList={() => this.cartList(galleryObject)}
                />
              );
            })}
          </ul>

            {/* shopping cart item counter */}
          {this.state.cart.length > 0 ? (
            <div className="shoppingCart">
              <h3>Shopping Cart</h3>
              <p><i className="fas fa-shopping-cart"></i>{this.state.cart.length}</p>

            {/* importing selected gallery items into shopping cart list */}
              {this.state.cart.map((cartItem, mapIndex) => {
                return (
                  <li>
                    <img src={cartItem.data.image} alt={cartItem.data.title} />
                    <div className="photoInfo">
                      <h5>{cartItem.data.title}</h5> {/*title*/}
                      <p>Price: {cartItem.data.price}</p> {/*price*/}
                    </div>

                    {/* remove button to remove items from shopping list */}
                      <button className="trash" onClick={() => this.handleRemove(mapIndex)} >
                          <i className="fas fa-trash"></i>
                      </button>
                      
                  </li>
                );
              })}
              
              <button>Submit Order</button>
            </div>
          ) : (
            <p className="placeHolder"></p>
            )}
        </main>

        <footer>
          <p>Original Photographs by Sakib.I - Rugged // Footprints</p>
          <p>Created by Baljit Sokhi at Juno College</p>
        </footer>
      </div>
    );}
}


export default App;
