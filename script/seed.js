'use strict';

const db = require('../server/db');
const { User, Product } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', imageUrl: "https://ih0.redbubble.net/image.192764262.9691/pp%2C185x205-pad%2C210x230%2Cf8f8f8.lite-1u5.jpg" }),
    User.create({ email: 'murphy@email.com', password: '123' }),
  ]);
  console.log(`seeded ${users.length} users`);

  const products = await Promise.all([
    Product.create({
      productName: `the Death Star`,
      price: `9999999`,
      productImageUrl:
        'https://nerdist.com/wp-content/uploads/2017/12/Death-Star-Construction-1.jpg',
    }),
    Product.create({
      productName: `Enterprise-D`,
      productImageUrl:
        'https://vignette.wikia.nocookie.net/memoryalpha/images/0/00/USS_Enterprise-D%2C_TNG_Season_3-7.jpg/revision/latest?cb=20160203203647&path-prefix=en',
      price: 0,
    }),
  ]);
  console.log(`seeded ${products.length} products`);
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  seed()
    .then(() => {
      // `finally` is like then + catch. It runs no matter what.
      console.log('closing db connection');
      db.close();
      console.log('db connection closed');
    })
    .catch(err => {
      console.error(err);
      process.exitCode = 1;
    });

  /*
   * note: everything outside of the async function is totally synchronous
   * The console.log below will occur before any of the logs that occur inside
   * of the async function
   */
  console.log('seeding...');
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
