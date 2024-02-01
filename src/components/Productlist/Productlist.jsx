import React from "react";
import './Productlist.css'
import ProductItem from "../ProductItem/ProductItem";

const ProductList = () => {
    return(
        <div className={list}>
            {products.map(item=> (
                <ProductItem
                product={item}
                onAdd={onAdd}
                className={'item'}
                />
            ))}
            
        </div>
    )
}

export default ProductList;