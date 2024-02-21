import { Skeleton } from '@mui/material';
import React from 'react';
import { Card } from 'react-bootstrap';

const OfferSkeleton = () => {
  return (
    <>
    <Card className='offerCard'>
    <div className='offerCard__header'>
    <Skeleton />
    </div>
      <div className='offerCard__imgContainer'>
      <Skeleton variant="rectangular"  height={118}/>
      </div>
      <Card.Body className='offerCard__body'>
        <Card.Title className='offerCard__title'><Skeleton /></Card.Title>
        <Card.Subtitle className='offerCard__itemprice'><Skeleton /></Card.Subtitle>
        <Card.Text className='offerCard__description'>
        <Skeleton />
        </Card.Text>
      </Card.Body>
    <div className='offerCard__footer'>
        <Skeleton />
    </div>
  </Card>
    </>
  )
}

export default OfferSkeleton;
