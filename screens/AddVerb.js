import React, { useState } from 'react';
import { 
    View,
    Button,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { 
    useToast
} from 'native-base';
import firebase from '../database/firebase';

const AddVerb = (props) => {
    const [state, setState] = useState({
        verbSpanish: '',
        verbPresent: '',
        verbPastS: '',
        verbPastP: ''
    });
    const [image, setImage] = useState(null);
    const toast = useToast();

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value});
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Los permisos para acceder a la camara son necesarios");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

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
                    image: state.verbPresent
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
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Verb in Spanish"
                onChangeText={(value) => handleChangeText('verbSpanish', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Verb in present"
                onChangeText={(value) => handleChangeText('verbPresent', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Verb in simple past"
                onChangeText={(value) => handleChangeText('verbPastS', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Verb in past participe"
                onChangeText={(value) => handleChangeText('verbPastP', value)}
                />
            </View>
            <View style={styles.imageUpload}>
                <Button title="Subir imagen" onPress={() => {openImagePickerAsync()} } />
            </View>
            <View>
                { image != null &&
                    <Image source={{uri: image}} style={styles.image} />
                }
                <Button title="Agregar" onPress={() => {SaveVerb()}} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    imageUpload: {
        paddingBottom: 10,
        width: 150,
    },
    image: {
        width: 100, 
        height: 100
    }
});

export default AddVerb;