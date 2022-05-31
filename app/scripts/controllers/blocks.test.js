import { strict as assert } from 'assert';
import sinon from 'sinon';
import BlocksController from './blocks';
import NetworkController from './network/network';

describe('BlocksController', function () {
  describe('listening for blocks', function () {
    it('should remove any preexisting listeners for latest block', async function () {
      const blockTracker = getMockBlockTracker();

      BlocksController({
        blockTracker,
        provider: getMockProvider(),
      });

      assert(blockTracker.removeListener.calledOnce);
      assert.strictEqual(
        blockTracker.removeListener.getCall(0).args[0],
        'latest',
      );
    });

    it('should set up a listener for the latest block', async function () {
      const blockTracker = getMockBlockTracker();

      BlocksController({
        blockTracker,
        provider: getMockProvider(),
      });

      assert(blockTracker.addListener.calledOnce);
      assert.strictEqual(blockTracker.addListener.getCall(0).args[0], 'latest');
    });
  });

  describe('_handleLatestBlockSynced', function () {
    it('should sync only the latest block if no other blocks are synced', function () {
      const blockController = createBlockController();
      const storeBlockDetailsStub = sinon.stub(
        blockController,
        '_storeBlockDetails',
      );

      blockController.store.updateState({ blocks: {} });
      blockController._handleLatestBlockSynced('0x1');

      assertCalledOnce(storeBlockDetailsStub);
      sinon.assert.calledWith(storeBlockDetailsStub, '0x1');
    });

    it('should sync all blocks since the last sync if there are blocks already synced', function () {
      const blockController = createBlockController();
      const syncAllMissedBlockStub = sinon.spy(
        blockController,
        '_syncAllMissedBlocks',
      );

      blockController.store.updateState({
        blocks: {
          '0x1': getMockBlock(),
        },
      });
      blockController._handleLatestBlockSynced('0x5');

      assertCalledOnce(syncAllMissedBlockStub);
      sinon.assert.calledWith(syncAllMissedBlockStub, {
        after: '0x1',
        to: '0x5',
      });
    });
  });

  describe('_storeBlockDetails', function () {
    const blockController = createBlockController();
    const block = getMockBlock();

    it('should store the block details in the store', async function () {
      await blockController._storeBlockDetails(block.number);

      assertBlockStored(blockController, block.number);
    });
  });

  describe('_syncAllMissedBlocks', function () {
    const blockController = createBlockController();

    it('should call storeBlockDetails for all blocks in range', async function () {
      const storeBlockDetailsStub = sinon.stub(
        blockController,
        '_storeBlockDetails',
      );
      await blockController._syncAllMissedBlocks({
        after: '0x1',
        to: '0x5',
      });

      assert.strictEqual(storeBlockDetailsStub.callCount, 4);
      sinon.assert.calledWith(storeBlockDetailsStub, '0x2');
      sinon.assert.calledWith(storeBlockDetailsStub, '0x3');
      sinon.assert.calledWith(storeBlockDetailsStub, '0x4');
      sinon.assert.calledWith(storeBlockDetailsStub, '0x5');
    });
  });

  describe('_withAdditionalFields', function () {
    it('should return the largest transaction from the block', async function () {
      const blockController = createBlockController();
      const block = {
        transactions: [{ value: '0x1' }, { value: '0x23' }, { value: '0x2' }],
      };

      const additionalFields = blockController._additionalBlockFields(block);

      assert.strictEqual(additionalFields.largestTransactionInWei, '0x23');
    });

    it('should return 0 as the largest transaction if none exist', function () {
      const blockController = createBlockController();
      const block = {
        transactions: [],
      };

      const additionalFields = blockController._additionalBlockFields(block);

      assert.strictEqual(additionalFields.largestTransactionInWei, '0x0');
    });
  });

  describe('_calculateLastBlockSynced', function () {
    it('should return the last block synced if it exists', function () {
      const blockController = createBlockController();
      blockController.store.updateState({
        blocks: {
          '0x1': {
            number: '0x1',
          },
        },
      });

      assert.strictEqual(blockController._calculateLastBlockSynced(), '0x1');

      blockController.store.updateState({
        blocks: {
          '0x2': {
            number: '0x2',
          },
        },
      });

      assert.strictEqual(blockController._calculateLastBlockSynced(), '0x2');
    });

    it('should return undefined if no blocks are synced', function () {
      const blockController = createBlockController();
      assert.strictEqual(
        blockController._calculateLastBlockSynced(),
        undefined,
      );
    });
  });

  describe('resetBlockList', function () {
    it('should reset the block list', function () {
      const blockController = createBlockController();
      blockController.store.updateState({
        blocks: {
          '0x1': getMockBlock(),
        },
      });

      blockController.resetBlockList();

      assert.deepEqual(blockController.store.getState().blocks, {});
    });
  });

  describe('setDisplayAsHex', function () {
    it('should set the displayAsHex flag', function () {
      const blockController = createBlockController();

      blockController.setDisplayAsHex(true);
      assert.strictEqual(blockController.store.getState().displayAsHex, true);

      blockController.setDisplayAsHex(false);
      assert.strictEqual(blockController.store.getState().displayAsHex, false);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});

function assertBlockStored(blockController, blockNumber) {
  const blockFromState = blockController.store.getState().blocks[blockNumber];
  assert.deepEqual(blockFromState, getMockBlock());
}

function assertCalledOnce(sinonObj) {
  assert.strictEqual(sinonObj.callCount, 1);
}

function createNetwork() {
  const network = new NetworkController();
  const networkControllerProviderConfig = {
    getAccounts: () => undefined,
  };

  network.setInfuraProjectId('foo');
  network.initializeProvider(networkControllerProviderConfig);
  return network;
}

function getMockBlock(modifications) {
  return {
    number: '0x1',
    hash: '0x2',
    nonce: '0x3',
    gasLimit: '0x4',
    gasUsed: '0x5',
    transactions: [{ value: '0x6' }],
    largestTransactionInWei: '0x6',
    ...modifications,
  };
}

function getMockBlockTracker() {
  return {
    addListener: sinon.stub(),
    removeListener: sinon.spy(),
  };
}

function getMockProvider() {
  const network = createNetwork();
  const { provider } = network.getProviderAndBlockTracker();

  provider.sendAsync = (_, callback) => {
    const error = null;
    const result = { result: getMockBlock() };

    return callback(error, result);
  };

  return provider;
}

function createBlockController() {
  return new BlocksController({
    blockTracker: getMockBlockTracker(),
    provider: getMockProvider(),
  });
}
