import React, { useEffect, useState } from 'react'
import ProductDetail from '../components/Products/ProductDetail'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../config/axiosInstance'

const Product = () => {

  const [product, setProduct] = useState([])

  const { id } = useParams()

  const getProduct = async () => {
    try {
      const resp = await axiosInstance.get(`/product/${id}`)
      setProduct(resp.data.product)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])


  return (
    <div className='mb-4'>
      {
        <>
          <ProductDetail product={product} />
        </>
      }
    </div>
  )
}

export default Product