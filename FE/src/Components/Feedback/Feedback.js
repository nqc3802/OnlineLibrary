import { useEffect, useState } from "react";
import './Feedback.css'

function Feedback(props) {
    const [username, setUsername] = useState('')
    useEffect(() => {
        fetch(`http://localhost:8080/user/${props.fb.userID}`)
                .then((response) => response.json())
                .then((data) => setUsername(data.username))
                .catch((err) => console.log(err))
    }, [])

    return (
        <div className="feedback">
            <p><strong> {username}</strong></p>
            <div class="view-rating-star">
                <input type="radio" name={props.fb.id} id="view-star-5" checked={props.fb.star === 5} />
                <label htmlFor="view-star-5"></label>
                <input type="radio" name={props.fb.id} id="view-star-4" checked={props.fb.star === 4} />
                <label htmlFor="view-star-4"></label>
                <input type="radio" name={props.fb.id} id="view-star-3" checked={props.fb.star === 3} />
                <label htmlFor="view-star-3"></label>
                <input type="radio" name={props.fb.id} id="view-star-2" checked={props.fb.star === 2} />
                <label htmlFor="view-star-2"></label>
                <input type="radio" name={props.fb.id} id="view-star-1" checked={props.fb.star === 1} />
                <label htmlFor="view-star-1"></label>
            </div>
            <p><strong>Nhận xét của người mua:</strong> <br></br> {props.fb.cmt}</p>
            {/* Render other feedback information as needed */}
        </div>
    )
}

export default Feedback;
