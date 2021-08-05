import React, { Component } from "react";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Colors, ConstantsVar } from "../constants";

const ServerConnection = {
    getRequest: async (url, responseCallback) => {
        if (true) {

            fetch(url, {
                method: 'GET'
             })
             .then((response) => response.json())
             .then((responseJson) => {
                responseCallback(true, responseJson);
             })
             .catch((error) => {
                ServerConnection.showErrorMsg(error.message);
                responseCallback(false, "");
             });

        } else {
            ServerConnection.showErrorMsg("Please check your internet connection");
            responseCallback(false, "");
        }
    },
    showErrorMsg: (msg) => {
        showMessage({
            message: msg,
            type: "warning",
          });
    },

};

export default ServerConnection;






