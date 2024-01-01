import { Op } from 'sequelize'
import User from '../../../DB/models/user.model.js'

export const signUp = async (req, res, next) => {
  const { name, email, age, password } = req.body
  if (!name || !email || !age || !password) {
    return res.json({ message: "name, email, age and password can't be empty" })
  }

  const isUserExisted = await User.findOne({ where: { email } })
  if (isUserExisted) {
    return res.json({ message: 'User is already existed' })
  }

  const newUser = await User.create({ name, email, password, age })
  if (!newUser._options.isNewRecord) {
    return res.json({
      message: 'Something is wrong has been happened plz try again',
    })
  }
  res.json({
    message: 'Added Successfully',
    status: 200,
  })
}

export const signIn = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.json({ message: "email and password can't be empty" })
  }
  const isUserExisted = await User.findOne({ where: { email } })
  if (isUserExisted) {
    if (isUserExisted.dataValues.password == password) {
      const { id, name, email, age } = isUserExisted.dataValues
      return res.json({
        message: 'user',
        user: { id, name, email, age },
      })
    } else {
      return res.json({ message: 'Password is wrong' })
    }
  } else {
    return res.json({ message: 'Wrong Email Address' })
  }
}

export const updateUser = async (req, res, next) => {
  const { name, email, age, password } = req.body
  const { id } = req.params
  if (!name || !email || !age || !password) {
    return res.json({ message: "name, email, age and password can't be empty" })
  }

  const isUserExisted = await User.findOne({ where: { id } })
  if (!isUserExisted) {
    return res.json({ message: 'Invalid ID' })
  } else {
    isUserExisted.name != name && (isUserExisted.name = name)
    isUserExisted.email != email && (isUserExisted.email = email)
    isUserExisted.age != age && (isUserExisted.age = age)
    isUserExisted.password != password && (isUserExisted.password = password)
    isUserExisted.save()

    return res.json({
      message: 'User has been updated successfully',
    })
  }
}
export const deleteUser = async (req, res, next) => {
  const { id } = req.params
  const isUserExisted = await User.findOne({ where: { id } })
  if (!isUserExisted) {
    return res.json({ message: 'Invalid ID' })
  } else {
    await User.destroy({ where: { id } }) // soft-deletion
    //  await User.destroy({ where: { id },force:true }) // hard-deletion
    return res.json({
      message: 'User has been deleted successfully',
    })
  }
}

export const getUsersStartWithAandAgeLessThan30 = async (req, res, next) => {
  const { nameStartsWith, ageLessThan } = req.query
  if (!nameStartsWith || !ageLessThan) {
    return res.json({
      message: 'nameStartsWith and ageLessThan should be sent and not empty',
    })
  }

  const users = await User.findAll({
    where: {
      name: {
        [Op.like]: `${nameStartsWith}%`,
      },
      age: {
        [Op.lt]: ageLessThan,
      },
    },
  })

  res.json({
    message: `Users start with '${nameStartsWith}' and age less than ${ageLessThan}`,
    users: users.length ? users : 'No Users',
  })
}

export const getUsersBetweenAges = async (req, res, next) => {
  const { agesLimit } = req.query
  if (!agesLimit || agesLimit.split(',').length != 2) {
    return res.json({
      message: 'agesLimit should be sent in query with only 2 numbers',
    })
  }

  const users = await User.findAll({
    where: {
      age: {
        [Op.between]: agesLimit.split(','),
      },
    },
  })

  res.json({
    message: `Users with ages [${agesLimit}]`,
    users: users.length ? users : 'No Users',
  })
}

export const getOldestThreeUsers = async (req, res, next) => {
  const { numberOldestUsers } = req.query
  if (!numberOldestUsers) {
    return res.json({
      message: 'numberOldestUsers should be sent in query',
    })
  }
  if (isNaN(Number(numberOldestUsers))) {
    return res.json({
      message: 'numberOldestUsers should be Number',
    })
  }

  const users = await User.findAll({ order: [['age', 'DESC']] })

  res.json({
    message: `Top ${numberOldestUsers} Oldest Users`,
    users: users.length
      ? users.slice(0, parseInt(numberOldestUsers))
      : 'No Users',
  })
}

export const getUsersWithIds = async (req, res, next) => {
  const { ids } = req.query
  if (!ids) {
    return res.json({
      message: 'ids should be sent in query',
    })
  }

  const users = await User.findAll({
    where: {
      id: {
        [Op.in]: ids.split(','),
      },
    },
  })

  res.json({
    message: `Users with ids [${ids}]`,
    users: users.length ? users : 'No Users',
  })
}

export const getUsers = async (req, res, next) => {
  const users = await User.findAll()

  res.json({
    message: `All Users`,
    users: users.length ? users : 'No Users',
  })
}
