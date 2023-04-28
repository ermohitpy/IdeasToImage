import { View, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '@/Configration';
var Spinner = require('react-native-spinkit');
const Loader = (props: any) => {

    return (
        <View style={styles.container}>
            <Spinner isVisible={true} size={100} type={'Wave'} color={COLORS.BLACK} />
        </View>
    )
};
export default Loader
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});
