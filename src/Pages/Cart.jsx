import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../REDUX/slices/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function Cart() {
  const dispatch=useDispatch()
  const cartItems = useSelector(state=>state.cartReducer)
// to find total price
const [cartTotal,setCartTotal]= useState(0)
useEffect(()=>{
  if(cartItems?.length>0){
    setCartTotal(cartItems?.map(item=>item.totalPrice).reduce((t1,t2)=>t1+t2))

  }else{
    setCartTotal(0)
  }
},[cartItems])

// dec quantity button, when dec from 1 to 0 ,delete that perticular product
const handleDecrementQuantity=(product)=>{
  if(product.quantity>1){
    dispatch(decQuantity(product.id))
  }else{
    dispatch(removeCartItem(product.id))
  }

}

  
 

  const cartCount = useSelector(state=>state.cartReducer).length

  const handleCheckout=()=>{
    dispatch(emptyCart())
    toast.success('Order Placed Successfully, Thank You For Shopping!')
  }
  return (
    <>
      <Header />

      <div className='container' style={{ marginTop: '150px' }}>
       
       {
        cartItems?.length>0?
       
       <div className="pt-5">
          <h2>Cart</h2>
          <div className="row mt-5">
            <div className="col-lg-8">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sl no</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
               tify
               <tbody>
               { cartItems?.map((product,index)=>(
                  <tr>
                    <td>{index+1}</td>
                    <td>{product.title.slice(0,15)}...</td>
                    <td><img style={{ marginTop: '-11px' }} width={'50px'} height={'50px'} src={product.thumbnail} alt="product image" /></td>

                    <td>

                      <div>
                        <button onClick={()=>handleDecrementQuantity(product)}>-</button>
                        <input value={product.quantity} type="text" placeholder='0' readOnly style={{ width: '30px', border: '1px solid black' }} />
                        <button onClick={()=>dispatch(incQuantity(product?.id))}>+</button>
                      </div>

                    </td>

                    <td>$ {product.totalPrice}</td>
                    <td>
                      <i onClick={()=>dispatch(removeCartItem(product?.id))} style={{ color: '#bb1b1b', cursor: 'pointer' }} className='fa-solid fa-trash'></i>
                    </td>
                  </tr>
                  ))}
                </tbody>
               
                
              </table>
              <div className="float-end mt-5">
                <button onClick={()=>dispatch(emptyCart())} style={{ background: '#bb1b1b', color: '#fefefe', borderRadius: '20px', marginRight: '20px', border: '1px solid', padding: '10px', fontSize: '13px' }}>Empty Cart</button>

                <Link to={'/'}><button style={{ background: '#64943a', borderRadius: '20px', color: '#fefefe', border: '1px solid', fontSize: '13px', padding: '10px' }}>Shop More</button></Link>

              </div>
            </div>
            <div className='col-lg-4 d-flex align-items-center '>
              <div style={{border:"1px solid #64943a",borderRadius:'10px',padding:'20px',width:'450px'}} className='shadow'>
                <p style={{fontSize:'13px'}}>Total Products: <b>{cartCount}</b></p>

                <p style={{fontSize:'13px'}}>Total Amount: <b>${cartTotal}</b></p>

                <div className='d-grid mt-4'>
                  <button onClick={handleCheckout} className='shadow' style={{ background: '#64943a', borderRadius: '20px', color: '#fefefe', border: '1px solid', fontSize: '13px', padding: '10px' }}>Proceed to Check Out<i className="fa-solid fa-check ms-2"></i></button>

                </div>

              </div>
            </div>
          </div>
        </div>
        :
        <div style={{height:'500px'}} className="w-100 d-flex justify-content-center align-items-center flex-column">
          
          <h4>Your Cart is empty!</h4>

        </div>
        }
      </div>
      <ToastContainer autoClose={2000}/>
    </>
  )
}

export default Cart