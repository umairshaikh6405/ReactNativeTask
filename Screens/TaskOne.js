import React, { Component } from 'react';
import { View, Text, Image, Platform, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, ConstantsVar, ConstStyles, ServerConnection } from '../constants';

export default class TaskOne extends Component {
  constructor(props) {
    super(props);
    this.page = -1
    this.state = {
      animating: false,
      passengerList: []
    };
  }

  componentDidMount() {
    ConstantsVar.LoadingView.show(true)
    this.getPassenger()
  }

  getPassenger = () => {
    if (!this.animating) {
      this.page += 1
      ServerConnection.getRequest(`https://api.instantwebtools.net/v1/passenger?page=${this.page}&size=15`,
        (isSucces, res) => {
          ConstantsVar.LoadingView.show(false)
          if (isSucces) {
            this.setState({
              animating: false,
              passengerList: [...this.state.passengerList, ...res.data]
            })
          } else {
            this.setState({
              animating: false
            })
          }
        })
    }
  }


  ItemView = ({ item, index }) => {
    const airline = item.airline[0]
    return (
      // Flat List Item
      <View style={styles.ItemView}>
        <Image
          style={{ width: wp(20), height: wp(20) }}
          source={{ uri: airline.logo }}
        />
        <View
          style={{ flex: 1, marginLeft: wp(3) }}
        >
          <Text>{airline.name}</Text>
          <Text>{airline.slogan}</Text>
        </View>
      </View>
    );
  };

  renderFooter = () => {

    return (
      <View style={[styles.footer,{ display: this.state.passengerList.length > 0 ? "flex" : "none",}]}>
        {
          this.state.animating ?
            <ActivityIndicator
              size="small"
              color={Colors.primary}
              animating={this.state.animating}
            />
            :
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  animating: true
                })
                this.getPassenger()
              }}
              style={styles.loadMore}
            >
              <Text style={{ color: "white" }}>Load More</Text>
            </TouchableOpacity>
        }

      </View>

    );
  };

  render() {

    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.passengerList}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections={true}
          renderItem={this.ItemView}
          ListFooterComponent={this.renderFooter}
        />

      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white
  },
  loadMore: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    backgroundColor: Colors.lightGray,
    borderRadius: wp(3)

  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginVertical: wp(4)
  },
  ItemView: {
    width: wp(100),
    backgroundColor: "white",
    marginTop: wp(3),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(3),
    ...ConstStyles.shadow
  }
});