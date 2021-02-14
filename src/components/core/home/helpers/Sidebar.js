import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import arrowLeftIcon from '../../../../assets/images/arrow-left.svg';
import { childrenPropType } from '../../../../utils/default-prop-types';
import colors from '../../../../config/colors';
import dimens from '../../../../config/dimens';

function Sidebar({ className, title, children, onBackClick }) {
  return (
    <div className={className}>
      <div>
        <div>
          <div onClick={onBackClick}>
            <img src={arrowLeftIcon} alt='' />
            <span>Retour à l&apos;accueil</span>
          </div>
          <h5>{title}</h5>
        </div>
        {children}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: childrenPropType,
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
    background: #ffffff;
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
          color: ${colors.gray};
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
    }
  }
`;
