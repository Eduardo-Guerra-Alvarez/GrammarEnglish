import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { 
    NativeBaseProvider, 
    Box, ChevronRightIcon, 
    Fab, Icon, ScrollView, Input, InfoOutlineIcon
} from 'native-base';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import firebase from '../database/firebase';
import { paddingRight } from 'styled-system';

const VerbsList = (props) => {
    const [verbs, setVerbs] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        firebase.db.collection('verbs').orderBy('verbPresent').onSnapshot(querySnapshot => {
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
                    style={{color: '#ffffff'}}
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
                                    <TouchableOpacity 
                                        style={styles.view}
                                        key={verb.id}
                                        onPress={() => {
                                            props.navigation.navigate('VerbDetail', {
                                                verbId: verb.id
                                            })
                                        }}
                                    >
                                        <View >
                                            <Text 
                                            style={styles.title}
                                            >
                                                {verb.verbPresent}
                                            </Text>
                                        </View>
                                        <View style={{position: 'absolute', right: '5%', top: 10}}>
                                            <ChevronRightIcon color="#999999"/>
                                        </View>
                                        <Text style={styles.subtitle}>{verb.verbSpanish}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        <Fab 
                            style={{backgroundColor: '#00cccc'}}
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
        paddingTop: 5,
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
});

export default VerbsList;