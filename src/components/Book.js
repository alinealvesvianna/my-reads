import React, { Component } from "react";
import PropTypes from "prop-types";
import { update } from "./../BooksAPI";

class Book extends Component {
  state = {
    optionsValue: [
      { value: "currentlyReading", name: "Currently Reading" },
      { value: "wantToRead", name: "Want to Read" },
      { value: "read", name: "Read" },
      { value: "none", name: "none" }
    ]
  };

  handleChange = event => {
    // console.log(event.target.state);

  };

  render() {
    const { optionsValue } = this.state;
    const { book } = this.props;

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
              <select value={book.shelf} onChange={this.handleChange}>
                <option value="none" disabled>
                  Move to...
                </option>
                {optionsValue.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    );
  }
}

Book.protoType = {
  book: PropTypes.object
};

export default Book;
