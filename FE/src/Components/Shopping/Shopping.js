import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


function Shopping(props) {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userID = user?._id;
    const [cart, setCart] = useState([])
    const [shopping, setShopping] = useState([])
    const [books, setBooks] = useState([])

    const handleDelete = (bookcode) => {
        if (window.confirm("Xác nhận hủy đơn hàng?")) {
            fetch(`http://localhost:8080/shopping/delete/${userID}/${bookcode}`, {
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
        fetch(`http://localhost:8080/shopping/${userID}`)
            .then((response) => response.json())
            .then((shoppingData) => {
                setShopping(shoppingData);
                const bookPromises = shoppingData.map((item) =>
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
    }, [shopping])

    return (
        <div>
            <section class="cart">
                <h1 class="cart-title">Đơn mua</h1>
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
                                    <p className="sl">{shopping[index]?.quantity}</p>
                                </td>
                                <td>
                                    <button class="btn btn-outline-info">Chi tiết đơn hàng</button>
                                    <button class="btn btn-danger" onClick={() => handleDelete(book.bookcode)}>Hủy đơn</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default Shopping;
