import {connect} from "react-redux";
import Controller from './controller';

const mapStateToProps = (state) => ({
    currentUser: state.session.user,
    game: state.game
})

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Controller);


