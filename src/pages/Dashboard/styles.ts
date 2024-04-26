'use client'

import styled from "styled-components";

export const Container = styled.div`
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;

    padding: 20px;
`;

export const Title = styled.div`
    font-size: 12px;
    padding: 20px;

    h1 {
        font-weight: normal;
        color: #666666;
    }
    
`;

export const TableBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    text-align: center;

    .css-ilkql1-MuiDataGrid-root .MuiDataGrid-cell--textRight {
        text-align: left !important;
    }
`;