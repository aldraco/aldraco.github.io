## Git folder structure and naming conventions

<span markdown="1" class="pubDate">November 27, 2017</span>

Recently at work, I ran into one of those once-in-a-while git issues that generally end up being solved with creative Googling and git magic. This time, though, I wanted to understand a little more about how git works.

####The problem

I was developing a new feature with a colleague, so we had two branches going that we were rebasing against each other as we went.

```
feature-name/my-branch
feature-name/his-branch
```

At some point, we decided it was time to merge our branches into one consolidated effort. At the time, it made sense to me to name the new branch simply `feature-name`. I attempted to deploy this branch but git on the target machine started throwing errors, saying that

```
>>> error: 'refs/remotes/origin/feature-name/my-branch' exists; cannot create 'refs/remotes/origin/feature-name'
>>> error: some local refs could not be updated; try running git remote prune origin' to remove any old, conflicting branches
```

Fortunately, git tells you the solution.

####Solution(s)
 - run `git prune` if you can

Unfortunately, I didn’t have permission to run git while ssh'ed on the target server. I did, however, have permission to edit files, which is where learning a little more about how git works came in handy.

on server:
 - find `$PROJECT_DIR/.git/refs/old-branch-name` and delete it
 - find `$PROJECT_DIR/.git/refs/packed-refs`, delete any references here to the old (short name) branch
 
locally:
 - `git checkout -b new branch name` **which has the same number of path segments as the branch name with the most segments** (more below)
 - try deploying/checking out the new branch

All you're doing is manually scrubbing references to the offending branch, instead of having `git prune` do it for you.

The real "magic" behind git turns out to simply be git commit hashes. Each one references a snapshot of your working directory at any given time. A commit history is a series of snapshots, and references to a HEAD of a branch or a remote, for example, is really just a reference to a git commit hash.

Try it yourself and see that running the following shows the last commit hash in your master branch. Start at your project directory's root:

```
$ cat .git/refs/heads/master
```

Now, if you run this instead while the master branch is checked out, you'll see a reference to the file above:

```
$ cat .git/HEAD
```

Each branch, remote, or tag is just a point in time in the project's history, and can be described using git hashes. References, or refs, to these hashes are organized in the `.git` folder by branch name.


####Preventative measures
 - give branch names within a project the same depth of path segments.

The root of the issue was the __depth__ of my branch name. Git lets you name branches like files - including backslashes. Logical conventions for a project with several active branches might be:

```
fix/feature-being-fixed
feature/new-feature-name
hotfix/thing-that-broke
```

What this means is that if you have created a file already at `$PROJECT/.git/refs/heads/feature/my-branch`, then `feature` is now a folder. Since you can’t create a file at a location that is already a folder, trying to create a new branch named feature results in an attempt to create a file at `$PROJECT/.git/refs/heads/feature` — but that’s already a directory. Oops!

If you’re set on using the /feature/ path segment, you can always name it `feature/main` or `feature/github_username` instead.

What is **packed-refs**? The packed-refs file acts somewhat like a super directory, and allows for saving space in some large projects. (In my case, deleting the regular ref wasn't enough since git also looks here.)

Run `git pack-refs --all` to create this file, which will delete the default ref files in favor of this super-reference. Subsequent ref updates are stored normally, meaning branches that aren't updated often don't need to take up space. This can be handy on a project with many contributors, branches, or tags/versions. More [here](https://git-scm.com/docs/git-pack-refs).




Hope this helps someone!


helpful online book: <https://git-scm.com>