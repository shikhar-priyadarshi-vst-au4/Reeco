import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import Breadcrumb from "../../components/Breadcrumb";
import styled from 'styled-components';
import Button from "../../components/Button";

const StatsContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: -30px;
& > h2{
    font-size: 18px;
    font-weight: 600;
}
`;

const StatsButtonGroup = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 10px;
`;

export default function DashboardInfo(){
    const orderId = useSelector(state => state.orderData.orderId);
    const breadcrumb = [
        { url: '/', label: 'Orders'},
        { url: '/', label: `Order ${orderId}`}
    ]
    return <>
    <Card 
    header={<Breadcrumb items={breadcrumb}/>}
    fullWidth>
        <StatsContainer>
            <h2>Order {orderId}</h2>
            <StatsButtonGroup>
                <Button variant="outlined">Back</Button>
                <Button>Approve Order</Button>
            </StatsButtonGroup>
        </StatsContainer>
    </Card>
    </>
}