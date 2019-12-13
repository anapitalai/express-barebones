// Initializes the `upload` service on path `/upload`
const { Upload } = require('./upload.class');
const service = require('feathers-sequelize');
const createModel = require('../../models/upload.model');
const hooks = require('./upload.hooks');
const multer = require('multer');
const {
  authenticate
} = require('@feathersjs/express'); // getting feathers' authenticate middleware
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'public/uploads'), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`) // getting the file name
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 1e+8, // Max field value size in bytes, here it's 100MB
    fileSize: 1e+7 //  The max file size in bytes, here it's 10MB
    // files: the number of files
    // READ MORE https://www.npmjs.com/package/multer#limits
  }
});


module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

 


  // Initialize our service with any options it requires
  app.use('/upload', authenticate('jwt'),
  upload.array('files'), (req, res, next) => {
    const { method } = req;
    if (method === 'POST' || method === 'PATCH') {
      // I believe this middleware should only transfer
      // files to feathers and call next();
      // and the mapping of data to the model shape
      // should be in a hook.
      // this code is only for this demo.
      req.feathers.files = req.files; // transfer the received files to feathers
      // for transforming the request to the model shape
      const body = [];
      console.log(req);
      for (const file of req.files)
        body.push({
          description: req.body.description,
          orignalName: file.originalname,
          avatarPath: file.path,
          userId: req.user.id
        });
      req.body = method === 'POST' ? body : body[0];
    }
    next();
  } 
  ,new Upload(options,app));

  // Get our initialized service so that we can register hooks
  const service = app.service('upload');

  service.hooks(hooks);
};
//
