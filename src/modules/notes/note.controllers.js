import Note from '../../../DB/models/note.model.js'
import User from '../../../DB/models/user.model.js'

export const createNote = async (req, res, next) => {
  const { userID, title, content } = req.body
  if (!userID || !title || !content) {
    return res.json({
      message: `userID, title and content should not be empty`,
    })
  }
  if (isNaN(Number(userID))) {
    return res.json({
      message: `userID Wrong`,
    })
  }
  const isUserExisted = await User.findOne({ where: { id: userID } })
  if (!isUserExisted) {
    return res.json({
      message: `userID is wrong, there's no user with this id ${userID}`,
    })
  }
  const newNote = await Note.create({
    tblUserId: userID,
    title,
    content,
  })

  if (!newNote._options.isNewRecord) {
    return res.json({
      message: 'Something is wrong has been happened plz try again',
    })
  }
  res.json({
    message: 'Added Successfully',
    status: 200,
  })
}
export const getNotes = async (req, res, next) => {
  const notes = await Note.findAll()

  res.json({
    message: `All Notes`,
    notes: notes.length ? notes : 'No Notes',
  })
}
export const deleteNote = async (req, res, next) => {
  const { noteID, userID } = req.params
  if (!noteID || !userID) {
    return res.json({
      message: `noteID and userID should be sent in url `,
    })
  }
  const note = await Note.findOne({
    where: { id: noteID },
    include: { model: User, where: { id: userID } },
  })
  if (!note) {
    return res.json({
      message: `There's no note with id ${noteID} and user ID ${userID}`,
    })
  }
  note
    .destroy() // soft - deletion
    .then((result) => {
      return res.json({
        message: `Note has been deleted successfully`,
      })
    })
    .catch((err) => {
      return res.json({
        message: `Note hasn't been deleted successfully`,
        err,
      })
    })
}

export const updateNote = async (req, res, next) => {
  const { title, content } = req.body
  const { noteID, userID } = req.params

  if (!noteID || !userID || !title || !content) {
    return res.json({
      message: `title and content should not be empty and send Note ID and User ID in url`,
    })
  }
  if (isNaN(Number(userID))) {
    return res.json({
      message: `userID should be number`,
    })
  }

  const isUserExisted = await User.findOne({ where: { id: userID } })
  if (!isUserExisted) {
    return res.json({
      message: `userID is wrong, there's no user with this id ${userID}`,
    })
  }

  const isNoteExisted = await Note.findOne({
    where: { id: noteID },
    include: { model: User, where: { id: userID } },
  })
  if (!isNoteExisted) {
    return res.json({
      message: `There's no note with id ${noteID} and user ID ${userID}`,
    })
  } else {
    title && (isNoteExisted.title = title)
    content && (isNoteExisted.content = content)
    isNoteExisted.save()
    return res.json({
      message: 'Note has been updated Successfully',
    })
  }
}

export const getNotesWithUsers = async (req, res, next) => {
  const notes = await Note.findAll({
    include: { model: User },
  })
  res.json({
    message: 'Notes with their Users',
    notes: notes.length ? notes : 'No Notes',
  })
}
