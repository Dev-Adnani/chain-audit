import React from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-solidity";
import "prismjs/themes/prism-tomorrow.css";
import { IconChecklist, IconPaperclip } from "@tabler/icons-react";

interface CustomCodeEditorProps {
  contract: string;
  setContract: React.Dispatch<React.SetStateAction<string>>;
  analyze: () => Promise<void>;
}

// Utility function to check if the contract contains the required SPDX license and pragma directive
const isValidSolidityContract = (code: string) => {
  const SPDXRegex = /\/\/\s*SPDX-License-Identifier:\s*[^\s]+/;
  const pragmaRegex = /pragma\s+solidity\s+[^;]+;/;
  return SPDXRegex.test(code) && pragmaRegex.test(code);
};

const CustomCodeEditor: React.FC<CustomCodeEditorProps> = ({
  contract,
  setContract,
  analyze,
}) => {
  const handleAnalyze = () => {
    if (!isValidSolidityContract(contract)) {
      alert(
        "The provided code does not appear to be a valid Solidity smart contract. Make sure it starts with the SPDX license identifier and the 'pragma' directive."
      );
      return;
    }
    analyze();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setContract(content);
      };
      reader.readAsText(file);
    }
    // Reset the input value so the same file can be selected again
    event.target.value = "";
  };

  return (
    <div className="relative lg:w-4/6 w-full mx-auto">
      {/* Header Section */}
      <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-t-2xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Window Controls */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              {isValidSolidityContract(contract) ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Valid Solidity Code </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Check format</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Section */}
      <div
        className="border-x border-gray-800 bg-black/50 backdrop-blur-sm relative"
        style={{ height: "450px" }}
      >
        {/* Editor */}
        <div className="w-full h-full relative">
          <Editor
            autoCapitalize="off"
            value={contract}
            onValueChange={(code) => setContract(code)}
            highlight={(code) => {
              return Prism.highlight(
                code,
                Prism.languages.solidity,
                "solidity"
              );
            }}
            padding={15}
            textareaId="code-editor"
            className="textarea-editor"
            textareaClassName="outline-none resize-none"
            style={{
              fontFamily: ' "Fira Mono", monospace',
              fontSize: 14,
              lineHeight: "1.25",
              height: "450px",
              background: "transparent",
              color: "#f8f8f2",
              overflow: "auto",
            }}
          />

          {/* Syntax Helper Overlay */}
          {!contract && (
            <div className="absolute inset-4 flex items-center justify-center pointer-events-none z-10">
              <div className="text-center">
                <div className="text-4xl mb-2">📝</div>
                <p className="text-gray-300 text-sm font-medium">
                  Paste your Solidity contract here
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Make sure to include SPDX license and pragma directive
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="border border-t-0 border-gray-800 rounded-b-2xl bg-black/50 backdrop-blur-sm">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="file"
                accept=".sol"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="file-upload"
              />
              <button
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Upload .sol file"
              >
                <IconPaperclip />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>Lines: {contract.split("\n").length}</span>
              <span>•</span>
              <span>Chars: {contract.length}</span>
            </div>
          </div>

          <div className="flex cursor-pointer items-center gap-x-2">
            <button
              onClick={handleAnalyze}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-6 py-2 font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
            >
              <span className="font-semibold">Audit Contract</span>
              <IconChecklist size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCodeEditor;
