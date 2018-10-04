// const users=[{
//   socketid,
//   name,
//   roomName
// }]

//addUser
//removeUser
//getUser
//getUserList


class Users {
  constructor () {
    this.users=[]
  }
   addUser (id,name,roomName) {
    let user ={id,name,roomName}
    this.users.push(user)
    return user
  }

  removeUser(id){
    //remove the user from the Array
    let user = this.getUser(id)

    if(user){
      this.users = this.users.filter((user) => user.id !== id)
    }
    return user
  }

  getUser(id){
    return this.users.filter((user)=>user.id === id)[0]
  }

  getUserList(room){
    //return all users ['agnel','yvonne','shan']
    const usersList = this.users.filter((user)=>user.roomName === room)
    const namesArray = usersList.map((user)=> user.name)
    return namesArray
  }
}


module.exports={Users}