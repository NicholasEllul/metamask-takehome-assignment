import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../ui/button';

const BlockListButtons = ({
  displayingAsHex,
  onResetClicked,
  onToggleClicked,
}) => {
  return (
    <div className="block-list__buttons">
      <Button type="secondary" rounded onClick={onResetClicked}>
        Reset Block List
      </Button>
      <Button type="secondary" rounded onClick={onToggleClicked}>
        {displayingAsHex
          ? 'Display numbers as decimals'
          : 'Display numbers as hex'}
      </Button>
    </div>
  );
};

BlockListButtons.propTypes = {
  displayingAsHex: PropTypes.bool,
  onResetClicked: PropTypes.func,
  onToggleClicked: PropTypes.func,
};

export default BlockListButtons;
