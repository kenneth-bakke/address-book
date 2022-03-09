import React, { useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../../AppContext';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination() {
  const { scrollPage } = useContext(AppContext);
  return (
    <PageStyle>
      <Stack spacing={2}>
        <Pagination count={19} onClick={scrollPage} />
      </Stack>
    </PageStyle>
  );
}

const PageStyle = styled.div`
  margin: 0 auto;
  padding: 5px;
  top: 50%;
  bottom: 5px;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
