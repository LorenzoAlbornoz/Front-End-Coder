import React from 'react';
import Form from 'react-bootstrap/Form';

const SelectOrder = ({ onOrderChange }) => {
  const handleOrderChange = (e) => {
    const selectedValue = e.target.value;
    onOrderChange(selectedValue);
  };

  return (
    <div className="select-order-container">
      <p className='titleSelect'>Ordenar por</p>
      <Form.Select aria-label="Default select example" className='formSelect' onChange={handleOrderChange}>
        <option value="1">Más relevante</option>
        <option value="2">Menor precio</option>
        <option value="3">Mayor precio</option>
        <option value="4">A-Z</option>
        <option value="5">Z-A</option>
      </Form.Select>
    </div>
  );
};

export default SelectOrder;

