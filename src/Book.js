import React from 'react'
import './App.css'

function Book(props) {
    const {books, handleShelf, firstShelve} = props
    const selectShelf = (e) => {
        books.shelf
            ? handleShelf(books, e.target.value)
            : firstShelve(books.id, e.target.value)
        }
    return (<li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${books.imageLinks.smallThumbnail})`
                    }}></div>
                <div className="book-shelf-changer">
                    <select value={books.shelf
                            ? books.shelf
                            : "none"} onChange={(event) => selectShelf(event)}>
                        <option value="none" disabled="disabled">Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{books.title}</div>
            <div className="book-authors">{books.authors}</div>
        </div>
    </li>)

}

export default Book
