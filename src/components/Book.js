import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  state = {
    optionsValue: [
      { value: 'currentlyReading', name: 'Currently Reading' },
      { value: 'wantToRead', name: 'Want to Read' },
      { value: 'read', name: 'Read' },
      { value: 'none', name: 'none' }
    ]
  }

  static protoType = {
    book: PropTypes.object
  }

  handleChange = event => {
    this.props.onChangeShelf(this.props.book, event.target.value)
  }

  render() {
    const { optionsValue } = this.state
    const { book } = this.props

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.smallThumbnail})`
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={book.shelf ? book.shelf : 'none'}
                onChange={this.handleChange}
              >
                <option disabled>Move to...</option>
                {optionsValue.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors &&
            book.authors.map((author, index) => (
              <div key={index} className="book-authors">
                {author}
              </div>
            ))}
        </div>
      </li>
    )
  }
}

export default Book
