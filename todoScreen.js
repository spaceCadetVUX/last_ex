import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodoRequest, deleteTodoRequest, updateTodoRequest } from './todoSlice';
import { Ionicons } from '@expo/vector-icons';

const TodoScreen = () => {
    const dispatch = useDispatch();
    const { list: todos, status, error } = useSelector((state) => state.todos);
    
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAddTodo = () => {
        if (name && details) {
            dispatch(addTodoRequest({ name, details }));
            setName('');
            setDetails('');
            setAddModalVisible(false);
        } else {
            alert('Please enter both name and details');
        }
    };

    const handleDeleteTodo = (id) => {
        dispatch(deleteTodoRequest(id));
    };

    const handleEditTodo = (todo) => {
        setCurrentTodo(todo);
        setName(todo.name);
        setDetails(todo.details);
        setEditModalVisible(true);
    };

    const handleUpdateTodo = () => {
        if (currentTodo && name && details) {
            dispatch(updateTodoRequest({ id: currentTodo.id, name, details }));
            setEditModalVisible(false);
            setName('');
            setDetails('');
        } else {
            alert('Please enter both name and details');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.todoItem}>
            <Text style={styles.todoText}>Name: {item.name}</Text>
            <Text style={styles.todoText}>Details: {item.details}</Text>
            <View style={styles.buttonsContainer}>
                <Button title="Edit" onPress={() => handleEditTodo(item)} />
                <Button title="Delete" color="red" onPress={() => handleDeleteTodo(item.id)} />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo List</Text>
            {status === 'loading' ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Add Task Modal */}
            <Modal
                visible={addModalVisible}
                animationType="slide"
                onRequestClose={() => setAddModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.header}>Add New Task</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Task Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Task Details"
                        value={details}
                        onChangeText={setDetails}
                    />
                    <Button title="Add Task" onPress={handleAddTodo} />
                    <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                        <Text style={styles.closeModalText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Edit Task Modal */}
            <Modal
                visible={editModalVisible}
                animationType="slide"
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.header}>Edit Task</Text>
                    <TextInput                        style={styles.input}
                        placeholder="Task Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Task Details"
                        value={details}
                        onChangeText={setDetails}
                    />
                    <Button title="Save Changes" onPress={handleUpdateTodo} />
                    <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                        <Text style={styles.closeModalText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Add Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setAddModalVisible(true)}
            >
                <Ionicons name="add-circle" size={60} color="#4CAF50" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    todoItem: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    todoText: {
        fontSize: 18,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    closeModalText: {
        fontSize: 18,
        color: 'blue',
        marginTop: 20,
        textAlign: 'center',
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default TodoScreen;
