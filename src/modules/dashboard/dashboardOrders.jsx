import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import { setOrderItems, setOrderIndex, setOrderModal } from "../../store/orderSlice";
import Card from "../../components/Card";
import SearchInput from "../../components/Search";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Avocado from "../../assets/AvocadoHass.jpg";

const OrdersContainer = styled.section`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 1rem;
padding: 10px 20px;
& > div:first-child{
    width: max(40%, 200px);
}
& > div:last-child {
    width: 100%;
}
`;

const ProductItem = styled.div`
display: flex;
flex-direction: row;
gap: 5px;
`;

const ProductStatus = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
gap: 1.4rem;
`;

const ProductStatusChip = styled.span`
display: inline-block;
padding: 5px 10px;
color: #fff;
background-color: ${props => props.isApproved ? "green" : "red"};
border-radius: 1.8rem;
`
const OrderButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;
`;

const columns = (actionOrder = () => {}) => [
    { key: 'productName', label: 'Product Name', width: '400px', 
      render: (rowData) => <>
        <ProductItem>
            <img src={Avocado} width={60} height={60}/>
            <div>{rowData.productName}</div>
        </ProductItem>
    </> },
    { key: 'brand', label: 'Brand', width: '100px' },
    { key: 'price', label: 'Price', width: '100px', 
      render: (rowData) => <>
        <span>$</span>
        <span>{rowData.price}</span>
        <span>/6*1LB</span>
    </>  },
    { key: 'quantity', label: 'Quantity', width: '100px', 
      render: (rowData) => <>
      <strong>{rowData.quantity}</strong>
      <span>x 6 * 1LB</span>
      </>},
    { key: 'total', label: 'Total', width: '100px',
      render: (rowData) => <>
      <span>$</span>
      <span>{rowData.total}</span>
      </>},
    { key: 'status', label: 'Status', render: (rowData) => 
    <ProductStatus>
        {rowData?.status && 
        <ProductStatusChip isApproved={rowData?.isApproved}>
            {rowData?.isApproved ? "Approved" : "Missing"}
        </ProductStatusChip>
        }
        <span onClick={() => actionOrder(rowData, true)}>
            <FontAwesomeIcon icon={faCheck} color={rowData?.isApproved ? "green" : "#ccc"}/>
        </span>
        <span onClick={() => actionOrder(rowData, false)}>
            <FontAwesomeIcon icon={faXmark} color={rowData.status && !rowData?.isApproved ? "red" : "#ccc"}/>
        </span>
        <a>Edit</a>
    </ProductStatus>}
];

export default function DashboardOrders(){
    const orderList = useSelector(state => state.orderData.orderItems);
    const showOrderModal = useSelector(state => state.orderData.showOrderModal);
    const {orderIndex, orderIndexStatus} = useSelector(state => state.orderData);
    const dispatch = useDispatch();

    const actionOrder = (rowData, status) => {
        const orders = JSON.parse(JSON.stringify(orderList));
        const orderId = orders.findIndex((order) => order.id == rowData.id);
        dispatch(setOrderIndex({
            index: orderId,
            status
        }))
        dispatch(setOrderModal(true));

    }

    const actionModal = () => {
        let orders = JSON.parse(JSON.stringify(orderList));
        if(orderIndex > -1){
            orders[orderIndex].status = orderIndexStatus ? "Approved" : "Missing";
            orders[orderIndex].isApproved = orderIndexStatus; 
            dispatch(setOrderItems(orders));
        }
        dispatch(setOrderIndex({
            index: null,
            status: false
        }))
        dispatch(setOrderModal(false));
    }

    const closeModal = () => {
        dispatch(setOrderIndex({
            index: null,
            status: false
        }));
        dispatch(setOrderModal(false));
    }

    return (<>
    <Card variant="outlined">
        <OrdersContainer>
            <SearchInput placeholder={"Search..."}/>
            <DataTable columns={columns(actionOrder)} data={[...orderList]}/>
        </OrdersContainer>
    </Card>
    <Modal isOpen={showOrderModal} onClose={closeModal}>
        <h4>{orderIndexStatus ? "Approve Product" : "Missing Product"}</h4>
        {orderIndexStatus ? 
        <p>Approve {orderList?.[orderIndex]?.productName}?</p> :
        <p>Is {orderList?.[orderIndex]?.productName} urgent?</p>}
        <OrderButtonGroup>
            <Button variant="outlined" onClick={closeModal}>No</Button>
            <Button variant="standard" onClick={actionModal}>Yes</Button>
        </OrderButtonGroup>
    </Modal>
    </>)
}