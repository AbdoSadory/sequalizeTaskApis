import express from 'express'
import { connectDB } from './DB/connection.js'
import User from './DB/models/user.model.js'
import Note from './DB/models/note.model.js'
import userRouter from './src/modules/users/user.routes.js'
import noteRouter from './src/modules/notes/note.routes.js'
import fillingDummyData from './src/utils/fillingDummyData.js'

const app = express()

app.use(express.json())

User.hasMany(Note)
Note.belongsTo(User)

app.use(userRouter)
app.use(noteRouter)

app.use('*', (req, res, next) => {
  res.json({ message: 'Invalid URL' })
})
connectDB()
// .then((res) => fillingDummyData()) // for populate the db with dummy data 👌
// .then((res) => console.log('🔥🔥🔥 Done Adding Dummy Data 🔥🔥🔥'))
// .catch((err) => console.log('🔴🔴🔴', err))
app.listen(3000, () => {
  console.log('Server is running on 3000 🔥🔥🔥')
})
