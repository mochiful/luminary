import { useState } from 'react'

const LAYOUTS = [
  {
    id: 'scrolling',
    name: 'Classic',
    tagline: 'Timeless editorial',
    description: 'Full-width hero, centered column, elegant typography',
    preview: ScrollingPreview,
    accent: '#c8a96e',
  },
  {
    id: 'nav',
    name: 'Professional',
    tagline: 'Corporate precision',
    description: 'Fixed navbar, clean sections, polished and authoritative',
    preview: NavPreview,
    accent: '#5b8dee',
  },
  {
    id: 'cards',
    name: 'Modern',
    tagline: 'Tech-forward',
    description: 'Dark theme, timeline cards, skill chips — stands out',
    preview: CardsPreview,
    accent: '#4ecdc4',
  },
]

export default function LayoutPicker({ data, onBack, onSelect }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--amber)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          Step 3 of 4
        </div>
        <h1 className="page-title" style={{ fontSize: 36 }}>
          Choose a <em>layout</em>
        </h1>
        <p className="page-subtitle" style={{ marginBottom: 48 }}>
          Three distinct templates, each with a unique personality. Pick the one that fits {data.name || 'you'} best.
        </p>
      </div>

      <div className="layout-grid">
        {LAYOUTS.map(layout => {
          const isSelected = selected === layout.id
          const Preview = layout.preview
          return (
            <button
              key={layout.id}
              className="layout-card-button"
              onClick={() => setSelected(layout.id)}
              style={{
                border: `2px solid ${isSelected ? layout.accent : 'var(--border)'}`,
                transform: isSelected ? 'translateY(-4px)' : 'none',
                boxShadow: isSelected ? `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${layout.accent}22` : 'none',
              }}
            >
              {/* Preview thumbnail */}
              <div style={{
                width: '100%',
                aspectRatio: '4/3',
                overflow: 'hidden',
                background: '#0a0a0c',
                position: 'relative',
              }}>
                <div style={{
                  transform: 'scale(0.32)',
                  transformOrigin: 'top left',
                  width: '312.5%',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  <Preview accent={layout.accent} />
                </div>
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    background: layout.accent, color: '#0a0a0c',
                    borderRadius: '50%', width: 28, height: 28,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 14,
                  }}>
                    ✓
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{
                padding: '18px 20px',
                background: isSelected ? `${layout.accent}10` : 'var(--surface)',
                transition: 'background 220ms ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800, fontSize: 16, color: 'var(--text)',
                  }}>
                    {layout.name}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: layout.accent, letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {layout.tagline}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>
                  {layout.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="action-row">
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <button
          className="btn btn-primary"
          disabled={!selected}
          onClick={() => onSelect(selected)}
          style={{ minWidth: 180 }}
        >
          {selected ? `Generate ${LAYOUTS.find(l => l.id === selected)?.name} Portfolio →` : 'Select a layout'}
        </button>
      </div>
    </>
  )
}

/* ── Mini Preview Components (shown at 32% scale) ── */

function ScrollingPreview({ accent }) {
  return (
    <div style={{ width: 900, background: '#f8f6f1', fontFamily: 'Georgia, serif' }}>
      {/* Hero */}
      <div style={{ background: '#1a1a2e', color: '#fff', padding: '60px 40px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: accent, margin: '0 auto 20px', opacity: 0.8 }} />
        <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 8 }}>Jane Smith</div>
        <div style={{ fontSize: 16, opacity: 0.6 }}>Senior Product Designer</div>
      </div>
      {/* Content */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 20px' }}>
        {['Skills', 'Experience', 'Education'].map(s => (
          <div key={s} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: accent, marginBottom: 12 }}>{s}</div>
            <div style={{ height: 2, background: '#eee', marginBottom: 16 }} />
            <div style={{ height: 12, background: '#ddd', borderRadius: 4, marginBottom: 8, width: '80%' }} />
            <div style={{ height: 12, background: '#ddd', borderRadius: 4, marginBottom: 8, width: '65%' }} />
            <div style={{ height: 12, background: '#ddd', borderRadius: 4, width: '72%' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function NavPreview({ accent }) {
  return (
    <div style={{ width: 900, background: '#fff', fontFamily: 'system-ui' }}>
      {/* Nav */}
      <div style={{ background: '#1e293b', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>Jane Smith</div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['About','Skills','Work','Education'].map(n => (
            <div key={n} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{n}</div>
          ))}
        </div>
      </div>
      {/* Hero */}
      <div style={{ padding: '48px 64px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 32 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: accent, flexShrink: 0, opacity: 0.7 }} />
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Jane Smith</div>
          <div style={{ fontSize: 14, color: '#64748b' }}>Senior Product Designer · San Francisco</div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            {['Email','LinkedIn','GitHub'].map(b => (
              <div key={b} style={{ fontSize: 10, padding: '4px 10px', border: `1px solid ${accent}`, color: accent, borderRadius: 4 }}>{b}</div>
            ))}
          </div>
        </div>
      </div>
      {/* Sections */}
      {['Skills','Experience'].map((s, si) => (
        <div key={s} style={{ padding: '32px 64px', background: si % 2 === 0 ? '#f8fafc' : '#fff', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#1e293b', marginBottom: 16 }}>{s}</div>
          <div style={{ height: 10, background: '#e2e8f0', borderRadius: 4, marginBottom: 8, width: '70%' }} />
          <div style={{ height: 10, background: '#e2e8f0', borderRadius: 4, width: '55%' }} />
        </div>
      ))}
    </div>
  )
}

function CardsPreview({ accent }) {
  return (
    <div style={{ width: 900, background: '#0f1117', fontFamily: 'system-ui', color: '#e2e8f0' }}>
      {/* Header */}
      <div style={{ padding: '40px 48px', borderBottom: '1px solid #1e2433', display: 'flex', alignItems: 'center', gap: 24, background: '#13151f' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: accent, flexShrink: 0, opacity: 0.8 }} />
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Jane Smith</div>
          <div style={{ fontSize: 13, color: '#8892a4' }}>Senior Product Designer</div>
          <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
            {['React','Figma','TypeScript','Node.js'].map(t => (
              <div key={t} style={{ fontSize: 9, padding: '3px 8px', background: `${accent}22`, color: accent, borderRadius: 8, border: `1px solid ${accent}44` }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
      {/* Cards */}
      <div style={{ padding: '32px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ background: '#1a1d2e', border: '1px solid #252836', borderRadius: 8, padding: 20 }}>
            <div style={{ height: 8, background: '#2a2d3e', borderRadius: 4, marginBottom: 8, width: `${60 + i * 8}%` }} />
            <div style={{ height: 8, background: '#2a2d3e', borderRadius: 4, marginBottom: 8, width: `${50 + i * 5}%` }} />
            <div style={{ height: 8, background: '#2a2d3e', borderRadius: 4, width: `${40 + i * 10}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}
