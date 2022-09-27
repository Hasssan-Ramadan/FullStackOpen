const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    _id: "5a422aa71b54a676234d17fb",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "493119960a439565123c06e7",
    title: "Who am I",
    author: "Hassan Ramadan",
    url: "https://github.com/rmdanjr/rmdanjr",
    likes: 43,
    __v: 0,
  },
];

const initialUsers = [
  {
    name: "Hassan Ramadan",
    username: "RmdanJr",
    password: "MyPassword",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  initialBlogs.forEach(async (blog) => {
    const blogObject = new Blog(blog);
    await blogObject.save();
  });
  initialUsers.forEach(async (user) => {
    const userObject = new User(user);
    await userObject.save();
  });
});

describe("Test HTTP GET /api/blogs", () => {
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("returned data is in json format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("verifies that the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("Test HTTP POST /api/blogs", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "our hashcode code haha!",
      author: "Hassan Ramadan",
      url: "https://github.com/rmdanjr/google-hashcode",
      likes: 41,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("our hashcode code haha!");
  });

  test("missing likes property default is 0", async () => {
    const newBlog = {
      title: "our hashcode code haha!",
      author: "Hassan Ramadan",
      url: "https://github.com/rmdanjr/google-hashcode",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs/");
    expect(response.body[response.body.length - 1].likes).toEqual(0);
  });

  test("missing url and title properties => 400 Bad Request", async () => {
    const newBlog = {
      author: "Hassan Ramadan",
      likes: 43,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("Test HTTP DELETE /api/blogs/:id", () => {
  test("an existing blog can be deleted", async () => {
    const id = "493119960a439565123c06e7";
    await api.delete(`/api/blogs/${id}`).expect(204);

    const response = await api.get("/api/blogs");
    const ids = response.body.map((blog) => blog.id);

    expect(response.body).toHaveLength(initialBlogs.length - 1);
    expect(ids).not.toContain(id);
  });
});

describe("Test HTTP PUT /api/blogs/:id", () => {
  test("an existing blog can be updated", async () => {
    const id = "493119960a439565123c06e7";
    const updatedBlog = {
      id: "493119960a439565123c06e7",
      title: "our kick start code haha!",
      author: "Hassona",
      url: "https://github.com/rmdanjr/google-kickstart",
    };
    await api.put(`/api/blogs/${id}`).send(updatedBlog).expect(204);
  });
});

describe("Test HTTP POST /api/users", () => {
  test("a vaild user can be added", async () => {
    const user = {
      name: "Ahmed Fathy",
      username: "Jamaika",
      password: "undefined",
    };
    await api.post("/api/users/").send(user).expect(201);

    const response = await api.get("/api/users/");
    expect(response.body.length).toEqual(initialUsers.length + 1);
  });

  test("user without username cann't be added", async () => {
    const user = {
      name: "Ahmed Fathy",
      password: "undefined",
    };
    let response = await api.post("/api/users/").send(user).expect(403);
    expect(response.body.error).toEqual(
      "username or password undefined or less than 3 chars length"
    );

    response = await api.get("/api/users/");
    expect(response.body.length).toEqual(initialUsers.length);
  });

  test("user without password cann't be added", async () => {
    const user = {
      name: "Ahmed Fathy",
      username: "Jamaika",
    };
    let response = await api.post("/api/users/").send(user).expect(403);
    expect(response.body.error).toEqual(
      "username or password undefined or less than 3 chars length"
    );

    response = await api.get("/api/users/");
    expect(response.body.length).toEqual(initialUsers.length);
  });

  test("user whose username is less than 3 chars length cann't be added", async () => {
    const user = {
      name: "Ahmed Fathy",
      username: "Ja",
    };
    let response = await api.post("/api/users/").send(user).expect(403);
    expect(response.body.error).toEqual(
      "username or password undefined or less than 3 chars length"
    );

    response = await api.get("/api/users/");
    expect(response.body.length).toEqual(initialUsers.length);
  });

  test("user whose password is less than 3 chars length cann't be added", async () => {
    const user = {
      name: "Ahmed Fathy",
      password: "u",
    };
    let response = await api.post("/api/users/").send(user).expect(403);
    expect(response.body.error).toEqual(
      "username or password undefined or less than 3 chars length"
    );

    response = await api.get("/api/users/");
    expect(response.body.length).toEqual(initialUsers.length);
  });

  test("user whose username is already exists cann't be added", async () => {
    const user = {
      name: "Hassan Ramadan",
      username: "RmdanJr",
      password: "undefined",
    };
    let response = await api.post("/api/users/").send(user).expect(403);
    expect(response.body.error).toEqual("username already exist");

    response = await api.get("/api/users/");
    expect(response.body.length).toEqual(initialUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
