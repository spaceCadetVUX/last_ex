// Task.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';


const Task = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDetails, setEditedDetails] = useState(task.details);


  const handleEdit = () => {
  onEdit(task.id, { name: editedName, details: editedDetails });
  setIsEditing(false);
};


  return (
    <View style={styles.taskContainer}>
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
          />
          <TextInput
            style={styles.input}
            value={editedDetails}
            onChangeText={setEditedDetails}
          />
          <Button title="Save" onPress={handleEdit} />
        </>
      ) : (
        <>
          <Text style={styles.taskName}>{task.name}</Text>
          <Text style={styles.taskDetails}>{task.details}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => setIsEditing(true)} />
            <Button title="Delete" onPress={() => onDelete(task.id)} color="red" />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Task;
