import { View, Text, TextInputBase, TextInput, Pressable, useColorScheme, } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@/components/ui/Button';
import { ActivityIndicator, Image } from 'react-native';
import Input from '@/components/ui/Input';
import { Ionicons } from '@expo/vector-icons';
import z, { set, ZodError } from 'zod'
import { AxiosError } from 'axios';
import Axios from '@/apis/external/backend';
import Toast from 'react-native-toast-message';

const Signin = ({ changeComp, comp ,toggleAuth }: any) => {



    const theme = useColorScheme();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        server: ''
    })


    const loginSubmit = async () => {
        setLoading(true);
        setErrors({ email: '', password: '', server: '' });

        if (!email) {
            setErrors((prev) => { return { ...prev, email: 'Email Required' } });
            setLoading(false);
            return;
        }
        if (!password) {
            setErrors((prev) => { return { ...prev, password: 'Password Required' } });
            setLoading(false);
            return;
        }
        try {

            const req = await Axios.post('/login', { email, password });

            if (req.status == 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Login Successfull',
                    visibilityTime: 3000
                })
                console.log(req.data);
                toggleAuth();
            }

        } catch (error) {

            if (error instanceof ZodError) {
                console.log(error.errors);
            }

            if (error instanceof AxiosError) {
                if (error.response) {
                    if (error.response.status == 400) {
                        if (error.response.data.error == 'USER NOT FOUND') {
                            setErrors((prev) => { return { ...prev, email: 'User Not Found' } });
                        }
                        if (error.response.data.error == 'INCORRECT PASSWORD') {
                            setErrors((prev) => { return { ...prev, password: 'Incorrect Password' } });
                        }
                    }
                    if (error.response.status == 500) {
                        Toast.show({
                            type: 'error',
                            text1: 'Internal Server Error,Try Later',
                            visibilityTime: 3000
                        })
                    }
                }
            }

        }
        setLoading(false);
    }

    return (
        <View className='flex-1'>

            <View className='flex-row items-center justify-between'>
                <Ionicons name='arrow-back' size={20} style={{ marginTop: -80, }} />
                <Image source={theme === 'dark' ? require('../../assets/images/logo/white.png') : require('../../assets/images/logo/black.png')} className='w-[150px] h-[150px] mr-[-20px] mt-[-20px]' />
            </View>

            <Text className='text-2xl mb-4 font-mont_semi text-zinc-900 dark:text-white'>Sign in to Sumly</Text>
            <View className='my-2'>
                <Input
                    name="email"
                    value={email}
                    onChangeValue={(value: any) => { setEmail(value) }}
                    placeholder="Email" icon="mail-outline" iconsize={18}
                    iconcolor={"#333333"}
                    type="email"
                />
                {errors.email &&
                    <View className='flex-row items-center justify-start mt-1 '>
                        <Ionicons name='alert-circle-outline' size={12} color={'red'} />
                        <Text className='text-red-500 text-[12px] font-mont ml-2' >{errors.email}</Text>
                    </View>}
            </View>

            <View className='my-2'>
                <Input
                    name="password"
                    value={password}
                    onChangeValue={(value: any) => { setPassword(value) }}
                    placeholder="Password" icon="lock-closed-outline" iconsize={18}
                    iconcolor={"#333333"}
                    type="password"
                />
                {errors.password &&
                    <View className='flex-row items-center justify-start mt-1 '>
                        <Ionicons name='alert-circle-outline' size={12} color={'red'} />
                        <Text className='text-red-500 text-[12px] font-mont ml-2' >{errors.password}</Text>
                    </View>}
            </View>
            <Button onPress={() => { loginSubmit() }} loading={loading} color="#333333" style={{ marginTop: 20 }}>{loading ? <ActivityIndicator color={theme == 'dark' ? 'black' : 'white'} /> : "Sign in"}</Button>

            <Text className='text-center font-mont mt-7 mb-4 dark:text-white'>or sign in using</Text>

            <Pressable className='flex-row items-center justify-center  bg-rose-50 active:bg-rose-100 dark:border-[1px] dark:bg-transparent dark:active:bg-rose-200 dark:border-white/10 rounded-lg h-12 px-2 my-2'>
                <Text className='font-mont_semi mr-[20px] text-rose-500 '>continue with google</Text>
                <Ionicons name='logo-google' size={20} color={'red'} />
            </Pressable>
            <Pressable className='flex-row items-center justify-center    bg-blue-50 active:bg-blue-100 dark:border-[1px] dark:bg-transparent dark:active:bg-blue-200 dark:border-white/10 rounded-lg h-12 px-2 my-2'>
                <Text className='font-mont_semi mr-[20px] text-blue-500'>continue with facebook</Text>
                <Ionicons name='logo-facebook' size={20} color={'blue'} />
            </Pressable>

            <View className='flex-row items-center justify-center'>
                <Text className='text-center dark:text-white font-mont mt-7 mb-4'>Don't have an account ? </Text>
                <Text className='text-center dark:text-white font-mont_semi mt-7 mb-4' onPress={() => { changeComp(comp) }}>Signup</Text>
            </View>
        </View>
    )
}

export default Signin;