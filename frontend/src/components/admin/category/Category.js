import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";


var userStyles = makeStyles({
    root:{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    box:{
        width: 500,
        height: 200,
        padding:10,
        margin:10,
        backgroundColor: '#dfe4ea'
    },
    headingStyle:{
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: 0.5
    }
})
function Category(props){
    var classes = userStyles();
    return(
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={classes.headingStyle}>
                        <h1>Category Register</h1>
                        </div>     
                        </Grid>                  
                </Grid>
            </div>
        </div>
    )
}

export default Category;

