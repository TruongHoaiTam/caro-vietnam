import { connect } from 'react-redux';
import Login from '../components/Login';
import { actLoginRequest, actGetUser, actLogout, actCallbackLink } from '../actions/Auth';

const mapStateToProps = state => ({
    username: state.Auth.username,
    usertoken: state.Auth.usertoken,
    err: state.Auth.err,
    callbackLink: state.Auth.callbackLink
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
