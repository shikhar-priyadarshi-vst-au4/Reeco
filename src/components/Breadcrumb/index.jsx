import styled from 'styled-components';

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #333; // Adjust the color to your design
`;

const BreadcrumbItem = styled.span`
  &:after {
    content: '>';
    margin: 0 8px;
  }

  &:last-child:after {
    content: '';
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #212121; // Adjust the link color to your design
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Breadcrumb(props){
    return <BreadcrumbContainer>
    {props.items.map((item, index) => (
      <BreadcrumbItem key={index}>
        <a href={item.url}>{item.label}</a>
      </BreadcrumbItem>
    ))}
  </BreadcrumbContainer>
}