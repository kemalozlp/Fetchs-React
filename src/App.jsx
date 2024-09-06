import { useEffect, useRef, useState } from 'react';
import './App.css'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import 'atropos/css'
import Atropos from 'atropos/react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function App() {

  const [recipes, setRecipe] = useState([]);
  const [show, setShow] = useState(0);
  const [fetchshow, setFetchShow] = useState("");
  const [searched, setSearched] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const skip = useRef(0);

  async function getFetch(data) {
    const recipe = await fetch("https://dummyjson.com/" + data + "?delay=&skip=" + skip.current + "&limit=30").then(res => res.json());

    setRecipe(data === "products" ? recipe.products : data === "recipes" ? recipe.recipes : data === "posts" ? recipe.posts : "");
    console.log(recipes)
    setFetchShow(data);
  }



  function handleChange(e) {
    setSearched(e.target.value);
  }

  useEffect(() => {
    if (searched !== "") {
      setFilteredRecipes(recipes.filter((recipe) => {
        return recipe?.title?.toLowerCase().includes(searched?.toLowerCase()) || recipe?.name?.toLowerCase().includes(searched?.toLowerCase())
      })
      )
    } else {
      setFilteredRecipes(recipes)
    }
  }, [searched, recipes]);

  function LoadMoreNext(data) {
    if (!(recipes.length < 30)) {
      skip.current += 30;
    } else {
      return
    }
    console.log(recipes);
    getFetch(data);
  }
  console.log(filteredRecipes)
  function LoadMorePrev(data) {
    if (skip.current > 0) {
      skip.current -= 30;
    } else {
      return
    }
    getFetch(data);
  }


  function fetchProducts() {
    skip.current = 0;
    getFetch("products");
    console.log(skip.current)
  }
  function fetchRecipes() {
    skip.current = 0;
    getFetch("recipes");
    console.log(skip.current)
  }

  function fetchposts() {
    skip.current = 0;
    getFetch("posts");
    console.log(skip.current)
  }


  return (
    <div className="container">
      <Header getFetch={getFetch} fetchProducts={fetchProducts} fetchRecipes={fetchRecipes} fetchposts={fetchposts} skip={skip.current} />
      <div className="content">

        <RecipesHome handleChange={handleChange} skip={skip} filteredRecipes={filteredRecipes} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
          setRecipe={setRecipe} recipes={recipes} show={show} setShow={setShow} fetchshow={fetchshow} LoadMoreNext={LoadMoreNext} LoadMorePrev={LoadMorePrev} />
        <ProductHome handleChange={handleChange} skip={skip} recipes={recipes} show={show} filteredRecipes={filteredRecipes} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
          setShow={setShow} fetchshow={fetchshow} LoadMoreNext={LoadMoreNext} LoadMorePrev={LoadMorePrev} />

        <PostHome handleChange={handleChange} skip={skip} filteredRecipes={filteredRecipes} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
          setRecipe={setRecipe} recipes={recipes} show={show} setShow={setShow} fetchshow={fetchshow} LoadMoreNext={LoadMoreNext} LoadMorePrev={LoadMorePrev} />
      </div>
    </div>
  )
}

