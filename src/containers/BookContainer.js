import React, { Component } from "react"
import "./../App.css"
import { Link } from "react-router-dom"
import { getAll } from "../BooksAPI"
import Book from "./../components/Book"

class BookContainer extends Component {
  state = {
    shelves: []
  }

  componentDidMount() {
    getAll().then(books => {
      const booksGroupByShelf = books.reduce((newObj, book) => {
        newObj[book.shelf] = newObj[book.shelf] || []
        newObj[book.shelf].push(book)
        return newObj
      }, {})

      const shelves = Object.keys(booksGroupByShelf).map(key => {
        return { group: key, items: booksGroupByShelf[key] }
      })
      this.setState({ shelves })
      console.log(this.state.shelves)
    })
  }

  render() {
    const { shelves } = this.state

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {shelves.map((shelf, index) => {
                return (
                  <div key={index} className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.group}</h2>
                    <div className="bookshelf-books">
                      {shelf.items.length > 0 && (
                        <ol className="books-grid">
                          {shelf.items.map(item => (
                            <Book key={item.id} book={item} />
                          ))}
                        </ol>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BookContainer
