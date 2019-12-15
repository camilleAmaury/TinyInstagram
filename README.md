[![LinkedIn AB][linkedin-shield]][linkedin-url-2]
[![LinkedIn CAJ][linkedin-shield]][linkedin-url-3]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/camilleAmaury/TinyInstagram">
    <img src="images/univnantes.png" alt="Logo">
  </a>

  <h3 align="center">TinyInsta</h3>

  <p align="center">
    Marwa Rjafallah - Aniss Bentebib - Camille-Amaury Juge
    <br />
    <br />
    <a href="http://tinyinstagramfront.appspot.com/">View Demo</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [API endpoints](#api-endpoints)
  * [Sign Up](#sign-up)
  * [Log In](#log-in)
  * [Get Posts](#get-posts)
  * [Get Likes](#get-likes)
  * [Get Profile](#get-profile)
  * [Add Post](#addpost)
  * [Follow](#follow)
  * [Like](#like)
* [Benchmark](#benchmark)
* [React interface](#react-interface)
* [License](#license)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project


See the file 'tinyInsta.pdf' to understand the major problems of this exercise.


### Built With
Major Languages, frameworks and IDE uses.
* [Google Cloud endpoint](https://cloud.google.com/endpoints/)
* [Java](https://www.java.com/fr/download/)
* [React.js](https://fr.reactjs.org/)
* [R](https://www.r-project.org/)
* [Intellij IDEA - Eclipse]
* [Visual Studio code](https://code.visualstudio.com/)
* [Jupyter Notebook](https://jupyter.org/)


## Getting Started

If the project URL doesn't work, you can manually install it localy.

### Prerequisites

You will need :
* Node.js / npm
* an IDE for React.js/javascript if you want to explore the front's code
* and IDE for Java if you want to explore the API's code

### Installation

1. Clone the repo
```sh
git clone https://github.com/camilleAmaury/TinyInstagram.git
```
2. Install NPM packages
```sh
npm i
```
3. Launch the front
```sh
npm start
```

## API endpoints

This part was mostly done by Aniss Bentebib.

### Sign Up

```sh
GET BASEURL/register
```

```Javascript
params = {
	email:'...@...',
	password:'...',
	firstname:'...',
	lastname:'...'
}
```

```Javascript
return = ["0" or "1", "message"] 
// 0 --> didn't worked, 1 --> worked
// "message" --> error message if 0
```

Register a new User

### Log In

```sh
GET BASEURL/login
```

```Javascript
params = {
	email:'...@...',
	password:'...'
}
```


```Javascript
return = ["0" or "1", "iduser" or "erromessage", "firstname", "lastname"] 
// 0 --> didn't worked, 1 --> worked
// "message" --> error message if 0
// else iduser + firstname + lastname if 1
```

### Get Posts

```sh
GET BASEURL/getposts
```

```Javascript
params = {
	max:'...@...', // min(number of day minus curent date + max, current date)
	min:'...', // number of day minus current date
	n:'...' // optionnal : return all 1 to n last posts
}
```

```Javascript
return = [["posts"]] 
// List with all posts
```

### Get Likes

```sh
GET BASEURL/getlike
```

```Javascript
params = {
	id_post:'...', // the post
	id_user:'...' // user currently using react
}
```

```Javascript
return = ["122","0" or "1"] 
// "122" --> number of likes
// 0 --> user didn't liked, 1 --> user liked
```

### Get Profile

```sh
GET BASEURL/getprofile
```

```Javascript
params = {
	id_user:'...' // user wanted profile
}
```

```Javascript
return = [["followers"],["followed"], ["posts"], "firstname", "lastname", ["followers' name"], ["followed's name"]]
```

### Add Post

```sh
GET BASEURL/addpost
```

```Javascript
params = {
	description:'...@...',
	id_user:'...',
	picture:'...',
	tags:'...'
}
```

```Javascript
return = ["0" or "1", "error message"]
// 0 --> didn't worked, 1 --> worked
// "message" --> error message if 0
```

### Follow

```sh
GET BASEURL/follow
```

```Javascript
params = {
	id1:'...@...', // users want to follow
	id2:'...' // users followed
```

```Javascript
return = ["0" or "1", "error message"]
// 0 --> didn't worked, 1 --> worked
// "message" --> error message if 0
```


Note that if you have already followed an user, it will unfollow

### Like

```sh
GET BASEURL/likepost
```

```Javascript
params = {
	id_post:'...', // the post
	id_user:'...' // user currently using react
}
```

```Javascript
return = ["0" or "1", "error message"]
// 0 --> didn't worked, 1 --> worked
// "message" --> error message if 0
```

Note that if you have already liked a post, it will drop the like


## Choice explanations

- Like implementation : 
	Like is a Type :
		Entities are compounded of (iduser, idposts)

		Then we have a number of Entities which corresponds to the number of likes (it enables us to keep who liked what)
		In a scaling environnement, it enables to add a lot of entities without accessing the same datas.


- Follow implementation : 
	Follow is a Type :
		Entities are compounded of (iduserFollower, iduserFollowed)

		Then we have a number of Entities which corresponds to the number of followers / followed (it enables us to keep who follow who)
		In a scaling environnement, it enables to add a lot of entities without accessing the same datas.

- Image :
	We choosed to only transfer a path representing the path to the react server public folder in the database.
	In our project, it will store the image in this file, the fact is in a little project like our it is working very well.

	Nethertheless, in a big data environnement, we should transfer the image as blob in the datastore. Else we would overcharge the react server.

- Post implementation : 
	Post is a Type:
		Entities are compounded of (idpost, date, description, iduser, picture, tags)

- User implementation : 
	User is a Type:
		Entities are compounded of (iduser, firstname, lastname, email, password)




## Benchmark

This part was mostly done by Camille-Amaury Juge.

See the following react url, we decided to collect data via our website :
* "BASEURL/createUsersBenchmark" --> to create multiple users
* "BASEURL/likeperonesecond" --> to get some datas of the number like per second (time)
* "BASEURL/retrievePosts" --> to retrieve a specified number of posts (time)

We decided to use R, which is one of the best language to explains dataset and visualize results.
Moreover it enables us to use Jupyter notebook, which is a really great tool to quick implementation and markdown.

See the two files :
* "project/BenchMark.ypnb" --> to get the jupyter notebook used to the benchmark
* "project/BenchMark.html" --> to see in a navigator the result of the benchmark
* "project/file.csv" --> the used csv data we had collected in our website


<!-- CONTRIBUTING -->
## React interface

This part was mostly done by Marwa Rjafallah and Camille-Amaury Juge.

See the code.



## License

Some documents are the possession of the Nantes university and the professor Pascal Molli. You are not allowed to use those documents in a commercial way.

You can personnally dispose of everything else here, but you do have to mention our project link if you plan to use it as a reference for a public/school project or anything else that rely on the non-only personnal usage. 


## Contact

See Linkedin's Shield right at the top of the Readme.md.



[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url-2]: https://www.linkedin.com/in/aniss-bentebib-a449a8155/
[linkedin-url-3]: https://www.linkedin.com/in/camille-amaury-juge/