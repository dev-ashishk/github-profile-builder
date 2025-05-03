/**
 * Generates markdown for a GitHub profile README based on the provided data and template
 *
 * @param data Profile data to use in the template
 * @param template Template to use for generating markdown
 * @returns Generated markdown string
 */
export function generateMarkdown(data: any, template: string) {
  switch (template) {
    case "modern":
      return generateModernTemplate(data)
    case "minimal":
      return generateMinimalTemplate(data)
    case "creative":
      return generateCreativeTemplate(data)
    case "developer":
      return generateDeveloperTemplate(data)
    case "professional":
      return generateProfessionalTemplate(data)
    case "elegant":
      return generateElegantTemplate(data)
    default:
      return generateModernTemplate(data)
  }
}

/**
 * Generates repository card HTML based on repository settings
 */
function generateRepositoryCards(data, repoSettings = {}) {
  if (!data.repositories || data.repositories.length === 0) return ""

  // Default settings if not provided
  const settings = {
    cardStyle: "default",
    gridColumns: 2,
    alignment: "center",
    showDescription: true,
    showLanguage: true,
    showStats: true,
    showOwner: false,
    theme: "default",
    borderStyle: "default",
    iconSize: "medium",
    ...repoSettings,
  }

  // Calculate column width based on grid columns
  const columnWidth = Math.floor(100 / settings.gridColumns)

  // Generate theme parameter for GitHub stats API
  const themeParam = settings.theme !== "default" ? `&theme=${settings.theme}` : ""

  // Generate border style
  let borderStyle = ""
  if (settings.borderStyle === "none") {
    borderStyle = "&hide_border=true"
  } else if (settings.borderStyle !== "default") {
    borderStyle = `&border_color=${settings.borderStyle}`
  }

  // Generate table rows and columns
  let tableContent = ""
  let currentRow = "<tr>"

  data.repositories.forEach((repo, index) => {
    // Generate card content based on style
    let cardContent = ""

    if (settings.cardStyle === "compact") {
      // Compact style - just name and stats
      cardContent = `<a href="${repo.url}"><img src="https://github-readme-stats.vercel.app/api/pin/?username=${data.github}&repo=${repo.name}${themeParam}${borderStyle}&show_owner=${settings.showOwner}" alt="${repo.name}" /></a>`
    } else if (settings.cardStyle === "detailed") {
      // Detailed style - includes description and more details
      cardContent = `
        <a href="${repo.url}"><img src="https://github-readme-stats.vercel.app/api/pin/?username=${data.github}&repo=${repo.name}${themeParam}${borderStyle}&show_owner=${settings.showOwner}" alt="${repo.name}" /></a>
        ${settings.showDescription && repo.description ? `<p>${repo.description}</p>` : ""}
        ${settings.showLanguage && repo.language ? `<p><strong>Language:</strong> ${repo.language}</p>` : ""}
        ${settings.showStats ? `<p>⭐ ${repo.stars} | 🍴 ${repo.forks}</p>` : ""}
      `
    } else if (settings.cardStyle === "minimal") {
      // Minimal style - text only, no card
      cardContent = `
        <h4><a href="${repo.url}">${repo.name}</a></h4>
        ${settings.showDescription && repo.description ? `<p>${repo.description}</p>` : ""}
        ${settings.showLanguage && repo.language ? `<code>${repo.language}</code>` : ""}
        ${settings.showStats ? `<small>⭐ ${repo.stars} | 🍴 ${repo.forks}</small>` : ""}
      `
    } else {
      // Default style
      cardContent = `<a href="${repo.url}"><img src="https://github-readme-stats.vercel.app/api/pin/?username=${data.github}&repo=${repo.name}${themeParam}${borderStyle}&show_owner=${settings.showOwner}" alt="${repo.name}" /></a>`
    }

    // Add cell with alignment
    currentRow += `<td align="${settings.alignment}" width="${columnWidth}%">${cardContent}</td>`

    // Close row and start new one if needed
    if ((index + 1) % settings.gridColumns === 0 || index === data.repositories.length - 1) {
      // If this is the last item and we need to fill empty cells
      if (index === data.repositories.length - 1) {
        const emptyCellsNeeded = settings.gridColumns - ((index + 1) % settings.gridColumns)
        if (emptyCellsNeeded !== settings.gridColumns && emptyCellsNeeded > 0) {
          for (let i = 0; i < emptyCellsNeeded; i++) {
            currentRow += `<td width="${columnWidth}%"></td>`
          }
        }
      }

      currentRow += "</tr>"
      tableContent += currentRow

      // Start a new row if not the last item
      if (index < data.repositories.length - 1) {
        currentRow = "<tr>"
      }
    }
  })

  return `<table>\n${tableContent}\n</table>`
}

