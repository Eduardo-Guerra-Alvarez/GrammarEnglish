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
            <View style={styles.container}>
            <Box style={styles.search}>
                <Input
                style={{color: 'white'}}
                width="95%"
                onChangeText={(value) => searchVerb(value)}
                placeholder="Buscar un Verbo"
                variant="underlined"
                InputRightElement={
                    <Icon
                    size="sm"
                    as={<AntDesign name="search1" />}
                    _light={{
                        color: "white",
                      }}
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
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292929'
    },
    view: {
        borderBottomWidth: 1,
        borderBottomColor: '#333333'
    },
    title: {
        color: '#FFFFFF',
        paddingLeft: '30px',
        paddingTop: '5px'
    },
    arrow: {
        color: '#FFFFFF',
        float: 'right'
    },
    subtitle: {
        color: '#999999',
        paddingLeft: '30px',
        paddingBottom: '5px'
    },
    search: {
        paddingBottom: 20,
        alignItems: 'center'
    }
});

export default VerbsList;