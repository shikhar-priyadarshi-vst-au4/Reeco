import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { api } from '../services/orders';
import Navbar from "../components/Navbar";
import {DashboardInfo, DashboardStats, DashboardOrders} from "../modules/dashboard";

const Main = styled.main`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const DashboardWrapper = styled.div`
width: 90%;
margin: 0 auto;
display: flex;
flex-direction: column;
gap: 16px;
`;

export default function Dashboard(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(api.endpoints.getOrders.initiate({}, {forceRefetch: true}));
    },[])

    return <>
        <Navbar/>
        <Main>
            <DashboardInfo/>
            <DashboardWrapper>
                <DashboardStats/>
                <DashboardOrders/>
            </DashboardWrapper>
        </Main>
    </>
}