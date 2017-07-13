import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import {
  Image
} from 'react-native';
import styles from "./styles";

class BlankPage extends Component {
  static navigationOptions = {
    header: null
  };
  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    openDrawer: React.PropTypes.func
  };

  render() {
    const {
      props: {
        name,
        index,
        list
      }
    } = this;

    const {
    data: {
        title,
        author,
        num_comments,
        thumbnail,
        thumbnail_width,
      }
    } = this.props.navigation.state.params.name.item

    console.log("NAME", this.props.navigation.state.params.name.item);

    console.log(this.props.navigation, "000000000");
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>{title ? title : "Detail Page"}</Title>
          </Body>

          <Right />
        </Header>

        <Content padder>
          <Grid style={styles.mt}>
          {this.props.navigation.state.params.name.item !== undefined ?
            <Row>
              {thumbnail_width ?
                <Image
                  style={styles.image}
                  source={{uri: thumbnail}}
                />
                :
                <Image
                  style={styles.image}
                  source={{uri: "https://www.fillmurray.com/g/100/200"}}
                />
              }
              <Text style={styles.text}>
                Title: {title}{'\n'}
                Author: {author}{'\n'}
                Comments: {num_comments}{'\n'}
              </Text>
            </Row>
            :
            <Row>
              "Loading..."
            </Row>
          }
          </Grid>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list
});

export default connect(mapStateToProps, bindAction)(BlankPage);
