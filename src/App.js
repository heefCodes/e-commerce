// feature 1
import React, { Component } from 'react';
import data from "./data.json"
import Products from './components/products';
import Filter from './components/filter';
import Cart from './components/cart';

class App extends Component {
    constructor(){
        super();
        this.state = {
            products:data.products,
            size: "",
            sort: "",
        }
    }
    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach(item => {
            if (item._id === product._id) {
                item.count++;
                alreadyInCart = true;
            }
        });
        if (!alreadyInCart) {
            cartItems.push({ ...product, count: 1});
        }
        this.setState({cartItems: cartItems});
    };
    sortProducts = (event) =>{
        const sort = event.target.value
        console.log(event.target.value)
        this.setState((state) => ({
            sort: sort,
            products: this.state.products.slice().sort((a,b) =>(
                sort === "lowest"?
                ((a.price > b.price)? 1:-1):
                sort === "highest"?
                ((a.price < b.price)? 1:-1):
                ((a._id < b._id)? 1:-1)
            ))

        }))
    }
    filterProducts = (event) =>{
        console.log(event.target.value) 
        if (event.target.value === ""){
            this.setState({size: event.target.value, products: data.products})
        }else{
            this.setState({
                size: event.target.value,
                products: data.products.filter(
                    (product) => product.availableSizes.indexOf(event.target.value) >= 0
                ),
            });

        }
        
    }

    render() {
        return (
            <div className='grid-container'>
                <header>
                    <a href="/">E-commerce</a>
                </header>
                <main>
                    <div className='content'>
                       <div className='main'>
                            <Filter count={this.state.products.length}
                                size={this.state.size}
                                sort={this.state.sort}
                                filterProducts={this.filterProducts}
                                sortProducts={this.sortProducts}/>
                            <Products products={this.state.products}
                                addToCart={this.addToCart}
                            />
                       </div>
                       <div className='sidebar'>
                            <Cart cartItems={this.state.cartItems}/>
                       </div>

                    </div>
                </main>
                <footer>
                    All right is reserved.
                </footer>

            </div>
        );
    }
}

export default App;