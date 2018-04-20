import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    color: #6357AC;
    font-size: 2.5rem;
`;
const SubTitle = styled.p`
    margin-top: 1.75rem;
    font-weight: 700;
    font-size: .9rem;
`;
export const PageTitle = () => (
    <div>
        <Title>BitBay staking calculator</Title>
        <SubTitle>With the tool below you can calculate your reward in $BAY coins for operating BITBAY nodes</SubTitle>
    </div>
)