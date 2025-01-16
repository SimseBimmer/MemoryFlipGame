import React from 'react';
import styled from 'styled-components';

// Styled component for card container
const CardContainer = styled.div`
  width: 100px;
  height: 150px;
  perspective: 1000px;
  margin: 0 auto;
`;

// Styled component for card inner part
const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${props => (props.$flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

// Styled component for card front
const CardFront = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background: url('/images/card-back.png') no-repeat center/cover;
  background-color: #ccc; // Fallback color if image is not found
`;

// Styled component for card back
const CardBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background: url(${props => props.$image}) no-repeat center/cover;
  transform: rotateY(180deg);
`;

// Card component
const Card = ({ image, flipped, onClick }) => (
  <CardContainer onClick={onClick}>
    <CardInner $flipped={flipped}>
      <CardFront />
      <CardBack $image={image} />
    </CardInner>
  </CardContainer>
);

export default Card;