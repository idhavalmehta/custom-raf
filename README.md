# Custom RAF (with Delay)

## Commands

`yarn start`: starts webpack development server  
`yarn build`: runs all tests and builds a production bundle  
`yarn test`: runs all tests (uses mocha/chai/sinon)

## Usage

```js
import CustomRAF from "../src";

const FPS = 60;
const customRAF = new CustomRAF(FPS);

...

const handle = customRAF.requestAnimationFrame(callback, delay);

...

customRAF.cancelAnimationFrame(handle);
```
