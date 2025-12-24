import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacter } from './CharacterData';

const CharacterPage = () => {
  const { characterId } = useParams();
  const character = getCharacter(characterId);

  if (!character) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#2a3020',
        color: '#d4c4a8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Palatino, "Palatino Linotype", "Book Antiqua", Georgia, serif',
        padding: '2rem'
      }}>
        <h1>Character not found</h1>
        <Link to="/" style={{ color: '#c9a227', marginTop: '1rem' }}>← Return to the map</Link>
      </div>
    );
  }

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
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
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
          <div style={{ marginTop: '0.35rem' }}>
            <Link
              to="/group"
              style={{
                color: '#c9a227',
                textDecoration: 'none',
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              View the group picture →
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '2rem 1.5rem 4rem'
      }}>
        {/* Character title section */}
        <section style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(139, 115, 85, 0.3)'
        }}>
          {/* Character portrait */}
          <div style={{
            width: '100%',
            maxWidth: '350px',
            margin: '0 auto 2rem',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            border: '3px solid #8b7355'
          }}>
            <img 
              src={`/characters/${character.id}.png`}
              alt={`Portrait of ${character.mythologicalName}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
          <p style={{
            fontSize: '0.9rem',
            color: '#a89878',
            marginBottom: '0.5rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            {character.realName}
          </p>
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: 'normal',
            color: '#d4c4a8',
            margin: '0 0 0.5rem',
            letterSpacing: '0.05em'
          }}>
            {character.mythologicalName}
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            fontStyle: 'italic',
            color: '#c9a227',
            margin: 0
          }}>
            {character.epithet}
          </p>
          <p style={{
            fontSize: '0.85rem',
            color: '#a89878',
            marginTop: '1rem'
          }}>
            {character.pronunciation} — "{character.nameMeaning}"
          </p>
        </section>

        {/* Origin Story */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.1rem',
            color: '#c9a227',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontWeight: 'normal'
          }}>
            Origin
          </h2>
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: '#e8e0d0'
          }}>
            {character.originStory}
          </p>
        </section>

        {/* Domains */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.1rem',
            color: '#c9a227',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontWeight: 'normal'
          }}>
            Domains
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            {character.domains.map((domain, index) => (
              <div 
                key={index}
                style={{
                  background: 'rgba(139, 115, 85, 0.1)',
                  border: '1px solid rgba(139, 115, 85, 0.3)',
                  borderRadius: '4px',
                  padding: '0.75rem 1rem'
                }}
              >
                <span style={{ 
                  fontWeight: 'bold', 
                  color: '#d4c4a8' 
                }}>
                  {domain.name}
                </span>
                <span style={{ color: '#a89878' }}> — </span>
                <span style={{ 
                  fontStyle: 'italic',
                  color: '#c9b896'
                }}>
                  {domain.description}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Personality */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.1rem',
            color: '#c9a227',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontWeight: 'normal'
          }}>
            Character
          </h2>
          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: '#e8e0d0'
          }}>
            {character.personalityBlend}
          </p>
        </section>

        {/* Symbolic Elements */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.1rem',
            color: '#c9a227',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontWeight: 'normal'
          }}>
            Symbols
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '0.5rem 1rem',
            fontSize: '0.95rem'
          }}>
            {character.symbolicElements.animals && (
              <>
                <span style={{ color: '#a89878', fontStyle: 'italic' }}>Animals:</span>
                <span style={{ color: '#e8e0d0' }}>{character.symbolicElements.animals}</span>
              </>
            )}
            {character.symbolicElements.objects && (
              <>
                <span style={{ color: '#a89878', fontStyle: 'italic' }}>Objects:</span>
                <span style={{ color: '#e8e0d0' }}>{character.symbolicElements.objects}</span>
              </>
            )}
            {character.symbolicElements.naturalElements && (
              <>
                <span style={{ color: '#a89878', fontStyle: 'italic' }}>Elements:</span>
                <span style={{ color: '#e8e0d0' }}>{character.symbolicElements.naturalElements}</span>
              </>
            )}
            {character.symbolicElements.colors && (
              <>
                <span style={{ color: '#a89878', fontStyle: 'italic' }}>Colors:</span>
                <span style={{ color: '#e8e0d0' }}>{character.symbolicElements.colors}</span>
              </>
            )}
          </div>
        </section>

        {/* Mythology Deep Dive */}
        <section style={{ 
          marginBottom: '3rem',
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
            The Mythology
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '0.9rem',
              color: '#a89878',
              marginBottom: '0.5rem',
              fontWeight: 'normal',
              fontStyle: 'italic'
            }}>
              From Finnish Tradition
            </h3>
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: '#c9b896'
            }}>
              {character.mythologyDeepDive.finnishSources}
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '0.9rem',
              color: '#a89878',
              marginBottom: '0.5rem',
              fontWeight: 'normal',
              fontStyle: 'italic'
            }}>
              What We Invented
            </h3>
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: '#c9b896'
            }}>
              {character.mythologyDeepDive.inventedElements}
            </p>
          </div>

          <div>
            <h3 style={{
              fontSize: '0.9rem',
              color: '#a89878',
              marginBottom: '0.5rem',
              fontWeight: 'normal',
              fontStyle: 'italic'
            }}>
              The Connections
            </h3>
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: '#c9b896'
            }}>
              {character.mythologyDeepDive.thematicConnections}
            </p>
          </div>
        </section>

        {/* Companion section (only for Runoantti) */}
        {character.companion && (
          <section style={{ 
            marginBottom: '3rem',
            padding: '1.5rem',
            background: 'rgba(74, 111, 165, 0.1)',
            border: '1px solid rgba(74, 111, 165, 0.3)',
            borderRadius: '4px'
          }}>
            <h2 style={{
              fontSize: '1.1rem',
              color: '#c9a227',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              fontWeight: 'normal'
            }}>
              The Companion: {character.companion.name}
            </h2>
            <p style={{
              fontSize: '0.85rem',
              color: '#a89878',
              marginBottom: '1rem'
            }}>
              {character.companion.pronunciation} — "{character.companion.nameMeaning}"
            </p>
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: '#c9b896',
              marginBottom: '1rem'
            }}>
              {character.companion.nature}
            </p>
            <p style={{
              fontSize: '0.9rem',
              lineHeight: 1.7,
              color: '#a89878',
              fontStyle: 'italic'
            }}>
              {character.companion.mythologyConnection}
            </p>
          </section>
        )}

        {/* Footer navigation */}
        <footer style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(139, 115, 85, 0.3)',
          textAlign: 'center'
        }}>
          <Link 
            to="/" 
            style={{ 
              color: '#c9a227', 
              textDecoration: 'none',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Return to the map
          </Link>
          <div style={{ marginTop: '0.35rem' }}>
            <Link
              to="/group"
              style={{
                color: '#c9a227',
                textDecoration: 'none',
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              View the group picture →
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CharacterPage;