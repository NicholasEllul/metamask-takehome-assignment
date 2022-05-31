import { humanizeAttributeName } from './helpers';

describe('helpers', () => {
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
