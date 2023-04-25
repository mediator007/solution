import React from "react";
import { Grid, GridItem } from '@consta/uikit/Grid'; 
import LoginForm from "../components/UI/LoginForm";

const Login = () => {
    return(
        <div>
            <Grid style={{marginTop: '10%'}} xAlign="center" cols='3'>
                <GridItem col='1'/>
                <GridItem col='1'>
                    <LoginForm/>
                </GridItem>
            </Grid>
        </div>
    )
};

export default Login;