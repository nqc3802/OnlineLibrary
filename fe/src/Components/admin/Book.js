import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Book.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Footer";
import { useSelector } from "react-redux";

function Book(props) {

    const params = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        author: '',
        release_date: '',
    });
    const [isEditing, setIsEditing] = useState(true);
    const [text, setText] = useState('');
    const [error, setError] = useState("");
    const maxText = 1000
    const bookcode = params.bookcode;
    const admin = useSelector((state) => state.auth.login?.admin)

    const handleText = (e) => {
        const newText = e.target.value;
        if (newText.length <= maxText) {
            setText(newText)
            setBook({ ...book, mota: newText })
        }
    }

    const onSaveEdit = async () => {
        if (book.title.trim() === "" || book.author.trim() === "" || book.release_date.trim() === "") {
            alert("Tiêu đề, tác giả, ngày phát hành là bắt buộc!");
            return;
        }

        if (window.confirm("Bạn chắc chắn muốn sửa sách này?")) {
            try {
                const response = await fetch(`http://localhost:8080/book/edit/${bookcode}`, {
                    method: "PUT",
                    mode: "cors",
                    body: JSON.stringify(book),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                });

                if (response.ok) {
                    navigate("/admin/books");
                } else {
                    const data = await response.json();
                    const errorMessage = data.error || "Đã xảy ra lỗi";
                    alert(errorMessage);
                }
            } catch (err) {
                console.log(err);
                alert("Sách đã có trong cơ sở dữ liệu!");
            }
        }
    };


    const onSaveAdd = async () => {
        if (book.title.trim() === "" || book.author.trim() === "" || book.release_date.trim() === "") {
            alert("Tiêu đề, tác giả, ngày phát hành là bắt buộc!");
            return;
        }
        if (window.confirm("Bạn chắc chắn muốn thêm sách?")) {
            try {
                const response = await fetch(`http://localhost:8080/book/add`, {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify(book),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                })
                if (response.ok) {
                    navigate("/admin/books")
                } else {
                    return response.json().then((data) => {
                        const errorMessage = data.error || "Đã xảy ra lỗi";
                        alert(errorMessage);
                    });
                }
            } catch (err) {
                console.log(err);
                alert("Sách đã có trong cơ sở dữ liệu!");
            }
        }
    }

    const handleAddClick = () => {
        if (isEditing) {
            setIsEditing(false)
        }
        else {
            // xử lý khi nút save add được bấm
            onSaveAdd()
        }
    }

    const handleEditClick = () => {
        if (isEditing) {
            setIsEditing(false);
        }
        else {
            // xử lý khi nút save edit được bấm
            onSaveEdit()
        }
    };

    const imgChange = (e) => {
        const files = e.target.files
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        if (files.length > 0) {
            reader.addEventListener('load', (event) => {
                const img = event.target.result;
                setBook({ ...book, img: img })
            })
            if (files.size > 10485760) {
                alert("Chỉ cho phép hình ảnh nhỏ hơn 10MB")
            }
            else {
                alert("Tải hình ảnh thành công")
            }
        }
    }

    useEffect(() => {
        if (!admin) {
            navigate("/")
        }
        fetch(`http://localhost:8080/book/${bookcode}`)
            .then((response) => response.json())
            .then((data) => setBook(data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="vjp">
            <h1>{bookcode < 0 ? "Thêm sách" : `Sách`}</h1>

            <div className="titau">
                <div className="row">
                    <div className="col-sm-2">
                        Tiêu đề:<span style={{ color: 'red' }}>*</span> {" "}
                        <input type="text" id="title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} required disabled={isEditing} />
                    </div>
                    <div className="col-sm-2">
                        Tác giả:<span style={{ color: 'red' }}>*</span> {" "}
                        <input type="text" id="author" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} required disabled={isEditing} />
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-2">
                        <label className={`upload btn btn-secondary ${isEditing ? 'disabled' : ''}`} htmlFor="fileUpload" disabled={isEditing}>Upload:</label> {" "}
                        <input type="file" id="fileUpload" accept=".jpg, .png, .jpeg" onChange={(e) => imgChange(e)} disabled={isEditing} />
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="left-half">
                    <div className="row">
                        <p>Mô tả sách:</p>
                        <div className="col-sm-6">
                            <textarea type="text" id="describe" value={book.mota} onChange={handleText} disabled={isEditing}></textarea>
                            <p id="char">{text.length}/{maxText}</p>
                        </div>
                    </div>
                    <div className="dato">
                        <div className="row">
                            <div className="col-sm-4">
                                Ngày phát hành:<span style={{ color: 'red' }}>*</span> {" "}
                                <input type="date" id="date" value={book.release_date} onChange={(e) => setBook({ ...book, release_date: e.target.value })} required disabled={isEditing} />
                            </div>
                            <div className="col-sm-4">
                                Số trang:{" "}
                                <input type="text" id="total_pages" value={book.total_pages} onChange={(e) => setBook({ ...book, total_pages: e.target.value })} disabled={isEditing} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <label>Thể loại:</label>
                            <select id="category" value={book.category} onChange={(e) => setBook({ ...book, category: e.target.value })} disabled={isEditing}>
                                <option value="">-- Chọn thể loại --</option>
                                <option value="Phiêu lưu">Phiêu lưu</option>
                                <option value="Kinh dị">Kinh dị</option>
                                <option value="Khoa học viễn tưởng">Khoa học viễn tưởng</option>
                                <option value="Truyện tranh thiếu nhi">Truyện tranh thiếu nhi</option>
                                <option value="Tiểu thuyết">Tiểu thuyết</option>
                                <option value="Du ký">Du ký</option>
                                <option value="Trinh thám">Trinh thám</option>
                                <option value="Manga">Manga</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="right-half">
                    <div className="col-sm-12">
                        <img id="imgUpload" src={book.img} alt="" />
                    </div>
                </div>
            </div>

            {/* <div className="des">
                <div className="row">
                    <p>Mô tả sách:</p>
                    <div className="col-sm-6">
                        <textarea type="text" id="describe" disabled={isEditing}></textarea>
                    </div>
                    <div className="col-sm-6">
                        <img id="imgUpload" src={book.img} alt="" />
                    </div>
                </div>

            </div> */}

            {/* <div className="dato">
                <div className="row">
                    <div className="col-sm-3">
                        Ngày phát hành:<span style={{ color: 'red' }}>*</span> {" "}
                        <input type="date" id="date" value={book.release_date} onChange={(e) => setBook({ ...book, release_date: e.target.value })} required disabled={isEditing} />
                    </div>
                    <div className="col-sm-3">
                        Số trang:{" "}
                        <input type="text" id="total_pages" value={book.total_pages} onChange={(e) => setBook({ ...book, total_pages: e.target.value })} disabled={isEditing} />
                    </div>
                </div>
            </div>

            <div className="cate">
                <div className="row">
                    <div className="col-sm-3">
                        <label>Thể loại:</label>
                        <select id="category" value={book.category} onChange={(e) => setBook({ ...book, category: e.target.value })} disabled={isEditing}>
                            <option value="">-- Chọn thể loại --</option>
                            <option value="Phiêu lưu">Phiêu lưu</option>
                            <option value="Kinh dị">Kinh dị</option>
                            <option value="Khoa học viễn tưởng">Khoa học viễn tưởng</option>
                            <option value="Truyện tranh thiếu nhi">Truyện tranh thiếu nhi</option>
                        </select>
                    </div>
                </div>
            </div> */}

            <div>
                {/* <footer className="sv">
                    {bookcode < 0 ? (
                        <button id="add" onClick={handleAddClick}>{isEditing ? "Add" : "Save"}</button>
                    ) : (
                        <button id="edit" onClick={handleEditClick}>{isEditing ? "Edit" : "Save"}</button>
                    )}
                </footer> */}
                <Footer
                    bookcode={bookcode}
                    isEditing={isEditing}
                    handleAddClick={handleAddClick}
                    handleEditClick={handleEditClick}
                />
            </div>

        </div>
    )
}

export default Book;