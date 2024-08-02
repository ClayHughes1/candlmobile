import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    Dimensions,
} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {RadioGroup} from 'react-native-radio-buttons-group';
import DropDownPicker from 'react-native-dropdown-picker';
import Orientation from 'react-native-orientation-locker';
import { Item , RadioButton} from './../../src/types/types.ts'; 

const HelpScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [compName, setCompName] = useState('');
    const [compPhone, setCompPhone] = useState('');
    const [phExt, setPhExt] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [servDesc, setServDesc] = useState('');
    const [conPref, setConPref] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string>();
    const [screenData, setScreenData] = useState(Dimensions.get('window'));

    /**
     * Perform actions on scree load
     */
    useEffect(() => {

        const updateDimensions = () => {
            setScreenData(Dimensions.get('window'));
        };

        // Lock the orientation to portrait
        Orientation.lockToPortrait();

        // To lock to landscape, you can use
        // Orientation.lockToLandscape();

        // To unlock orientation (allow both orientations)
        // Orientation.unlockAllOrientations();

        // Clean up the effect
        return () => {
            Orientation.unlockAllOrientations();
        };

    }, []);

    /**
     * Record assistance request in db 
     */
    const addAssistanceRequest = async() => {
        if(email === '' || firstName === '' || lastName === '' ||  servDesc === '')
        {
            Alert.alert('Email, First name, and Last name are required');
        }else {
            try {
                await fetch('http://10.0.0.244:4000/api/requsthelp', {
                    method: 'POST',
                    headers: {
                        'Accept':'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, firstName,lastName,compName, compPhone,  servDesc, phExt}),
                })
                .then((res) => res.json())
                .then((json) => {
                    if (json.success === true) {
                        Alert.alert('Message',json.message);
                        navigation.navigate('Home');
                    } else {
                        Alert.alert('Message',json.message);
                    }
                })
                .catch((err) => {
                    Alert.alert('ERROR ',err);
                    console.error('Error   ',err);
                });
            } catch (error) {
                console.error('ERROR ',error);
            }
        }
    };

    /**
     * Performs email validation
     * @param email 
     * @returns 
     */
    const validateEmail = (email: string) => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Handles assistance request submission
     * @returns 
     */
    const btnSubmit = async() => {
        try {
            if (!validateEmail(email)) {
                Alert.alert('Validation Error', 'Please enter a valid email address.');
                return;
            }

            if (email === '' || firstName === '' || lastName === '' || servDesc === '') {
                Alert.alert('Input Error', 'All fields must be filled and a valid service type must be selected.');
                return;
            }
            else {
                addAssistanceRequest();
            }
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Handles radion button default value change
     * @param radioButtonsArray 
     */
    const handleRadioChange = (radioButtonsArray: any) => {
        try {
            setSelectedId(radioButtonsArray);
            setConPref(radioButtonsArray);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Construct static input objects
     * @param param0 
     * @returns 
     */
    const renderItem = ({ item }: { item: Item })     => (
        <View style={styles.controlView}>
            <Text style={styles.labels}>{item.label}</Text>
            <TextInput
                style={styles.inputs}
                onChangeText={item.onChangeText}
                value={item.value}
                placeholder={item.placeholder}
                keyboardType={item.keyboardType || 'default'}
            />
        </View>
    );

    /**
     * Initialize static input elements and store in an array
     */
    const data:Item[] = [
        { key: 'company', label: 'Company Name', placeholder: 'Company Name', value: compName, onChangeText: setCompName },
        { key: 'email', label: 'Email', placeholder: 'Email Address', value: email, onChangeText: setEmail },
        { key: 'firstName', label: 'First Name', placeholder: 'First Name', value: firstName, onChangeText: setFirstName },
        { key: 'lastName', label: 'Last Name', placeholder: 'Last Name', value: lastName, onChangeText: setLastName },
        { key: 'compPhone', label: 'Phone', placeholder: 'Phone Number', value: compPhone, onChangeText: setCompPhone,  keyboardType: 'number-pad' },
        { key: 'phExt', label: 'Phone Ext', placeholder: 'Phone Extension', value: phExt, onChangeText: setPhExt, keyboardType: 'number-pad' },
    ];

    /**
     * Initialize static radio button elements and store in an array
     */
    const radioButtons: RadioButton[] = [
        { id: '1', label: 'Phone 1', value: 'phone' },
        { id: '2', label: 'Email 2', value: 'email' }
    ];

    return(
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 60, android: 78 })}>

            <ImageBackground source={require('../components/img/main_bg.gif')}
            style={styles.background}>
                <SafeAreaView style={[styles.container,{width: screenData.width,padding:0}]}>                    
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

                    <View style={{width: '100%',borderBottomColor: 'lightblue',borderBottomWidth: 4, backgroundColor: '#fff'}}>
                        <Text style={styles.greetText}>Request Assistance</Text>
                    </View>
                    
                    <View style={{height:'59%',width: screenData.width+5,padding:0}}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.key}
                            style={{width: '100%',margin:0}}
                            ListFooterComponent={
                                <View style={styles.controlView}>

                                    <Text style={styles.labels}>Description</Text>
                                    <TextInput
                                        style={styles.descInputs}
                                        onChangeText={setServDesc}
                                        value={servDesc}
                                        placeholder='Description'
                                        multiline={true}
                                        numberOfLines={10}
                                    />

                                    <Text style={styles.labels}>Contact Preference</Text>
                                    <View style={styles.alignStart}>
                                        <RadioGroup
                                            radioButtons={radioButtons}
                                            onPress={handleRadioChange}
                                            selectedId={selectedId}
                                            labelStyle={{color: '#000', fontSize:20,padding:0, marginLeft: 5,}}
                                            layout={'row'}
                                        />
                                    </View>
                                </View>
                            }
                        />
                    </View>
                    <View style={{flexDirection: 'row',padding: 0,marginTop:0,width: '100%'}}>
                        <TouchableOpacity style={styles.touchStyle1} onPress={() => btnSubmit()}>
                            <Text style={styles.btnSubmit}>Submit Request</Text>
                        </TouchableOpacity>
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
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    appName:{
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 25,
        fontWeight: '600',
        padding:10,
        color: '#fff',
    },
    pageTitle:{
        marginTop: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 30,
        fontWeight: '600',
        padding:2,
        color: '#000',
    },
    btnSubmit:{
        color: '#000000',
        padding: 8,
        margin: 5,
        fontSize: 18,
        fontWeight: '900',
        backgroundColor:'rgba(0, 0, 0,0.3)',
        width: 200,
        height: 50,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 40,
        alignSelf: 'flex-start',
        bottom: 0,
    },
    labels:{
        paddingBottom: 5,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        width:'100%',
    },
    controlView:{
        width:'100%',
        paddingTop: 40,
        paddingRight:10,
        paddingLeft: 20,
    },
    inputs:{
        width: '95%',
        marginTop: 15,
        borderWidth: 1,
        height: 45,
        fontSize: 16,
        color: '#000000',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    descInputs:{
        width: '95%',
        marginTop: 15,
        borderWidth: 1,
        height: 150,
        fontSize: 16,
        color: '#000000',
        marginBottom: 20,
        backgroundColor: '#fff',
        textAlignVertical: 'top', // Ensure text starts at the top-left corner    
    },
    touchStyle1:{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: 300,
        height: 100,
        marginTop: -20,
    },
    alignStart:{
        alignItems: 'flex-start',
        fontSize: 20,
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
    },
    greetText: {
        padding: 10, // Padding around the text
        // backgroundColor: '#e0e0e0', // Background color of the text
        marginTop: 0,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: '800',
        color: '#000',
    },
});

export default HelpScreen;

