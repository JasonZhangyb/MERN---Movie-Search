const generateUser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        users.push({
            email: "a" + i + "@gmail.com",
            username: "a" + i,
            password: "123456",
            cookie: ""
        })
    }
    return users
};

module.exports = generateUser;
