import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import { 
    NativeBaseProvider, 
    Box, ChevronRightIcon, Text, 
    Fab, Icon, ScrollView, Input,
} from 'native-base';
import { AntDesign } from "@expo/vector-icons";
import firebase from '../database/firebase';

const VerbsList = (props) => {
    const [verbs, setVerbs] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        firebase.db.collection('verbs').onSnapshot(querySnapshot => {
            const verbs = [];
            querySnapshot.docs.forEach(doc => {
                const { verbSpanish, verbPresent, verbPastS, vervPastP } = doc.data();
                verbs.push({
                    id: doc.id,
                    verbSpanish,
                    verbPresent,
                    verbPastS,
                    vervPastP
                });
            });
            setVerbs(verbs);
        });
    }, []);

    const searchVerb = (value) => {
        setSearch(value);
    }

    return (
        <NativeBaseProvider>
            <Box style={styles.search}>
                <Input 
                onChangeText={(value) => searchVerb(value)}
                placeholder="Buscar un Verbo"
                InputRightElement={
                    <Icon
                    size="md"
                    as={<AntDesign name="search1" />}
                    />
                }
                />
            </Box>
            <ScrollView>
                <Box>
                    {
                        verbs.map(verb => {
                            if(verb.verbPresent.toLowerCase().includes(search.toLowerCase())
                            || verb.verbSpanish.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <View 
                                        style={styles.view}
                                        key={verb.id}
                                    >
                                        <Text 
                                        style={styles.title}
                                        onPress={() => {
                                            props.navigation.navigate('VerbDetail', {
                                                verbId: verb.id
                                            })
                                        }}
                                        >
                                        
                                            {verb.verbPresent}
                                            <ChevronRightIcon style={styles.arrow}/>
                                        </Text>
                                        <Text style={styles.subtitle}>{verb.verbSpanish}</Text>
                                    </View>
                                )
                            } if (search == '') {
                                return (
                                    <View 
                                        style={styles.view}
                                        key={verb.id}
                                    >
                                        <Text 
                                        style={styles.title}
                                        onPress={() => {
                                            props.navigation.navigate('VerbDetail', {
                                                verbId: verb.id
                                            })
                                        }}
                                        >
                                        
                                            {verb.verbPresent}
                                            <ChevronRightIcon style={styles.arrow}/>
                                        </Text>
                                        <Text style={styles.subtitle}>{verb.verbSpanish}</Text>
                                    </View>
                                )
                            }
                            
                        })
                    }
                    <Fab 
                        position="fixed"
                        size="sm"
                        icon={<Icon color="white" as={<AntDesign name="plus" />}
                        size="sm" />}
                        onPress={() => props.navigation.navigate('AddVerb')}
                    />
                </Box>
            </ScrollView>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    view: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    title: {
        color: '#000000',
        paddingLeft: '30px',
        paddingTop: '5px'
    },
    arrow: {
        float: 'right'
    },
    subtitle: {
        color: '#999999',
        paddingLeft: '30px',
        paddingBottom: '5px'
    },
    search: {
        paddingBottom: 20,
    }
});

export default VerbsList;