import React from 'react';
import { renderWithProvider } from '../../../../../test/jest';
import BlockListItem from './block-list-item';

const createMockBlock = (modifications = {}) => {
  return {
    number: '0x1',
    hash: '0x2',
    nonce: '0x3',
    gasLimit: '0x4',
    gasUsed: '0x5',
    transactions: ['0x6'],
    largestTransactionInWei: '0xDE0B6B3A7640000', // 1 eth in wei
    ...modifications,
  };
};

describe('BlockListItem', () => {
  const defaultProps = {
    block: createMockBlock(),
    displayAsHex: true,
  };

  it('renders values as hex when displayAsHex is true', () => {
    const { getByText } = renderWithProvider(
      <BlockListItem {...defaultProps} displayAsHex />,
    );

    expect(getByText('Number: 0x1')).toBeInTheDocument();
    expect(getByText('Hash: 0x2')).toBeInTheDocument();
    expect(getByText('Nonce: 0x3')).toBeInTheDocument();
    expect(getByText('Gas Limit: 0x4')).toBeInTheDocument();
    expect(getByText('Gas Used: 0x5')).toBeInTheDocument();
  });

  it('renders values as decimal when displayAsHex is false', () => {
    const { getByText } = renderWithProvider(
      <BlockListItem {...defaultProps} displayAsHex={false} />,
    );

    expect(getByText('Number: 1')).toBeInTheDocument();
    expect(getByText('Hash: 2')).toBeInTheDocument();
    expect(getByText('Nonce: 3')).toBeInTheDocument();
    expect(getByText('Gas Limit: 4')).toBeInTheDocument();
    expect(getByText('Gas Used: 5')).toBeInTheDocument();
  });

  it('renders the transaction count as a decimal even when displayAsHex is shown', () => {
    const { getByText } = renderWithProvider(
      <BlockListItem {...defaultProps} displayAsHex />,
    );

    expect(getByText('Transaction Count: 1')).toBeInTheDocument();
  });

  it('renders the largest transaction as a decimal even when displayAsHex is shown', () => {
    const { getByText } = renderWithProvider(
      <BlockListItem {...defaultProps} displayAsHex />,
    );

    expect(getByText('Largest Transaction: 1 ETH')).toBeInTheDocument();
  });

  it('renders the largest transaction in ethers instead of wei', () => {
    const oneEthInWei = '0xDE0B6B3A7640000';
    const threeEthInWei = (oneEthInWei * 3).toString(16);

    const block = createMockBlock({
      largestTransactionInWei: threeEthInWei,
    });

    const { getByText } = renderWithProvider(
      <BlockListItem {...defaultProps} block={block} />,
    );

    expect(getByText('Largest Transaction: 3 ETH')).toBeInTheDocument();
  });
});
