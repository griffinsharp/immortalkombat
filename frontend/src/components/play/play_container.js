import { connect } from "react-redux";
import Play from "./play";
import { addGameRoom } from "../../actions/game_actions";

const mapStateToProps = state => {
	return {
		currentUser: state.session.user
	};
};

const mapDispatchToProps = dispatch => ({
	addGameRoom: room => dispatch(addGameRoom(room))
});

export default connect(mapStateToProps, mapDispatchToProps)(Play);
