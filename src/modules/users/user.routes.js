import { Router } from 'express'
import * as userController from './user.controllers.js'

const router = Router()

router.post('/signUp', userController.signUp)
router.get('/signIn', userController.signIn)
router
  .route('/user/:id')
  .put(userController.updateUser)
  .delete(userController.deleteUser)
router.get(
  '/filterUsersStartWithAandAgeLessThan30',
  userController.getUsersStartWithAandAgeLessThan30
)
router.get('/filterUsersBetweenAges', userController.getUsersBetweenAges)
router.get('/oldestUsers', userController.getOldestThreeUsers)
router.get('/usersWithIds', userController.getUsersWithIds)
router.get('/users', userController.getUsers)

export default router
