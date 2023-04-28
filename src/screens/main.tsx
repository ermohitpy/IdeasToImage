import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions, Image, ActivityIndicator, Share, Alert, Keyboard } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { COLORS, CREDENTIALS, FONTFAMILY } from '../configuration';
import adjust from '../components/adjust';
import { images } from '../assets/images';
import { DATA } from '../types';
import Header from '../ReusableComponent/Header';
const { height, width } = Dimensions.get('screen');

export default function Loading() {
    const [prompt, setPrompt] = useState<string>('');
    const [img, setImg] = useState<DATA>({ url: '' });
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string | null>(null);

    // ********************** _validate function ********************************************
    const _validate = () => {
        let flag = true;
        if (prompt === '') {
            setError('*Please enter something to continue');
            flag = false;
        }
        return flag;
    }

    // ********************** _onSubmit function ********************************************
    function onSubmit(inp: any) {
        if (_validate()) {
            Keyboard.dismiss();
            setPrompt('');
            setImg({ url: '' });
            setLoading(true);
            try {
                axios({
                    method: 'post',
                    url: CREDENTIALS.URL,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + CREDENTIALS.KEY
                    },
                    data: {
                        "prompt": inp,
                        "n": 1,
                    }
                }).then(res => {
                    setImg({ url: res?.data?.data[0]?.url });
                })
            } catch (error) {
                console.log('====error===>', error);
            }
        }
    }

    // ********************** _onShare function ********************************************
    async function _onShare() {
        try {
            if (img.url !== null) {
                await Share.share({
                    title: 'App link',
                    message: img.url,
                });
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };


    return (
        <View style={styles.container}>
            <Header title={'PictureThis'} isRightAction />
            <View style={styles.main}>
                <TextInput style={styles.input}
                    placeholder='Enter your ideas'
                    placeholderTextColor={'grey'}
                    onChangeText={(txt) => { setPrompt(txt), setError(null) }}
                    value={prompt}
                />
                {error !== null ? <Text style={[styles.txt, { color: 'red', fontSize: adjust(11) }]}>{error}</Text> : null}
                <TouchableOpacity style={styles.btn} onPress={() => onSubmit(prompt)}>
                    <Text style={styles.txt}>{'Generate'}</Text>
                </TouchableOpacity>
                <View style={styles.imageView}>
                    {loading ? <View style={{ flex: 3, borderRadius: 10 }}>
                        {img.url ? <Image source={{ uri: img.url }} style={styles.image} /> : <ActivityIndicator size={'large'} style={styles.activityIndicator} color={COLORS.GREEN} />}
                    </View> : null}
                    {loading ? <View style={styles.reloadview}>
                        {img.url ? <TouchableOpacity style={styles.reloadbtn} onPress={_onShare}>
                            <Image source={images.share} style={styles.reload} />
                        </TouchableOpacity> : null}
                    </View> : null}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.ORANGE
    },
    main: {
        flex: 1,
        margin: 12
    },
    btn: {
        backgroundColor: COLORS.GREEN,
        height: '5%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '5%'
    },
    txt: {
        fontSize: 20,
        color: 'white',
        fontFamily: FONTFAMILY.NORMAL
    },
    input: {
        height: '7%',
        borderRadius: 10,
        paddingLeft: 8,
        color: 'black',
        fontFamily: FONTFAMILY.NORMAL,
        backgroundColor: COLORS.WHITESHADOW
    },
    imageView: {
        flex: 1
    },
    reloadbtn: {
        backgroundColor: COLORS.GREEN,
        height: 70,
        width: 70,
        borderRadius: 70 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reload: {
        height: 50,
        width: 50,
        tintColor: 'white'
    },
    activityIndicator: {
        marginTop: 150,
        color: '#0e8f68'
    },
    reloadview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain',
        borderRadius: 10
    }

})