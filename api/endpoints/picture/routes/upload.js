const router = require('express').Router();
const { dev } = require('../../../../dev');
const userCTR = require('../../../users/controller');
const r = require('../../../helpers/responses');
const image = require('../../../photos/model');
const authenticate = require('../../../helpers/authenticate');
const transform = require('../../../photos/transform');


router.route('/api/pictures/upload').post(transform.upload.array('images'), (req, res) => {
  const uploaded = req.files;
  const ownerId = req.user.id;

  const uploadedImages = uploaded.map((i, idx) => {
    let newImage = {};
    // console.log(req.body.tags);
    console.log('Tags =>', req.body.tags);
    newImage.tags = req.body.tags;
    newImage.url = i.transforms[0].location;
    newImage.owner = req.user.id;
    console.log(newImage);
    return newImage;
  });

  image.insertMany(uploadedImages, function (error, docs) {
    if (error) {
      r.send(res, 500, { error, message: 'failed to save images' });
      return;
    }

    const pictureIds = [];
    docs.forEach(image => {
      console.log('Image obj:', image);
      pictureIds.push(image);
    });

    user
      .update({ "_id": ownerId }, { "$push": { uploads: pictureIds } })
      .then(editedUser => send(res, 200, sanitize.response(editedUser)))
      .catch(err =>
        r.send(res, 500, { err, message: `server failed to edit user` })
      );
  });
  // const uploaded = req.files;
  // uploaded.forEach(i => {
  // 	let newImage = new image();
  // 	// using shift() to make postman associate proper tags with image instead
  // 	// of just appending all tags from uploads as an array for each upload
  // 	newImage.tags = req.body.tags.shift();
  // 	newImage.url = i.transforms[0].location;
  // 	newImage.save();
  // });
  // // res.json(`Uploaded ${req.files.length} files!`);
  // res.send();
});

module.exports = router;