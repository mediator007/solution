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
    const [
        isAuth, setIsAuth, roleList, move, setMove, start, setStart
    ] = React.useContext(Context)

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
            let data = {
                to_move: move, resumes: {
                    first: first, 
                    second: second,
                    third: third,
                }
            }
            axios.post(
                'http://' + window.location.hostname + ':8000/api/v1/bpm/move_candidate',
                {data: JSON.stringify(data)}
                ).then((response) => {
                    axios.get(
                        'http://' + window.location.hostname + ':8000/api/v1/bpm/all_candidates_in_process'
                        ).then((response) => {
                            setFirst(response.data.first)
                            setSecond(response.data.second)
                            setThird(response.data.third)
                        }).catch(error => {
                            console.log('---error', error)
                        })
                }).catch(error => {
                    console.log('---error', error)
                })
            
        }
        setMove(false)
    },[move])

    useEffect(()=>{
        if (start) {
            let data = {
                to_move: start
            }
            axios.post(
                'http://' + window.location.hostname + ':8000/api/v1/bpm/start_process',
                {data: JSON.stringify(data)}
                ).then((response) => {
                    axios.get(
                        'http://' + window.location.hostname + ':8000/api/v1/bpm/all_candidates_in_process'
                        ).then((response) => {
                            setFirst(response.data.first)
                            setSecond(response.data.second)
                            setThird(response.data.third)
                        }).catch(error => {
                            console.log('---error', error)
                        })
                }).catch(error => {
                    console.log('---error', error)
                })
        }
        setMove(false)
    },[start])

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
            
            <Grid cols='12' xAlign="center">
                <GridItem col='3'>
                <Text 
                    style={{marginBottom: '3.5%'}}
                    size="xl">Этап согласования</Text>
                    {createCards(first)}
                </GridItem>
                <GridItem col='1'/>
                <GridItem col='3'>
                <Text 
                    style={{marginBottom: '3.5%'}}
                    size="xl">Этап обеседования</Text>
                    {createCards(second)}
                </GridItem>
                <GridItem col='1'/>
                <GridItem col='3'>
                <Text 
                    style={{marginBottom: '3.5%'}}
                    size="xl">Оффер</Text>
                    {createCards(third)}
                    </GridItem>
            </Grid>
            
        </Fragment>
        
    )
};



export default Process;