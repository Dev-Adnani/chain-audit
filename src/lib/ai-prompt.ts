import OpenAI from "openai";

interface MetricScore {
  metric: string;
  score: number;
}

interface AuditResult {
  section: string;
  details: string | MetricScore[];
}

const analyzeContract = async (
  contract: string,
  apiKey: string
): Promise<AuditResult[] | null> => {
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const prompt = `
    You are a Solidity security auditor. Carefully review the smart contract code below, then deliver a comprehensive, numbered report.

    Smart Contract:
    ${contract}

    IMPORTANT: Respond ONLY with a valid JSON array in exactly this format (no additional text before or after):
    [
      {
        "section": "Audit Report",
        "details": "A detailed audit report of the smart contract, covering security vulnerabilities, gas efficiency issues, and code quality problems. Include specific line numbers and code snippets where applicable."
      },
      {
        "section": "Metric Scores",
        "details": [
          {
            "metric": "Security",
            "score": 7
          },
          {
            "metric": "Performance",
            "score": 6
          },
          {
            "metric": "Gas Efficiency",
            "score": 5
          },
          {
            "metric": "Code Quality",
            "score": 6
          },
          {
            "metric": "Documentation",
            "score": 3
          }
        ]
      },
      {
        "section": "Suggestions for Improvement",
        "details": "Specific recommendations for improving the smart contract, including security fixes, gas optimizations, and code quality improvements."
      }
    ]
    `;

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user" as const,
        content: prompt,
      },
    ],
    max_tokens: 2000,
    temperature: 0.1,
  };

  try {
    const chatCompletion = await openai.chat.completions.create(params);
    const responseContent = chatCompletion.choices[0].message.content;

    if (!responseContent) {
      console.error("No response content from OpenAI");
      return null;
    }

    // Try to extract JSON from the response
    let auditResults: AuditResult[];
    try {
      // Look for JSON array in the response
      const jsonMatch = responseContent.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        auditResults = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: try parsing the whole response
        auditResults = JSON.parse(responseContent);
      }
    } catch (parseError) {
      console.log("Raw OpenAI Response:");
      console.log(responseContent);
      console.log("\n" + "=".repeat(50));
      return null;
    }

    // Display the structured results (for console logging)
    const auditReport = auditResults.find((r) => r.section === "Audit Report");
    if (auditReport) {
      console.log("Audit Report:");
      console.log(auditReport.details);
    }

    const metricScores = auditResults.find(
      (r) => r.section === "Metric Scores"
    );
    if (metricScores && Array.isArray(metricScores.details)) {
      console.log("\nMetric Scores:");
      metricScores.details.forEach((metric) => {
        console.log(`${metric.metric}: ${metric.score}/10`);
      });
    }

    const suggestions = auditResults.find(
      (r) => r.section === "Suggestions for Improvement"
    );
    if (suggestions) {
      console.log("\nSuggestions for Improvement:");
      console.log(suggestions.details);
    }

    // Return the results for UI display
    return auditResults;
  } catch (error: any) {
    console.error("Error calling OpenAI API:", error.message);
    throw error;
  }
};

export default analyzeContract;
