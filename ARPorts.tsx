import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert, Modal, Pressable } from 'react-native'
import * as Haptics from 'expo-haptics'

import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroFlexView,
  ViroImage,
  ViroNode,
  ViroText,
} from '@viro-community/react-viro'
import { FontAwesome } from '@expo/vector-icons'
import Port from './../interfaces/Port'
import color from '../styles/color'
import PortModal from './PortModal'
import ProfileBtn from './ProfileBtn'
import CustomisableAlert from 'react-native-customisable-alert'

type ActivateModal = 'UP' | 'DOWN'

// { port }: { port?: Port }
const poortGraph = () => {
  const [evenPortList, setEvenPortList] = useState<Port[] | undefined>([])
  const [oddPortList, setOddPortList] = useState<Port[] | undefined>([])
  const [modalVisible, setModalVisible] = useState(false)

  const switchList = require('./../Data/switch01.json')

  const showModal = (pn) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  ViroARTrackingTargets.createTargets({
    qrImage: {
      source: require('./../assets/qrCode.png'),
      orientation: 'Up',
      physicalWidth: 0.8, // Real word width in meters 0.165
    },
  })
  const getClick = (n: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    Alert.alert(`Er is gedrukt op ${n}`)

    // hallo('hallo')
  }

  const setPortImage = (ps, i, pn) => {
    switch (ps) {
      case 'up':
        return (
          <ViroNode key={i} onClick={() => getClick(pn)}>
            <ViroImage
              key={i}
              source={require('./../assets/networkport_up.png')}
              width={0.5}
              height={0.5}
              rotation={[-90, 0, 0]}
              resizeMode="ScaleToFit"
              // style={{ flex: 0.5 }}
            />
          </ViroNode>
        )
      case 'down':
        return (
          <ViroNode key={i} onClick={() => getClick(pn)}>
            <ViroImage
              key={i}
              source={require('./../assets/networkport_down.png')}
              width={0.5}
              height={0.5}
              rotation={[-90, 0, 0]}
              resizeMode="ScaleToFit"
              // style={{ flex: 0.5 }}
              // onClick={() => getClick(i)}
            />
          </ViroNode>
        )
    }
  }

  const anchorFound = () => {
    console.log('Anchor/Image Detected')
    // Alert.alert('QR-code gededecteerd')
  }

  const sortPortNumbers = () => {
    evenPortList.length = 0
    oddPortList.length = 0
    switchList.map((p) => {
      p.numb = p.index += 1
      const port = { ...p }
      if (port.numb % 2 === 0) {
        setEvenPortList((evenPortList) => [...evenPortList, port])
      } else {
        setOddPortList((oddPortList) => [...oddPortList, port])
      }
    })
  }
  useEffect(() => {
    sortPortNumbers()
  }, [])

  return (
    <ViroARScene>
      <ViroARImageMarker target="qrImage" onAnchorFound={anchorFound}>
        <ViroAmbientLight color={'#ffffff'} />
        <ViroNode
          position={[0, -1, -1]}
          style={
            {
              // flexDirection: 'column',
              // flexWrap: 'wrap',
              // justifyContent: 'space-between',
              // padding: 0.3,
              // flex: 2,
            }
          }
          width={5.0}
          height={5.0}
        >
          <ViroFlexView
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              flex: 1,
              width: 1,
            }}
            // width={0.5}
          >
            {oddPortList.map((p) => {
              return setPortImage(p.status, p.index, p.name)
            })}
          </ViroFlexView>
        </ViroNode>
        {/* <ViroNode
          position={[0, -1, -1]}
          style={{
            flexDirection: 'row',
            // justifyContent: 'space-between',
            flex: 1,
            width: 1,
            paddingTop: 3,
          }}
          width={5.0}
          height={5.0}
        >
          {evenPortList.map((p) => {
            return setPortImage(p.status, p.index)
          })}
        </ViroNode> */}
      </ViroARImageMarker>
    </ViroARScene>
  )
}

export default () => {
  const [showModal, setShowModal] = useState<ActivateModal | undefined>()
  return (
    <>
      <ViroARSceneNavigator
        shadowsEnabled={true}
        autofocus={true}
        initialScene={{ scene: poortGraph }}
      />
      {showModal === 'UP' && <PortModal />}
      <ProfileBtn />
    </>
  )
}

const styles = StyleSheet.create({
  f1: {
    flex: 1,
    width: '100%',
  },
  fullScreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
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

  arText: {
    fontSize: 24,
  },
})
