var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");
const { response } = require("../app");

/* GET home page. */
router.post("/category_submit", upload.single("categoryicon"), function (req, res, next) {
  try {
    pool.query("insert into category(categoryname,categoryicon,created_at,updated_at,user_admin)values(?,?,?,?,?)",[req.body.categoryname,req.file.filename,req.body.created_at,req.body.updated_at,req.body.user_admin],function (error, result) {
        if (error) {
          console.log(error)
          response.status(200).json({message: "Database Error pls contact with backend team. ",status: false});
        } else {
          response.status(200).json({ message: "Category Submitted Successfully", status: true });
        }
      }
    );
  } catch (e) {
    response.status(200).json({message: "Severe error on server please contact with backend team",status: false});
  }
});

module.exports = router;
