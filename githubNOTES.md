## Git Scm tool
please install git scm command line tool from the link below

[Git SCM Tool](https://git-scm.com/)

# Steps for Github
1. Install Git Hub tool
2. Creat a git hub repository 
   1. Select Public/Private
   2. Select the .gitignore -- "Use appropriate Language e.g. NodeJS"
   3. You might select licence
3. check the git version using
   > git -v
4. Copy the contents of the github newly created rep .gitignore file and create a new .gitignore file locally and past it in the file
5. Add a Readme.md file locally as well
6. Initialise the existing folder as a new github repo/proj
   > git init
7. Add the exisitng file and folders and git command will ignore the files mentioned in .gitignore file
   > git add .
        or 
   > git add -A
        or
   > git add "filename"
8. Note: you can get the help of a available git commands using 
   > git help
9. Check the branch if it's **main** or **master**. The old github use to create the **master** branch but now it's the **main** branch which is default brach.
10. If you tool created a **master** branch then change/update it to **main** brach using the command below
    > -- check the branch 
    > git branch // Shows all available branches
    > git branch -a // Shows active brance

    Change from master to main branch
      > git branch -m main
11. Add the remote github to the ""origin". Go and copy the path of your github repo where you want to push all your files/folder 
    > git remote add origin https://github.com/ella13162/WebApp-Assignment.git

    You can confirm the remote origin by using command
    > git remote -v
12. If you don't have any existing project and you want to **clone** existing project from github you can clone it like
    > git clone "Path of you github rep.git"
13. Add commit or comment
    > git commit -m "initial commit"
14. Check the status which file/folder will be added to remote repo
    > git status
15. Push all your files/folder to the Github
    > git push -u -f origin "name of your branch"

    e.g.
    > git push -u -f origin main // use this command for the first time

    if you already pushed your repo then use the simple push command
    > git push origin main

## Summary of Github Command
### clone existing project
    > git clone https://github.com/ella13162/WebApp-Assignment.git
### Steps for making existing folder as repo
> git init
> git branch -m main
> git add .
> git commit -m "Initial Commit"
> git remote add origin "link to your repository"
> git push -u -f origin main // First time
> git push origin main    


# Git Pull command for Collobaration project
> git pull "path to the repo"
> 