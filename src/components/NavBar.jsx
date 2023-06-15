import React, { useState } from 'react'
import CartModal from './CartModal'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className='pt-4 pb-2 mx-auto bg-white'>
      <h1>Payments Hub Developers</h1>
      <Link to='/'><h3>Browser Post API Sample Store</h3></Link>
      <CartModal show={show} handleClose={handleClose} handleShow={handleShow} />
    </Container>
  ) 
}

export default NavBar
