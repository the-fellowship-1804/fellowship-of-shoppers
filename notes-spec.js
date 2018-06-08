//import mock store from something
//mock a thing???
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddeware from 'redux-thunk';
//import reducer from '/the-reducer/file'
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);
let reducer = () => 1;
//.simulate!!~~>~???????

describe(`thunk creators`, () => {
  let store;
  let mockAxios;

  const initialState = { user: {} };
});

describe(`reducer`, () => {
  it(`starts with the right initial state`, () => {
    const newState = reducer(undefined, `@@INIT`);
    expect(newState).to.deep.equal({});
  });

  it(`sets state to be a user on GET_USER axion`, () => {
    const gabe = { email: `gog@gog.gog` };
    const newState = reducer(
      {},
      getUser({
        gabe
      })
    );
    expect(newState).to.deep.equal(gabe);
  });
});
//fakeUser
//mockAxios(onGet('/auth/me')).replyOnce(200, fakeUser)

describe(`UserHome`, () => {
  let userHome;

  beforeEach(() => {
    userHome = shallow(<UserHome email="cody@email.com" />);
  });

  expect(userHome.find('h3').text()).to.equal('Welcome, cody@email.com');
  expect(
    shallow(<UserHome email="ggggg@g.g" />)
      .find('h3')
      .text()
  ).to.equal('Welcome, ggggg@g.g');
});
