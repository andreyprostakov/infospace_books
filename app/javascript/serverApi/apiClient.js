import { isArray } from 'lodash'
import { Book } from 'serverApi/Book'

class ApiClient {
  getYears() {
    return $.ajax({ url: '/years.json '})
  }

  getAuthors() {
    return $.ajax({ url: '/authors.json '})
  }

  getBooks(query = {}) {
    return $.ajax({
      url: `/books.json?${objectToParams(query)}`
    }).then((books) =>
      books.map(bookData => Book.parse(bookData))
    )
  }

  getBookDetails(id) {
    return $.ajax({
      url: `/books/${id}.json`
    }).then((book) => {
      const {
        id, title,
        original_title: originalTitle,
        goodreads_url: goodreadsUrl, wiki_url: wikiUrl,
        image_url: imageUrl,
        author_id: authorId,
        year_published: yearPublished
      } = book
      return {
        id, title, goodreadsUrl, wikiUrl, imageUrl, authorId, yearPublished
      }
    })
  }

  putBookDetails(id, details) {
    const {
      title,
      originalTitle: original_title,
      goodreadsUrl: goodreads_url,
      wikiUrl: wiki_url,
      imageUrl: image_url,
      authorId: author_id,
      yearPublished: year_published
    } = details
    const body = {
      title, goodreads_url, wiki_url, image_url, author_id, year_published
    }
    return $.ajax({
      url: `/books/${id}.json`,
      type: 'PUT',
      data: { book: body }
    })
  }
}

const objectToParams = (object) => {
  var params = new URLSearchParams()
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (isArray(value)) {
      value.forEach(entry => params.append(`${key}[]`, entry))
    } else {
      parans.append(key, value)
    }
  })
  return params.toString()
}

export default new ApiClient()
