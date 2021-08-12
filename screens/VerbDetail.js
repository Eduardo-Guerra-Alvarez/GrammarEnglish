import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';

const VerbDetail = (props) => {

    const [state, setState] = useState({
        verbSpanish: '',
        verbPresent: '',
        verbPastS: '',
        verbPastP: '',
        image: ''
    });
    const [image, setImage] = useState('');

    const getVerbById = async id => {
        const dbRef = firebase.db.collection('verbs').doc(id);
        const doc = await dbRef.get();
        const verb = doc.data();
        setState(verb);
        if(typeof verb.image !== 'undefined') {
            firebase.storage.ref(`images/${verb.image}`).getDownloadURL()
            .then(res => {
                setImage(res);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    const DeleteVerb = async () => {
        const dbRef = firebase.db.collection('verbs').doc(props.route.params.verbId);
        await dbRef.delete();
        if(typeof state.image !== 'undefined') {
            const desertRef = firebase.storage.ref().child(`images/${state.image}`);
            await desertRef.delete();
        }
        props.navigation.navigate('VerbsList');
    }

    useEffect(() => {
        getVerbById(props.route.params.verbId);
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.card, styles.shadowProp]}>
                <View style={{alignItems: 'center'}}>
                    {image != '' && 
                        <View>
                            <Image 
                                source={{uri: image}}
                                style={styles.imageContainer}
                            />
                        </View>
                    }
                    <Text style={styles.present}>{state.verbPresent}</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>
                        <Text style={{fontWeight: 'bold'}}>Significado: </Text>
                        {state.verbSpanish}
                    </Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>
                        <Text style={{fontWeight: 'bold'}}>Pasado Simple: </Text>
                        {state.verbPastS}
                    </Text>
                </View>
                { state.verbPastP != '' &&
                    <View>
                        <Text style={styles.subtitle}>
                            <Text style={{fontWeight: 'bold'}}>Pasado Participio: </Text>
                            {state.verbPastP}
                        </Text>
                    </View>
                }
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.delete} onPress={DeleteVerb}>
                        <Text>Eliminar Verbo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#292929'
    },
    card: {
        color: 'white',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        borderColor: '#333333'
    },
    shadowProp: {
        shadowColor: '#000000',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3
    },
    present: {
        fontSize: 30,
        paddingBottom: 20,
        color: 'white'
    },
    subtitle: {
        color: '#737373'
    },
    imageContainer: {
        height: 200,
        width: 200,
        resizeMode: 'contain'
    },
    delete: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ff6666',
        borderRadius: 5,
        
    }
});

export default VerbDetail;