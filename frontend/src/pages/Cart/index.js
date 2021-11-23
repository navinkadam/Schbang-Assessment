import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { removeToCart, setAddToCartData, placedOrder } from "../../redux-store/actions/";
import * as localStorage from "../../utils/localStorage";

import { Link } from "react-router-dom";

// import { Field, Form, Formik } from "formik";
// import Input from "../../components/Input";
// import { Checkout } from "../../constant/FormSchema";

import Button from "../../components/Button";

import "./cart.css";
export default function Cart(params) {
    const cartList = useSelector(({ cart }) => cart.carts || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalItem = cartList?.length || 0;
    const totalPrice = cartList?.reduce((sum, prod) => sum + prod.price, 0) || 0;

    const user = useSelector(({ user }) => user.profile);

    const onGoToCheckout = () => {
        if (!user._id) return navigate("/login");

        const payload = { productId: cartList.map((x) => x._id) };
        dispatch(placedOrder(payload));
    };

    return (
        <div className="cart-container">
            <div className="headLine">
                <h4>Your cart is {totalItem ? `${totalItem} item` : "empty"}</h4>
                {!totalItem && (
                    <p>
                        Check your Saved for later items below or{" "}
                        <Link to="/" className="link">
                            continue shopping.
                        </Link>
                    </p>
                )}
                {totalItem ? (
                    <div className="cart-content">
                        <div className="cart-list-container">
                            {cartList?.map((prod) => (
                                <CartItem productData={prod} key={`cart-${prod._id}`} />
                            ))}
                        </div>
                        <div className="cart-checkout-container">
                            <h5 className="sub-total">
                                Subtotal ({totalItem} Item):<span>INR {totalPrice}</span>
                            </h5>
                            <div className="checkout-form">
                                <Button onClick={onGoToCheckout}>Go to buy</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <React.Fragment />
                )}
            </div>
        </div>
    );
}

function CartItem({ productData }) {
    const dispatch = useDispatch();

    const { name, description, images, price, _id, cartId } = productData;

    const cartList = useSelector(({ cart }) => cart.carts);
    const user = useSelector(({ user }) => user.profile);

    const onCartRemove = () => {
        if (user._id) dispatch(removeToCart({ cartId: cartId }));
        else {
            let updatedCarts = cartList.filter((cart) => cart._id !== _id);
            localStorage.setValue("navin-product", JSON.stringify(updatedCarts));
            dispatch(setAddToCartData({ addedProductId: updatedCarts.map((x) => x._id), cart: updatedCarts }));
        }
    };
    return (
        <div className="cart-item-container">
            <div className="cart-img">
                <img src={images[0]} />
            </div>
            <div className="cart-desc">
                <div>
                    <h2 className="product-name">{name}</h2>
                    <p>{description}</p>
                    <div className="price">INR {price}</div>
                </div>
                <div className="delete-btn">
                    <Button variant="inline" onClick={onCartRemove}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

{
    /* <Formik
        enableReinitialize={true}
        initialValues={{ name: "", email: "" }}
        validationSchema={Checkout}
        onSubmit={(data) => {
            console.log(data);
        }}
    >
        {({ isValid }) => (
            <Form>
                <Field name="name" label="Name" type="text" component={Input} />
                <Field name="email" label="E-mail" type="email" component={Input} />

                
            </Form>
        )}
    </Formik> */
}
