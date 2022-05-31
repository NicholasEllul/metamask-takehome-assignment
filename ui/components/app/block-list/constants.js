const SORTABLE_ATTRIBUTE_ENUM = {
  Number: 'number',
  Nonce: 'nonce',
  GasLimit: 'gasLimit',
  GasUsed: 'gasUsed',
  LargestTransactionInWei: 'largestTransactionInWei',
};

const SORTABLE_BLOCK_ATTRIBUTES = [
  SORTABLE_ATTRIBUTE_ENUM.Number,
  SORTABLE_ATTRIBUTE_ENUM.Nonce,
  SORTABLE_ATTRIBUTE_ENUM.GasLimit,
  SORTABLE_ATTRIBUTE_ENUM.GasUsed,
  SORTABLE_ATTRIBUTE_ENUM.LargestTransactionInWei,
];

export { SORTABLE_ATTRIBUTE_ENUM, SORTABLE_BLOCK_ATTRIBUTES };
