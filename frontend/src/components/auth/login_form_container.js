import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import Login from "./Login";

const mapStateToProps = state => {
	return {
		errors: state.errors.session
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: user => dispatch(login(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
