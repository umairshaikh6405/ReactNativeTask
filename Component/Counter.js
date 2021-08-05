import React, { Component, useRef } from 'react';
import { View, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native';
import { Colors, ConstantsVar, Fonts, ServerConnection } from '../constants';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default class Counter extends Component {
    constructor(props) {
        super(props);
        if (TextInput.defaultProps == null) TextInput.defaultProps = {};
        TextInput.defaultProps.allowFontScaling = false; 
        this.state = {
            v1: this.props.units,
        };
    }

    counterChange = v1 => {
        this.setState({ v1 })
        this.props.counterChange(v1);
    };


    


    render() {
      
        return (
            <View style={{ flexDirection: 'row', width: SCREEN_WIDTH / 3.5, alignItems: "center" }}>
                <TouchableOpacity
                    disabled={this.props.out_of_stock}
                    onLongPress={() => {
                        this.interval = setInterval(() => {
                            let cont = this.state.v1 - 1
                            if (cont >= 0) {
                                this.setState({
                                    v1: cont
                                })
                            }
                        }, 100);
                    }}
                    onPressOut={() => {
                        if (this.interval) {
                            clearInterval(this.interval)
                            this.counterChange(this.state.v1);
                        } else {
                            if (this.state.v1 > 0) {
                                let sub = this.state.v1 - 1;
                                this.counterChange(sub);
                            }
                        }
                        this.interval = null
                    }}
                    style={{
                        width: SCREEN_WIDTH / 10,
                        height: SCREEN_WIDTH / 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        style={{
                            width: "75%",
                            height: "75%",
                        }}
                        source={require("../assets/sub.png") }
                    />
                </TouchableOpacity>

                <TextInput
                    editable={!this.props.out_of_stock} 
                    keyboardType="numeric"
                    style={{
                        height: 40,
                        width: SCREEN_WIDTH / 10,
                        fontFamily: Fonts.primaryRegular,
                        textAlign: 'center',
                        fontSize: SCREEN_WIDTH / 30,
                        color:  "black" 
                    }}
                    placeholderTextColor={Colors.placeholderGray}
                    value={`${this.state.v1}`}
                    onChangeText={v1 => {
                        let number = parseInt(v1 == '' ? '0' : v1, 10) + 0;
                        this.counterChange(number);
                    }}
                />

                <TouchableOpacity
                    disabled={this.props.out_of_stock}
                    onLongPress={() => {
                        this.interval = setInterval(() => {
                                this.setState({
                                    v1: this.state.v1 + 1
                                })
                        }, 100);
                    }}
                    onPressOut={() => {
                        if (this.interval) {
                            clearInterval(this.interval)
                            this.counterChange(this.state.v1);
                        } else {
                            let add = this.state.v1 + 1;
                            this.counterChange(add);
                        }
                        this.interval = null
                    }}
                    style={{
                        width: SCREEN_WIDTH / 10,
                        height: SCREEN_WIDTH / 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        style={{
                            width: "75%",
                            height: "75%"
                        }}
                        source={require("../assets/add.png") }
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
