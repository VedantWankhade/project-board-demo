import React, { Component } from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';
import data from '../assets/data.json'
import withDataFetching from '../withDataFetching';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Board = ({lanes, data, loading, error}) => (
  <BoardWrapper>
    {
      lanes.map(lane => <Lane key={lane.id} title={lane.title} loading={loading} error={error} tickets={data.filter(ticket => ticket.lane === lane.id)} />)
    }
  </BoardWrapper>
)

export default withDataFetching(Board);