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
      console.log(newState);
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

  
  render() {
    return (
      <div className="App" className="wrapper">
        <header>
        <h1>Rugged // Footprints Shop</h1>
          
        </header>
        
        <ul className="gallery">
          {this.state.gallery.map((galleryObject) => {
            
            return (
              <Stock galleryObject = {galleryObject} cartList = {() => this.cartList(galleryObject)} />
            );
          })}
        </ul>
        
        {this.state.cart.length > 0 ?
          (
          <div className="shoppingCart">
              <h3>Shopping Cart</h3>
              <p>You have {this.state.cart.length} items.</p>
              {this.state.cart.map((cartItem) => {
            return (
            <li>
              <img src={cartItem.data.image} alt={cartItem.data.title} />
              <div className="photoInfo">
                <h5>{cartItem.data.title}</h5> {/*title*/}
                <p>Price: {cartItem.data.price}</p> {/*price*/}
              </div>

              </li>
            )
              })}
          </div>
          )
          :
          <p>empty cart</p>
        }


        
      </div>
    
    )}
}


export default App;
