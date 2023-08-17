import { useEffect, React, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Modal,
  Picker,
  Button,
  TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { IPV4_ADDRESS } from '../views/SiteHome'

export const NodeComponent = ({ route }) => {
  const { id, ticket } = route.params
  const [childNodes, setChildNodes] = useState([])
  const [isModalVisible, setModalVisible] = useState(false)
  const [nodeName, setNodeName] = useState('')
  const [selectedNodeType, setSelectedNodeType] = useState('cm:content')
  const navigation = useNavigation()

  const fetchChildNodes = async (id, ticket) => {
    const myheaders = {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + ticket
      }
    }

    const response = await fetch(
      `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children`,
      myheaders
    )

    const data = await response.json()

    return data.list.entries
  }
  const fetchData = async () => {
    const nodes = await fetchChildNodes(id, ticket)
    setChildNodes(nodes)
  }
  useEffect(() => {
    fetchData()
  }, [id, ticket])

  const createNode = async () => {
    const myheaders = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + ticket
      },
      body: JSON.stringify({ name: nodeName, nodeType: selectedNodeType })
    }
    const response = await fetch(
      `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children`,
      myheaders
    )

    if (response.ok) {
      // Node created successfully, update the list of child nodes
      fetchData()
      setModalVisible(false)
    } else {
      console.error('Error creating node')
    }
  }

  const handleNodePress = (node) => {
    if (node.entry.nodeType === 'cm:content') {
      navigation.navigate('NodeContent', {
        ticket,
        id: node.entry.id
      })
      console.log('Se ha seleccionado un archivo:', node.entry.name)
    } else if (node.entry.nodeType === 'cm:folder') {
      navigation.navigate('NodeComponent', {
        ticket,
        id: node.entry.id
      })
    }
  }
  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>CARGAR</Text>
      </Pressable>

      {childNodes.length > 0
        ? (
          <ul>
            {childNodes.map((node) => (
              <li key={node.entry.id}>
                <Pressable onPress={() => handleNodePress(node)}>
                  <Text>{node.entry.name}</Text>
                  <Text style={{ fontWeight: 'bold' }}>{node.entry.id}</Text>
                </Pressable>
              </li>
            ))}
          </ul>
          )
        : (
          <Text>No hay carpetas hijas.</Text>
          )}

      <Modal visible={isModalVisible} animationType='slide'>
        <View>
          <Text>Crear Nuevo Nodo</Text>
          <TextInput
            placeholder='Nombre del nodo'
            value={nodeName}
            onChangeText={(text) => setNodeName(text)}
          />
          <Picker
            selectedValue={selectedNodeType}
            onValueChange={(itemValue) => setSelectedNodeType(itemValue)}
          >
            <Picker.Item label='Archivo' value='cm:content' />
            <Picker.Item label='Carpeta' value='cm:folder' />
            {/* Add more types as needed */}
          </Picker>
          <Button title='Crear' onPress={createNode} />
          <Button title='Cancelar' onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  )
}
