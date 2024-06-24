import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Image from '../assets/User.png'
import { current } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import Listing from '../../../api/models/listing.model'
const Profile = () => {
  const {currentUser}=useSelector(state=>state.user);
  const [showListingError,setshowListingsError]=useState(false);
  const [userListings, setUserListings] = useState([]);
  const handleShowListings = async () => {
    try {
      setshowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setshowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setshowListingsError(true);
    }
  };

  const handleListingDelete=async(listingId)=>{
    try {
      const res=await fetch(`/api/listing/delete/${listingId}`,{
        method :'DELETE',
      })
      const data=await res.json();
      if (data.success==false) {
        console.log(data.message)
        return;
      }
      setUserListings((prev)=>
        prev.filter((listing)=>listing._id !==listingId));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col '>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input type="text" placeholder='username' id='username'className='border p-3 rounded-lg mt-2' />
        <input type="email" placeholder='email' id='email'className='border p-3 rounded-lg mt-2' />
        <input type="password" placeholder='password' id='password'className='border p-3 rounded-lg mt-2' />
        
        <button className='bg-slate-700 text-white rounded-lg p-3 mt-2 o-3 uppercase hover:opacity-95 disabled:opacity-80 '>Update</button>
      
      <Link className='bg-green-700 text-white p-3 mt-2 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>
        Create Listing
      </Link>
      
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <button onClick={handleShowListings} className='text-green-700 w-full'>Show Listing</button>
       <p className='text-red-700 mt-5'>{showListingError ? 'Error showing listing' : ''}</p>
    
    
       {userListings && userListings.length >0 &&
          <div className='flex flex-col gap-4 '>
            <h1 className='text-center text-2xl mt-7 font-semibold'>Your Listings</h1>
          {userListings.map((listing)=>
                <div  key={listing.id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
                   <Link to={`/listing/${listing._id}`}>
                    <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-16 objcet-contain ' />
                   </Link>

                 <Link className='text-slate-700 font-semibold  hover:underline truncate flex-1 ' to={`/listing/${listing._id}`}>
                 <p>{listing.name}</p>
                 </Link>
                 <div className='flex flex-col items-center'>
                    <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
                    <Link to={`/update-listing/${listing._id}`}>
                    <button className='text-green-700 uppercase'>Edit</button>
                    </Link>
                 </div>
                </div>
          )}
          </div>
       }
    
    </div>
  )
}

export default Profile
