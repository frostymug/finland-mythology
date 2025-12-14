import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const MythologyMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 'pohjola',
      name: 'Pohjola',
      subtitle: 'The North',
      characters: ['Maarenkehrä', 'Alekkaraja'],
      characterSubtitles: ['Weaver of Worlds', 'Guardian of Thresholds'],
      description: 'Where the Weaver and the Guardian keep their hearth',
      x: 39,
      y: 39
    },
    {
      id: 'middle-lands',
      name: 'The Middle Lands',
      subtitle: 'The Place of the Home Waters',
      characters: ['Runoantti', 'Mielilintu', 'Saaniaamu'],
      characterSubtitles: ['Word-Father', 'Wild Wing, Tethered Heart', 'Seeker of First Light'],
      description: 'Where the Word-Father, the Wild Wing, and the Seeker begin',
      x: 50,
      y: 82
    },
    {
      id: 'western-reaches',
      name: 'The Western Reaches',
      subtitle: 'The Place of Proving',
      characters: ['Toivotakoja'],
      characterSubtitles: ['The Patient Hammer'],
      description: 'Where the Patient Hammer tends his forge',
      x: 22,
      y: 72
    },
    {
      id: 'eastern-threshold',
      name: 'The Eastern Threshold',
      subtitle: 'The Place of Powers',
      characters: ['Delanisäde'],
      characterSubtitles: ['The Fast Friend'],
      description: 'Where the Fast Friend learned to arrive',
      x: 77,
      y: 75
    }
  ];

  // Calculate container height based on viewport, maintaining image aspect ratio
  // Image is 1493x2000, so height = width * (2000/1493) = width * 1.34
  const imageAspectRatio = 2000 / 1493; // height / width

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#2a3020',
      fontFamily: 'Palatino, "Palatino Linotype", "Book Antiqua", Georgia, serif',
      color: '#2a2a2a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      overflow: 'auto'
    }}>
      {/* Title */}
      <div style={{
        textAlign: 'center',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        flexShrink: 0
      }}>
        <h1 style={{
          fontSize: 'clamp(1.3rem, 4.5vw, 2.2rem)',
          fontWeight: 'normal',
          letterSpacing: '0.12em',
          margin: 0,
          color: '#d4c4a8',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          THE JOURNEY TO POHJOLA
        </h1>
        <p style={{
          fontSize: 'clamp(0.75rem, 2.5vw, 0.95rem)',
          opacity: 0.7,
          marginTop: '0.5rem',
          fontStyle: 'italic',
          color: '#d4c4a8'
        }}>
          A Family Mythology
        </p>
        <p style={{
          fontSize: 'clamp(0.75rem, 2.5vw, 0.95rem)',
          opacity: 0.7,
          marginTop: '0.5rem',
          fontStyle: 'italic',
          color: '#d4c4a8'
        }}>Click a location to meet its characters</p>
      </div>

      {/* Map Wrapper - constrains width and forces aspect ratio */}
      <div style={{
        width: '100%',
        maxWidth: '550px',
        flexShrink: 0
      }}>
        {/* Map Container - uses padding-bottom trick for reliable aspect ratio */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 0,
          paddingBottom: `${imageAspectRatio * 100}%`, // This forces the aspect ratio
          backgroundImage: 'url("/map-background.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '4px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
          {/* Location nodes */}
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(
                selectedLocation?.id === location.id ? null : location
              )}
              style={{
                position: 'absolute',
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: 'translate(-50%, -50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                textAlign: 'center',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Location marker */}
              <div style={{
                width: 'clamp(36px, 10vw, 48px)',
                height: 'clamp(36px, 10vw, 48px)',
                borderRadius: '50%',
                background: selectedLocation?.id === location.id 
                  ? 'radial-gradient(circle at 30% 30%, #c9a227, #8b6914)'
                  : 'radial-gradient(circle at 30% 30%, #d4c4a8, #a89878)',
                border: `2px solid ${selectedLocation?.id === location.id ? '#c9a227' : '#8b7355'}`,
                boxShadow: selectedLocation?.id === location.id 
                  ? '0 0 15px rgba(201, 162, 39, 0.6), inset 0 0 10px rgba(0,0,0,0.2)' 
                  : '0 2px 8px rgba(0,0,0,0.3), inset 0 0 10px rgba(0,0,0,0.1)',
                margin: '0 auto 0.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>
                <span style={{
                  fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
                  color: '#3a3020'
                }}>
                  {location.id === 'pohjola' && '✧'}
                  {location.id === 'middle-lands' && '⌂'}
                  {location.id === 'western-reaches' && '⚒'}
                  {location.id === 'eastern-threshold' && '☆'}
                </span>
              </div>
              
              {/* Location name */}
              <div style={{
                fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)',
                fontWeight: 'bold',
                color: '#f4f0e6',
                whiteSpace: 'nowrap',
                textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.7)'
              }}>
                {location.name}
              </div>
              <div style={{
                fontSize: 'clamp(0.55rem, 2vw, 0.7rem)',
                fontStyle: 'italic',
                color: '#e8e0d0',
                textShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,0.7)'
              }}>
                {location.subtitle}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer hint */}
      <div style={{
        textAlign: 'center',
        padding: '1rem',
        opacity: 0.6,
        fontSize: 'clamp(0.6rem, 2vw, 0.75rem)',
        fontStyle: 'italic',
        color: '#d4c4a8',
        flexShrink: 0
      }}>
        Tap a location to begin your journey
      </div>

      {/* Selected location detail panel */}
      {selectedLocation && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(244, 240, 230, 0.98) 0%, rgba(244, 240, 230, 0.95) 100%)',
          borderTop: '3px solid #8b7355',
          padding: '1.5rem',
          animation: 'slideUp 0.3s ease',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.15)'
        }}>
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
          
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 style={{
              margin: '0 0 0.25rem',
              fontSize: 'clamp(1.1rem, 4vw, 1.4rem)',
              color: '#2a3020',
              fontWeight: 'normal',
              letterSpacing: '0.05em'
            }}>
              {selectedLocation.name}
            </h2>
            <p style={{
              margin: '0 0 1rem',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
              opacity: 0.7,
              fontStyle: 'italic',
              color: '#4a4a40'
            }}>
              {selectedLocation.description}
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              {selectedLocation.characters.map((character, index) => (
                <Link
                  key={character}
                  to={`/character/${character.toLowerCase()}`}
                  style={{
                    background: 'linear-gradient(to bottom, rgba(139, 115, 85, 0.1), rgba(139, 115, 85, 0.2))',
                    border: '1px solid #8b7355',
                    color: '#2a3020',
                    padding: '0.75rem 1rem',
                    borderRadius: '4px',
                    fontFamily: 'inherit',
                    fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textDecoration: 'none'
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>{character}</span>
                  <span style={{ 
                    fontStyle: 'italic', 
                    opacity: 0.7,
                    fontSize: '0.85em'
                  }}>
                    {selectedLocation.characterSubtitles[index]}
                  </span>
                </Link>
              ))}
            </div>
            
            <button
              onClick={() => setSelectedLocation(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8b7355',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.8rem',
                padding: '0.5rem 0'
              }}
            >
              ← Back to map
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MythologyMap;