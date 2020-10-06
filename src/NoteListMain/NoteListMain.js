import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const folder_id = this.props.match.params.folderId
    const { notes = [] } = this.context
    const notesForFolder = getNotesForFolder(notes, folder_id)
    return (
      <ApiContext.Consumer>
        {value =>
          <section className='NoteListMain'>
            <ul>
              {notesForFolder.map(note =>
                <li key={note.id}>
                  <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    content={note.content}
                  />
                </li>
              )}
            </ul>
            <div className='NoteListMain__button-container'>
              <CircleButton
                tag={Link}
                to='/add-note'
                type='button'
                className='NoteListMain__add-note-button'
              >
                <FontAwesomeIcon icon='plus' />
                <br />
            Note
          </CircleButton>
            </div>
          </section>
        }
      </ApiContext.Consumer>
    )
  }
}
