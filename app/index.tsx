import { View, Text, TextInputBase, TextInput, } from 'react-native'
import React, { useState } from 'react'
import Signin from '@/components/Auth/Signin';
import Signup from '@/components/Auth/Signup';
import { Button } from '@/components/ui/Button';
const Index = () => {

  const [comp, setComp] = useState(true);
  const toggleComp = (value: boolean) => { setComp(!value) }
  const [auth, setAuth] = useState(false);

  const toggleAuth = () => {
    setAuth(true);
  }

  if (!auth) {
    return (<View className='flex-1'>
      {!auth && comp ? <Signin toggleAuth={toggleAuth} changeComp={toggleComp} comp={comp} /> : <Signup changeComp={toggleComp} comp={comp} />}

    </View>)
  }
  else {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='dark:text-white'>Home</Text>
        
        <Button onPress={() => { setAuth(false) }} color="red" >Signout</Button>
      </View>
    )
  }
}

export default Index;