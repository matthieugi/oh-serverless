# Git basics

Create a working branche for yourself
```
git checkout -b dev/myname
```
-> this creates a branch as an exact copy of the branch you were on before
check this with 
```
git branch
```
-> this should put a star next to the branch you are in.

Make sure that before you add/commit your own changes before you attempt to switch branches:

### Standard workflow:
```
# make changes in your branch.
git add .       # this stages any file (.) in the current directory
                # ensure you are in the root of the repo when you do this!
git commit -m 'my commit message for the work I've just done' 
                # do this often
git push        # the first time, git will tell you to configure the branch - just follow instructions
```

### How to get your changes into master (optional)
Use the pull request feature in the github UI once you've pushed to your own branch.

### How to get master changes into your working branch
Only once you've committed and pushed your changes to your working branch - check with `git status` that you're all clear

Then

```
git checkout master
git pull            # or git rebase - read up on the diffreences, pull is good enought for now
                    # you now have all the latest changes from others in your local copy

git checkout dev/myname
git merge master
```

if there are merge conflicts, let's talk :)




# Challenge 1: pre-reqs
- Azure function core tools (v3)
- nvm/node (we're going for v12...)
- log out/in of Azure in VSCode (Command pallette > Azure: Sign Out/Sign In)
    - make sure to have previously used a browser that is not logged into your work account
- VSCode Functions extension
- VSCode Storage extension
- install postman
- set up git
    - recommend setting up your machine with an ssh key to link your github account. ([docs](https://www.freecodecamp.org/news/git-ssh-how-to/))

