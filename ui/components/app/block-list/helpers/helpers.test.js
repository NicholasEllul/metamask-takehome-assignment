import { SORTABLE_ATTRIBUTE_ENUM } from '../constants';
import { sortBlockNumbers, humanizeAttributeName } from './helpers';

function createMockBlock(modifications) {
  return {
    number: 1,
    hash: '0x1',
    nonce: '0x1',
    gasLimit: '0x1',
    gasUsed: '0x1',
    largestTransactionInWei: '0x1',
    ...modifications,
  };
}

describe('helpers', () => {
  describe('sortBlockNumbers', () => {
    it('should sort blocks by number when number is selected attribute', () => {
      const blocks = {
        '0x1': createMockBlock({ number: '0x1' }),
        '0x3': createMockBlock({ number: '0x3' }),
        '0x2': createMockBlock({ number: '0x2' }),
      };

      const sortedBlockNumbers = sortBlockNumbers(
        blocks,
        SORTABLE_ATTRIBUTE_ENUM.Number,
      );

      expect(sortedBlockNumbers).toStrictEqual(['0x3', '0x2', '0x1']);
    });
  });

  it('should sort blocks by nonce when nonce is selected attribute', () => {
    const blocks = {
      '0x1': createMockBlock({ nonce: '0x1' }),
      '0x3': createMockBlock({ nonce: '0x3' }),
      '0x2': createMockBlock({ nonce: '0x2' }),
    };

    const sortedBlockNumbers = sortBlockNumbers(
      blocks,
      SORTABLE_ATTRIBUTE_ENUM.Nonce,
    );

    expect(sortedBlockNumbers).toStrictEqual(['0x3', '0x2', '0x1']);
  });

  it('should sort blocks by gasLimit when gasLimit is selected attribute', () => {
    const blocks = {
      '0x1': createMockBlock({ gasLimit: '0x1' }),
      '0x3': createMockBlock({ gasLimit: '0x3' }),
      '0x2': createMockBlock({ gasLimit: '0x2' }),
    };

    const sortedBlockNumbers = sortBlockNumbers(
      blocks,
      SORTABLE_ATTRIBUTE_ENUM.GasLimit,
    );

    expect(sortedBlockNumbers).toStrictEqual(['0x3', '0x2', '0x1']);
  });

  it('should sort blocks by gasUsed when gasUsed is selected attribute', () => {
    const blocks = {
      '0x1': createMockBlock({ gasUsed: '0x1' }),
      '0x3': createMockBlock({ gasUsed: '0x3' }),
      '0x2': createMockBlock({ gasUsed: '0x2' }),
    };

    const sortedBlockNumbers = sortBlockNumbers(
      blocks,
      SORTABLE_ATTRIBUTE_ENUM.GasUsed,
    );

    expect(sortedBlockNumbers).toStrictEqual(['0x3', '0x2', '0x1']);
  });

  it('should sort blocks by largestTransactionInWei when largestTransactionInWei is selected attribute', () => {
    const blocks = {
      '0x1': createMockBlock({ largestTransactionInWei: '0x1' }),
      '0x3': createMockBlock({ largestTransactionInWei: '0x3' }),
      '0x2': createMockBlock({ largestTransactionInWei: '0x2' }),
    };

    const sortedBlockNumbers = sortBlockNumbers(
      blocks,
      SORTABLE_ATTRIBUTE_ENUM.LargestTransactionInWei,
    );

    expect(sortedBlockNumbers).toStrictEqual(['0x3', '0x2', '0x1']);
  });

  describe('humanizeAttributeName', () => {
    it('should return the humanized name of number', () => {
      expect(humanizeAttributeName('number')).toStrictEqual('Number');
    });

    it('should return the humanized name of nonce', () => {
      expect(humanizeAttributeName('nonce')).toStrictEqual('Nonce');
    });

    it('should return the humanized name of gasLimit', () => {
      expect(humanizeAttributeName('gasLimit')).toStrictEqual('Gas Limit');
    });

    it('should return the humanized name of gasUsed', () => {
      expect(humanizeAttributeName('gasUsed')).toStrictEqual('Gas Used');
    });

    it('should return the humanized name of largestTransactionInWei', () => {
      expect(humanizeAttributeName('largestTransactionInWei')).toStrictEqual(
        'Largest Transaction',
      );
    });

    it('should return the name of the attribute if no humanized name exists', () => {
      expect(humanizeAttributeName('foo')).toStrictEqual('foo');
    });
  });
});
