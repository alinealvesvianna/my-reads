export function updateShelvesState(books) {
  const booksGroupByShelf = books.reduce((newObj, book) => {
    newObj[book.shelf] = newObj[book.shelf] || [];
    newObj[book.shelf].push(book);
    return newObj;
  }, {});

  const shelves = Object.keys(booksGroupByShelf).map(key => {
    return { group: key, items: booksGroupByShelf[key] };
  });
  return shelves;
}

export const checkStatus = response => {
  if (
    (response.status >= 400 && response.status <= 402) ||
    (response.status >= 405 && response.status <= 451)
  ) {
    throw Error("deu um ruim foda ae de 400");
  }

  if (response.status === 403) {
    throw Error("deu um ruim de forbbiden");
  }

  if (response.status === 404) {
    throw Error("deu ruim de not found");
  }

  return response.json();
};
