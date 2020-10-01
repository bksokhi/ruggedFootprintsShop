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

///////// update shopping cart list /////////
  cartList = galleryObject => {
    // created new array 
    const galleryItems = [...this.state.cart];
    galleryItems.push(galleryObject);

    // adding total price of items together in shopping cart //
    // converting string to number
    let total = 0
    galleryItems.map((priceItem) => {
      let number = parseFloat(priceItem.data.price.replace('$',''))
      total = total + number
    })
    // setting total price to 2 decimal place
    this.setState({
      cart: galleryItems,
      totalPrice: '$'+total.toFixed(2),
    });
  }

///////// remove function to remove items from shopping cart list ///////////
  handleRemove = mapIndex => {
    const cartList = [...this.state.cart];
    const updatedCart = cartList.filter((item, i) => i !== mapIndex);
    this.setState({
      cart: updatedCart,
    })
  }

///////// open and close shopping cart menu /////////
  // code used from example: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav //
  openCart = () => {
    document.getElementById("shoppingCart").style.width = "245px";
    document.getElementById("shoppingCart").style.padding = "25px";
  }

  closeCart = () => {
    document.getElementById("shoppingCart").style.width = "0";
    document.getElementById("shoppingCart").style.padding = "0";
  }
  
  render() {
      return (
        <div className="App">
          {/* header */}
          <header>
            {/* navigation bar */}
            <nav>
              <div className="wrapper nav">
                <ul>
                  <li>
                    <a href="https://www.ruggedfootprints.com/category/travel/">
                      // Travel Blog
                    </a>
                  </li>
                </ul>

              {/* items on right side of nav bar */}
                <div className="rightNav">
                  <a href="https://www.instagram.com/ruggedfootprints/">
                    <i aria-label="link to instagram" className="fab fa-instagram"></i>
                  </a>
                  <i aria-label="open shopping cart" onClick={this.openCart} className="fas fa-shopping-cart"></i>
                  {/* counting how many items in cart */}
                  <p>{this.state.cart.length}</p> 
                </div>
              </div>
            </nav>

            <div className="heroContainer wrapper">
              <h1>Rugged // Footprints Shop</h1>
              <h2>Photography by Sakib I.</h2>
              <p>
                Mid-20s, currently lives in Silicon Valley, California but
                raised in Scarborough/Toronto, ON, Canada. By occupation is a
                hardware engineer. Avid traveller, advocate of health & fitness,
                photography noobie.
              </p>
              <p className="select">~ Place your order by selecting the images below. ~</p>
            </div>
          </header>

          {/* main */}
          <main className="wrapper">
            {/* photo gallery */}
            <ul className="gallery">
              {this.state.gallery.map((galleryObject) => {
                return (
                  // prints available counter //
                  <Stock
                    galleryObject={galleryObject}
                    cartList={() => this.cartList(galleryObject)}
                    printsSelected={
                      this.state.cart.filter((cartItem) => {
                        return cartItem.data.title === galleryObject.data.title;
                      }).length
                    }
                  />
                );
              })}
            </ul>

            {/* shopping cart menu and item counter */}
            {/* show shopping cart menu if items are selected */}
            {this.state.cart.length >= 0 ? (
              <div id="shoppingCart" className="shoppingCart">
                <div className="cartTitle">
                  <h3>Shopping Cart</h3>

                  {/* cart counter */}
                  <p>
                    {this.state.cart.length}
                    <i aria-label="items in shopping cart" className="fas fa-shopping-cart"></i>
                  </p>

                  {/* cart close button */}
                  <i aria-label="close shopping cart" onClick={this.closeCart} className="far fa-window-close closeButton"></i>
                </div>
                

                {/* importing selected gallery items into shopping cart list */}
                {this.state.cart.map((cartItem, mapIndex) => {
                  return (
                    <li>
                      <img
                        src={cartItem.data.image}
                        alt={cartItem.data.title}
                      />
                      <div className="photoInfo">
                        <h5>{cartItem.data.title}</h5> {/*title*/}
                        <p>Price:{cartItem.data.price}</p> {/*price*/}
                      </div>

                      {/* remove button to remove items from shopping list */}
                      <button
                        className="trash"
                        onClick={() => this.handleRemove(mapIndex)}
                      >
                        <i aria-label="remove item" className="fas fa-trash"></i>
                      </button>
                    </li>
                  );
                })}

                <p>Total Price {this.state.totalPrice}</p>

                <button>Submit Order</button>
              </div>
            )
              :(
              <p className="placeHolder"></p>
              )}
          </main>

          <footer>
            <p>Original Photographs by Sakib.I - <a href="https://www.ruggedfootprints.com/category/travel/">Rugged // Footprints</a></p>
            <p>Created by <a href="https://github.com/bksokhi">Baljit Sokhi</a> at Juno College</p>
          </footer>
        </div>
      );}
}

export default App;
