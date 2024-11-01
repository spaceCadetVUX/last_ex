// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import store from './store';
import TaskList from './taskList';
import AddTask from './addTask';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.title}>Todo App</Text>
        <AddTask />
        <TaskList />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
