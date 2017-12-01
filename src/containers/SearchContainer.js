import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import "./../App.css";
import { search } from "./../BooksAPI";
import { updateShelvesState } from "../utils/utils";
import Book from "../components/Book";
import { getAll, update } from "../BooksAPI";
import Message from '../components/Message';
import Load from "../components/Load";

class SearchContainer extends Component {
  state = {
    booksSearchResult: [],
    isLoading: false,
    isError: { handleError: false, message: null }
  };

  onChangeSearch = event => {
    this.setState({ isLoading: true,  isError: { handleError: false, message: null } });
    search(event.target.value.trim(), 1)
      .then(booksSearchResult => {
        if (!booksSearchResult.error) {
          this.setState({ booksSearchResult, isLoading: false });
        } else {
          this.setState({ booksSearchResult: [], isLoading: false, isError:{handleError: true, message:'Essa consulta não retornou nenhum resultado'} });
        }
      })
      .catch(error =>
        this.setState({
          isLoading: false,
          isError: { handleError: true, message: error.message }
        })
      );
  };

  onChangeShelf = (book, shelf) => {
    this.setState({ isLoading: true,  isError: { handleError: false, message: null } });
    update(book, shelf)
      .then(getAll)
      .then(data => {
          updateShelvesState(data)
          this.setState({isLoading: false,  isError: { handleError: true, message: `esse livro foi movido para a pratileira ${shelf} com sucesso!` }} )
        })
        .catch(error =>
            this.setState({
              isLoading: false,
              isError: { handleError: true, message: error.message }
            })
          );
  };

  render() {
    const { booksSearchResult, isError, isLoading } = this.state;

    return (
      <div className="search-books">
        {isLoading && <Load />}
        {isError && <Message message={isError.message} />}
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
            {booksSearchResult.map(item => (
              <Book
                key={item.id}
                book={item}
                onChangeShelf={this.onChangeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchContainer;
