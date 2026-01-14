import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SigninStart, SigninSuccess, SigninFailure } from '../../Redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const Signin = () => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
 
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { error: reduxError, loading: reduxLoading } = userState || {}

  const validateField = (name, value) => {
    if (name === 'email') {
      if (!value) return 'Email is required'
      const re = /^\S+@\S+\.\S+$/
      if (!re.test(value)) return 'Enter a valid email'
      return null
    }
    if (name === 'password') {
      if (!value) return 'Password is required'
      return null
    }
    return null
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((s) => ({ ...s, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }))
  }

  const validateForm = () => {
    const newErrors = {}
    newErrors.email = validateField('email', formData.email || '')
    newErrors.password = validateField('password', formData.password || '')
    Object.keys(newErrors).forEach((k) => { if (!newErrors[k]) delete newErrors[k] })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    try {
      setLoading(true)
      dispatch(SigninStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        setLoading(false)
        setError(data?.message || 'Signin failed')
        dispatch(SigninFailure(data))
      } else {
        setLoading(false)
        setError(null)
        dispatch(SigninSuccess(data))
        setSuccess(true)
        setTimeout(() => navigate('/'), 1500)
      }
    } catch (err) {
      setLoading(false)
      dispatch(SigninFailure(err));
      setError('Signin failed')
      console.error(err)
    }
  }

  return success ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border text-center">
        <h2 className="text-2xl font-bold text-green-600">Signed in successfully</h2>
        <p className="mt-4 text-gray-700">Redirecting to your profile...</p>
        <p className="mt-3 text-sm">Or go to <Link to="/" className="text-indigo-600">Profile</Link></p>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 mb-90">
      <div className="w-full max-w-md bg-transparent rounded-2xl shadow-xl p-8 border ">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
        <p className="text-center text-gray-500 mt-2">Welcome back — please sign in</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <Link to="/signup" className="text-indigo-600 font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Signin
