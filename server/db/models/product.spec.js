const { expect } = require('chai');
const db = require('../index');
const Product = db.model('product');
const lI = require('lorem-ipsum');

describe('Product model', () => {
  describe('Basic functionality for Product model', () => {
    it('The model exists', () => expect(Product).not.to.be.an('undefined'));
  });
  describe('Each desired column exists', () => {
    let TP;
    before(async () => {
      try {
        await db.sync({ force: true });
        TP = await Product.create();
      } catch (error) {
        console.log(error);
      }
    });
    it('has a "name" column', () => expect(TP.name).not.to.be.an('undefined'));
    it('has a "imageUrl" column', () =>
      expect(TP.imageUrl).not.to.be.an('undefined'));
    it('has a "price" column', () =>
      expect(TP.price).not.to.be.an('undefined'));
    it('has a "weight" column', () =>
      expect(TP.weight).not.to.be.an('undefined'));
    it('has a "length" column', () =>
      expect(TP.length).not.to.be.an('undefined'));
    it('has a "width" column', () =>
      expect(TP.width).not.to.be.an('undefined'));
    it('has a "depth" column', () =>
      expect(TP.depth).not.to.be.an('undefined'));
    it('has a "diameter" column', () =>
      expect(TP.diameter).not.to.be.an('undefined'));
    it('has a "topSpeed" column', () =>
      expect(TP.topSpeed).not.to.be.an('undefined'));
    it('has a "acceleration" column', () =>
      expect(TP.acceleration).not.to.be.an('undefined'));
    it('has a "class" column', () =>
      expect(TP.class).not.to.be.an('undefined'));
    it('has a "crew" column', () => expect(TP.crew).not.to.be.an('undefined'));
    it('has a "firepower" column', () =>
      expect(TP.firepower).not.to.be.an('undefined'));
    it('has a "description" column', () =>
      expect(TP.description).not.to.be.an('undefined'));
  });

  describe('Each column accepts only the correct data types', () => {
    let TP;
    before(async () => {
      try {
        await db.sync({ force: true });
        TP = await Product.create();
      } catch (error) {
        console.log(error);
      }
    });

    it(`"name" column accepts only strings`, async () => {
      let testVal;
      try {
        await TP.update({ name: [] });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"imageUrl" column accepts only strings`, async () => {
      let testVal;
      try {
        await TP.update({ imageUrl: [] });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"price" column accepts only numbers`, async () => {
      let testVal;
      try {
        await TP.update({ price: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"weight" column accepts only numbers`, async () => {
      let testVal;
      try {
        await TP.update({ weight: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"length" column accepts only numbers`, async () => {
      let testVal;
      try {
        await TP.update({ length: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"width" column accepts only numbers`, async () => {
      let testVal;
      try {
        await TP.update({ width: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"depth" column accepts only numbers`, async () => {
      let testVal;
      try {
        await TP.update({ depth: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"diameter" column accepts only numbers`, async () => {
      let testVal;
      try {
        await TP.update({ diameter: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"topSpeed" column accepts only numbers`, async () => {
      let testVal;
      try {
        await TP.update({ topSpeed: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"acceleration" column accepts only numbers`, async () => {
      let testVal;
      try {
        await TP.update({ acceleration: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"class" column accepts only strings`, async () => {
      let testVal;
      try {
        await TP.update({ class: [] });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"cew" column accepts only integers`, async () => {
      let testVal;
      try {
        await TP.update({ crew: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"firepower" column accepts only integers`, async () => {
      let testVal;
      try {
        await TP.update({ firepower: 'string' });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"description" column accepts only strings`, async () => {
      let testVal;
      try {
        await TP.update({ description: [] });
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.be.an('error');
    });

    it(`"description" column can accept long strings`, async () => {
      let testVal;
      try {
        await TP.update({
          description: lI({
            count: 1,
            units: 'paragraphs',
            paragraphLowerBound: 1000,
            format: 'plain'
          })
        });
        testVal = 'success';
      } catch (error) {
        testVal = error;
      }
      expect(testVal).to.equal('success');
    });
  });
});

console.log(
  lI({
    count: 1,
    units: 'paragraphs',
    paragraphLowerBound: 10000,
    format: 'plain'
  })
);
