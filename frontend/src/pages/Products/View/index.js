import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button";

import * as actions from "../../../redux-store/actions";
import * as localStorage from "../../../utils/localStorage";

import "./viewProduct.css";
export default function ViewProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const user = useSelector(({ user }) => user.profile);
    const cart = useSelector(({ cart }) => cart);

    const product = useSelector((state) => state.product.singleProduct);

    useEffect(() => {
        dispatch(actions.getProductById({ productId: params.productId }));
    }, []);
    if (!product._id) return "Invalid Product Id";

    const isAddedToCart = cart?.addedProductId && cart.addedProductId.includes(product._id);
    const onAddToCart = () => {
        if (isAddedToCart) return navigate(`/cart`);
        if (user._id) dispatch(actions.addToCart({ productId: product._id }));
        else {
            let carts = localStorage.getValue("navin-product", "json") || [];
            carts = [...carts, product];
            localStorage.setValue("navin-product", JSON.stringify(carts));
            dispatch(actions.setAddToCartData({ addedProductId: carts.map((x) => x._id), cart: carts }));
        }
    };
    return (
        <div className="view-product-container">
            <div className="content">
                <div className="p-images">
                    <div className="thumbnail">
                        <img src={product.images[0]} />
                    </div>
                    <div className="img-thumbnail-container">
                        {product.images.map((url, i) => (
                            <div className="img-thumbnail">
                                <div>
                                    <img src={url} key={`product-${i}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-description-container">
                    <div className="product-name">
                        <h2>{product.name}</h2>
                    </div>
                    <div className="product-desc">
                        <p>{product.description}</p>
                    </div>
                    <div className="product-price">INR {product.price}</div>
                    <div className="add-to-car-btn">
                        <Button onClick={onAddToCart}>{isAddedToCart ? "Go" : "Add"} To Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
