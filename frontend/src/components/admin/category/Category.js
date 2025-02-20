
import { Button, Grid, TextField, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logo from "../../../assets/logo.png";
import cart from "../../../assets/cart.png";
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import Swal from "sweetalert2";
import { postData, currentDate } from "../../../services/FetchNodeAdminServices";
import userStyles from "./CategoryCss";

// Component
function Category(props) {
  var classes = userStyles();

  const [categoryName, setCategoryName] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const handleErrorMessages = (label, message) => {
    var msg = errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev, ...msg }))
  }

  // Validate the data
  const validateData = () => {
    var err = false
    if (categoryName.length == 0) {
      // setErrorMessages({...errorMessages,categoryName:'please input categoryname'});
      handleErrorMessages('categoryName', 'please input categoryname');
      err = true;

    }
    if (categoryIcon.bytes.length == 0) {
      handleErrorMessages('categoryIcon', 'please input categoryIcon');
      err = true;

    }

    return err
  }

  // State for the category icon
  const [categoryIcon, setCategoryIcon] = useState({
    bytes: "",
    fileName: cart,
  });

  // Handle the image
  const handleImage = (e) => {
    handleErrorMessages('categoryIcon', null);
    setCategoryIcon({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
  };

  // Reset the value
  const resetValue = () => {
    setCategoryName('')
    setCategoryIcon({ bytes: '', fileName: cart });
  }

  // Handle the submit
  const handleSubmit = async () => {
    var err = validateData();
    if (err == false) {

      setLoadingStatus(true);
      var formData = new FormData();
      formData.append('categoryname', categoryName);
      formData.append('categoryicon', categoryIcon.bytes);
      formData.append('created_at', currentDate());
      formData.append('updated_at', currentDate());
      formData.append('user_admin', 'Shivam');


      var result = await postData('category/category_submit', formData);
      if (result.status) {
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: false
        });

      } else {
        Swal.fire({
          // position: "top-end",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: false
        });
      }
      setLoadingStatus(false);
      resetValue();
    }
  }

  // Reset the value
  const handleReset = () => {
    resetValue()
  }
  console.log(errorMessages);
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.mainHeadingstyle}>
              <div>
                <img src={logo} className={classes.imageStyle} />
              </div>
              <div className={classes.headingStyle}>Category Register</div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField onFocus={() => handleErrorMessages('categoryName', null)} error={errorMessages?.categoryName} helperText={errorMessages?.categoryName} value={categoryName} onChange={(e) => setCategoryName(e.target.value)} label="Category Name" fullWidth />
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button variant="contained" component="label">
                Upload
                <input onChange={handleImage} type="file" accept="image/*" hidden multiple />
              </Button>
              <div className={classes.errorMessageStyle}>{errorMessages?.categoryIcon != null ? errorMessages?.categoryIcon : <></>}</div>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Avatar src={categoryIcon.fileName} style={{ width: 70, height: 70 }} variant="rounded" />
          </Grid>
          <Grid item xs={6} className={classes.center}>
            {/* <Button variant="contained" onClick={handleSubmit}>Submit</Button> */}
            <LoadingButton
              loading={loadingStatus}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={handleSubmit}
            >
              Save
            </LoadingButton>

          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Button onClick={handleReset} variant="contained">Reset</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Category;
