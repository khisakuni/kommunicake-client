import { connect } from 'react-redux'
import Header from './Header'
import { actions } from '../../reducers/auth' 

const mapStateToProps = ({ auth: { token, user } }) => ({ user, token })

export default connect(mapStateToProps)(Header)