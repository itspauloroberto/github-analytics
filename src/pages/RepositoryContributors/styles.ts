import styled from 'styled-components';

const InfiniteContainer = styled.div`
  width: 80vw;
  max-width: 800px;
  height: 80vh;
  padding: 8px 24px;
  overflow: auto;
  border: 1px solid #eee;
  border-radius: 4px;
`;

const LoadingContainer = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const AvatarWrapper = styled.div`
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

export {
  InfiniteContainer,
  LoadingContainer,
  MainContainer,
  IconWrapper,
  AvatarWrapper,
};
