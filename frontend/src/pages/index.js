import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./pages.css";
import { userRoutes, adminRoutes, commonRoutes } from "../constant/route";
import Home from "./Home";

export default function Pages() {
    const user = useSelector((state) => (state.user && state.user.profile) || {});
    const routes = user.role === "admin" ? adminRoutes : [...userRoutes, ...commonRoutes];
    return (
        <main className="pages-wrapper">
            <Routes>
                {routes.map(({ Component, isProtected, to }, index) =>
                    !!user._id === isProtected ? <Route exact path={to} key={`route-${index}`} element={<Component />} /> : null
                )}
                {commonRoutes.map(({ Component, to }, index) => (
                    <Route exact path={to} key={`route-common-${index}`} element={<Component />} />
                ))}
                <Route exact path="/*" key="HOME" element={<Home />} />
            </Routes>
        </main>
    );
}
