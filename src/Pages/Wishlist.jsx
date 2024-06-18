import React from 'react'
import Header from '../Components/Header'
import { Row,Col,Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../REDUX/slices/wishlistSlice'
import { addToCart } from '../REDUX/slices/cartSlice'


function Wishlist() {
  const cart = useSelector(state=>state.cartReducer)
  const handleCart = (product)=>{
    const existingProduct=cart?.find(item=>item.id==product.id)
    if (existingProduct){
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      alert('products Added to cart')
    }else{
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      alert('Added to Cart')
    }
  }

  const dispatch=useDispatch()

  // we need wishlist store
  const wishlist = useSelector(state=>state.wishlistReducer)
  return (
    <>
    <Header/>
    <div style={{marginTop:'150px'}} className="container">
      
     { wishlist?.length>0? 
     
     <Row>
      { wishlist?.map(product=>(
        <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
      <Card className='shadow rounded' style={{width:'250px',height:'350px'}}>
      <Card.Img style={{height:'230px',width:'250px'}} variant="top" src={product?.thumbnail} />
      <Card.Body style={{textAlign:'center'}}>
        <Card.Title>{product?.title.slice(0,15)}...</Card.Title>
     <div className='d-flex justify-content-between'>
       <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className='btn'><i style={{color:'#bb1b1b'}} className='fa-solid fa-heart-circle-xmark'></i></button> 
       <button onClick={()=>handleCart(product)} className='btn'><i style={{color:'#64943a'}} className='fa-solid fa-cart-plus'></i></button> 
     </div>
        
      </Card.Body>
    </Card>
      </Col>))}
    </Row>
    :
<div style={{height:'500px'}} className="w-100 d-flex justify-content-center align-items-center flex-column mt-5">
        
        <h4>Your Wish LIst is empty!</h4>

      </div>
    }


    </div>
    
    
    </>
  )
}

export default Wishlist