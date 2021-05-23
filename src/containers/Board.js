import React from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';
// import data from '../assets/data.json'
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

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      tickets: []
    }
  }

  componentDidMount() {
    // console.log(this.props)
    this.setState({
      tickets: this.props.data
    })
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props)
    if (prevProps.data !== this.props.data) {
      this.setState({tickets: this.props.data})
    }
  }

  onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  }

  onDragOver = e => {
    e.preventDefault();
  }

  onDrop = (e, laneId) => {
    const id = e.dataTransfer.getData('id');
    console.log('laneId: ', laneId, 'id: ', id)
    const tickets = this.state.tickets.filter(ticket => {
      if (ticket.id == id) {
        ticket.lane = laneId;
      }
      console.log(ticket, laneId)
      return ticket;
    })

    // console.log(this.state.tickets.filter(tic => {
    //   if (tic.id == id) {
    //     tic.lane = laneId
    //   }
    //   return tic;
    // }))
// console.log(tickets)
    this.setState({
      tickets
    })
  }

  render() {
    const {lanes, loading, error} = this.props;

    return (
      <BoardWrapper>
        {
          lanes.map(lane => <Lane 
            key={lane.id} 
            title={lane.title} 
            loading={loading} 
            error={error} 
            laneId={lane.id}
            tickets={this.state.tickets.filter(ticket => 
              ticket.lane === lane.id)}
            onDragStart={this.onDragStart} 
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
            />)
        }
      </BoardWrapper>
    );
  }
}

export default withDataFetching(Board);