import React, { useEffect, useState } from 'react';
import image1 from '../assets/banner/banner3.jpeg';
import image2 from '../assets/banner/banner2.jpeg';
import image3 from '../assets/banner/banner5.jpeg';
import image4 from '../assets/banner/banner6.png';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [ currentImage, setCurrentImage ] = useState(0)

  const desktopImage = [ image1, image2, image3, image4 ]

  const nextImage = () => {
    if(desktopImage.length - 1 > currentImage){
      setCurrentImage(preve => preve + 1)
    }
  }

  const preveImage = () => {
    if(currentImage !== 0){
      setCurrentImage(preve => preve - 1)
    }
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      if(desktopImage.length - 1 > currentImage){
        nextImage()
      }else{
        setCurrentImage(0)
      }
    },3000)

    return ()=> clearInterval(interval)
  },[currentImage])

  return (
    <div className='container mx-auto px-10 rounded'>
      <div className='h-40 md:h-72 w-full bg-slate-200 relative'>
        
        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-2xl'>
            <button onClick={preveImage} className='bg-white rounded-full shadow-md m-1'><FaAngleLeft/></button>
            <button onClick={nextImage} className='bg-white shadow-md rounded-full m-1'><FaAngleRight/></button>
          </div>
        </div>
        
        {/**desktop and tablet view */}
        <div className='flex h-full w-full overflow-hidden'>
          {
            desktopImage.map((imageUrl,index)=>{
              return(
                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{transform: `translateX(-${currentImage * 100}%)`}}>
                  <img src={imageUrl} className='w-full h-full' alt='' />
                </div>  
              )
            })
          }
        </div>

        {/**mobile view */}
        {/*<div className='flex h-full w-full overflow-hidden md:hidden'>
          {
            mobileImage.map((imageUrl,index)=>{
              return(
                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{transform: `translateX(-${currentImage * 100}%)`}}>
                  <img src={imageUrl} className='w-full h-full object-cover' alt='' />
                </div>  
              )
            })
          }
        </div>*/}

      </div>
    </div>
  )
}

export default BannerProduct;