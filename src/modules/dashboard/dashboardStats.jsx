import styled from "styled-components";
import Card from "../../components/Card";
import { useSelector } from "react-redux";

const StatsInfoContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: stretch;
gap: 8px;
margin: -10px 0;
`;

const StatsInfo = styled.div`
display: flex;
flex-direction: column;
flex-basis: calc(100%/6);
gap: 8px;
border-right: 1px solid #eee;
&:last-child{
    border: none;
}
`;

const StatsInfoLabel = styled.div`
color: #aaa;
font-size: 16px;
font-weight: 600;
`;
const StatsInfoValue = styled.div`
color: #212121;
font-size: 18px;
font-weight: 600;
`;

export default function DashboardStats(){
    const orderDetails = useSelector(state => state.orderData.orderDetails);

    return <Card variant="outlined" fullWidth>
        <StatsInfoContainer>
            {orderDetails.map((stat, index) => 
            <StatsInfo key={index}>
                <StatsInfoLabel>{stat.label}</StatsInfoLabel>
                <StatsInfoValue>{stat.value}</StatsInfoValue>
            </StatsInfo>)}
        </StatsInfoContainer>
    </Card>
}