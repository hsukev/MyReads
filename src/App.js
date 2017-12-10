import React from 'react'
import {Route} from 'react-router-dom'
import SearchBook from './SearchBook'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
	state = {
		books:[]
	}

	componentDidMount(){
		BooksAPI.getAll().then((books)=>{
			this.setState({books: books})
			console.log({books})
		})

	}
    render() {
        return (<div className="app">

            <Route path="/search" component={SearchBook}/>

            <Route exact={true} path="/" render={()=>(
					<BookShelf shelvedBooks={this.state.books}/>
				)}/>

        </div>)
    }
}

export default BooksApp
