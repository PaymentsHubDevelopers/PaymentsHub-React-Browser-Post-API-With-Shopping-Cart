import React, { useState, useEffect, useContext} from 'react'
import { CartContext } from '../context/CartContext'

function PaymentResults() {
  const [paymentResult, setPaymentResult] = useState(null)

  useEffect(() => {
    const paymentResults = () => fetch
('https://payments-hub-node-api.onrender.com/getPaymentResult')
.then(res => res.json())
.then(({ data }) => {
  let dataObj = JSON.parse('{"' + decodeURI(data.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
  setPaymentResult(dataObj)
})
.catch(error => console.log(error))


paymentResults()

}, [])

if(!paymentResult) return <p>Loading...</p>

const { setCartItems } = useContext(CartContext)

if(paymentResult.AUTH_RESP == '00'){
localStorage.removeItem('TAC')
localStorage.removeItem('myCart')
localStorage.removeItem('totalCost')
setCartItems([])
}
return (
<div className='w-50 mx-auto border'>
{
paymentResult.AUTH_RESP == '00' ?

<div className='text-center p-4'>
<svg xmlns="http://www.w3.org/2000/svg" width='70' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 h-2">
<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
</svg>

<p className='fw-bold'>Payment succeeded</p>

<p>Amount paid: ${paymentResult.AUTH_AMOUNT_REQUESTED}</p>
<p>Account No: {paymentResult.AUTH_MASKED_ACCOUNT_NBR}</p>
</div> :

<div className='text-center p-4'>
<svg xmlns="http://www.w3.org/2000/svg" width='70' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
</svg>

<p className='fw-bold'>Payment failed</p>
<p>Reason: {paymentResult.AUTH_RESP_TEXT}</p>
</div>
}
</div>
)
}

export default PaymentResults
