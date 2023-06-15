import React, { useContext, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { CartContext } from '../context/CartContext';

function MyCart() {
    const { items, addOneItemToCart, removeOneItemFromCart, deleteItemFromCart, getTotalCost } = useContext(CartContext)

  return (
    <Table>
   	 <thead>
   		 <tr>
   		 <th>#</th>
   		 <th>Thumbnail</th>
   		 <th style={{width: '12rem'}}>Item</th>
   		 <th>Quantity</th>
   		 <th>Unit Price</th>
   		 <th>Total</th>
   		 </tr>
   	 </thead>
   	 <tbody>
   		 {
       		 items.map((item, id) => (
           		 <tr key={id}>
               		 <td>{id + 1}</td>
               		 <td><img src={item.imageUrl} alt={item.title} style={{width: '40px', height: 'auto'}} /></td>
               		 <td>{item.title}</td>
               		 <td className='d-flex justify-content-between'>
                   		 <div className='d-flex flex-column'>
                       		 <Button variant='info' onClick={() => addOneItemToCart(item.id)} className='px-1 text-center align-middle'>+</Button>
                       		 <span className='p-2 bg-light'>{item.quantity}</span>
                       		 <Button variant='info' onClick={() => removeOneItemFromCart(item.id)} className='px-1 text-center align-middle'>-</Button>
                   		 </div>
                   		 <Button variant='danger' onClick={() => deleteItemFromCart(item.id)}>X</Button>
               		 </td>
               		 <td>$ {item.unitPrice}</td>
               		 <td>$ {(item.quantity * item.unitPrice).toFixed(2)}</td>
           		 </tr>
       		 ))
   		 }
   		 <tr>
       		 <td colSpan='5' className="text-end">Total:</td>
       		 <td>$ {getTotalCost().toFixed(2)}</td>
   		 </tr>
   	 </tbody>
    </Table>
  )
}

export default MyCart