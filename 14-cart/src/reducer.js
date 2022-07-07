const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_LOADING':
      return { ...state, loading: true };

    case 'FETCH_DATA':
      return {
        ...state,
        cart: payload,
        loading: false,
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      };

    case 'INCREASE_ITEM': {
      let tempCart = state.cart.map((item) => {
        if (item.id === payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, cart: tempCart };
    }

    case 'DECREASE_ITEM': {
      let tempCart = state.cart
        .map((item) => {
          if (item.id === payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount > 0);
      return { ...state, cart: tempCart };
    }

    case 'GET_TOTALS': {
      let { total, amount } = state.cart.reduce(
        (cartTotal, item) => {
          const { amount, price } = item;
          cartTotal.total += amount * price;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );

      total = parseFloat(total.toFixed(2));

      return { ...state, total, amount };
    }

    case 'CHANGE_AMOUNT': {
      const tempCart = state.cart
        .map((item) => {
          if (item.id === payload.id) {
            if (payload.type === 'inc') {
              return { ...item, amount: item.amount + 1 };
            }
            if (payload.type === 'dec') {
              return { ...item, amount: item.amount - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.amount > 0);
      return { ...state, cart: tempCart };
    }

    default:
      throw new Error('no matching action type');
  }
};

export default reducer;
