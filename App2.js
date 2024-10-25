import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Easing } from 'react-native-reanimated';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [greeting, setGreeting] = useState('');
  const scale = new Animated.Value(1);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (isFirstLaunch === null) {
          setShowModal(true);
          await AsyncStorage.setItem('isFirstLaunch', 'false');
        }
      } catch (error) {
        console.error('Error checking if first launch', error);
      }
    };

    const greetings = ['Hello!', 'Welcome back!', 'Hi there!', 'Greetings!'];
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);

    checkFirstLaunch();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breath 5.5</Text>
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>

      <View style={styles.body}>
        {['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'].map((feature, index) => (
          <Animated.View key={index} style={[styles.button, { transform: [{ scale }] }]}>
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.buttonContent}
            >
              <Text style={styles.buttonText}>{feature}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <StatusBar style="auto" />

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Welcome to Breath 5.5</Text>
            <Text style={styles.paragraph}>This is your introduction text. Here you can explain the purpose and features of your app. Make sure to give a warm welcome to your users and guide them through the basic functionalities.</Text>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.continueButton}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  menuButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  greetingContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  greeting: {
    fontSize: 18,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: '40%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonContent: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  continueButton: {
    fontSize: 16,
    color: '#6200EE',
  },
});