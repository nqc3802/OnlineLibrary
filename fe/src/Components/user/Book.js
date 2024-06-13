import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Book.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import Feedback from "../Feedback/Feedback";

function Book(props) {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState(null);
    const [shopping, setShopping] = useState(null)

    const [book, setBook] = useState({
        title: '',
        author: '',
        release_date: '',
    });
    const [sendfb, setSendfb] = useState({})
    const [feedbacks, setFeedbacks] = useState([]);
    const [username, setUsername] = useState('');
    const [userRating, setUserRating] = useState(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userID = user?._id;

    const bookcode = params.bookcode;

    const handleAdd = () => {
        setQuantity(quantity + 1);
    }

    const handleSubtract = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleFeedback = () => {
        const setSendfb = {
            ...sendfb,
            user_ID: userID,
            bookcode: bookcode,
        };
        fetch(`http://localhost:8080/feedback/add/${bookcode}/${userID}`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(setSendfb),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

    const addToCart = () => {
        const newCart = {
            quantity: quantity,
            user_ID: userID,
            bookcode: bookcode,
        };

        if (cart) {
            const updatedCart = { ...cart, quantity: cart.quantity + 1 };

            fetch(`http://localhost:8080/cart/edit/${userID}/${bookcode}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCart),
            })
                .then((response) => response.json())
                .then((data) => {
                    setCart(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            fetch(`http://localhost:8080/cart/add/${userID}/${bookcode}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCart),
            })
                .then((response) => response.json())
                .then((data) => {
                    setCart(data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        navigate("/cart")
    };

    const addToShopping = () => {
        const newShopping = {
            quantity: quantity,
            user_ID: userID,
            bookcode: bookcode,
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

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
        else {
            fetch(`http://localhost:8080/book/${bookcode}`)
                .then((response) => response.json())
                .then((data) => setBook(data))
                .catch((err) => console.log(err))

            fetch(`http://localhost:8080/feedback/book/${bookcode}`)
                .then((response) => response.json())
                .then((data) => {
                    setFeedbacks(data);
                    const userFeedback = data.find(feedback => feedback.user_ID === userID);
                    if (userFeedback) {
                        setUserRating(userFeedback.star);
                    }
                })
                .catch((err) => console.log(err))

            fetch(`http://localhost:8080/user/${userID}`)
                .then((response) => response.json())
                .then((data) => setUsername(data.username))
                .catch((err) => console.log(err))
        }
    }, [feedbacks])

    return (
        <section class="view-container">
            <div class="view-infor">

                <div class="view-img">
                    <img src={book.img} alt={book.title} />
                </div>

                <div class="view-detail">
                    <p class="view-title"><strong><span>{book.title}</span></strong></p>
                    <p class="view-author"><strong>Tác giả: </strong><span>{book.author}</span></p>
                    <p class="view-category"><strong>Thể loại: </strong><span>{book.category}</span></p>
                    <p class="view-date"><strong>Ngày phát hành: </strong><span>{book.release_date}</span></p>
                    <p class="view-page"><strong>Số trang: </strong><span>{book.total_pages}</span></p>
                    <div class="view-count">
                        <p class="label">Số lượng</p>
                        <button onClick={handleSubtract}>-</button>
                        <input type="text" name="count" value={quantity} />
                        <button onClick={handleAdd}>+</button>
                    </div>
                    <button class="btn btn-outline-danger" onClick={addToCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                        </svg>
                        {" "}Thêm vào giỏ hàng
                    </button>
                    <button class="btn btn-success" onClick={addToShopping}>Mua</button>
                </div>

            </div>

            <div class="view-description">
                <p><strong>Mô tả</strong></p>
                <textarea rows="20" cols="50" name="note" value={book.mota} disabled></textarea>
            </div>

            <div class="view-rating">
                <div class="avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                    {user?.username}
                </div>
                <div class="view-rating-star">
                    <input value={5} type="radio" name="view-star" id="view-star-5" onChange={(e) => setSendfb({ ...sendfb, star: e.target.value })} defaultChecked />
                    <label for="view-star-5"></label>
                    <input value={4} type="radio" name="view-star" id="view-star-4" onChange={(e) => setSendfb({ ...sendfb, star: e.target.value })} />
                    <label for="view-star-4"></label>
                    <input value={3} type="radio" name="view-star" id="view-star-3" onChange={(e) => setSendfb({ ...sendfb, star: e.target.value })} />
                    <label for="view-star-3"></label>
                    <input value={2} type="radio" name="view-star" id="view-star-2" onChange={(e) => setSendfb({ ...sendfb, star: e.target.value })} />
                    <label for="view-star-2"></label>
                    <input value={1} type="radio" name="view-star" id="view-star-1" onChange={(e) => setSendfb({ ...sendfb, star: e.target.value })} />
                    <label for="view-star-1"></label>
                    <span>Đánh giá</span>
                </div>
                <div class="view-rating-note">
                    <textarea rows="20" cols="50" name="note" placeholder="Đánh giá của bạn" onChange={(e) => setSendfb({ ...sendfb, cmt: e.target.value })}></textarea>
                    <button id="send" class="btn btn-success" onClick={handleFeedback}>Gửi</button>
                </div>
                <div className="view-feedbacks">
                    <h4>Đánh giá sản phẩm</h4>
                    {feedbacks.map((feedback) => (
                        <Feedback fb={feedback} key={feedback.userID} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Book;