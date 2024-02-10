import { Skeleton } from '@mui/material';
import React from 'react';
import { Card } from 'react-bootstrap';

const ProductSkeleton = () => {
  return (
    <>
    <Card className='productCard'>
    <div className='productCard__header'>
    <Skeleton />
    </div>
      <div className='productCard__imgContainer'>
      <Skeleton variant="rectangular"  height={118}/>
      </div>
      <Card.Body className='productCard__body'>
        <Card.Title className='productCard__title'><Skeleton /></Card.Title>
        <Card.Subtitle className='productCard__itemprice'><Skeleton /></Card.Subtitle>
        <Card.Text className='productCard__description'>
        <Skeleton />
        </Card.Text>
      </Card.Body>
    <div className='productCard__footer'>
        <Skeleton />
    </div>
  </Card>
    </>
  )
}

export default ProductSkeleton;
