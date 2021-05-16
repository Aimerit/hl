import styled from 'styled-components';

export default function (UnStyledSortingArrows) {
    return styled(UnStyledSortingArrows)`
        display: grid;
        grid-template-rows: 1fr 1fr;
        gap: 2.5px;
    `;
}
