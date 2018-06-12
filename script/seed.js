'use strict';

const db = require('../server/db');
const { User, Product } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      address: "Cody's House, dog",
      imageUrl:
        'https://ih0.redbubble.net/image.192764262.9691/pp%2C185x205-pad%2C210x230%2Cf8f8f8.lite-1u5.jpg'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      address: "Murphy's Dog, house"
    })
  ]);
  console.log(`seeded ${users.length} users`);

  const products = await Promise.all([
    Product.create({
      name: `The Death Star`,
      price: `9999`,
      imageUrl:
        'https://nerdist.com/wp-content/uploads/2017/12/Death-Star-Construction-1.jpg',
      class: 'Space Station',
      firepower: 50000,
      crew: 1200000,
      weight: 134000000000000000,
      diameter: 160000,
      description:
        'The DS-1 Orbital Battle Station comes equipped with a Mk I Superlaser capable of obliterating entire systems. It also boasts a complement of 30,000 stormtroopers, 7,200 TIE class fighters, and an additional complement of 20,000 turbolasers. It is capable of entering hyperspace, with a Class 4 hypderdrive installed. Exhaust port cover highly recommended.'
    }),
    Product.create({
      name: `USS Enterprise-D`,
      price: '400',
      imageUrl:
        'https://nerdist.com/wp-content/uploads/2015/03/1754989-970x545.jpg',
      class: 'Starship',
      firepower: 1500,
      crew: 1014,
      topSpeed: 273618466000,
      weight: 4500000000,
      length: 642.5,
      width: 463.73,
      depth: 195.26,
      description:
        'The USS Enterprise will let you boldly go where no man has gone before!'
    }),
    Product.create({
      name: `Imperial-class Star Destroyer`,
      price: '750',
      imageUrl:
        'https://lumiere-a.akamaihd.net/v1/images/Star-Destroyer_ab6b94bb.jpeg?region=0%2C0%2C1600%2C900&width=768',
      class: 'Starship',
      firepower: 2500,
      crew: 45000,
      topSpeed: 6000,
      acceleration: 100,
      weight: 9500000000,
      length: 1600,
      width: 700,
      depth: 350,
      description:
        'The preferred capital ship of the Galactic Empire. Carries 72 TIE fighters, 20 AT-AT walkers, and 30 AT-ST walkers. With room for 9,700 stormtroopers in addition to crew, this vessel is perfect for planetary assault. Comes equipped with 120 turbolaser batteries for anti-fighter defense, and an additional 15 heavy turbolasers for engagment with other capital ships and planetary bombardment.'
    }),
    Product.create({
      name: `X-Wing`,
      price: '20',
      imageUrl:
        'http://starwarswallpaperhd.com/web/wallpapers/rogue-one-x-wing-4k-ultra-widescreen-wallpaper-image-no-2/thumbnail/lg.jpg',
      class: 'Fighter',
      firepower: 120,
      crew: 1,
      topSpeed: 10000,
      acceleration: 1800,
      weight: 10000,
      length: 12.5,
      width: 6.8,
      depth: 3.1,
      description:
        'The classic T-65 X-Wing starfighter from Incom. One of these destroyed the Death Star. Favorite of the Rebel Alliance. Comes equipped with 4 lasers when depoloyed in attack mode and four engines. Astromech droid sold separately.'
    }),
    Product.create({
      name: `TIE Fighter`,
      price: '15',
      imageUrl:
        'https://www.desktopbackground.org/download/o/2012/09/11/450959_star-wars-star-wars-battlefront-video-games-tie-fighter_2560x1440_h.png',
      class: 'Fighter',
      firepower: 80,
      crew: 1,
      topSpeed: 10000,
      acceleration: 2000,
      weight: 8000,
      length: 6.3,
      width: 6.4,
      depth: 7.5,
      description:
        'The TIE (Twin Ion Engine) Series Ln Starfighter boasts a titanium hull and twin P-s4 ion engines. Also carries an armament of two L-s1 laser cannons, and an I-a3b solar ionization reactor (go green!). Bulk discount for the Empire. Shield generator costs extra.'
    }),
    Product.create({
      name: `YT-1300 "Millenium Falcon"`,
      price: '75',
      imageUrl:
        'https://brightcove04pmdo-a.akamaihd.net/3653334524001/3653334524001_5703541606001_5703529855001-vs.jpg?pubId=3653334524001&videoId=5703529855001',
      class: 'Freighter',
      firepower: 450,
      crew: 4,
      topSpeed: 7500,
      acceleration: 1400,
      weight: 110000,
      length: 34.75,
      width: 19.4,
      depth: 7.8,
      description:
        "It's the ship that made the Kessel Run in less than 12 parsecs. Fully equipped with deflector shields, 2 CEC AG-2G quad laser cannons, and 2 Arakyd ST2 concussion missile tubes. Cargo capacity of 100 metric tons. We'll throw in the Dejarik table for free!"
    }),
    Product.create({
      name: `The Kingdom Come`,
      price: '5',
      imageUrl:
        'https://cdna.artstation.com/p/assets/images/images/005/720/180/large/nadia-wendt-counterweight-kingdomcome.jpg?1493261747',
      class: 'Freighter',
      firepower: 50,
      crew: 20,
      topSpeed: 5000,
      acceleration: 500,
      weight: 300000,
      length: 100,
      width: 30,
      depth: 60,
      description:
        "The Kingdom Come is a partially-decommissioned OriCon Gazer-class Light Frigate that served as the mobile base of the Chime. Orth Godlove was the Kingdome Come's captain during the Golden War. Since the war, most of the Kingdom Come's weapons and its FTL drive have since been removed, making it unsuitable for large-scale combat and interstellar travel. It is a large ship, capable of housing both the Regent's Brilliance and the Megalophile, and has been retrofitted with a small sickbay with basic operating equipment, a functional kitchen, and beds."
    }),
    Product.create({
      name: `The Pillar of Autumn`,
      price: '700',
      imageUrl: 'https://i.stack.imgur.com/fmSWW.jpg',
      class: 'Starship',
      firepower: 2000,
      crew: 40000,
      topSpeed: 5000,
      acceleration: 75,
      weight: 9000000000,
      length: 1171,
      width: 352,
      depth: 414,
      description:
        "UNSC Pillar of Autumn (HCS: C-709)[8][9] is a Halcyon-class light cruiser. Prior to the Fall of Reach, Pillar of Autumn was selected to support Operation: RED FLAG. The cruiser was guided to the Soell system by the AI Cortana. It crash-landed on the installation and the ship's sole remaining combat effective SPARTAN-II was forced to detonate Pillar of Autumn's fusion reactor, destroying the ship and the installation. Condition: very good"
    })
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
