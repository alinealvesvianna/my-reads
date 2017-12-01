import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './../App.css'
import { search } from './../BooksAPI'
import { updateShelvesState } from '../utils/utils'
import Book from '../components/Book'
import { getAll } from '../BooksAPI'

class SearchContainer extends Component {
  state = {
    search: '',
    booksSearchResult: []
  }

  onChangeSearch = event => {
    this.setState({ search: event.target.value })
    search(event.target.value, 10)
    .then(booksSearchResult => {
      this.setState({ booksSearchResult })
      console.log(booksSearchResult)
    })
  }

  render() {
    const { booksSearchResult } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={this.onChangeSearch}
              type="text"
              placeholder="Search by title or author"
              value={this.state.search}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksSearchResult.map(item => <Book key={item.id} book={item} />)}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchContainer
