import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import 'bootstrap';
import "./Books.css";
import { useSelector } from "react-redux";

function Books(props) {
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const admin = useSelector((state) => state.auth.login?.admin)

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const filterBooks = books.filter((book) => {
        return (
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
        );
    });

    const handleView = (bookcode) => {
        navigate("/admin/book/" + bookcode)
    }

    const handleAddBook = () => {
        navigate("/admin/book/" + -1)
    }

    const handleDelete = (bookcode) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
            fetch(`http://localhost:8080/book/delete/${bookcode}`, {
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
        if (!admin) {
            navigate("/")
        }
        fetch('http://localhost:8080/books')
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((err) => console.log(err));
    }, [books]);

    return (
        <div className="body">
            <h2 className="text-center">Books List</h2>
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
                <button className="btn btn-primary" onClick={() => handleAddBook()}>Add Book</button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>BookCode</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Release date</th>
                            <th>Total pages</th>
                            <th>Quantity sold</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filterBooks.map((book) => (
                            <tr key={book.bookcode}>
                                <td> {book.bookcode} </td>
                                <td> {book.title} </td>
                                <td> {book.author} </td>
                                <td> {book.category} </td>
                                <td> {book.release_date} </td>
                                <td> {book.total_pages} </td>
                                <td> {book.quantity_sold} </td>
                                <td>
                                    {admin ? (
                                        <>
                                        <button className="btn btn-info" id="view" onClick={() => handleView(book.bookcode)}>View</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(book.bookcode)}>Delete</button></>
                                    ) : (
                                        <></>
                                    )}
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Books;