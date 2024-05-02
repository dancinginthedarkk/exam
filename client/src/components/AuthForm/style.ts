import styled from 'styled-components'

export const FormContainer = styled.form`
  width: 35%;
  border: 1px solid gray;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 30px;

  @media screen and (max-width: 1000px) {
    width: 80%;
    padding: 20px;
  }
`
