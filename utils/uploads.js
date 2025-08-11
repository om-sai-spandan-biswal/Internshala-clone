const multer = require("multer");
const getExt = require("../public/js/getExt");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + getExt(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload ;