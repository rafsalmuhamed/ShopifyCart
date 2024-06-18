

import './App.css'
import Footer from './Components/Footer'

import Home from './Pages/Home'
import {Navigate, Route, Routes} from 'react-router-dom'
import View from './Pages/View'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'



function App() {
  

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/view/:id' element={<View/>}/>
        
        {/* to avoid page not found,if a user choose unknown path it will return to home */}
        <Route path='/*' element={<Navigate to={'/'}/>}/>

      </Routes>

      <Footer/>
    </>
  )
}

export default App
