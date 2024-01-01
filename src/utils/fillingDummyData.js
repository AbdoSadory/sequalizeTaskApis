import Note from '../../DB/models/note.model.js'
import User from '../../DB/models/user.model.js'

const fillingDummyData = async () => {
  await User.bulkCreate([
    {
      name: 'Abdo',
      email: 'abdo@example.com',
      password: '123456',
      age: 25,
    },
    {
      name: 'Mohamed',
      email: 'mo@example.com',
      password: '123456',
      age: 35,
    },
    {
      name: 'Ahmed',
      email: 'ahmed@example.com',
      password: '123456',
      age: 40,
    },
    {
      name: 'Ali',
      email: 'ali@example.com',
      password: '123456',
      age: 70,
    },
  ])
  await Note.bulkCreate([
    {
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      content:
        'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      tblUserId: 1,
    },
    {
      title: 'qui est esse',
      content:
        'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque',
      tblUserId: 2,
    },
    {
      title: 'ea molestias quasi exercitationem',
      content:
        'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad',
      tblUserId: 3,
    },
    {
      title: 'eum et est occaecati',
      content:
        'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum',
      tblUserId: 4,
    },
    {
      title: 'nesciunt quas odio',
      content:
        'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est',
      tblUserId: 1,
    },
  ])
}

export default fillingDummyData
