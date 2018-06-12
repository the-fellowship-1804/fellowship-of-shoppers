import React from 'react';
import { createStore } from 'redux';
import chai, { expect } from 'chai';
// import chaiEnzyme from 'chai-enzyme';
// chai.use(chaiEnzyme());
import enzyme, { shallow } from 'enzyme';
import { aCC, reducer } from '../store';
import faker from 'faker';
import { AllProducts } from './AllProducts';
import Adapter from 'enzyme-adapter-react-16';
import { getProducts } from '../store/allProducts';

const adapter = new Adapter();
enzyme.configure({ adapter });

const [UNASKED, LOADING, LOADED, ERROR] = [
  'UNASKED',
  'LOADING',
  'LOADED',
  'ERROR'
];

describe.only('Frontend tests', () => {
  describe('Can render a thing', () => {
    let messageWrapper;
    before('Create <AllProducts /> wrapper', () => {
      const productData = [
        { id: 1, name: 'The Death Star' },
        { id: 2, name: 'Enterprise-D' }
      ];
      messageWrapper = shallow(
        <AllProducts
          products={productData}
          status="LOADED"
          getProducts={getProducts}
        />
      );
    });
    it('exists!!', () => {
      expect(messageWrapper.find('div'));
    });
    it('does a second thing!!', () => {
      console.log('2ndthing', messageWrapper.find('h2'));
      expect(messageWrapper.find('h2')).to.have('All Products');
    });
  });
});
