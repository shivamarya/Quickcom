var express = require('express');
var router = express.Router();
var upload = require('./multer');
var connection = require('./pool');
const fs = require('fs');

// add subcategory

router.post('/subcategory_submit', upload.single('subcategoryicon'), function (req, res, next) {
  try {
    connection.query("insert into subcategory(categoryid,subcategoryname,subcategoryicon,created_at,updated_at,user_admin)values(?,?,?,?,?,?)", [req.body.categoryid, req.body.subcategoryname, req.file.filename, req.body.created_at, req.body.updated_at, req.body.user_admin], function (error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false });
      } else {
        res.status(200).json({ message: 'Subcategory submitted successfully', status: true });
      }
    });
  } catch (e) {
    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false });
  }
}
);


// Display All Subcategory

router.get('/display_all_subcategory', function (req, res, next) {
  try {
    connection.query("select * from subcategory", function (error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false });
      } else {
        res.status(200).json({ message: 'Success', data: result, status: true });
      }
    })
  } catch (e) {
    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false });
  }
})



// edit category
router.post('/edit_subcategory_data', function (req, res, next) {
  try {
    connection.query("update subcategory set subcategoryname=?,updated_at=?,user_admin=? where subcategoryid=?", [req.body.subcategoryname, req.body.updated_at, req.body.user_admin, req.body.subcategoryid], function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
      }
      else {
        res.status(200).json({ message: 'subcategory updated successfully', status: true })
      }

    })

  }
  catch (e) {

    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
  }
});


// edit subcategory picture
router.post('/edit_subcategory_icon', upload.single('subcategoryicon'), function (req, res, next) {
  try {
    connection.query("update subcategory set subcategoryicon=?,updated_at=?,user_admin=? where subcategoryid=?", [req.file.filename, req.body.updated_at, req.body.user_admin, req.body.subcategoryid], function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
      }
      else {
        if (req.body.oldimage && req.body.oldimage !== 'cart.png') { // Ensure oldimage is not the default image
          fs.unlink(`public/images/${req.body.oldimage}`, function (err) {
            if (err) {
              console.log("Error", err)
            } else {
              console.log('Old image deleted');
            }
          });
        }
        res.status(200).json({ message: 'subcategory icon updated successfully', status: true })
      }

    })

  }
  catch (e) {

    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
  }
});


// Delete subcategory
router.post('/delete_subcategory', function (req, res, next) {
  try {
    connection.query("delete from subcategory where subcategoryid=?", [req.body.subcategoryid], function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
      }
      else {
        res.status(200).json({ message: 'subcategory Deleted successfully', status: true })
      }

    })

  }
  catch (e) {

    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
  }
});

module.exports = router;