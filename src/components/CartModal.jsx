import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import MyCart from './MyCart'
import { CartContext } from '../context/CartContext';
import { useNavigate } from "react-router-dom";

function CartModal({ show, handleClose, handleShow }) {
    const { getNumberOfCartItems, getTotalCost, setLoading, items } = useContext(CartContext)

    const navigate = useNavigate()

    const getTAC = () => {
      setLoading(true)
        let totalCost = getTotalCost().toFixed(2)
        return fetch('https://payments-hub-node-api.onrender.com/getTAC', {
     	   method: 'post',
     	   body: JSON.stringify({
     		   amount: totalCost
     	   }),
     	   headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(json => {
     	   // check if TAC exists in json and redirect to the payments page
     	   if(json.data){
     		   localStorage.setItem('TAC', JSON.stringify(json.data))
     		   localStorage.setItem('totalCost', totalCost)
  		 setLoading(false)
     		   navigate('/payment')
     	   }else{
 		 setLoading(false)
     		   alert('An error occurred. Please try again')
     	   }
        })
        .catch(error => {
      setLoading(false)
      console.log(error)
    })
    }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
   	 My Cart ({getNumberOfCartItems() === 1 ? `${getNumberOfCartItems()} item` : `${getNumberOfCartItems()} items`})
      </Button>

      <Modal show={show} onHide={handleClose} size='lg'>
   	 <Modal.Header closeButton>
 		 <Modal.Title>My Cart</Modal.Title>
   	 </Modal.Header>
   	 <Modal.Body>
   		 {
     		 items.length < 1 ?
     		 <p>No items in your cart</p> :
     		 <MyCart />
   		 }
   	 </Modal.Body>

   	 <Modal.Footer className='d-flex justify-content-around'>
 		 <Button variant="primary" onClick={() => {
   		 handleClose()
   		 navigate('/')
 		 }}>
   		 Continue Shopping
 		 </Button>
 		 <Button
   		 disabled={items.length<1}
   		 variant="success"
   		 onClick={() => {
     		 handleClose()
     		 getTAC()
   		 }}
 		 >
   		 Checkout
 		 </Button>
   	 </Modal.Footer>
      </Modal>
    </>
  )
}

export default CartModal