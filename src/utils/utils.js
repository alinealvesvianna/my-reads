export function updateShelvesState(books) {
    const booksGroupByShelf = books.reduce((newObj, book) => {
      newObj[book.shelf] = newObj[book.shelf] || []
      newObj[book.shelf].push(book)
      return newObj
    }, {})

    const shelves = Object.keys(booksGroupByShelf).map(key => {
      return { group: key, items: booksGroupByShelf[key] }
    })
    return shelves
  }

  
