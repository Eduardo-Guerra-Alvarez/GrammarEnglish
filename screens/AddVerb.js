import React, { useState } from 'react';
import { 
    View,
    Button,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import { 
    NativeBaseProvider,
    Input
} from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../database/firebase';

const AddVerb = (props) => {
    const [state, setState] = useState({
        verbSpanish: '',
        verbPresent: '',
        verbPastS: '',
        verbPastP: ''
    });
    const [image, setImage] = useState(null);

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value});
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Los permisos para acceder a la camara son necesarios");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setImage(pickerResult.uri);
    }

    const UploadImage = async (uri) => {
        new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    resolve(xhr.response)
                }
            };

            xhr.open("GET", uri);
            xhr.responseType = "blob";
            xhr.send();
        })
        .then((res) => {
            let ref = firebase.storage.ref().child("images/" + state.verbPresent);
            return ref.put(res);
        });
    }

    const SaveVerb = async ()  => {
        if(state.verbSpanish === '' || state.verbPresent === '' || state.verbPastS === '') {
            alert('Solo Past Participe puede estar vacio');
        } else {
            try {
                await firebase.db.collection('verbs').add({
                    verbSpanish: state.verbSpanish,
                    verbPresent: state.verbPresent,
                    verbPastS: state.verbPastS,
                    verbPastP: state.verbPastP,
                    image: (image !== null) ? state.verbPresent : ''
                });
                if (image !== null) {
                    UploadImage(image)
                    .then(() => {
                        console.log("Image uploaded successfully");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
                props.navigation.navigate('VerbsList');
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <NativeBaseProvider>
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Input 
                variant="underlined"
                placeholder="Verb in Spanish"
                onChangeText={(value) => handleChangeText('verbSpanish', value)}
                color="#FFFFFF"
                />
            </View>
            <View style={styles.inputGroup}>
                <Input 
                variant="underlined"
                placeholder="Verb in Present"
                onChangeText={(value) => handleChangeText('verbPresent', value)}
                color="#FFFFFF"
                />
            </View>
            <View style={styles.inputGroup}>
                <Input 
                variant="underlined"
                placeholder="Verb in Simple Past"
                onChangeText={(value) => handleChangeText('verbPastS', value)}
                color="#FFFFFF"
                />
            </View>
            <View style={styles.inputGroup}>
                <Input 
                variant="underlined"
                placeholder="Verb in Past Participle"
                onChangeText={(value) => handleChangeText('verbPastP', value)}
                color="#FFFFFF"
                />
            </View>
            <View style={styles.imageUpload}>
                <TouchableOpacity style={styles.btnUpload} onPress={() => {openImagePickerAsync()} }>
                    <Text>SUBIR IMAGEN</Text>
                </TouchableOpacity>
            </View>
            <View>
                { image != null &&
                    <Image source={{uri: image}} style={styles.image} />
                }
                <TouchableOpacity style={styles.btnAdd} onPress={() => {SaveVerb()}}>
                    <Text>AGREGAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#292929'
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#666666'
    },
    imageUpload: {
        paddingBottom: 10,
        width: 150,
    },
    image: {
        width: 100, 
        height: 100,
        resizeMode: 'contain'
    },
    btnAdd: {
        backgroundColor: '#00cccc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    btnUpload: {
        width: 150,
        backgroundColor: '#00cccc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    }
});

export default AddVerb;