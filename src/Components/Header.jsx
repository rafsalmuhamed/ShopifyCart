import React from 'react'
import { Navbar, Container ,Badge} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../REDUX/slices/productSlice'

function Header({insideHome}) {
  // for getting badge count
  const cartCount = useSelector(state=>state.cartReducer).length
  const wishlistCount = useSelector(state=>state.wishlistReducer).length

const dispatch= useDispatch()
  return (
    <>
      <Navbar style={{background:'#fefefe',zIndex:'10'}} className='position-fixed top-0 w-100'  >
        <Container >
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Navbar.Brand >
              <img style={{ width: '180px', height: '45px' }} src="https://freelogopng.com/images/all_img/1655830761shopify-logo-png.png" alt="Logo" />{''}

            </Navbar.Brand>
          </Link>

          {insideHome &&
            <input onChange={(e)=>dispatch(searchProduct(e.target.value.toLowerCase()))}  type="tex" style={{ width: '500px', height: '40px', border: '1px solid black', borderRadius: '20px', padding: '10px' }} className='form-control mt-3' placeholder='Search' />}


          <div style={{ width: '300px' }} className='d-flex justify-content-between mt-3'>
            <Link style={{textDecoration:'none'}} to={'/wishlist'}><a style={{ textDecoration: 'none', fontSize: '13px' }} href="">  <Badge bg="secondary">{wishlistCount}</Badge>  Wish List <i class="fa-regular fa-heart"></i></a>
            </Link>

            <Link style={{ textDecoration: 'none' }} to={'/cart'}> <a style={{ textDecoration: 'none', fontSize: '13px' }} href=""> <Badge bg="secondary">{cartCount}</Badge>Cart <i class="fa-solid fa-cart-shopping"></i></a>
            </Link>
          </div>

        </Container>
      </Navbar>
    </>
  )
}

export default Header