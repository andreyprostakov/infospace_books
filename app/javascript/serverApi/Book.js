class Book {
  static parse(bookData) {
    return {
      ...bookData,
      authorId: bookData.author_id,
      coverUrl: bookData.cover_url,
      goodreadsUrl: bookData.goodreads_url,
      tagIds: bookData.tag_ids,
      popularity: bookData.popularity
    }
  }
}

export default Book
