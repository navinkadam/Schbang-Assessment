import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import Card from "../../components/Card";
import * as actions from "../../redux-store/actions";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(actions.getAllProduct());
    }, [dispatch]);

    return (
        <div className="home-container">
            <div className="card-container">
                {products?.map((product) => (
                    <Card productData={product} key={product._id} />
                ))}
            </div>
        </div>
    );
};

export default Home;
