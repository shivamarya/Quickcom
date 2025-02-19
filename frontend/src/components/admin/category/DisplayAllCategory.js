import { useState,useEffect, use } from "react";
import MaterialTable from '@material-table/core'
import { getData, serverURL, createDate,postData,currentDate } from "../../../services/FetchNodeAdminServices";
import userStyles from "./CategoryCss";
import { Button, Grid, TextField,Avatar, Dialog,DialogContent, DialogActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import logo from "../../../assets/logo.png";
import cart from "../../../assets/cart.png";
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";

function DisplayAllCategory(){
  const classes=userStyles();
    const [categoryList,setCategoryList]=useState([]);
    const [open, setOpen] = useState(false);

    /* -------------------------------------- Fetch all category Start ------------------------------------------ */
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [errorMessages,setErrorMessages] = useState({});
    const [hideUploadButton,setHideUploadButton]=useState(false);

      // const [categoryData,setCategoryData]=useState([]);
      const handleErrorMessages=(label,message)=>{
          var msg = errorMessages
          msg[label]=message
          setErrorMessages((prev)=>({...prev,...msg}))
      }

    const showSaveCancelData=()=>{
      return(
        <div>
          <Button>Save</Button>
          <Button>Cancel</Button>
        </div>
      )
    }
    
    // Validate the data
    const validateData=()=>{
        var err=false
        if(categoryName.length==0){
          // setErrorMessages({...errorMessages,categoryName:'please input categoryname'});
          handleErrorMessages('categoryName','please input categoryname');
          err=true;
    
        }
        // if(categoryIcon.bytes.length==0){
        //   handleErrorMessages('categoryIcon','please input categoryIcon');
        //   err=true;
    
        // }
    
        return err
      }
    
      // State for the category icon
      const [categoryIcon, setCategoryIcon] = useState({
        bytes: "",
        fileName: cart,
      });
    
      // Handle the image
      const handleImage = (e) => {
        handleErrorMessages('categoryIcon',null);
        setCategoryIcon({
          bytes: e.target.files[0],
          fileName: URL.createObjectURL(e.target.files[0]),
        });
        setHideUploadButton(true);
      };   
    
      const CategoryForm=()=>{ 
        // alert(JSON.stringify(categoryData));
        return (
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
                  <TextField value={categoryName} onFocus={()=>handleErrorMessages('categoryName',null)} error={errorMessages?.categoryName} helperText={errorMessages?.categoryName} onChange={(e) => setCategoryName(e.target.value)} label="Category Name" fullWidth />
                </Grid>
                <Grid item xs={6} className={classes.center}>
                <div style={{display:'flex',flexDirection:'column'}}>  
                  {hideUploadButton?<div>{showSaveCancelData()}</div>:
                  
                  <Button variant="contained" component="label">
                  Upload
                  <input onChange={handleImage} type="file" accept="image/*" hidden multiple />
                </Button>}      
                 
                  <div className={classes.errorMessageStyle}>{errorMessages?.categoryIcon!=null?errorMessages?.categoryIcon:<></>}</div>
                  </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                  <Avatar src={categoryIcon.fileName}  style={{width:70,height:70}} variant="rounded"  />
                </Grid>
              </Grid>
        );
       }

    /*-------------------------- Fetch all category End -------------------------------------*/

    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category');
        if(result.status){
            setCategoryList(result.data);
            console.log(result.data);
        }else{
            alert(result.message);
        }
    }
    useEffect(()=>{
        fetchAllCategory();
    },[])


    // Dialog Box
    const handleOpenDialog=(rowData)=>{
      setCategoryId(rowData.categoryid)
      setCategoryName(rowData.categoryname)
      setOpen(true)
      }
      

    const handleCloseDialog = () => {
      setOpen(false);
    }

      // Handle the submit
  const handleEditData = async()=>{
    var err=validateData();
    if(err==false){

    setLoadingStatus(true);
      var body = {'categoryid':categoryId,'categoryname':categoryName,'updated_at':currentDate(),'user_admin':'Shivam'};


      var result=await postData('category/edit_category_data',body);
      if(result.status){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast:true
        });
        
      }else{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 2000,
          toast:true
        });
      }
      setLoadingStatus(false);
    }
    fetchAllCategory();
    // setOpen(false);
  }

    // Show the dialog box
    const showCategoryDialog=()=>{
      return(
        <div>
          <Dialog open={open} onClose={handleOpenDialog}>
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
              <Button>Delete</Button>
              <Button onClick={handleCloseDialog}>Close</Button>

            </DialogActions>           
          </Dialog>
        </div>
      )
       
    }

    // Material Table
    function categoryTable() {
        return (
          <div className={classes.root}>
            <div className={classes.displayBox}>
            <MaterialTable
            title="Category List"
            columns={[
              { title: 'Category Id', field: 'categoryid' },
              { title: 'Category Name', field: 'categoryname' },
              { title: 'Category Icon', field: 'categoryicon'},
              { title: 'Created At / Updated At', render: (rowData) => <div style={{display:'flex',flexDirection:'column'}}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div> },
              // { title: 'Updated At', field: 'updated_at' },
              { title: 'User Admin', field: 'user_admin' },
              { title: 'Icon',render:(rowData)=><img src={`${serverURL}/images/${rowData.categoryicon}`} style={{width:60,height:50,borderRadius:6}} />}
            ]}
            data={categoryList}  
            options={{
              pageSize:5,
              pageSizeOptions:[5,10,15,{value:categoryList.length,label:'All'}],
            }}   
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              }
            ]}
          />
            </div>
          </div>
       
      
        )
      }
    return(
        <>
        <div>
            {categoryTable()}
            {showCategoryDialog()}
            </div>

        </>
    )
}


export default DisplayAllCategory;