import { useEffect, useMemo, useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5001').replace(
  /\/+$/,
  '',
)

const fallbackGallery = [
  'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
]

const initialProperties = [
  {
    id: 'p1',
    title: 'ECR Seabreeze Villa',
    location: 'East Coast Road, Chennai',
    price: 24500000,
    type: 'Villa',
    beds: 4,
    baths: 3,
    sqft: 3200,
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 12.9043,
    lng: 80.249,
    agentId: 'a1',
    tags: ['Sea view', 'Smart home', 'Private garden'],
    description:
      'Modern ECR villa with open-plan living, sea-breeze balconies, and smart-home automation.',
  },
  {
    id: 'p2',
    title: 'Adyar Riverside Apartment',
    location: 'Adyar, Chennai',
    price: 13500000,
    type: 'Apartment',
    beds: 3,
    baths: 2,
    sqft: 1650,
    status: 'Open House',
    images: [
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 13.0067,
    lng: 80.257,
    agentId: 'a2',
    tags: ['Riverside', 'Walkable', 'Gym & pool'],
    description:
      'High-floor Adyar apartment with river views, clubhouse access, and quick reach to Besant Nagar.',
  },
  {
    id: 'p3',
    title: 'Nungambakkam Heritage Home',
    location: 'Nungambakkam, Chennai',
    price: 21500000,
    type: 'Independent House',
    beds: 4,
    baths: 4,
    sqft: 2800,
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 13.0604,
    lng: 80.2496,
    agentId: 'a3',
    tags: ['Heritage charm', 'Renovated kitchen', 'Courtyard'],
    description:
      'Warm heritage home with a leafy courtyard, upgraded interiors, and easy access to schools.',
  },
  {
    id: 'p4',
    title: 'OMR Skydeck Penthouse',
    location: 'OMR, Chennai',
    price: 32000000,
    type: 'Penthouse',
    beds: 4,
    baths: 4,
    sqft: 3400,
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 12.92,
    lng: 80.226,
    agentId: 'a1',
    tags: ['Terrace deck', 'Private lift', 'Sky lounge'],
    description:
      'Signature penthouse on OMR with a private sky deck, concierge services, and panoramic views.',
  },
  {
    id: 'p5',
    title: 'Anna Nagar Garden Townhome',
    location: 'Anna Nagar, Chennai',
    price: 15500000,
    type: 'Townhome',
    beds: 3,
    baths: 3,
    sqft: 2100,
    status: 'Pending',
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 13.0843,
    lng: 80.2105,
    agentId: 'a4',
    tags: ['Tree-lined', 'Community park', 'EV-ready'],
    description:
      'Family-friendly townhome with garden frontage, EV-ready parking, and walkable retail.',
  },
  {
    id: 'p6',
    title: 'Velachery Smart Loft',
    location: 'Velachery, Chennai',
    price: 9800000,
    type: 'Loft',
    beds: 2,
    baths: 2,
    sqft: 1400,
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 12.975,
    lng: 80.218,
    agentId: 'a2',
    tags: ['Metro access', 'Coworking lounge', 'Solar backup'],
    description:
      'Tech-forward loft with smart controls, coworking amenities, and quick access to the MRTS.',
  },
  {
    id: 'p7',
    title: 'T Nagar Boutique Residence',
    location: 'T. Nagar, Chennai',
    price: 18500000,
    type: 'Apartment',
    beds: 3,
    baths: 3,
    sqft: 1900,
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 13.0418,
    lng: 80.2335,
    agentId: 'a2',
    tags: ['Retail hub', 'Metro access', 'Private balcony'],
    description:
      'Boutique residence in T. Nagar with skyline balcony views and quick access to retail corridors.',
  },
  {
    id: 'p8',
    title: 'Alwarpet Heritage Bungalow',
    location: 'Alwarpet, Chennai',
    price: 42000000,
    type: 'Independent House',
    beds: 5,
    baths: 5,
    sqft: 4200,
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 13.0338,
    lng: 80.2524,
    agentId: 'a3',
    tags: ['Heritage charm', 'Large plot', 'Lush garden'],
    description:
      'Elegant Alwarpet bungalow with a lush garden, private driveway, and classic architectural details.',
  },
  {
    id: 'p9',
    title: 'Porur Family Villa',
    location: 'Porur, Chennai',
    price: 14500000,
    type: 'Villa',
    beds: 4,
    baths: 3,
    sqft: 2500,
    status: 'Open House',
    images: [
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 13.0324,
    lng: 80.1588,
    agentId: 'a4',
    tags: ['Gated community', 'Clubhouse', 'Near IT corridor'],
    description:
      'Family-ready villa in a gated community with clubhouse amenities and easy IT corridor access.',
  },
  {
    id: 'p10',
    title: 'Sholinganallur Tech Park Apartment',
    location: 'Sholinganallur, Chennai',
    price: 11000000,
    type: 'Apartment',
    beds: 2,
    baths: 2,
    sqft: 1350,
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 12.8996,
    lng: 80.2209,
    agentId: 'a2',
    tags: ['IT corridor', 'Co-working lounge', 'Pool'],
    description:
      'Contemporary apartment near tech parks with a co-working lounge and resort-style pool.',
  },
  {
    id: 'p11',
    title: 'Mylapore Courtyard Home',
    location: 'Mylapore, Chennai',
    price: 22500000,
    type: 'Independent House',
    beds: 4,
    baths: 4,
    sqft: 3000,
    status: 'Pending',
    images: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 13.0339,
    lng: 80.2691,
    agentId: 'a3',
    tags: ['Temple district', 'Courtyard', 'Traditional design'],
    description:
      'Classic Mylapore home featuring a central courtyard, traditional design, and serene interiors.',
  },
  {
    id: 'p12',
    title: 'Tambaram Garden Duplex',
    location: 'Tambaram, Chennai',
    price: 9500000,
    type: 'Duplex',
    beds: 3,
    baths: 3,
    sqft: 2000,
    status: 'Available',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
    ],
    lat: 12.9246,
    lng: 80.1275,
    agentId: 'a4',
    tags: ['Green suburb', 'School zone', 'Solar backup'],
    description:
      'Sunny duplex in Tambaram with garden frontage, solar backup, and nearby schools.',
  },
]

const initialAgents = [
  {
    id: 'a1',
    name: 'Meera Iyer',
    role: 'ECR Luxury Advisor',
    phone: '+91 98410 22184',
    email: 'meera@maithiliestates.in',
    rating: 4.9,
    transactions: 86,
    avatar:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    bio: 'Guides premium ECR listings with private tour planning and tailored lifestyle insights.',
  },
  {
    id: 'a2',
    name: 'Arjun Raman',
    role: 'Urban Investment Specialist',
    phone: '+91 97910 60310',
    email: 'arjun@maithiliestates.in',
    rating: 4.8,
    transactions: 112,
    avatar:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    bio: 'Advises on OMR growth corridors, rental yields, and transit-connected properties.',
  },
  {
    id: 'a3',
    name: 'Kavya Menon',
    role: 'Family Home Strategist',
    phone: '+91 98405 91200',
    email: 'kavya@maithiliestates.in',
    rating: 5.0,
    transactions: 74,
    avatar:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    bio: 'Matches families with schools-first neighborhoods and long-term value homes.',
  },
  {
    id: 'a4',
    name: 'Vikram Rao',
    role: 'North Chennai Curator',
    phone: '+91 98407 33770',
    email: 'vikram@maithiliestates.in',
    rating: 4.7,
    transactions: 59,
    avatar:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    bio: 'Specializes in Anna Nagar and heritage zones with renovation-ready opportunities.',
  },
]

const priceRanges = [
  { label: 'Any budget', value: 'any' },
  { label: 'Under ₹1 Cr', value: '0-10000000' },
  { label: '₹1 Cr - ₹2 Cr', value: '10000000-20000000' },
  { label: '₹2 Cr - ₹3.5 Cr', value: '20000000-35000000' },
  { label: '₹3.5 Cr+', value: '35000000-100000000' },
]

const sortOptions = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Largest Size', value: 'size-desc' },
]

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

