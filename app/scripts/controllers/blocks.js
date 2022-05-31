import { ObservableStore } from '@metamask/obs-store';
import { getUniqueId } from 'json-rpc-engine';
import pify from 'pify';

export default class BlockController {
  /**
   * Creates a BlockController
   *
   * @param {Object} opts - Options for initializing the controller
   * @param {Object} opts.provider - An EIP-1193 provider instance that uses the current global network
   * @param {Object} opts.blockTracker - A block tracker, which emits events for each new block
   */

  constructor(opts = {}) {
    const { blockTracker, provider } = opts;
    const initState = {
      blocks: {},
      displayAsHex: true,
    };

    this.store = new ObservableStore(initState);
    this._provider = provider;

    this._handleLatestBlockSynced = this._handleLatestBlockSynced.bind(this);

    blockTracker.removeListener('latest', this._handleLatestBlockSynced);
    blockTracker.addListener('latest', this._handleLatestBlockSynced);
  }

  /**
   * Clears all current blocks from the store
   *
   */

  resetBlockList() {
    this.store.updateState({
      blocks: {},
    });
  }

  /**
   * Sets whether the user wants to view the blocks as hex or decimal
   *
   * @param {boolean} displayAsHex - A boolean to indicate whether to view as hex or not
   */

  setDisplayAsHex(displayAsHex) {
    this.store.updateState({
      displayAsHex,
    });
  }

  /**
   * Handler called with the latest block number after each poll. It then will sync all blocks since the previous poll.
   *
   * @private
   * @param {number} latestBlockNumber - The number of the latest block at the time of polling.
   */

  _handleLatestBlockSynced(latestBlockNumber) {
    const lastBlockSynced = this._calculateLastBlockSynced();
    if (lastBlockSynced && lastBlockSynced !== latestBlockNumber) {
      this._syncAllMissedBlocks({
        after: lastBlockSynced,
        to: latestBlockNumber,
      });
    } else {
      this._storeBlockDetails(latestBlockNumber);
    }
  }

  /**
   * Function to sync all blocks since the last sync occurred
   *
   * @private
   * @param {Object} blockRange - Specified range of blocks to sync
   * @param {number} blockRange.after - The block number which we want to start syncing after
   * @param {number} blockRange.to - The block number which we want to sync up to
   */

  async _syncAllMissedBlocks({ after: lastBlockSynced, to: latestBlock }) {
    for (
      let blockNum = Number(hexToDecimal(lastBlockSynced)) + 1;
      blockNum <= Number(hexToDecimal(latestBlock));
      blockNum++
    ) {
      await this._storeBlockDetails(`0x${decimalToHex(blockNum)}`);
    }
  }

  /**
   * Given a block number, look up the details of that block and store it in state.
   *
   * @private
   * @param {number} blockNumber - the block number to look up.
   */

  async _storeBlockDetails(blockNumber) {
    const res = await pify(this._provider).sendAsync({
      jsonrpc: '2.0',
      method: 'eth_getBlockByNumber',
      params: [blockNumber, true],
      id: getUniqueId(),
    });

    const state = this.store.getState();
    const blockData = res?.result;

    if (blockData) {
      this.store.updateState({
        blocks: {
          ...state.blocks,
          [blockNumber]: {
            ...blockData,
          },
        },
      });
    }
  }


  /**
   * Inspects the list of synced blocks, and returns the block number of the last that we synced
   *
   * @private
   * @returns {number} The number of the last block we synced
   */

  _calculateLastBlockSynced() {
    const { blocks } = this.store.getState();
    return Object.keys(blocks).pop();
  }
}
