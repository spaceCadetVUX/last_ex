// TaskList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { fetchTodosRequest, deleteTodoRequest, updateTodoRequest } from './todoSlice';
import Task from './task'; // Make sure to import Task from Task.js

const TaskList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteTodoRequest(id));
  };


const handleEdit = (id, updatedTask) => {
  dispatch(updateTodoRequest({ id, ...updatedTask }));
};

  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <Task task={item} onDelete={handleDelete} onEdit={handleEdit} />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
});

export default TaskList;
