import axios from 'axios';
// eslint-disable-next-line camelcase
const api_url = 'https://api-caro-vietnam.herokuapp.com';

export function callApiLogin(body) {
    return axios({
        method: 'POST',
        // eslint-disable-next-line camelcase
        url: `${api_url}/user/login`,
        data: {
            username: body.username,
            password: body.password
        }
    });
}
export function callApiRegister(body) {
    return axios({
        method: 'POST',
        // eslint-disable-next-line camelcase
        url: `${api_url}/user/register`,
        data: {
            username: body.username,
            password: body.password,
            email: body.email,
            avatar: body.update
        }
    });
}

export function callApiUpdate(body) {
    return axios({
        method: 'POST',
        headers: {
            Authorization: `Bearer ${body.usertoken}`
        },
        // eslint-disable-next-line camelcase
        url: `${api_url}/user/update`,
        data: {
            username: body.username,
            password: body.password,
            email: body.email,
            avatar: body.update
        }
    });
}
