/* global describe beforeEach it */

import { expect } from 'chai';
import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SingleUser } from './SingleUser';
import { getProducts } from '../store/allProducts';

const adapter = new Adapter();
enzyme.configure({ adapter });

describe('SingleUser', () => {
  let singleUser;
  let testUser = {
    email: 'cody@email.com',
    imageUrl: 'www.myimage.com',
    address: 'Dog House'
  };

  beforeEach(() => {
    singleUser = shallow(
      <SingleUser getProducts={getProducts} user={testUser} />
    );
  });

  it('renders the email in an h3', () => {
    expect(singleUser.find('h3').text()).to.be.equal('Welcome, cody@email.com');
  });

  it('renders the address in an h4', () => {
    expect(singleUser.find('h4').text()).to.be.equal('Your Address: Dog House');
  });

  it('when clicked, toggles Boolean value of displayHistory on state', () => {
    singleUser
      .find('button')
      .last()
      .simulate('click');
    expect(singleUser.state().displayHistory).to.be.equal(true);
  });
});
