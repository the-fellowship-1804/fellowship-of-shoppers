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
      price: '1000',
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
      price: '1500',
      imageUrl:
        'https://lumiere-a.akamaihd.net/v1/images/Star-Destroyer_ab6b94bb.jpeg?region=0%2C0%2C1600%2C900&width=768',
      class: 'Starship',
      firepower: 7000,
      crew: 45000,
      topSpeed: 5000,
      acceleration: 100,
      weight: 9500000000,
      length: 1600,
      width: 700,
      depth: 350,
      description:
        'The preferred capital ship of the Galactic Empire. Carries 72 TIE fighters, 20 AT-AT walkers, and 30 AT-ST walkers. With room for 9,700 stormtroopers in addition to crew, this vessel is perfect for planetary assault. Comes equipped with 120 turbolaser batteries for anti-fighter defense, and an additional 15 heavy turbolasers for engagment with other capital ships and planetary bombardment.'
    }),
    Product.create({
      name: `Mon Calamari Star Cruiser`,
      price: '1100',
      imageUrl:
        'https://lumiere-a.akamaihd.net/v1/images/e6d_ia_2581_47f64de7.jpeg?region=254%2C0%2C1426%2C802&width=768',
      class: 'Starship',
      firepower: 4000,
      crew: 5400,
      topSpeed: 6000,
      acceleration: 120,
      weight: 7000000000,
      length: 1200,
      width: 500,
      depth: 280,
      description:
        'The Mon Calamari cruiser is the mainstay capital ship of the Rebel Alliance. It carries 36 starfighters as well as an assortment of ground vehicles, and has room for 1,200 troops as passengers. It boasts 48 turbolaser batteries as well as 20 dual ion cannon batteries, offering solid protection and offensive abilities in all direcitons, fore, aft, port, and starboard.'
    }),
    Product.create({
      name: `Nebulon-B Frigate`,
      price: '550',
      imageUrl:
        'https://lumiere-a.akamaihd.net/v1/images/nebulon-b-frigate_dce53bc2.jpeg?region=0%2C0%2C1181%2C664&width=768',
      class: 'Starship',
      firepower: 1200,
      crew: 850,
      topSpeed: 7000,
      acceleration: 200,
      weight: 1500000000,
      length: 300,
      width: 80,
      depth: 130,
      description:
        "The EF76 Nebulon-B escort frigate's primary role is to carry a squadron of starfighters into combat. It also is capable of carrying 700 medical patients, as its secondary role is as a mobile medical facility. It carries an armament of 12 laser cannons for anti-fighter defense, as well as 12 turbolasers for engagement for other capital ships and planetary bombardment. In spite of this, it is no match for an Imperial Star Destroyer in a one-on-one engagement."
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
      name: `TIE Interceptor`,
      price: '20',
      imageUrl:
        'https://starwarspapercraft.files.wordpress.com/2014/06/b3_2.jpg?w=1100',
      class: 'Fighter',
      firepower: 120,
      crew: 1,
      topSpeed: 11000,
      acceleration: 2500,
      weight: 9000,
      length: 11.45,
      width: 8.08,
      depth: 7.2,
      description:
        "The TIE/IN interceptor is faster than the standard TIE fighter and carries four wingtip-mounted and two chin-mounted L-s9.3 laser cannons. It was developed in response to the Alliance's introduction of the A-Wing interceptor, and its main purpose is to chase down and overwhelm enemy fighters with its addditional firepower."
    }),
    Product.create({
      name: `Y-Wing`,
      price: '25',
      imageUrl:
        'https://lumiere-a.akamaihd.net/v1/images/Y-Wing-Fighter_0e78c9ae.jpeg?region=0%2C0%2C1536%2C864&width=768',
      class: 'Fighter',
      firepower: 220,
      crew: 2,
      topSpeed: 8000,
      acceleration: 2200,
      weight: 18000,
      length: 23.4,
      width: 16,
      depth: 4.2,
      description:
        'The BTL Y-Wing from Koensayr Manufacturing serves a dual role as a fighter-bomber. Primarily suited towards assault on heavily shielded capital ships and fortified positions. Though slightlyslower than the mainstay X-Wing and TIE series fighters, it is also larger and carries heavier shields and a more powerful complement of armaments. The second crew member serves as a co-pilot and mans the rear-facing ArMek turreted SW-4 ion cannons. The pilot has access to twin Taim & Bak IX4 laser cannons, and most importantly, two proton torpedo launchers from Arakyd, which carry a complement of 4 torpedoes each. These torpedoes are devastating to heavily armored, large targets.'
    }),
    Product.create({
      name: `A-Wing`,
      price: '18',
      imageUrl:
        'https://lumiere-a.akamaihd.net/v1/images/screen_shot_2015-05-26_at_5_16a39e17.png?region=0%2C71%2C812%2C457&width=768',
      class: 'Fighter',
      firepower: 100,
      crew: 1,
      topSpeed: 12000,
      acceleration: 2200,
      weight: 8500,
      length: 9.6,
      width: 4.2,
      depth: 2.8,
      description:
        'The RZ-1 A-wing starfighter is excellently suited to its role as an interceptor. With powerful twin engines, it is faster than a TIE fighter, and comes standard with a deflector shield. It is capable of hunting down and destroying enemy fighers and bombers in a fleet engagement before they reach capital-class ships. It comes equipped with twin Borstel RG-9 laser cannons and a Dymek HM-6 concussion missile launcher, carrying a complement of 12 concussion missiles.'
    }),
    Product.create({
      name: `B-Wing`,
      price: '50',
      imageUrl:
        'https://spikeybits.com/wp-content/uploads/2015/05/b-wing-star-wars-xwing-e1432004784188.jpg',
      class: 'Fighter',
      firepower: 500,
      crew: 2,
      topSpeed: 6000,
      acceleration: 1500,
      weight: 22000,
      length: 4.1,
      width: 6.3,
      depth: 16.9,
      description:
        'Manufactured by Slayn & Korpil, the A/SF-01 B-Wing starfighter has one primary role: it is an anti-capital bomber. Though slower than other fighter-class starships, it is heavily shielded and armored, and carries a bevy of heavy armaments. The second crew-member serves as a gunner. The B-Wing carries 3 ArMek SW-7a ion cannons, ,2 Gyrhil R-9X laser cannons, 1 Gyrhil 72 twin auto-blaster, 2 Krupx MG9 proton torpedo launcherrs, and is also capable of carrying Laser-guided bombs which have a devastating effect. The cockpit is gyro-stabilized, and surrounded by S-foils that unfold in assault mode.'
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
