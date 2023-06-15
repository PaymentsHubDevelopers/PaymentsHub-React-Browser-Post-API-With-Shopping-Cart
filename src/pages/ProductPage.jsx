import React, { useEffect, useState, useContext } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext';

function ProductPage() {
    const { id } = useParams()

	const { loading, addOneItemToCart } = useContext(CartContext)

    const [product,  setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
     	   const response = await fetch(`https://fakestoreapi.com/products/${id}`)
     	   const json = await response.json()
     	   setProduct(json)
        }

        fetchProduct()

    }, [])
   
  return (
    product &&
    <Container className='mt-4'>
  	  {
  	  loading &&

  	  <Modal show={loading}>
  			  <Modal.Body className='d-flex flex-column justify-content-center align-items-center'>
  				  <p>Loading...</p>
  				  <svg xmlns="http://www.w3.org/2000/svg" width='70' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  					  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  				  </svg>
  			  </Modal.Body>
  	  </Modal>
	}
        <Row>
     	   <Col>
     		   <img src={product.image} style={{maxWidth: '400px'}} />
     	   </Col>

     	   <Col className='py-5 d-flex flex-column justify-content-around'>
     		   <h3>{product.title}</h3>
     		   <p>{product.description}</p>
     		   <h5>$ {(product.price).toFixed(2)}</h5>
     		   <Button variant='success' onClick={() => addOneItemToCart(id, product.price, product.title, product.image)} className='w-25'>Add to Cart</Button>
     	   </Col>
        </Row>
    </Container>
  )
}

export default ProductPage