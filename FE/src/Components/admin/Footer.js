function Footer({ bookcode, isEditing, handleAddClick, handleEditClick }) {
    return (
        <footer className="sv">
            {bookcode < 0 ? (
                <button className="btn btn-success" id="add" onClick={handleAddClick}>{isEditing ? "Add" : "Save"}</button>
            ) : (
                <button className="btn btn-success" id="edit" onClick={handleEditClick}>{isEditing ? "Edit" : "Save"}</button>
            )}
        </footer>
    )
}

export default Footer;