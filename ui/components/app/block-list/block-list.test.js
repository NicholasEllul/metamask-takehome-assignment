import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { renderWithProvider, fireEvent } from '../../../../test/jest';
import BlockList from './block-list';

const mockSetDisplayAsHex = jest
  .fn()
  .mockImplementation(() => ({ type: 'test' }));
const mockResetBlockList = jest
  .fn()
  .mockImplementation(() => ({ type: 'test' }));

jest.mock('../../../store/actions', () => ({
  setDisplayAsHex: (...args) => mockSetDisplayAsHex(...args),
  resetBlockList: (...args) => mockResetBlockList(...args),
}));

describe('BlockList', () => {
  const createBlocksMockStore = () => {
    return {
      metamask: {
        blocks: [
          {
            number: '0x1',
            hash: '0x2',
            nonce: '0x3',
            gasLimit: '0x4',
            gasUsed: '0x5',
            transactions: ['0x6'],
            largestTransactionInWei: '0x7',
          },
        ],
        displayAsHex: true,
      },
    };
  };

  const middleware = [thunk];

  it('issues action to clear blocks when reset button is clicked', () => {
    const store = configureMockStore(middleware)(createBlocksMockStore());
    const { getByText } = renderWithProvider(<BlockList />, store);

    expect(mockResetBlockList.mock.calls).toHaveLength(0);

    fireEvent.click(getByText('Reset Block List'));

    expect(mockResetBlockList).toHaveBeenCalled();
  });

  it('issues action to toggles displaying blocks as hex vs decimal when button is clicked', () => {
    const store = configureMockStore(middleware)(createBlocksMockStore());
    const { queryByText } = renderWithProvider(<BlockList />, store);
    const displayAsHexState = store.getState().metamask.displayAsHex;

    expect(displayAsHexState).toBe(true);

    fireEvent.click(queryByText('Display numbers as decimals'));

    expect(mockSetDisplayAsHex).toHaveBeenCalledWith(false);
  });
});
