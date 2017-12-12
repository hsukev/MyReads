import React, {Component} from 'react'
import Book from './Book'
import {Link} from 'react-router-dom'

class BookShelf extends Component {

    render() {
        const {shelvedBooks} = this.props
        let currentlyReadingBooks = shelvedBooks.filter((b) => b.shelf === "currentlyReading")
        let wantToReadBooks = shelvedBooks.filter((b) => b.shelf === "wantToRead")
        let readBooks = shelvedBooks.filter((b) => b.shelf === "read")
		console.log(shelvedBooks)

        return (<div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">{currentlyReadingBooks.map((book) => (<Book key={book.key} books={book} handleShelf={this.props.handleSelect}></Book>))}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">{wantToReadBooks.map((book) => (<Book key={book.key} books={book} handleShelf={this.props.handleSelect}></Book>))}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">{readBooks.map((book) => (<Book key={book.key} books={book} handleShelf={this.props.handleSelect}></Book>))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>)
    }
}

export default BookShelf