const getGalleryImages = (images = []) => {
  const combined = [...images, ...fallbackGallery]
  const unique = Array.from(new Set(combined))
  return unique.slice(0, 3)
}

const defaultMapCenter = { lat: 13.0827, lng: 80.2707 }

const getMapSrc = (lat = defaultMapCenter.lat, lng = defaultMapCenter.lng) => {
  const delta = 0.05
  const left = (lng - delta).toFixed(4)
  const right = (lng + delta).toFixed(4)
  const bottom = (lat - delta).toFixed(4)
  const top = (lat + delta).toFixed(4)
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${lat}%2C${lng}`
}

function App() {
  const [properties, setProperties] = useState(initialProperties)
  const [agents, setAgents] = useState(initialAgents)
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [notices, setNotices] = useState({
    inquiry: '',
    appointment: '',
    message: '',
    login: '',
    register: '',
  })
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem('maithili_auth')
    if (!stored) return { user: null, token: '' }
    try {
      return JSON.parse(stored)
    } catch (error) {
      return { user: null, token: '' }
    }
  })
  const [adminMetrics, setAdminMetrics] = useState(null)
  const [agentProfile, setAgentProfile] = useState(null)
  const [inquiries, setInquiries] = useState([])
  const [appointments, setAppointments] = useState([])
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [userNotice, setUserNotice] = useState('')
  const [propertyNotice, setPropertyNotice] = useState('')
  const [editingProperty, setEditingProperty] = useState(null)
  const [propertyFormKey, setPropertyFormKey] = useState('new')
  const [filters, setFilters] = useState({
    search: '',
    location: 'All locations',
    type: 'All types',
    beds: 'Any',
    price: 'any',
    sort: 'recommended',
  })
  const [compareIds, setCompareIds] = useState([])
  const [activeId, setActiveId] = useState(initialProperties[0].id)
  const [inquiryPropertyId, setInquiryPropertyId] = useState(
    initialProperties[0].id,
  )

  const isAuthenticated = Boolean(auth?.token)
  const role = auth?.user?.role
  const isAdmin = role === 'admin'
  const isAgent = role === 'agent'

  const getAgent = (agentId) =>
    agents.find(
      (agent) => agent.id === agentId || agent._id === agentId,
    )

  const normalizeArray = (payload) => {
    if (Array.isArray(payload)) return payload
    if (payload && Array.isArray(payload.data)) return payload.data
    return []
  }

  const authFetch = async (path, options = {}) => {
    if (!auth?.token) {
      throw new Error('Please sign in to continue.')
    }
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${auth.token}`,
    }
    return fetch(`${API_BASE}${path}`, { ...options, headers })
  }

  const postJson = async (path, payload) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      const message = data?.error || 'Request failed'
      throw new Error(message)
    }
    return data
  }

  const postJsonAuth = async (path, payload) => {
    const response = await authFetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      const message = data?.error || 'Request failed'
      throw new Error(message)
    }
    return data
  }

  useEffect(() => {
    let isMounted = true
    const loadData = async () => {
      setLoading(true)
      setLoadError('')
      try {
        const [propertiesRes, agentsRes] = await Promise.all([
          fetch(`${API_BASE}/api/properties`),
          fetch(`${API_BASE}/api/agents`),
        ])
        if (!propertiesRes.ok || !agentsRes.ok) {
          throw new Error('Backend unavailable')
        }
        const propertiesJson = await propertiesRes.json().catch(() => ({}))
        const agentsJson = await agentsRes.json().catch(() => ({}))
        if (!isMounted) return
        const nextProperties = normalizeArray(propertiesJson)
        const nextAgents = normalizeArray(agentsJson)
        if (Array.isArray(nextProperties)) setProperties(nextProperties)
        if (Array.isArray(nextAgents)) setAgents(nextAgents)
      } catch (error) {
        if (isMounted) {
          setLoadError('Unable to reach the backend. Showing cached listings.')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!properties.length) return
    if (!properties.find((property) => property.id === activeId)) {
      setActiveId(properties[0].id)
    }
    if (!properties.find((property) => property.id === inquiryPropertyId)) {
      setInquiryPropertyId(properties[0].id)
    }
  }, [properties, activeId, inquiryPropertyId])

  const setNotice = (key, message) => {
    setNotices((prev) => ({ ...prev, [key]: message }))
  }

  const resetForm = (form) => {
    if (form && typeof form.reset === 'function') {
      form.reset()
    }
  }

  useEffect(() => {
    if (auth?.token) {
      localStorage.setItem('maithili_auth', JSON.stringify(auth))
    } else {
      localStorage.removeItem('maithili_auth')
    }
  }, [auth])

  useEffect(() => {
    if (!auth?.token) {
      setAdminMetrics(null)
      setAgentProfile(null)
      setInquiries([])
      setAppointments([])
      setMessages([])
      setUsers([])
      return
    }

    let isMounted = true
    const loadSecureData = async () => {
      try {
        if (isAdmin) {
          const [metricsRes, usersRes] = await Promise.all([
            authFetch('/api/admin/metrics'),
            authFetch('/api/users'),
          ])
          const metricsJson = await metricsRes.json().catch(() => ({}))
          const usersJson = await usersRes.json().catch(() => ({}))
          if (metricsRes.ok && isMounted) {
            setAdminMetrics(metricsJson.data)
          }
          if (usersRes.ok && isMounted) {
            setUsers(normalizeArray(usersJson))
          }
        }

        if (isAgent) {
          const agentRes = await authFetch('/api/agents/me')
          const agentJson = await agentRes.json().catch(() => ({}))
          if (agentRes.ok && isMounted) {
            setAgentProfile(agentJson.data)
          }
        } else {
          setAgentProfile(null)
        }

        if (isAdmin || isAgent) {
          const [inqRes, appRes, msgRes] = await Promise.all([
            authFetch('/api/inquiries'),
            authFetch('/api/appointments'),
            authFetch('/api/messages'),
          ])
          const [inqJson, appJson, msgJson] = await Promise.all([
            inqRes.json().catch(() => ({})),
            appRes.json().catch(() => ({})),
            msgRes.json().catch(() => ({})),
          ])
          if (isMounted) {
            if (inqRes.ok) setInquiries(normalizeArray(inqJson))
            if (appRes.ok) setAppointments(normalizeArray(appJson))
            if (msgRes.ok) setMessages(normalizeArray(msgJson))
          }
        }
      } catch (error) {
        if (isMounted) {
          setPropertyNotice(error.message)
        }
      }
    }

    loadSecureData()
    return () => {
      isMounted = false
    }
  }, [auth?.token, isAdmin, isAgent])

  const handleInquirySubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    try {
      await postJson('/api/inquiries', payload)
      setNotice('inquiry', 'Inquiry sent. An agent will respond shortly.')
      resetForm(form)
    } catch (error) {
      setNotice('inquiry', error.message)
    }
  }

  const handleAppointmentSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    try {
      await postJson('/api/appointments', payload)
      setNotice(
        'appointment',
        'Appointment requested. We will confirm by email.',
      )
      resetForm(form)
    } catch (error) {
      setNotice('appointment', error.message)
    }
  }

  const handleMessageSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    try {
      await postJson('/api/messages', payload)
      setNotice('message', 'Message delivered to the agent.')
      resetForm(form)
    } catch (error) {
      setNotice('message', error.message)
    }
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    try {
      const response = await postJson('/api/auth/login', payload)
      const user = response?.data?.user
      const token = response?.data?.token
      if (token) {
        setAuth({ user, token })
      }
      setNotice('login', 'Signed in. Welcome back.')
      resetForm(form)
    } catch (error) {
      setNotice('login', error.message)
    }
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    try {
      const response = await postJson('/api/auth/register', payload)
      const user = response?.data?.user
      const token = response?.data?.token
      if (token) {
        setAuth({ user, token })
        setNotice('register', 'Account created. You are now signed in.')
      } else {
        setNotice('register', 'Account created. Please sign in.')
      }
      resetForm(form)
    } catch (error) {
      setNotice('register', error.message)
    }
  }

  const handleSignOut = () => {
    setAuth({ user: null, token: '' })
    setNotice('login', 'Signed out.')
    setPropertyNotice('')
    setEditingProperty(null)
    setPropertyFormKey('new')
  }

  const handlePropertyCreate = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (isAgent && !agentProfile) {
      setPropertyNotice('Agent profile not loaded yet.')
      return
    }
    const formData = new FormData(event.currentTarget)
    const raw = Object.fromEntries(formData.entries())

    const payload = {
      title: raw.title,
      location: raw.location,
      price: Number(raw.price),
      type: raw.type,
      beds: Number(raw.beds),
      baths: Number(raw.baths),
      sqft: Number(raw.sqft),
      status: raw.status,
      description: raw.description,
      lat: raw.lat ? Number(raw.lat) : undefined,
      lng: raw.lng ? Number(raw.lng) : undefined,
      agentId: raw.agentId,
      images: raw.images
        ? raw.images.split(',').map((item) => item.trim()).filter(Boolean)
        : [],
      tags: raw.tags
        ? raw.tags.split(',').map((item) => item.trim()).filter(Boolean)
        : [],
    }

    try {
      let response
      if (editingProperty) {
        response = await authFetch(`/api/properties/${editingProperty.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const json = await response.json().catch(() => ({}))
        if (!response.ok) {
          throw new Error(json?.error || 'Update failed')
        }
        const updated = json?.data
        if (updated) {
          setProperties((prev) =>
            prev.map((item) => (item.id === updated.id ? updated : item)),
          )
        }
        setPropertyNotice('Listing updated.')
        setEditingProperty(null)
        setPropertyFormKey('new')
        resetForm(form)
      } else {
        response = await postJsonAuth('/api/properties', payload)
        const newProperty = response?.data
        if (newProperty) {
          setProperties((prev) => [newProperty, ...prev])
        }
        setPropertyNotice('Property added to listings.')
        resetForm(form)
      }
    } catch (error) {
      setPropertyNotice(error.message)
    }
  }

  const handlePropertyEdit = (property) => {
    setEditingProperty(property)
    setPropertyNotice(`Editing ${property.title}`)
    setPropertyFormKey(String(property.id))
    setTimeout(() => {
      const target = document.getElementById('property-form')
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  const handlePropertyDelete = async (propertyId) => {
    if (!window.confirm('Delete this listing?')) return
    try {
      const response = await authFetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      })
      const json = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(json?.error || 'Delete failed')
      }
      setProperties((prev) => prev.filter((item) => item.id !== propertyId))
      setPropertyNotice('Listing removed.')
    } catch (error) {
      setPropertyNotice(error.message)
    }
  }

  const handleCancelEdit = () => {
    setEditingProperty(null)
    setPropertyNotice('')
    setPropertyFormKey('new')
  }

  const handleUserRoleUpdate = async (userId, nextRole) => {
    try {
      const response = await authFetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: nextRole }),
      })
      const json = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(json?.error || 'Update failed')
      }
      const updated = json?.data
      if (updated) {
        setUsers((prev) =>
          prev.map((user) => (user.id === updated.id ? updated : user)),
        )
      }
      setUserNotice('User role updated.')
    } catch (error) {
      setUserNotice(error.message)
    }
  }

  const handleUserDelete = async (userId) => {
    if (!window.confirm('Remove this user?')) return
    try {
      const response = await authFetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })
      const json = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(json?.error || 'Delete failed')
      }
      setUsers((prev) => prev.filter((user) => user.id !== userId))
      setUserNotice('User removed.')
    } catch (error) {
      setUserNotice(error.message)
    }
  }

  const locations = useMemo(() => {
    const unique = Array.from(new Set(properties.map((item) => item.location)))
    return ['All locations', ...unique]
  }, [properties])

  const types = useMemo(() => {
    const unique = Array.from(new Set(properties.map((item) => item.type)))
    return ['All types', ...unique]
  }, [properties])

  const filteredProperties = useMemo(() => {
    const matchesSearch = (property) =>
      property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      property.location.toLowerCase().includes(filters.search.toLowerCase())

    const matchesPrice = (property) => {
      if (filters.price === 'any') return true
      const [min, max] = filters.price.split('-').map(Number)
      return property.price >= min && property.price <= max
    }

    const matchesBeds = (property) => {
      if (filters.beds === 'Any') return true
      if (filters.beds === '4+') return property.beds >= 4
      return property.beds === Number(filters.beds)
    }

    const results = properties
      .filter((property) =>
        [
          matchesSearch(property),
          filters.location === 'All locations' ||
            property.location === filters.location,
          filters.type === 'All types' || property.type === filters.type,
          matchesBeds(property),
          matchesPrice(property),
        ].every(Boolean),
      )
      .sort((a, b) => {
        if (filters.sort === 'price-asc') return a.price - b.price
        if (filters.sort === 'price-desc') return b.price - a.price
        if (filters.sort === 'size-desc') return b.sqft - a.sqft
        return String(a.id).localeCompare(String(b.id))
      })

    return results
  }, [filters, properties])

  const compareList = properties.filter((property) =>
    compareIds.includes(property.id),
  )

  const activeProperty = properties.find((property) => property.id === activeId)
  const heroProperty = properties[0] || initialProperties[0]
  const agentId =
    agentProfile?.id || agentProfile?._id || auth?.user?.agentId
  const agentProperties = agentId
    ? properties.filter((property) => {
        const propertyAgent =
          property.agentId || property.agent?.id || property.agent
        return String(propertyAgent) === String(agentId)
      })
    : []
  const leadCount = inquiries.length
  const tourCount = appointments.length
  const recentInquiries = inquiries.slice(0, 3)
  const recentAppointments = appointments.slice(0, 3)
  const recentMessages = messages.slice(0, 3)
  const mapLat = activeProperty?.lat ?? defaultMapCenter.lat
  const mapLng = activeProperty?.lng ?? defaultMapCenter.lng
  const mapSrc = getMapSrc(mapLat, mapLng)

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }

  return (
    <div className="app min-h-screen bg-sand">
      <div className="hero-shell relative overflow-hidden">
        <div className="hero-blob hero-blob--teal pointer-events-none absolute left-0 top-0 h-[520px] w-[520px] -translate-x-1/3 -translate-y-1/3 animate-float-slow rounded-full bg-[radial-gradient(circle,#0f766e33_0%,transparent_65%)]" />
        <div className="hero-blob hero-blob--sun pointer-events-none absolute right-0 top-0 h-[560px] w-[560px] translate-x-1/3 -translate-y-1/4 animate-float-slow rounded-full bg-[radial-gradient(circle,#d9770640_0%,transparent_65%)]" />

        <header className="site-header container relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-10 pt-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-sand">
              ME
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-ink/60">
                Maithili Estates
              </p>
              <p className="text-sm text-ink/70">
                Chennai luxury & lifestyle realty
              </p>
            </div>
          </div>
          <nav className="site-nav hidden items-center gap-6 text-sm font-semibold text-ink/70 md:flex">
            <a className="hover:text-ink" href="#listings">
              Listings
            </a>
            <a className="hover:text-ink" href="#map">
              Map
            </a>
            <a className="hover:text-ink" href="#agents">
              Agents
            </a>
            <a className="hover:text-ink" href="#compare">
              Compare
            </a>
            <a className="hover:text-ink" href="#dashboards">
              Dashboards
            </a>
          </nav>
          <div className="header-actions flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <span className="pill">
                  {auth.user?.name || 'Account'} · {role || 'user'}
                </span>
                <button className="btn-outline" onClick={handleSignOut}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <a className="btn-ghost" href="#access">
                  Sign in
                </a>
                <a className="btn-primary" href="#access">
                  Create account
                </a>
              </>
            )}
          </div>
        </header>

        <section className="hero container hero-grid relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 pb-20 pt-2 lg:grid-cols-[1.1fr_0.9fr] animate-fade-up">
          <div className="hero-content space-y-8">
            <div className="hero-badge inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink/70">
              <span className="h-2 w-2 rounded-full bg-ocean" />
              Verified Chennai listings
            </div>
            <div className="space-y-5">
              <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Find homes across Chennai that fit the way you want to live.
              </h1>
              <p className="max-w-xl text-lg text-ink/70">
                Search curated homes, compare neighborhoods, and schedule
                viewings with agents who know Chennai inside out.
              </p>
            </div>
            <div className="hero-filters grid gap-4 sm:grid-cols-[1.4fr_1fr_1fr]">
              <label className="card flex flex-col gap-3">
                <span className="label">Quick search</span>
                <input
                  className="input"
                  placeholder="Locality, landmark, or RERA"
                  value={filters.search}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      search: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="card flex flex-col gap-3">
                <span className="label">Property type</span>
                <select
                  className="input"
                  value={filters.type}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      type: event.target.value,
                    }))
                  }
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className="card flex flex-col gap-3">
                <span className="label">Budget</span>
                <select
                  className="input"
                  value={filters.price}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      price: event.target.value,
                    }))
                  }
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="hero-actions flex flex-wrap items-center gap-3">
              <button className="btn-primary">Start matching</button>
              <button className="btn-outline">Request a Chennai tour</button>
              <span className="pill">Local concierge</span>
            </div>
            <div className="stats-grid grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Active Chennai listings', value: '680+' },
                { label: 'Avg. time on market', value: '24 days' },
                { label: 'Client satisfaction', value: '97%' },
              ].map((stat) => (
                <div key={stat.label} className="card">
                  <p className="text-sm text-ink/60">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-card relative">
            <div className="absolute -right-6 top-6 h-40 w-40 rounded-full bg-[radial-gradient(circle,#0f766e22_0%,transparent_70%)]" />
            <div className="absolute -bottom-10 left-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,#d9770630_0%,transparent_70%)]" />
            <div className="glass relative overflow-hidden p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="label">Featured listing</p>
                  <p className="text-lg font-semibold">{heroProperty.title}</p>
                  <p className="text-sm text-ink/60">
                    {heroProperty.location}
                  </p>
                </div>
                <span className="pill">{heroProperty.status}</span>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl">
                <img
                  className="h-64 w-full object-cover"
                  src={heroImg}
                  alt="Stylish real estate interior"
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-ink/70">
                <div>
                  <p className="font-semibold text-ink">
                    {formatCurrency(heroProperty.price)}
                  </p>
                  <p>Asking price</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">{heroProperty.beds}</p>
                  <p>Bedrooms</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">{heroProperty.sqft}</p>
                  <p>Sq. Ft.</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {(heroProperty.tags || []).map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <main className="main container mx-auto w-full max-w-6xl space-y-24 px-6 pb-24">
        {(loading || loadError) && (
          <div className="status-banner card">
            <p className="text-sm text-ink/70">
              {loading
                ? 'Loading live listings from the backend...'
                : loadError}
            </p>
          </div>
        )}
        <section id="listings" className="section space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="section-title">Property listings</h2>
              <p className="section-sub">
                Browse verified Chennai properties with full details, media,
                and neighborhood insights.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 text-sm text-ink/70">
                Sort by
                <select
                  className="input w-auto"
                  value={filters.sort}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      sort: event.target.value,
                    }))
                  }
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm text-ink/70">
                Bedrooms
                <select
                  className="input w-auto"
                  value={filters.beds}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      beds: event.target.value,
                    }))
                  }
                >
                  {['Any', '1', '2', '3', '4+'].map((beds) => (
                    <option key={beds} value={beds}>
                      {beds}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm text-ink/70">
                Location
                <select
                  className="input w-auto"
                  value={filters.location}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      location: event.target.value,
                    }))
                  }
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="listing-layout grid gap-8 lg:grid-cols-[1.7fr_1fr]">
            <div className="listing-main space-y-6">
              {filteredProperties.map((property) => {
                const agent = getAgent(
                  property.agentId || property.agent?.id || property.agent,
                )
                return (
                  <article
                    key={property.id}
                    className={`property-card card transition hover:-translate-y-1 hover:shadow-lift ${
                      property.id === activeId
                        ? 'border-ink/20 shadow-lift'
                        : ''
                    }`}
                    onMouseEnter={() => setActiveId(property.id)}
                  >
                    <div className="property-grid grid gap-6 md:grid-cols-[1.1fr_1fr]">
                      <div className="overflow-hidden rounded-2xl">
                        <img
                          className="h-52 w-full object-cover"
                          src={property.images?.[0] || heroImg}
                          alt={property.title}
                        />
                      </div>
                      <div className="property-thumbs">
                        {getGalleryImages(property.images).map((image, index) => (
                          <img
                            key={`${property.id}-thumb-${index}`}
                            className="property-thumb"
                            src={image}
                            alt={`${property.title} view ${index + 1}`}
                          />
                        ))}
                      </div>
                      <div className="property-details space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xl font-semibold">
                              {property.title}
                            </p>
                            <p className="text-sm text-ink/60">
                              {property.location}
                            </p>
                          </div>
                          <span className="pill">{property.status}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-ink/70">
                          <span className="rounded-full bg-ink/5 px-3 py-1">
                            {property.type}
                          </span>
                          <span className="rounded-full bg-ink/5 px-3 py-1">
                            {property.beds} bd | {property.baths} ba
                          </span>
                          <span className="rounded-full bg-ink/5 px-3 py-1">
                            {property.sqft} sqft
                          </span>
                        </div>
                        <p className="text-lg font-semibold">
                          {formatCurrency(property.price)}
                        </p>
                        {property.description && (
                          <p className="text-sm text-ink/60">
                            {property.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {(property.tags || []).map((tag) => (
                            <span key={tag} className="pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <button className="btn-primary">View details</button>
                          <button className="btn-outline">Contact agent</button>
                          <label className="flex items-center gap-2 text-sm text-ink/60">
                            <input
                              type="checkbox"
                              checked={compareIds.includes(property.id)}
                              onChange={() => toggleCompare(property.id)}
                            />
                            Compare
                          </label>
                        </div>
                        <div className="flex items-center gap-3 border-t border-ink/10 pt-4 text-sm text-ink/60">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={agent?.avatar}
                            alt={agent?.name}
                          />
                          <div>
                            <p className="font-semibold text-ink">
                              {agent?.name}
                            </p>
                            <p>{agent?.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <aside id="map" className="listing-sidebar space-y-6">
              <div className="map-card card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="label">Interactive map</p>
                    <p className="text-lg font-semibold">Chennai location view</p>
                    <p className="text-xs text-ink/60">
                      Pin: {activeProperty?.title || 'Chennai center'}
                    </p>
                  </div>
                  <span className="pill">Chennai map</span>
                </div>
                <div className="overflow-hidden rounded-2xl border border-ink/10">
                  <iframe
                    title="Property map"
                    className="h-64 w-full"
                    src={mapSrc}
                  />
                </div>
                <div className="map-list space-y-3">
                  {filteredProperties.map((property) => (
                    <button
                      key={property.id}
                      className={`map-item flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        property.id === activeId
                          ? 'border-ink/20 bg-ink/5'
                          : 'border-ink/10 bg-white/60'
                      }`}
                      onClick={() => setActiveId(property.id)}
                    >
                      <div>
                        <p className="font-semibold text-ink">
                          {property.title}
                        </p>
                        <p className="text-xs text-ink/60">
                          {property.location}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-ink/60">
                        {formatCurrency(property.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="inquiry-card card space-y-4">
                <div>
                  <p className="label">Property inquiry</p>
                  <p className="text-lg font-semibold">Request information</p>
                </div>
                <form className="space-y-3" onSubmit={handleInquirySubmit}>
                  <select
                    className="input"
                    name="propertyId"
                    value={inquiryPropertyId}
                    onChange={(event) => setInquiryPropertyId(event.target.value)}
                  >
                    {properties.map((property) => (
                      <option key={property.id} value={property.id}>
                        {property.title}
                      </option>
                    ))}
                  </select>
                  <input
                    className="input"
                    name="name"
                    placeholder="Your full name"
                    required
                  />
                  <input
                    className="input"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    required
                  />
                  <input
                    className="input"
                    name="phone"
                    placeholder="Phone (optional)"
                  />
                  <textarea
                    className="input min-h-[120px]"
                    name="message"
                    placeholder="Tell us what you are looking for"
                    required
                  />
                  <button className="btn-primary w-full" type="submit">
                    Send inquiry
                  </button>
                </form>
                {notices.inquiry && (
                  <p className="text-sm text-ink/60">{notices.inquiry}</p>
                )}
              </div>
            </aside>
          </div>
        </section>
        <section id="compare" className="section space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="section-title">Property comparison</h2>
              <p className="section-sub">
                Select up to three listings and compare key metrics side-by-side.
              </p>
            </div>
            <button
              className="btn-outline"
              onClick={() => setCompareIds([])}
              type="button"
            >
              Clear selection
            </button>
          </div>

          <div className="compare-layout grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="compare-card card space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {compareList.length === 0 && (
                  <div className="col-span-full rounded-2xl border border-dashed border-ink/20 p-6 text-center text-sm text-ink/60">
                    Select listings to populate the comparison table.
                  </div>
                )}
                {compareList.map((property) => (
                  <div key={property.id} className="rounded-2xl bg-ink/5 p-4">
                    <p className="text-sm font-semibold text-ink">
                      {property.title}
                    </p>
                    <p className="text-xs text-ink/60">{property.location}</p>
                    <p className="mt-2 text-lg font-semibold">
                      {formatCurrency(property.price)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="overflow-hidden rounded-2xl border border-ink/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-ink/5 text-xs uppercase text-ink/60">
                    <tr>
                      <th className="px-4 py-3">Metric</th>
                      {compareList.map((property) => (
                        <th key={property.id} className="px-4 py-3">
                          {property.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {[
                      {
                        label: 'Price',
                        value: (p) => formatCurrency(p.price),
                      },
                      { label: 'Type', value: (p) => p.type },
                      { label: 'Bedrooms', value: (p) => p.beds },
                      { label: 'Bathrooms', value: (p) => p.baths },
                      { label: 'Sq. Ft.', value: (p) => p.sqft },
                      { label: 'Status', value: (p) => p.status },
                    ].map((row) => (
                      <tr key={row.label}>
                        <td className="px-4 py-3 font-semibold text-ink">
                          {row.label}
                        </td>
                        {compareList.map((property) => (
                          <td key={property.id} className="px-4 py-3">
                            {row.value(property)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="compare-insights card space-y-5">
              <div>
                <p className="label">Comparison insights</p>
                <p className="text-lg font-semibold">What stands out</p>
              </div>
              <div className="space-y-4 text-sm text-ink/70">
                <p>
                  {activeProperty?.title} is currently highlighted on the map
                  with {activeProperty?.beds} bedrooms and a{' '}
                  {activeProperty?.sqft} sqft layout.
                </p>
                <p>
                  Use comparison to weigh commute times, pricing, and amenities
                  before you schedule viewings.
                </p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                <p className="text-sm font-semibold text-ink">Market insight</p>
                <p className="text-sm text-ink/60">
                  Chennai premium inventory is moving fast this quarter. Secure
                  a private tour to access off-market listings.
                </p>
              </div>
              <button className="btn-primary">Generate PDF comparison</button>
            </div>
          </div>
        </section>
        <section id="agents" className="section space-y-10">
          <div>
            <h2 className="section-title">Meet the agents</h2>
            <p className="section-sub">
              Chennai specialists with neighborhood knowledge and high-touch
              service.
            </p>
          </div>
          <div className="agent-grid grid gap-6 md:grid-cols-2">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="agent-card card grid gap-6 md:grid-cols-[1fr_1.2fr]"
              >
                <img
                  className="h-40 w-full rounded-2xl object-cover md:h-full"
                  src={agent.avatar}
                  alt={agent.name}
                />
                <div className="space-y-3">
                  <div>
                    <p className="text-xl font-semibold">{agent.name}</p>
                    <p className="text-sm text-ink/60">{agent.role}</p>
                  </div>
                  <p className="text-sm text-ink/70">{agent.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-ink/70">
                    <span>Rating {agent.rating}</span>
                    <span>{agent.transactions} closed deals</span>
                  </div>
                  <div className="space-y-1 text-sm text-ink/70">
                    <p>{agent.phone}</p>
                    <p>{agent.email}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-primary">View profile</button>
                    <button className="btn-outline">Message agent</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="form-layout section grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form className="card space-y-6" onSubmit={handleAppointmentSubmit}>
            <div>
              <p className="label">Schedule a viewing</p>
              <p className="text-lg font-semibold">
                Book an in-person or virtual tour
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className="input"
                name="name"
                placeholder="Full name"
                required
              />
              <input
                className="input"
                name="email"
                type="email"
                placeholder="Email address"
                required
              />
              <input
                className="input"
                name="phone"
                placeholder="Phone (optional)"
              />
              <select className="input" name="propertyId" required>
                {properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.title}
                  </option>
                ))}
              </select>
              <select className="input" name="tourType" required>
                <option>In-person tour</option>
                <option>Video tour</option>
                <option>Neighborhood walk-through</option>
              </select>
              <input className="input" name="date" type="date" required />
              <input className="input" name="time" type="time" required />
              <textarea
                className="input min-h-[120px] sm:col-span-2"
                name="notes"
                placeholder="Tell us about your preferred dates and requirements"
              />
            </div>
            <button className="btn-primary w-full" type="submit">
              Confirm appointment
            </button>
            {notices.appointment && (
              <p className="text-sm text-ink/60">{notices.appointment}</p>
            )}
          </form>

          <div className="card space-y-6">
            <div>
              <p className="label">Communication preferences</p>
              <p className="text-lg font-semibold">Stay in the loop</p>
            </div>
            <div className="space-y-4 text-sm text-ink/70">
              {[
                {
                  title: 'Email notifications',
                  description:
                    'New Chennai listings, price changes, and tour reminders.',
                },
                {
                  title: 'SMS appointment alerts',
                  description: 'Instant reminders and access instructions.',
                },
                {
                  title: 'Weekly market briefing',
                  description:
                    'Chennai neighborhood trends and valuation insights.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-ink/10 bg-white/70 p-4"
                >
                  <div>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                  <button className="btn-outline">Enable</button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="dashboards" className="section space-y-10">
          <div>
            <h2 className="section-title">Agent & admin dashboards</h2>
            <p className="section-sub">
              Manage Chennai listings, leads, communications, and performance
              reporting.
            </p>
          </div>

          {!isAuthenticated && (
            <div className="card">
              <p className="text-sm text-ink/60">
                Sign in as an agent or admin to manage listings, leads, and
                reporting.
              </p>
            </div>
          )}

          <div className="dashboard-grid grid gap-8 lg:grid-cols-2">
            <div className="dashboard-card card space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="label">Agent workspace</p>
                  <p className="text-lg font-semibold">Listing management</p>
                </div>
                {(isAgent || isAdmin) && (
                  <a className="btn-primary" href="#property-form">
                    Add new property
                  </a>
                )}
              </div>

              {isAgent && agentProfile && (
                <div className="rounded-2xl border border-ink/10 bg-white/70 p-4 text-sm">
                  <p className="font-semibold text-ink">{agentProfile.name}</p>
                  <p className="text-ink/60">{agentProfile.role}</p>
                  <p className="text-ink/60">{agentProfile.email}</p>
                </div>
              )}

              {isAgent && !agentProfile && (
                <p className="text-sm text-ink/60">
                  Loading your agent profile...
                </p>
              )}

              {!isAgent && !isAdmin && (
                <p className="text-sm text-ink/60">
                  Sign in as an agent to add and manage Chennai listings.
                </p>
              )}

              {(isAgent || isAdmin) && (
                <form
                  id="property-form"
                  className="space-y-3"
                  onSubmit={handlePropertyCreate}
                  key={propertyFormKey}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      className="input"
                      name="title"
                      placeholder="Property title"
                      defaultValue={editingProperty?.title || ''}
                      required
                    />
                    <input
                      className="input"
                      name="location"
                      placeholder="Location"
                      defaultValue={editingProperty?.location || ''}
                      required
                    />
                    <input
                      className="input"
                      name="price"
                      type="number"
                      min="0"
                      placeholder="Price (INR)"
                      defaultValue={editingProperty?.price || ''}
                      required
                    />
                    <input
                      className="input"
                      name="type"
                      placeholder="Type (Apartment, Villa)"
                      defaultValue={editingProperty?.type || ''}
                      required
                    />
                    <input
                      className="input"
                      name="beds"
                      type="number"
                      min="0"
                      placeholder="Bedrooms"
                      defaultValue={editingProperty?.beds || ''}
                      required
                    />
                    <input
                      className="input"
                      name="baths"
                      type="number"
                      min="0"
                      placeholder="Bathrooms"
                      defaultValue={editingProperty?.baths || ''}
                      required
                    />
                    <input
                      className="input"
                      name="sqft"
                      type="number"
                      min="0"
                      placeholder="Sq. ft."
                      defaultValue={editingProperty?.sqft || ''}
                      required
                    />
                    <select
                      className="input"
                      name="status"
                      defaultValue={editingProperty?.status || 'Available'}
                      required
                    >
                      <option value="Available">Available</option>
                      <option value="Open House">Open House</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <input
                      className="input sm:col-span-2"
                      name="images"
                      placeholder="Image URLs (comma separated)"
                      defaultValue={
                        editingProperty?.images?.length
                          ? editingProperty.images.join(', ')
                          : ''
                      }
                    />
                    <input
                      className="input sm:col-span-2"
                      name="tags"
                      placeholder="Tags (comma separated)"
                      defaultValue={
                        editingProperty?.tags?.length
                          ? editingProperty.tags.join(', ')
                          : ''
                      }
                    />
                    <input
                      className="input"
                      name="lat"
                      placeholder="Latitude"
                      defaultValue={editingProperty?.lat || ''}
                    />
                    <input
                      className="input"
                      name="lng"
                      placeholder="Longitude"
                      defaultValue={editingProperty?.lng || ''}
                    />
                  </div>
                  <textarea
                    className="input min-h-[120px]"
                    name="description"
                    placeholder="Short description"
                    defaultValue={editingProperty?.description || ''}
                  />
                  {isAdmin ? (
                    <select
                      className="input"
                      name="agentId"
                      defaultValue={
                        editingProperty?.agentId ||
                        editingProperty?.agent?.id ||
                        editingProperty?.agent ||
                        ''
                      }
                      required
                    >
                      <option value="">Assign agent</option>
                      {agents.map((agent) => {
                        const agentValue = agent.id || agent._id
                        return (
                          <option key={agentValue} value={agentValue}>
                            {agent.name}
                          </option>
                        )
                      })}
                    </select>
                  ) : (
                    <input
                      type="hidden"
                      name="agentId"
                      defaultValue={agentProfile?.id || ''}
                    />
                  )}
                  <div className="form-actions">
                    <button className="btn-primary w-full" type="submit">
                      {editingProperty ? 'Update listing' : 'Save listing'}
                    </button>
                    {editingProperty && (
                      <button
                        className="btn-outline w-full"
                        type="button"
                        onClick={handleCancelEdit}
                      >
                        Cancel edit
                      </button>
                    )}
                  </div>
                  {propertyNotice && (
                    <p className="text-sm text-ink/60">{propertyNotice}</p>
                  )}
                </form>
              )}

              <div className="space-y-3">
                {(isAgent ? agentProperties : properties).slice(0, 4).map(
                  (property) => (
                    <div
                      key={property.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white/70 p-4 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-ink">
                          {property.title}
                        </p>
                        <p className="text-ink/60">{property.location}</p>
                      </div>
                      <div className="flex items-center gap-3 text-ink/60">
                        <span>{property.status}</span>
                        <span>{formatCurrency(property.price)}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="btn-outline"
                          type="button"
                          onClick={() => handlePropertyEdit(property)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-outline"
                          type="button"
                          onClick={() => handlePropertyDelete(property.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: 'New leads',
                    value: isAuthenticated ? leadCount : '18',
                  },
                  {
                    label: 'Upcoming tours',
                    value: isAuthenticated ? tourCount : '6',
                  },
                  {
                    label: 'Active listings',
                    value: isAuthenticated
                      ? isAgent
                        ? agentProperties.length
                        : properties.length
                      : '24',
                  },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-ink/5 p-4">
                    <p className="text-xs uppercase text-ink/50">
                      {metric.label}
                    </p>
                    <p className="text-xl font-semibold text-ink">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card card space-y-6">
              <div>
                <p className="label">Admin console</p>
                <p className="text-lg font-semibold">Operations overview</p>
              </div>
              {!isAdmin && (
                <p className="text-sm text-ink/60">
                  Sign in as an admin to access operational analytics.
                </p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: 'Total listings',
                    value: adminMetrics?.properties ?? properties.length,
                  },
                  {
                    label: 'Active agents',
                    value: adminMetrics?.agents ?? agents.length,
                  },
                  {
                    label: 'Open inquiries',
                    value: adminMetrics?.inquiries ?? inquiries.length,
                  },
                  {
                    label: 'Appointments logged',
                    value: adminMetrics?.appointments ?? appointments.length,
                  },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-2xl bg-ink/5 p-4">
                    <p className="text-xs uppercase text-ink/50">
                      {metric.label}
                    </p>
                    <p className="text-xl font-semibold text-ink">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  'Monthly listing performance report',
                  'Agent activity heatmap',
                  'Lead source attribution summary',
                ].map((report) => (
                  <div
                    key={report}
                    className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm"
                  >
                    <p className="font-semibold text-ink">{report}</p>
                    <button className="btn-outline" type="button">
                      Generate
                    </button>
                  </div>
                ))}
              </div>
              {(isAdmin || isAgent) && (
                <div className="space-y-3 text-sm">
                  <div className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                    <p className="font-semibold text-ink">Recent inquiries</p>
                    {recentInquiries.length === 0 ? (
                      <p className="text-ink/60">No inquiries yet.</p>
                    ) : (
                      recentInquiries.map((item) => (
                        <p key={item.id} className="text-ink/60">
                          {item.name} · {item.email}
                        </p>
                      ))
                    )}
                  </div>
                  <div className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                    <p className="font-semibold text-ink">Upcoming tours</p>
                    {recentAppointments.length === 0 ? (
                      <p className="text-ink/60">No tours scheduled.</p>
                    ) : (
                      recentAppointments.map((item) => (
                        <p key={item.id} className="text-ink/60">
                          {item.name} · {item.date} {item.time}
                        </p>
                      ))
                    )}
                  </div>
                  <div className="rounded-2xl border border-ink/10 bg-white/70 p-4">
                    <p className="font-semibold text-ink">Latest messages</p>
                    {recentMessages.length === 0 ? (
                      <p className="text-ink/60">No messages yet.</p>
                    ) : (
                      recentMessages.map((item) => (
                        <p key={item.id} className="text-ink/60">
                          {item.subject}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              )}
              {isAdmin && (
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-ink">User management</p>
                    {userNotice && (
                      <span className="text-xs text-ink/60">{userNotice}</span>
                    )}
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-ink/10">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-ink/5 text-xs uppercase text-ink/60">
                        <tr>
                          <th className="px-4 py-3">Name</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Role</th>
                          <th className="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/10">
                        {users.length === 0 && (
                          <tr>
                            <td className="px-4 py-3" colSpan="4">
                              No users loaded.
                            </td>
                          </tr>
                        )}
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-4 py-3">{user.name}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">
                              <select
                                className="input w-auto"
                                value={user.role}
                                onChange={(event) =>
                                  handleUserRoleUpdate(
                                    user.id,
                                    event.target.value,
                                  )
                                }
                              >
                                <option value="user">User</option>
                                <option value="agent">Agent</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                className="btn-outline"
                                type="button"
                                onClick={() => handleUserDelete(user.id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <button className="btn-primary" type="button">
                Export analytics
              </button>
            </div>
          </div>
        </section>
        <section
          id="access"
          className="form-layout section grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="card space-y-6">
            <div>
              <p className="label">User access</p>
              <p className="text-lg font-semibold">
                Sign in or register for Maithili Estates
              </p>
            </div>
            {isAuthenticated && (
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-4 text-sm text-ink/60">
                Signed in as {auth.user?.name || 'Account'} ({role || 'user'}).
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <form className="space-y-3" onSubmit={handleLoginSubmit}>
                <p className="text-sm font-semibold text-ink">Login</p>
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
                <input
                  className="input"
                  name="phone"
                  placeholder="Phone (optional)"
                />
                <input
                  className="input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
                <button className="btn-primary w-full" type="submit">
                  Sign in
                </button>
                {notices.login && (
                  <p className="text-sm text-ink/60">{notices.login}</p>
                )}
              </form>
              <form className="space-y-3" onSubmit={handleRegisterSubmit}>
                <p className="text-sm font-semibold text-ink">Register</p>
                <input
                  className="input"
                  name="name"
                  placeholder="Full name"
                  required
                />
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
                <input
                  className="input"
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
                <select className="input" name="role" required>
                  <option value="user">Buyer / Renter</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="btn-outline w-full" type="submit">
                  Create account
                </button>
                {notices.register && (
                  <p className="text-sm text-ink/60">{notices.register}</p>
                )}
              </form>
            </div>
          </div>

          <div className="card space-y-6">
            <div>
              <p className="label">Client messaging</p>
              <p className="text-lg font-semibold">Connect with an agent</p>
            </div>
            <form className="space-y-4" onSubmit={handleMessageSubmit}>
              <select className="input" name="agentId" required>
                {agents.map((agent) => {
                  const agentValue = agent.id || agent._id
                  return (
                    <option key={agentValue} value={agentValue}>
                      {agent.name}
                    </option>
                  )
                })}
              </select>
              <input className="input" name="name" placeholder="Your name" />
              <input
                className="input"
                name="email"
                type="email"
                placeholder="Email (optional)"
              />
              <input
                className="input"
                name="subject"
                placeholder="Subject"
                required
              />
              <textarea
                className="input min-h-[140px]"
                name="message"
                placeholder="Write a message to the agent"
                required
              />
              <button className="btn-primary w-full" type="submit">
                Send message
              </button>
              {notices.message && (
                <p className="text-sm text-ink/60">{notices.message}</p>
              )}
            </form>
          </div>
        </section>
      </main>
      <footer className="site-footer border-t border-ink/10 bg-white/70">
        <div className="footer-inner container mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-8 text-sm text-ink/60">
          <div>
            <p className="font-semibold text-ink">Maithili Estates</p>
            <p>Curated real estate experiences across Chennai.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-ink" href="#listings">
              Listings
            </a>
            <a className="hover:text-ink" href="#agents">
              Agents
            </a>
            <a className="hover:text-ink" href="#compare">
              Compare
            </a>
            <a className="hover:text-ink" href="#dashboards">
              Dashboards
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
