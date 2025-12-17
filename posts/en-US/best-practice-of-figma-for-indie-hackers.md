---
title: Best Practice of Figma for Indie Hackers
date: 2024-01-08T07:37:00.000Z
summary: If you're an indie like me, in this post, I'll share how I manage my team, files, and pages in Figma. This is tailored for solo makers and will boost your work efficiency.
tag: Tech
---


As an indie hacker, you don't need to use Figma like a large organization. Typically, if you're an indie hacker, you may:
- Have several websites for landing or documentation, or an all-in-one like [YGeeker](https://www.ygeeker.com/) created by me
- Have several apps. Some on iOS only, some on multiple platforms, some extensions, etc.
- Work solo most of the time. But sometimes your fans or enthusiasts help you with an icon, a page, etc.

If you're an indie like me, in this post, I'll share how I manage my team, files, and pages in Figma. This is tailored for solo makers and will boost your work efficiency.

## Pages

Your assets in Figma looks like this:

![Image](/image/post/204f41b9-e879-44a2-b0a8-6a2422ec9f2a_Untitled.png)

Typically we put each screen in a Frame.

It’s not recommended to put all frames in one page. Instead, use new page for a new screen. The space in the editor allows you try different ideas. Good design needs tries, tries, and retries. Besides, if a page is for a component (such as buttons), you may need to create variants for that, so it’s always a good idea to leave more space. Trust me, you won’t like navigating by dragging your pointer and find the frame in a mess.

Here’s the Newsroom page (a single page in Figma) created by my colleague for the [Newsroom](https://www.ygeeker.com/newsroom) page of YGeeker. A perfect example:

![Image](/image/post/c132802b-8ae8-4e52-ac0a-4abebdb35560_Screenshot_2024-03-07_at_17.27.31.png)

A golden test is use Notion’s Figma block. If you can clearly catch the whole page without opening it, you’re seperating pages correctly. By keeping every page minimal you can easily view them directly from notion:

![Image](/image/post/f61af507-8973-419c-8577-57b683f7ab49_Screenshot_2024-03-07_at_20.26.53.png)

Additionally, you can sort your page alphabetically for faster navigating.

![Image](/image/post/1eafb222-9e9c-4005-ad6b-81e8753b5549_Screenshot_2024-03-07_at_17.20.22.png)

## Team, Project, File

You're the only one in the team.

![Image](/image/post/4b75d573-0ec6-428a-b277-969acb716a6d_Untitled.png)

It's advisable to use a single team and one project for each app or website. For instance, if your app "Landmark" has an iOS client, a landing page, and a basic backend UI, you could organize them separately like this:
- Team - My Super Team
  - Project - Landmark: Landing.figma, backend.figma, etc
  - Project - ClipMemo: Icons.figma, Prototypes.figma, Shortlisting materials.figma, etc.
  - Project - Social Content: Your build-in-public screenshot, poster, video cover, etc.

Instead of cramming all pages and components into one Figma file, consider separating them. Just as you wouldn't put all components and hooks into a single .tsx file in a React project, use Figma's scalable file functionality to create separate, autonomous files.

Use Figma's component and variable system for quick copy-and-pasting. Need an external design system (Tailwind, MD, etc)? Drag them from your Draft to one of the project, then publish them.

What’s more, as Figma display a “Project/Filename” at the top of the editor, by doing these you can avoid naming a file too long such as “ClipMemo App”.

![Image](/image/post/474bfb01-5c82-469f-bf10-4c444f7ab4f6_Screenshot_2024-03-07_at_17.35.56.png)

## Components & Variables

Use components and variables across your team to streamline your design process. Components are reusable design elements, while variables allow you to define and manage design tokens.

### Components

Components in Figma are powerful tools for maintaining consistency and efficiency:
- Create components for frequently used elements like buttons, icons, and form fields.
- Use instances of components across your designs for easy updates and maintenance.
- Utilize variants to create flexible components with different states or styles.

### Variables

Variables in Figma help manage design tokens and create more dynamic designs:
- Define color, typography, and spacing variables for consistent branding.
- Use boolean variables to create interactive prototypes with conditional visibility.
- Leverage number variables for responsive designs that adapt to different screen sizes.

Using components and variables can significantly decrease your file size, improve consistency, and save time in your design process. BTW, they are shared across the whole project, but you need to add the library first if you need them in a file.

Therefore, it's practical to make a component for each logo/icon. Additionally, you can use color variables to ensure consistent branding across all your designs, making it easy to update your color scheme globally if needed.

![Image](/image/post/643b5d98-9bc2-44da-a710-5c0c975f7ec0_Screenshot_2024-03-07_at_17.32.02.png)



## Recap
- Keep frame count minimal in one page
- Keep files as small and nimble as possible
- Each product takes a project
- Prefer Figma’s component & variable system
- Create component for each product icon

## Read More
- [https://www.figma.com/best-practices/team-file-organization](https://www.figma.com/best-practices/team-file-organization/#by-pillars)
- [https://help.figma.com/hc/en-us/sections/4403935997847-Components](https://help.figma.com/hc/en-us/sections/4403935997847-Components)



💡 Feel free to comment or drop me an email.


