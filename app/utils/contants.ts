const AVAILABLE_MODELS = [
    // --- CATEGORY: GENERAL PURPOSE ---
    {
        id: 'qwen2.5-1.5b',
        category: 'General Purpose',
        name: 'Qwen 2.5 (1.5B)',
        description: 'The best all-rounder. Fast, multilingual, and very smart for its size.',
        size: '1.1 GB',
        minRam: 4,
        url: 'https://modelscope.cn/api/v1/models/qwen/Qwen2.5-1.5B-Instruct-GGUF/repo?Revision=master&FilePath=qwen2.5-1.5b-instruct-q4_k_m.gguf',
    },
    {
        id: 'llama-3.2-3b',
        category: 'General Purpose',
        name: 'Llama 3.2 (3B)',
        description: 'Top-tier reasoning. Best for complex instructions and logic.',
        size: '2.1 GB',
        minRam: 8,
        url: 'https://modelscope.cn/api/v1/models/bartowski/Llama-3.2-3B-Instruct-GGUF/repo?Revision=master&FilePath=Llama-3.2-3B-Instruct-Q4_K_M.gguf',
    },

    // --- CATEGORY: EMOTIONAL SUPPORT & CONVERSATION ---
    {
        id: 'stablelm-zephyr-1.6b',
        category: 'Emotional Support',
        name: 'StableLM Zephyr',
        description: 'DPO-tuned for natural, empathetic dialogue and supportive chat.',
        size: '1.0 GB',
        minRam: 4,
        url: 'https://modelscope.cn/api/v1/models/tiansz/stablelm-2-zephyr-1_6b-GGUF/repo?Revision=master&FilePath=stablelm-2-zephyr-1_6b-Q4_K_M.gguf',
    },

    // --- CATEGORY: CODING & LOGIC ---
    {
        id: 'qwen-coder-1.5b',
        category: 'Coding Assistant',
        name: 'Qwen Coder 1.5B',
        description: 'Specialized in Python, JS, and React. Great for quick coding help.',
        size: '1.1 GB',
        minRam: 4,
        url: 'https://modelscope.cn/api/v1/models/qwen/Qwen2.5-Coder-1.5B-Instruct-GGUF/repo?Revision=master&FilePath=qwen2.5-coder-1.5b-instruct-q4_k_m.gguf',
    },
    {
        id: 'deepseek-coder-1.3b',
        category: 'Coding Assistant',
        name: 'DeepSeek Coder',
        description: 'A legendary small model for clean code generation and debugging.',
        size: '0.9 GB',
        minRam: 4,
        url: 'https://modelscope.cn/api/v1/models/mradermacher/deepseek-coder-1.3b-instruct-GGUF/repo?Revision=master&FilePath=deepseek-coder-1.3b-instruct.Q4_K_M.gguf',
    },

    // --- CATEGORY: ULTRA LIGHT (LOW-END DEVICES) ---
    {
        id: 'smollm2-1.7b',
        category: 'Ultra Light',
        name: 'SmolLM2 (1.7B)',
        description: 'Extremely efficient. Designed to run on almost any modern smartphone.',
        size: '1.05 GB',
        minRam: 3,
        url: 'https://modelscope.cn/api/v1/models/bartowski/SmolLM2-1.7B-Instruct-GGUF/repo?Revision=master&FilePath=SmolLM2-1.7B-Instruct-Q4_K_M.gguf',
    },
    {
        id: 'phi-3.5-mini',
        category: 'Reasoning Specialist',
        name: 'Phi-3.5 Mini',
        description: 'Microsoft’s specialist for math and deep logical analysis.',
        size: '2.4 GB',
        minRam: 8,
        url: 'https://modelscope.cn/api/v1/models/bartowski/Phi-3.5-mini-instruct-GGUF/repo?Revision=master&FilePath=Phi-3.5-mini-instruct-Q4_K_M.gguf',
    }
];


export { AVAILABLE_MODELS };