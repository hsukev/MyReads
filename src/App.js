import React from 'react'
import {Route} from 'react-router-dom'
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
            this.setState((state)=>({
				books: state.books.concat([book])
			}))
			this.updateShelf(book,shelf)
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
            <Route exact={true} path="/" render={() => (<BookShelf shelvedBooks={this.state.books} handleSelect={this.updateShelf}/>)}/>
            <Route path="/search" render={() => (<SearchBook shelvedBooks={this.state.books} firstShelve={this.shelve}/>)}/>
        </div>)
    }
}

export default BooksApp
