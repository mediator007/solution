import React, { Fragment, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from '../../utils/consts';
import { Context } from '../../Context';
import { ListFormat } from "typescript";
import { Card } from "@consta/uikit/Card";
import { Text } from '@consta/uikit/Text';
import { Grid, GridItem } from "@consta/uikit/Grid";
import { Modal } from '@consta/uikit/Modal';
import CandidateCard from "./CandidateCard";

const Callbacks = () => {
    const [resumes, setResumes] = React.useState([]);
    
    
    useEffect(()=>{
    axios.get(
        'http://' + window.location.hostname + ':8000/api/v1/hh/callbacks'
        ).then((response) => {
            console.log(response.data)
            setResumes(response.data)
        }).catch(error => {
            console.log('---error', error)
        })
    },[])
    
    function createCallbacks () {
        let result = []
        for (let resume of resumes) {
            result.push(
                <CandidateCard resume={resume}/>
            )
        } 
        return(result)
    }

    return(
        <Fragment>
            <Grid cols='1'>
                <GridItem col='1'>
                {(resumes.length > 0) && (
                    createCallbacks()
                )}
                </GridItem>
            </Grid>
        </Fragment>
    )
};



export default Callbacks;