
# Inbox Grabber

[![GitHub Actions CI](https://github.com/Krish-Parekh/InboxGrab/actions/workflows/ci.yml/badge.svg)](https://github.com/Krish-Parekh/InboxGrab/actions/workflows/ci.yml)

Inbox Grabber is a tool designed to solve a simple yet frustrating problem: downloading all attachments from a specific sender on Gmail at once. This project was born out of the tedious experience of manually downloading countless invoices for tax purposes, a task that should be straightforward but isn't.

The motivation to create this project was reinforced by discussions like this [Reddit post](https://www.reddit.com/r/GMail/comments/1h5hjcz/downloading_all_attachments_from_multiple_emails/), where it's clear many users face the same issue.

## The Problem

Gmail, for all its features, lacks a simple way to download all attachments from a single email address in one go. If you've ever had to download numerous files from the same sender, you know the drill: open each email, find the attachment, and click download, over and over again. This repetitive process is not just time-consuming; it's a significant source of frustration, especially when dealing with a large volume of attachments like invoices, reports, or other important documents.

## The Solution: Secure and Local

Inbox Grabber streamlines this process. By securely connecting to your Gmail account, it allows you to specify a sender's email address and then fetches all the attachments from that sender, making them available for you to download in a single click.

A common concern with tools that access personal data is security. Trusting a third-party website with your attachments can be sketchy. That's why Inbox Grabber is designed to run locally on your machine. By enabling the Gmail API (which is free) and running the application yourself, you maintain complete control over your data. Your attachments are downloaded directly to your computer, without passing through any third-party servers.

## Features

- **Bulk Download:** Download all attachments from a specific sender at once.
- **Secure Authentication:** Uses OAuth 2.0 to securely access your Gmail account without ever storing your password.
- **Run Locally:** Your data stays on your machine, ensuring privacy and security.
- **Simple Interface:** An intuitive and easy-to-use interface that requires no technical expertise.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **Linting and Formatting:** [Biome](https://biomejs.dev/)
- **Testing:** [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 20 or later)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/inbox-grabber.git
    cd inbox-grabber
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add the following variables:

    ```env
    GOOGLE_CLIENT_ID=<your-google-client-id>
    GOOGLE_CLIENT_SECRET=<your-google-client-secret>
    GOOGLE_CLIENT_SCOPE=openid email profile https://www.googleapis.com/auth/gmail.readonly
    NEXTAUTH_SECRET=<your-nextauth-secret>
    NEXTAUTH_URL=http://localhost:3000
    ```

    - You can obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the [Google API Console](https://console.developers.google.com/).
    - `NEXTAUTH_SECRET` can be a randomly generated string.

4.  **Run the development server:**

    ```sh
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1.  **Log in:** Click the "Login with Google" button to securely connect your Gmail account.
2.  **Enter Sender's Email:** In the search form, enter the email address of the sender whose attachments you want to download.
3.  **Download:** A table will appear with all the emails from that sender. Click the download button to get all your attachments.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request