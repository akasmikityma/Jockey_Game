"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../css/landingpage.css" // Import the CSS for styling

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set loaded state after a short delay for animations
    setTimeout(() => setIsLoaded(true), 500)
  }, [])

  const handleExploreClick = () => {
    navigate("/explore")
  }

  return (
    <div className={`landing-page ${isLoaded ? "loaded" : ""}`}>
      <div className="scanlines"></div>
      <div className="crt-effect"></div>

      <div className="landing-header">
        <div className="game-logo">
          <div className="pixel-art-icon"></div>
        </div>
        <h1 className="game-title">Conqueror of Jockey</h1>
        <p className="game-tagline">A Multiplayer Card Game Adventure</p>
      </div>

      <div className="game-board">
        <div className="card-container">
          <div className="card card1">
            <div className="card-inner">
              <div className="card-front">
                <img src="/Jockey.jpg" alt="Card 1" className="card-image" />
              </div>
              <div className="card-back">
                <div className="card-pattern"></div>
              </div>
            </div>
          </div>

          <div className="card card2">
            <div className="card-inner">
              <div className="card-front">
                <img src="/Joker2.jpg" alt="Card 2" className="card-image" />
              </div>
              <div className="card-back">
                <div className="card-pattern"></div>
              </div>
            </div>
          </div>

          <div className="card card3">
            <div className="card-inner">
              <div className="card-front">
                <img src="/Joker3.jpg" alt="Card 3" className="card-image" />
              </div>
              <div className="card-back">
                <div className="card-pattern"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="game-board-overlay">
          <div className="pixel-character"></div>
        </div>
      </div>

      <div className="controls-section">
        <button
          className="explore-button"
          onClick={handleExploreClick}
          onMouseDown={(e) => e.currentTarget.classList.add("pressed")}
          onMouseUp={(e) => e.currentTarget.classList.remove("pressed")}
          onMouseLeave={(e) => e.currentTarget.classList.remove("pressed")}
        >
          <span className="button-text">Explore</span>
        </button>

        <div className="button-instructions">
          <span className="blink">Press Explore</span>
        </div>
      </div>

      <div className="retro-footer">
        <p className="copyright">© {new Date().getFullYear()} Retro Games Inc.</p>
        <div className="pixel-divider"></div>
        <p className="version">v1.0.0</p>
      </div>
    </div>
  )
}

export default LandingPage

