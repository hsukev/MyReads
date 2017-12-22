import React, {Component} from 'react'
import Book from './Book'

class BookShelf extends Component {
    render() {
        const {shelvedBooks, shelfName} = this.props

		let shelfTitle
		let filteredBooks

		if (shelfName === "currentlyReading") {
         	filteredBooks = shelvedBooks.filter((b) => b.shelf === "currentlyReading")
            shelfTitle = "Currently Reading"
        } else if (shelfName === "wantToRead") {
            filteredBooks = shelvedBooks.filter((b) => b.shelf === "wantToRead")
            shelfTitle = "Want To Read";
        } else {
            filteredBooks = shelvedBooks.filter((b) => b.shelf === "read")
            shelfTitle = "Read";
        }

        return (<div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">{filteredBooks.map((book) => (<Book key={book.id} books={book} handleShelf={this.props.handleSelect}></Book>))}
                </ol>
            </div>
        </div>)

    }
}

export default BookShelf
