# 📝 Blogistan

### 🔗 Live Link

- [🌐 Live Site](https://blogistan.netlify.app/)
- [📂 GitHub Repo](https://github.com/farmanali6349/blogistan)

## 📸 Screenshot

![Blogistan Screenshot](blogistan.png)

## 🗓️ Published On

**February 6, 2025**

---

## 📖 Overview

**Blogistan** is a full-featured blog platform designed to empower authors and engage readers. With built-in **user authentication**, **blog creation**, **category management**, and a **responsive design**, it offers a seamless writing and reading experience.

Authors can manage blogs and categories, while readers can explore content by category or author. Blogistan is perfect for writers looking to build their presence and for readers searching for high-quality, organized content.

---

## ✨ Features

### 🔐 User Authentication

- **Login**
- **Signup**
- **Logout**

### 📝 Blog Management

- Create, update, delete blog posts
- Each blog includes:
  - Title
  - Rich content
  - Featured image with preview
  - Author info
  - Category tags

### 🗂️ Category Management

- Create, update, delete categories
- Default category "Uncategorized" is protected
- Each category includes:
  - Name
  - Linked blogs
  - Category creator (author)

### 👤 Author Management

- Author profiles include:
  - Name
  - Email
  - Bio
  - Social media links (Facebook, Instagram, LinkedIn, Medium, X)
  - List of authored blogs and created categories

### 🖥️ Responsive Design

- Fully responsive UI
- Works smoothly on desktop, tablet, and mobile devices

### ⚙️ Edit Account Page

- Update personal details
- Change password securely

---

## 🗂️ Pages

- **Home Page** – Shows the latest blog posts
- **Author Page** – Lists all blogs and categories created by a specific author
- **Category Page** – Displays blogs from a selected category
- **Edit Account Page** – Lets users update their profile and password

---

## 🧩 Data Model

### Blog

```ts
{
  title: string;
  content: string;
  featuredImage: string;
  author: Author;
  categories: Category[];
}
```

### Categories

```ts
{
  name: string;
  blogs: Blog[];
  author: Author;
}
```

### Author

```ts
{
  name: string;
  email: string;
  bio: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  x: string;
  medium: string;
  blogs: Blog[];
  categories: Category[];
}
```

### ⚙️ Tech Stack

- Frontend: React.js, Tailwind CSS

- Backend: Appwrite (Database, Auth, Storage)

- Deployment: Netlify

# 🚀 Setup & Installation

Clone the repository
git clone `https://github.com/farmanali6349/blogistan`

Navigate into the project directory
`cd blogistan`

Install dependencies
`npm install`

Configure Appwrite backend (Use Appwrite console to set up project, collections, and environment variables)

Start development server
`npm run dev`

### 📦 Deployment

The project is deployed on [Netlify](https://blogistan.netlify.app/). You can deploy your own version by connecting the GitHub repo and setting environment variables for Appwrite.

### 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo, open issues, and submit pull requests.

### 📬 Contact

- Name: **Farman Ali**
- Portfolio: [farmanali.fun](https://farmanali.fun)
- GitHub: [farmanali6349](https://github.com/farmanali6349/)
- **Linkedin**: [farmanali6349](https://www.linkedin.com/in/farmanali6349/)
