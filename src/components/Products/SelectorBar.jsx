import React from 'react';
import SelectOrder from './SelectOrder';
import Container from 'react-bootstrap/Container';

const SelectorBar = ({ onOrderChange }) => {
  return (
    <>
      <Container className='aside'>
        <SelectOrder onOrderChange={onOrderChange} />
      </Container>
    </>
  );
};

export default SelectorBar;
