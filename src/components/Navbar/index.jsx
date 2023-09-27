import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Outlet, useNavigate } from 'react-router-dom';


const NavbarContainer = styled.nav`
  background-color: #35A29F;
  color: #fff;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  align-items: center;
  padding: 0.875rem;
`;

const NavbarBrand = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const NavbarMenu = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
`;

const NavbarMenuItem = styled.li`
  font-size: 16px;
  position: relative;
  padding: 0 1rem;
`;

const NavbarLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
  white-space: nowrap;

//   &:hover {
//     color: #007bff;
//   }

//   &[aria-current='page'] {
//     font-weight: bold;
//   }
`;

const NavbarDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #333;
  display: none;
  flex-direction: column;
  min-width: 150px;
  z-index: 1;

  ${NavbarMenuItem}:hover & {
    display: flex;
  }
`;

const NavbarDropdownItem = styled(Link)`
  text-decoration: none;
  color: #fff;
  padding: 8px 16px;

  &:hover {
    background-color: #444;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavbarContainer>
      <NavbarBrand to="/">Reeco</NavbarBrand>
      <NavbarMenu>
        <NavbarMenuItem>
          <NavbarLink to="/">Store</NavbarLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarLink to="/about">Orders</NavbarLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarLink to="/about">Analytics</NavbarLink>
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarMenu>
        <NavbarMenuItem>
          <NavbarLink to="/">Hi, James</NavbarLink>
          <NavbarDropdown>
            <NavbarDropdownItem to="/">Profile</NavbarDropdownItem>
            <NavbarDropdownItem to="/">Settings</NavbarDropdownItem>
          </NavbarDropdown>
        </NavbarMenuItem>
      </NavbarMenu>
    </NavbarContainer>
  );
};

export default Navbar;
