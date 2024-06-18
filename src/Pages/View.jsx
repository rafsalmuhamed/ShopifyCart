import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItem } from '../REDUX/slices/wishlistSlice'
import { addToCart, emptyCart } from '../REDUX/slices/cartSlice'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function View() {
  const cart = useSelector(state=>state.cartReducer)
  const wishlist = useSelector(state=>state.wishlistReducer)
  const dispatch=useDispatch()
  const [product,setProduct]=useState({})
  const {id}=useParams()

  useEffect(()=>{
    if(sessionStorage.getItem("allProducts")){
      const allProducts=JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts.find(item=>item.id==id))
      
    }
  },[])
  // to handle cart
  const handleCart = (product)=>{
    const existingProduct=cart?.find(item=>item.id==product.id)
    if (existingProduct){
      dispatch(addToCart(product))
      toast.success('products Added to cart')
    }else{
      dispatch(addToCart(product))
      toast.success('Added to Cart')
    }
  }

  const handleWishlist=(product)=>{
    if(wishlist?.includes(product)){
      toast.info("Item already in your Wishlist")
    }else{
      dispatch(addWishlistItem(product))
    }
  }

  
  return (
    <>
    <Header/>

    <div style={{marginTop:'150px'}} className='container'>

      <div className="row mb-5 align-items-center">
        <div className="col-lg-6">
          <img width={'400px'} height={'400px'} className='image-fluid' src={product?.thumbnail} alt="" />

        </div>
        <div className="col-lg-6">
          <h5>PID: {product?.id}</h5>
          <h2> {product?.title}</h2>
          <h4>$ {product?.price}</h4>
          <p style={{textAlign:'justify'}}><b>Description</b>: {product?.description}</p>
          <div style={{gap:'20px'}} className="d-flex justify-content-left">
          <button onClick={()=>handleWishlist(product)} style={{ fontSize: '13px',padding:'10px',background:'#64943e',border:'2px solid #1c3802',color:'#fefefe',borderRadius:'20px' }} href="">Add to Wish List <i class="fa-regular fa-heart ms-2"></i></button>

          <button onClick={()=>handleCart(product)} style={{ fontSize: '13px',padding:'10px',background:'#fefefe',border:'2px solid #64943a',color:'#1c3802',borderRadius:'20px' }} href="">Add to Cart<i style={{color:'#64943a'}} class="fa-solid fa-cart-plus ms-2"></i></button>
          </div>

        </div>
      </div>
    </div>
    <ToastContainer autoClose={2000}/>
    </>
  )
}

export default View