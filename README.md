# Scribl Notes

A simple, responsive note-taking web application built with **HTML, CSS, and JavaScript**. Scribl Notes enables users to create, organize, edit, search, and export notes. The project was developed as part of the **INS205 – Application Design and Development** assessment and has been containerized using **Docker** for easy deployment and distribution.

<img width="800" height="350" alt="" src="https://github.com/user-attachments/assets/c7aae296-5dd5-4b13-b796-b63fa769846b" />

---

##  Project Requirements
1. You are tasked to build a web application of your choice. This can be a simple application or a complex application of your choice.
2. Containerize the application using Docker.
3. Create a project for this work and make sure all the files for this work are in the project. Ensure the project is accessible to the public. Kindly note the repo must contain a README in which you can explain your work. Extra points will be given for a well written one.
4. The image of the application created should be hosted on dockerhub. The image sent to dockerhub should have an appropriate tag and this image must be publicly assessible.

---

## Application Features
- Create new notes
- Delete notes
- Filter based on tags.
- Rich text editing with Quill.js
- Export notes as PDF
- Local Storage persistence
- Responsive design across all devices

---

# Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Docker
- Git
- GitHub

### Libraries

- Quill.js
- html2pdf.js
  

---

# Project Structure

```text
scribl-notes/
│
├── index.html
├── style.css
├── script.js
├── Dockerfile
├── .dockerignore
├── README.md
└── assets/
```

---

# Installation Guide

## To run Locally:

### 1. Clone the repository

```bash
git clone https://github.com/zoeyahmi/scribl-notes.git
```

### 2. Navigate into the project folder

```bash
cd scribl-notes
```

### 3. Open the project

Open the project using **Visual Studio Code** or your preferred code editor.

### 4. Launch the application

Open the `index.html` file in your browser, or use the **Live Server** extension in Visual Studio Code.

---

##  To run with Docker:

### Build the Docker image

```bash
docker build -t scribl-notes-app .
```

### Run the Docker container

```bash
docker run -d -p 8080:80 --name scribl-notes scribl-notes-app
```

Open your browser and visit:

```
http://localhost:8080
```


---

# Resource Acknowledgements

This project makes use of the following open-source resources:

- **Flaticon** - [notes icon](https://www.flaticon.com/free-icons/writing)
- **Quill.js**
- **html2pdf.js** 
- **Font Awesome**
- **Huge Icons**
- **Google fonts**

Special thanks to the developers and contributors of these libraries for making them freely available to the developer community.


---

# License

This project was developed for educational purposes as part of the **INS205 – Application Design and Development** course assessment.