import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  hexToDecimal,
  hexWEIToDecETH,
} from '../../../../helpers/utils/conversions.util';
import { BlockPropType } from '../types';

const BlockListItem = ({ block, displayAsHex }) => {
  const { transactions } = block;
  const blockNumber = displayAsHex ? block.number : hexToDecimal(block.number);
  const hash = displayAsHex ? block.hash : hexToDecimal(block.hash);
  const nonce = displayAsHex ? block.nonce : hexToDecimal(block.nonce);
  const gasLimit = displayAsHex ? block.gasLimit : hexToDecimal(block.gasLimit);
  const gasUsed = displayAsHex ? block.gasUsed : hexToDecimal(block.gasUsed);
  const largestTransaction = hexWEIToDecETH(block.largestTransactionInWei);

  return (
    <div className="block-list__block">
      <span>{`Number: ${blockNumber}`}</span>
      <span>{`Hash: ${hash}`}</span>
      <span>{`Nonce: ${nonce}`}</span>
      <span>{`Gas Limit: ${gasLimit}`}</span>
      <span>{`Gas Used: ${gasUsed}`}</span>
      <span>{`Transaction Count: ${transactions.length}`}</span>
      <span>{`Largest Transaction: ${largestTransaction} ETH`}</span>
    </div>
  );
};

BlockListItem.propTypes = {
  block: BlockPropType,
  displayAsHex: PropTypes.bool,
};

const MemoizedBlockListItem = ({ block, displayAsHex }) => {
  return useMemo(() => {
    return <BlockListItem block={block} displayAsHex={displayAsHex} />;

    // Eslint wants blocks object passed in however its the block hash (not blocks object reference)
    // that we want to use to determine if a re-render is needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.hash, displayAsHex]);
};

export default MemoizedBlockListItem;
