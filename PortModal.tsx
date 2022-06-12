import React, { useCallback, useEffect, useState } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Button,
  Alert,
  TextInput,
} from 'react-native'
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons'

import color from '../styles/color'
import Port from '../interfaces/Port'
import core from '../styles/core'

const PortModal = ({ visible, hideModal }: { visible?: boolean, hideModal: () => void }) => {
  // { port }: { port?: Port }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.')
          hideModal()
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={hideModal}
            >
              <FontAwesome name="close" size={28} color="black" />
            </Pressable>

            <View>
              <Text>Hallo</Text>
            </View>

            <Pressable>
              <Text style={styles.buttonText}>Voeg toe</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    justifyContent: 'flex-end',
  },
  modalOpen: {
    backgroundColor: 'green',
    fontSize: 15,
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'VAG Rounded Std Black',
    padding: 15,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 35,
    // alignItems: 'center',
    // justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 25,
    height: '70%',
    width: '100%',
  },
  button: {
    // borderRadius: 20,
    color: color.hPink,
    fontSize: 40,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignContent: 'center',

    // padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
  },
  modalTitle: {
    textAlign: 'left',
    fontSize: 20,
    marginTop: 16,
    color: color.hBlue,
    backgroundColor: 'green',
  },
  buttonText: {
    color: color.hLight,
    backgroundColor: color.hPink,
    borderRadius: 20,
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    color: color.hDark,
  },
  modalBtnSave: {
    alignContent: 'flex-end',
    backgroundColor: color.hDark,
  },

  centerImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default PortModal
