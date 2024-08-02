import React, { useState, useRef, useMemo, useEffect  } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    // useColorScheme,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    // ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    // TouchableWithoutFeedback,
    // Keyboard,
    // FlatList,
    Linking,
    Dimensions,
    Button,
} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Orientation from 'react-native-orientation-locker';
import email from 'react-native-email';

const ContactScreen = () => {
    const phoneNumber = '+2202150612'; 
    const [screenData, setScreenData] = useState(Dimensions.get('window'));
    const [isViewVisible, setIsViewVisible] = useState(false);
    const [emailMessage, setEmailMessage] = useState('');

    /**
     * Perform actions on screen loading
     */
    useEffect(() => {
        const updateDimensions = () => {
            setScreenData(Dimensions.get('window'));
        };

        // Lock the orientation to portrait
        Orientation.lockToPortrait();

        // Clean up the effect
        return () => {
            Orientation.unlockAllOrientations();
        };

    }, []);
  
    // const btnSubmit = () => {
    //     Alert.alert('Message', 'Hello');
    // };

    /**
     * Handles View section visibility 
     */
    const toggleViewVisibility = () => {
        setIsViewVisible(!isViewVisible);
    };

    /**
     * Handle calling process based on platform 
     */
    const callCompany = () => {
        let phoneNum = phoneNumber;

        if (Platform.OS !== 'android') {
            phoneNum = `telprompt:${phoneNumber}`;
        }
        else  {
            phoneNum = `tel:${phoneNumber}`;
        }

        Linking.canOpenURL(phoneNum)
          .then((supported) => {
            if (!supported) {
              Alert.alert('Error', 'Phone call not supported');
            } else {
              return Linking.openURL(phoneNum);
            }
        })
        .catch((err) => console.error('Error occurred', err));
    };
      
    /**
     * Emailing functionality
     */
    const sendEmail = () => {
        const email = 'candl.ent.email@canl-enterprises.com';
        const subject = 'Customer Inquiry';
        const body = emailMessage;
    
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        Linking.canOpenURL(mailtoUrl)
          .then((supported) => {
            console.log('EMAIL URL \n',mailtoUrl);
            console.log('IS SUPPORTED \n',supported);
            if (supported) {
              Linking.openURL(mailtoUrl);
            } else {
              Alert.alert('Error', 'Email client is not available');
            }
          })
          .catch((error) => console.error('Error opening email client:', error));
    };

    return(
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 60, android: 78 })}>

            <ImageBackground source={require('../components/img/main_bg.gif')}
            style={styles.background}>
                <SafeAreaView style={[styles.container,{width: screenData.width}]}>
                    <View style={{
                        height:125,
                        width: '100%',
                        marginBottom: 10,
                        padding:0,
                    }}>
                    <ImageBackground
                            style={styles.background}
                            source={require('../components/img/head_bg_img_2.jpg')}
                            >
                        <View style={{padding:20,}}>
                            <Text style={styles.appName}>C&L Enterprises</Text>
                        </View>
                        </ImageBackground>

                    </View>

                    
                    <View style={[styles.vwSect,styles.sectionBorder]}>
                        <Text style={styles.pageTitle}>Contact Us</Text>
                    </View>
                    
                    <View style={{width: '100%',height: 130,paddingTop:20,paddingLeft: 20, paddingRight:20, paddingBottom: 0,marginBottom:0,}}>
                        <Text style={{color: '#000',fontWeight: '600',fontSize: 16,}}>
                            Contact C&L Enterprises with any question, or concerns related to current, or future projects.
                        </Text>
                    </View>

                    {isViewVisible && (
                        <View style={styles.emailPortal}>
                            <Text style={styles.label}>Your Message:</Text>
                            <TextInput
                                style={styles.textInput}
                                multiline
                                placeholder="Write your message here"
                                value={emailMessage}
                                onChangeText={setEmailMessage}
                            />
                            <Button title="Send Email" onPress={sendEmail} />
                        </View>
                    )}

                    <View style={{flexDirection: 'row'}}>
                        <View style={[styles.vwSect,{flexDirection: 'row',padding:0,}]}>
                            <TouchableOpacity style={styles.touchStyle1} onPress={() => toggleViewVisibility()}>
                                <Text style={styles.btnSubmit}>Email</Text>
                            </TouchableOpacity>
                        {/* </View> 
                        <View style={styles.vwSect}> */}
                            <TouchableOpacity style={styles.touchStyle1} onPress={() => callCompany()}>
                                <Text style={styles.btnSubmit}>Call</Text>
                            </TouchableOpacity> 
                        </View> 
                    </View>

                </SafeAreaView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    appName:{
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 25,
        fontWeight: '600',
        padding:10,
        color: '#fff',
    },
    pageTitle:{
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 25,
        fontWeight: '600',
        padding:10,
        color: '#000',
    },
    btnSubmit:{
        color: '#000000',
        padding: 8,
        margin: 5,
        fontSize: 15,
        fontWeight: '900',
        backgroundColor:'rgba(0, 0, 0,0.3)',
        width: 150,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginLeft: 5,
        alignSelf: 'flex-start',
        bottom: 0,
    },
    touchStyle1:{
        backgroundColor:'rgba(0, 0, 0, 0)',
        width: 200,
        height: 50,
        marginLeft: 5,
        marginTop: 2,
        marginRight: 2,
        marginBottom: 2,
        justifyContent: 'center',
        paddingLeft: 2,
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
    },
    vwSect: {
        marginTop: 0,
    },
    greetText: {
        padding: 10, // Padding around the text
        marginTop: 0,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
    },
    emailPortal: {
        marginTop: 20,
        width: '100%',
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    textInput: {
        height: 200,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
        textAlignVertical: 'top',
    },
    label:{
        paddingBottom: 5,
        fontSize: 18,
        fontWeight: '500',
        color: '#000000',
        width:'100%',
    },
    sectionBorder: {
        borderBottomColor: 'lightblue',
        borderBottomWidth: 4, 
        marginBottom: 15,   
        padding: 0,
        width: '110%',
    },
});

export default ContactScreen;

