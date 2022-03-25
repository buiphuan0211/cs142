var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var ObjectId = mongoose.Types.ObjectId;

var async = require('async');

var express = require('express');
var app = express();
const morgan = require('morgan');
const session = require('express-session');
var MongoDBSession = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const multer = require('multer');
const { uuid } = require('uuidv4');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

// XXX - Your submission should work without this line. Comment out or delete this line for tests and before submission!
var cs142models = require('./modelData/photoApp.js').cs142models;

const mongoURI = 'mongodb://localhost/cs142project6';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const store = new MongoDBSession({
  uri: mongoURI,
  collection: 'mySession',
});
app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(bodyParser.json());
// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

app.get('/', function (request, response) {
  response.send('Simple web server of files from ' + __dirname);
});

app.get('/test/:p1', function (request, response) {
  // Express parses the ":p1" from the URL and returns it in the request.params objects.
  console.log('/test called with param1 = ', request.params.p1);

  var param = request.params.p1 || 'info';

  if (param === 'info') {
    // Fetch the SchemaInfo. There should only one of them. The query of {} will match it.
    SchemaInfo.find({}, function (err, info) {
      if (err) {
        // Query returned an error.  We pass it back to the browser with an Internal Service
        // Error (500) error code.
        console.error('Doing /user/info error:', err);
        response.status(500).send(JSON.stringify(err));
        return;
      }
      if (info.length === 0) {
        // Query didn't return an error but didn't find the SchemaInfo object - This
        // is also an internal error return.
        response.status(500).send('Missing SchemaInfo');
        return;
      }

      // We got the object - return it in JSON format.
      console.log('SchemaInfo', info[0]);
      response.end(JSON.stringify(info[0]));
    });
  } else if (param === 'counts') {
    // In order to return the counts of all the collections we need to do an async
    // call to each collections. That is tricky to do so we use the async package
    // do the work.  We put the collections into array and use async.each to
    // do each .count() query.
    var collections = [
      { name: 'user', collection: User },
      { name: 'photo', collection: Photo },
      { name: 'schemaInfo', collection: SchemaInfo },
    ];
    async.each(
      collections,
      function (col, done_callback) {
        col.collection.countDocuments({}, function (err, count) {
          col.count = count;
          done_callback(err);
        });
      },
      function (err) {
        if (err) {
          response.status(500).send(JSON.stringify(err));
        } else {
          var obj = {};
          for (var i = 0; i < collections.length; i++) {
            obj[collections[i].name] = collections[i].count;
          }
          response.end(JSON.stringify(obj));
        }
      }
    );
  } else {
    // If we know understand the parameter we return a (Bad Parameter) (400) status.
    response.status(400).send('Bad param ' + param);
  }
});

/*
 * URL /user/list - Return all the User object.
 */
//FIXME:
app.get('/user/list', async (req, res) => {
  try {
    const users = await User.find();

    if (users.length < 0) {
      res.status(400).json({
        status: 'fail',
        message: 'Không tìm thấy user nào cả 😢',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Loi server 💥',
    });
  }
});

/*
 * URL /user/:id - Return the information for User (id)
 */

//FIXME:
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user.length < 0 || !user) {
      res.status(400).json({
        status: 'fail',
        message: 'Không tìm thấy user nào cả 😢',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Loi server 💥',
    });
  }
});

/*
 * URL /photosOfUser/:id - Return the Photos for User (id)
 */
//FIXME:
app.get('/photosOfUser/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const photos = await Photo.find({ user_id: userId });

    if (photos.length < 0 || !photos) {
      res.status(400).json({
        status: 'fail',
        message: 'Không tìm thấy photo nào cả 😢',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        photos,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Loi server 💥',
    });
  }
});

//FIXME:
app.post('/admin/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user || user.length < 1) {
      return res.status(400).json({
        status: 'fail',
        message: 'Tài khoản hoặc mật khẩu không đúng',
      });
    }

    // req.session.user = {
    //   _id: user[0]._id,
    //   first_name: user[0].first_name,
    // };

    // req.session.isAuth = true;

    return res.status(200).json({
      status: 'success',
      message: 'Đăng nhập thành công',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Lỗi server' + error,
    });
  }
});

//FIXME:
app.post('/commentsOfPhoto/:photo_id', async (req, res) => {
  try {
    const photoId = req.params.photo_id;
    const newComment = req.body.dataComment;
    console.log('comment: ', newComment, photoId);
    await Photo.findByIdAndUpdate(
      { _id: photoId },
      {
        $push: {
          comments: {
            comment: newComment.comment,
            user_id: new mongoose.Types.ObjectId(newComment.userId),
            _id: new ObjectId(),
            date_time: Date.now(),
          },
        },
      }
    );

    return res.status(200).json({
      status: 'success',
      message: 'comment thanh cong',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Lỗi server' + error,
    });
  }
});

//FIXME:
app.post('/user', async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({
        status: 'fail',
        message: 'username đã tồn tại rùi bạn eyyyy',
      });
    }

    const createUser = await User.create(req.body);

    return res.status(200).json({
      status: 'success',
      message: 'Đăng kí thành công',
      data: {
        user: createUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Lỗi server' + error,
    });
  }
});

app.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find({});
    if (photos.length < 1) {
      return res.status(400).json({
        status: 'fail',
        message: 'Không có hình nào hết á',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: {
        photos: photos.reverse(),
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Lỗi server' + error,
    });
  }
});

//FIXME:
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, 'image-upload' + '-' + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

app.post('/photos/new', upload.single('image'), async (req, res, next) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    console.log('file: ', req.file);
    console.log('body: ', req.body);

    const photo = new Photo({
      user_id: req.body.user_id,
      file_name: url + '/public/' + req.file.filename,
    });

    const uploadImage = await photo.save();

    if (!uploadImage) {
      return res.status(400).json({ message: 'upload fail' });
    }

    return res.status(200).json({ message: 'upload success' });
  } catch (error) {
    return res.status(500).json({ message: 'Loi Server' });
  }
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log(
    'Listening at http://localhost:' +
      port +
      ' exporting the directory ' +
      __dirname
  );
});
