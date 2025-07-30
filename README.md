# Chain Audit

AI-Powered Smart Contract Auditing Tool

Chain Audit is a modern web application for auditing Solidity smart contracts using advanced AI models. It provides instant, actionable security analysis, code quality metrics, and improvement recommendations for blockchain developers and auditors.

## Features

- ✨ **AI-Powered Auditing**: Analyze Solidity contracts with OpenAI and get detailed, actionable reports.
- 📊 **Security Metrics**: Visual breakdown of security, performance, gas efficiency, code quality, and documentation.
- 📝 **Recommendations**: Receive tailored suggestions to improve your contract.
- 🖥️ **Beautiful Web UI**: Modern, dark-themed interface with code editor, file upload, and real-time results.
- 🔒 **SPDX & Pragma Validation**: Ensures contracts are properly formatted before analysis.
- ⚡ **Fast & Responsive**: Built with Next.js, React, Tailwind CSS, and Prism.js for a smooth experience.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chain-audit.git
cd chain-audit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your OpenAI API key:

```
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **Prism.js** (Solidity syntax highlighting)
- **OpenAI API**

## Folder Structure

```
chain-audit/
  ├── src/
  │   ├── app/
  │   ├── components/
  │   ├── lib/
  ├── package.json
  ├── .env.local
  ├── README.md
```

## Contributing

Pull requests and feedback are welcome! Please open an issue for bugs or feature requests.

## License

MIT
