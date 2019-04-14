import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";

import {Search, SearchResults} from "./search";


const MainNavigator = createStackNavigator(
    {
        Search,
        SearchResults
    },
    {
        initialRouteName: "Search",
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
            },
        },
    });

const App = createAppContainer(MainNavigator);

export default App;
