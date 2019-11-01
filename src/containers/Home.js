import { connect } from 'react-redux';
import Home from '../components/Home';
import { actLogout, actGetUser, actCallbackLink } from '../actions/Auth'

const mapStateToProps = state => ({
    username: state.Auth.username,
    email: state.Auth.email,
    avatar: state.Auth.avatar,
    usertoken: state.Auth.usertoken
});

const mapDispatchToProps = dispatch => ({

    actLogout: () => {
        dispatch(actLogout());
    },

    actGetUser: () => {
        dispatch(actGetUser());
    },

    actCallbackLink: link => {
        dispatch(actCallbackLink(link));
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
