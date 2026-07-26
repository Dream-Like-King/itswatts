export const learningPaths = [
  { number: '01', title: 'Automation foundations', text: 'Choose the right test cases, write maintainable checks, and make your regression suite earn its keep.', tags: ['Playwright', 'Selenium', 'API'], summary: 'A practical starting point for moving from repeatable checks to automation you can trust.', lessons: [['Choose what to automate', 'Use risk, repetition, stability, and setup cost to decide where automation will genuinely help.'], ['Design checks that explain themselves', 'Write tests around clear intent, readable data, and outcomes another person can understand.'], ['Build confidence over coverage theater', 'Grow a regression suite that gives useful feedback instead of creating a long, fragile list of checks.']] },
  { number: '02', title: 'AI for QA', text: 'Use AI to sharpen test design, documentation, and investigation without outsourcing your judgment.', tags: ['Copilot', 'Prompts', 'Strategy'], summary: 'Learn how to use AI as a thoughtful QA assistant while keeping quality decisions grounded in product context.', lessons: [['Prompt for better test ideas', 'Turn a user story into possible happy paths, edge cases, risks, and questions worth exploring.'], ['Review before you rely', 'Spot the assumptions, missing context, and false confidence that AI-generated output can introduce.'], ['Build a safer AI workflow', 'Use AI for drafts and discovery while keeping the final testing judgment in human hands.']] },
  { number: '03', title: 'Quality essentials', text: 'Build the habits behind thoughtful exploratory testing, accessibility, defect reporting, and release confidence.', tags: ['Accessibility', 'Risk', 'SDLC'], summary: 'The fundamental habits that help QA work make a meaningful difference across the delivery lifecycle.', lessons: [['Explore with a purpose', 'Use questions, risk, and user behavior to guide exploratory testing beyond a simple click-through.'], ['Make accessibility part of quality', 'Bring keyboard behavior, focus, labels, contrast, and error states into everyday test thinking.'], ['Communicate findings clearly', 'Write defects and release notes that help the next person understand what happened and why it matters.']] },
]

export const toolkits = [
  ['01', 'Test case starter', 'A practical checklist for turning a feature request into useful test scenarios.', 'Coming soon'],
  ['02', 'Automation decision guide', 'A simple framework for deciding what to automate, what to explore, and what to leave manual.', 'Coming soon'],
  ['03', 'QA prompt library', 'Ready-to-adapt prompts for test planning, bug investigation, and clearer QA communication.', 'Coming soon'],
]

export const posts = [
  {
    date: 'WEEKLY NOTE · 01', category: 'AI + QA', readTime: '3 MIN READ', title: 'AI can accelerate QA. It cannot replace curiosity.', description: 'How to use AI as a thinking partner without turning quality into a copy-and-paste exercise.',
    intro: 'AI can make a QA professional faster. It can help turn rough requirements into test ideas, summarize a confusing defect, or create a first draft of documentation. But the tool does not understand your users, your risks, or the small details that make a feature feel wrong.',
    sections: [['Use AI for a first pass', 'Let AI help you expand a requirement into scenarios, edge cases, and questions. Treat that output as a starting point—not proof that coverage is complete.'], ['Keep the human work human', 'Risk assessment, exploratory testing, and deciding what matters most still require context. Curiosity is what turns a list of test cases into meaningful quality work.'], ['A practical prompt', 'Try: “What assumptions could make this user story fail for a first-time user, a returning user, or someone using a keyboard?” Then investigate the answers in the product.']],
  },
  {
    date: 'WEEKLY NOTE · 02', category: 'AUTOMATION', readTime: '4 MIN READ', title: 'What should you automate first?', description: 'A risk-based approach to choosing automation work that saves time instead of creating maintenance debt.',
    intro: 'The best automation candidate is not always the most complicated workflow. Start with repeatable, high-value checks that give your team feedback when it matters.',
    sections: [['Look for repetition and risk', 'A stable flow that runs every release, protects important business behavior, or frequently breaks is a strong candidate. Repetition alone is not enough—pair it with meaningful risk.'], ['Avoid automating chaos', 'A feature that is changing every day may be better served by exploratory testing until the experience settles. Automating unstable behavior too early creates maintenance work instead of confidence.'], ['Start small, learn quickly', 'Automate one clear path end to end. Make it readable, reliable, and easy for another person to understand. Then expand from a solid foundation.']],
  },
  {
    date: 'WEEKLY NOTE · 03', category: 'QUALITY BASICS', readTime: '3 MIN READ', title: 'A good bug report is a gift to your whole team.', description: 'The details that make a defect report easier to understand, reproduce, and resolve.',
    intro: 'A defect report is not just a record of what went wrong. It is a communication tool that helps the next person understand the problem without having to rediscover it.',
    sections: [['Make the behavior easy to see', 'State what you did, what you expected, and what actually happened. Include the environment, account state, and any conditions that make the problem repeatable.'], ['Explain the impact', 'A clear title tells the team what is affected. A short impact statement explains why it matters to a user, business process, or release.'], ['Reduce the back-and-forth', 'Add useful screenshots, logs, or a short video when they make the issue clearer. The goal is not more detail—it is the right detail.']],
  },
]

export const focusAreas = ['Playwright', 'Selenium', 'API testing', 'Accessibility', 'GitHub Copilot', 'Azure DevOps', 'AI workflows']
