import React, { useEffect, useState } from 'react'
import ProductDetail from '../components/Products/ProductDetail'
import { products } from '../helpers/data'
import { useParams } from 'react-router-dom'

const Product = () => {
  const [user, setUser] = useState([
    {
      "_id": "6598bf27e85eb36a99f7cd26",
      "name": "Lorenzo Eduardo Albornoz Barrera",
      "email": "LorenzoAlbornoz",
      "password": "",
      "role": "user",
      "__v": 0,
      "cart": "659df9a9dc474b37a0f8093a"
    }
  ])

  const [product, setProduct] = useState({
    data: [],
    loading: true
  })

  const { id } = useParams()
  
  const getProduct = () => {
  const product = products.filter(product => product._id === id);
    setProduct({
      data: product,
      loading: false
    })
  }

  useEffect(() => {
    getProduct()
  }, [])
  return (
    <div className='mb-4'>
      {
        user.length > 0 ?
          <>
            <ProductDetail product={product} />
          </>
          :
          <div className="alert alert-danger w-100 text-center" role="alert">
            Para ver esta informacion debe iniciar sesión
          </div>
      }
    </div>
  )
}

export default Product