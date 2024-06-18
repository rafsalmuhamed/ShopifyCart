import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import {Row, Col,Card, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../REDUX/slices/productSlice'



function Home() {
  const dispatch = useDispatch()
  const {allProducts,error,loading}=useSelector(state=>state.productReducer)
  
  const [currentPage,setCurrentPage] = useState(1)
  const productsPerPage = 8
  const totalPages = Math.ceil(allProducts?.length/productsPerPage)
  const lastProductIndex = currentPage * productsPerPage
  const firstProductIndex = lastProductIndex - productsPerPage
  const visibleCards = allProducts?.slice()

  useEffect(()=>{
    dispatch(fetchProducts())
  },[]);

  const navigateToNext = ()=>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  const navigateToPrev = ()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)                                    
    }
  }

  return (
  
  <>
  <Header insideHome={true}/>

  <div className='container' style={{marginTop:'150px'}}>

    {loading?<div className='mt-5 text-center'> <Spinner animation="border" style={{color:'#64943a',marginLeft:'10px',fontSize:'25px'}} /></div>
    :
    <Row>
      {allProducts?.length>0?
      visibleCards?.map((product)=>(
        
        <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
      <Card className='shadow rounded' style={{width:'250px',height:'350px'}}>
      <Card.Img style={{height:'230px',width:'250px'}} variant="top" src={product?.thumbnail} />
      <Link style={{textDecoration:'none'}} to={`/view/${product?.id}`} variant='primary'>
        <Card.Body style={{textAlign:'center'}}>
          <Card.Title>{product?.title.slice(0,15)}..</Card.Title>
          <div style={{fontSize:'12px'}} className='mt-5 text-center'><Link to={`/view/${product?.id}`} variant='primary'>More Details</Link></div>
          
        </Card.Body>
      </Link>
    </Card>
      </Col>))
      :
      <div style={{height:'350px',marginTop:'200px'}} className='text-center'>
        No products Found! <i class="fa-regular fa-face-sad-tear"></i>
      </div>
      }
    </Row>}

    <div className='d-flex justify-content-center align-items-center mt-5 mb-5'>
      <span onClick={navigateToPrev}  style={{cursor:'pointer'}}> <i className='fa-solid fa-angle-left me-5'></i> </span>
      <span className='fw-bolder'>{currentPage} of {totalPages}</span>
      <span onClick={navigateToNext} style={{cursor:'pointer'}}> <i className='fa-solid fa-angle-right ms-5'></i> </span>
    </div>
  </div>
  </>
    
  );
}

export default Home