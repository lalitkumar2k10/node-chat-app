const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'lks',
            room: 'A'
        },{
            id: '2',
            name: 'raj',
            room: 'B'
        },{
            id: '3',
            name: 'Mayank',
            room: 'A'
        },
        ]
    });

    it('should add new user',()=>{
        var users = new Users();
        var user = {
            id:123,
            name:'lks',
            room:'ofiice'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        // assertions
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', ()=>{
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not re,move user',()=>{
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user',()=>{
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user',()=>{
        var userId = '9';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it('ret name of A room', ()=>{
        var userList = users.getUserList('A');
        // assert
        expect(userList).toEqual(['lks','Mayank']);
    });

    it('ret name of B room', ()=>{
        var userList = users.getUserList('B');
        // assert
        expect(userList).toEqual(['raj']);
    });
});