function Header({ fetchProducts, fetchRecipes, fetchposts }) {
  return (
    <div className="header">
      <a href="#" onClick={fetchProducts}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>Products</a>
      <a href="#" onClick={fetchRecipes}><svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 346.229 346.229" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M48.927,8v289.376c0,4.418-3.582,8-8,8c-4.418,0-8-3.582-8-8V8c0-4.418,3.582-8,8-8C45.345,0,48.927,3.582,48.927,8z M313.302,13.248v278.881c0,4.418-3.582,8-8,8H157.681v38.1c0,2.71-1.372,5.236-3.646,6.711c-2.273,1.475-5.139,1.699-7.615,0.594 l-19.782-8.829l-19.799,8.83c-1.041,0.464-2.152,0.694-3.258,0.694c-1.523,0-3.039-0.435-4.355-1.289 c-2.273-1.476-3.645-4.001-3.645-6.711v-38.1H72.9c-4.418,0-8-3.582-8-8V13.248c0-4.418,3.582-8,8-8h232.402 C309.72,5.248,313.302,8.829,313.302,13.248z M141.681,300.128h-30.1v25.773l11.801-5.263c2.074-0.925,4.443-0.926,6.519,0.001 l11.78,5.258V300.128z M297.302,21.248H80.9v262.881h68.782h147.621V21.248z M118.631,138.656c0-17.121,13.929-31.049,31.05-31.049 c2.759,0,5.481,0.363,8.106,1.071c5.423-9.374,15.479-15.388,26.85-15.388c11.161,0,21.324,6.118,26.799,15.402 c2.64-0.717,5.379-1.085,8.156-1.085c17.121,0,31.05,13.929,31.05,31.049c0,17.121-13.929,31.05-31.05,31.05 c-0.649,0-1.295-0.02-1.937-0.059v34.44c0,4.418-3.582,8-8,8h-50.034c-4.418,0-8-3.582-8-8v-34.44 c-0.643,0.04-1.29,0.059-1.94,0.059C132.56,169.706,118.631,155.777,118.631,138.656z M134.631,138.656 c0,8.298,6.751,15.05,15.05,15.05c2.275,0,4.456-0.492,6.483-1.463c2.479-1.188,5.394-1.02,7.72,0.445 c2.326,1.465,3.737,4.021,3.737,6.77v36.63h34.034v-36.63c0-2.749,1.412-5.305,3.738-6.77c2.326-1.464,5.242-1.632,7.72-0.444 c2.025,0.971,4.205,1.463,6.479,1.463c8.299,0,15.05-6.751,15.05-15.05s-6.751-15.049-15.05-15.049 c-2.899,0-5.712,0.825-8.135,2.385c-2.197,1.416-4.946,1.669-7.366,0.677c-2.418-0.991-4.2-3.101-4.772-5.651 c-1.524-6.795-7.699-11.728-14.682-11.728c-6.98,0-13.156,4.933-14.684,11.73c-0.573,2.549-2.355,4.658-4.773,5.648 c-2.418,0.991-5.167,0.738-7.364-0.677c-2.422-1.56-5.235-2.385-8.135-2.385C141.382,123.606,134.631,130.357,134.631,138.656z"></path> </g></svg>Recipes</a>
      <a href="#" onClick={fetchposts}> <img src="./images/notes-post-it-svgrepo-com.svg" alt="" />  Posts & <br /> Comments</a>

    </div>
  )
}

function RecipesHome({ show, setShow, fetchshow, LoadMoreNext, handleChange, filteredRecipes, LoadMorePrev, selectedIndex, setSelectedIndex, }) {


  return (
    <>
      {fetchshow === "recipes" ?
        <div className="recipes"  >

          <div className="navbar" style={{
            padding: `${show === 0 ? "10px" : "0px"}`
          }}>
            <input type="search" placeholder='Product Search' onChange={handleChange} style={{
              display: `${show === 0 ? "flex" : "none"}`
            }} />

            <div className="pageList" style={{
              display: `${show === 0 ? "flex" : "none"}`
            }}>
              <a href="" onClick={(e) => { e.preventDefault(); LoadMorePrev("recipes"); }}>Önceki</a>
              <a href="" onClick={(e) => { e.preventDefault(); LoadMoreNext("recipes", 50); }}>Sonraki</a>
            </div>
          </div>



          <button className='backBtn' style={{ display: `${show === 1 ? "flex" : "none"}` }} onClick={() => setShow(0)}>
            <svg fill="#000000" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.801 511.801" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M271.067,255.84l237.76-237.76c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0L248.453,248.373 c-4.16,4.16-4.16,10.88,0,15.04l245.333,245.333c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827 L271.067,255.84z"></path> <path d="M25.733,255.84l237.76-237.76c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0L3.12,248.267 c-4.16,4.16-4.16,10.88,0,15.04L248.453,508.64c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827 L25.733,255.84z"></path> </g> </g> </g> </g></svg>
            <p>Back</p>
          </button>
          <div className="recipeList">
            {show === 0 ? <>{filteredRecipes.map(z => <RecipeItem key={z.id} {...z} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} show={show} setShow={setShow} />)}
            </> : <>
              {filteredRecipes.map(z => <BlogItem key={z.id} {...z} show={show} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} setShow={setShow} />)}
            </>}
          </div>
        </div> : ""}</>
  )
}

