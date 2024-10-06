import { Slot, Stack } from 'expo-router';
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';
import { ActivityIndicator, View, StyleSheet, useColorScheme,Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';



export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        "Mont": require('@/assets/fonts/Montserrat/static/Montserrat-Regular.ttf'),
        "Mont-Semi": require('@/assets/fonts/Montserrat/static/Montserrat-SemiBold.ttf'),
        "Mont-Bold": require('@/assets/fonts/Montserrat/static/Montserrat-Bold.ttf'),
    })

    const colorScheme = useColorScheme();

    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle =
        colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;


    if (!fontsLoaded) {
        return (<View className="flex-1 items-center justify-center">
            <ActivityIndicator color={'black'} />
        </View>)
    }

    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
                <Slot/>
                <StatusBar />
                <Toast/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:10
    },
    text: {
        fontSize: 20,
    },
    lightContainer: {
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: '#0d1321',
    },
    lightThemeText: {
        color: '#333333',
    },
    darkThemeText: {
        color: 'white',
    },
});