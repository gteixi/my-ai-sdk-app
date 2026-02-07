export function DiagramStreamText() {
  return (
    <div className="flex items-center justify-center py-6 bg-gray-50 rounded border border-gray-200">
      <svg width="500" height="100" viewBox="0 0 500 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* User Input */}
        <rect x="10" y="20" width="100" height="40" rx="4" stroke="#333" strokeWidth="1.5" fill="white"/>
        <text x="60" y="44" textAnchor="middle" fontSize="14" fill="#333">User Input</text>
        
        {/* Arrow 1 */}
        <path d="M 120 40 L 170 40" stroke="#666" strokeWidth="2" markerEnd="url(#arrow1)"/>
        
        {/* AI Model */}
        <rect x="180" y="20" width="100" height="40" rx="4" stroke="#333" strokeWidth="1.5" fill="#f0f0f0"/>
        <text x="230" y="44" textAnchor="middle" fontSize="14" fill="#333">AI Model</text>
        
        {/* Arrow 2 */}
        <path d="M 290 40 L 340 40" stroke="#666" strokeWidth="2" markerEnd="url(#arrow1)"/>
        
        {/* Stream Response */}
        <rect x="350" y="20" width="140" height="40" rx="4" stroke="#333" strokeWidth="1.5" fill="white"/>
        <text x="420" y="44" textAnchor="middle" fontSize="14" fill="#333">Stream Response</text>
        
        {/* Signature */}
        <text x="250" y="88" textAnchor="middle" fontSize="11" fill="#999" fontStyle="italic">Gemma Teixidó</text>
        
        {/* Arrow marker */}
        <defs>
          <marker id="arrow1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 z" fill="#666" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
