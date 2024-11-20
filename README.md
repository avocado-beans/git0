
![Screenshot](./visualdemo.gif)


**What is Git0?**

*(Well, it's a work in progress, first of all.)*

Git0 is a v0 and Cursor inspired tool that empowers developers to interact with GitHub repositories directly in their browser, eliminating the need for local clones or forks. Leveraging the power of the Gemini API, Git0 offers two core functionalities: **Explanation** and **Code Modification**. 

![Screenshot](./visualdemo2.gif)

*(Only sweet UI and basic chat functionality is present at this stage.)*
*(Nevermind the messy code. I will fix it as I go.)*

**Explanation: Demystifying Code with AI**

* **Contextual Understanding:** Git0 extracts relevant context from your GitHub repository, focusing on the specific files you select. This avoids unnecessary processing and potential quota limits. 
* **RAG-Powered Insights:** By employing Retrieval Augmented Generation (RAG), Git0 provides comprehensive explanations and answers to your coding queries.
* **Intuitive Interface:** The slide-like component design allows for seamless navigation through your conversation history.

**Code Modification: Edit with Ease and AI Assistance**

* **In-Browser Code Editor:** A flexible browser-based code editor lets you explore and modify your repository's files directly.
* **AI-Assisted Editing:** The shortcut-based chat interface (inspired by the Ctrl+K in Cursor) enables you to interact with the AI assistant for precise code modifications.
* **Code Rating:** Get a comprehensive assessment of your code's quality across various dimensions, including structure, clarity, performance, and security.

**Technical Architecture and Technologies:**

* **Next.js:** A React framework for building server-rendered and static websites.
* **Zustand:** A state management solution for efficient and performant state management.
* **Ace Editor:** A versatile code editor component for editing rich text.
* **Gemini API:** Google's language model API, powering the intelligent interactions and code modifications.
