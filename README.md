![alt_text](https://www.onramp.io/assets/onramp-blue.svg "Onramp Logo")

# Onramp Full Stack Take-Home Project

## Overview 🗒

Congratulations for making it this far in the interview process for the Twitch Apprenticeship at Onramp!

This project seeks to better inform the Onramp team of your experience with JavaScript (specifically TypeScript) programming and fullstack development as well as prepare you for your interview at Twitch.

You will have seven days to complete this project. We expect those who have a moderate level of software development experience to spend between 30 and 40 hours to design, implement, document, and submit the project to us. Depending on your level, it may take more or less time, so please plan accordingly.

**The project is due on Wednesday, January 13 at 9:00am PT/ 12:00pm ET**

### Project Summary:
- Total time available to complete: 7 days
- Due date/time: Wednesday, January 13 at 9:00am PT/ 12:00pm ET
- Expected development time to complete: 30 - 40 hours


## Description and Details 🔎

For this project, we want you to build a web application **using TypeScript** that is **one** of the following:
- A newsfeed app
- A weather app
- A photo gallery
- An audio/video playback app

Consider which of these projects you’d be most excited to work on, not what you think your interviewers or Onramp would like to see.

**Scope your features and functionality to what you can reasonably accomplish by the due date. Your application must include the following architectural requirements:**

- Use a modern JS Library/Framework like React, Angular, etc. We suggest using React.js and have included it in the project skeleton.
- Create an application that can be interacted with in a minimum of three different ways by the user.
- Use of at least one Service.
- The usage of a specified architectural pattern (MVC, MVP, MVVM,  etc.)
- Use of a [REST API](https://medium.com/@arteko/the-best-way-to-use-rest-apis-in-swift-95e10696c980).
- Usage of at least 5 UI components from the [material-ui/@core](https://material-ui.com/) library (if you are not using React, a comparable UI library is acceptable)
- An example of a reusable UI component that you have created and used in the app. This should be different than the 5 UI components from the vendor library.

*Note: you will need to detail where and how your Web App meets these requirements in your repository's [requirements.md](requirements.md) file when you submit your project.*

## Researching and Plagiarism

You are actively encouraged to research the web, books, videos, or tutorials for this project. That said, we expect all code that is submitted to be your own (e.g. this project should **NOT** be completed with another person). That means that we expect each candidate to refrain from copying and/or pasting code into the project. If we find copied code in your project, we will have to disqualify you.


## What we're looking for 🌟

We will evaluate your project by assessing the overall strength and quality of the following five factors:


#### Languages
We expect you to learn and use  JavaScript compiled via TypeScript in this project. The backend should run on an Express server written in Node.js.

#### UI Design

Accessibility is increasingly becoming a critical component in developing website and web experiences. Your web app should include thoughtful design around how users using screen readers or with impaired vision might experience your app.

#### Architecture Pattern

An architecture pattern enables you to define a guide for how a piece of software should function, such that it can be scalable, maintainable, and testable. Common patterns for web applications include [MVC](https://www.raywenderlich.com/1000705-model-view-controller-mvc-in-ios-a-modern-approach) (Model View Controller), [MVVM](https://www.raywenderlich.com/34-design-patterns-by-tutorials-mvvm) (Model View ViewModel), and [MVP](https://www.vogella.com/tutorials/AndroidArchitecture/article.html) (Model View Presenter). You can select which you want to implement.


#### Core Web Principles


HTML, CSS, and JavaScript are commonly used languages to build websites. Each serves a distinct purpose in creating a cohesive experience for the end-user. While there are several ways to express HTML and CSS via modern-day frameworks, your creation should make use of semantic HTML tags and CSS styles should appear consistently across the latest versions of Safari, Firefox, and Chrome.

#### Web Development Best Practices

It's important to subscribe to a set of best practices when designing and implementing an Android app. Be mindful of these widely accepted principles:

-   [DRY](https://code.tutsplus.com/tutorials/3-key-software-principles-you-must-understand--net-25161) (don't repeat yourself). Also view this [Wikipedia article](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).
-   Maintain a [separation of concerns](https://www.youtube.com/watch?v=VtF6aebWe58) within your UI components
-   Specify good [project structure](https://gist.github.com/lancejpollard/1398757). There is no required structure, but you should be able to justify why you organized your project as you did.
- For more best practices, look to [web.dev](https://web.dev/). They also have a way to audit and measure your site’s performance.

Using these principles will result in a high quality user experience while efficiently utilizing browser resources and ensuring other developers can easily navigate through your code.

#### Project Repository Description

Each project submission must include a README file providing an overview of the web application, instructions to install and start the app, and details the app's overall architecture pattern. There should also be documentation to describe the expected payload and response for at least one route of the REST API.

We've provided some barebones directories to get you started. To start the client:
```
cd client
npm install # or `yarn`
npm start # or `yarn start`
```

The client will run on http://localhost:3000. We created this directory using `create-react-app` but if you are not using React, feel free to remove these files and implement a framework of your choice.

To start the server:
```
cd server
npm install # or `yarn`
npm start # or `yarn start`
```

The server will run on http://localhost:8080. There are two example routes that have been provided: `/api` and `/api/users`.


Screenshots of the app where distinct design decisions were made should also be included. This task assesses the critical competency of communicating and documenting technical concepts.

#### Version Control

We expect you to attempt to use version control best practices in your project. We will evaluate this by looking at the frequency of commits, commit messages, and diffs. We don’t expect you to be a pro with git, but we do expect you to be able to commit frequently rather than committing everything all at once.

### What we are NOT evaluating
#### Testing
Testing frameworks and strategies are intentionally NOT included within the rubric because we want you to dedicate your time to building a functional application. We do realize that UI component testing are critical practices of web development, but this take home project prioritizes a focus on familiarity of UI component implementation.

#### Feature depth
You won’t be earning extra points for having a bunch of features. Focus on creating a clean, simple application that addresses all of the requirements and is documented properly for submission.

## Submission Information 🚀

#### Submission Format

This repository will be your starting point. Please download (not clone or fork) this Github repository [onramp-fullstack-project](https://github.com/onramp-io/onramp-fullstack-project) and upload changes to a newly created repository. Once your web application has been completed, you'll be submitting a link to the new repository you created. Prior to submitting your project, you should update the [requirements.md](requirements.md) file to provide the following information:
- A high level architectural overview of your web application. e.g. names, relationships and purposes of all components and relevant data models
- Brief description of the architectural design pattern that you leveraged.
- Screenshots of each View and descriptions of the overall user flow as well as any place that you made distinct design decisions.  (Screenshots can be taken via any screenshot capture application or native methods).


#### Submission Deadline + Process

You must submit your project by 9:00am PST/12:00pm EST on January 13, 2020 using [this form](https://docs.google.com/forms/d/e/1FAIpQLSdFBo328et9VHd04fFTZ7MRfIUD5le-jimyl0UccCs3IBYHoQ/viewform). Be sure that your project is viewable by the Onramp team.

Once you’ve submitted your project, you are expected to stop working on it. Any commits that occur after submission or the deadline will not be reviewed.


## Additional Resources 📚

**Onramp Resources:**

Please use the modules and resources in the [Twitch Training Plan](https://www.onramp.io/training/5fb6cf7eac4a67001766281d) for resources and exercises on TypeScript and Version Control.

**Other Resources:**
- [Website Design & Development](https://envisionitagency.com/blog/2018/04/best-practices-for-web-development/)
- [5 Ways to Achieve better accessibility in UI Design](https://www.justinmind.com/blog/prototyping-accessibility-in-web-and-mobile-ui-design/#:~:text=Accessibility%20in%20UI%20design%20leads,all%20users%2C%20regardless%20of%20ability.&text=As%20designers%20who%20want%20to,in%20a%20way%20that's%20accessible.)
- [Ally stands for Accessibility](https://www.a11yproject.com/)
- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A Model View Controller Pattern for React](https://blog.testdouble.com/posts/2019-11-04-react-mvc/)
- [Separation of Concerns](https://youtu.be/VtF6aebWe58)
- [Typescript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Typescript Best Practices](https://engineering.zalando.com/posts/2019/02/typescript-best-practices.html)
- [Lyfe Marketing Web Design Practice](https://www.lyfemarketing.com/blog/web-design-best-practices/)
