import styled from 'styled-components';

export const Container = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
      font-size: 1.5rem;
      color: var(--font-primary-color);
    }

    input {
      margin-top: 0.8rem;
      width: 20rem;
      height: 2rem;
      border-radius: 0.4rem;
      padding: 0 0.8rem;
    }

    button {
      margin-top: 2rem;
      border-radius: 0.4rem;
      padding: 0.8rem 1rem;
      background: var(--secondary-color);
      color: var(--font-primary-color);
    }
  }

  > button {
    float: right;
    margin-top: 2rem;
    border-radius: 0.4rem;
    padding: 0.8rem 1rem;
    background: var(--secondary-color);
    color: var(--font-primary-color);
  }
`;
