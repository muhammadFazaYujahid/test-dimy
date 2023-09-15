import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

const Product = ({ type, existedData, productAction, noDelete }) => {
    const [Qty, setQty] = useState(1);
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [Total, setTotal] = useState(0);
    const [qtyerrorClass, setQtyerrorClass] = useState('');
    const [errorField, setErrorField] = useState('');

    const checkNumber = (numberValue) => {
        if (numberValue < 1) {
            setErrorField('qty');
            return setQtyerrorClass('outline-red-500 border-red-500')
        }
        setQty(numberValue);
        setErrorField('');
        setQtyerrorClass('');
        return true;
    }

    const handlePriceChange = (e) => {
        const inputValue = e.target.value;

        //check if the input are number
        if (/^[0-9]*$/.test(inputValue)) {
            setPrice(inputValue);
            setTotal(inputValue * Qty);
        }

        return;
    }

    const handleQtyChange = (e) => {
        const inputValue = e.target.value;
        checkNumber(inputValue);

        return setTotal(inputValue * Price);
    }

    const addProduct = () => {
        const formData = {
            name: Name,
            price: Price,
            qty: Qty,
            total: Total
        }
        const getProduct = JSON.parse(localStorage.getItem('products')) || [];

        //generate an ID based on products length;
        let productId = getProduct.length + 1;

        //check if product already exist, ID will generated based on latest productId data at the localstorage
        if (getProduct.length > 0) {
            const lastData = getProduct.reduce((prev, current) => {
                return prev.productId > current.productId ? prev : current;
            });
            productId = lastData.productId + 1;

        }
        getProduct.push({
            productId,
            ...formData
        });
        localStorage.setItem('products', JSON.stringify(getProduct));

        //send callback function to refresh the useState at App.jsx
        productAction();

        //reset field after save
        setName('');
        setPrice('');
        setQty(1);
        setTotal(0);
    }

    const deleteProduct = (productId) => {
        const getProduct = JSON.parse(localStorage.getItem('products')) || [];
        const newRawData = getProduct.filter(product => product.productId !== productId);
        localStorage.setItem('products', JSON.stringify(newRawData));

        //send callback function to refresh the useState at App.jsx
        productAction();
    }

    return (<>
        <div className="grid grid-cols-1 md:grid-cols-5 mb-5">
            <div>
                <Input label={"Product Name"} readonly={(type == 'get') ? true : false} onchange={(e) => setName(e.target.value)} type={"text"} value={(type == 'add') ? Name : existedData.name} />
            </div>
            <div>
                <Input label={"Product Price"} readonly={(type == 'get') ? true : false} type={"text"} onchange={(e) => handlePriceChange(e)} value={(type == 'add') ? Price : existedData.price} />
            </div>
            <div>
                <Input label={"Qty"} readonly={(type == 'get') ? true : false} type={"number"} onchange={(e) => handleQtyChange(e)} errorClass={qtyerrorClass} value={(type == 'add') ? Qty : existedData.qty} />
                {(errorField == 'qty') ? <small className="text-red-500">Minimal Qty = 1</small> : <></>}
            </div>
            <div>
                <Input label={"Total"} type={"text"} readonly={true} value={(type == 'add') ? Total : existedData.total} />
            </div>

            {/* set if button new clicked, editable form will show up with a save button */}
            {(type == 'add') ?
                <div className="min-h-full mt-3 pt-6 items-center justify-center">
                    <Button additionalClass={"bg-gray-500 text-white border-none hover:bg-slate-600 hover:text-gray-200 px-10"} buttonText={"Save"} onclick={() => addProduct()} />
                </div>
                :
                <div className="min-h-full mt-3 pt-6 items-center justify-center">

                    {/* set button delete only show up if data rows is more than 1 */}
                    {(!noDelete) ?
                        <Button additionalClass={"bg-red-500 text-white border-none hover:bg-red-600 hover:text-gray-200 px-10"} buttonText={"Delete"} onclick={() => deleteProduct(existedData.productId)} />
                        : <></>}
                </div>}

        </div>
    </>)
};

export default Product;