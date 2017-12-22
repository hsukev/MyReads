import React from 'react'
import {Route, Link} from 'react-router-dom'
import SearchBook from './SearchBook'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books})
        })
    }

    shelve = (id, shelf) => {
        BooksAPI.get(id).then((book) => {
            this.setState((state) => ({
                books: state.books.concat([book])
            }))
            this.updateShelf(book, shelf)
        })

    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then()
        this.setState((state) => ({
            books: state.books.map((stateBook) => {
                if (stateBook === book) {
                    stateBook.shelf = shelf
                }
                return stateBook
            })
        }))
        console.log(book)

    }

    render() {
        return (<div className="app">
            <Route exact={true} path="/" render={() => (<div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <BookShelf shelvedBooks={this.state.books} handleSelect={this.updateShelf} shelfName="currentlyReading"/>
                        <BookShelf shelvedBooks={this.state.books} handleSelect={this.updateShelf} shelfName="wantToRead"/>
                        <BookShelf shelvedBooks={this.state.books} handleSelect={this.updateShelf} shelfName="read"/>
                    </div>
                    <div className="open-search">
                        <Link to="/search">Add a book</Link>
                    </div>
                </div>)}/>
            <Route path="/search" render={() => (<SearchBook shelvedBooks={this.state.books} firstShelve={this.shelve}/>)}/>

        </div>)
    }
}

export default BooksApp
