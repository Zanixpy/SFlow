import { use, useId, useState } from "react";
import "./NavBar.css";
export function NavBar() {
  const [clicked, setclicked] = useState(true);
  const [selectedIndex, setindex] = useState(0);
  const userProfile = [
    {
      key:useId(),
      itemName: "Zan",
      classItem: "font-user",
      link: "",
      src: "",
    },
  ];
  const dataItem = [
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
  ];

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
                <input type="file" accept="image/*" id="input-file" hidden />
              </label>
              <p className={user.classItem}>{user.itemName}</p>
            </div>
          ))}

        {clicked &&
          dataItem.map((item, index) => (
            <a
              href={item.link}
              key={item.key}
              className={
                selectedIndex === index ? "side-item active" : "side-item"
              }
              onClick={() => setindex((v) => (v = index))}
            >
              <img className="logo-item" src={item.src} alt="" />
              {item.itemName}
            </a>
          ))}
      </nav>
    </div>
  );
}
