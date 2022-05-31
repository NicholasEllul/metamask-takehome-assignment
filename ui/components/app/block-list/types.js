import PropTypes from 'prop-types';

const BlockPropType = PropTypes.shape({
  number: PropTypes.string,
  hash: PropTypes.string,
  nonce: PropTypes.string,
  gasLimit: PropTypes.string,
  gasUsed: PropTypes.string,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
    }),
  ),
  largestTransactionInWei: PropTypes.string,
});

export { BlockPropType };
