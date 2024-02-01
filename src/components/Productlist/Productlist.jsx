import React, { useEffect, useCallback,useState } from "react";
import './Productlist.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
    { id: '1', title: 'Angry vape', price: 15, description: 'Арбузная жвачка' },
    { id: '2', title: 'Angry vape', price: 15, description: 'Арбуз' },
    { id: '3', title: 'Angry vape', price: 15, description: 'Йогурт с киви' },
    { id: '4', title: 'Angry vape', price: 15, description: 'Синяя малина' },
    { id: '5', title: 'Angry vape', price: 15, description: 'Ягодные леденцы' },
    { id: '6', title: 'Angry vape', price: 15, description: 'Клубничный джем' },
    { id: '7', title: 'Angry vape', price: 15, description: 'Вишня лимон' },
    { id: '8', title: 'Angry vape', price: 15, description: 'Виноградная газировка' },
    { id: '9', title: 'TOYZ', price: 15, description: 'Orange, Lemon & Mint' },
    { id: '10', title: 'TOYZ', price: 15, description: 'Orange ice' }
];

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const { tg } = useTelegram();

    const onSendData = useCallback(()=>{
        const data = {
          products: addedItems,
          totalPrice : getTotalPrice(addedItems),
        }
        fetch('http://localhost:8000'),{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    }, [])

    useEffect(()=>{
       tg.onEvent('mainButtonClicked',onSendData)
       return() => {
           tg.WebApp.offEvent('mainButtonClicked',onSendData)
       }
    },[])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if (newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            });
        }
    };

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => acc + item.price, 0);
    };

    return (
        <div className="list">
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
