<br />
<div align="center">
  <a href="https://github.com/kysondev/lumix">
    <img src="https://res.cloudinary.com/dyu7ogoqc/image/upload/v1753470067/image_2_ehrhh8.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Lumix</h3>

  <p align="center">
    Create, review, and manage flashcards with AI-assisted tools in a minimal, distraction-free interface.
    <br />
    <a href="https://lumixapp.xyz/"><strong>Learn More »</strong></a>
    <br />
    <br />
    <a href="https://lumixapp.xyz/">View Demo</a>
    ·
    <a href="https://github.com/kysondev/lumix/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/kysondev/lumix/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

## About The Project

[![Product Name Screen Shot](https://res.cloudinary.com/dyu7ogoqc/image/upload/v1753470146/Screenshot_2025-07-25_150132_ivxet8.png)](https://res.cloudinary.com/dyu7ogoqc/image/upload/v1753470146/Screenshot_2025-07-25_150132_ivxet8.png)

**Lumix** is an AI-powered flashcard app built to make studying easier and more effective. Users can turn their notes into flashcards in seconds and study them using three unique modes. The AI study mode adapts to performance and focuses on areas that need the most work. **Lumix** also tracks progress over time and automatically creates new questions based on past mistakes, so studying stays personalized and efficient. Whether it's for test prep or daily review, Lumix helps students study smarter, not harder.

### Tech Stack

- NextJS
- TypeScript
- PostgreSQL (Primary Database)
- Redis (Secondary Database)
- Prisma (For building db schema)
- Kysely (For building db query)
- TailwindCSS
- ShadCN
- Better-Auth

## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kysondev/lumix.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Copy the environment example file and update with your API keys
   ```sh
   cp .env.example .env
   ```
4. Enter API Keys in `.env`
   ```js
   API_KEYs = "ENTER YOUR API";
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin kysondev/lumix
   git remote -v # confirm the changes
   ```

## Roadmap

- [x] Landing Page
- [x] Authentication & Settings
- [x] Manual Flashcard & Deck creation
- [x] Library & Edit Deck Page
- [x] AI Flashcard Generation
- [x] Classic Flip Study Mode
- [x] Challenge Mode
- [x] AI Adaptive Quiz Mode
- [x] Stripe Payment & Paid Plans
- [ ] Explore Page & Flashcard Sharing
- [ ] Lumi AI Assistant
- [ ] Keyword Based AI Flashcard Generation

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Kyson W. - email@kyson.dev

Project Link: [https://github.com/kysondev/lumix](https://github.com/kysondev/lumix)
