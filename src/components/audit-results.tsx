import React from "react";
import { Shield, Lightbulb } from "lucide-react";

interface MetricScore {
  metric: string;
  score: number;
}

interface AuditResult {
  section: string;
  details: string | MetricScore[];
}

interface AuditResultsProps {
  results: AuditResult[];
}

const AuditResults: React.FC<AuditResultsProps> = ({ results }) => {
  const auditReport = results.find((r) => r.section === "Audit Report");
  const metricScores = results.find((r) => r.section === "Metric Scores");
  const suggestions = results.find(
    (r) => r.section === "Suggestions for Improvement"
  );

  const gradientMap: Record<string, string[]> = {
    high: ["#22c55e", "#059669"], // green
    medium: ["#eab308", "#f59e42"], // yellow-orange
    low: ["#f59e42", "#ef4444"], // orange-red
    critical: ["#ef4444", "#b91c1c"], // red
  };

  const getGradientColors = (score: number) => {
    if (score >= 8) return gradientMap.high;
    if (score >= 6) return gradientMap.medium;
    if (score >= 4) return gradientMap.low;
    return gradientMap.critical;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "from-green-500 to-emerald-600";
    if (score >= 6) return "from-yellow-500 to-orange-500";
    if (score >= 4) return "from-orange-500 to-red-500";
    return "from-red-500 to-red-700";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 8) return "text-green-400";
    if (score >= 6) return "text-yellow-400";
    if (score >= 4) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="relative lg:w-4/6 w-full mx-auto mt-20">
      <div className="space-y-12">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Security Audit Complete
          </h1>
        </div>

        {/* Metrics Grid */}
        {metricScores && Array.isArray(metricScores.details) && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {metricScores.details.map((metric, index) => {
              const [fromColor, toColor] = getGradientColors(metric.score);
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105"
                >
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, ${fromColor}, ${toColor})`,
                    }}
                  ></div>
                  <div className="relative p-6 text-center">
                    <div
                      className={`text-3xl font-bold mb-2 ${getScoreTextColor(
                        metric.score
                      )}`}
                    >
                      {metric.score}
                    </div>
                    <div className="text-sm text-gray-300 font-medium mb-3">
                      {metric.metric}
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${getScoreColor(
                          metric.score
                        )} transition-all duration-1000 ease-out`}
                        style={{ width: `${metric.score * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Audit Report */}
          {auditReport && (
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/95 to-gray-950/95 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                        <Shield className="text-blue-400 w-7 h-7" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1">
                        Security Analysis
                      </h2>
                      <p className="text-gray-400">
                        Detailed assessment of your security posture
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl" />
                    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                      <div className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap">
                        {auditReport.details as string}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Elegant Divider */}
          {auditReport && suggestions && (
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center space-x-4 w-full max-w-md">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600 to-gray-600/50" />
                <div className="p-2 bg-gray-800/50 rounded-full border border-gray-700">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-600 to-gray-600/50" />
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions && (
            <div className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/95 to-gray-950/95 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-8 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
                        <Lightbulb className="text-yellow-400 w-7 h-7" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1">
                        Recommendations
                      </h2>
                      <p className="text-gray-400">
                        Actionable steps to improve your security
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl" />
                    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                      <div className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap">
                        {suggestions.details as string}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditResults;
