import { Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import './Overlay.css'

const Section = ({ children, opacity, right }) => {
  return (
    <section
      className={`overlaySection ${right ? 'overlaySectionRight' : ''}`}
      style={{ opacity }}
    >
      <div className="overlayCardContainer">
        <div className="overlayCardFrame">
          <div className="overlayCard">{children}</div>
        </div>
      </div>
    </section>
  )
}

export const Overlay = () => {
  const scroll = useScroll()
  const [opacityFirstSection, setOpacityFirstSection] = useState(1)
  const [opacitySecondSection, setOpacitySecondSection] = useState(1)
  const [opacityLastSection, setOpacityLastSection] = useState(1)

  useFrame(() => {
    setOpacityFirstSection(scroll.range(0, 1 / 3))
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3))
    setOpacityLastSection(scroll.range(2 / 3, 1 / 3))
  })

  return (
    <Scroll html>
      <div className="overlayRoot">
        <Section opacity={opacityFirstSection}>
          <h1 className="overlayTitle">Heaven</h1>
          <p className="overlayMuted">Welcome to my heaven</p>
          <p className="mt3">I know:</p>
          <ul className="overlayList">
            <li>How to code</li>
            <li>How to learn</li>
            <li>How to deliver</li>
          </ul>
          <p className="overlayBounce mt6">↓</p>
        </Section>

        <Section right opacity={opacitySecondSection}>
          <h1 className="overlayTitle">Here are my skillsets 🔥</h1>
          <p className="overlayMuted">PS: I never test</p>
          <p className="mt3">
            <b>Frontend 🚀</b>
          </p>
          <ul className="overlayList">
            <li>ReactJS</li>
            <li>React Native</li>
            <li>VueJS</li>
            <li>Tailwind</li>
          </ul>
          <p className="mt3">
            <b>Backend 🔬</b>
          </p>
          <ul className="overlayList">
            <li>NodeJS</li>
            <li>tRPC</li>
            <li>NestJS</li>
            <li>PostgreSQL</li>
          </ul>
          <p className="overlayBounce mt6">↓</p>
        </Section>

        <Section opacity={opacityLastSection}>
          <h1 className="overlayTitle"></h1>
          <p className="overlayMuted">
            I'm very expensive but you won't regret it
          </p>
          <p className="overlayLinkRow">
             <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
          </p>
        </Section>
      </div>
    </Scroll>
  )
}

