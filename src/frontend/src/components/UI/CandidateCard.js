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

const CandidateCard = (props) => {
    const resume = props.resume

    const [
        isAuth, setIsAuth, roleList, move, setMove, start, setStart
    ] = React.useContext(Context)

    const [modalOpen, setModalOpen] = React.useState(false);
    const [chosenCandidate, setChosenCandidate] = React.useState()

    function openCard (candidate) {
        setChosenCandidate(candidate)
        setModalOpen(true)
    };
          
    return(
        <Fragment>
            <Card 
                horizontalSpace="xl"
                verticalSpace="l"
                shadow 
                style={{marginBottom: '10%', minWidth: '250px'}}>
                <Grid cols='2'>
                    <GridItem col='2'>
                        <Text 
                        weight="bold">Имя</Text>
                    </GridItem>
                    <GridItem col='2'>
                        {resume.name}
                    </GridItem>
                    {/* <GridItem col='2'>
                        <Text weight="bold">Рейтинг</Text>
                    </GridItem>
                    <GridItem col='2'>
                        {resume.rating}
                    </GridItem> */}
                    <GridItem col='2'>
                        <Button
                        style={{marginBottom: '5%'}}
                        onClick={() => openCard(resume) }>Подробнее</Button>
                    </GridItem>
                    <GridItem col='2'>
                        <Button
                        variant="success"
                        onClick={()=>setMove(resume)}>Вперед</Button>
                    </GridItem>
                </Grid>
            </Card>

            <Modal
            isOpen={modalOpen}
            hasOverlay
            onClickOutside={() => setModalOpen(true)}
        >
            <Card 
                shadow='false'
                verticalSpace="3xl" 
                horizontalSpace="3xl"
                style={{marginTop: '2%'}}
                >
                {chosenCandidate && (
                <Grid cols='5' xAlign="center">
                    <GridItem col='5' style={{marginBottom: '5%'}}>
                    <b>Карточка кандидата</b>
                    </GridItem>
                    <GridItem col='2'>
                    <img
                    width='200'
                    height='160' 
                    src={chosenCandidate.photo}/>
                    </GridItem>
                    <GridItem col='1'/>
                    <GridItem col='2'>
                        <Grid cols='1'>
                            <GridItem col='1'>
                            <b>ФИО:</b> {chosenCandidate.name}
                            </GridItem>
                            <GridItem col='1'>
                            <b>Телефон:</b> {chosenCandidate.phone}
                            </GridItem>
                            <GridItem col='1'>
                            <b>Навыки:</b> {chosenCandidate.description}
                            </GridItem>
                        </Grid>
                    </GridItem>
                    <Button
                        style={{marginTop: '10%'}}
                        onClick={() => setModalOpen(false) }>Закрыть</Button>
                    
                </Grid>
                )}
            </Card>
        </Modal>
        </Fragment>
    )
};



export default CandidateCard;