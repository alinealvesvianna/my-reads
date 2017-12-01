import React, { Component } from "react";
import "./../App.css";
import { Link } from "react-router-dom";
import { getAll, update } from "../BooksAPI";
import Book from "./../components/Book";
import { updateShelvesState } from "../utils/utils";
import Load from "../components/Load";
import ErroMessage from "../components/ErroMessage";

class BookContainer extends Component {
  state = {
    shelves: [],
    isLoading: true,
    isLocalLoading: {handleLoading:false, local:null},
    isError: { handleError: false, message: null }
  };

  componentDidMount() {
    getAll()
      .then(books => {
        return updateShelvesState(books);
      })
      .then(data => {this.setState({ shelves: data, isLoading: false }) 
      console.log(data)})
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: { handleError: true, message: error.message }
        })
      })
  }

  onChangeShelf = (book, shelf) => {
    this.setState({ isLocalLoading: {handleLoading:true, local:shelf} });
    update(book, shelf)
      .then(getAll)
      .then(data => updateShelvesState(data))
      .then(shelves => this.setState({ shelves, isLocalLoading: false }))
      .catch(error => {
        this.setState({
          isLocalLoading: {handleLoading:false},
          isError: { handleError: true, message: error.message }
        })
      })
  };

  render() {
    const { shelves, isLoading, isLocalLoading, isError } = this.state;
    return (
      <div className="app">
        {isLoading && <Load />}
        {isError.handleError && (<ErroMessage errorMsg={isError.message} />)}
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
                      {(isLocalLoading.handleLoading && isLocalLoading.local === shelf.items[0].shelf) && (
                        <Load isLocalLoading={isLocalLoading} />
                      )}
                      {shelf.items.length > 0 && (
                        <ol className="books-grid">
                          {shelf.items.map(item => (
                            <Book
                              key={item.id}
                              book={item}
                              onChangeShelf={this.onChangeShelf}
                            />
                          ))}
                        </ol>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BookContainer;
