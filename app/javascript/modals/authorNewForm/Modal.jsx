import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

import AuthorForm from 'modals/AuthorEditModal/Form'
import UrlStoreContext from 'store/urlStore/Context'

const AuthorNewModal = () => {
  const { pageState: { modalAuthorNewShown }, actions: { closeModal, gotoAuthorBooks } } = useContext(UrlStoreContext)

  const handleSuccess = (data) => {
    const { id: newAuthorId } = data
    closeModal()
    gotoAuthorBooks(newAuthorId)
  }

  return (
    <Modal show={ modalAuthorNewShown } onHide={ () => closeModal() } size='lg' centered backdropClassName='book-modal-backdrop'>
      <Modal.Header>
        <Modal.Title>New author</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthorForm id='author_details_form' authorFull={ { new: true } } onSubmit={ (data) => handleSuccess(data) }/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => closeModal()}>
          Close
        </Button>
        <Button variant='primary' form='author_details_form' type='submit'>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AuthorNewModal