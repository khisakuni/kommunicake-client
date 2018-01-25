import { connect } from 'react-redux'
import MessageProvidersList from './MessageProvidersList'

const mapStateToProps = () => ({ messageProviders: [{ messageProviderType: 'bar'}] })

export default connect(mapStateToProps)(MessageProvidersList)