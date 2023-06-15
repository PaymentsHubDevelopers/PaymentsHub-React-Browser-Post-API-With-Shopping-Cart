import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Product({ id, title, image, price }) {
  return (
    <Card>
		 <Card.Img variant='top' src={image} alt={title} style={{width: '20rem', height: '20rem', objectFit: 'contain', margin: 'auto', padding: '.5rem'}} />  
		 <Card.Body>
   		 <Card.Title>{title}</Card.Title>
   		 <Card.Text className='mt-4'>$ {price}</Card.Text>
   		 <Link to={`/product/${id}`}>
       		 <Button>View Details</Button>
   		 </Link>
   	 </Card.Body>
    </Card>
  )
}

export default Product
