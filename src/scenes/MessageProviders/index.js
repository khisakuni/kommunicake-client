import { connect } from 'react-redux'
import MessageProvidersList from './MessageProvidersList'
import { actionCreators } from '../../reducers/message-providers'

const mapStateToProps = state => ({ messageProviders: state.messageProviders.list })

const mapDispatchToProps = {
  getMessageProviders: actionCreators.getMessageProviders,
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageProvidersList)