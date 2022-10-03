import React, { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { Toast } from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

export default function Cart() {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          onClick={() => setShowCart(false)}
          className='cart-heading'
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => {
              return (
                <div className='product' key={item._id}>
                  <img
                    src={urlFor(item?.image[0])}
                    alt='product'
                    className='cart-product-image'
                  />
                  <div className='item-desc'>
                    <div className='flex top'>
                      {item.name && <h5>{item.name}</h5>}
                      <h4>${item.price}</h4>
                    </div>
                    <div className='flex bottom'>
                      <div>
                        <p className='quantity-desc'>
                          <span
                            className='minus'
                            onClick={() =>
                              toggleCartItemQuantity(item._id, 'dec')
                            }
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className='num' onClick=''>
                            {item.quantity}
                          </span>
                          <span
                            className='plus'
                            onClick={() =>
                              toggleCartItemQuantity(item._id, 'inc')
                            }
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type='button'
                        className='remove-item'
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal: </h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick=''>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
