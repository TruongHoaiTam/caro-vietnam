import { connect } from 'react-redux';
import Login from '../components/Login';
import { actLoginRequest, actGetUser, actLogout, actCallbackLink, actLoginFacebookRequest, actLoginGoogleRequest } from '../actions/Auth';

const mapStateToProps = state => ({
    username: state.Auth.username,
    usertoken: state.Auth.usertoken,
    err: state.Auth.err,
    callbackLink: state.Auth.callbackLink,

    token: state.Auth.token
});

const mapDispatchToProps = dispatch => ({

    actLoginRequest: (user) => {
        dispatch(actLoginRequest(user));
    },

    actGetUser: () => {
        dispatch(actGetUser());
    },

    actLogout: () => {
        dispatch(actLogout());
    },

    actCallbackLink: link => {
        dispatch(actCallbackLink(link));
    },

    actLoginFacebookRequest: options => {
        dispatch(actLoginFacebookRequest(options));
    },

    actLoginGoogleRequest: options => {
        dispatch(actLoginGoogleRequest(options));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
