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

const Callbacks = () => {
    const [resumes, setResumes] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    
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
                <Card 
                    horizontalSpace="xl"
                    verticalSpace="l"
                    shadow 
                    style={{marginBottom: '10%', minWidth: '250px'}}>
                    <Grid cols='2'>
                        <GridItem col='2'>
                            <Text weight="bold">Имя</Text>
                        </GridItem>
                        <GridItem col='2'>
                            {resume.name}
                        </GridItem>
                        <GridItem col='2'>
                            <Text weight="bold">Рейтинг</Text>
                        </GridItem>
                        <GridItem col='2'>
                            {resume.rating}
                        </GridItem>
                        <GridItem col='1'>
                            <Button
                            onClick={()=>setModalOpen(true)}>Open</Button>
                        </GridItem>
                        <GridItem col='1'>
                            <Button
                            variant="success">Move</Button>
                        </GridItem>
                    </Grid>
                </Card>
            )
        } 
        return(result)
    }

        
    return(
        <Fragment>
            {(resumes.length > 0) && (
                createCallbacks()
            )}
        <Modal
            isOpen={modalOpen}
            hasOverlay
            onClickOutside={() => setModalOpen(false)}
        >
            <Card 
                shadow='false'
                verticalSpace="3xl" 
                horizontalSpace="3xl"
                style={{marginTop: '20%'}}
                >
            Карточка кандидата
            </Card>
        </Modal>
        </Fragment>
    )
};



export default Callbacks;