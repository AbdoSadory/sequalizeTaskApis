import { Router } from 'express'
import * as noteControllers from './note.controllers.js'

const router = Router()

router.get('/notes', noteControllers.getNotes)
router.get('/notesWithUsers', noteControllers.getNotesWithUsers)

router
  .route('/note/:noteID/user/:userID')
  .delete(noteControllers.deleteNote)
  .put(noteControllers.updateNote)

router.post('/createNote', noteControllers.createNote)

export default router
