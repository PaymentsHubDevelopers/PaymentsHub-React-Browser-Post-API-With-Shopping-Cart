import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
import { useState } from 'react';

function Payment() {
	const [accountNo, setAccountNo] = useState('4000000000000002')
	const [expiry, setExpiry] = useState('2512')
	const [cvv, setCvv] = useState('123')

	const TAC = JSON.parse(localStorage.getItem('TAC'))
	const AMOUNT = JSON.parse(localStorage.getItem('totalCost')).toFixed(2)

  return (
	<div className='mt-4'>
    	<h3 className='text-center'>Card Payment</h3>
    	<Form  action="https://services.epxuap.com/browserpost/" method="post">
        	<Form.Group className="mb-3">
            	<Form.Label>Account Number</Form.Label>
            	<Form.Control
                	type="number"
                	name='ACCOUNT_NBR'
                	value={accountNo}
                	onChange={e => setAccountNo(e.target.value)}
            	/>
        	</Form.Group>

        	<Row>
            	<Col>
                	<Form.Group className="mb-3">
                    	<Form.Label>Expiry Date</Form.Label>
                    	<Form.Control
                        	type="text"
                        	name="EXP_DATE"
                        	placeholder='YYMM'
                        	value={expiry}
                        	onChange={e => setExpiry(e.target.value)}
                    	/>
                	</Form.Group>
            	</Col>

            	<Col>
                	<Form.Group className="mb-3">
                    	<Form.Label>CVV</Form.Label>
                    	<Form.Control
                        	type="text"
                        	name='CVV2'
                        	placeholder="123"
                        	value={cvv}
                        	onChange={e => setCvv(e.target.value)}
                    	/>
                	</Form.Group>
            	</Col>
        	</Row>

        	<Col className='d-none'>
            	<Form.Control type='text' name='TRAN_CODE' defaultValue={import.meta.env.VITE_TRAN_CODE} />
            	<Form.Control type='text' name='CUST_NBR' defaultValue={import.meta.env.VITE_CUST_NBR} />
            	<Form.Control type='text' name='MERCH_NBR' defaultValue={import.meta.env.VITE_MERCH_NBR} />
            	<Form.Control type='text' name='DBA_NBR' defaultValue={import.meta.env.VITE_DBA_NBR} />
            	<Form.Control type='text' name='TERMINAL_NBR' defaultValue={import.meta.env.VITE_TERMINAL_NBR} />
            	<Form.Control type='text' name='INDUSTRY_TYPE' defaultValue={import.meta.env.VITE_INDUSTRY_TYPE} />
            	<Form.Control type='text' name='TAC' defaultValue={TAC} />
            	<Form.Control type='text' name='AMOUNT' defaultValue={AMOUNT} />
        	</Col>
        	<Button variant="success" type="submit">
            	Submit
        	</Button>
    	</Form>
	</div>
  )
}

export default Payment
