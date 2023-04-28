import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { COLORS } from '../configuration';
import { images } from '../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCREENS } from '../constant';
const { MAIN, LOGIN } = SCREENS;

export default function Splash(props: any) {
    const { navigation } = props;

    // function to pass which screen should appear
    const _onPass = async () => {
        try {
            let data: any = await AsyncStorage.getItem('user');
            const userData = JSON.parse(data);
            if (userData) {
                // if async storage has data app move to dashboard
                navigation.navigate(MAIN);
            } else {
                // otherwise app go to login screen 
                navigation.navigate(LOGIN);
            }
        } catch (error) {
            // in any error case also, app move to login screen
            navigation.navigate(LOGIN);
        }
    }

    setTimeout(() => {
        _onPass();
    }, 2000);

    return (
        <View style={styles.container}>
            {/* <Image source={images.logo} style={styles.img}/> */}
            <Image source={images.logoTxt} style={styles.txt} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    img: {
        height: '55%',
        width: '88%'
    },
    txt: {
        height: '30%',
        width: '100%',
        tintColor: COLORS.GREEN
    }
})