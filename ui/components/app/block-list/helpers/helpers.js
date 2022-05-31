import { SORTABLE_ATTRIBUTE_ENUM } from '../constants';

export function sortBlockNumbers(blocksObject, attributeToSortOn) {
  return Object.keys(blocksObject).sort((blockANum, blockBNum) => {
    return (
      blocksObject[blockBNum][attributeToSortOn] -
      blocksObject[blockANum][attributeToSortOn]
    );
  });
}

export function humanizeAttributeName(attribute) {
  switch (attribute) {
    case SORTABLE_ATTRIBUTE_ENUM.Number:
      return 'Number';
    case SORTABLE_ATTRIBUTE_ENUM.Nonce:
      return 'Nonce';
    case SORTABLE_ATTRIBUTE_ENUM.GasLimit:
      return 'Gas Limit';
    case SORTABLE_ATTRIBUTE_ENUM.GasUsed:
      return 'Gas Used';
    case SORTABLE_ATTRIBUTE_ENUM.LargestTransactionInWei:
      return 'Largest Transaction';
    default:
      return attribute;
  }
}
