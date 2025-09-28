import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useFonts } from 'expo-font';

import '../global.css';

export default function App() {
  const [fontsLoaded] = useFonts({
    Munro: require('./assets/fonts/munro.ttf'),
    MunroSmall: require('./assets/fonts/munro-small.ttf'),
    MunroNarrow: require('./assets/fonts/munro-narrow.ttf'),
  });

  const handleButtonPress = (buttonNumber: number) => {
    console.log(`Button ${buttonNumber} pressed`);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#424754' }}>
      <View className="flex-1 px-6 py-8">
        {/* Upper Half - Square Box */}
        <View className="flex-1 justify-center items-center">
          <View className="w-64 h-64 bg-orange-100 rounded-lg shadow-lg justify-center items-center">
            <Image
              source={require('./assets/images/Paul_the_Dinosaur.png')}
              style={{ width: 150, height: 150, resizeMode: 'contain' }}
            />
            <Text style={{ fontFamily: 'Munro' }} className="text-slate-600 text-lg font-bold text-center mt-2">
              Ralph the Dinosaur
            </Text>
          </View>
        </View>

        {/* Lower Half - Buttons */}
        <View className="flex-1 justify-center space-y-4 px-4">
          {[1, 2, 3, 4].map((n) => (
            <TouchableOpacity
              key={n}
              className="bg-orange-100 py-4 px-6 rounded-lg shadow-sm"
              onPress={() => handleButtonPress(n)}>
              <Text style={{ fontFamily: 'MunroSmall' }} className="text-slate-600 text-center text-lg font-semibold">
                Button {n}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
