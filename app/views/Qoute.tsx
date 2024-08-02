import React, { useState, useRef, useMemo,useEffect } from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import {RadioGroup} from 'react-native-radio-buttons-group';
import Orientation from 'react-native-orientation-locker';
import { Item , RadioButton} from './../../src/types/types.ts'; 

const QouteScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [compName, setCompName] = useState('');
    const [compPhone, setCompPhone] = useState('');
    const [phExt, setPhExt] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [servDesc, setServDesc] = useState('');
    const [servType, setServType] = useState<string>('');
    const [conPref, setConPref] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string>();
    const [screenData, setScreenData] = useState(Dimensions.get('window'));

    /**
     * Perform actions on screen load
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
     * Initialize static radio button elements and store in an array
     */
    const radioButtons: RadioButton[] = [
        { id: '1', label: 'Phone 1', value: 'phone' },
        { id: '2', label: 'Email 2', value: 'email' }
    ];

    /**
     * Record quote request data in db
     */
    const addQouteData = async() => {
        if(email === '' || firstName === '' || lastName === '' || servType === "0" || servDesc === '')
        {
            Alert.alert('Email, First name, and Last name are required');
        }else {
            try {
                Alert.alert('Sending to api ');
                await fetch('http://10.0.2.2:4000/api/submitquoterequest', {
                    method: 'POST',
                    headers: {
                        'Accept':'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, firstName,lastName,compName, compPhone, servType, servDesc, phExt,conPref }),
                })
                .then((res) => res.json())
                .then((json) => {
                    console.log(JSON.stringify(json));
                    if (json.success === true) {
                        Alert.alert('Message',json.message);
                        navigation.navigate('Home');
                    } else {
                        Alert.alert('Message',json.message);
                    }
                })
                .catch((err) => {
                    console.error('Error   ',err);
                    console.log('ERROR1 \n',err);
                });
            } catch (error) {
                console.error('ERROR ',error);
                console.log('ERROR2 \n',error);

            }
        }
    };

    /**
     * Initialize drop down pikcer selection elements
     */
    const [items, setItems] = useState([
        {label: 'Select', value: '0'},
        {label: 'Mobile', value: '1'},
        {label: 'Web', value: '2'},
        {label: 'PLatform', value: '3'},
    ]);

    /**
     * Handles drop down picker change event
     * @param value 
     */
    const handleChangeValue = (value: any) => {
        try {
            if(value > "0")
            {
                setServType(value);
            }
            else {
                Alert.alert('Please select a valid option. ');
            }
        } catch (error) {
            console.error('An error occurred  ',error);
        }
    };

    /**
     * Performs email validation functionality
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
     * Handles qoute request submission
     * @returns 
     */
    const btnSubmit = async() => {
        try {
            if (!validateEmail(email)) {
                Alert.alert('Validation Error', 'Please enter a valid email address.');
                return;
            }

            if (email === '' || firstName === '' || lastName === '' || servType === 'select' || servDesc === '') {
                Alert.alert('Input Error', 'All fields must be filled and a valid service type must be selected.');
                return;
            }
            else {
                addQouteData();
            }
        } catch (error) {
            console.error(error);
            console.log('ERROR3 \n',error);
        }
    };

    /**
     * Handles radion buttton value change event
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
     * Creates static input elements 
     */
    const data:Item[] = [
        { key: 'company', label: 'Company Name', placeholder: 'Company Name', value: compName, onChangeText: setCompName },
        { key: 'email', label: 'Email', placeholder: 'Email Address', value: email, onChangeText: setEmail },
        { key: 'firstName', label: 'First Name', placeholder: 'First Name', value: firstName, onChangeText: setFirstName },
        { key: 'lastName', label: 'Last Name', placeholder: 'Last Name', value: lastName, onChangeText: setLastName },
        { key: 'compPhone', label: 'Phone', placeholder: 'Phone Number', value: compPhone, onChangeText: setCompPhone },
        { key: 'phExt', label: 'Phone Ext', placeholder: 'Phone Extension', value: phExt, onChangeText: setPhExt, keyboardType: 'number-pad' },
        // Add more items as needed
    ];

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

    return(
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 60, android: 78 })}>

            <ImageBackground source={require('../components/img/main_bg.gif')}
            style={styles.background}>
                <SafeAreaView>
                    <View style={{
                        height:100,
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

                    <View style={styles.sectionBorder}>
                        <Text style={{color: '#000',fontSize: 20,        fontWeight: '500',}}>Request A Qoute</Text>
                    </View>

                    {/* <View style={{height: 415,width: '100%',padding: 5, margin: 0,}}> */}
                    <View style={{height:'59%',width: screenData.width+5,padding:0}}>

                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.key}
                            style={{height: 800}}
                            ListFooterComponent={
                                <View style={styles.controlView}>
                                    <Text style={styles.labels}>Service Type:</Text>
                                    <DropDownPicker
                                        open={open}
                                        value={servType}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setServType}
                                        setItems={setItems}
                                        style={styles.inputs}
                                        closeAfterSelecting={true}
                                        onChangeValue={handleChangeValue}
                                    />

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
                                            labelStyle={{color: '#000', fontSize:18,padding:0, marginLeft: 5,}}
                                            layout={'row'}
                                        />
                                    </View>
                                </View>
                            }
                        />
                    </View>

                    <View>
                        <TouchableOpacity style={styles.touchStyle1} onPress={() => btnSubmit()}>
                            <Text style={styles.btnSubmit}>Submit Qoute</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName:{
        marginTop: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 22,
        fontWeight: '500',
        padding:2,
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
        width: 150,
        height: 60,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        alignSelf: 'flex-start',
        bottom: 0,
    },
    labels:{
        paddingBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        width:'100%',
    },
    controlView:{
        width:'100%',
        paddingTop: 20,
        paddingRight:10,
        paddingLeft: 20,
    },
    inputs:{
        width: '98%',
        marginTop: 15,
        borderWidth: 1,
        height: 50,
        fontSize: 17,
        color: '#000000',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    descInputs:{
        width: '95%',
        marginTop: 15,
        borderWidth: 1,
        height: 150,
        fontSize: 17,
        color: '#000000',
        marginBottom: 20,
        backgroundColor: '#fff',
        textAlignVertical: 'top', // Ensure text starts at the top-left corner    
    },
    touchStyle1:{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: 150,
        height: 100,
        margin: 10,
    },
    alignStart:{
        alignItems: 'flex-start',
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
    },
    sectionBorder: {
        borderBottomColor: 'lightblue',
        borderBottomWidth: 4, 
        marginBottom: 15,   
        paddingBottom: 0,
        paddingTop: 0,
        marginLeft: 15,
        width: '100%',
    },
    headerSect: {

    },
});

export default QouteScreen;