function RecipeItem({ image, name, cuisine, difficulty, reviewCount, servings, prepTimeMinutes, cookTimeMinutes, setShow, setSelectedIndex, id }) {
  return (
    <Atropos
      activeOffset={40}
      shadow={false}
      shadowScale={1.05}
      onEnter={() => console.log('Enter')}
      onLeave={() => console.log('Leave')}
      onRotate={(x, y) => console.log('Rotate', x, y)}
      className="recipeItem" onClick={() => { setShow(1); setSelectedIndex(id) }}>
      <img src={image} />
      <div className="recipedetails">
        <div className="details-text">
          <h1>{name}</h1>
          <p><span>{cookTimeMinutes}dk Pişirme</span><span> {prepTimeMinutes}dk Hazırlık</span><span>{servings} Kişilik </span></p>
        </div>
        <div className="footer">
          <p> {cuisine} Mutfağı </p>
          <p>{difficulty}</p>
        </div>

        <div className="reviewCount">
          <svg fill="#000000" width="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

            <g id="SVGRepo_iconCarrier"> <title>eye</title> <path d="M0 16q0.064 0.128 0.16 0.352t0.48 0.928 0.832 1.344 1.248 1.536 1.664 1.696 2.144 1.568 2.624 1.344 3.136 0.896 3.712 0.352 3.712-0.352 3.168-0.928 2.592-1.312 2.144-1.6 1.664-1.632 1.248-1.6 0.832-1.312 0.48-0.928l0.16-0.352q-0.032-0.128-0.16-0.352t-0.48-0.896-0.832-1.344-1.248-1.568-1.664-1.664-2.144-1.568-2.624-1.344-3.136-0.896-3.712-0.352-3.712 0.352-3.168 0.896-2.592 1.344-2.144 1.568-1.664 1.664-1.248 1.568-0.832 1.344-0.48 0.928zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184-2.816 1.184l2.816 2.816h-4z" /> </g>
          </svg>
          {reviewCount}
        </div>
      </div>
    </Atropos>
  )
}

function BlogItem({ name, image, instructions, rating, servings, prepTimeMinutes, cookTimeMinutes, ingredients, selectedIndex, id }) {
  return (

    <div className="blogItem" style={{
      display: `${selectedIndex === id ? "flex" : "none"}`
    }}  >
      <div className="item-img">
        <div className="item-img-text">
          <h1>{name}</h1>

          <div className="reyting">
            <div className="stars">
              <div class="rating"
                style={{
                  width: 20 * rating,
                  padding: 10
                }}
              >
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
              </div>
            </div>
            {rating}

          </div>
        </div>
        <img src={image} className='yemekimg' />
        <p><span>{cookTimeMinutes}dk Pişirme</span><span> {prepTimeMinutes}dk Hazırlık</span><span>{servings} Kişilik </span></p>
      </div>
      <div className="item-details">
        <div className="item-products">
          <h3> {name} Malzemeler</h3>
          <ul>
            {ingredients.map(x => <li>{x}</li>)}
          </ul>
        </div>
        <div className="item-preparation">
          <h3> {name} Hazırlanışı</h3>
          <ul>
            {instructions.map(x => <li>{x}</li>)}
          </ul>
        </div>
      </div>
    </div>

  )
}

function ProductHome({ recipes, show, setShow, fetchshow, LoadMoreNext, filteredRecipes, handleChange, LoadMorePrev, selectedIndex, setSelectedIndex, }) {

  return (
    <>
      {fetchshow === "products" ?
        <div className="Product" >
          <div className="navbar" style={{
            padding: `${show === 0 ? "10px" : "0px"}`
          }}>
            <input type="search" placeholder='Product Search' onChange={handleChange} style={{
              display: `${show === 0 ? "flex" : "none"}`
            }} />

            <div className="pageList" style={{
              display: `${show === 0 ? "flex" : "none"}`
            }}>
              <a href="" onClick={(e) => { e.preventDefault(); LoadMorePrev("products"); }}>Önceki</a>
              <a href="" onClick={(e) => { e.preventDefault(); LoadMoreNext("products"); }}>Sonraki</a>
            </div>
          </div>

          <button className='backBtn' style={{ display: `${show === 1 ? "flex" : "none"}` }} onClick={() => setShow(0)}>  <svg fill="#000000" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.801 511.801" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M271.067,255.84l237.76-237.76c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0L248.453,248.373 c-4.16,4.16-4.16,10.88,0,15.04l245.333,245.333c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827 L271.067,255.84z"></path> <path d="M25.733,255.84l237.76-237.76c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0L3.12,248.267 c-4.16,4.16-4.16,10.88,0,15.04L248.453,508.64c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827 L25.733,255.84z"></path> </g> </g> </g> </g></svg>
            <p>Back</p>
          </button>
          <div className="productList">
            {show === 0 ? <>{filteredRecipes.map(z => <ProductItem key={z.id} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} {...z} show={show} setShow={setShow} />)}

            </> : <>
              {filteredRecipes.map(z => <BlogPItem key={z.id} {...z} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} show={show} setShow={setShow} />)}
            </>}

          </div>
        </div> : ""}
    </>
  )
}

