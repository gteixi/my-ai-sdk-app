export function DiagramTools() {
  return (
    <div className="flex items-center justify-center py-6 bg-gray-50 rounded border border-gray-200">
      <svg width="500" height="160" viewBox="0 0 500 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* User Request */}
        <rect x="10" y="50" width="100" height="40" rx="4" stroke="#333" strokeWidth="1.5" fill="white"/>
        <text x="60" y="74" textAnchor="middle" fontSize="14" fill="#333">User Request</text>
        
        {/* Arrow to AI */}
        <path d="M 120 70 L 170 70" stroke="#666" strokeWidth="2" markerEnd="url(#arrow2)"/>
        
        {/* AI decides box */}
        <rect x="180" y="50" width="100" height="40" rx="4" stroke="#333" strokeWidth="1.5" fill="#f0f0f0"/>
        <text x="230" y="74" textAnchor="middle" fontSize="14" fill="#333">AI Decides</text>
        
        {/* Three tool boxes below */}
        <rect x="300" y="10" width="80" height="35" rx="4" stroke="#333" strokeWidth="1.5" fill="white"/>
        <text x="340" y="32" textAnchor="middle" fontSize="13" fill="#333">Weather</text>
        
        <rect x="300" y="52" width="80" height="35" rx="4" stroke="#333" strokeWidth="1.5" fill="white"/>
        <text x="340" y="74" textAnchor="middle" fontSize="13" fill="#333">Calculator</text>
        
        <rect x="300" y="94" width="80" height="35" rx="4" stroke="#333" strokeWidth="1.5" fill="white"/>
        <text x="340" y="116" textAnchor="middle" fontSize="13" fill="#333">Time</text>
        
        {/* Arrows to tools */}
        <path d="M 280 60 L 295 27" stroke="#666" strokeWidth="1.5" strokeDasharray="3 3"/>
        <path d="M 280 70 L 295 69" stroke="#666" strokeWidth="1.5" strokeDasharray="3 3"/>
        <path d="M 280 80 L 295 111" stroke="#666" strokeWidth="1.5" strokeDasharray="3 3"/>
        
        {/* Arrow to result */}
        <path d="M 390 27 L 420 60" stroke="#666" strokeWidth="1.5"/>
        <path d="M 390 69 L 420 69" stroke="#666" strokeWidth="1.5"/>
        <path d="M 390 111 L 420 78" stroke="#666" strokeWidth="1.5"/>
        
        {/* Result box */}
        <rect x="430" y="50" width="60" height="40" rx="4" stroke="#333" strokeWidth="1.5" fill="white"/>
        <text x="460" y="74" textAnchor="middle" fontSize="14" fill="#333">Result</text>
        
        {/* Signature */}
        <text x="250" y="150" textAnchor="middle" fontSize="11" fill="#999" fontStyle="italic">Gemma Teixidó</text>
        
        {/* Arrow marker */}
        <defs>
          <marker id="arrow2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 z" fill="#666" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
