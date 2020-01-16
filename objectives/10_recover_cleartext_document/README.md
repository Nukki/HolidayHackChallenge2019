**Prerequisites:** `Node.js`, `npm` or `yarn` installed.

Install dependencies:
```
$ npm install
```
or
```
$ yarn install
```
Run the server:
```
$ node index.js
```
To run with `decryptSlow` you need `wine` installed with `elfscrow.exe` in appropriate location. Uncomment line 64 of `index.js` and comments out line 65. Add `async` on line 60 before `()`. The script will run for 2 hours.
