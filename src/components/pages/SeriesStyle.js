import  { StyleSheet } from 'react-native';

const SeriesStyle = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  row: {
   padding: 3,
   margin: 7,
   width: 105,
   height: 150,
   backgroundColor: '#F6F6F6',
   alignItems: 'center',
   borderWidth: 1,
   borderRadius: 5,
   borderColor: '#CCC'
  },
  logo: {
   width: 90,
   height: 120
  },
  text: {
   flex: 1,
   marginTop: 5,
   fontSize: 10,
   textAlign: 'center'
  }
});

export default SeriesStyle;
