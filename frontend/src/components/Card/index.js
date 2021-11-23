import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./card.css";
import { addToCart, setAddToCartData } from "../../redux-store/actions/";
import Button from "../Button";
import * as localStorage from "../../utils/localStorage";

function Card({ productData }) {
    const { name, description, images, price, _id } = productData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(({ user }) => user.profile);
    const cart = useSelector(({ cart }) => cart);

    const isAddedToCart = cart?.addedProductId && cart.addedProductId.includes(_id);

    const desc = description.length > 85 ? `${description.substring(0, 82)}...` : description;
    const onClick = () => {
        navigate(`/product/${_id}`);
    };

    const onAddToCart = () => {
        if (isAddedToCart) return navigate(`/cart`);
        if (user._id) dispatch(addToCart({ productId: _id }));
        else {
            let carts = localStorage.getValue("navin-product", "json") || [];
            carts = [...carts, productData];
            localStorage.setValue("navin-product", JSON.stringify(carts));
            dispatch(setAddToCartData({ addedProductId: carts.map((x) => x._id), carts: carts }));
        }
    };
    return (
        <div className="card-item-container">
            <div className="content" onClick={onClick}>
                <h2 className="header">
                    <div className="product-name">{name}</div>
                </h2>
                <div className="thumbnail">
                    <img src={images[0]} alt={name} />
                </div>
                <div className="description">{desc}</div>
                <div className="price">INR {price}</div>
            </div>
            <Button onClick={onAddToCart}>{isAddedToCart ? "GO" : "Add"} To Cart</Button>
        </div>
    );
}

export default React.memo(Card);
