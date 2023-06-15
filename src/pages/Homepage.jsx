import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { Row, Col } from 'react-bootstrap';

function Homepage() {
    const [products,  setProducts] = useState([])

    useEffect(() => {
   	 const fetchProducts = async () => {
   		 const response = await fetch('https://fakestoreapi.com/products')
   		 const json = await response.json()
   		 setProducts(json)
   	 }

   	 fetchProducts()

    }, [])

  return (
    <>
   	 <Row xs={1} md={3} className='g-4 my-3'>
   		 {
       		 products.map(({ id, title, image, description, price }) => (
           		 <Col  key={id}>
               		 <ProductCard id={id} title={title} image={image} description={description} price={price} />
           		 </Col>
       		 ))
   		 }
   	 </Row>
    </>
  )
}

export default Homepage
