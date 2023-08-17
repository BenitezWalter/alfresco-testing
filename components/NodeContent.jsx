import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as Print from 'expo-print'
import { IPV4_ADDRESS } from '../views/SiteHome'

export const NodeContent = ({ route }) => {
  const { id, ticket } = route.params
  const [pdfUrl, setPdfUrl] = useState('')

  const fetchContentNode = async (id, ticket) => {
    const myheaders = {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + ticket
      }
    }

    const response = await fetch(
      `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/${id}/content`,
      myheaders
    )
    const pdfUrl = response.url

    return pdfUrl
  }

  const fetchData = async () => {
    const pdfUrl = await fetchContentNode(id, ticket)
    console.log(pdfUrl)
    setPdfUrl(pdfUrl)
  }

  useEffect(() => {
    fetchData()
  }, [id, ticket])

  const openPdf = async () => {
    try {
      await Print.printAsync({
        uri: pdfUrl
      })
      console.log(pdfUrl)
    } catch (error) {
      console.error('Error opening PDF:', error)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openPdf} style={styles.button}>
        <Text style={styles.buttonText}>Open PDF</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
})
