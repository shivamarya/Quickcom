import { useState, useEffect, use } from "react";
import MaterialTable from '@material-table/core'
import { getData, serverURL, createDate, postData, currentDate } from "../../../services/FetchNodeAdminServices";
import userStyles from "../category/CategoryCss";
import { IconButton, Button, Grid, TextField, Avatar, Dialog, DialogContent, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logo from "../../../assets/logo.png";
import cart from "../../../assets/cart.png";
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';


function DisplayAllSubCategory() {
  const classes = userStyles();
  const [subCategoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false);

  /* -------------------------------------- Fetch all subcategory Start ------------------------------------------ */
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [subCategoryIcon, setSubCategoryIcon] = useState({ bytes: "", fileName: cart, });
  const [errorMessages, setErrorMessages] = useState({});
  const [hideUploadButton, setHideUploadButton] = useState(false);
  const [oldImage, setOldimage] = useState('');

  // const [categoryData,setCategoryData]=useState([]);
  const handleErrorMessages = (label, message) => {
    var msg = errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev, ...msg }))
  }

  const showSaveCancelData = () => {
    return (
      <div>
        <Button onClick={handleEditIcon}>Save</Button>
        <Button onClick={handleCancelIcon}>Cancel</Button>
      </div>
    )
  }

  // Validate the data
  const validateData = () => {
    var err = false
    if (subCategoryName.length == 0) {
      // setErrorMessages({...errorMessages,subCategoryName:'please input subcategoryname'});
      handleErrorMessages('subCategoryName', 'please input SubCategoryname');
      err = true;

    }
    // if(subCategoryIcon.bytes.length==0){
    //   handleErrorMessages('subCategoryIcon','please input subCategoryIcon');
    //   err=true;

    // }

    return err
  }

  // Handle the image
  const handleImage = (e) => {
    handleErrorMessages('subCategoryIcon', null);
    setSubCategoryIcon({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
    setHideUploadButton(true);
  };

  const CategoryForm = () => {
    // alert(JSON.stringify(categoryData));
    return (
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
          <TextField onFocus={() => handleErrorMessages('categoryId', null)} error={errorMessages?.categoryId} helperText={errorMessages?.categoryId} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} label="Category Id" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField value={subCategoryName} onFocus={() => handleErrorMessages('subCategoryName', null)} error={errorMessages?.subCategoryName} helperText={errorMessages?.subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} label="SubCategory Name" fullWidth />
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {hideUploadButton ? <div>{showSaveCancelData()}</div> :

              <Button variant="contained" component="label">
                Upload
                <input onChange={handleImage} type="file" accept="image/*" hidden multiple />
              </Button>}

            <div className={classes.errorMessageStyle}>{errorMessages?.subCategoryIcon != null ? errorMessages?.subCategoryIcon : <></>}</div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={subCategoryIcon.fileName} style={{ width: 70, height: 70 }} variant="rounded" />
        </Grid>
      </Grid>
    );
  }

  /*-------------------------- Fetch all subcategory End -------------------------------------*/

  const fetchallSubCategory = async () => {
    var result = await getData('subcategory/display_all_subcategory');
    if (result.status) {
      setCategoryList(result.data);
      console.log(result.data);
    } else {
      alert(result.message);
    }
  }
  useEffect(() => {
    fetchallSubCategory();
  }, [])




  // Dialog Box
  const handleOpenDialog = (rowData) => {
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setSubCategoryName(rowData.subcategoryname)
    setSubCategoryIcon({ bytes: '', fileName: `${serverURL}/images/${rowData.subcategoryicon}` })
    //  setOldimage(`${serverURL}/images/${rowData.subcategoryicon}`);
    setOldimage(rowData.subcategoryicon); // Only set the filename
    setOpen(true)

  }


  const handleCloseDialog = () => {
    setOpen(false);
  }


  const handleCancelIcon = () => {
    setSubCategoryIcon({ bytes: '', fileName: oldImage })
    setHideUploadButton(false)
  }

  // Handle the submit
  const handleEditData = async () => {
    var err = validateData();
    if (err == false) {

      setLoadingStatus(true);
      var body = { 'subcategoryid': subCategoryId, 'subcategoryname': subCategoryName, 'updated_at': currentDate(), 'user_admin': 'Shivam' };


      var result = await postData('subcategory/edit_subcategory_data', body);
      if (result.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });

      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast: true
        });
      }
      setLoadingStatus(false);
    }
    fetchallSubCategory();
    // setOpen(false);
  }


  const handleEditIcon = async () => {

    setLoadingStatus(true)
    var formData = new FormData()
    formData.append('subcategoryicon', subCategoryIcon.bytes)
    formData.append('updated_at', currentDate())
    formData.append('user_admin', 'Farzi')
    formData.append('subcategoryid', subCategoryId)
    formData.append('oldimage', oldImage); // Add oldimage to formData

    var result = await postData('subcategory/edit_subcategory_icon', formData)
    if (result.status) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });

    }
    else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }
    setLoadingStatus(false)
    setHideUploadButton(false)

    fetchallSubCategory()
  }

  // delete subcategory

  const categoryDelete = async () => {
    setLoadingStatus(true)
    var body = { 'subcategoryid': subCategoryId }

    var result = await postData('subcategory/delete_subcategory', body)
    if (result.status) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });

    }
    else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }
    setLoadingStatus(false)
    setHideUploadButton(false)

    fetchallSubCategory()

  }

  const handleDeleteCategory = async () => {

    Swal.fire({
      title: "Do you want to delete the category?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        categoryDelete();
      } else if (result.isDenied) {
        Swal.fire("SubCategory not deleted", "", "info");
      }
    });


  }

  // Show the dialog box
  const showCategoryDialog = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleOpenDialog}>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            {CategoryForm()}
          </DialogContent>
          <DialogActions>
            <LoadingButton
              loading={loadingStatus}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={handleEditData}
            >
              Edit Data
            </LoadingButton>
            <Button onClick={handleDeleteCategory} >Delete</Button>
            {/* <Button onClick={handleCloseDialog}>Close</Button> */}

          </DialogActions>
        </Dialog>
      </div>
    )

  }

  // Material Table
  function subCategoryTable() {
    return (
      <div className={classes.root}>
        <div className={classes.displayBox}>
          <MaterialTable
            title="SubCategory List"
            columns={[
              { title: 'Category Id', field: 'categoryid' },
              { title: 'SubCategory Id', field: 'subcategoryid' },
              { title: 'SubCategory Name', field: 'subcategoryname' },
              { title: 'SubCategory Icon', field: 'subcategoryicon' },
              { title: 'Created At / Updated At', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div> },
              // { title: 'Updated At', field: 'updated_at' },
              { title: 'User Admin', field: 'user_admin' },
              { title: 'Icon', render: (rowData) => <img src={`${serverURL}/images/${rowData.subcategoryicon}`} style={{ width: 60, height: 50, borderRadius: 6 }} /> }
            ]}
            data={subCategoryList}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 15, { value: subCategoryList.length, label: 'All' }],
            }}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit SubCategory',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              }
            ]}
          />
        </div>
      </div>


    )
  }
  return (
    <>
      <div>
        {subCategoryTable()}
        {showCategoryDialog()}
      </div>

    </>
  )
}


export default DisplayAllSubCategory;