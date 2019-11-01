import { connect } from 'react-redux';
import Update from '../components/Update';
import { actUpdateRequest, actGetUser, actLogout } from '../actions/Auth';

const mapStateToProps = state => ({
    username: state.Auth.username,
    email: state.Auth.email,
    avatar: state.Auth.avatar,
    usertoken: state.Auth.usertoken,
    err: state.Auth.err,
    callbackLink: state.Auth.callbackLink
});

const mapDispatchToProps = dispatch => ({

    actUpdateRequest: (user) => {
        dispatch(actUpdateRequest(user));
    },

    actGetUser: () => {
        dispatch(actGetUser());
    },

    actLogout: () => {
        dispatch(actLogout());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Update);
