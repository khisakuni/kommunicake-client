import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Link } from 'react-router-dom'
import Header from './Header'

Enzyme.configure({ adapter: new Adapter() })

function setup(props = {}) {
  return shallow(
    <Header {...props} />
  )
}

describe('<Header />', () => {
  it('should render signup link if user is not logged in', () => {
    const wrapper = setup()

    expect(wrapper.contains(<Link to="/signup">Sign Up</Link>)).toBe(true)
  })

  it('should render login link if user is not logged in', () => {
    const wrapper = setup()

    expect(wrapper.contains(<Link to="/login">Log In</Link>)).toBe(true)
  })

  it('should not render register link if user is logged in', () => {
    const wrapper = setup({ user: { name: 'kohei' }, token: 'token' })

    expect(wrapper.contains(<Link to="/signup">Sign Up</Link>)).toBe(false)
  })

  it('should not render login link if user is logged in', () => {
    const wrapper = setup({ user: { name: 'kohei' }, token: 'token' })

    expect(wrapper.contains(<Link to="/login">Log In</Link>)).toBe(false)
  })
})