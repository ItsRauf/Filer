# Filer

### File/Image Uploader and Link Shortener

---

## Installation

```js
npm install @itsrauf/filer
```

---

## Usage Example

_append `__dirname` to `destination` to upload to your directory_
_password is not required as Filer generates a new password per session if a password is not specified_

```js
const { Filer, Plugins } = require("@itsrauf/filer");

const uploader = new Filer(
  { destination: `${__dirname}/uploads`, port: 4200, password: <some random password> },
  [new Plugins.Files(), new Plugins.Images(), new Plugins.Links()]
);

uploader.init();

uploader.on("ready", () => {
  console.log("Ready at", uploader.options.port);
});
```

---

## Built With

[Express](https://github.com/expressjs/express) - Underlying Web Server  
[LowDB](https://github.com/typicode/lowdb) - JSON Database  
[Multer](https://github.com/expressjs/multer) - `multipart/form-data` Parser

---
