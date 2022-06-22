import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import AuthorsNavList from 'widgets/navbar/components/AuthorsNavList'
import TagsNavList from 'widgets/navbar/components/TagsNavList'
import useUrlStore from 'store/urlStore'
import UrlStoreContext from 'store/urlStore/Context'
import { setAuthorsSearchKey, setTagsSearchKey } from 'widgets/navbar/actions'
import { selectTagIdBookmark, selectTagIdRead } from 'store/tags/selectors'

const PageNavbar = () => {
  const [{}, { gotoBooks }, { booksPath }] = useUrlStore()
  const { routes: { authorsPagePath, newAuthorPath, tagsPagePath, tagPagePath },
          actions: { openNewAuthorModal },
          routesReady } = useContext(UrlStoreContext)
  const dispatch = useDispatch()
  const tagIdBookmark = useSelector(selectTagIdBookmark())
  const tagIdRead = useSelector(selectTagIdRead())

  if (!routesReady) return null

  return (
    <Navbar bg='dark' variant='dark' fixed='top' expand>
      <Nav className='mr-auto'>
        <Nav.Link onClick={ () => gotoBooks() }><b>Infospace | Literature</b></Nav.Link>

        <NavDropdown title='Books'>
          <NavDropdown.Item href={ booksPath() }>List all</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ tagPagePath(tagIdBookmark) }>Bookmarked by me</NavDropdown.Item>
          <NavDropdown.Item href={ tagPagePath(tagIdRead) }>Read by me</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title='Authors' onClick={ () => dispatch(setAuthorsSearchKey('')) }>
          <AuthorsNavList/>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ authorsPagePath() }>List all</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ newAuthorPath() } onClick={ e => { e.preventDefault(); openNewAuthorModal() } }>
            +Author
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title='Tags'>
          <TagsNavList/>
          <NavDropdown.Divider />
          <NavDropdown.Item href={ tagsPagePath() }>List all</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title='Awards'>
          <NavDropdown.Item href={ '/awards/booker' }>Booker Prize</NavDropdown.Item>
          <NavDropdown.Item href={ '/awards/campbell' }>Campbell Awards</NavDropdown.Item>
          <NavDropdown.Item href={ '/awards/goodreads' }>Goodreads Choice</NavDropdown.Item>
          <NavDropdown.Item href={ '/awards/hugo' }>Hugo</NavDropdown.Item>
          <NavDropdown.Item href={ '/awards/nebula' }>Nebula</NavDropdown.Item>
          <NavDropdown.Item href={ '/awards/nytimes' }>NY Times Bestsellers</NavDropdown.Item>
          <NavDropdown.Item href={ '/awards/pulitzer' }>Pulitzer Prize</NavDropdown.Item>
          <NavDropdown.Item href={ '/awards/prosvetitel' }>Просветитель</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  )
}

export default PageNavbar
