import { View, Text, TextInputBase, TextInput, Pressable, ScrollView, useColorScheme, } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@/components/ui/Button';
import { ActivityIndicator, Image } from 'react-native';
import Input from '@/components/ui/Input';
import { Ionicons } from '@expo/vector-icons';
import z, { set, ZodError } from 'zod'
import Axios from '@/apis/external/backend';
import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

const Signup = ({ changeComp, comp }: any) => {


    const theme = useColorScheme();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: ''
    })

    const schema = z.object({
        password: z.string().min(8),
        email: z.string().email(),
        username: z.string().min(4).max(16)
    })


    async function handlRegister() {
        setLoading(true);
        setErrors({ email: '', username: '', password: '' })
        const obj = {
            username: username,
            email: email,
            password: password,
        }

        try {

            await schema.parseAsync(obj);
            const req = await Axios.post('/signup', obj);

            if (req.status == 200) {

                Toast.show({
                    type: 'success',
                    text1: 'Account Registered Successfully',
                    visibilityTime: 3000,
                })
                console.log('Success');
                changeComp(comp); // show login component
            }

        } catch (error) {

            if (error instanceof ZodError) {

                if (error.errors) {
                    error.errors.forEach((err) => {
                        setErrors((prev) => ({ ...prev, [err.path[0]]: err.message }))
                    })
                }
            }

            if (error instanceof AxiosError) {
                if (error.response) {
                    if (error.response.status == 400) {
                        if (error.response.data.msg === 'EMAIL ALREADY EXISTS') {
                            setErrors((prev) => ({ ...prev, email: 'Email Already Exists' }));
                        }
                        if (error.response.data.msg === 'USERNAME ALREADY EXISTS') {
                            setErrors((prev) => ({ ...prev, username: 'Username Already Exists' }));
                        }
                    }
                    if (error.response.status == 500) {
                        Toast.show({
                            type: 'error',
                            text1: 'Server Error',
                            visibilityTime: 3000,
                        })
                        console.log('Server Error');
                    }

                } else {
                    console.log(error.message); // In case no response is available
                }
            }

        }
        setLoading(false);

    }




    return (
        <View className='flex-1'>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='flex-row items-center justify-between'>
                    <Ionicons name='arrow-back' size={20} color={theme == 'dark' ? 'white' : 'black'} style={{ marginTop: -60, }} />
                    <Image source={theme === 'dark' ? require('../../assets/images/logo/white.png') : require('../../assets/images/logo/black.png')} className='w-[150px] h-[150px] mr-[-20px] mt-[-20px]' />
                </View>

                <Text className='text-2xl mb-4 font-mont_semi text-zinc-900 dark:text-white'>Register with Sumly</Text>

                <View className='my-3'>
                    <Input
                        name="Username"
                        value={username}
                        onChangeValue={(value: any) => { setUsername(value) }}
                        placeholder="Username" icon="person-outline" iconsize={18}
                        iconcolor={"#333333"}
                        type="Username"
                    />
                    {errors.username &&
                        <View className='flex-row items-center justify-start mt-1 '>
                            <Ionicons name='alert-circle-outline' size={12} color={'red'} />
                            <Text className='text-red-500 text-[12px] font-mont ml-2' >{errors.username}</Text>
                        </View>}
                </View>


                <View className='my-3'>

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

                <View className='my-3'>

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
                <Button onPress={() => { handlRegister() }} loading={loading} color="#333333" style={{ marginTop: 20 }}>{loading ? <ActivityIndicator color={theme == 'dark' ? 'black' : 'white'} /> : "Sign up"}</Button>

                <Text className='text-center font-mont mt-7 mb-4 dark:text-white'>or sign up using</Text>

                <Pressable className='flex-row items-center justify-center  bg-rose-50 active:bg-rose-100 dark:border-[1px] dark:bg-transparent dark:active:bg-rose-200 dark:border-white/10 rounded-lg h-12 px-2 my-2'>
                    <Text className='font-mont_semi mr-[20px] text-rose-500 '>continue with google</Text>
                    <Ionicons name='logo-google' size={20} color={'red'} />
                </Pressable>
                <Pressable className='flex-row items-center justify-center    bg-blue-50 active:bg-blue-100 dark:border-[1px] dark:bg-transparent dark:active:bg-blue-200 dark:border-white/10 rounded-lg h-12 px-2 my-2'>
                    <Text className='font-mont_semi mr-[20px] text-blue-500'>continue with facebook</Text>
                    <Ionicons name='logo-facebook' size={20} color={'blue'} />
                </Pressable>

                <View className='flex-row items-center justify-center'>
                    <Text className='text-center dark:text-white font-mont mt-7 mb-4'>Already reqistered ? </Text>
                    <Text className='text-center dark:text-white font-mont_semi mt-7 mb-4' onPress={() => { changeComp(comp) }}>Signin</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Signup;