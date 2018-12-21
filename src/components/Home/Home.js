import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
class Home extends Component {
  state = {
    topics: [],
    tab: 'all'
  };
  componentDidMount() {
    //   axios请求更新topics
    Axios.get('https://cnodejs.org/api/v1/topics/?tab=all').then(res => {
      this.setState({ topics: res.data.data });
    });
  }
  tabChange = e => {
    console.log(this.state.tab);
    // if (e === 'all') {
    //   this.setState({
    //     tab: 'all'
    //   });
    // } else if (e === 'good') {
    //   this.setState({
    //     tab: 'good'
    //   });
    // } else if (e === 'share') {
    //   this.setState({ tab: 'share' });
    // } else if (e === 'ask') {
    //   this.setState({ tab: 'ask' });
    // } else if (e === 'job') {
    //   this.setState({ tab: 'job' });
    // }
    switch (e) {
      case 'all':
        this.setState({
          tab: 'all'
        });
        break;
      case 'good':
        this.setState({
          tab: 'good'
        });
        break;
      case 'share':
        this.setState({
          tab: 'share'
        });
        break;
      case 'ask':
        this.setState({
          tab: 'ask'
        });
        break;
      case 'job':
        this.setState({
          tab: 'job'
        });
        break;
      default:
        this.setState({
          tab: ''
        });
    }
    Axios.get(`https://cnodejs.org/api/v1/topics/?tab=${this.state.tab}`).then(
      res => {
        this.setState({ topics: res.data.data });
      }
    );
  };
  render() {
    const { topics } = this.state;
    const navArr = [
      { type: 'all', txt: '全部' },
      { type: 'good', txt: '精华' },
      { type: 'share', txt: '分享' },
      { type: 'ask', txt: '问答' },
      { type: 'job', txt: '招聘' }
    ];
    const showContent = topics.length
      ? [...topics].map(e => <li key={e.type}>{e.title}</li>)
      : '请稍等。。。';
    const nav = navArr.map(e => (
      <li
        key={e.type}
        onClick={() => {
          this.tabChange(e.type);
        }}
      >
        {e.txt}
      </li>
    ));
    return (
      <Wrap>
        <nav>
          <Nav>{nav}</Nav>
        </nav>
        <Main>{showContent}</Main>
      </Wrap>
    );
  }
}

export default Home;

const Wrap = styled.div`
  width: 660px;
  background-color: #fff;
`;
const Nav = styled.ul`
  display: flex;
  list-style: none;
  li {
    cursor: pointer;
  }
`;
const Main = styled.ul`
  list-style: none;
`;
