import  { StyleSheet } from 'react-native';

const DetailStyle = StyleSheet.create({
    container: {
       flex: 1,
    },
    coverImage : {
      marginTop: 20,
      height: 180,
      alignSelf: "stretch"
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      height: 50,
      backgroundColor:'#00A4E4',
      marginBottom: 15
    },
    type: {
      alignItems: 'center',
      flexDirection:'row',
      marginLeft: 10,
      marginTop: 5
    },
    genre: {
      alignItems: 'center',
      flexDirection:'row',
      marginLeft: 10,
      marginTop: 5
    },
    textValue: {
      marginLeft: 10
    },
    title: {
      marginTop: 10,
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 32,
      fontWeight: '700',
      color: '#00A4E4'
    },
    description: {
      alignSelf: 'stretch',
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
      fontSize: 14,
      fontWeight: '400',
    }
});

export default DetailStyle;
