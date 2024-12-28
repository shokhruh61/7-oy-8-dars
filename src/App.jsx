import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import MainLayout from "./layouts/MainLayout";
import { Route, Routes } from "react-router-dom";
import Details from "./pages/Details";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <About />
          </MainLayout>
        }
      />
      <Route
        path="/details/:id"
        element={
          <MainLayout>
            <Details />
          </MainLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <Cart />
          </MainLayout>
        }
      />
      <Route
        path="/products"
        element={
          <MainLayout>
            <Products />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
