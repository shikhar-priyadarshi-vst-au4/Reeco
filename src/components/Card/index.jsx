import React from 'react';
import styled from 'styled-components';

const variants = {
  outlined: {
    boxShadow: 'none',
  },
  standard: {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  }
}

const fs = {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '22px',
    '3xl': '24px',
}

const minW = {
    xs: '280px',
    sm: '450px',
    md: '600px',
    lg: '1024px',
    fullW: '100%'
}

const CardContainer = styled.div`
  border: 1px solid #e0e0e0; /* Card border color */
  border-radius: 4px; /* Card border radius */
  box-sizing: border-box;
  box-shadow: ${props => props.variant in variants ? 
    variants[props.variant].boxShadow : 
    variants.standard.boxShadow}; /* Card box shadow */
  padding: 16px; /* Card padding */
  background-color: #fff; /* Card background color */
  min-width: ${props => props.minW in minW ? minW[props.minW] : minW.md}; /* Card width */
  width: ${props => props.fullWidth ? minW.fullW : 'auto'};
`;

const CardTitle = styled.h2`
  font-size: 18px; /* Title font size */
  margin-bottom: 8px; /* Spacing between title and content */
`;

const CardContent = styled.p`
  font-size: ${props => props.fSize in fs ? fs[props.fSize] : fs.md}; /* Content font size */
  color: #333; /* Content text color */
`;

const Card = ({
    variant = "standard", 
    minW = "md", 
    fSize = "md", 
    fullWidth = false, 
    title = null, 
    header = null, 
    children 
    }) => {
    return (
      <CardContainer
        variant={variant} 
        minW={minW} 
        fullWidth={fullWidth}>
        {header}
        {title && <CardTitle>{title}</CardTitle>}
        <CardContent fSize={fSize}>{children}</CardContent>
      </CardContainer>
    );
};

export default Card;