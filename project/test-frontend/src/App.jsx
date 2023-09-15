import { useEffect, useState } from 'react'
import './App.css'
import Button from './components/Button'
import Product from './components/NewProduct'
import Input from './components/Input';

function App() {
  const [addProduct, setAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const refreshData = () => {
    const rawProductData = JSON.parse(localStorage.getItem('products'));
    const getTotal = rawProductData.map((product => product.total));
    const sum = getTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setGrandTotal(sum);
    setProducts(rawProductData);
  }

  useEffect(() => {
    refreshData();
  }, [])

  const handleAction = () => {
    refreshData();
  }


  const getProduct = JSON.parse(localStorage.getItem('products')) || [];

  //generate product id
  let productId = 1;

  //check if product already exist, ID will generated based on latest productId data at the localstorage
  if (getProduct.length > 0) {
    const lastData = getProduct.reduce((prev, current) => {
      return prev.productId > current.productId ? prev : current;
    });
    productId = lastData.productId + 1;

  }

  //generate dummy product data
  const GenerateProduct = () => {
    const price = generateRandomNumber(1000, 10000);
    const qty = generateRandomNumber(1, 10);
    const formData = {
      name: 'Product-' + productId,
      price: price,
      qty: qty,
      total: price * qty
    }
    getProduct.push({
      productId,
      ...formData
    });
    localStorage.setItem('products', JSON.stringify(getProduct));

    refreshData();
  }

  //random number generator
  const generateRandomNumber = (min, max) => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  }

  return (
    <>
      <div className='grid grid-cols-1'>
        {(!addProduct) ? <div className='flex'>
          <Button additionalClass={"bg-gray-500 text-white border-none hover:bg-slate-600 hover:text-gray-200"} buttonText={"New"} onclick={() => setAddProduct(true)} />


          <Button additionalClass={"bg-green-500 text-white border-none hover:bg-green-600 hover:text-gray-200 ml-3"} buttonText={"Generate"} onclick={() => GenerateProduct()} />
        </div>
          :
          <Button additionalClass={"bg-blue-500 text-white border-none hover:bg-blue-600 hover:text-gray-200"} buttonText={"Cancel"} onclick={() => setAddProduct(false)} />
        }
        {(addProduct) ? <Product type={'add'} productAction={handleAction} /> : <></>}

        {/* check if the data is only one, the noDelete status will change to true so the delete button will not show up */}
        {
          (products.length == 1) ? products.map(product => (
            <Product type={'get'} key={product.productId} existedData={product} productAction={handleAction} noDelete={true} />

          ))

            :
            products.map(product => (
              <Product type={'get'} key={product.productId} existedData={product} productAction={handleAction} noDelete={false} />

            ))
        }

        {/* {products.map(product => (
          <Product type={'get'} key={product.productId} existedData={product} productAction={handleAction} />

        ))} */}
        <div className='text-right mr-56'>
          <h6 className='text-right mr-36 font-semibold'>Grand Total</h6>
          <Input type={"text"} readonly={true} value={grandTotal} />

        </div>
      </div>
    </>
  )
}

export default App
