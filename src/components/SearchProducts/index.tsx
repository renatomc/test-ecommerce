import React from 'react';

import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

interface SearchProductsProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchProducts: React.FC<SearchProductsProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <Container>
      <MdSearch size={20} />
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        type="text"
        name="get-products"
        placeholder="Buscar produtos"
      />
    </Container>
  );
};

export default SearchProducts;
