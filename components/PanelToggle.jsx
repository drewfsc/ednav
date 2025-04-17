import React from 'react';
import styled from 'styled-components';

const PanelToggle = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="box-1" />
        <div className="box-2" />
        <div className="box-3" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
  }

  .box-1,
  .box-2,
  .box-3 {
    width: 1px;
    height: 115px;
    border: 1px solid #e9e9e9;
    background-color: transparent;
    box-sizing: border-box;
  }

  .box-1 {
    animation: box1animation 3s forwards ease-in-out infinite;
  }

  @keyframes box1animation {
    0% {
      width: 1px;
    }

    16.7% {
      width: 60px;
    }

    33.3% {
      width: 60px;
    }

    50% {
      width: 1px;
    }

    100% {
      width: 1px;
    }
  }

  .box-2 {
    animation: box2animation 3s forwards ease-in-out infinite;
  }

  @keyframes box2animation {
    0% {
      width: 1px;
    }

    33.3% {
      width: 1px;
    }

    50% {
      width: 60px;
    }

    66.6% {
      width: 60px;
    }

    83.3% {
      width: 1px;
    }

    100% {
      width: 1px;
    }
  }

  .box-3 {
    animation: box3animation 3s forwards ease-in-out infinite;
  }

  @keyframes box3animation {
    0% {
      width: 60px;
    }

    16.7% {
      width: 1px;
    }

    66.6% {
      width: 1px;
    }

    83.3% {
      width: 60px;
    }

    100% {
      width: 60px;
    }
  }`;

export default PanelToggle;
