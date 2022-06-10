import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentBookId } from 'store/axis/selectors'
import { setSeed } from 'store/axis/actions'
import { selectCurrentBook } from 'store/metadata/selectors'
import { selectYearsToDisplay } from 'widgets/booksListYearly/selectors'
import { fetchBooksForYears, jumpToLatestYear } from 'widgets/booksListYearly/actions'

import HotKeysWrap from 'widgets/booksListYearly/components/HotKeysWrap'
import YearRow from 'widgets/booksListYearly/components/YearRow'
import YearsSlider from 'widgets/booksListYearly/components/YearsSlider'

const BooksListYearly = () => {
  const dispatch = useDispatch()
  const yearsToDisplay = useSelector(selectYearsToDisplay())
  const currentBookId = useSelector(selectCurrentBookId())
  const currentBook = useSelector(selectCurrentBook())

  useEffect(() => !currentBookId && dispatch(jumpToLatestYear()), [currentBookId])
  useEffect(() => dispatch(fetchBooksForYears(yearsToDisplay)), [currentBook])
  useEffect(() => dispatch(setSeed()), [])

  return (
    <HotKeysWrap>
      <div className='books-list'>
        <div className='books-list-shadow shadow-top'/>
        <div className='books-list-shadow shadow-bottom'/>
        <div className='books-list-shadow shadow-left'/>
        <div className='books-list-shadow shadow-right'/>

        <div className='side-scroll'>
          <YearsSlider/>
        </div>

        <div className='books-list-layer2'>
          <div className='books-list-layer3'>
            { yearsToDisplay.map(year =>
              <YearRow year={ year } key={ year }/>
            ) }
          </div>
        </div>
      </div>
    </HotKeysWrap>
  )
}

export default BooksListYearly