import { useEffect, useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight, Asterisk, Briefcase, Github, House, Instagram, Linkedin, Lightbulb, Mail, Menu, Moon, Palette, Plus, Power, Search, Send, Sun, UserRound, UsersRound, X, type LucideIcon } from 'lucide-react'

type Page = 'home' | 'about' | 'projects' | 'creative' | 'community' | 'connect'
type Theme = 'light' | 'dark'
type CreativeCategory = 'All' | 'Visual identity' | 'Illustration' | 'Digital' | 'Photography'

const pages: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'creative', label: 'Creative' },
  { id: 'community', label: 'Community' },
  { id: 'connect', label: 'Connect' },
]

const searchablePageText: Record<Page, string> = {
  home: 'Welcome to Vergia Brown portfolio desktop curiosity projects skills planning research collaboration communication home Brown OS 99',
  about: 'About Me person behind the work path unfolding story life journey professional biography resume experience roles skills people practice tools education college learning',
  projects: 'Projects ideas made together hackathons experiments solutions teamwork event role teammates case study challenge contribution outcome build',
  creative: 'Creative ideas color form gallery visual experiments design studies visual identity illustration digital photography common ground color in motion open studio small moments signal story softer signal',
  community: 'Community Wavco showing up each other nonprofit mission community events work initiative program gathering people together',
  connect: 'Connect hello contact email social LinkedIn Instagram GitHub thoughtful conversations creative collaborations new ideas send a note website message',
}

const desktopIcons: Record<Page, LucideIcon> = {
  home: House,
  about: UserRound,
  projects: Briefcase,
  creative: Palette,
  community: UsersRound,
  connect: Mail,
}

function currentPage(): Page {
  const hash = window.location.hash.slice(1)
  return pages.some((page) => page.id === hash) ? (hash as Page) : 'home'
}

