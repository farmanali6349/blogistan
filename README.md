# Blogistan

Blogistan is a full-featured blog application that provides user authentication, blog creation, and category management. It is designed for authors to easily manage their content and for readers to seamlessly explore blogs by authors and categories. This repository contains the complete source code for the Blogistan web application.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Pages](#pages)
- [Data Model](#data-model)
- [Technology Stack](#technology-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

## Overview

Blogistan is built as a comprehensive solution for managing blog content. The application supports user authentication, blog creation and categorization, and offers a responsive user interface. It is structured to allow authors to not only write and manage blog posts but also to organize content via categories. Readers can explore content through dedicated pages for authors and categories.

## Features

- **User Authentication**:

  - **Login**
  - **Signup**
  - **Logout**

- **Blog Management**:

  - Create, update, and delete blog posts
  - Each blog post includes:
    - **Title** (string)
    - **Content** (string)
    - **Author** (relationship)
    - **Featured Image** (string)
    - **Categories** (relationship)
    - **Featured Image Preview**

- **Category Management**:

  - Create, update, and delete categories (except the default "uncategorized" category which cannot be edited or deleted)
  - Each category includes:
    - **Name** (string)
    - Associated blogs (relationship)
    - **Author** (relationship)

- **Author Management**:

  - Each author profile includes:
    - **Name** (string)
    - **Email** (string)
    - **Bio** (string)
    - Social media links (Facebook, Instagram, LinkedIn, Medium, and an additional field `x`)
    - Blogs and categories they manage (relationships)

- **Responsive Design**:  
  The web application is built to be responsive, ensuring a good user experience on both desktop and mobile devices.

- **Edit Account Page**:  
  Authors can update their profile details and change their password.

## Pages

- **Home Page**:  
  Displays the latest blogs at the top.

- **Author Page**:  
  Allows users to explore an author's blogs and related categories.

- **Category Page**:  
  Displays blogs that belong to a selected category.

- **Edit Account Page**:  
  Enables authors to update their profile information and password.

## Data Model

### Blog

- **title**: `string`
- **content**: `string`
- **author**: Relationship with Author
- **featuredImage**: `string`
- **categories**: Relationship with Categories
- **featuredImagePreview**

### Category

- **name**: `string`
- **blogs**: Relationship with Blogs
- **author**: Relationship with Author

### Author

- **name**: `string`
- **email**: `string`
- **bio**: `string`
- **facebook**: `string`
- **instagram**: `string`
- **linkedin**: `string`
- **x**: `string`
- **medium**: `string`
- **blogs**: Relationship with Blogs
- **categories**: Relationship with Categories

## Technology Stack

- **Frontend**: (e.g., React, JS, etc. — specify as applicable)
- **Backend**: (e.g., Appwrite. — Database as a service)
- **Deployment**: [Vercel](https://vercel.com/)
