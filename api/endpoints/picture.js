const router = require('express').Router();

const { dev, debug } = require('../../dev');

// s3 storage
const transform = require('../photos/transform');
const photoCTR = require('../photos/controller')

router.route('/').get((req, res) => {
  debug
    ? res.send({ pictures: `running` })
    : res.status(404).send({ message: `debug set to false` });
});

router.route('/upload')
  .post(transform.upload.array('images'), (req, res) => {
    const uploaded = req.files
    uploaded.forEach(i => {
      let newImage = new image();
      // using shift() to make postman associate proper tags with image instead
      // of just appending all tags from uploads as an array for each upload
      newImage.tags = req.body.tags.shift();
      newImage.url = i.transforms[0].location;
      newImage.save();
    })
    // res.json(`Uploaded ${req.files.length} files!`);
    res.send();
  });


module.exports = router;
