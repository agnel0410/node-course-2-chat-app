const expect= require('expect')
const {Users}=require('./users')

describe('Test Users Class',()=>{
  var users

  beforeEach(()=>{
    users = new Users()
    users.users = [{
      id:'1',
      name:'Mike',
      room: 'Node Course'
    }, {
    id:'2',
    name: 'Jen',
    room: 'React Course'
    }, {
    id: '3',
    name: 'Julie',
    room: 'Node Course'
    }]
  })

  it('addUser() - should add new user to Users Array',()=>{
    const users = new Users()
    let user = {
      id: 123456,
      name: 'Agnel',
      roomName: 'A'
    }
    let res= users.addUser(user.id,user.name,user.roomName)
    expect(users.users).toEqual([user])
  })

   it('removeUser - should remove a user from the Users Array',()=>{
     let res = users.removeUser('1')
     expect(res.id).toBe('1')
   })

   it('removeUser - should not remove a user from the Users Array', () => {
    let res = users.removeUser('5')
     expect(res).toBe(undefined)
   })


  it('getUser() - should return a user for given ID',()=>{
    const res = users.getUser('2')
    expect(res).toBeA('object')
    expect(res.name).toBe('Jen')
  })

  it('getUser() - should not return a user for given ID', () => {
    const res = users.getUser(1)
    expect(res).toBe(undefined)
  })

  it('getUserList() - should return the users list from the users Array',()=>{
    const res = users.getUserList('Node Course')
    expect(res).toEqual(['Mike','Julie'])
  })


})
