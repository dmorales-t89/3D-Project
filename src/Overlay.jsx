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
    setOpacityFirstSection(scroll.curve(0, 1 / 3))
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3))
    setOpacityLastSection(scroll.range(2 / 3, 1 / 3))
  })

  return (
    <Scroll html>
      <div className="overlayRoot">
        <Section opacity={opacityFirstSection}>
          <h1 className="overlayTitle">Is there a heaven?</h1>
          <p className="overlayMuted">I did not think about it much.</p>
          <ul className="overlayList">
            <li>-Just lived my life</li>
            <li>-Tried to be a good person</li>
            <li>-Helped others when I could</li>
          </ul>
          <p className="overlayBounce mt6">I was a kid!</p>
        </Section>

        <Section right opacity={opacitySecondSection}>
          <h1 className="overlayTitle">Is this heaven?</h1>
          <p className="overlayMuted">As my faith grew I pictured heaven like this:</p>
          <ul className="overlayList">
            <li>-Above the clouds</li>
            <li>-Very white</li>
            <li>-Full of light</li>
          </ul>
          <p className="overlayBounce mt6">Who knows?</p>
        </Section>

        <Section opacity={opacityLastSection}>
          <h1 className="overlayTitle">Currently:</h1>
          <p className="overlayMuted">Heaven seems more whimsical to me:</p>
          <ul className="overlayList">
            <li>-Dream like</li>
            <li>-Full of colors</li>
            <li>-Full of life</li>
            <li>-Lots of nature</li>
            <li>-Inexplicable</li>

          </ul>
          <p className="overlayBounce mt6">I would love to live here!</p>
        </Section>
      </div>
    </Scroll>
  )
}