function ProductItem({ thumbnail, title, setShow, category, price, rating, setSelectedIndex, id }) {
  return (

    <Atropos
      activeOffset={40}
      shadow={false}
      shadowScale={1.05}
      onEnter={() => console.log('Enter')}
      onLeave={() => console.log('Leave')}
      onRotate={(x, y) => console.log('Rotate', x, y)} className="productItem" onClick={() => { setShow(1); setSelectedIndex(id) }}>
      <img src={thumbnail} />
      <div className="productdetails">
        <div className="producttext">
          <h1>{title}</h1>
          <div className="productreyting">
            <div className="productstars">
              <div class="productrating"
                style={{
                  width: 20 * rating,
                  padding: 10
                }}
              >
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
              </div>
            </div>
            ({rating})

          </div>
        </div>

        <div className="productfooter">
          <p> {category} </p>
          <p>${price}</p>
        </div>
      </div>
    </Atropos>
  )
}

function BlogPItem({ title, images, rating, description, setShow, reviews, selectedIndex, id }) {
  return (

    <div className="productblogItem" style={{
      display: `${selectedIndex === id ? "flex" : "none"}`
    }}  >
      <div className="productitem-img" onClick={() => setShow(0)}>
        <img src={images[0]} className='productyemekimg' />
      </div>
      <div className="productitem-details">
        <div className="productitem-img-text">
          <h1>{title}</h1>
          <div className="blogreyting">
            <div className="stars">
              <div class="rating"
                style={{
                  width: 20 * rating,
                  padding: 10
                }}
              >
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
              </div>
            </div>
            ({rating})

          </div>
        </div>
        <ul>
          {description}
          <div className='comments'>
            {reviews.map(x =>
              <>
                <details>
                  <summary className="userInfo">
                    <h4>{x.reviewerName}</h4>
                    <p>{x.comment}</p>
                  </summary>
                  <div>
                    <h6>{x.reviewerEmail}</h6> </div>
                </details>
              </>
            )}
          </div>
        </ul>
      </div>
    </div>
  )
}

function PostHome({ show, setShow, fetchshow, LoadMoreNext, handleChange, filteredRecipes, LoadMorePrev, selectedIndex, setSelectedIndex }) {


  return (
    <>
      {fetchshow === "posts" ?
        <div className="recipes" >

          <div className="navbar" style={{
            padding: `${show === 0 ? "10px" : "0px"}`
          }}>
            <input type="search" placeholder='Product Search' onChange={handleChange} style={{
              display: `${show === 0 ? "flex" : "none"}`
            }} />

            <div className="pageList" style={{
              display: `${show === 0 ? "flex" : "none"}`
            }}>
              <a href="" onClick={(e) => { e.preventDefault(); LoadMorePrev("posts"); }}>Önceki</a>
              <a href="" onClick={(e) => { e.preventDefault(); LoadMoreNext("posts"); }}>Sonraki</a>
            </div>
          </div>



          <button className='backBtn' style={{ display: `${show === 1 ? "flex" : "none"}` }} onClick={() => setShow(0)}>
            <svg fill="#000000" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.801 511.801" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M271.067,255.84l237.76-237.76c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0L248.453,248.373 c-4.16,4.16-4.16,10.88,0,15.04l245.333,245.333c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827 L271.067,255.84z"></path> <path d="M25.733,255.84l237.76-237.76c4.053-4.267,3.947-10.987-0.213-15.04c-4.16-3.947-10.667-3.947-14.827,0L3.12,248.267 c-4.16,4.16-4.16,10.88,0,15.04L248.453,508.64c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827 L25.733,255.84z"></path> </g> </g> </g> </g></svg>
            <p>Back</p>
          </button>
          <div className="postList">
            {show === 0 ? <>{filteredRecipes.map((z, i) => <Post key={i} {...z} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} show={show} setShow={setShow} />)}
            </> : ""}
          </div>
        </div> : ""}</>
  )
}

