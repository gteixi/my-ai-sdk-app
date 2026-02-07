import type { ToolInvocation } from '@/types/chat';

interface ToolCallDisplayProps {
  toolInvocation: ToolInvocation;
}

export function ToolCallDisplay({ toolInvocation }: ToolCallDisplayProps) {
  const { toolName, args, result, state } = toolInvocation;

  // Map tool names to friendly display names and icons
  const toolConfig = {
    // Tool calling page tools
    getWeather: { icon: '🌤️', name: 'Weather Lookup' },
    calculate: { icon: '🔢', name: 'Calculator' },
    getCurrentTime: { icon: '🕐', name: 'Time & Date' },
    // Agent tools
    webSearch: { icon: '🔍', name: 'Web Search' },
    analyzeData: { icon: '📊', name: 'Data Analysis' },
    createPlan: { icon: '📋', name: 'Task Planner' },
    synthesizeInformation: { icon: '🧠', name: 'Information Synthesis' },
  };

  const config = toolConfig[toolName as keyof typeof toolConfig] || { icon: '🔧', name: toolName };

  return (
    <div className="flex justify-start mb-2">
      <div className="max-w-[85%] px-4 py-3 bg-purple-50 border border-purple-200 rounded-[18px]">
        {/* Tool header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{config.icon}</span>
          <span className="text-sm font-semibold text-purple-900">{config.name}</span>
          {state === 'call' && (
            <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
              Calling...
            </span>
          )}
          {state === 'result' && (
            <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
              ✓ Done
            </span>
          )}
        </div>

        {/* Tool arguments */}
        <div className="text-[15px] text-purple-800 mb-2">
          <span className="font-medium">Input:</span>{' '}
          <code className="bg-purple-100 px-1.5 py-0.5 rounded text-sm">
            {JSON.stringify(args)}
          </code>
        </div>

        {/* Tool result */}
        {state === 'result' && result && (
          <div className="text-[15px] text-purple-900 mt-2 pt-2 border-t border-purple-200">
            <span className="font-medium">Result:</span>
            <pre className="mt-1 bg-white p-2 rounded text-xs overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
