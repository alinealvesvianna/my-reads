import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import "./../App.css";
import { search } from "./../BooksAPI";
import { updateShelvesState } from "../utils/utils";
import Book from "../components/Book";
import { getAll, update } from "../BooksAPI";

class SearchContainer extends Component {
  state = {
    search: "",
    booksSearchResult: []
  };

  onChangeSearch = event => {
      debugger
    search(event.target.value.trim(), 1)
      .then(booksSearchResult => {
        if (!booksSearchResult.error) {
          this.setState({ booksSearchResult });
          console.log(booksSearchResult);
        } else {
          this.setState({ booksSearchResult: [] });
          console.log(booksSearchResult);
        }
      })
      .catch(error => `deu o seguinte ruim, ${error}`);
  }

  onChangeShelf = (book, shelf) => {
    update(book, shelf)
      .then(getAll)
      .then(data => updateShelvesState(data))
      .catch(error => console.log(error))
  }

  render() {
    const { booksSearchResult } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <DebounceInput
              type="text"
              minLength={2}
              debounceTimeout={500}
              onChange={this.onChangeSearch}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksSearchResult.map(item => <Book key={item.id} book={item} onChangeShelf={this.onChangeShelf} />)}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchContainer;
