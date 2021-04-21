import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import colors from '../../../../config/colors';

import SidebarMenuIcon from './SidebarMenuIcon';
function SidebarMenu({ className, icon, title, url = '/' }) {
  return (
    <NavLink className={className} to={url}>
      <div>
        <div>
          <SidebarMenuIcon icon={icon} />
          <span>{title}</span>
        </div>
      </div>
    </NavLink>
  );
}

SidebarMenu.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.any,
  title: PropTypes.string,
  url: PropTypes.string
};

export default styled(SidebarMenu)`
  > div {
    position: relative;

    ::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 6px;
      height: 0px;
      border-radius: 0 5px 5px 0;
      background: ${getIndicatorBackground()};
      transition: all 300ms ease-in-out;
    }

    > div {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;

      > svg {
        display: inline-block;
        margin-right: 1rem;
        transition: all 300ms ease-in-out;

        path {
          fill: ${getIconColor()};
        }
      }

      > span {
        color: ${getTextColor()};
        font-size: 0.75rem;
        transition: all 300ms ease-in-out;
      }
    }

    :hover {
      ::before {
        height: 100%;
        background: ${getIndicatorBackground(false, true)};
      }

      > div {
        > svg {
          path {
            fill: ${getIconColor(false, true)};
          }
        }

        > span {
          color: ${getTextColor(false, true)};
        }
      }
    }
  }

  &.active {
    > div {
      ::before {
        height: 100%;
        background: ${getIndicatorBackground(true)};
      }

      > div {
        > svg {
          path {
            fill: ${getIconColor(true)};
          }
        }

        > span {
          color: ${getTextColor(true)};
          font-weight: 700;
        }
      }
    }
  }
`;

function getIndicatorBackground(active = false, hovered = false) {
  return getColor(active, hovered);
}

function getTextColor(active = false, hovered = false) {
  return getColor(active, hovered);
}

function getIconColor(active = false, hovered = false) {
  return getColor(active, hovered);
}

function getColor(active, hover) {
  return active || hover ? colors.white : colors.grayLight;
}
