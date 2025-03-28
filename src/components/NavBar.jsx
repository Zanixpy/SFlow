import { use, useId, useRef, useState } from "react";
import "./NavBar.css";
export function NavBar() {
  const [clicked, setclicked] = useState(true);
  const [selectedIndex, setindex] = useState(0);
  const [image,setimage]=useState(null)

  const ImgChange=e=>{
    const file=e.target.files[0]
    if (file) {
      const reader= new FileReader()
      reader.onloadend=()=>{
        console.log(reader)
        const uploadedImage=reader.result
        setimage(uploadedImage)
      }
      reader.readAsDataURL(file)
    }
  }

  const [userProfile,setuserprofile] = useState([
    {
      key:useId(),
      itemName: "User",
      classItem: "font-user",
    },
    
  ])
  const [dataItem,setdataitem] = useState([
    { 
        key: useId(), 
        itemName: "Home", 
        classItem: "side-item ", 
        link: "", 
        src: "/house.png" },
    {
      key: useId(),
      itemName: "Income",
      classItem: "side-item",
      link: "",
      src: "/income.png",
    },
    {
      key: useId(),
      itemName: "Projects",
      classItem: "side-item",
      link: "",
      src: "/projets.png",
    },
    {
      key: useId(),
      itemName: "Ideas",
      classItem: "side-item",
      link: "",
      src: "/ideas.png",
    },
    {
      key: useId(),
      itemName: "Setting",
      classItem: "side-item",
      link: "",
      src: "/setting.png",
    },
  ])

  return (
    <div>
      <nav className={clicked === true ? "side-bar open" : "side-bar close"}>
        <img
          src="/bar-item.png"
          className="lateral"
          title="Barre latéral"
          alt="barre lateral"
          onClick={() => setclicked((v) => !v)}
        />
        {clicked &&
          userProfile.map((user) => (
            <div className="side-user" key={user.key}>
              <label htmlFor="input-file" id="input-area">
                <input type="file" accept="image/*" id="input-file" onChange={ImgChange} hidden />
                {image ? <img className="img-fit" src={image} alt="" /> : <span className="upload-text">+</span>}
              </label>
              <p className={user.classItem}>{user.itemName}</p>
            </div>
          ))}

        {clicked &&
          dataItem.map((item, index) => (
            <a
              href={item.link}
              key={item.key}
              onClick={() => setindex(index)}
              className={
                selectedIndex === index ? "side-active" : "side-item"
              }
            >
              <img className="logo-item" src={item.src} alt="" />
              {item.itemName}
            </a>
          ))}
      </nav>
    </div>
  );
}
