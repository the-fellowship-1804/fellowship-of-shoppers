1. Navigation
==! As a user, I should like to land on a visually pleasing homepage and have access immediately to several components via a single click:
-View of all products;
-view to search and filter products;
-view of my account;
-view of my cart;
-log in/sign up;
-log out.

==! As a user, I must be able to navigate in the following manners within two clicks, excluding search submission, from anywhere on the site:

-All above views;
-view of any single product;
-view of my current payment info;
-view of my current shipping address;
-change my information (especially password if native authentication);
-view of my order history, grouped by order;
-view of checkout information, including total price, including shipping, tax, and other surcharges.

==! As an admin, I must be able to:

-Add new products and edit them;
-edit users.

==! As an admin, I must be unable to access users' passwords, CC info, and other sensitive information.

2. Functionality

==! As a user, while logged in, I need to be able to:

-Add items to my cart from intuitive locations, at least from the single-product view;
-remove an item from my cart within three clicks from anywhere on the site;
-change the quantity of an item in my cart in the range of zero to an arbitrarily large number, inclusive;
-have an item removed from my cart if I choose to set its quantity to zero;
-input my billing and shipping information into forms with unobtrusive yet helpful validation;
-log out with a single click from anywhere in the site;
-have my cart persist through sessions and changes of device.

==! As a user, not registered nor logged in, I need to be able to:

-Add items to my cart with the same facility as a user that is logged in;
-remove items from my cart and
-change their quantity with the same facility as a user that is logged in;
-input billing and shipping into similarly validated forms;
-access sign up with a single click from anywhere in the site;
-have my cart persist through a single session;
-retain my cart through sign up and subsequent logging in;

==! As a user, previously registered but not logged in, I need to be able to:

-Merge the cart saved in my account with whatever cart I may have filled before logging out;
-handle consequent duplicates in elegant and ethical manners, specifically:
--duplicates of items with quantity 1 merged into a single item of quantity 1;
--duplication of an item whose quantities are equal in both carts merge into a single item of the same quantity with an unobtrusive yet conspicuous indication that this has occurred;
--duplication of an item whose quantity is greater in the stored cart than it is in the anonymous cart merge into a single item whose quantity is that of the anonymous cart, with an unobtrusive yet conspicuous indication that this has occurred;
--duplication of an item whose quantity is lesser in the stored cart than it is in the anonymous cart merge into a single item of the greater quantity with very clear indication that this has occurred, perhaps with required user interaction to acknowledge the change.
