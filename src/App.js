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
        this.refresh()
    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then()
        console.log(book)
		this.refresh()
    }

	shelve = (id, shelf) => {
		BooksAPI.get(id).then((book)=>{
			this.updateShelf(book,shelf)
			this.refresh()
		})
	}

	refresh = ()=>{
		BooksAPI.getAll().then((books) => {
            this.setState({books: books})
            console.log({books})
        })
	}


    render() {
        return (<div className="app">
            <Route exact={true} path="/" render={() => (<BookShelf shelvedBooks={this.state.books} handleSelect={this.updateShelf}/>)}/>
            <Route path="/search" render={() => (<SearchBook shelvedBooks={this.state.books} firstShelve={this.shelve}/>)}/>
        </div>)
    }
}

export default BooksApp
