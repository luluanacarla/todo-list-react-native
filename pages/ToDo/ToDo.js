import React, { Component } from "react";
import { FlatList, View, AsyncStorage, TextInput, Text, Button, Keyboard, Platform } from "react-native";
import styles from "./ToDo.style";

const isAndroid = Platform.OS == "android";
const viewPadding = 30;

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      text: ""
    };

    this.changeTextHandler = text => {
      this.setState({ text: text });
    };

    this.addTask = () => {
      let notEmpty = this.state.text.trim().length > 0;
  
      if (notEmpty) {
        this.setState(
          prevState => {
            let { tasks, text } = prevState;
            return {
              tasks: tasks.concat({ key: tasks.length, text: text }),
              text: ""
            };
          },
          () => Tasks.save(this.state.tasks)
        );
      }
    };
  
    this.deleteTask = i => {
      this.setState(
        prevState => {
          let tasks = prevState.tasks.slice();
  
          tasks.splice(i, 1);
  
          return { tasks: tasks };
        },
        () => Tasks.save(this.state.tasks)
      );
    };

  }

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e => this.setState({ viewPadding: e.endCoordinates.height + viewPadding })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewPadding: viewPadding })
    );
    Tasks.all(tasks => this.setState({ tasks: tasks || [] }));
  }

  render() {

    return (
      <View
      style={[styles.container, { paddingBottom: this.state.viewPadding }]}
    >
      <FlatList
        style={styles.list}
        data={this.state.tasks}
        renderItem={({ item, index }) =>
          <View>
            <View style={styles.listItemCont}>
              <Text style={styles.listItem}>
                {item.text}
              </Text>
              <Button color="#ed174b" title="X" onPress={() => this.deleteTask(index)} />
            </View>
            <View style={styles.hr} />
          </View>}
          keyExtractor = { (item, index) => index.toString() }
      />
      <TextInput
        style={styles.textInput}
        onChangeText={this.changeTextHandler}
        onSubmitEditing={this.addTask}
        value={this.state.text}
        placeholder="Add Tasks"
        returnKeyType="done"
        returnKeyLabel="done"
      />
    </View>
    );
  }
}

let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("TASKS", (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback)
    );
  },
  save(tasks) {
    AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
  }
};

export default ToDo;
