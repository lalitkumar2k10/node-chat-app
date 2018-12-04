[{
    id: '237yg',
    name: 'Lalit',
    room: 'Office'
}]

class Users{
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        // ret that was removed
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=> user.id !== id);
        }
        return user;
    }
    getUser(id){
        // no match->undefined
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}
// adduser(id, name, room)
// removeUser(id)
// getuser(id)
// getUserList(room)

// not using be
// var users = [];

// var addUser = (id, name, room)=>{
//     users.push({})
// }
class Person{
    constructor(name, age){
        // console.log(name, age);
        this.name=name;
        this.age=age;
    }
    getUserDetail(){
        return `${this.name} is ${this.age} years old.`;
    }
}

var me = new Person('Lks', 23);
var detail = me.getUserDetail();
console.log(detail);

module.exports = {Users};