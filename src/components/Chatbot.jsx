import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { sendChatMessage } from '../services/api.js'

const starters = ['What products do you offer?', 'What can you automate?', 'Where are you located?', 'Show current job openings']

const welcome = {
  role: 'bot',
  text: 'Hi! I’m the PLR Assistant. Ask about our products, automation solutions, Pune location, or current job openings.',
}

function ChatIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.7 9.7 0 0 1-4.2-1L3 20l1.2-3.5A8.2 8.2 0 0 1 3 12a8.5 8.5 0 0 1 9-8.5 8.5 8.5 0 0 1 9 8Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></svg>
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([welcome])
  const [sending, setSending] = useState(false)
  const messagesEnd = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async text => {
    const message = text.trim()
    if (!message || sending) return
    setInput('')
    setMessages(current => [...current, { role: 'user', text: message }])
    setSending(true)
    try {
      const data = await sendChatMessage(message)
      setMessages(current => [...current, { role: 'bot', text: data.reply, actions: data.actions }])
    } catch (error) {
      setMessages(current => [...current, { role: 'bot', text: error.message || 'Something went wrong. Please try again.' }])
    } finally {
      setSending(false)
    }
  }

  const goTo = to => {
    setOpen(false)
    navigate(to)
  }

  return (
    <div className="fixed bottom-5 right-4 z-[250] sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="PLR Assistant"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex h-[min(570px,calc(100vh-104px))] w-[calc(100vw-32px)] max-w-[380px] flex-col overflow-hidden rounded-[24px] border border-[#FF7D00]/20 bg-[#fffaf4] shadow-[0_24px_70px_rgba(26,18,8,0.24)]"
          >
            <header className="flex items-center justify-between bg-[#1a1208] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF7D00] text-white"><ChatIcon /></span>
                <div><p className="text-[14px] font-bold">PLR Assistant</p><p className="text-[10px] font-medium tracking-[1px] text-white/65">HERE TO HELP</p></div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-white/80 transition hover:bg-white/10 hover:text-white">×</button>
            </header>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-3">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                    <div className={message.role === 'user' ? 'max-w-[85%] rounded-2xl rounded-br-md bg-[#FF7D00] px-3.5 py-2.5 text-[13px] leading-[1.55] text-white' : 'max-w-[90%] rounded-2xl rounded-bl-md border border-black/5 bg-white px-3.5 py-2.5 text-[13px] leading-[1.55] text-[#4f453c]'}>
                      {message.text}
                      {message.actions?.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{message.actions.map(item => <button type="button" key={item.to} onClick={() => goTo(item.to)} className="rounded-lg border border-[#FF7D00]/25 bg-[#fff8f0] px-2.5 py-1.5 text-[11px] font-bold text-[#d96500] transition hover:bg-[#FF7D00] hover:text-white">{item.label}</button>)}</div>}
                    </div>
                  </div>
                ))}
                {sending && <div className="flex justify-start"><div className="rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[12px] text-[#7b6c5e] shadow-sm">PLR Assistant is typing…</div></div>}
              </div>
              {messages.length === 1 && <div className="mt-4 flex flex-wrap gap-2">{starters.map(item => <button key={item} type="button" onClick={() => send(item)} className="rounded-full border border-[#FF7D00]/20 bg-white px-3 py-1.5 text-[11px] font-semibold text-[#9c4b00] transition hover:border-[#FF7D00] hover:bg-[#fff2e5]">{item}</button>)}</div>}
              <div ref={messagesEnd} />
            </div>

            <form onSubmit={event => { event.preventDefault(); send(input) }} className="border-t border-black/5 bg-white p-3">
              <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-[#faf7f2] p-1.5 focus-within:border-[#FF7D00]">
                <input value={input} onChange={event => setInput(event.target.value)} maxLength="500" placeholder="Ask PLR anything..." aria-label="Message PLR Assistant" className="min-w-0 flex-1 bg-transparent px-2 text-[13px] text-[#1a1208] outline-none placeholder:text-[#9d8d7f]" />
                <button type="submit" disabled={!input.trim() || sending} aria-label="Send message" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FF7D00] text-white transition hover:bg-[#e56f00] disabled:cursor-not-allowed disabled:opacity-45">↑</button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button type="button" onClick={() => setOpen(current => !current)} aria-label={open ? 'Close PLR Assistant' : 'Open PLR Assistant'} aria-expanded={open} className="ml-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF7D00] text-white shadow-[0_10px_30px_rgba(255,125,0,0.45)] transition hover:scale-105 hover:bg-[#e56f00] focus:outline-none focus:ring-4 focus:ring-[#FF7D00]/25">
        {open ? <span className="text-2xl leading-none">×</span> : <ChatIcon />}
      </button>
    </div>
  )
}
