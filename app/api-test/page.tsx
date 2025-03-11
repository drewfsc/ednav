"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiTestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [endpoint, setEndpoint] = useState("")

  const testEndpoints = [
    { name: "Get All Clients", url: "/api/clients" },
    { name: "Get Client by ID", url: "/api/clients/[id]", needsId: true },
    { name: "Get All Education Navigators", url: "/api/education-navigators" },
    { name: "Get All FEPs", url: "/api/feps" },
    { name: "Get All Questions", url: "/api/questions" },
    { name: "Get All Notes", url: "/api/notes" },
  ]

  const fetchData = async (url: string) => {
    setLoading(true)
    setEndpoint(url)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to fetch data" })
    } finally {
      setLoading(false)
    }
  }

  const handleEndpointClick = async (endpoint: { url: string; needsId?: boolean }) => {
    if (endpoint.needsId) {
      const id = prompt("Enter the client ID:")
      if (id) {
        await fetchData(endpoint.url.replace("[id]", id))
      }
    } else {
      await fetchData(endpoint.url)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Endpoints</h2>
          <div className="space-y-2">
            {testEndpoints.map((endpoint, index) => (
              <Button
                key={index}
                onClick={() => handleEndpointClick(endpoint)}
                className="w-full justify-start"
                variant="outline"
              >
                {endpoint.name}
              </Button>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
            <CardDescription>{endpoint || "Select an endpoint"}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : result ? (
              <pre className="bg-base-200 p-4 rounded-md overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>
            ) : (
              <div className="text-center text-base-content/70 h-40 flex items-center justify-center">
                No data to display
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

