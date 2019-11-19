import { connect } from "react-redux";
import Play from "./play";

const mapStateToProps = state => {
	return {
		currentUser: state.session.user
	};
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
