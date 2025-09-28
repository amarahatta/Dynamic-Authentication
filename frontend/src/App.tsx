import { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import '../global.css';
import Landing from './screens/Landing';
import Quiz from './screens/Quiz';

export default function App() {
  const [started, setStarted] = useState(false);
  const [fontsLoaded] = useFonts({
    Munro: require('./assets/fonts/munro.ttf'),
    MunroSmall: require('./assets/fonts/munro-small.ttf'),
    MunroNarrow: require('./assets/fonts/munro-narrow.ttf'),
  });

  if (!fontsLoaded) return <View />;

  return started ? (
    <>
      <Quiz />
      <StatusBar style="light" />
    </>
  ) : (
    <>
      <Landing onStart={() => setStarted(true)} />
      <StatusBar style="light" />
    </>
  );
}
