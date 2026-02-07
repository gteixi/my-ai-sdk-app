export function DiagramObject() {
  return (
    <div className="flex items-center justify-center py-6 bg-gray-50 rounded border border-gray-200">
      <svg width="500" height="120" viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Natural Language */}
        <rect x="10" y="20" width="100" height="60" rx="4" stroke="#333" strokeWidth="1.5" fill="white"/>
        <text x="60" y="40" textAnchor="middle" fontSize="13" fill="#333">Natural</text>
        <text x="60" y="56" textAnchor="middle" fontSize="13" fill="#333">Language</text>
        <text x="60" y="72" textAnchor="middle" fontSize="10" fill="#666" fontStyle="italic">"Make pizza"</text>
        
        {/* Arrow 1 */}
        <path d="M 120 50 L 160 50" stroke="#666" strokeWidth="2" markerEnd="url(#arrow3)"/>
        
        {/* Zod Schema */}
        <rect x="170" y="20" width="100" height="60" rx="4" stroke="#333" strokeWidth="1.5" fill="#f0f0f0"/>
        <text x="220" y="44" textAnchor="middle" fontSize="13" fill="#333">Zod Schema</text>
        <text x="220" y="62" textAnchor="middle" fontSize="10" fill="#666" fontStyle="italic">validates</text>
        
        {/* Arrow 2 */}
        <path d="M 280 50 L 320 50" stroke="#666" strokeWidth="2" markerEnd="url(#arrow3)"/>
        
        {/* Typed JSON */}
        <rect x="330" y="20" width="160" height="60" rx="4" stroke="#333" strokeWidth="1.5" fill="white"/>
        <text x="410" y="38" textAnchor="middle" fontSize="13" fill="#333">Typed JSON</text>
        <text x="410" y="54" textAnchor="middle" fontSize="10" fill="#666" fontFamily="monospace">{'{ name: "Pizza",'}</text>
        <text x="410" y="68" textAnchor="middle" fontSize="10" fill="#666" fontFamily="monospace">{'  ingredients: [...] }'}</text>
        
        {/* Signature */}
        <text x="250" y="108" textAnchor="middle" fontSize="11" fill="#999" fontStyle="italic">Gemma Teixidó</text>
        
        {/* Arrow marker */}
        <defs>
          <marker id="arrow3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L0,8 L8,4 z" fill="#666" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
