import { Text, StyleSheet, View, StatusBar, Pressable } from 'react-native'
import { useState, useEffect, React } from 'react'
import { useNavigation } from '@react-navigation/native'
import { encode } from 'base-64'
export const IPV4_ADDRESS = '192.168.217.84'

export const SiteHome = () => {
  const navigation = useNavigation()

  const [sites, setSites] = useState([])

  const fetchTicket = async () => {
    const myheaders = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: 'admin', password: 'admin' })
    }

    const response = await fetch(
      `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/authentication/versions/1/tickets`,
      myheaders
    )
    console.log(response)
    const data = await response.json()
    console.log(encode(data.entry.id))

    return encode(data.entry.id)
  }

  const fetchSites = async (ticket) => {
    const myheaders = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + ticket
      }
    }

    const response = await fetch(
      `http://${IPV4_ADDRESS}:8080/alfresco/api/-default-/public/alfresco/versions/1/sites`,
      myheaders
    )
    const data = await response.json()
    console.log(data.list.entries)
    setSites(data.list.entries)
  }

  useEffect(async () => {
    const fetchData = async () => {
      const ticket = await fetchTicket()
      await fetchSites(ticket)
    }

    await fetchData()
  }, [])
  return (
    <View>

      {sites.map((value, index) => (
        <Pressable
          key={index}
          style={styles.site}
          onPress={async () => {
            const ticket = await fetchTicket()
            navigation.navigate('ChildrenComponent', {
              id: value.entry.guid,
              ticket
            })
          }}
        >
          <Text>{value.entry.title}</Text>
          <Text>{value.entry.guid}</Text>
        </Pressable>
      ))}
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  site: {
    backgroundColor: '#f3f3f3',
    border: '1px solid black',
    cursor: 'pointer'
  }
})
