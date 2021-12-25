import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col } from 'react-bootstrap'

import { setupStoreForAuthorPage } from 'pages/authorPage/actions'
import { selectNextBookId } from 'widgets/booksList/selectors'
import { setNextBookId } from 'widgets/booksList/actions'
import { setCurrentBookId } from 'store/axis/actions'
import { selectCurrentBookId } from 'store/axis/selectors'
import usePageUrlStore from 'pages/authorPage/usePageUrlStore'

import Layout from 'pages/Layout'
import AuthorCard from 'widgets/authorCard/AuthorCard'
import BatchControls from 'widgets/booksList/components/BatchControls'
import BooksList from 'widgets/booksList/BooksList'

const AuthorPage = () => {
  const [{ authorId, bookId }, { addBookWidget }] = usePageUrlStore()
  const currentBookId = useSelector(selectCurrentBookId())
  const nextBookId = useSelector(selectNextBookId())
  const dispatch = useDispatch()

  useEffect(() => dispatch(setCurrentBookId(bookId)), [bookId])
  useEffect(() => dispatch(setupStoreForAuthorPage(authorId, bookId)), [authorId])
  useEffect(() => {
    if (!nextBookId) { return }

    addBookWidget(nextBookId)
    dispatch(setNextBookId(null))
  }, [nextBookId])

  return (
    <Layout>
      <Col xs={ 4 }>
        <BatchControls/>
        <AuthorCard authorId={ authorId }/>
      </Col>
      <Col xs={ 8 }>
        <BooksList/>
      </Col>
    </Layout>
  )
}

export default AuthorPage
