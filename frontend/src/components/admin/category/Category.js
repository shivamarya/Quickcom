import { Button, Grid, TextField, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../../assets/logo.png";
import cart from "../../../assets/cart.png";

import { useState } from "react";
var userStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  box: {
    width: 500,
    height: "auto",
    padding: 10,
    margin: 10,
    backgroundColor: "#dfe4ea",
  },
  headingStyle: {
    fontSize: 24,
    marginLeft: 10,
  },
  imageStyle: {
    width: 65,
    height: 45,
  },
  mainHeadingstyle: {
    display: "flex",
    alignItems: "center",
    padding: 5,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
function Category(props) {
  const [categoryName, setCategoryName] = useState();
  const [categoryIcon, setCategoryIcon] = useState({
    bytes: "",
    fileName: cart,
  });
  const handleImage = (e) => {
    setCategoryIcon({
      bytes: e.target.files[0],
      fileName: URL.createObjectURL(e.target.files[0]),
    });
  };
  var classes = userStyles();
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
            <TextField
              onChange={(e) => setCategoryName(e.target.value)}
              label="Category Name"
              value={categoryName}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Button variant="contained" component="label">
              Upload
              <input onChange={handleImage} type="file" accept="image/*" hidden multiple />
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Avatar src={categoryIcon.fileName} variant="rounded" />
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Button variant="contained">Submit</Button>
          </Grid>
          <Grid item xs={6} className={classes.center}>
            <Button variant="contained">Reset</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Category;
