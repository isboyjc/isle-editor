module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-case": [0],
    "scope-case": [2, "always", "lowerCase"],
  },
  prompt: {
    messages: {
      type: "Select the type of change that you're committing [类型]:",
      scope: "Denote the SCOPE of this change (optional) [范围]:",
      customScope: "Denote the SCOPE of this change [自定义范围]:",
      subject:
        "Write a SHORT, IMPERATIVE tense description of the change [简短描述]:\n",
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line [详细描述]:\n',
      breaking:
        'List any BREAKING CHANGES (optional). Use "|" to break new line [非兼容性重大变更]:\n',
      footerPrefixSelect:
        "Select the ISSUES type of changeList by this change (optional) [关联ISSUES前缀]:",
      customFooterPrefix: "Input ISSUES prefix [输入ISSUES前缀]:",
      footer:
        "List any ISSUES by this change. E.g.: #31, #34 [列举关联ISSUES]:\n",
      generatingByAI: "Generating your AI commit subject... [生成AI描述]:",
      generatedSelectByAI:
        "Select suitable subject by AI generated [选择AI生成的描述]:",
      confirmCommit:
        "Are you sure you want to proceed with the commit above? [确认提交]:",
    },
    useEmoji: true,
    emojiAlign: "center",
    types: [
      {
        value: "feat",
        name: "feat: ✨ A new feature [新功能]",
        emoji: ":sparkles:",
      },
      { value: "fix", name: "fix: 🐛 A bug fix [BUG]", emoji: ":bug:" },
      {
        value: "docs",
        name: "docs: 📝 Documentation only changes [文档]",
        emoji: ":memo:",
      },
      {
        value: "style",
        name: "style: 💄 Changes that do not affect the meaning of the code [样式]",
        emoji: ":lipstick:",
      },
      {
        value: "refactor",
        name: "refactor: ♻️ A code change that neither fixes a bug nor adds a feature [重构]",
        emoji: ":recycle:",
      },
      {
        value: "perf",
        name: "perf: ⚡️ A code change that improves performance [性能]",
        emoji: ":zap:",
      },
      {
        value: "test",
        name: "test: ✅ Adding missing tests or correcting existing tests [测试]",
        emoji: ":white_check_mark:",
      },
      {
        value: "build",
        name: "build: 📦️ Changes that affect the build system or external dependencies [构建]",
        emoji: ":package:",
      },
      {
        value: "ci",
        name: "ci: 🎡 Changes to our CI configuration files and scripts [CI]",
        emoji: ":ferris_wheel:",
      },
      {
        value: "chore",
        name: "chore: 🔨 Other changes that don't modify src or test files [其他]",
        emoji: ":hammer:",
      },
      {
        value: "revert",
        name: "revert: ⏪️ Reverts a previous commit [回退]",
        emoji: ":rewind:",
      },
    ],
  },
};
