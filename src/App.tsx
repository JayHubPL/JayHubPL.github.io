import Background from './components/Background'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-text font-sans">
      <Background />
      <div className="relative" style={{ zIndex: 1 }}>
        <Nav />
        <main>
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
      </div>
    </div>
  )
}
