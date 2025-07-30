"use client";
import ContractInput from "@/components/contract-input";
import Header from "@/components/header";
import AuditResults from "@/components/audit-results";
import analyzeContract from "@/lib/ai-prompt";
import { useState } from "react";

interface MetricScore {
  metric: string;
  score: number;
}

interface AuditResult {
  section: string;
  details: string | MetricScore[];
}

export default function Home() {
  const [contract, setContract] = useState(
    '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract Example {\n    function hello() public pure returns (string memory) {\n        return "Hello, World!";\n    }\n}'
  );
  const [results, setResults] = useState<AuditResult[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!contract.trim()) {
      alert("Please enter a smart contract to analyze");
      return;
    }

    // Get API key from environment variables
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
      alert(
        "OpenAI API key not found. Please add NEXT_PUBLIC_OPENAI_API_KEY to your environment variables."
      );
      return;
    }

    setLoading(true);
    try {
      const auditResults = await analyzeContract(contract, apiKey);
      if (auditResults) {
        setResults(auditResults);
      } else {
        alert("Analysis failed. No results returned.");
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please check the console for more details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black text-white">
      <Header />
      <ContractInput
        contract={contract}
        setContract={setContract}
        analyze={analyze}
      />

      {/* Display audit results if available */}
      {results && (
        <div className="w-full px-4 pb-8">
          <AuditResults results={results} />
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-gray-900/80 to-purple-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-2xl border border-purple-700 shadow-2xl flex flex-col items-center space-y-4 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-700 blur-xl opacity-40"></div>
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500 border-opacity-60"></div>
              </div>
            </div>
            <span className="text-lg font-semibold text-white tracking-wide">
              Analyzing contract...
            </span>
            <span className="text-xs text-gray-400">
              This may take a few seconds
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
