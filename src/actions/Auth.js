import { callApiLogin, callApiUpdate } from '../utils/apiCaller';

export const actLogin = user => ({
    type: 'LOGIN',
    user
});

export const actLoginErr = () => ({
    type: 'LOGIN_ERR'
});

export const actUpdate = user => ({
    type: 'UPDATE',
    user
});

export const actUpdateErr = () => ({
    type: 'UPDATE_ERR'
});

export const actLoginRequest = user => {
    return dispatch => {
        return callApiLogin(user)
            .then(res => {
                localStorage.setItem('username', res.data.user.username);
                localStorage.setItem('email', res.data.user.email);
                localStorage.setItem('avatar', res.data.user.avatar);
                localStorage.setItem('usertoken', res.data.token);
                dispatch(actLogin(res.data));
            })
            .catch(() => {
                dispatch(actLoginErr());
            });
    };
};

export const actUpdateRequest = user => {
    return dispatch => {
        return callApiUpdate(user)
            .then(res => {
                dispatch(actUpdate(res.data));
            })
            .catch(() => {
                dispatch(actUpdateErr());
            });
    };
};

export const actGetUser = () => {
    return dispatch => {
        dispatch(
            actLogin({
                username: localStorage.getItem('username'),
                email: localStorage.getItem('email'),
                avatar: localStorage.getItem('avatar'),
                usertoken: localStorage.getItem('usertoken')
            })
        );
    };
};

export const actLogout = () => {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        localStorage.removeItem('usertoken');
        dispatch(actLogin({ username: undefined, usertoken: undefined }));
    };
};
export const actCallbackLink = link => ({
    type: 'CALLBACK_LINK',
    link
});
