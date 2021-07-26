import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 2rem;
  background: var(--primary-color);
  border-radius: 1rem;
  border: 0.2rem solid var(--primary-color);
  color: var(--secondary-color);
  padding: 1.6rem;
  width: 100%;
  display: flex;
  align-items: center;

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: var(--secondary-color);
    }
  }

  svg {
    margin-right: 16px;
  }
`;
