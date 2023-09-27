import React from 'react';
import styled from 'styled-components';

const variants = {
    filled: {
        primary: '#fff',
        secondary: '#35A29F'
    },
    outlined: {
        primary: '#35A29F',
        secondary: '#fff',
    }
}

const StyledButton = styled.button`
  color: ${props => props.primary};
  border: 1px solid ${props => props.primary};
  background-color: ${props => props.secondary};
  border-radius: 1.8rem;
  cursor: pointer;
  font-size: 14px;
  padding: 10px 20px;
`;

const Button = ({ variant = "filled", children, onClick }) => {
    const {primary, secondary} = variant in variants ? variants[variant] : variants.filled;
    return (
      <StyledButton  
        primary={primary}
        secondary={secondary}
        onClick={onClick}>
        {children}
      </StyledButton>
    );
};

export default Button;