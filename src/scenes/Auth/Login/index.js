import { connect } from 'react-redux'
import Login from './Login'

import { actionCreators } from '../../../reducers/auth'

const mapStateToProps = state => state

const mapDispatchToProps = {
  login: actionCreators.login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)