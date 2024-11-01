// AddTask.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addTodoRequest } from './todoSlice';

const AddTask = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    if (name && details) {
      dispatch(addTodoRequest({ name, details }));
      setName('');
      setDetails('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task name"
        value={name}
        onChangeText={setName}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Task details"
        value={details}
        onChangeText={setDetails}
        required
      />
      <Button title="Add Task" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddTask;
