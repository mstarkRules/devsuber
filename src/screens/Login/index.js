import React from 'react';

import {
   Container, 
   Header, 
   HeaderTitle,
   Menu,
   MenuItem,
   MenuItemText
  } from './styled';

const Page = ()=>{
    return (
      <Container>
        <Header>
          <HeaderTitle>DevsUber</HeaderTitle>
        </Header>
        <Menu>
          <MenuItem>
            <MenuItemText>Login</MenuItemText>
          </MenuItem>
          <MenuItem>
            <MenuItemText>Cadastrar</MenuItemText>
          </MenuItem>
        </Menu>
      </Container>
    );
  }

  export default Page;