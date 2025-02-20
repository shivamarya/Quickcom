import { makeStyles } from "@mui/styles";


// Styles for the component
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
    backgroundColor: "#f7f1e3",
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
  errorMessageStyle:
    { color: '#d32f2f', "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif", "fontWeight": "400", "fontSize": "0.75rem", "lineHeight": "1.66", "letterSpacing": "0.03333em", "textAlign": "left", "marginTop": "3px", "marginRight": "14px", "marginBottom": "0", "marginLeft": "14px" },
  displayBox: {
    width: '90vw',
    height: "auto",
    padding: 10,
    margin: 10,
    backgroundColor: "#f7f1e3",
    borderRadius: 10,
  },
});


export default userStyles;