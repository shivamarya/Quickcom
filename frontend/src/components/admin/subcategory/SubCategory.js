import { FormHelperText, FormControl, InputLabel, Select, MenuItem, Button, Grid, TextField, Avatar } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logo from "../../../assets/logo.png";
import cart from "../../../assets/cart.png";
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import Swal from "sweetalert2";
import { postData, currentDate, getData } from "../../../services/FetchNodeAdminServices";
import userStyles from "../category/CategoryCss";
import { useEffect } from "react";

// Component
function SubCategory(props) {
  var classes = userStyles();

  const [categoryId, setCategoryId] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const [categoryList, setCategoryList] = useState([]);

  const fetchAllCategory = async () => {
    var result = await getData('category/display_all_category');
    setCategoryList(result.data);
  }
  useEffect(function () {
    fetchAllCategory();
  }, [])

  const fillCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
  }

  const handleErrorMessages = (label, message) => {
    var msg = errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev, ...msg }))
  }

  // Validate the data
  const validateData = () => {
    var err = false

    if (categoryId.length === 0) {
      handleErrorMessages('categoryId', 'Please input category ID.');
      err = true;
    }
    if (subCategoryName.length === 0) {
      handleErrorMessages('subCategoryName', 'please input categoryname');
      err = true;

    }
    if (subCategoryIcon.bytes.length === 0) {
      handleErrorMessages('subCategoryIcon', 'please input subCategoryIcon');
      err = true;

    }

    return err
  }

  // State for the category icon
  const [subCategoryIcon, setSubCategoryIcon] = useState({
    bytes: "",
    fileName: cart,
  });

  // Handle the image
  const handleImage = (e) => {
    handleErrorMessages('subCategoryIcon', null);
    setSubCategoryIcon({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
  };

  // Reset the value
  const resetValue = () => {
    setSubCategoryName('')
    setSubCategoryIcon({ bytes: '', fileName: cart });
  }

  // Handle the submit
  const handleSubmit = async () => {
    var err = validateData();
    if (err === false) {

      setLoadingStatus(true);
      var formData = new FormData();
      formData.append('categoryid', categoryId);
      formData.append('subcategoryname', subCategoryName);
      formData.append('subcategoryicon', subCategoryIcon.bytes);
      formData.append('created_at', currentDate());
      formData.append('updated_at', currentDate());
      formData.append('user_admin', 'Shivam');


      var result = await postData('subcategory/subcategory_submit', formData);
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
              <div className={classes.headingStyle}>SubCategory Register</div>
            </div>
          </Grid>

          <Grid item xs={12}>
            {/* <TextField onFocus={() => handleErrorMessages('categoryId', null)} error={errorMessages?.categoryId} helperText={errorMessages?.categoryId} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} label="Category Name" fullWidth /> */}

            <FormControl fullWidth>
              <InputLabel>Category Id</InputLabel>
              <Select
                error={!!errorMessages?.categoryId}
                label="Category Id"
                value={categoryId}
                onFocus={() => handleErrorMessages('categoryId', null)}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {fillCategory()}
              </Select>
              <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField onFocus={() => handleErrorMessages('subCategoryName', null)} error={errorMessages?.subCategoryName} helperText={errorMessages?.subCategoryName} value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} label="SubCategory Name" fullWidth />
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button variant="contained" component="label">
                Upload
                <input onChange={handleImage} type="file" accept="image/*" hidden multiple />
              </Button>
              <div className={classes.errorMessageStyle}>{errorMessages?.subCategoryIcon != null ? errorMessages?.subCategoryIcon : <></>}</div>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Avatar src={subCategoryIcon.fileName} style={{ width: 70, height: 70 }} variant="rounded" />
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

export default SubCategory;
