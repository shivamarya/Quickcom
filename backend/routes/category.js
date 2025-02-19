var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

/* GET home page. */
router.post('/category_submit', upload.single('categoryicon'), function (req, res, next) {
  try {
    pool.query("insert into category(categoryname,categoryicon,created_at,updated_at,user_admin)values(?,?,?,?,?)", [req.body.categoryname, req.file.filename, req.body.created_at, req.body.updated_at, req.body.user_admin], function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
      }
      else {
        res.status(200).json({ message: 'Category submitted successfully', status: true })
      }

    })

  }
  catch (e) {

    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
  }
});

// get category
router.get('/display_all_category', function (req, res, next) {
  try {
    pool.query("select * from category", function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
      }
      else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }

    })

  }
  catch (e) {

    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
  }
});


// edit category
router.post('/edit_category_data', function (req, res, next) {
  try {
    pool.query("update category set categoryname=?,updated_at=?,user_admin=? where categoryid=?", [req.body.categoryname, req.body.updated_at, req.body.user_admin,req.body.categoryid], function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
      }
      else {
        res.status(200).json({ message: 'Category updated successfully', status: true })
      }

    })

  }
  catch (e) {

    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
  }
});

module.exports = router;
