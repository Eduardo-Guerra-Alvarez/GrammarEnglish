import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { 
    NativeBaseProvider, 
    Box, ChevronRightIcon, 
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
            <Box flex={1} bg="#292929">
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
                                            <ChevronRightIcon color="#999999" style={styles.arrow}/>
                                            {verb.verbPresent}
                                        </Text>
                                        <Text style={styles.subtitle}>{verb.verbSpanish}</Text>
                                    </View>
                                )
                            })
                        }
                        <Fab 
                            position="absolute"
                            size="sm"
                            icon={<Icon color="white" as={<AntDesign name="plus" />}
                            size="sm" />}
                            onPress={() => props.navigation.navigate('AddVerb')}
                        />
                    </Box>
                </ScrollView>
            </Box>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    view: {
        borderBottomWidth: 1,
        borderBottomColor: '#333333'
    },
    title: {
        color: '#FFFFFF',
        paddingLeft: 30,
        paddingTop: 5
    },
    subtitle: {
        color: '#999999',
        paddingLeft: 30,
        paddingBottom: 5
    },
    search: {
        paddingBottom: 20,
        alignItems: 'center'
    },
    arrow: {
        position: 'fixed',
        padding: 5,
        left: '90%'
    }
});

export default VerbsList;

/*
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
                        position="absolute"
                        size="sm"
                        icon={<Icon color="white" as={<AntDesign name="plus" />}
                        size="sm" />}
                        onPress={() => props.navigation.navigate('AddVerb')}
                    />
                </Box>
            </ScrollView>
            </View>
        </NativeBaseProvider>
*/