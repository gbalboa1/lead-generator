import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

export default function App() {
  const [leads, setLeads] = useState([])
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    if (data) setLeads(data)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('leads').insert([form])
    if (!error) {
      setSubmitted(true)
      setForm({ name: '', email: '', company: '', message: '' })
      fetchLeads()
    }
    setLoading(false)
  }

  return (
    <div className="app">
      <header>
        <h1>Get in Touch</h1>
        <p>Leave your details and we'll reach out to you.</p>
      </header>

      <main>
        <section className="form-section">
          {submitted ? (
            <div className="success">
              <h2>Thanks! We'll be in touch.</h2>
              <button onClick={() => setSubmitted(false)}>Submit another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Company"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
              />
              <textarea
                placeholder="Message"
                rows={4}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          )}
        </section>

        {leads.length > 0 && (
          <section className="leads-section">
            <h2>Leads ({leads.length})</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.company || '—'}</td>
                    <td>{lead.message || '—'}</td>
                    <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  )
}
