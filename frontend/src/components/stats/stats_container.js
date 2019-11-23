import { connect } from "react-redux";
import stats from "./stats";

const mapStateToProps = (state) => ({
        currentUser: state.session.user
});

export default connect(mapStateToProps)(stats);
