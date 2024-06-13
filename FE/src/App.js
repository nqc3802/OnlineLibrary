import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import { useState } from "react";
import Books from "./Components/admin/Books";
import Book from "./Components/admin/Book";
import Footer from "./Components/admin/Footer";
import UserBooks from "./Components/user/Books";
import UserBook from "./Components/user/Book";
import Cart from "./Components/Cart/Cart";
import Shopping from "./Components/Shopping/Shopping";

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<UserBooks />} />
          <Route path="/book/:bookcode" element={<UserBook />} />
          <Route path='/admin/books' element={<Books />} />
          <Route path='/admin/book/:bookcode' element={<Book />} />
          <Route path='/admin/book/*' element={<Footer />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
