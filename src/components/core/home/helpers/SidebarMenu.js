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
      background: ${colors.white};
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
      }

      > span {
        color: ${colors.gray};
        font-size: 0.875rem;
        transition: all 300ms ease-in-out;
      }
    }

    :hover {
      ::before {
        height: 100%;
        background: ${colors.primary};
      }

      > div {
        > svg {
          path {
            fill: ${colors.primary};
          }
        }

        > span {
          color: ${colors.primary};
        }
      }
    }
  }

  &.active {
    > div {
      ::before {
        content: '';
        height: 100%;
        background: ${colors.primary};
      }

      > div {
        > svg {
          path {
            fill: ${colors.primary};
          }
        }

        > span {
          color: ${colors.primary};
          font-weight: 700;
        }
      }
    }
  }
`;
