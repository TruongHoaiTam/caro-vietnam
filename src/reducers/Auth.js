const initState = {
    username: undefined,
    email: undefined,
    avatar: undefined,
    usertoken: undefined,
    err: undefined,
    callbackLink: undefined,

    token: ''
};

export default function auth(state = initState, action) {
    switch (action.type) {
        case 'LOGIN':
            state = {
                ...state,
                username: action.user.username,
                email: action.user.email,
                avatar: action.user.avatar,
                usertoken: action.user.token,
                err: undefined
            };
            return state;
        case 'LOGIN_ERR': {
            state = {
                ...state,
                username: undefined,
                email: undefined,
                avatar: undefined,
                usertoken: undefined,
                err: 400
            };
            return state;
        }
        case 'UPDATE':
            state = {
                ...state,
                username: action.user.username,
                email: action.user.email,
                avatar: action.user.avatar,
                usertoken: action.user.token,
                err: undefined
            };
            return state;
        case 'UPDATE_ERR': {
            state = {
                ...state,
                username: undefined,
                email: undefined,
                avatar: undefined,
                usertoken: undefined,
                err: 400
            };
            return state;
        }
        case 'CALLBACK_LINK': {
            state = {
                ...state,
                callbackLink: action.link
            }
            return state;
        }
        case 'SET_STATE_LOGIN': {
            state = {
                ...state,
                token: action.values.token,

                username: action.values.user.username,
                email: action.values.user.email,
                err: undefined
            }
            return state;
        }

        default:
            return state;
    }
}
