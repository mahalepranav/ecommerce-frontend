import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }


  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-center md:justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
        
        { loading ? (
            loadingList.map((product, index)=>{
            return(
                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md'>
                    <div className='bg-slate-200 h-52 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                    </div>
                    <div className='p-4 grid gap-3'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                        <p className='capitalize text-slate-500 p-1 py-2 animate-pulse rounded-full bg-slate-200'></p>
                        <div className='flex gap-3'>
                            <p className='text-green-600 font-medium p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                            <p className='text-slate-500 line-through p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                        </div>
                        <button className='text-sm text-white px-6 py-2 rounded-full animate-pulse bg-slate-200'></button>
                    </div>
                </div>
                ) 
            })
        ) : (
            data.map((product, index)=>{
            return(
                <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow-md' onClick={scrollTop}>
                    <div className='bg-slate-200 h-52 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' alt=''/>
                    </div>
                    <div className='p-4 grid gap-3'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                        <p className='capitalize text-slate-500'>{product?.category}</p>
                        <div className='flex gap-3'>
                            <p className='text-green-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                            <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price) }</p>
                        </div>
                        <button className='text-sm bg-purple-600 hover:bg-purple-700 text-white px-6 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                    </div>
                </Link>
                ) 
            })
            )
        }
    </div>
    )
}

export default VerticalCard;