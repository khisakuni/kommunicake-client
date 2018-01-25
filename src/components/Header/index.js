import { connect } from 'react-redux'
import Header from './Header'

const mapStateToProps = ({ auth: { token, user } }) => ({ user, token })

export default connect(mapStateToProps)(Header)