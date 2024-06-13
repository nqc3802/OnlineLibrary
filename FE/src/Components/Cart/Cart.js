import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './Cart.css';
import { Link, useNavigate, useParams } from "react-router-dom";

function Cart(props) {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate()
    const userID = user?._id;
    const [cart, setCart] = useState([])
    const [books, setBooks] = useState([])
    const [shopping, setShopping] = useState([])
    const params = useParams();
    const [quantity, setQuantity] = useState('');
    const bookcode = params.bookcode;

    const handleView = (bookcode) => {
        navigate("/book/" + bookcode)
    }

    const addToShopping = (bookcode, quantity) => {
        const newShopping = {
            quantity: quantity,
            user_ID: userID,
        };
        fetch(`http://localhost:8080/shopping/add/${userID}/${bookcode}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newShopping),
        })
            .then((response) => response.json())
            .then((data) => {
                setShopping(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        navigate("/shopping")
    }

    const handleDelete = (bookcode) => {
        if (window.confirm("Xóa sách khỏi giỏ hàng?")) {
            fetch(`http://localhost:8080/cart/delete/${userID}/${bookcode}`, {
                method: "DELETE",
                mode: "cors"
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setBooks(books.filter((book) => book.bookcode !== bookcode));
                })
                .catch((err) => console.log(err));
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
        fetch(`http://localhost:8080/cart/${userID}`)
            .then((response) => response.json())
            .then((cartData) => {
                setCart(cartData);
                const bookPromises = cartData.map((item) =>
                    fetch(`http://localhost:8080/book/${item.bookcode}`)
                        .then((response) => response.json())
                );
                Promise.all(bookPromises)
                    .then((bookData) => {
                        setBooks(bookData);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            })
            .catch((err) => console.log(err));
    }, [cart]);

    return (
        <div>
            <section class="cart">
                <h1 class="cart-title">Giỏ hàng</h1>
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>Bìa</th>
                            <th>Tiêu đề</th>
                            <th>Tác giả</th>
                            <th>Thể loại</th>
                            <th>Số lượng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id}>
                                <td>
                                    <Link to={`/book/${book.bookcode}`}>
                                        <img src={book.img} alt={book.title} />
                                    </Link>
                                </td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>
                                    <p className="sl">{cart[index]?.quantity}</p>
                                </td>
                                <td>
                                    <button class="btn btn-outline-success" onClick={() => addToShopping(book.bookcode, cart[index]?.quantity)}>Đặt hàng</button>
                                    <button class="btn btn-danger" onClick={() => handleDelete(book.bookcode)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Cart;
