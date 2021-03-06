//TODO: Make Responsive

import React, { useState } from "react"
import { navigate } from "gatsby"
import useAuth from "../hooks/useAuth"
import { Heading, TextInput, Box, Image, Button } from "grommet"
import { useStaticQuery, graphql } from "gatsby"

const Login = ({ redirect }) => {
  const { login } = useAuth()
  const [password, setPassword] = useState("admin@tattle")
  const [identifier, setIdentifier] = React.useState("admin")
  const [error, setError] = useState("")
  const logoFile = useStaticQuery(
    graphql`
      query {
        allFile(filter: { name: { eq: "project-logo" } }) {
          edges {
            node {
              publicURL
            }
          }
        }
      }
    `
  )

  const logoURL = logoFile.allFile.edges[0].node.publicURL

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const r = await login({ identifier, password })
      sessionStorage.setItem("jwt", r.jwt)
      navigate("/app/dashboard")
    } catch (e) {
      console.log("Error occurred during authentication")
      const {
        response: {
          data: {
            message: [
              {
                messages: [error],
              },
            ],
          },
        },
      } = e
      const { message: msg } = error
      setError(msg)
    }
  }

  return (
    <Box direction="row" pad="medium">
      <Box width="medium">
        <Image fit="cover" src={logoURL} />
      </Box>

      <Box width={"medium"} pad="medium" gap={"small"}>
        <Heading level={2} margin={"none"}>
          Login
        </Heading>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <Box gap={"small"}>
            <Box>
              <label htmlFor="username">Username</label>
              <TextInput
                placeholder="type here"
                value={identifier}
                onChange={event => setIdentifier(event.target.value)}
              />
            </Box>
            <Box>
              <label htmlFor="password">Password</label>
              <TextInput
                type="password"
                placeholder="type here"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Box>

            <Button
              primary
              type="submit"
              label="Sign-In"
              margin={{ top: "medium" }}
            />
          </Box>
        </form>
        {error.length > 1 && (
          <p className="text-center text-red-500 bg-red-200 border p-2">
            {error}
          </p>
        )}
      </Box>
    </Box>
  )
}

export default Login