function Post({ body, reactions, tags, title, views, id, key }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [comment, setComments] = useState([]);

  async function getComments(commentss) {
    const comments = await fetch("https://dummyjson.com/posts/" + commentss + "/comments").then(res => res.json());
    setComments(comments.comments);
  }


  return (

    <Atropos
      activeOffset={40}
      shadow={false}
      shadowScale={1.05}
      onEnter={() => console.log('Enter')}
      onLeave={() => console.log('Leave')}
      onRotate={(x, y) => console.log('Rotate', x, y)} className="post">
      <div className="postItem">
        <div className="views">
          <img src="./images/eyes.svg" alt="" />
          <p>{views}</p>
        </div>
        <div className="postItem-Text">
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
        <div className="postTags">
          {tags.map(x => <h3>#{x}</h3>)}
        </div>
        <div className="like">
          <a href="#"><img src="./images/like.svg" width={100} alt="Like" /><p>{reactions.likes}</p></a>
          <a href="#"><img src="./images/disslike.svg" width={100} alt="Dislike" /><p>{reactions.dislikes}</p></a>
          <React.Fragment>
            <button className='btn' onClick={() => { getComments(id); handleClickOpen() }} variant="outlined" >
              <img src="./images/comments-svgrepo-com.svg" alt="" width={70} />
              <p>Comments</p>
            </button>
          </React.Fragment>

          <React.Fragment
            style={{
              width: 1110
            }}>
            <Dialog

              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                <div className="dialogtitle">
                  <p>Comments</p>
                  <div className="commentsTotal">

                    <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#231F20" d="M60,0H16c-2.211,0-4,1.789-4,4v4h38c3.438,0,6,2.656,6,6v22h4 c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z"></path> <path fill-rule="evenodd" clip-rule="evenodd" fill="#231F20" d="M50,10H4c-2.211,0-4,1.789-4,4v30c0,2.211,1.789,4,4,4h7 c0.553,0,1,0.447,1,1v11c0,1.617,0.973,3.078,2.469,3.695C14.965,63.902,15.484,64,16,64c1.039,0,2.062-0.406,2.828-1.172 l14.156-14.156c0,0,0.516-0.672,1.672-0.672S50,48,50,48c2.211,0,4-1.789,4-4V14C54,11.791,52.209,10,50,10z M13,22h13 c0.553,0,1,0.447,1,1s-0.447,1-1,1H13c-0.553,0-1-0.447-1-1S12.447,22,13,22z M34,36H13c-0.553,0-1-0.447-1-1s0.447-1,1-1h21 c0.553,0,1,0.447,1,1S34.553,36,34,36z M41,30H13c-0.553,0-1-0.447-1-1s0.447-1,1-1h28c0.553,0,1,0.447,1,1S41.553,30,41,30z"></path> </g> </g></svg>
                    <p>{comment.length}</p>
                  </div>
                </div>
              </DialogTitle>
              <DialogContent >
                <DialogContentText id="alert-dialog-slide-description">
                  {comment.length === 0 ? `${"Yorum Bulunamadı"}` : <><div className='commentsList'>{comment.map(x => <PostComments key={x.id} {...x} />)}</div></>}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </div>

      </div>

    </Atropos>
  )
}

function PostComments({ body, likes, user }) {


  return (<div className="postComments">
    <div className="comments">
      <img src="./images/user.svg" alt="Users" /><h1>{user.fullName}</h1>
    </div>
    <div className="commentsText">
      <p>{body}</p>
    </div>
    <div className="likes">
      <a href="#"><img src="./images/like.svg" alt="Like" /><p>{likes}</p></a>
      <a href="#"><img src="./images/disslike.svg" alt="Dislike" /><p>0</p></a>
    </div>
  </div>

  )
}

export default App

