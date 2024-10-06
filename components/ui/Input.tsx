import { View, TextInput, useColorScheme } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Input = ({
    value, onChangeValue, placeholder,
    placeholderTextColor, icon, iconsize, iconcolor,
    type
}: PropsWithChildren<any>) => {


    const [showPassword, setShowPassword] = useState(true);
    const [isPass, setPass] = useState(type == 'password');
    const theme = useColorScheme();

  return (
    <View className="flex-row items-center border-[1px] border-[#333333]/20 dark:border-white/10 rounded-lg h-12 px-2">
      {/* Left Icon */}
      <Ionicons name={icon} size={iconsize} color={theme == 'dark' ? 'white' : iconcolor} />

      {/* TextInput Field */}
      <TextInput
        className="flex-1 ml-2 dark:text-white font-mont"
        placeholder={placeholder}
        placeholderTextColor={theme == 'dark' ? 'white' : placeholderTextColor}
        value={value}
        onChangeText={onChangeValue}
        secureTextEntry={isPass && showPassword} 
      />
      {type == 'password' && <Ionicons onPress={() => setShowPassword(!showPassword)} name={showPassword ? 'eye-off' : 'eye'} size={18} color={theme == 'dark' ? 'white' : 'dark'} />}
    </View>
  );
};

export default Input;
