import React from "react"
import { Box } from "grommet"
import axios from "axios"

async function getGroups(token) {
  return axios
    .get("http://localhost:1337/whatsapp-groups/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // Handle success.
      // console.log("Data: ", response.data)
      return response.data
    })
    .catch(error => {
      // Handle error.
      console.log("An error occurred:", error.response)
    })
}

const Dashboard = () => {
  const token = sessionStorage.getItem("jwt")
  const data = getGroups(token)
  console.log(data)
  return (
    <Box pad="medium">
      <h4>WhatsApp Scraper Dashboard</h4>
      {Object.keys(data).map(group => console.log(group.name))}
    </Box>
  )
}

export default Dashboard
