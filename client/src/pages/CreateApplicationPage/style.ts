import styled from 'styled-components'

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Container = styled.div`
  width: 50%;
  //border: 1px solid gray;
  //border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px;

  @media screen and (max-width: 1000px) {
    width: 80%;
    padding: 20px;
  }
`
