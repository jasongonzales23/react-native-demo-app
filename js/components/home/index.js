import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title
} from "native-base";
import {
  Image,
  ListView,
  RefreshControl
} from 'react-native';

import { Grid, Row } from "react-native-easy-grid";
import { setIndex, receiveList } from "../../actions/list";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";

class Home extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    receiveList: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func
  };

  constructor(props) {
    super(props)
    let dataSource = new ListView.DataSource({
      rowHasChanged: this._rowHasChanged,
    });
    this.state = {
      refreshing: false,
      dataSource: dataSource.cloneWithRows(props.list),
    };
    this._renderRow = this._renderRow.bind(this)
    this._onRefresh = this._onRefresh.bind(this)
  }

  fetchList() {
    return fetch("https://www.reddit.com/.json")
      .then((res) => res.json())
      .then((json) => {
        const list = json.data.children
        console.log(list)
        this.props.receiveList(list)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  componentDidMount() {
    this.fetchList();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)

    let list = nextProps.list
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(list)
    })
  }

  _rowHasChanged(oldRow, newRow) {
    return oldRow !== newRow;
  }

  _onRefresh() {
    this.setState({refreshing: true});
    fetchList()
      .then(() => {
        this.setState({refreshing: false});
      });
  }

  _renderRow(item) {
    return (
      <Row style={styles.row}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("BlankPage", {
              name: {item}
            })}
        >
          {item.data.thumbnail_width ?
            <Image
              style={styles.image}
              source={{uri: item.data.thumbnail}}
            />
            :
            <Image
              style={styles.image}
              source={{uri: "https://www.fillmurray.com/g/420/100"}}
            />
          }
          <Text style={styles.text}>
            Title: {item.data.title}{'\n'}
            Author: {item.data.author}{'\n'}
            Comments: {item.data.num_comments}{'\n'}
          </Text>
        </TouchableOpacity>
      </Row>
    )
  }

  render() {
    console.log(DrawNav, "786785786");
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Home</Title>
          </Body>
        </Header>

        <Content>
          <Grid style={styles.mt}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  tintColor={"#000"}
                  title={"Refreshing content..."}
                />
                }
            />
          </Grid>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    receiveList: list => dispatch(receiveList(list)),
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer())
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    BlankPage2: { screen: BlankPage2 }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;
