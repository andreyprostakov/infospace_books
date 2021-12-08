import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectYearsToDisplay, selectCurrentBook, selectCurrentBookId } from 'store/selectors'
import { fetchBooksForYears, setCurrentBookId, shiftYear } from 'store/actions'
import usePageUrlStore from 'pages/booksPage/usePageUrlStore'
import BooksListAuthorBirth from 'components/books/BooksListAuthorBirth'
import BooksListAuthorDeath from 'components/books/BooksListAuthorDeath'
import BooksListYearRow from 'components/books/BooksListYearRow'

const BooksList = () => {
  const dispatch = useDispatch()
  const yearsToDisplay = useSelector(selectYearsToDisplay())
  const currentBookId = useSelector(selectCurrentBookId())
  const currentBook = useSelector(selectCurrentBook())
  const [{ bookId: currentUrlBookId }, { addBookWidget }] = usePageUrlStore()

  useEffect(() => {
    if (currentUrlBookId && currentUrlBookId !== currentBookId) {
      dispatch(setCurrentBookId(currentUrlBookId))
    }
  }, [currentUrlBookId])

  useEffect(() => {
    if (currentBookId && currentUrlBookId !== currentBookId) {
      addBookWidget(currentBookId)
    }
  }, [currentBookId])

  useEffect(() => {
    dispatch(fetchBooksForYears(yearsToDisplay))
  }, [currentBook])

  return (
    <div className='books-list' onWheel={ (e) => handleWheel(dispatch, e.deltaX, e.deltaY) }>
      <div className='books-list-shadow shadow-top'/>
      <div className='books-list-shadow shadow-bottom'/>
      <div className='books-list-shadow shadow-left'/>
      <div className='books-list-shadow shadow-right'/>
      <div className='books-list-layer2'>
        <div className='books-list-layer3'>
          <BooksListAuthorDeath/>
          { yearsToDisplay.map(year =>
            <BooksListYearRow year={ year } key={ year }/>
          ) }
          <BooksListAuthorBirth/>
        </div>
      </div>
    </div>
  )
}

const handleWheel = (dispatch, xDirection, yDirection) => {
  const speed = Math.abs(yDirection) / 150
  if (yDirection > 0) {
    dispatch(shiftYear(-speed))
  } else if (yDirection < 0) {
    dispatch(shiftYear(+speed))
  }
}

export default BooksList
