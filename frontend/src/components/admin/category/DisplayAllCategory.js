import { useState,useEffect, use } from "react";
import MaterialTable from '@material-table/core'
import { getData, serverURL, createDate } from "../../../services/FetchNodeAdminServices";
import userStyles from "./CategoryCss";

function DisplayAllCategory(){
  const classes=userStyles();
    const [categoryList,setCategoryList]=useState([]);
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
              pageSize:3,
              pageSizeOptions:[3,6,9,12,{value:categoryList.length,label:'All'}],
            }}   
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
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
            </div>

        </>
    )
}


export default DisplayAllCategory;