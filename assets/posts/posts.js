var CONTENT = {
    "items": [
        {
            "title": "Git Internals: .git folder structure",
            "pub_date": 1510107861693,
            "tags": ["help", "git", "howto"],
            "section": "Tech",
            "content_type": "blog",
            "full_content": {
                "paragraphs": [
                    "Recently at work, I ran into one of those once-in-a-blue-moon git issues that generally end up being solved with creative Googling and git magic. I wanted to understand what went wrong, so I took a deeper dive into git's internals and learned something useful.",
                    "Git keeps references on your local filesystem for each branch and remote that it tracks. You can use slashes in your branch names, but these get translated into filesystem slashes, i.e. folders, when you do.",
                    "This becomes problematic when you start essentially referencing something that doesn't exist."
                ],
                "links": [
                    "http://github.com"
                ]
            }
        }
    ]
}