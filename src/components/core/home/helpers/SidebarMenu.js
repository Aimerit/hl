import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function SidebarMenu({ className, icon, title }) {
  return (
    <NavLink className={className}>
      <div>
        <div>
          <img src={icon} alt='' />
          <span>{title}</span>
        </div>
      </div>
    </NavLink>
  );
}

SidebarMenu.propTypes = {
  className: PropTypes.string
};

export default styled(SidebarMenu)`
  > div {
    position: relative;

    > div {
      display: flex;
      padding: 1rem 1.5rem;

      > img {
        display: inline-block;
        margin-right: 1rem;
      }
    }
  }
`;
