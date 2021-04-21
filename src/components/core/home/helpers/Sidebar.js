import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from '../../../../config/colors';
import dimens from '../../../../config/dimens';

import Icons from '../../../helpers/Icons';
import SidebarMenu from './SidebarMenu';

function displaySidebarMenuItems(menuItems = []) {
  return menuItems.map(({ icon, title, url }, index) => <SidebarMenu key={index} icon={icon} title={title} url={url} />);
}
function Sidebar({ className, title, menuItems = [], onBackClick }) {
  return (
    <div className={className}>
      <div>
        <div>
          <div onClick={onBackClick}>
            <img src={Icons.arrowLeftIcon} alt='' />
            <span>Retour à l&apos;accueil</span>
          </div>
          <h5>{title}</h5>
        </div>
        <div>{displaySidebarMenuItems(menuItems)}</div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.any,
      title: PropTypes.string,
      url: PropTypes.string
    })
  ),
  onBackClick: PropTypes.func.isRequired
};

export default styled(Sidebar)`
  position: fixed;
  top: 80px;
  bottom: 0;
  width: ${dimens.sidebarWidth};
  overflow: hidden;

  > div {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: ${colors.primary};
    position: relative;
    display: flex;
    flex-direction: column;

    ::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background: #e7eaf3;
    }

    > div {
      :first-child {
        padding: 1rem 1.5rem;

        > div {
          display: flex;
          font-size: 12px;
          align-items: center;
          color: ${colors.grayLight};
          cursor: pointer;

          > img {
            display: inline-block;
            margin-right: 0.25rem;
          }

          > span {
            transition: all 300ms ease-in-out;
          }

          :hover {
            > span {
              text-decoration: underline;
            }
          }
        }

        > h5 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          color: ${colors.secondary};
        }
      }

      :last-child {
        margin-top: 1rem;
      }
    }
  }
`;
