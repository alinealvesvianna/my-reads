import React, {Component} from "react";
import {Route} from 'react-router-dom'
import BookContainer from './containers/BookContainer'
import SearchContainer from './containers/SearchContainer'
import {search} from './BooksAPI';

// import * as BooksAPI from './BooksAPI' import './App.cs'

class BooksApp extends Component {
    render() {
        return (
            <div className="books-app">
                <Route exact path="/" render={() => <BookContainer/>}/>
                <Route path="/search" render={() => <SearchContainer/>}/>
            </div>
        )
    }
}

export default BooksApp
