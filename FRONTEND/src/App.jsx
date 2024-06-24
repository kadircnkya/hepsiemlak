import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Signİn from './pages/Signİn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './Components/Header'
import CreateListing from './pages/CreateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import Footer from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import UpdateListing from './pages/UpdateListing'

const App = () => {
  return (
    <>
    
    <BrowserRouter>
    <Header/>
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/sign-in' element={<Signİn/>}/>
       <Route path='/sign-up' element={<SignUp/>}/>
       <Route path='/about' element={<About/>}/>
       <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing/>} />
          <Route path='/create-listing' element={<CreateListing/>}/> 
          </Route>
       <Route path='/listing/:listingId' element={<Listing/>}/>
       <Route path='/search' element={<Search/>}/>

    </Routes>
    </BrowserRouter>
     
    <Footer/>
     
    
     
    </>
  )
}

export default App
