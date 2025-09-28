import { View, Text, TouchableOpacity, Image } from 'react-native';

type Props = { onStart: () => void };

export default function Landing({ onStart }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-[#424754]">
      <View className="w-[380px] rounded-2xl bg-white/85 shadow-lg overflow-hidden">
        <View className="px-4 py-2">
          <Text className="text-xs text-slate-200" style={{ fontFamily: 'MunroSmall' }}>
            Main Menu
          </Text>
        </View>

        <View className="px-6 pb-6 items-center">
          <Text className="mt-2 text-3xl text-slate-800" style={{ fontFamily: 'Munro' }}>
            DynoAuth
          </Text>

          <Text className="mt-4 text-lg text-slate-800 text-center leading-tight" style={{ fontFamily: 'MunroSmall' }}>
            Help the dinosaur{'\n'}escape!
          </Text>

          <View className="w-52 h-52 bg-white rounded-2xl shadow-md items-center justify-center mt-6 mb-6">
            <Image
              source={require('../assets/images/Paul_the_Dinosaur.png')}
              style={{ width: 140, height: 140, resizeMode: 'contain' }}
            />
          </View>

          <View className="w-full max-w-[280px] flex-row flex-wrap justify-between">
            <TouchableOpacity className="w-[48%] rounded-2xl bg-white py-6 shadow-sm items-center mb-3">
              <Text className="text-slate-800" style={{ fontFamily: 'MunroSmall' }}>Text/Call</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] rounded-2xl bg-white py-6 shadow-sm items-center mb-3">
              <Text className="text-slate-800" style={{ fontFamily: 'MunroSmall' }}>Images</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] rounded-2xl bg-white py-6 shadow-sm items-center">
              <Text className="text-slate-800" style={{ fontFamily: 'MunroSmall' }}>Music</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%] rounded-2xl bg-white py-6 shadow-sm items-center">
              <Text className="text-slate-800" style={{ fontFamily: 'MunroSmall' }}>Location</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={onStart}
            className="w-4/5 mt-6 rounded-2xl py-4 items-center justify-center"
            style={{ backgroundColor: '#1f232c' }}
            activeOpacity={0.9}
          >
            <Text className="text-lg text-white" style={{ fontFamily: 'MunroSmall' }}>Start</Text>
          </TouchableOpacity>
        </View>

        <View className="px-6 pb-5">
          <View className="flex-row items-center justify-between rounded-2xl px-6 py-3" style={{ backgroundColor: '#1f232c' }}>
            <Text className="text-xl text-white" style={{ fontFamily: 'MunroSmall' }}>🏠</Text>
            <Text className="text-xl text-white" style={{ fontFamily: 'MunroSmall' }}>🏆</Text>
            <Text className="text-xl text-white" style={{ fontFamily: 'MunroSmall' }}>⚙️</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
