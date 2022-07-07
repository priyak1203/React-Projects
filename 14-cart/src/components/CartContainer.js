import React from 'react';
import { useGlobalContext } from '../context';
import CartItem from './CartItem';

const CartContainer = () => {
  const { cart, total, clearCart, loading } = useGlobalContext();
  return (
    <>
      {loading ? (
        <div className="loading">
          <h1>loading...</h1>
        </div>
      ) : (
        <section className="cart">
          {/* cart header */}
          <header>
            <h2>Your Bag</h2>
            {cart.length === 0 && (
              <h4 className="empty-cart">is currently empty</h4>
            )}
          </header>
          {/* cart items */}
          {cart.length !== 0 && (
            <>
              <div>
                {cart.map((cartItem) => {
                  return <CartItem key={cartItem.id} {...cartItem} />;
                })}
              </div>
              {/* cart footer */}
              <footer>
                <hr />
                <div className="cart-total">
                  <h4>
                    total <span>${total}</span>
                  </h4>
                </div>
                <button className="btn clear-btn" onClick={clearCart}>
                  clear cart
                </button>
              </footer>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default CartContainer;
