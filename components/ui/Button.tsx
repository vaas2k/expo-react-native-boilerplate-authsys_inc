import {Text, Pressable, useColorScheme } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Ionicons } from '@expo/vector-icons'

export const Button = ({children,className,color,style,...props} : PropsWithChildren<any>) => {
  const theme = useColorScheme();
  
  return (
    <Pressable 
    {...props}
    style={{backgroundColor:theme == 'dark' ? 'white' : color,...style}}
    className={` py-[8px] rounded-lg items-center justify-center active:opacity-70`}
    >
        <Text className='text-white dark:text-zinc-950 font-mont_semi text-lg'>{children}</Text>
      </Pressable>
  );

}

