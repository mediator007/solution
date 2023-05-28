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

const CandidateCardCallback = (props) => {
    const resume = props.resume

    const [isAuth, setIsAuth, roleList, move, setMove] = React.useContext(Context)

    const [modalOpen, setModalOpen] = React.useState(false);
          
    return(
        <Fragment>
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
                        onClick={()=>setModalOpen(true)}>Подробнее</Button>
                    </GridItem>
                    <GridItem col='1'>
                        <Button
                        variant="warning"
                        onClick={()=>setMove(resume)}>В работу</Button>
                    </GridItem>
                </Grid>
            </Card>
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



export default CandidateCardCallback;