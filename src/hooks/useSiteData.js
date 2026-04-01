import { useEffect, useState } from 'react'
import { API_BASE } from '../config/api'
import { fallbackAgents, fallbackProperties } from '../data/siteData'

const normalizeArray = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }
  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }
  return []
}

const normalizeProperty = (property) => ({
  ...property,
  id: String(property.id || property._id || ''),
  images: Array.isArray(property.images)
    ? property.images.filter(Boolean)
    : [],
  agentId: String(
    property.agentId || property.agent?.id || property.agent?._id || property.agent || '',
  ),
})

const normalizeAgent = (agent) => ({
  ...agent,
  id: String(agent.id || agent._id || ''),
  areas: Array.isArray(agent.areas) ? agent.areas : [],
})

export const useSiteData = () => {
  const [properties, setProperties] = useState(fallbackProperties)
  const [agents, setAgents] = useState(fallbackAgents)
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')
  const [hasLiveData, setHasLiveData] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setLoading(true)
      try {
        const [propertiesRes, agentsRes] = await Promise.all([
          fetch(`${API_BASE}/api/properties`),
          fetch(`${API_BASE}/api/agents`),
        ])

        if (!propertiesRes.ok || !agentsRes.ok) {
          throw new Error('Live data request failed')
        }

        const [propertiesJson, agentsJson] = await Promise.all([
          propertiesRes.json().catch(() => ({})),
          agentsRes.json().catch(() => ({})),
        ])

        const nextProperties = normalizeArray(propertiesJson)
          .map(normalizeProperty)
          .filter((property) => property.id)
        const nextAgents = normalizeArray(agentsJson)
          .map(normalizeAgent)
          .filter((agent) => agent.id)

        if (!nextProperties.length || !nextAgents.length) {
          throw new Error('Live data is empty')
        }

        if (!isMounted) {
          return
        }

        setProperties(nextProperties)
        setAgents(nextAgents)
        setHasLiveData(true)
        setNotice('')
      } catch {
        if (!isMounted) {
          return
        }

        setProperties(fallbackProperties)
        setAgents(fallbackAgents)
        setHasLiveData(false)
        setNotice('Live data is unavailable. Showing curated informational content.')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    properties,
    agents,
    loading,
    notice,
    hasLiveData,
  }
}
