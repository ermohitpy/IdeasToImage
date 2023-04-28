import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text, Platform,Alert } from 'react-native';
import { Header as HeaderElement } from 'react-native-elements';
import { images } from "../assets/images";
import { COLORS, FONTFAMILY } from "../configuration";
import { useNavigation } from "@react-navigation/native";
import adjust from "../components/adjust";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCREENS } from "../constant";
const{LOGIN} = SCREENS;

const Header = (props: any) => {
    const { bc, isBack, isBackHide, title, isRightAction } = props;
    const navigation: any = useNavigation();

    // ************************ logOut function ***************************************
    const _onLogout=()=>{
        const actions = [
            {
                text: 'No', onPress: () =>
                    console.log('cancel Pressed')
            },
            {
                text: 'Yes',
                onPress: () => {
                    AsyncStorage.removeItem('user');
                    navigation.navigate(LOGIN);
                }
            }
        ];
        Alert.alert('Logout', 'Are you sure to logout ?', actions, { cancelable: false });
    
    }

    // ******************* right component of header ***********************************
    const rightComponent = () => {
        if (isRightAction === undefined) {
            return (
                <View style={styles.rightComponent}>
                    <TouchableOpacity />
                </View>
            );
        }
        return (
            <View style={styles.rightComponent}>
                <TouchableOpacity onPress={_onLogout}>
                    <Image source={images.logout} style={styles.menubar} />
                </TouchableOpacity>
            </View>
        );
    };

    // *************** center component where title appear in header *******************
    const centerComponent = () => {
        return (<View style={styles.centerComponent}>
            <Text style={[styles.text]}>{title}</Text>
        </View>)
    }

    return (
        <View style={styles.mainView}>
            {/* @ts-ignore */}
            <HeaderElement
                statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
                containerStyle={styles.container}
                placement={'center'}
                centerComponent={title ? centerComponent : null}
                rightComponent={rightComponent}
                backgroundColor={bc ? "transparent" : COLORS.GREEN} 
                />
        </View>
    );
};
export default Header;
const styles = StyleSheet.create({
    mainView: { 
        height:'12%'
    },
    container: {
        borderBottomColor: 'transparent',
        flex:1
    },
    leftComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50
    },
    menubar: {
        height: 35,
        width: 35,
        resizeMode: 'contain',
        tintColor:'white'
    },
    text: {
        fontSize: adjust(30),
        textAlign: 'center',
        color:'white',
        fontFamily:FONTFAMILY.HEADER
    },
    rightComponent: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        width: 50
    },
    headerimg:{
        height:'100%',
        width:'100%'
    },
    centerComponent:{ 
        height: '100%',
        width:'100%',
        justifyContent:'center',
        backgroundColor:'greeen'
    }
});
