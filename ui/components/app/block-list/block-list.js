import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisplayAsHex, resetBlockList } from '../../../store/actions';
import { SORTABLE_BLOCK_ATTRIBUTES } from './constants';
import BlockListButtons from './block-list-buttons';
import BlockListItem from './block-list-item';
import BlockListSortDropdown from './block-list-sort-dropdown';
import { sortBlockNumbers } from './helpers';

const BlockList = () => {
  const dispatch = useDispatch();
  const displayingAsHex = useSelector((state) => state.metamask.displayAsHex);
  const blocksObject = useSelector((state) => state.metamask.blocks);
  const [attributeSortedBy, setAttributeToSortBy] = useState(
    SORTABLE_BLOCK_ATTRIBUTES[0],
  );
  const sortedBlockNumbers = sortBlockNumbers(blocksObject, attributeSortedBy);

  return (
    <div className="block-list">
      <BlockListButtons
        displayingAsHex={displayingAsHex}
        onResetClicked={() => dispatch(resetBlockList())}
        onToggleClicked={() => dispatch(setDisplayAsHex(!displayingAsHex))}
      />
      <BlockListSortDropdown
        selectedAttribute={attributeSortedBy}
        setSelectedAttribute={setAttributeToSortBy}
      />
      {sortedBlockNumbers.map((blockNumber) => (
        <BlockListItem
          key={blocksObject[blockNumber].hash}
          block={blocksObject[blockNumber]}
          displayAsHex={displayingAsHex}
        />
      ))}
    </div>
  );
};

export default BlockList;
