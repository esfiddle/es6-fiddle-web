## Guide to Contributing

We welcome pull requests from first-timers and seasoned veteran programmers alike.
**Follow these steps to contribute:**

1. Star the Repo :star: Click the 'Star' button in the top right!

2. Find an issue to work with the tag '[first-timers-only](https://github.com/esfiddle/esfiddle/labels/first-timers-only)' or '[up-for-grabs](https://github.com/esfiddle/esfiddle/labels/up-for-grabs)'. Or Raise a [new issue](https://github.com/esfiddle/esfiddle/issues/new)

3. Let us know you are working on the issue by commenting on it. Make sure that you submit your pull request within a week of claiming it incase someone else wants to do it. [1]

4. Follow the [Contribution guide](CONTRIBUTE.md) and the [Code of Conduct](CODE_OF_CONDUCT.md)

If you need any help then checkout our [gitter chatroom](https://gitter.im/esfiddle/Lobby).

If you're new to open source or this is your first Pull Request - you can learn by reading the [Official Github How to Contribute to Open Source Guide](https://opensource.guide/how-to-contribute/) or watching the series [How to Contribute to Open Source on Github](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Setup ESFiddle Locally

1. Download and Install MongoDB (or use a remote mongo instance) - https://docs.mongodb.com/manual/installation/
2. Fork and clone the repo (Develop Branch)
3. Create a new branch with a descriptive name of your change - `git checkout -b feature/my-awesome-change`
4. Ensure you are running node versions 6.11 (and above), 7.10 (and above) or 8.1.4 (and above)
   1. You can check your node version by running `node -v`.
5. Run `npm install`
6. Configure mongo in your environment:
   1. Run the command `export MONGODB_URI='mongodb://localhost:27017/fiddles'` - the environment variables name should be 'MONGODB_URI'.
7. Start mongo in a new terminal instance by running `mongod`.
8. Run `npm start` in the same terminal window from step 5. This means the server will start correctly.
9. Make your changes
10. Run `npm test`
11. If the tests pass then commit
12. Submit a PR against the Develop Branch and ensure that TravisCI tests pass
13. Once a pull request has been approved it will be merged into the Develop Branch.
14. Only then once it has gone through a final screening will it be pulled through to the Master branch.

## Need Further Help

We are always willing to provide a helping hand, so please feel free to comment on issues for more information or you can also join us via [gitter](https://gitter.im/esfiddle/Lobby).

#### Footnotes

[1] - If you are unable to work on an issue that week but would still like to do it then let us know when you estimate you will be able to complete it. We don't mind this at all!
