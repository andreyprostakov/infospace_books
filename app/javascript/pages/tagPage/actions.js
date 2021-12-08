import {
  cleanBooksList,
  cleanYearsList,
  fetchAllTags,
  fetchAuthors,
  fetchTagBooks,
  fetchYears,
  pickCurrentBookFromLatestYear,
  reloadBook,
  setCurrentBookId,
} from 'store/actions'

export const setupStoreForTagPage = (tagId, currentBookId = null) => async (dispatch, getState) => {
  Promise.all([
    dispatch(cleanYearsList()),
    dispatch(cleanBooksList()),

    dispatch(fetchAllTags()),
    dispatch(fetchYears({ tagId })),
    dispatch(fetchAuthors()),
  ]).then(() => {
    dispatch(fetchTagBooks(tagId))
    if (currentBookId) {
      dispatch(reloadBook(currentBookId))
      dispatch(setCurrentBookId(currentBookId))
    } else {
      dispatch(pickCurrentBookFromLatestYear())
    }
  })
}
