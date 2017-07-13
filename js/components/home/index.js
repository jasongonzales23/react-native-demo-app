import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
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
    //list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func
  };

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
    this.fetchList()
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
            {this.props.list.map((item, i) => (
              <Row key={i}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() =>
                    this.props.navigation.navigate("BlankPage", {
                      name: { item }
                    })}
                >
                  <Text style={styles.text}>{item.data.title}</Text>
                </TouchableOpacity>
              </Row>
            ))}
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
