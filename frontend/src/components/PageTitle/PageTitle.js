import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    margin-bottom: 0;
    color: #616161;
`;
const SubTitle = styled.p`
    margin-top: 0.75rem;
`;
export const PageTitle = () => (
    <div>
        <Title>Staking Calculator</Title>
        <SubTitle>With the tool below you can calculate your reward in $BAY coins for operating BITBAY nodes</SubTitle>
    </div>

)