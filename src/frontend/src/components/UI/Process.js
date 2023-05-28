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

const Process = () => {
    // for understand when Move button click
    const [isAuth, setIsAuth, roleList, move, setMove] = React.useContext(Context)

    const [first, setFirst] = React.useState([]);
    const [second, setSecond] = React.useState([]);
    const [third, setThird] = React.useState([]);

    useEffect(()=>{
        axios.get(
            'http://' + window.location.hostname + ':8000/api/v1/bpm/all_candidates_in_process'
            ).then((response) => {
                setFirst(response.data.first)
                setSecond(response.data.second)
                setThird(response.data.third)
            }).catch(error => {
                console.log('---error', error)
            })
    },[])
    
    useEffect(()=>{
        if (move) {
            axios.post(
                'http://' + window.location.hostname + ':8000/api/v1/bpm/move_candidate',
                {data: JSON.stringify(move)}
                ).then((response) => {
                    setFirst(response.data.first)
                    setSecond(response.data.second)
                    setThird(response.data.third)
                }).catch(error => {
                    console.log('---error', error)
                })
        }
        setMove(false)
    },[move])

    function createCards (stage) {
        let result = []
        for (let el of stage) {
            result.push(
                <CandidateCard resume={el}/>
            )
        }
        return(result)
    };
          
    return(
        
        <Fragment>
            
            <Grid cols='3'>
                <GridItem col='1'>{createCards(first)}</GridItem>
                <GridItem col='1'>{createCards(second)}</GridItem>
                <GridItem col='1'>{createCards(third)}</GridItem>
            </Grid>
            
        </Fragment>
        
    )
};



export default Process;