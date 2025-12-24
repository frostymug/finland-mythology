import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { characters } from './CharacterData';

const GroupPicturePage = () => {
  const imgRef = useRef(null);
  const [mapAreas, setMapAreas] = useState([]);

  // Character areas for image map (raw coordinates in natural pixels of the source image)
  const characterAreas = [
    { id: 'maarenkehrä', name: 'Maarenkehrä', coords: '79,75,434,350' },
    { id: 'alekkaraja', name: 'Alekkaraja', coords: '965,80,1296,350' },
    { id: 'runoantti', name: 'Runoantti', coords: '145,375,400,745' },
    { id: 'mielilintu', name: 'Mielilintu', coords: '400,375,594,745' },
    { id: 'toivotakoja', name: 'Toivotakoja', coords: '595,375,804,745' },
    { id: 'delanisäde', name: 'Delanisäde', coords: '805,375,1014,745' },
    { id: 'saaniaamu', name: 'Saaniaamu', coords: '1015,375,1296,745' },
  ];

  // Build mapAreas: convert stored NATURAL coords -> DISPLAYED coords for <area>
  const rebuildMapAreas = () => {
    const img = imgRef.current;
    if (!img) return;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const displayedWidth = img.clientWidth;
    const displayedHeight = img.clientHeight;
    if (!naturalWidth || !naturalHeight || !displayedWidth || !displayedHeight) return;

    const scaleX = displayedWidth / naturalWidth;
    const scaleY = displayedHeight / naturalHeight;

    const converted = characterAreas.map(area => {
      const nums = area.coords.split(',').map(Number); // natural coords
      const displayedCoords = nums.map((c, idx) =>
        idx % 2 === 0 ? Math.round(c * scaleX) : Math.round(c * scaleY)
      );
      return { ...area, mapCoords: displayedCoords.join(',') };
    });
    setMapAreas(converted);
  };


  // Map coords helper (for <area>, in displayed pixels)
  const getMapCoords = (area) => mapAreas.find(a => a.id === area.id)?.mapCoords || area.coords;

  // Initialize mapAreas once (after image load)
  useEffect(() => {
    const init = () => rebuildMapAreas();
    if (imgRef.current) {
      if (imgRef.current.complete) init();
      else imgRef.current.addEventListener('load', init);
    }
    const ro = new ResizeObserver(init);
    if (imgRef.current) ro.observe(imgRef.current);
    return () => {
      if (imgRef.current) {
        imgRef.current.removeEventListener('load', init);
        ro.disconnect();
      }
    };
  }, []);

  const handleImageClick = (e) => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    
    // Click position relative to displayed image
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Natural and displayed sizes
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const displayedWidth = rect.width;
    const displayedHeight = rect.height;
    
    // Map displayed click to natural coords
    const scaleX = naturalWidth / displayedWidth;
    const scaleY = naturalHeight / displayedHeight;
    const naturalX = Math.round(clickX * scaleX);
    const naturalY = Math.round(clickY * scaleY);
    
    // Hit test against raw (natural) coords
    let clickedArea = null;
    for (const area of characterAreas) {
      const [left, top, right, bottom] = area.coords.split(',').map(Number);
      if (naturalX >= left && naturalX <= right &&
          naturalY >= top && naturalY <= bottom) {
        clickedArea = area;
        break;
      }
    }

  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#2a3020',
      color: '#e8e0d0',
      fontFamily: 'Palatino, "Palatino Linotype", "Book Antiqua", Georgia, serif',
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(to bottom, rgba(26, 42, 58, 0.95), rgba(42, 48, 32, 0.95))',
        borderBottom: '2px solid #8b7355',
        padding: '1rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Link 
            to="/" 
            style={{ 
              color: '#c9a227', 
              textDecoration: 'none',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Back to the map
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1.5rem 4rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 'normal',
          color: '#d4c4a8',
          marginBottom: '1rem',
          letterSpacing: '0.05em'
        }}>
          The Merry Band
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#a89878',
          marginBottom: '0.5rem',
          fontStyle: 'italic'
        }}>
          Click on any character to learn their story
        </p>
        {/* Image with map */}
        <div style={{
          position: 'relative',
          display: 'inline-block',
          maxWidth: '100%',
          margin: '0 auto'
        }}>
          <img
            ref={imgRef}
            src="/group-pic.png"
            alt="The family group picture"
            useMap="#characterMap"
            onClick={handleImageClick}
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              cursor: 'pointer',
              border: '3px solid #8b7355',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          />
          
          {/* Image map */}
          <map name="characterMap">
            {characterAreas.map((area) => {
              const mapCoords = getMapCoords(area);
              return (
                <area
                  key={area.id}
                  shape="rect"
                  coords={mapCoords}
                  alt={area.name}
                  href={`/character/${area.id}`}
                  title={characters[area.id]?.mythologicalName || area.name}
                />
              );
            })}
          </map>
        </div>

        {/* Character list for reference */}
        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(139, 115, 85, 0.3)'
        }}>
          <h2 style={{
            fontSize: '1.1rem',
            color: '#c9a227',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            fontWeight: 'normal'
          }}>
            Characters
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {Object.values(characters).map((character) => (
              <Link
                key={character.id}
                to={`/character/${character.id}`}
                style={{
                  display: 'block',
                  padding: '1rem',
                  backgroundColor: 'rgba(139, 115, 85, 0.1)',
                  border: '1px solid rgba(139, 115, 85, 0.3)',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  color: '#e8e0d0',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(139, 115, 85, 0.2)';
                  e.currentTarget.style.borderColor = '#c9a227';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(139, 115, 85, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.3)';
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {character.mythologicalName}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#a89878' }}>
                  {character.realName}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#c9a227', marginTop: '0.25rem', fontStyle: 'italic' }}>
                  {character.epithet}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupPicturePage;

