import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap';
import { useSelector } from "react-redux";
// import "./Books.css";

function Books(props) {
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState([]);

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const filterBooks = books.filter((book) => {
        return (
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
        );
    });
    useEffect(() => {
        fetch('http://localhost:8080/books')
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((err) => console.log(err));
    }, [books]);

    return (
        <div className="body">
            <h2 className="text-center">Tất cả sản phẩm</h2>
            <div className="row">
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm sách, tác giả"
                        value={search}
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
            </div>
            <div className="row">
                {filterBooks.map((book) => (
                    <div className="col-md-3" key={book.bookcode}>
                        <div className="card mb-3">
                            <Link to={`/book/${book.bookcode}`}>
                                <img className="card-img-top" src={book.img} alt={book.title} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.author}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;