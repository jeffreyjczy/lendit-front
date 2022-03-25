import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { makeStyles } from "@mui/styles";
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Params, useParams } from 'react-router-dom';
import { findAllByDisplayValue } from '@testing-library/react';
import Select from 'react-select'



export default function ItemDetail({ appToken, appId }) {
    const [itemDetail, setitemDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [duration, setDuration] = useState(1);
    const days = [{ value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }, { value: 5, label: '5' }, { value: 6, label: '6' }, { value: 7, label: '7' }]



    const { id } = useParams()

    function handlerClick() {
        axios.post("/borrows/create-borrow",
            // expenseLists
            {
                itemID: id,
                borrowerID: appId,
                lenderID: itemDetail.ownerID,
                borrowDuration: parseInt(duration.value),
                pendingStat: false
            },
            {
                headers: { 'auth-token': appToken }
            }

        ).then((response) => {
            console.log('done')
            console.log(response);
            // console.log(expenseLists)
            // window.location.href = `/verify/${id}`;
            alert("Success request borrow")
            window.location.reload(true);
        })
            .catch(error => {
                console.log(error.response)
                alert("fail Edit")
            })
    }

    useEffect(() => {
        axios(`/items/${id}`)
            .then(response => {
                console.log("hi" + response.data)
                console.log(response.data.result)
                setitemDetail(response.data.result)
                setIsLoading(true)
            })
            .catch(error => {
                console.log('Error getting fake data: ' + error);
            })
    }, [isLoading]);

    function thisItemDuration(get, set, data, text) {
        return (
            <div>
                <div>
                    {text}
                </div>
                <Select
                    width='100px'
                    defaultValue={get}
                    onChange={set}
                    options={data}
                />
            </div>
        )
    }

    return (


        <div style={{ height: '100vh' }}>
            {isLoading &&
                <div className="box" style={{ backgroundColor: '#FFFFFF' }}>
                    <Container className="box-header">
                        <label className="items">
                            BORROW ITEM
                        </label>
                    </Container>
                    <div className='container'>
                        <div className='row'>

                            <div class="col-sm-4" >
                                <img src={itemDetail.imageURL} >
                                </img>
                            </div>

                            <div class="col-sm-8" >

                                <div>
                                    {itemDetail.name}
                                    <br />
                                    {itemDetail.ownerID}
                                    <br />
                                    {itemDetail.itemDesciption}
                                    <br />
                                    {itemDetail.location}
                                    <br />
                                    {itemDetail.pricePerDay}
                                    <br />
                                    owner,item,Description,price
                                </div>
                                {itemDetail.avaliable && itemDetail.ownerID != appId &&
                                    <div>
                                        {thisItemDuration(duration, setDuration, days, "set your duration")}
                                        <button onClick={() => handlerClick()}>
                                            Let's borrow
                                        </button>
                                    </div>

                                }
                            </div>
                        </div>
                    </div>





                    {/* <button onClick={() => console.log(itemDetail.ownerID, appId, duration)}></button> */}

                </div>
            }
        </div>
    )
}
