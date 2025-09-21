import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import '../global.css';

export default function App() {
  const handleButtonPress = (buttonNumber: number) => {
    console.log(`Button ${buttonNumber} pressed`);
    // Add your button logic here
  };

  return (
    <SafeAreaView className="flex-1 " style={{ backgroundColor: '#424754' }}>
      <View className="flex-1 px-6 py-8">
        {/* Upper Half - Square Box */}
        <View className="flex-1 justify-center items-center">
          <View className="w-64 h-64 bg-orange-100 rounded-lg shadow-lg justify-center items-center">
            <Text className="text-slate-600 text-xl font-bold text-center">
              Square Box
            </Text>
            <Text className="text-slate-600 text-sm text-center mt-2">
              Content goes here
            </Text>
          </View>
        </View>

        {/* Lower Half - 4 Buttons Vertically Arranged */}
        <View className="flex-1 justify-center space-y-4 px-4">
          <TouchableOpacity
            className="bg-orange-100 py-4 px-6 rounded-lg shadow-sm"
            onPress={() => handleButtonPress(1)}>
            <Text className="text-slate-600 text-center text-lg font-semibold">
              Button 1
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-orange-100 py-4 px-6 rounded-lg shadow-sm"
            onPress={() => handleButtonPress(2)}>
            <Text className="text-slate-600 text-center text-lg font-semibold">
              Button 2
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-orange-100 py-4 px-6 rounded-lg shadow-sm"
            onPress={() => handleButtonPress(3)}>
            <Text className="text-slate-600 text-center text-lg font-semibold">
              Button 3
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-orange-100 py-4 px-6 rounded-lg shadow-sm"
            onPress={() => handleButtonPress(4)}>
            <Text className="text-slate-600 text-center text-lg font-semibold">
              Button 4
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}