import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../../ui/dropdown';
import { SORTABLE_BLOCK_ATTRIBUTES } from '../constants';
import { humanizeAttributeName } from '../helpers';

const BlockListSortDropdown = ({ selectedAttribute, setSelectedAttribute }) => {
  const dropdownOptions = useMemo(() => {
    return SORTABLE_BLOCK_ATTRIBUTES.map((attribute) => {
      return {
        name: humanizeAttributeName(attribute),
        value: attribute,
      };
    });
  }, []);

  return (
    <Dropdown
      options={dropdownOptions}
      selectedOption={selectedAttribute}
      onChange={setSelectedAttribute}
    />
  );
};

BlockListSortDropdown.propTypes = {
  selectedAttribute: PropTypes.oneOf(SORTABLE_BLOCK_ATTRIBUTES),
  setSelectedAttribute: PropTypes.func,
};

export default BlockListSortDropdown;
