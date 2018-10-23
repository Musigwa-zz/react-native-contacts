import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  View,
  Button
} from "react-native";
import { Permissions, Contacts } from "expo";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: []
    };
  }

  async showFirstContactAsync() {
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS);
    if (permission.status !== "granted") {
      // Permission was denied...
      return;
    }
    const contacts = await Contacts.getContactsAsync({
      fields: [Contacts.PHONE_NUMBERS],
      pageSize: 200,
      pageOffset: 0
    });
    let cont = contacts.data;
    if (contacts.total > 0) {
      this.setState({ contacts: contacts.data });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="show contacts"
          onPress={() => this.showFirstContactAsync()}
        >
          Open up App.js to start working on your app!
        </Button>
        <ScrollView>
          {this.state.contacts.map((contact, k) => (
            <Text key={k}>
              {`Name: ${contact.name} Tel: ${JSON.stringify(
                contact.phoneNumbers[0].number
              )}`}
            </Text>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
