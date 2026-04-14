// async function getData(){
//     let res = await fetch('https://jsonplaceholder.typicode.com/posts')
//     let data = await res.json()
//     console.log(data)
//     showPosts(data)
// }

// function showPosts(posts){
//     const container = document.getElementById('container')

//     const firstPost = <div class="post"><h3>${posts[0].title}</h3><p>${posts[0].body}</p></div>
//     const secondPost = <div class="post"><h3>${posts[1].title}</h3><p>${posts[1].body}</p></div>
//     const thirdPost = <div class="post"><h3>${posts[2].title}</h3><p>${posts[2].body}</p></div>
//     const fourthPost = <div class="post"><h3>${posts[3].title}</h3><p>${posts[3].body}</p></div>

//     container.innerHTML = firstPost
//     container.innerHTML += secondPost
//     container.innerHTML += thirdPost
//     container.innerHTML += fourthPost

// }
// getData()


async function data() {
  let res = await fetch('https://jsonplaceholder.typicode.com/posts');
  let listOfItems = await res.json();
  display(listOfItems);
}

function display(items) {
    const container = document.getElementById('container')
    const firstPost = `<div class="post"><h3>${items[0].title}</h3><p>${items[0].body}</p></div>`
    const secondPost = `<div class="post"><h3>${items[1].title}</h3><p>${items[1].body}</p></div>`
    const thirdPost = `<div class="post"><h3>${items[2].title}</h3><p>${items[2].body}</p></div>`
    const fourthPost = `<div class="post"><h3>${items[3].title}</h3><p>${items[3].body}</p></div>`

    container.innerHTML = firstPost
    container.innerHTML += secondPost
    container.innerHTML += thirdPost
    container.innerHTML += fourthPost
}
data();