function Header({ page, theme, onThemeToggle }: { page: Page; theme: Theme; onThemeToggle: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Vergia Brown, home">
        VB<span>.</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        {pages.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={page === id ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          aria-pressed={theme === 'dark'}
          onClick={onThemeToggle}
        >
          {theme === 'light' ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
          <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
        </button>
        <a className="nav-contact" href="#connect" onClick={() => setMenuOpen(false)}>
          Say hello <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </nav>
    </header>
  )
}

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow"><Asterisk aria-hidden="true" />{children}</p>
}

function SectionHeading({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <h2>{children}</h2>
    </div>
  )
}

function HomePage({ welcomeOpen, onWelcomeClose }: { welcomeOpen: boolean; onWelcomeClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('')
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
  const searchTerms = normalizedQuery.split(/\s+/).filter(Boolean)
  const searchResults = normalizedQuery
    ? pages.filter(({ id, label }) => {
      const pageText = `${label} ${searchablePageText[id]}`.toLocaleLowerCase()
      return searchTerms.every((term) => pageText.includes(term))
    })
    : []

  return (
    <>
      <section className="page-wrap hero windows-hero">
        <div className="monitor-shell">
          <div className="monitor-bezel">
            <div className="monitor-screen">
              <div className="desktop-topline"><span>VERGIA BROWN'S DESKTOP</span><span>BROWN OS 99</span></div>
              <div className="desktop-landscape" aria-hidden="true"><span className="landscape-sun" /><span className="landscape-hill landscape-hill-back" /><span className="landscape-hill landscape-hill-front" /><span className="landscape-ground" /></div>
              <div className="desktop-workspace">
                <nav className="desktop-apps" aria-label="Portfolio pages">
                  {pages.map(({ id, label }) => {
                    const Icon = desktopIcons[id]
                    return (
                      <a className={`desktop-app desktop-app-${id}`} href={`#${id}`} key={id} aria-label={`Open ${label} page`}>
                        <span className="desktop-app-icon"><Icon size={29} strokeWidth={1.8} aria-hidden="true" /></span>
                        <span>{label}</span>
                      </a>
                    )
                  })}
                </nav>
              </div>
              {welcomeOpen && (
                <section className="setup-window" aria-label="Portfolio welcome">
                  <div className="setup-titlebar">
                    <span>Welcome to Brown OS 99</span>
                    <button className="setup-window-control" type="button" aria-label="Close welcome window" onClick={onWelcomeClose}><X size={13} aria-hidden="true" /></button>
                  </div>
                  <div className="setup-content">
                    <div className="setup-logo" aria-hidden="true">VB<span>99</span></div>
                    <div>
                      <h1>Welcome to<br /><strong>Vergia Brown's portfolio</strong></h1>
                      <p>A work in progress, built with purpose. Explore the projects, people, and ideas that make up my journey.</p>
                    </div>
                    <p className="setup-hint"><Lightbulb size={16} aria-hidden="true" /> Select an icon on the desktop to get started.</p>
                  </div>
                </section>
              )}
              <div className="desktop-taskbar">
                <span className="taskbar-start"><span aria-hidden="true">⊞</span> Start</span>
                <form
                  className="taskbar-search"
                  role="search"
                  onSubmit={(event) => {
                    event.preventDefault()
                    if (searchResults.length === 1) {
                      window.location.hash = searchResults[0].id
                      setSearchQuery('')
                    }
                  }}
                >
                  <label className="visually-hidden" htmlFor="portfolio-search">Search all portfolio pages</label>
                  <input
                    id="portfolio-search"
                    type="search"
                    placeholder="Search this portfolio..."
                    value={searchQuery}
                    aria-controls="portfolio-search-results"
                    aria-expanded={normalizedQuery.length > 0}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                  <button type="submit" aria-label="Search portfolio pages"><Search size={14} aria-hidden="true" /></button>
                  {normalizedQuery && (
                    <div className="taskbar-search-results" id="portfolio-search-results" aria-live="polite">
                      {searchResults.length ? searchResults.map(({ id, label }) => (
                        <a href={`#${id}`} key={id} onClick={() => setSearchQuery('')}>
                          <Search size={13} aria-hidden="true" />
                          <span>{label}</span>
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      )) : <p>No pages found. Try another search.</p>}
                    </div>
                  )}
                </form>
                <span className="taskbar-clock">VB / 99</span>
              </div>
            </div>
            <div className="monitor-brand">V E R G I A</div>
            <div className="monitor-power-light" aria-hidden="true" />
          </div>
          <div className="monitor-neck" aria-hidden="true" />
          <div className="monitor-foot" aria-hidden="true" />
        </div>
        <p className="monitor-caption"><span>EST. WITH CURIOSITY</span><span>CHOOSE AN ICON TO EXPLORE</span></p>
      </section>

      <section className="intro-band" id="intro">
        <div className="page-wrap intro-layout">
          <Eyebrow>A LITTLE ABOUT ME</Eyebrow>
          <div>
            <p className="intro-statement">Good work starts with <span>curiosity</span> and gets stronger when it brings people along.</p>
            <a className="text-link" href="#about">Get to know me <ArrowUpRight size={16} /></a>
          </div>
          <Asterisk className="intro-spark" aria-hidden="true" />
        </div>
      </section>

      <section className="page-wrap content-section featured-section">
        <SectionHeading number="01">A few things in motion</SectionHeading>
        <div className="section-topline"><p>Recent projects and ideas worth sharing.</p><a className="text-link" href="#projects">All projects <ArrowRight size={16} /></a></div>
        <div className="project-grid">
          {[
            { number: '01', title: '[Project title]', category: 'FEATURED PROJECT', text: 'Add a concise note about the challenge, your role, and what came out of it.', color: 'project-card-coral' },
            { number: '02', title: '[Project title]', category: 'HACKATHON', text: 'Share the idea your team developed and the people it was designed to help.', color: 'project-card-green' },
          ].map((project) => (
            <a className={`project-card ${project.color}`} href="#projects" key={project.number}>
              <div className="project-card-head"><span>{project.category}</span><ArrowUpRight size={18} /></div>
              <div className="project-card-mark" aria-hidden="true">{project.number}</div>
              <div className="project-card-copy"><h3>{project.title}</h3><p>{project.text}</p></div>
            </a>
          ))}
        </div>
      </section>

      <section className="skills-ribbon">
        <div className="page-wrap skills-ribbon-inner">
          <div><Eyebrow>SKILLS, IN PRACTICE</Eyebrow><h2>What I bring<br />to the table.</h2></div>
          <div className="skill-chips" aria-label="Example skills to personalize">
            <span>Project planning</span><span>Research</span><span>Collaboration</span><span>Communication</span><small>Starter examples - replace with your strengths</small>
          </div>
          <a className="circle-link" href="#about" aria-label="See detailed skills on the About Me page"><ArrowUpRight size={23} /></a>
        </div>
      </section>
      <Footer />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <section className="page-wrap page-hero about-hero">
        <Eyebrow>THE PERSON BEHIND THE WORK</Eyebrow>
        <h1>My path is still<br /><em>unfolding.</em></h1>
        <p>Every experience adds a new chapter. Here's where my story, work, and learning meet.</p>
      </section>
      <section className="page-wrap content-section journey-section">
        <SectionHeading number="01">Life journey</SectionHeading>
        <div className="two-column-copy">
          <p className="large-copy">The short version, in my own words.</p>
          <div><p className="placeholder-copy">[Write a short professional biography: where your journey began, the experiences that shaped you, and what you're working toward.]</p><span className="edit-label">PERSONALIZE THIS INTRODUCTION</span></div>
        </div>
      </section>
      <section className="resume-band">
        <div className="page-wrap content-section">
          <SectionHeading number="02">Resume / experience</SectionHeading>
          <div className="timeline">
            {['Most recent role', 'Previous role', 'Earlier experience'].map((role, index) => (
              <article className="timeline-row" key={role}>
                <span className="timeline-date">[DATES]</span><div><h3>{role}</h3><p>[Organization] / [Location or remote]</p><p className="placeholder-copy">[Add 1-2 lines on your responsibilities, contribution, or impact.]</p></div><span className="timeline-index">0{index + 1}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-wrap content-section detail-skills">
        <SectionHeading number="03">Skills, up close</SectionHeading>
        <p className="section-lede">Replace the starter examples below with the skills and tools you use most.</p>
        <div className="skill-detail-grid">
          <article><span>01 / PEOPLE</span><h3>Working with others</h3><p>Communication / Facilitation / Teamwork</p></article>
          <article><span>02 / PRACTICE</span><h3>Making ideas happen</h3><p>Planning / Research / Problem solving</p></article>
          <article><span>03 / TOOLS</span><h3>Tools of the trade</h3><p>[Add software, platforms, methods, or technical skills]</p></article>
        </div>
      </section>
      <section className="education-band">
        <div className="page-wrap content-section education-layout">
          <div><SectionHeading number="04">Education</SectionHeading><p className="section-lede">The places and people that helped shape what comes next.</p></div>
          <article className="education-entry"><span className="timeline-date">[YEARS]</span><div><h3>[College or university]</h3><p>[Degree, program, or field of study]</p><p className="placeholder-copy">[Add campus activities, organizations, honors, or a formative college experience.]</p></div></article>
        </div>
      </section>
      <Footer />
    </>
  )
}

function ProjectsPage() {
  return (
    <>
      <section className="page-wrap page-hero projects-hero">
        <Eyebrow>IDEAS MADE TOGETHER</Eyebrow>
        <h1>From a blank page<br />to <em>something real.</em></h1>
        <p>A collection of hackathons, experiments, and solutions shaped by a team.</p>
      </section>
      <section className="page-wrap content-section hackathon-section">
        <SectionHeading number="01">Hack-a-thons</SectionHeading>
        <div className="section-topline"><p>Each entry is a prompt for the story behind your solution.</p><span className="edit-label">ADD YOUR EVENTS AND RESULTS</span></div>
        <div className="hackathon-list">
          {[
            { number: '01', tint: 'hackathon-peach' },
            { number: '02', tint: 'hackathon-lime' },
            { number: '03', tint: 'hackathon-blue' },
          ].map((item) => (
            <details className={`hackathon-card ${item.tint}`} key={item.number}>
              <summary className="hackathon-summary">
                <div className="hackathon-meta"><span>HACKATHON / {item.number}</span><span>[YEAR]</span></div>
                <div className="hackathon-content"><div><h3>[Event name]</h3><p>[Your role and teammates]</p></div><div className="solution-copy"><span>THE SOLUTION</span><p>[What problem did your team tackle? What did you build, and who could it help?]</p></div><span className="hackathon-number">{item.number}</span></div>
                <span className="hackathon-toggle">Explore case study <Plus size={15} aria-hidden="true" /></span>
              </summary>
              <div className="hackathon-details">
                <article><span>THE CHALLENGE</span><p>[Describe the need or problem your team set out to solve.]</p></article>
                <article><span>MY CONTRIBUTION</span><p>[Share your role, the skills you brought, and how you collaborated.]</p></article>
                <article><span>THE OUTCOME</span><p>[Add the result, what you learned, or what you would build next.]</p></article>
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="project-note-band"><div className="page-wrap project-note"><Asterisk className="note-star" aria-hidden="true" /><p>Best ideas happen when different perspectives have room to work.</p><a className="text-link" href="#community">See my community work <ArrowUpRight size={16} /></a></div></section>
      <Footer />
    </>
  )
}

const creativeProjects: {
  title: string
  category: Exclude<CreativeCategory, 'All'>
  description: string
  detail: string
  artwork: string
  mark: string
}[] = [
  { title: 'Common ground', category: 'Visual identity', description: 'A flexible identity built around connection and shared spaces.', detail: 'Add the client or brief, your role, tools, and the final deliverables for this identity project.', artwork: 'artwork-coral', mark: 'Cg' },
  { title: 'Color in motion', category: 'Illustration', description: 'A playful exploration of movement, shape, and color.', detail: 'Describe the idea behind the illustration, the process, and where the finished work appeared.', artwork: 'artwork-blue', mark: '✳' },
  { title: 'Open studio', category: 'Digital', description: 'A welcoming digital space for discovering and sharing creative work.', detail: 'Add a link to the live experience, your contribution, and what you learned from making it.', artwork: 'artwork-lime', mark: 'OS' },
  { title: 'Small moments', category: 'Photography', description: 'A collection of everyday details, noticed in a different light.', detail: 'Share when and where these photographs were made, and what story you wanted them to tell.', artwork: 'artwork-photo', mark: '01' },
  { title: 'Signal & story', category: 'Visual identity', description: 'A graphic language that gives a thoughtful message a clear voice.', detail: 'Explain the communication challenge, your visual approach, and how the audience responded.', artwork: 'artwork-orange', mark: 'S' },
  { title: 'A softer signal', category: 'Illustration', description: 'An abstract study in texture, contrast, and unexpected combinations.', detail: 'Add sketches, materials, process notes, and any next steps for this piece.', artwork: 'artwork-pink', mark: '✳' },
]

function CreativePage() {
  const [category, setCategory] = useState<CreativeCategory>('All')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const categories: CreativeCategory[] = ['All', 'Visual identity', 'Illustration', 'Digital', 'Photography']
  const filteredProjects = creativeProjects.filter((project) => category === 'All' || project.category === category)

  return (
    <>
      <section className="page-wrap page-hero creative-hero">
        <Eyebrow>THE CREATIVE SIDE</Eyebrow>
        <h1>Ideas in<br /><em>color &amp; form.</em></h1>
        <p>A gallery of visual experiments, design studies, and creative projects.</p>
      </section>
      <section className="page-wrap content-section creative-gallery">
        <div className="section-topline"><p>Browse by medium, then open a piece to read more.</p><span className="edit-label">STARTER GALLERY / PERSONALIZE WITH YOUR WORK</span></div>
        <div className="gallery-filters" aria-label="Filter creative projects">
          {categories.map((item) => (
            <button className={category === item ? 'gallery-filter is-active' : 'gallery-filter'} type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="creative-grid">
          {filteredProjects.map((project) => (
            <article className={`creative-card ${selectedProject === project.title ? 'is-selected' : ''}`} key={project.title}>
              <button
                className={`creative-artwork ${project.artwork}`}
                type="button"
                aria-label={`${selectedProject === project.title ? 'Close' : 'View'} ${project.title} project details`}
                aria-expanded={selectedProject === project.title}
                onClick={() => setSelectedProject(selectedProject === project.title ? null : project.title)}
              >
                <span className="artwork-frame"><span className="artwork-mark">{project.mark}</span><span className="artwork-caption">{project.category} / VB</span></span>
              </button>
              <div className="creative-card-copy">
                <span>{project.category}</span>
                <button type="button" className="creative-title" onClick={() => setSelectedProject(selectedProject === project.title ? null : project.title)} aria-expanded={selectedProject === project.title}>{project.title}<ArrowUpRight size={16} aria-hidden="true" /></button>
                <p>{project.description}</p>
                {selectedProject === project.title && <p className="creative-detail">{project.detail}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="project-note-band"><div className="page-wrap project-note"><Asterisk className="note-star" aria-hidden="true" /><p>Have a good idea? I'd love to hear what you're dreaming up.</p><a className="text-link" href="#connect">Let's connect <ArrowUpRight size={16} /></a></div></section>
      <Footer />
    </>
  )
}

function ConnectPage() {
  const [draftReady, setDraftReady] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const website = String(formData.get('website') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = `Portfolio hello from ${name}`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Website or social: ${website || 'Not provided'}`,
      '',
      'Message:',
      message,
    ].join('\n')

    setDraftReady(true)
    window.location.href = `mailto:vividcreations.vergia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <section className="page-wrap page-hero connect-hero">
        <Eyebrow>LET'S MAKE A CONNECTION</Eyebrow>
        <h1>Good things start<br />with <em>hello.</em></h1>
        <p>Have a project, opportunity, or just want to say hi? Send me a note or find me around the web.</p>
      </section>
      <section className="connect-content">
        <div className="page-wrap connect-layout">
          <div className="connect-details">
            <SectionHeading number="01">Find me online</SectionHeading>
            <p className="connect-lede">I’m always open to thoughtful conversations, creative collaborations, and new ideas.</p>
            <a className="contact-email" href="mailto:vividcreations.vergia@gmail.com"><Mail size={20} aria-hidden="true" /><span><small>EMAIL</small>vividcreations.vergia@gmail.com</span><ArrowUpRight size={17} aria-hidden="true" /></a>
            <div className="social-links">
              <article><Linkedin size={19} aria-hidden="true" /><div><span>LinkedIn</span><small>Add your profile URL</small></div></article>
              <article><Instagram size={19} aria-hidden="true" /><div><span>Instagram</span><small>Add your profile URL</small></div></article>
              <article><Github size={19} aria-hidden="true" /><div><span>GitHub</span><small>Add your profile URL</small></div></article>
            </div>
            <p className="social-note">Personalize the social profile links when you’re ready to share them.</p>
          </div>
          <div className="contact-form-wrap">
            <div className="section-heading"><span className="section-number">02</span><h2>Send a little note</h2></div>
            <p className="form-intro">Tell me a bit about yourself and what’s on your mind.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="contact-name">Your name <span aria-hidden="true">*</span></label>
              <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Name" required />
              <label htmlFor="contact-email">Your email <span aria-hidden="true">*</span></label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              <label htmlFor="contact-website">Website or social <span className="optional-label">(optional)</span></label>
              <input id="contact-website" name="website" type="url" placeholder="https://" />
              <label htmlFor="contact-message">What would you like to talk about? <span aria-hidden="true">*</span></label>
              <textarea id="contact-message" name="message" rows={5} placeholder="Write your message here..." required />
              <button className="button button-dark contact-submit" type="submit">Prepare email <Send size={16} aria-hidden="true" /></button>
              <p className="form-note" role="status">{draftReady ? 'Your email app should open with your note ready. Review it and press Send to deliver.' : 'This opens your email app with a draft addressed to Vergia; you can review it before sending.'}</p>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

function CommunityPage() {
  return (
    <>
      <section className="page-wrap page-hero community-hero">
        <Eyebrow>COMMUNITY / WAVCO</Eyebrow>
        <h1>Showing up<br />for <em>each other.</em></h1>
        <p>Community stories, events, and work with Wavco.</p>
      </section>
      <section className="wavco-intro">
        <div className="page-wrap wavco-intro-layout">
          <div className="wavco-monogram" aria-hidden="true">W<span>.</span></div>
          <div><span className="edit-label">WAVCO / NONPROFIT ORGANIZATION</span><h2>Good things grow<br />when we do them together.</h2><p>Use this space to introduce Wavco's mission and the work you're proud to have contributed to. Keep the focus on the community and the people involved.</p></div>
        </div>
      </section>
      <section className="page-wrap content-section wavco-work">
        <SectionHeading number="01">Events &amp; work</SectionHeading>
        <div className="section-topline"><p>Moments and initiatives from the Wavco community.</p><span className="edit-label">ADD REAL EVENT DETAILS</span></div>
        <div className="wavco-grid">
          {[
            { number: '01', label: 'COMMUNITY EVENT', title: '[Event or gathering]', text: '[When it happened, who came together, and what made it meaningful.]', tone: 'wavco-card-orange' },
            { number: '02', label: 'INITIATIVE', title: '[Project or program]', text: '[What the initiative set out to do and the role you played.]', tone: 'wavco-card-green' },
            { number: '03', label: 'IN THE COMMUNITY', title: '[A moment worth sharing]', text: '[Share a result, a lesson, or a story from the people involved.]', tone: 'wavco-card-blue' },
          ].map((item) => (
            <article className={`wavco-card ${item.tone}`} key={item.number}>
              <div className="wavco-card-top"><span>{item.label}</span><span>{item.number}</span></div>
              <div className="wavco-card-symbol" aria-hidden="true">{item.number === '01' ? <ArrowUpRight /> : item.number === '02' ? <Asterisk /> : <Plus />}</div>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>
      <section className="community-quote"><div className="page-wrap"><Eyebrow>WHY COMMUNITY MATTERS</Eyebrow><p>"The work is bigger than any one of us."</p><span className="edit-label">REPLACE WITH A QUOTE THAT FEELS LIKE YOU</span></div></section>
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-wrap footer-inner"><a className="wordmark" href="#home">VB<span>.</span></a><p>Made with intention by Vergia Brown.</p><a className="back-top" href="#home">Back to top <ArrowUpRight size={15} /></a></div>
    </footer>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>(currentPage)
  const [theme, setTheme] = useState<Theme>('dark')
  const [poweredOn, setPoweredOn] = useState(false)
  const [showStartup, setShowStartup] = useState(true)
  const [booting, setBooting] = useState(false)
  const [bootProgress, setBootProgress] = useState(0)
  const [welcomeOpen, setWelcomeOpen] = useState(false)

  useEffect(() => {
    const syncPage = () => setPage(currentPage())
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [page])

  useEffect(() => {
    if (!booting) return
    const interval = window.setInterval(() => {
      setBootProgress((progress) => Math.min(progress + 2, 100))
    }, 50)
    return () => window.clearInterval(interval)
  }, [booting])

  useEffect(() => {
    if (!booting || bootProgress < 100) return
    const timeout = window.setTimeout(() => {
      setBooting(false)
      setShowStartup(false)
      setWelcomeOpen(true)
    }, 800)
    return () => window.clearTimeout(timeout)
  }, [booting, bootProgress])

  return (
    <div className={poweredOn ? 'portfolio-shell is-powered' : 'portfolio-shell'}>
      {showStartup && (
        <div className={booting ? 'startup-screen is-booting' : 'startup-screen'} role="dialog" aria-modal="true" aria-label="Power on portfolio">
          <div className="startup-copy"><span>VERGIA BROWN / BROWN OS 99</span><p>{booting ? 'Waking up the creative universe...' : 'Every good idea starts with a spark.'}</p></div>
          {booting ? (
            <div className="boot-sequence" role="progressbar" aria-label={bootProgress === 100 ? 'System ready' : 'System loading'} aria-valuetext={bootProgress === 100 ? 'System ready' : 'System loading'} aria-valuemin={0} aria-valuemax={100} aria-valuenow={bootProgress}>
              <div className="boot-progress-track"><span style={{ width: `${bootProgress}%` }} /></div>
              <div className="boot-progress-label"><span>{bootProgress === 100 ? 'SYSTEM READY' : 'SYSTEM LOADING'}</span><span>{bootProgress}%</span></div>
            </div>
          ) : (
            <>
              <button
                className="power-button"
                type="button"
                disabled={poweredOn}
                aria-label="Power on Vergia Brown's portfolio"
                onClick={() => {
                  setPoweredOn(true)
                  setBooting(true)
                }}
              >
                <Power size={36} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <p className="power-prompt">PRESS TO POWER ON</p>
            </>
          )}
          <span className="startup-footer">A PORTFOLIO BY VERGIA BROWN</span>
        </div>
      )}
      <div className="portfolio-content" inert={!poweredOn}>
        <div className="light-mode-decor" aria-hidden="true">
          <img className="light-decor-cloud light-decor-cloud-a" src="/assets/light-clouds.png" alt="" />
          <img className="light-decor-ball light-decor-ball-a" src="/assets/light-disco-ball.png" alt="" />
          <img className="light-decor-cloud light-decor-cloud-b" src="/assets/light-clouds.png" alt="" />
          <img className="light-decor-ball light-decor-ball-b" src="/assets/light-disco-ball.png" alt="" />
          <img className="light-decor-cloud light-decor-cloud-c" src="/assets/light-clouds.png" alt="" />
          <img className="light-decor-ball light-decor-ball-c" src="/assets/light-disco-ball.png" alt="" />
          <img className="light-decor-cloud light-decor-cloud-d" src="/assets/light-clouds.png" alt="" />
          <img className="light-decor-ball light-decor-ball-d" src="/assets/light-disco-ball.png" alt="" />
          <img className="light-decor-cloud light-decor-cloud-e" src="/assets/light-clouds.png" alt="" />
          <img className="light-decor-ball light-decor-ball-e" src="/assets/light-disco-ball.png" alt="" />
          <img className="light-decor-cloud light-decor-cloud-f" src="/assets/light-clouds.png" alt="" />
          <img className="light-decor-ball light-decor-ball-f" src="/assets/light-disco-ball.png" alt="" />
          <img className="light-decor-cloud light-decor-cloud-g" src="/assets/light-clouds.png" alt="" />
          <img className="light-decor-ball light-decor-ball-g" src="/assets/light-disco-ball.png" alt="" />
          <img className="light-decor-cloud light-decor-cloud-h" src="/assets/light-clouds.png" alt="" />
          <img className="light-decor-ball light-decor-ball-h" src="/assets/light-disco-ball.png" alt="" />
        </div>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header page={page} theme={theme} onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
        <main id="main-content" key={page}>
          {page === 'home' && <HomePage welcomeOpen={welcomeOpen} onWelcomeClose={() => setWelcomeOpen(false)} />}
          {page === 'about' && <AboutPage />}
          {page === 'projects' && <ProjectsPage />}
          {page === 'creative' && <CreativePage />}
          {page === 'community' && <CommunityPage />}
          {page === 'connect' && <ConnectPage />}
        </main>
      </div>
    </div>
  )
}
