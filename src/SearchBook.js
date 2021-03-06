import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import update from 'react-addons-update';
import {Debounce} from 'react-throttle';

class SearchBook extends Component {
    state = {
        books: []
    }

    updateQuery = (query) => {
        const {shelvedBooks} = this.props
        BooksAPI.search(query).then((books) => {
            for (let i = 0; i < books.length; i++) {
                for (let j = 0; j < shelvedBooks.length; j++) {
                    if (books[i].id === shelvedBooks[j].id) {
                        books[i] = update(books[i], {$merge: shelvedBooks[j]})
                    }
                }
            }
            this.setState({books: books})
        }).catch((error) => {
            this.setState({books: []})
        })
    }

    render() {
        const {books} = this.state
        return (<div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
				  NOTES: The search from BooksAPI is limited to a particular set of search terms.
				  You can find these search terms here:
				  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

				  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
				  you don't find a specific author or title. Every search is limited by search terms.
				*/
                    }
                    <Debounce time="400" handler="onChange">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>
                    </Debounce>
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">{books.map((book) => (<Book key={book.id} books={book} firstShelve={this.props.firstShelve}/>))}
                </ol>
            </div>
        </div>)
    }
}

export default SearchBook
