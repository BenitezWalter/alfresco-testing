import { useEffect, React, useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const ChildrenComponent = ({ route }) => {
  const { id, ticket } = route.params
  const [childNodes, setChildNodes] = useState([])
  const navigation = useNavigation()
  const fetchChildNodes = async (id, ticket) => {
    const myheaders = {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + ticket
      }
    }

    const response = await fetch(
      `http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/children`,
      myheaders
    )

    const data = await response.json()
    return data.list.entries // Retorna los nodos hijos
  }

  useEffect(() => {
    const fetchData = async () => {
      const nodes = await fetchChildNodes(id, ticket)
      setChildNodes(nodes)
    }
    fetchData()
  }, [id, ticket])

  return (
    <View>
      {childNodes.length > 0
        ? (
          <ul>
            {childNodes.map((node) => (
              <li key={node.entry.id}>
                <Pressable onPress={() => navigation.navigate('ChildrenComponent', { ticket, id: node.entry.id })}>
                  <Text>{node.entry.name}</Text>
                </Pressable>
              </li>
            ))}
          </ul>
          )
        : (
          <Text>No hay carpetas hijas.</Text>
          )}
    </View>
  )
}
