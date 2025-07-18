'use strict';

const viewportWidth = document.documentElement.clientWidth;
if (viewportWidth >= 850) {
  new TypeIt('.home__title--strong', {
    loop: true,
    speed: 50,
  }) // juwon|
    .move(-5)
    .type('a penguin lover, ')
    .pause(1000)
    .move(null, { to: 'END' }) // a penguin lover|
    .delete() // |
    .type('a Front-end Engineer') // a Front-end Engineer|
    .pause(1000)

    .move(-9) // a Front-end| Engineer
    .delete(9) // | Engineer
    .type('Back-end') // a Back-end Engineer
    .pause(1000)

    .delete(8) // | Engineer
    .type('Full-stack') // Full-stack| Engineer
    .pause(1000)
    .move(9)
    .delete()
    .go();
}
