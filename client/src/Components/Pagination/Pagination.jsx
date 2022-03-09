import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';

export default function BasicPagination() {
  const { page, scrollPage } = useContext(AppContext);
  return (
    <PageStyle>
      <Stack spacing={2}>
        <Pagination count={5} onClick={scrollPage} />
      </Stack>
    </PageStyle>
  );
}

const PageStyle = styled.div`
  margin: 0 auto;
  padding: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
