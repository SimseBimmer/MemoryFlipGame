import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 100px;
  height: 150px;
  perspective: 1000px;
  margin: 0 auto;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${props => (props.$flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background: url('/images/card-back.png') no-repeat center/cover;
  background-color: #ccc; // Fallback color if image is not found
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background: url(${props => props.$image}) no-repeat center/cover;
  transform: rotateY(180deg);
`;

const Card = ({ image, flipped, onClick }) => (
  <CardContainer onClick={onClick}>
    <CardInner $flipped={flipped}>
      <CardFront />
      <CardBack $image={image} />
    </CardInner>
  </CardContainer>
);

export default Card;