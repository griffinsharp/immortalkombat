import { connect } from "react-redux";
import leaderboard from "./leaderboard";

const mapStateToProps = (state) => ({
    currentUser: state.session.user
});

export default connect(mapStateToProps)(leaderboard);
