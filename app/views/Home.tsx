import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {ParamListBase,} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Orientation from 'react-native-orientation-locker';

const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
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

    return(
        <SafeAreaView style={styles.container}>
            <View style={{
                height:168,
                marginBottom: 50,
                padding:0,
            }}>
            <ImageBackground
                    style={styles.background}
                    source={require('../components/img/head_bg_img_2.jpg')}
                    >
                <View style={styles.sectionBorder}>
                    <Text style={styles.appName}>C&L Enterprises</Text>
                    <Text style={styles.greetText}>IT solutions for small business</Text>
                </View>
                </ImageBackground>

            </View>

            <ScrollView style={styles.scrollSec}>
                <View>
                    <Image
                    style={{
                        resizeMode: 'cover',
                        height: 125,
                        width: 400,
                        marginLeft:15,
                    }}
                    source={require('../components/img/body_img.gif')}
                    />
                    <View style={styles.descSection}>
                        <Text style={styles.servTitle}>Web Services</Text>
                        <Text style={styles.descText}>
                            At C&L Enterprises we believe no one size fits all. We don’t cut corners,
							nor do we believe in cookie cutter design approaches. Your site represents your business. 
							We believe in interacting with our clientele. With a full scaled design approach,
							we will design, test, deploy and maintain your digital business footprint. 
                        </Text>
                    </View>
                </View>

                <View>
                    <Image
                    style={{
                        resizeMode: 'cover',
                        height: 125,
                        width: 400,
                        marginLeft:15,
                    }}
                    source={require('../components/img/body_img.gif')}
                    />
                    <View style={styles.descSection}>
                        <Text style={styles.servTitle}>Mobile Services</Text>
                        <Text style={styles.descText}>
                            At C&L Enterprises we specialize in crafting cutting-edge mobile experiences that captivate users and drive business growth. Our team of seasoned designers, testers, and developers work tirelessly to bring your vision to life, ensuring every aspect of your mobile app exceeds expectations.
							With a keen eye for detail and a commitment to quality, we meticulously design and prototype mobile apps that are both visually stunning and intuitively functional. From sleek user interfaces to seamless navigation, we prioritize user experience at every stage of the design process.
							Our rigorous testing procedures guarantee flawless performance across various devices and operating systems. Through comprehensive testing frameworks and automated processes, we identify and address any issues before they reach your users, ensuring a smooth and bug-free experience.
							When it comes to implementation, we leverage the latest technologies and industry best practices to transform your app from concept to reality. Whether you're launching on iOS, Android, or both, our team has the expertise to deploy your app efficiently and effectively.
							At C&L Enterprises, we understand that your success is our success. That's why we collaborate closely with you throughout the entire development lifecycle, from initial concept to post-launch support. Your satisfaction is our top priority, and we're dedicated to delivering results that exceed your expectations.
                        </Text>
                    </View>
                </View>

                <View>
                    <Image
                    style={{
                        resizeMode: 'cover',
                        height: 125,
                        width: 400,
                        marginLeft:15,
                    }}
                    source={require('../components/img/body_img.gif')}
                    />
                    <View style={styles.descSection}>
                        <Text style={styles.servTitle}>Platform Services</Text>
                        <Text style={styles.descText}>
                            At C&L Enterprises, we are committed to delivering exceptional IT solutions tailored to meet the evolving 
							needs of modern businesses. With a comprehensive suite of services, including Database Services, 
							Database Optimization, Identity and Access Management (IAM), 
							API Management, Analytics and Business Intelligence (BI), Virtualization and Desktop as a Service (DaaS), 
							and Web and Mobile Application Development, we empower organizations to thrive in today's digital landscape. 
							Our expert team utilizes cutting-edge technologies and industry best practices to optimize efficiency, 
							enhance security, and drive innovation. Whether you require seamless data management, 
							robust identity protection, or bespoke software solutions, we provide the expertise and 
							support needed to achieve your business objectives. 
							Partner with C&L Enterprises and unlock the full potential of your IT infrastructurent.     
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.touchStyle1,styles.btnMarginLeft0,styles.btnMarginRight0]} onPress={() => navigation.navigate('Qoute')}>
                    <Text style={[styles.button,styles.btnMarginLeft0,styles.btnMarginRight0]}>QOUTE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.touchStyle1,styles.btnMarginLeft0,styles.btnMarginRight0]} onPress={() => navigation.navigate('Help')}>
                    <Text style={styles.button}>HELP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchStyle1} onPress={() => navigation.navigate('Contact')}>
                    <Text style={styles.button}>CONTACT</Text>
                </TouchableOpacity> 
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height:'94%',
        width: '100%',
        padding: 0,
    },
    video: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ADD8E6',
        height:300,
    },
    appName:{
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 33,
        fontWeight: '800',
        padding:10,
        color: '#fff',
    },
    servTitle:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 20,
        color: '#000',
        fontWeight: '800',
        borderBottomColor: 'lightblue',
        borderBottomWidth: 2, 
    },
    greetText: {
        padding: 10, // Padding around the text
        // backgroundColor: '#e0e0e0', // Background color of the text
        marginTop: 0,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: '800',
        color: '#fff',
    },
    button:{
        color: '#000000',
        padding: 8,
        fontSize: 15,
        fontWeight: '900',
        backgroundColor:'rgba(0, 0, 0,0.3)',
        width: 120,
        height: 60,
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 0,
    },
    btnMarginLeft20:{
        marginLeft:20,
    },
    btnMarginLeft0:{
        marginLeft:0,
    },
    btnMarginTop:{
        marginTop: 20,
    },
    btnMarginRight10:{
        marginRight: 10
    },
    btnMarginRight0:{
        marginRight: 0
    },
    btnMarginBottom:{
        marginBottom: 0
    },
    background: {
        height: '100%',
        flex: 1,
        resizeMode: 'stretch', // or 'stretch' or 'contain'
        tintColor: '#fff',
    },
    sectionBorder: {
        borderBottomColor: 'lightblue',
        borderBottomWidth: 4, 
        marginBottom: 15,   
        padding: 0,
        width: '110%',
    },
    descText: {
        fontSize: 22,
        padding: 5,
        color: '#000',
    },
    descSection:{
        padding: 8,
        textAlign: 'center',
        // color: '#000',
    },
    row:{
        width: '100%',
        height: 60,
        flexDirection: "row",
        marginTop: 30,
        justifyContent: 'center',
        borderTopColor: 'lightblue',
        borderTopWidth: 2, 
    },
    scrollSec:{
        width: '95%',
        height:480, 
        padding:0,
        margin:8,
        color: '#000',
    },
    touchStyle1:{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        width: 125,
        height: 60,
        marginLeft: 0,
        marginTop: 30,
    },
});

export default HomeScreen;

  