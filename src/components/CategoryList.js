import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [ categoryProduct, setCategoryProduct ] = useState([])
    const [ loading, setLoading ] = useState(false)
    
    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto px-10 py-6'>
        <div className='flex items-center gap-10 justify-between overflow-scroll scrollbar-none'>
        {
            loading ? (

                categoryLoading.map((el,index)=>{
                    return(
                        <div className='h-16 w-16 md:h-28 md:w-28 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>

                        </div>
                    )
                })
            ) : 
            (                
                categoryProduct.map((product, index)=>{
                    return(
                        <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
                            <div className='flex items-center justify-center flex-col'>
                                <div className='w-16 h-16 md:w-28 md:h-28 rounded-full overflow-hidden p-2 bg-slate-200'>
                                    <img src={product?.productImage[0]} 
                                        alt={product?.category} 
                                        className='h-full object-scale-down mix-blend-multiply hover:scale-75 transition-all'/>
                                </div>
                                <p className='text-sm md:text-base capitalize'>{product?.category}</p>
                            </div>
                        </Link>
                    )
                })
            )
        }
        </div>
    </div>
  )
}

export default CategoryList;