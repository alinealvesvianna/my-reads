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

export const checkStatus = response => {
  if (
    (response.status >= 400 && response.status <= 402) ||
    (response.status >= 405 && response.status <= 499)
  ) {
    throw Error(`Ops...Teve algum erro na requisição. 
    > Resposta da requisição: ${response.statusText}`)
  }

  if (response.status === 403) {
    throw Error(`Ops... A requisição não foi permitida. 
    > Resposta da requisição: ${response.statusText}`)
  }

  if (response.status === 404) {
    throw Error(`Ops... Sua conexão com a internet teve algum problema. 
    > Resposta da requisição: ${response.statusText}`)
  }

  if (response.status >= 500) {
    debugger
    throw Error(`Ops... Tivemos algum problema no servidor. Tente novamente mais tarde. 
    > Resposta da requisição: ${response.statusText}`)
  }

  return response.json()
}
