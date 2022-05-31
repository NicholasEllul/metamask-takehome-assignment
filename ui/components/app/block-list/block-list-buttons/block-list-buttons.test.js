import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import BlockListButtons from './block-list-buttons';

describe('BlockListButtons', () => {
  let props = {};

  beforeEach(() => {
    props = {
      displayingAsHex: true,
      onResetClicked: jest.fn(),
      onToggleClicked: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the reset button', () => {
    const { getByText } = render(<BlockListButtons {...props} />);

    expect(getByText('Reset Block List')).toBeInTheDocument();
  });

  it('renders the toggle button', () => {
    const { getByText } = render(
      <BlockListButtons {...props} displayingAsHex />,
    );

    expect(getByText('Display numbers as decimals')).toBeInTheDocument();
  });

  it('renders the toggle button with prompt for decimal when displaying as hex', () => {
    const { getByText } = render(
      <BlockListButtons {...props} displayingAsHex />,
    );

    expect(getByText('Display numbers as decimals')).toBeInTheDocument();
  });

  it('renders the toggle button with prompt for hex when displaying as decimal', () => {
    const { getByText } = render(
      <BlockListButtons {...props} displayingAsHex={false} />,
    );

    expect(getByText('Display numbers as hex')).toBeInTheDocument();
  });

  it('calls onResetClicked when the reset button is clicked', () => {
    const { getByText } = render(<BlockListButtons {...props} />);

    fireEvent.click(getByText('Reset Block List'));

    expect(props.onResetClicked).toHaveBeenCalled();
  });

  it('calls onToggleClicked when the toggle button is clicked', () => {
    const { getByText } = render(
      <BlockListButtons {...props} displayingAsHex />,
    );

    fireEvent.click(getByText('Display numbers as decimals'));

    expect(props.onToggleClicked).toHaveBeenCalled();
  });
});
