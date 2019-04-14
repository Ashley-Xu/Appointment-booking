import React from "react";
import { View, Text, Image, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider, Card, ListItem, Button, Header, Input } from 'react-native-elements'

const Intro = props => (
    <Card title='HELLO WORLD'>
        <Text style={{marginBottom: 10}}>
            The idea with React Native Elements is more about component structure than actual design.
        </Text>
    </Card>
);

const theme = {
    NavigationBar: {
        zIndex: 1
    },
    KeyboardAvoidingView: {
        zIndex: 0
    },
    Button: {
        raised: true,
        buttonStyle: {
            marginTop: 20
        }
    },
    Input: {
        inputContainerStyle: {
            marginTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: "gainsboro",
            borderRadius: 50
        },
        labelStyle: {
            paddingLeft: 10,
        }
    }
};


export class Search extends React.Component {
    static navigationOptions = {
        title: "Search",
    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <ThemeProvider theme={theme}>
                <KeyboardAvoidingView behavior="position" enabled>
                    <Intro/>
                    <Input
                        placeholder="Organization"
                    />
                    <Input
                        placeholder="User"
                    />
                    <Button
                        title="Search"
                        onPress={() => navigate("SearchResults", {
                        })}
                    />
                </KeyboardAvoidingView>
            </ThemeProvider>
        );
    }
}


export class SearchResults extends React.Component {
    static navigationOptions = {
        title: "Search Results",
    };

    constructor(props) {
        super(props);

        this.loading = true;
    }

    async componentWillMount() {
        const {org_name, user_name} = this.props.navigation.state.params;

        try {
            // POST request to localhost:3000 using json as request body
            const response = await fetch("http://localhost:3000/searchusers", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({org_name, user_name})
            });
            const json = await response.json();

            console.log("fetch", json);
        }
        catch (error) {
            console.error("fetch", error);
        }
    }

    render() {
        const list = [
                {
                    name: 'Amy Farha',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    subtitle: 'Vice President'
                },
                {
                    name: 'Chris Jackson',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    subtitle: 'Vice Chairman'
                },
            ];

        if (this.loading)
            return (
                <Text>Loading...</Text>
            );
        return (
            <View>
                {
                    list.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={l.name}
                            subtitle={l.subtitle}
                        />
                    ))
                }
            </View>
        );
    }
}