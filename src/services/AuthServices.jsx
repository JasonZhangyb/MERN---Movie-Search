export default {

    // user registration
    register: user => {
        return fetch('/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },

    // user login
    login: user_input => {
        return fetch('/user/login', {
            method: 'post',
            body: JSON.stringify(user_input),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return {isAuthenticated: false};
        });
    },

    // user logout
    logout: () => {
        return fetch('/user/logout')
            .then(res => res.json())
            .then(data => data);
    },

    // user authentication information
    isAuthenticated: () => {
        return fetch('/user/authenticated').then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return {isAuthenticated: false};
        });
    },

    // create collection
    addCollection: (user_input) => {
        return fetch('/user/collection', {
            method: 'post',
            body: JSON.stringify(user_input),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json().then(data => data);
        });
    },

    // delete an entire collection
    deleteCollection: (user_input) => {
        return fetch('/user/collection', {
            method: 'delete',
            body: JSON.stringify(user_input),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json().then(data => data);
        });
    },

    // delete a movie from specified collection
    deleteMovie: (user_input) => {
        return fetch('/user/movie', {
            method: 'delete',
            body: JSON.stringify(user_input),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json().then(data => data);
        });
    },

    // get all collections for current user
    getCollections: () => {
        return fetch('/user/collections').then(res => {
            return res.json().then(data => data);
        });
    }
}