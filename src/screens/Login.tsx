import { StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { images } from '../assets/images';
import React, { useState } from 'react';
import { COLORS, FONTFAMILY, REGEX } from '../configuration';
import { SCREENS } from '../constant';
import { BODY } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import adjust from '../components/adjust';
const { MAIN } = SCREENS;
const { height, width } = Dimensions.get('screen');

const Login = (props: any) => {
  const [email, setEmail] = useState<string>('');
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);

  const [password, setPassword] = useState<string>('');
  const [checkPassword, setcheckPassword] = useState<boolean>(false);
  const [errorPassword, seterrorPassword] = useState<string | null>(null);

  // ***********************************_emailValidate**********************************************
  const _emailValidate = (mail: string) => {
    var emailRegex = REGEX.EMAIL;
    if (mail === '') {
      setErrorEmail('*Please enter your email');
      setCheckEmail(true);
    } else if (!emailRegex.test(mail)) {
      setErrorEmail('*Please enter valid email');
      setCheckEmail(true);
    } else {
      setErrorEmail(null);
      setCheckEmail(false);
    }
  };

  // *********************************_passwordvalidate**********************************************
  const _passwordValidate = (pass: string) => {
    var passwordRegex = REGEX.PASSWORD;
    if (pass === '') {
      seterrorPassword('*Please enter password');
      setcheckPassword(true);
    } else if (!passwordRegex.test(pass)) {
      seterrorPassword('*Please enter valid password i.e Abc@1234');
      setcheckPassword(true);
    } else {
      seterrorPassword(null);
      setcheckPassword(false);
    }
  };

  // ********************************_validate******************************************************
  const _validate = () => {
    let flag = true;
    if (email === '' || checkEmail) {
      setErrorEmail(errorEmail ? errorEmail : '*Please enter email');
      flag = false;
    }
    if (password === '' || checkPassword) {
      seterrorPassword(errorPassword ? errorPassword : '*Please enter password');
      flag = false;
    } else {
      return flag;
    }
  }

  // ******************************* _onLogin ****************************************
  const _onLogin = () => {
    if (_validate()) {
      Keyboard.dismiss();
      const body: BODY = {
        'email': email,
        'pass': password
      }
      AsyncStorage.setItem('user', JSON.stringify(body));
      props.navigation.navigate(MAIN);
      setEmail('');
      setPassword('');
    }
  }

  return (
    <View style={styles.container}>
      <Image source={images.curve} style={{ alignSelf: 'flex-start' }} />
      <Image source={images.curve1} style={styles.curve} />
      <View style={styles.main}>
        <View style={styles.insidemain}>
          <View style={styles.logo}>
            <Image source={images.logoTxt} style={styles.logoTxt} />
          </View>
          <Text style={styles.logintxt}>{'Login'}</Text>
          <View style={styles.box}>
            <View style={styles.left}>
              <Image source={images.email} style={{}} />
            </View>
            <TextInput
              placeholder='Email'
              autoCapitalize='none'
              placeholderTextColor={'grey'}
              value={email}
              style={styles.textinput}
              onChangeText={(txt: any) => { setEmail(txt), _emailValidate(txt) }}
            />
          </View>
          {errorEmail !== null ?
            <Text style={styles.errorTxt}>{errorEmail}</Text> : null}
          <View style={[styles.box, { marginTop: '-2%' }]}>
            <View style={styles.left}>
              <Image source={images.password} style={{}} />
            </View>
            <TextInput
              placeholder='Password'
              value={password}
              secureTextEntry={true}
              placeholderTextColor={'grey'}
              style={styles.textinput}
              onChangeText={(txt: any) => { setPassword(txt), _passwordValidate(txt) }}
            />
          </View>
          {errorPassword !== null ?
            <Text style={styles.errorTxt}>{errorPassword}</Text> : null}
          <View style={styles.button}>
            <TouchableOpacity style={styles.btn} onPress={_onLogin}>
              <Text style={styles.btnTxt}>{'Log in  '}</Text>
              <Image source={images.arrow} style={styles.arrowImg} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.for}>
                        <TouchableOpacity>
                            <Text style={{ color: 'black', textDecorationLine: 'underline', fontSize: 17 }}>{'Forgot Password?'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.or}>
                        <View style={styles.insideor}>
                            <Image source={images.line} />
                            <Text style={{ color: 'black', fontSize: 17 }}>{'OR'}</Text>
                            <Image source={images.line} />
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#2A676F' }]}>
                            <Text style={{ color: '#2A676F', fontSize: 16, fontWeight: '700' }}>{'Sign Up '}</Text>
                            <Image source={images.arrow} style={{ height: 17, width: 17, tintColor: '#2A676F' }} />
                        </TouchableOpacity>
                    </View> */}
        </View>
      </View>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.ORANGE,
    flex: 1
  },
  curve: {
    alignSelf: 'flex-end',
    marginTop: '50%',
    // backgroundColor:'green'
  },
  main: {
    // backgroundColor:'green',
    height: height,
    position: 'absolute',
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  insidemain: {
    height: height / 1.5,
    width: width / 1.1
  },
  logo: {
    // backgroundColor:'pink',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logintxt: {
    // backgroundColor:'purple',
    height: '15%',
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.GREEN,
    textAlign: 'center',
    paddingTop: '8%',
    fontFamily: FONTFAMILY.HEADER
  },
  box: {
    backgroundColor: '#E9E4E4',
    height: '9%',
    flexDirection: 'row',
    margin: '7%',
    borderRadius: 9
  },
  left: {
    backgroundColor: COLORS.GREEN,
    height: '100%',
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9
  },
  textinput: {
    backgroundColor: COLORS.WHITESHADOW,
    flex: .9,
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    borderTopEndRadius: 9,
    borderBottomEndRadius: 9,
    paddingLeft: '3%',
    fontFamily: FONTFAMILY.NORMAL
  },
  button: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: COLORS.GREEN,
    height: height / 18,
    width: width / 1.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row'
  },
  for: {
    height: '8%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  or: {
    height: height / 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  insideor: {
    height: '40%',
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  errorTxt: { color: 'red', top: -20, left: 30,fontFamily:FONTFAMILY.NORMAL,fontSize:adjust(10) },
  btnTxt: { color: 'white', fontSize: 16, fontWeight: '700', fontFamily: FONTFAMILY.NORMAL },
  arrowImg: { height: 17, width: 17, tintColor: 'white' },
  logoTxt: {
    height: '200%',
    width: '100%',
    tintColor: COLORS.GREEN
  }

})