/**
 * Generates markdown using the Modern template
 */
function generateModernTemplate(data) {
  const { colors } = data
  return `# Hi there, I'm ${data.name} 👋

## ${data.title}

${data.about}

${data.location ? `🌍 Based in ${data.location}` : ""}
${data.company ? `🏢 Currently working at ${data.company}` : ""}
${data.website ? `🌐 Check out my website [${data.website.replace(/^https?:\/\//, "")}](${data.website})` : ""}

### Connect with me:

${data.github ? `[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${data.github})` : ""}
${data.twitter ? `[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/${data.twitter})` : ""}
${data.linkedin ? `[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/${data.linkedin})` : ""}

### Languages and Tools:

${data.skills.map((skill) => `![${skill}](https://img.shields.io/badge/-${skill}-${colors.primary.replace("#", "")}?style=flat-square&logo=${skill.toLowerCase()}&logoColor=white)`).join(" ")}

${
  data.stats
    ? `### GitHub Stats:

![${data.github}'s GitHub stats](https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=radical)`
    : ""
}

${data.topLangs ? `[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=radical)](https://github.com/${data.github})` : ""}

${data.streak ? `[![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=dark)](https://git.io/streak-stats)` : ""}

${data.visitors ? `![Profile views](https://komarev.com/ghpvc/?username=${data.github}&color=brightgreen)` : ""}
${
  data.showContribGraph
    ? `
### GitHub Contribution Graph

![${data.github}'s GitHub Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username=${data.github}&theme=github)`
    : ""
}

${
  data.showTrophies
    ? `
### GitHub Trophies

![${data.github}'s GitHub Trophies](https://github-profile-trophy.vercel.app/?username=${data.github}&theme=flat&row=1&column=6)`
    : ""
}
${
  data.showRepos && data.repositories && data.repositories.length > 0
    ? `
### Featured Repositories

${generateRepositoryCards(data, data.repoSettings)}
`
    : ""
}
${
  data.showProjects && data.projects && data.projects.length > 0
    ? `
### Projects

${data.projects
  .map(
    (project) => `
#### ${project.title}

${project.description}

${project.technologies.map((tech) => `\`${tech}\``).join(" ")}

${project.repoUrl ? `[GitHub Repository](${project.repoUrl})` : ""}
${project.liveUrl ? `[Live Demo](${project.liveUrl})` : ""}
`,
  )
  .join("\n")}
`
    : ""
}
`
}

/**
 * Generates markdown using the Minimal template
 */
function generateMinimalTemplate(data) {
  return `# ${data.name}
> ${data.title}

${data.about}

${data.location || data.company ? "## About" : ""}
${data.location ? `- 📍 ${data.location}` : ""}
${data.company ? `- 💼 ${data.company}` : ""}
${data.website ? `- 🔗 [${data.website.replace(/^https?:\/\//, "")}](${data.website})` : ""}

${data.github || data.twitter || data.linkedin ? "## Links" : ""}
${data.github ? `- [GitHub](https://github.com/${data.github})` : ""}
${data.twitter ? `- [Twitter](https://twitter.com/${data.twitter})` : ""}
${data.linkedin ? `- [LinkedIn](https://linkedin.com/in/${data.linkedin})` : ""}

${
  data.skills.length > 0
    ? `## Skills
\`\`\`
${data.skills.join(" • ")}
\`\`\``
    : ""
}

${
  data.stats
    ? `## Stats
![Stats](https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&hide_title=true&count_private=true&hide_border=true&hide=stars&theme=graywhite)`
    : ""
}

${
  data.topLangs
    ? `## Languages
![Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&hide_border=true&theme=graywhite)`
    : ""
}

${
  data.streak
    ? `## Streak
![Streak](https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&hide_border=true&theme=graywhite)`
    : ""
}
${
  data.showContribGraph
    ? `
## Contributions
![Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username=${data.github}&theme=minimal)`
    : ""
}

${
  data.showTrophies
    ? `
## Trophies
![Trophies](https://github-profile-trophy.vercel.app/?username=${data.github}&theme=flat&row=1&column=6&margin-w=15&no-frame=true)`
    : ""
}

${
  data.showRepos && data.repositories && data.repositories.length > 0
    ? `
## Featured Repositories

${generateRepositoryCards(data, { ...data.repoSettings, cardStyle: "minimal" })}
`
    : ""
}
`
}

/**
 * Generates markdown using the Creative template
 */
function generateCreativeTemplate(data) {
  const { colors } = data
  const primaryColor = colors.primary.replace("#", "")
  const secondaryColor = colors.secondary.replace("#", "")
  const accentColor = colors.accent.replace("#", "")

  return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=${primaryColor},${secondaryColor},${accentColor}&height=200&section=header&text=${encodeURIComponent(data.name)}&fontSize=80&fontAlignY=35&animation=fadeIn" />
  
  # 👨‍💻 ${data.title}
  
  ${data.about}
  
  ${data.location ? `🌏 **${data.location}**` : ""}
  ${data.company ? `🏢 **${data.company}**` : ""}
  ${data.website ? `🌐 **[${data.website.replace(/^https?:\/\//, "")}](${data.website})**` : ""}
  
  ## 🔗 Connect with me
  
  <div>
  ${data.github ? `<a href="https://github.com/${data.github}"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>` : ""}
  ${data.twitter ? `<a href="https://twitter.com/${data.twitter}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>` : ""}
  ${data.linkedin ? `<a href="https://linkedin.com/in/${data.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>` : ""}
  </div>
  
  ## 💻 Tech Stack
  
  <div>
  ${data.skills.map((skill) => `<img src="https://img.shields.io/badge/-${skill}-${colors.primary.replace("#", "")}?style=flat&logo=${skill.toLowerCase()}" alt="${skill}" />`).join(" ")}
  </div>
  
  ${
    data.stats
      ? `## 📊 GitHub Stats
  
  <img src="https://github-profile-trophy.vercel.app/?username=${data.github}&theme=juicyfresh&no-frame=true&row=1&https://github-profile-trophy.vercel.app/?username=${data.github}&theme=juicyfresh&no-frame=true&row=1&column=6&margin-w=15&no-bg=true" alt="GitHub Trophies" />`
      : ""
  }

${
  data.showRepos && data.repositories && data.repositories.length > 0
    ? `
## 🔥 Featured Repositories

${generateRepositoryCards(data, { ...data.repoSettings, theme: "tokyonight" })}
`
    : ""
}

${
  data.showContribGraph
    ? `
## 📈 Contribution Graph

<img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.github}&theme=react-dark" alt="Contribution Graph" />
`
    : ""
}

${
  data.showTrophies
    ? `
## 🏆 GitHub Trophies

<img src="https://github-profile-trophy.vercel.app/?username=${data.github}&theme=onedark&row=1&column=6" alt="GitHub Trophies" />
`
    : ""
}
</div>
`
}

/**
 * Generates markdown using the Developer template
 */
function generateDeveloperTemplate(data) {
  const { colors } = data
  return `
# Hello World 👋

## I'm ${data.name}, a ${data.title}

${data.about}

### Find me on:

${data.github ? `- [GitHub](https://github.com/${data.github})` : ""}
${data.twitter ? `- [Twitter](https://twitter.com/${data.twitter})` : ""}
${data.linkedin ? `- [LinkedIn](https://linkedin.com/in/${data.linkedin})` : ""}
${data.website ? `- [Website](${data.website})` : ""}

### Tech Stack:

${data.skills.map((skill) => `![${skill}](https://img.shields.io/badge/-${skill}-${colors.primary.replace("#", "")}?style=flat-square&logo=${skill.toLowerCase()}&logoColor=white)`).join(" ")}

${
  data.stats
    ? `
### GitHub Stats:

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&theme=dark)`
    : ""
}

${
  data.topLangs
    ? `
### Top Languages:

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact&theme=dark)`
    : ""
}

${
  data.streak
    ? `
### GitHub Streak:

![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${data.github}&theme=dark)`
    : ""
}

${
  data.showContribGraph
    ? `
### Contribution Graph:

![Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username=${data.github}&theme=dark)`
    : ""
}

${
  data.showTrophies
    ? `
### GitHub Trophies:

![GitHub Trophies](https://github-profile-trophy.vercel.app/?username=${data.github}&theme=dark&row=1&column=6)`
    : ""
}

${
  data.showRepos && data.repositories && data.repositories.length > 0
    ? `
### Featured Repositories:

${generateRepositoryCards(data, { ...data.repoSettings, theme: "dark" })}
`
    : ""
}
`
}

/**
 * Generates markdown using the Professional template
 */
function generateProfessionalTemplate(data) {
  return `
# ${data.name}

## ${data.title}

${data.about}

### Contact

${data.location ? `- 📍 ${data.location}` : ""}
${data.website ? `- 🌐 [${data.website.replace(/^https?:\/\//, "")}](${data.website})` : ""}
${data.email ? `- 📧 ${data.email}` : ""}

### Connect

${data.github ? `- [GitHub](https://github.com/${data.github})` : ""}
${data.linkedin ? `- [LinkedIn](https://linkedin.com/in/${data.linkedin})` : ""}
${data.twitter ? `- [Twitter](https://twitter.com/${data.twitter})` : ""}

### Skills

${data.skills.map((skill) => `- ${skill}`).join("\n")}

${
  data.stats
    ? `
### GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true)`
    : ""
}

${
  data.topLangs
    ? `
### Top Languages

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${data.github}&layout=compact)`
    : ""
}

${
  data.streak
    ? `
### GitHub Streak

![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${data.github})`
    : ""
}

${
  data.showContribGraph
    ? `
### Contribution Graph

![Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username=${data.github})`
    : ""
}

${
  data.showTrophies
    ? `
### GitHub Trophies

![GitHub Trophies](https://github-profile-trophy.vercel.app/?username=${data.github}&row=1&column=6)`
    : ""
}

${
  data.showRepos && data.repositories && data.repositories.length > 0
    ? `
### Featured Repositories

${generateRepositoryCards(data, { ...data.repoSettings, cardStyle: "detailed" })}
`
    : ""
}
`
}

/**
 * Generates markdown using the Elegant template
 */
function generateElegantTemplate(data) {
  const { colors } = data
  return `
<div align="center">
    <h1>Hi 👋, I'm ${data.name}</h1>
    <p>A passionate ${data.title} from ${data.location}</p>
</div>

---

### About me 🤔

${data.about}

---

### 🛠 Technologies

${data.skills.map((skill) => `<img src="https://img.shields.io/badge/-${skill}-${colors.primary.replace("#", "")}?style=flat-square&logo=${skill.toLowerCase()}&logoColor=white" alt="${skill}" />`).join(" ")}

---

### 🔗 Let's connect!

<p>
    ${data.github ? `<a href="https://github.com/${data.github}"><img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="Github" /></a>` : ""}
    ${data.linkedin ? `<a href="https://linkedin.com/in/${data.linkedin}"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>` : ""}
    ${data.twitter ? `<a href="https://twitter.com/${data.twitter}"><img src="https://img.shields.io/badge/twitter-%231DA1F2.svg?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>` : ""}
</p>

---

${
  data.stats
    ? `
### 📊 GitHub Stats

<p align="center">
    <img src="https://github-readme-stats.vercel.app/api?username=${data.github}&show_icons=true&locale=en" alt="GitHub Stats" />
</p>
`
    : ""
}

${
  data.topLangs
    ? `
### 🏆 Top Languages

<p align="center">
    <img src="https://github-readme-stats.vercel.app/api/top-langs?username=${data.github}&show_icons=true&locale=en&layout=compact" alt="Top Languages" />
</p>
`
    : ""
}

${
  data.streak
    ? `
### 🔥 GitHub Streak

<p align="center">
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.github}" alt="GitHub Streak" />
</p>
`
    : ""
}

${
  data.showContribGraph
    ? `
### ⚡️ Contribution Graph

<p align="center">
    <img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.github}" alt="Contribution Graph" />
</p>
`
    : ""
}

${
  data.showTrophies
    ? `
### 🏅 GitHub Trophies

<p align="center">
    <img src="https://github-profile-trophy.vercel.app/?username=${data.github}&theme=radical" alt="GitHub Trophies" />
</p>
`
    : ""
}

${
  data.showRepos && data.repositories && data.repositories.length > 0
    ? `
### 📚 Featured Repositories

${generateRepositoryCards(data, { ...data.repoSettings, theme: "radical", alignment: "center" })}
`
    : ""
}
`
}
