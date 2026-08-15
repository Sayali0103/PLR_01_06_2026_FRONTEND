import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiX,
  FiPlay,
  FiUsers,
  FiCpu,
  FiActivity,
} from 'react-icons/fi'

const photos = [
  {
    src: '/automationexpo/image1.jpg',
    alt: 'PL Robotics team at Automation Expo 2026',
    label: 'The PL Robotics team',
  },
  {
    src: '/automationexpo/image2.jpg',
    alt: 'Prajwal Lale, Founder of PL Robotics, at Automation Expo 2026',
    label: 'Prajwal Lale · Founder',
  },
  {
    src: '/automationexpo/image3.jpg',
    alt: 'PL Robotics stall at Automation Expo 2026',
    label: 'Inside the PL Robotics stall',
  },
]

export default function BlogAutomationExpo() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow =
      selectedPhoto || videoOpen ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedPhoto, videoOpen])

  return (
    <main className="min-h-screen bg-[#fcfaf7] text-[#29231e] pt-[90px]">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-[#e9e1d8]">

        <div className="absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-[#f3c28d]/20 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[320px] w-[320px] rounded-full bg-[#e9a15b]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-10 sm:px-8 sm:pt-14 lg:px-12">

          <Link
            to="/blogs"
            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#aa5a10] transition hover:text-[#733d0a]"
          >
            <FiArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to blogs
          </Link>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_420px] lg:items-end">

            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#d97820]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d97820]">
                  Events · August 2026
                </p>
              </div>

              <h1
                className="mt-6 max-w-[920px] font-bold leading-[0.94] tracking-[-0.06em] text-[#2b241e]"
                style={{ fontSize: 'clamp(48px, 7.5vw, 92px)' }}
              >
                PL Robotics
                <br />
                at Automation Expo
                <span className="text-[#d97820]"> 2026.</span>
              </h1>

              <p className="mt-8 max-w-[680px] text-[17px] leading-[1.8] text-[#756c64] sm:text-[20px]">
                A look back at our time at Automation Expo 2026 — the
                technology, conversations, people and moments that made
                the event special for the PL Robotics team.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#e5d8ca] bg-white px-4 py-2 text-[12px] font-semibold text-[#66584b]">
                  Automation
                </span>
                <span className="rounded-full border border-[#e5d8ca] bg-white px-4 py-2 text-[12px] font-semibold text-[#66584b]">
                  Robotics
                </span>
                <span className="rounded-full border border-[#e5d8ca] bg-white px-4 py-2 text-[12px] font-semibold text-[#66584b]">
                  PL Robotics
                </span>
              </div>

            </div>

            {/* Event information card */}
            <div className="relative">

              <div className="overflow-hidden rounded-[28px] border border-[#e8ddd1] bg-white p-6 shadow-[0_20px_60px_rgba(83,59,37,0.08)]">

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a09183]">
                    The event
                  </span>

                  <span className="rounded-full bg-[#fff1e5] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#b35e13]">
                    2026
                  </span>
                </div>

                <div className="mt-7">
                  <p className="text-2xl font-bold tracking-[-0.035em] text-[#342b24]">
                    Automation Expo
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#786e65]">
                    A space to connect with people, demonstrate our work,
                    exchange ideas and experience the energy of the
                    automation community.
                  </p>
                </div>

                <div className="mt-7 grid grid-cols-3 border-t border-[#eee6de] pt-5">

                  <div>
                    <FiCpu className="text-[#d97820]" size={18} />
                    <p className="mt-2 text-[11px] font-semibold text-[#7b7066]">
                      Robotics
                    </p>
                  </div>

                  <div>
                    <FiUsers className="text-[#d97820]" size={18} />
                    <p className="mt-2 text-[11px] font-semibold text-[#7b7066]">
                      Community
                    </p>
                  </div>

                  <div>
                    <FiActivity className="text-[#d97820]" size={18} />
                    <p className="mt-2 text-[11px] font-semibold text-[#7b7066]">
                      Innovation
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================
          FEATURE IMAGE
      ========================================================= */}
      <section className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">

        <button
          onClick={() => setSelectedPhoto(photos[2])}
          className="group relative block w-full overflow-hidden rounded-[28px] bg-[#eee7de] text-left"
        >

          <img
            src="/automationexpo/image3.jpg"
            alt="PL Robotics stall at Automation Expo 2026"
            className="aspect-[16/8] w-full object-cover transition duration-1000 group-hover:scale-[1.025]"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-6 sm:p-10">

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              Automation Expo 2026
            </p>

            <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-white sm:text-3xl">
              Where ideas, technology and people came together.
            </p>

          </div>

        </button>

      </section>


      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section className="mx-auto max-w-[980px] px-5 pb-16 sm:px-8">

        <div className="grid gap-10 md:grid-cols-[180px_1fr]">

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d97820]">
              01 · The experience
            </p>
          </div>

          <div>

            <h2 className="max-w-[760px] text-3xl font-bold leading-[1.08] tracking-[-0.045em] text-[#342b24] sm:text-5xl">
              More than an exhibition. It was a chance to show what we
              are building.
            </h2>

            <div className="mt-7 space-y-5 text-[16px] leading-[1.9] text-[#71675f]">

              <p>
                Automation Expo 2026 gave PL Robotics an opportunity to
                step outside the everyday rhythm of building and bring
                our work directly to the people who share our interest
                in robotics, automation and technology.
              </p>

              <p>
                From setting up the stall and presenting our work to
                answering questions and speaking with visitors, every
                part of the experience was about making our technology
                easier to understand and more approachable.
              </p>

              <p>
                For our team, the event was also about listening. Every
                conversation brought a different question, perspective
                or idea — and those interactions are often just as
                valuable as the technology itself.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          WHAT WE BROUGHT
      ========================================================= */}
      <section className="border-y border-[#e9e1d8] bg-[#f7f2ec]">

        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">

          <div className="max-w-[700px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d97820]">
              02 · At the stall
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-[#342b24] sm:text-6xl">
              Technology is better when people can see it in action.
            </h2>
          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <div className="rounded-[24px] border border-[#e7dbcf] bg-white p-7">

              <div className="grid h-11 w-11 place-items-center rounded-full bg-[#fff1e5] text-[#d97820]">
                <FiCpu size={19} />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-[-0.025em]">
                Automation
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#766b61]">
                Showcasing our approach to automation and robotics
                through practical technology and real-world thinking.
              </p>

            </div>


            <div className="rounded-[24px] border border-[#e7dbcf] bg-white p-7">

              <div className="grid h-11 w-11 place-items-center rounded-full bg-[#fff1e5] text-[#d97820]">
                <FiUsers size={19} />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-[-0.025em]">
                Conversations
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#766b61]">
                Meeting visitors, industry professionals and fellow
                technology enthusiasts who stopped by our stall.
              </p>

            </div>


            <div className="rounded-[24px] border border-[#e7dbcf] bg-white p-7">

              <div className="grid h-11 w-11 place-items-center rounded-full bg-[#fff1e5] text-[#d97820]">
                <FiActivity size={19} />
              </div>

              <h3 className="mt-6 text-xl font-bold tracking-[-0.025em]">
                Learning
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#766b61]">
                Understanding new perspectives, discovering ideas and
                taking inspiration back with us.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          TEAM IMAGE + STORY
      ========================================================= */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">

          <button
            onClick={() => setSelectedPhoto(photos[0])}
            className="group overflow-hidden rounded-[26px] bg-[#eee7de] text-left"
          >

            <img
              src="/automationexpo/image1.jpg"
              alt="PL Robotics team at Automation Expo 2026"
              className="aspect-[4/3] w-full object-cover transition duration-1000 group-hover:scale-[1.025]"
            />

            <div className="border border-t-0 border-[#e6dbd0] bg-white px-5 py-4">
              <p className="text-sm font-semibold text-[#5f5145]">
                The PL Robotics team at Automation Expo 2026
              </p>
            </div>

          </button>


          <div>

            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d97820]">
              The people behind it
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-[#342b24] sm:text-5xl">
              A team effort from setup to the final conversation.
            </h2>

            <p className="mt-6 text-[16px] leading-[1.9] text-[#71675f]">
              An exhibition stall may look simple once everything is
              ready, but getting there is a team effort. From preparing
              the space and arranging the demonstrations to interacting
              with visitors throughout the event, everyone played a
              part in making the PL Robotics presence possible.
            </p>

            <p className="mt-5 text-[16px] leading-[1.9] text-[#71675f]">
              The most rewarding part was seeing people stop, ask
              questions, explore what we had built and genuinely engage
              with the work.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          FOUNDER FEATURE
      ========================================================= */}
      <section className="overflow-hidden bg-[#2d251f] text-[#fcfaf7]">

        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">

          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <button
              onClick={() => setSelectedPhoto(photos[1])}
              className="group relative overflow-hidden rounded-[26px] bg-[#41362d] text-left"
            >

              <img
                src="/automationexpo/image2.jpg"
                alt="Prajwal Lale, Founder of PL Robotics"
                className="aspect-[4/5] w-full object-cover transition duration-1000 group-hover:scale-[1.025]"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                  Founder
                </p>

                <p className="mt-1 text-xl font-bold">
                  Prajwal Lale
                </p>

              </div>

            </button>


            <div>

              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e99a50]">
                03 · The founder
              </p>

              <h2 className="mt-5 max-w-[650px] text-4xl font-bold leading-[1.03] tracking-[-0.05em] sm:text-6xl">
                Prajwal Lale,
                <br />
                Founder of PL Robotics.
              </h2>

              <p className="mt-7 max-w-[650px] text-[16px] leading-[1.9] text-[#c5b9ad]">
                Automation Expo was also an opportunity for our founder,
                Prajwal Lale, to represent the vision behind PL Robotics
                and engage directly with people interested in the work
                we are doing.
              </p>

              <p className="mt-5 max-w-[650px] text-[16px] leading-[1.9] text-[#c5b9ad]">
                From discussing technology and automation to sharing the
                journey of building PL Robotics, these conversations
                helped put a face and a story behind the company.
              </p>

              <div className="mt-8 h-px max-w-[500px] bg-white/10" />

              <p className="mt-6 max-w-[500px] text-sm leading-7 text-[#9e9287]">
                Building technology is one part of the journey.
                Showing people why it matters is another.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          VIDEO
      ========================================================= */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d97820]">
              04 · On the floor
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-[#342b24] sm:text-6xl">
              A glimpse from the stall.
            </h2>
          </div>

          <p className="max-w-[350px] text-sm leading-6 text-[#857a70]">
            Sometimes a photograph captures a moment. A video captures
            the atmosphere around it.
          </p>

        </div>


        <button
          onClick={() => setVideoOpen(true)}
          className="group relative mt-10 block w-full overflow-hidden rounded-[28px] bg-[#2c241e] text-left"
        >

          <video
            src="/automationexpo/video1.mp4"
            muted
            playsInline
            preload="metadata"
            className="aspect-video w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.015] group-hover:opacity-75"
          />

          <div className="absolute inset-0 grid place-items-center">

            <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-[#2d251f] shadow-[0_10px_40px_rgba(0,0,0,0.2)] transition duration-300 group-hover:scale-110">

              <FiPlay
                size={25}
                fill="currentColor"
                className="ml-1"
              />

            </span>

          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 sm:p-9">

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
              Automation Expo 2026
            </p>

            <p className="mt-2 text-xl font-bold text-white sm:text-2xl">
              Inside the PL Robotics stall
            </p>

          </div>

        </button>

      </section>


      {/* =========================================================
          PHOTO GRID
      ========================================================= */}
      <section className="border-t border-[#e9e1d8]">

        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">

          <div className="flex items-end justify-between gap-6">

            <div>

              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d97820]">
                05 · The gallery
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-[#342b24] sm:text-5xl">
                A few frames from the day.
              </h2>

            </div>

            <span className="hidden text-[12px] text-[#978d83] sm:block">
              Click any image to expand
            </span>

          </div>


          <div className="mt-10 grid gap-5 sm:grid-cols-2">

            {photos.map((photo, index) => (

              <button
                key={photo.src}
                onClick={() => setSelectedPhoto(photo)}
                className={`group overflow-hidden rounded-[24px] bg-[#eee7de] text-left ${
                  index === 2 ? 'sm:col-span-2' : ''
                }`}
              >

                <img
                  src={photo.src}
                  alt={photo.alt}
                  className={`w-full object-cover transition duration-700 group-hover:scale-[1.025] ${
                    index === 2
                      ? 'aspect-[16/7]'
                      : 'aspect-[4/3]'
                  }`}
                />

                <div className="border border-t-0 border-[#e6dbd0] bg-white px-5 py-4">

                  <p className="text-sm font-semibold text-[#5f5145]">
                    {photo.label}
                  </p>

                  <p className="mt-1 text-xs text-[#988d83]">
                    View full image
                  </p>

                </div>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          CLOSING
      ========================================================= */}
      <section className="border-t border-[#e9e1d8]">

        <div className="mx-auto max-w-[900px] px-5 py-20 text-center sm:px-8 sm:py-28">

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d97820]">
            Until the next one
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-[#342b24] sm:text-6xl">
            Thank you for being part of our journey.
          </h2>

          <p className="mx-auto mt-6 max-w-[620px] text-[16px] leading-[1.9] text-[#766b61]">
            Automation Expo 2026 gave us new conversations, new
            perspectives and plenty of memories to take forward.
            We are grateful to everyone who visited our stall and
            spent time with the PL Robotics team.
          </p>

          <Link
            to="/blogs"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#d97820] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#b85f12]"
          >
            Explore more stories
            <FiArrowUpRight size={16} />
          </Link>

        </div>

      </section>


      {/* =========================================================
          IMAGE LIGHTBOX
      ========================================================= */}
      <AnimatePresence>

        {selectedPhoto && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#211b17]/90 p-5 backdrop-blur-md"
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-full max-w-6xl"
            >

              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close image"
                className="absolute -right-1 -top-12 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white text-[#493c31] transition hover:bg-[#fff1e5]"
              >
                <FiX />
              </button>

              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
              />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* =========================================================
          VIDEO LIGHTBOX
      ========================================================= */}
      <AnimatePresence>

        {videoOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#211b17]/95 p-5 backdrop-blur-md"
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-6xl"
            >

              <button
                onClick={() => setVideoOpen(false)}
                aria-label="Close video"
                className="absolute right-0 -top-12 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white text-[#493c31] transition hover:bg-[#fff1e5]"
              >
                <FiX />
              </button>

              <video
                src="/automationexpo/video1.mp4"
                controls
                autoPlay
                playsInline
                className="w-full rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.4)]"
              />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  )
}