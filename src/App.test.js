import React from 'react';
import ReactDOM from 'react-dom';
import App, { Link } from './App';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json';

configure({adapter: new Adapter()})


describe('<App/> shallow rendering', () => {

  it('ul has 3 li elements', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.find('ul').children().length).toBe(3)
  })
  it('matches the snapshot', () => {
    const tree = shallow(<App/>)
    expect(toJson(tree)).toMatchSnapshot()
  })
  it('updates className with new State', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.blue').length).toBe(1)
    wrapper.setState({mainColor: 'red'})
    expect(wrapper.find('.red').length).toBe(1)
    expect(wrapper.find('.blue').length).toBe(0)
  })
  it('on button click changes p text', () => {
    const wrapper = shallow(<App />)
    const button = wrapper.find('button')
    expect(wrapper.find('.button-state').text()).toBe('No!')
    button.simulate('click')
    expect(wrapper.find('.button-state').text()).toBe('Yes!')
  })
  it('on input change, title changes text', () =>{
    const wrapper = shallow(<App />)
    const input = wrapper.find('input')
    expect(wrapper.find('h2').text()).toBe('')
    input.simulate('change', {target: {value: 'Tyler'}})
    expect(wrapper.find('h2').text()).toBe('Tyler')
  })
  it('calls componentDidMount', () => {
    jest.spyOn(App.prototype,  'componentDidMount')
    const wrapper = shallow(<App />)
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
  })

  it('setProps calls componentWillReceiveProps', () => {
    jest.spyOn(App.prototype, 'componentWillReceiveProps')
    const wrapper = shallow(<App />)
    wrapper.setProps({ hide: true })
    expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)
    // expect(wrapper.find('.lifeCycle').text()).toBe('componentWillReceiveProps')
  })

  it('handleStrings function returns correctly', () => {
    const wrapper = shallow(<App />)
    const trueReturn = wrapper.instance().handleStrings('Hello World')
    expect(trueReturn).toBe(true)
  })
})

describe('<App/> mount rendering', () => {

  it('ul has 3 li elements', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('ul').children().length).toBe(3)
    wrapper.unmount()
  })
  it('matches the snapshot', () => {
    const tree = mount(<App />)
    expect(toJson(tree)).toMatchSnapshot()
    tree.unmount()
  })

})

describe('<Link />', () => {

  it('link component accepts prop', () => {

    const wrapper = shallow(<Link address='www.google.com' />)
    expect(wrapper.instance().props.address).toBe('www.google.com')
  })

  it('a tag renders href correctly', () => {

    const wrapper = shallow(<Link address='www.google.com' />)
    expect(wrapper.props().href).toBe('www.google.com')
    
  })
  it('setProps works', () => {

    const wrapper = shallow(<Link address='www.google.com' />)
    wrapper.setProps({ address: 'www.yahoo.com' })
    // console.log(wrapper.get(0))
    expect(wrapper.props().href).toBe('www.yahoo.com')

  })
  
})

// describe('<Link />', () => {
//   const wrapper = shallow(<Link address= 'www.google.com' />)
//   expect(wrapper.instance().props.address).toBe('www.google.com')
// })

// it('renders without crashing', () => { 
//     const div =document.createElement('div');   
//     ReactDOM.render(<App />, div);
// ReactDOM.unmountComponentAtNode(div); });