import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

import getDb from "./connection.js";
const connection = await getDb();

async function initializeDatabase() {
  try {

    await connection.exec(`DROP TABLE IF EXISTS users`);
    await connection.exec(`DROP TABLE IF EXISTS blog_posts`);

    
    await connection.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT
      )
    `);

    await connection.exec(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY,
        title TEXT,
        content TEXT
      )
    `);

    const passwordAdmin = process.env.ADMIN_PASSWORD;
    const passwordHashAdmin = await bcrypt.hash(passwordAdmin, 12);

    await connection.run(`
      INSERT INTO users (email, password) 
      VALUES (?, ?)
    `, [
      'jacobuhlig@gmail.com',
      passwordHashAdmin
    ]);
    

    await connection.run(`
      INSERT INTO blog_posts (title, content) 
      VALUES (?, ?)
    `, [
      'Mastering Git Branching: A Comprehensive Guide',
      `Introduction:
      Git branching is an essential feature of the Git version control system that allows developers to work on different features, bug fixes, or experiments concurrently without affecting the main codebase. Mastering Git branching can significantly improve the efficiency and organization of software development projects. This comprehensive guide will cover the fundamentals of Git branching, including creating, merging, and deleting branches, as well as resolving conflicts that may arise during the process.

      Understanding Git Branches
      A Git branch is essentially a pointer to a specific commit in the repository. When you create a new branch, Git creates a new pointer that can be moved independently of other branches. This allows developers to work on different tasks in parallel without interfering with each other's work.

      The default branch in a Git repository is the "main" or "master" branch, which typically represents the stable version of the project. Development work should generally be done in separate branches, which can then be merged back into the main branch once the changes are tested and ready for deployment.

      Creating and Switching Branches
      To create a new branch, use the git checkout -b command followed by the desired branch name:

      $ git checkout -b new-feature
      This command creates a new branch called "new-feature" and switches to it automatically. To switch between branches, use the git checkout command followed by the branch name:

      $ git checkout main
      $ git checkout new-feature
      Merging Branches
      Once you've completed the work on a feature branch, you'll want to merge the changes back into the main branch. First, switch to the target branch (usually "main" or "master"):

      $ git checkout main
      Then, use the git merge command followed by the branch name you want to merge:

      $ git merge new-feature
      Git will attempt to perform a fast-forward merge if possible. If there are conflicting changes in the branches, Git will prompt you to resolve the conflicts before the merge can be completed.

      Resolving Merge Conflicts
      Merge conflicts occur when changes in two branches conflict with each other. Git will highlight the conflicting sections of the code and indicate which branch the changes come from. To resolve a merge conflict, you'll need to edit the affected files, remove the conflict markers, and decide which changes to keep or how to combine them.

      Once you've resolved all conflicts, stage the changes with git add, and then commit the changes using git commit.

      Deleting Branches
      After merging a branch, you may want to delete it to keep your repository clean. To delete a local branch, use the git branch -d command followed by the branch name:

      $ git branch -d new-feature
      If the branch has not been merged and you still want to delete it, use the -D flag instead:

      $ git branch -D new-feature
      Advanced Branching Techniques
      a. Rebasing: Git rebase is an alternative to merging that allows you to integrate changes from one branch into another while maintaining a linear commit history. Rebasing can make the commit history easier to read and understand, but it also involves rewriting the commit history, which can cause issues when working with others.

      b. Cherry-picking: Git cherry-pick allows you to selectively apply individual commits from one branch to another. This can be useful when you want to incorporate specific changes without merging the entire branch.

      Conclusion

      Mastering Git branching is crucial for efficient and organized software development. By understanding how to create, merge, and delete branches, as well as resolve conflicts and use advanced techniques like rebasing and cherry`
    ]);

    await connection.run(`
      INSERT INTO blog_posts (title, content) 
      VALUES (?, ?)
    `, [
      'A Deep Dive into Git Workflows: Comparing Gitflow, GitHub Flow, and More',
      'This is the second blog post.'
    ]);

    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();
