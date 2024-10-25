import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [completedDays, setCompletedDays] = useState([]);
  const defaultColor = '#D3D3D3';
  const completedColor = '#23A31D';
  // '#32CD32'

  // First time popup
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (isFirstLaunch === null) {
          setShowModal(true);
          await AsyncStorage.setItem('isFirstLaunch', 'false');
        }
      } catch (error) {
        console.error("Could't check first launch", error);
      }
    };

    // New greeting each time you open. Want to add a streak tracker here eventually 
    const greetings = ['Hey You!', 'Welcome back!', 'Good to see you!', 'Just Breathe!'];
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);

    checkFirstLaunch();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const markDayAsCompleted = (day) => {
    setCompletedDays((prevCompletedDays) => {
      if (prevCompletedDays.includes(day)) {
        return prevCompletedDays.filter((completedDay) => completedDay !== day);
      } else {
        return [...prevCompletedDays, day];
      }
    });
  };

  const featureList = ['5 Min', '10 Min', 'Breath 3', 'Breath 4', 'Breath 5'];
  const weekList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Most of what you can see
  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#FDC60D', '#FDC60D', '#C97F0E']}
        style={styles.container}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton}>
              <Ionicons name="menu" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Breath 5.5</Text>
            <Text style={styles.headerPick}>【ツ】 ᶘ ◕ᴥ◕ᶅ</Text>
          </View>

          <View style={styles.streak}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>{greeting}</Text>
              <View style={styles.weekContainer}>
                <FlatList
                  data={weekList}
                  horizontal
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => markDayAsCompleted(item)}>
                      <View style={styles.dayContainer}>
                        <View style={[styles.circle, { backgroundColor: completedDays.includes(item) ? completedColor : defaultColor }]} />
                        <Text style={styles.dayText}>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.card}>
              {featureList.map((feature, index) => (
                <Animated.View key={index} style={{ transform: [{ scale: new Animated.Value(1) }] }}>
                  <TouchableOpacity
                    style={styles.button}
                  >
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>{feature}</Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
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
                <Text style={styles.paragraph}>
                  Discover the power of balanced breathing with our guided 5.5-second breath technique. By inhaling for 5.5 seconds and exhaling for 5.5 seconds, you can achieve a state known as "coherent breathing." This method is proven to enhance mental clarity, reduce stress, and improve overall well-being.
                  Why 5.5 Seconds?
                  Mental Clarity: This breathing pattern optimizes blood flow to the brain, promoting mental clarity and reducing anxiety. It helps synchronize the heart, brain, and nervous system, leading to better cognitive function and a calmer state of mind.

                  Ancient Practice, Modern Science: The 5.5-second technique mirrors rhythms found in traditional practices like Buddhist mantras, Christian prayers, and yoga, validated by modern research for their calming effects.

                  Health Benefits: Regular practice can lower blood pressure, reduce stress, and enhance lung capacity, offering a simple way to improve physical and mental health.

                  Easy to Practice: Start with just 5 minutes a day and experience the benefits. Learn to stop over-breathing and try something better.
                </Text>
                <TouchableOpacity onPress={handleCloseModal}>
                  <Text style={styles.continueButton}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: 'transparent',
    zIndex: 10,
    marginHorizontal: 10,
    borderBottomColor: '#ddd',
    borderRadius: 10,
  },
  menuButton: {
    position: 'absolute',
    paddingLeft: 10,
    color: '#fff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  headerPick: {
    position: 'absolute',
    right: 10,
    color: 'white',
  },
  greetingContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: .6,
    shadowRadius: 12,
    marginTop: 20,
    zIndex: 10,
    shadowOffset: { width: -8, height: 10 },
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  greeting: {
    fontSize: 20,
    paddingLeft: 5,
    paddingTop: 5
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    // paddingLeft: 5,
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 5,
  },
  dayText: {
    fontSize: 15,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1DBCED',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    width: '80%',
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