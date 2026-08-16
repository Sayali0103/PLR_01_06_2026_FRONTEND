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
} from 'react-icons/fi'

const media = {
  founder: {
    src: '/automationexpo/image2.jpg',
    alt: 'Prajwal Lale, Founder of P. L. Robotics, at Automation Expo',
    label: 'Founder',
  },
  team: {
    src: '/automationexpo/image1.jpg',
    alt: 'P. L. Robotics team at Automation Expo',
    label: 'The Team',
  },
  stall: {
    src: '/automationexpo/image3.jpg',
    alt: 'P. L. Robotics stall at Automation Expo',
    label: 'The Stall',
  },
  video: '/automationexpo/video1.mp4',
}

export default function BlogAutomationExpo() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow =
      selectedImage || videoOpen ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedImage, videoOpen])

  return (
    <main className="min-h-screen bg-white text-[#1a1208] pt-[88px] font-sans">

      {/* PAGE HEADER */}
      <section className="border-b border-[#e7e7e7] bg-white">
        <div className="mx-auto max-w-[1180px] px-5 pb-9 pt-7 sm:px-8 lg:px-10">
          <Link
            to="/blogs"
            className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#666] transition hover:text-[#FF7D00]"
          >
            <FiArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to blogs
          </Link>

          <div className="mt-8">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-7 bg-[#FF7D00]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF7D00]">
                Events · 2026
              </p>
            </div>

            <h1 className="mt-3 text-4xl font-semibold leading-none tracking-[-0.055em] sm:text-5xl">
              P. L. Robotics at{' '}
              <span className="text-[#FF7D00]">Automation Expo.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* 01 — FOUNDER */}
      <section className="border-b border-[#e7e7e7] bg-white">
        <div className="mx-auto max-w-[1180px] px-5 py-11 sm:px-8 sm:py-14 lg:px-10">
          <div className="grid items-center gap-9 lg:grid-cols-[440px_1fr] lg:gap-16">

            <ImageCard
              image={media.founder}
              onClick={() => setSelectedImage(media.founder)}
              aspect="aspect-[4/4.3]"
            />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF7D00]">
                01 · The Founder
              </p>

              <h2 className="mt-4 max-w-[680px] text-2xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-3xl">
                A closer look at the person behind the vision.
              </h2>

              <p className="mt-5 max-w-[650px] text-[15px] leading-7 text-[#6d6d6d]">
                Automation Expo was also a chance for P. L. Robotics founder
                Prajwal Lale to represent the vision behind the company and
                speak directly with people interested in robotics and
                automation.
              </p>

              <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-[#6d6d6d]">
                These conversations put a human face behind the technology —
                connecting the products we build with the problems Indian
                manufacturers are trying to solve.
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[#e7e7e7] pt-5">
                <span className="h-2 w-2 rounded-full bg-[#FF7D00]" />
                <p className="text-sm font-semibold text-[#303030]">
                  Built to Work. Designed to Last.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02 — TEAM */}
      <section className="border-b border-[#e7e7e7] bg-[#f7f7f7]">
        <div className="mx-auto max-w-[1180px] px-5 py-11 sm:px-8 sm:py-14 lg:px-10">
          <div className="grid items-center gap-9 lg:grid-cols-[1fr_440px] lg:gap-16">

            <div className="order-2 lg:order-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF7D00]">
                02 · The Team
              </p>

              <h2 className="mt-4 max-w-[650px] text-2xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-3xl">
                The people who brought the PL Robotics stall to life.
              </h2>

              <p className="mt-5 max-w-[620px] text-[15px] leading-7 text-[#6d6d6d]">
                An exhibition stall may look simple once everything is ready,
                but getting there is a team effort. From preparing the space
                and arranging the demonstrations to interacting with visitors,
                everyone played a part.
              </p>

              <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-[#6d6d6d]">
                The most rewarding part was seeing people stop, ask questions,
                explore what we had built and genuinely engage with the work.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#dedede] bg-white px-4 py-2.5 text-xs font-semibold text-[#555]">
                <FiUsers className="text-[#FF7D00]" size={15} />
                One team · One vision
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <ImageCard
                image={media.team}
                onClick={() => setSelectedImage(media.team)}
                aspect="aspect-[4/3]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 03 — STALL */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-5 py-11 sm:px-8 sm:py-14 lg:px-10">
          <div className="grid items-center gap-9 lg:grid-cols-[440px_1fr] lg:gap-16">

            <div>
              <ImageCard
                image={media.stall}
                onClick={() => setSelectedImage(media.stall)}
                aspect="aspect-[4/3]"
              />

              <button
                onClick={() => setVideoOpen(true)}
                className="group mt-3 flex w-full items-center justify-between rounded-xl border border-[#e2e2e2] bg-[#f7f7f7] px-4 py-3 text-left transition hover:border-[#FF7D00]/50 hover:bg-[#fff7f1]"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FF7D00] text-white transition group-hover:scale-105">
                    <FiPlay size={14} fill="currentColor" className="ml-0.5" />
                  </span>

                  <span>
                    <span className="block text-xs font-bold text-[#333]">
                      Watch the stall in action
                    </span>
                    <span className="mt-0.5 block text-[11px] text-[#888]">
                      Automation Expo 2026
                    </span>
                  </span>
                </span>

                <FiArrowUpRight
                  size={17}
                  className="text-[#999] transition group-hover:text-[#FF7D00]"
                />
              </button>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF7D00]">
                03 · The Stall
              </p>

              <h2 className="mt-4 max-w-[680px] text-2xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-3xl">
                Where our technology met the real world.
              </h2>

              <p className="mt-5 max-w-[650px] text-[15px] leading-7 text-[#6d6d6d]">
                Automation Expo gave P. L. Robotics an opportunity to bring
                our work directly to the people who share our interest in
                robotics, automation and technology.
              </p>

              <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-[#6d6d6d]">
                From demonstrating our technology and answering questions to
                exchanging ideas with visitors and industry professionals,
                every conversation added something to the experience.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <InfoItem icon={FiCpu} title="Robotics" />
                <InfoItem icon={FiUsers} title="Community" />
                <InfoItem icon={FiArrowUpRight} title="Innovation" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ORANGE CLOSING */}
      <section className="bg-[#FF7D00] text-white">
        <div className="mx-auto max-w-[850px] px-5 py-10 text-center sm:px-8 sm:py-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
            Until the next one
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
            Building the future of Indian automation.
          </h2>

          <p className="mx-auto mt-3 max-w-[550px] text-sm leading-6 text-white/85">
            Automation Expo was another step in our journey to make practical,
            accessible robotics a part of the future of Indian manufacturing.
          </p>

          <Link
            to="/blogs"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-[#1a1208] transition hover:bg-[#fff4e8]"
          >
            Explore more stories
            <FiArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      {/* IMAGE LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-full max-w-5xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close image"
                className="absolute right-0 -top-12 grid h-9 w-9 place-items-center rounded-full bg-white text-[#222]"
              >
                <FiX />
              </button>

              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[88vh] max-w-full rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEO LIGHTBOX */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              <button
                onClick={() => setVideoOpen(false)}
                aria-label="Close video"
                className="absolute right-0 -top-12 grid h-9 w-9 place-items-center rounded-full bg-white text-[#222]"
              >
                <FiX />
              </button>

              <video
                src={media.video}
                controls
                autoPlay
                playsInline
                className="w-full rounded-2xl bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function ImageCard({ image, onClick, aspect }) {
  return (
    <button
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-[24px] bg-[#ededed] text-left"
    >
      <img
        src={image.src}
        alt={image.alt}
        className={`w-full ${aspect} object-cover transition duration-700 group-hover:scale-[1.02]`}
      />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              {image.label}
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              View image
            </p>
          </div>

          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm">
            <FiArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </button>
  )
}

function InfoItem({ icon: Icon, title }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-[#e4e4e4] bg-[#f7f7f7] px-3 py-3">
      <Icon size={15} className="text-[#FF7D00]" />
      <span className="text-xs font-semibold text-[#555]">{title}</span>
    </div>
  )
}