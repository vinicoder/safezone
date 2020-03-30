import React from 'react';
import styled from 'styled-components';

export const Label = styled.label`
  font-family: sans-serif;
  font-weight: 500;
  background: rgb(238, 66, 102, ${props => (props.checked ? '100%' : '70%')});
  padding: 7px 17px 5px 10px;
  border-radius: 20px;
  color: #fff;
  margin: 5px 5px 0 0;
  display: inline-block;
  user-select: none;
  cursor: pointer;
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

const CheckboxShaped = React.forwardRef(
  ({ className, checked, children, ...props }, ref) => {
    return (
      <Label checked={checked}>
        <CheckboxContainer className={className}>
          <HiddenCheckbox
            type="checkbox"
            ref={ref}
            checked={checked}
            {...props}
          />
          <StyledCheckbox checked={checked}>
            <Icon viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </Icon>
          </StyledCheckbox>
        </CheckboxContainer>
        {children}
      </Label>
    );
  }
);

export default CheckboxShaped;
