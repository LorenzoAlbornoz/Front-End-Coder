import { Skeleton } from '@mui/material';
import React from 'react';
import { Card } from 'react-bootstrap';

const FeaturedSkeleton = () => {
  return (
    <>
      <Card className='featuredCard'>
        <div className='featuredCard__header'>
          <Skeleton />
        </div>
        <div className='featuredCard__imgContainer'>
          <Skeleton variant="rectangular" height={118} />
        </div>
        <Card.Body className='featuredCard__body'>
          <Card.Title className='featuredCard__title'><Skeleton /></Card.Title>
          <Card.Subtitle className='featuredCard__itemprice'><Skeleton /></Card.Subtitle>
          <Card.Text className='featuredCard__description'>
            <Skeleton />
          </Card.Text>
        </Card.Body>
        <div className='featuredCard__footer'>
          <Skeleton />
        </div>
      </Card>
    </>
  )
}

export default FeaturedSkeleton;
