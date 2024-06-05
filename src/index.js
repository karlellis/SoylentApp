import React from "react";
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
const bcrypt = require("bcryptjs")
var fileImg = null;
var fileCatImg = null;
var cgPos = "";
var currPos = "";
var usrTmp = "";
var pswTmp = "";
var temp = "";
var temp2 = "";
var temp3 = "";
var temp4 = "";
var temp5 = "Root";
var temp6 = "";
var disable1 = "none";
var disable2 = "none";
var disable3 = "none";
var noDescr = false;
var tempColor = "#0077c8";
var tempOpacity = 0.7;
var tempOpacity1 = 0.7;
var tempCatColor = "#0077c8";
var tempTextColor = "#0077c8";
var tempColW = "";
var radiobtn = "";
var tempItemTitle = "";
var tempItemDescr = "...";
var tempItemLink = "";
var tempItemVideo = false;
var tempCatTitle = "";
var tempItemHide = false;
var tempCrsTitle = "";
var tempCrsLink = "";
var tempCrsDescr = "";
var tempIcon = "";
var tempCatIcon = "";
var arrayLength = 0;
var login = false;
var array = [];
var catArray = [];
var catArrayLength = 0;
var arrayAdd = [];
var inPos = "";
var blockHide = "none";
var categoryFirst = "none";
var dropDownIsOpen = false;
var catDropDownIsOpen = false;
var currElement = "";
// var currURL = window.location.href;
var newItem = {
  "title": "",
  "link": "",
  "icon": "",
  "descr": "",
  "video": false,
  "cat": "Root",
  "id": 0,
  "hidden": false
};
var catNewItem = {
  "title": "",
  "icon": "",
  "hidden": false
};
var CrsNewItem = {
  "title": "",
  "link": "",
  "descr": ""
};
var nome = "";
var credentials = require("./initSec.json");
var spData = require("./initData.json");

// ELEMENTS

const Item = ({ showItemsBtn, pos, id, title, link, descr, icon, video, hidden, cat, itemEditDel, itemVideo, itemHide }) => {
  const [isActive, setIsActive] = useState(false);
  const hide = hidden ? <ImgElement type={"iRedPoint"} /> : ""
  const linkOrVideo = video
    ?
    (<img className="items pointer" title={title} alt={title} src={icon}
      onClick={() => itemVideo(id, cat)} />)
    :
    (< a title={title} href={link} target="_blank" rel="noreferrer">
      <img className="items" title={title}
        alt={title} src={icon} />
    </a>);

  let itemBtn = "";
  let descrTxt = "";
  let titleTxt = "";

  if (descr !== "") {
    descrTxt = (
      <div className={`${isActive ? 'descr-shown row medfonts lato text-center m-auto' : 'descr-hidden'}`}
        style={{
          backgroundImage: "url(" + icon + ")",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <p style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", margin: ".5rem", flexShrink: "inherit" }}>{descr}</p>
      </div>
    )
    titleTxt = (
      <h4>
        <div className="row lato text-center m-1">
          <div className="col">
            <div className="row">
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <b>{title}</b>
              </div>
              {hide}
              <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
                onClick={() => setIsActive(!isActive)}>
                <b>{isActive ? '-' : '+'}</b>
              </div>
            </div>
          </div>
        </div>
      </h4>
    )
  } else {
    descrTxt = "";
    titleTxt = (
      <h4>
        <div className="row lato text-center m-1">
          <div className="col">
            <div className="row">
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <b>{title}</b>
              </div>
              {hide}
            </div>
          </div>
        </div>
      </h4>
    );
  };
  if (showItemsBtn === "ShowItemBtn") {
    itemBtn = (
      <div className="itemcontainer">
        <div className="iconcontainer box box2">
          {!isActive && linkOrVideo}
          {descrTxt}
        </div>
        {titleTxt}
        <div className="row btncontainer">
          <button className="col itembutton solidgreen m-1" onClick={() => itemEditDel("itemEdit", id, pos)}>
            Edit
          </button>
          <button className="col-1 itembutton black m-1 pad01">
            {pos + 1}
          </button>
          <button className="col itembutton solidbrick m-1" onClick={() => itemEditDel("itemDel", id, pos)}>
            Remove
          </button>
        </div>
      </div>
    )
  } else {
    itemBtn = (
      <div className="itemcontainer">
        <div className="iconcontainer box box2">
          {!isActive && linkOrVideo}
          {descrTxt}
        </div>
        {titleTxt}
      </div>
    )
  }
  // }
  return (
    <>
      {(!itemHide || showItemsBtn === "ShowItemBtn") && itemBtn}
    </>
  );
}

const Cat = ({ showItemsBtn, pos, title, icon, hidden, catCont, catEditDel, itemHide }) => {
  const hide = hidden ? <ImgElement type={"iRedPoint"} /> : ""
  let catBtn = ""
  if (showItemsBtn === "ShowItemBtn") {
    catBtn = (
      <div className="itemcontainer">
        <div className="iconcontainer box box2">
          <img className="items pointer" title={title} alt={title} src={icon}
            onClick={() => catCont(pos)} />
        </div>
        <h4>
          <div className="row lato text-center m-1">
            <div className="col">
              <div className="row">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                  <b>{title}</b>
                </div>
                {hide}
              </div>
            </div>
          </div>
        </h4>
        <div className="row btncontainer">
          <button className="col itembutton solidgreen m-1" onClick={() => catEditDel("CatEdit", pos)}>
            Edit
          </button>
          <button className="col-1 itembutton black m-1 pad01">
            {pos + 1}
          </button>
          <button className="col itembutton solidbrick m-1" onClick={() => catEditDel("CatDel", pos)}>
            Remove
          </button>
        </div>

      </div>
    )
  } else {
    catBtn = (
      <div className="itemcontainer">
        <div className="iconcontainer box box2">
          <img className="items pointer" title={title} alt={title} src={icon}
            onClick={() => catCont(pos)} />
        </div>
        <h4>
          <div className="row lato text-center m-1">
            <div className="col">
              <div className="row">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                  <b>{title}</b>
                </div>
                {hide}
              </div>
            </div>
          </div>
        </h4>
      </div>
    )
  }
  return (
    <>
      {(!itemHide || showItemsBtn === "ShowItemBtn") && catBtn}
    </>
  );

}

const Credit = ({ showItemsBtn, pos, title, link, descr, crsEditDel }) => {
  let creditBtn = ""
  if (showItemsBtn === "ShowItemBtn") {
    creditBtn = (
      <>
        <div className="row">
          <button className="col extcredits green m-1"
            onClick={() => {
              window.open(link);
            }}>
            <h2><font color="white">
              {title}
            </font></h2>
            <h5><font color="Chartreuse">{descr}</font></h5>
          </button>
        </div>
        <div className="row btncontainer">
          <button className="col itembutton solidgreen m-1" onClick={() => crsEditDel("CrsEdit", pos)}>
            Edit
          </button>
          <button className="col-1 itembutton black m-1 pad01">
            {pos + 1}
          </button>
          <button className="col itembutton solidbrick m-1" onClick={() => crsEditDel("CrsDel", pos)}>
            Remove
          </button>
        </div>
      </>
    )
  } else {
    creditBtn = (
      <div className="row">
        <button className="col extcredits green m-1"
          onClick={() => {
            window.open(link);
          }}>
          <h2><font color="white">
            {title}
          </font></h2>
          <h5><font color="Chartreuse">{descr}</font></h5>
        </button>
      </div>
    )
  }
  return (
    <>
      {creditBtn}
    </>
  );
}

const Element = ({ eleShow, children, mainBtn, id, sfondo, colore, z, colW }) => {
  const showHideClassName = eleShow ? "d-block" : "d-none";
  const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
  return (
    <section id={id} style={{ backgroundColor: sfondo, color: colore, zIndex: z }}
      className={showHideClassName + " " + justifyCenterEnd + " " + colW + " latoplain d-flex flex-column align-items-center"}>
      {children}
    </section>
  );
};

const EditElement = ({ editEleShow, children, hidden }) => {
  const showHideClassName = editEleShow ? "d-block" : "d-none";
  const hide = hidden ? "" : <ImgElement type={"redPoint"} />
  return (
    <div className={showHideClassName + " stretch d-flex justify-content-center align-items-center"}>
      {children} {hide}
    </div>
  );
};

// DIALOGS

const EleDialog = ({ handleSave, handleMidBtn, handleClose, eleDiaShow, children, saveLabel, midBtnLabel,
  activityChanged, hideApply, hideClose, hideMidBtn, footTheme, mainTheme }) => {
  const showHideClassName = eleDiaShow ? "modal display-block" : "modal display-none";
  const showHideApply = hideApply ? "display-none" : "display-block";
  const showHideMidBtn = hideMidBtn ? "display-none" : "display-block";
  const showHideClose = hideClose ? "display-none" : "display-block";
  return (
    <div className={showHideClassName}>
      <section className={mainTheme}>
        {children}
        <div className={footTheme}>
          <button type="button" disabled={(activityChanged) ? true : false} className={showHideApply + " btn btn-primary"} onClick={handleSave}>{saveLabel}</button>
          <button type="button" className={showHideMidBtn + " btn btn-success"} onClick={handleMidBtn}>{midBtnLabel}</button>
          <button type="button" className={showHideClose + " btn btn-secondary"} data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

// SIMPLE COMPONENTES

const ModalTitle = ({ title }) => {
  return (
    <div className="modal-header">
      <h5 className="modal-title" >{title}</h5>
    </div>
  )
}

const InputFile = () => {
  return (
    <div className="form-group">
      <div className="row text-center mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <input type="file" className="form-control boxs border-0" name="icon" onChange={e => fileImg = e.target.files[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const InputPosition = ({ edit, pos, id }) => {
  if (edit === "Add Item") {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>Pos</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" placeholder="Leave blank for last..." id={id} className="form-control border-0"
                  onChange={e => {
                    temp = e.target.value;
                  }
                  } />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>Pos</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" className="form-control border-0" placeholder={pos + 1} id={id}
                  onChange={e => {
                    cgPos = e.target.value;
                  }
                  } />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const InputTitle = ({ label, edit, tempTitle, id, tempo }) => {
  if (edit === "Add Item") {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>{label}</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" className="form-control border-0" id={id} onChange={tempo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>{label}</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" className="form-control border-0" defaultValue={tempTitle} id={id} onChange={tempo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const InputLink = ({ edit, tempLink, id }) => {
  if (edit === "Add Item") {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>Link</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" className="form-control border-0" id={id} onChange={e => temp3 = e.target.value} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="form-group">
        <div className="row text-center mb-1 m-auto">
          <div className="col">
            <div className="row border">
              <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                <label>Link</label>
              </div>
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <input type="text" className="form-control border-0" defaultValue={tempLink} onChange={e => temp3 = e.target.value} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const InputCat = ({ catMenuB }) => {
  return (
    <div className="form-group">
      <div className="row mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
              <label>Category</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              {catMenuB}
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

const InputWidth = ({ idAuto, idCol1, idCol2, idCol3, idCol4, idCol5,
  valAuto, valCol1, valCol2, valCol3, valCol4, valCol5 }) => {
  return (
    <div class="form-group" >
      <div className="row text-center mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col-2 col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
              <label>Width</label>
            </div>
            <div className="col pt-1 pb-1">
              <div className="row m-auto">
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idAuto} value={valAuto} onChange={e => tempColW = e.target.value} /> Auto </label>
                </div>
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idCol1} value={valCol1} onChange={e => tempColW = e.target.value} /> 1 </label>
                </div>
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idCol2} value={valCol2} onChange={e => tempColW = e.target.value} /> 2 </label>
                </div>
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idCol3} value={valCol3} onChange={e => tempColW = e.target.value} /> 3 </label>
                </div>
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idCol4} value={valCol4} onChange={e => tempColW = e.target.value} /> 4 </label>
                </div>
                <div className="col radio">
                  <label class="radio-inline"> <input type="radio" name="blockWidth" id={idCol5} value={valCol5} onChange={e => tempColW = e.target.value} /> 5 </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const InputBackColor = ({ backColor, rgbToHex, bcLabel, tempo }) => {
  return (
    <div className="col">
      <div className="row border">
        <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
          <label>{bcLabel}</label>
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <input type="color" className="form-control border-0 p-0" defaultValue={rgbToHex(backColor)} onChange={tempo} />
        </div>
      </div>
    </div>
  )
}

const InputTextColor = ({ textColor, rgbToHex }) => {
  return (
    <div className="col">
      <div className="row border">
        <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
          <label>Text color</label>
        </div>
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <input type="color" className="form-control border-0 p-0" defaultValue={rgbToHex(textColor)} onChange={e => tempTextColor = e.target.value} />
        </div>
      </div>
    </div>
  )
}

const InputOpacity = ({ opacity, id, tempo }) => {
  return (
    <div className="form-group">
      <div className="row mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col pt-1 pb-1 p-0 latomenu d-flex flex-column justify-content-center align-items-center">
              <label>Opacity</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center p-0">
              <div className="row" style={{ width: "100%" }}>
                <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                  <img className="plusminus" title="0" alt="0" src="./itemicons/rangeZero.svg" />
                </div>
                <div className="col d-flex flex-column justify-content-center align-items-center">
                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" list="optickmarks" defaultValue={opacity} id={id} onChange={tempo} ></input>
                  <datalist id="optickmarks">
                    <option value={"0"}></option>
                    <option value={"0.25"}></option>
                    <option className="tick" value={"0.5"}></option>
                    <option value={"0.75"}></option>
                    <option value={"1"}></option>
                  </datalist>
                </div>
                <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                  <img className="plusminus" title="1" alt="1" src="./itemicons/rangeOne.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const InputVideo = () => {
  return (
    <div className="form-group">
      <div className="row mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center
             align-items-center">
              <label>Video</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <label class="switch">
                <input type="checkbox" className="form-control" defaultChecked={tempItemVideo}
                  onClick={e => {
                    if (tempItemVideo === false) {
                      temp4 = true;
                    } else {
                      temp4 = false;
                    }
                  }} />
                <span class="slider round" title="Video Player"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

const InputInfos = ({ label, disField, stateDisBlk, title, hideSwitch, tempo, id }) => {
  return (
    <div className="form-group">
      <div className="row text-center mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
              <label>{label}</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <input type="text" disabled={disField} className="form-control border-0"
                defaultValue={title} id={id} onChange={tempo} />
            </div>
            <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
              <label className="switch">
                <input type="checkbox" className="form-control" defaultChecked={hideSwitch}
                  onClick={stateDisBlk} />
                <span class="slider round" title="Hide"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const InputHideBlocks = ({ hideSwitch }) => {
  return (
    <div className="form-group">
      <div className="row mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
              <label>Hide</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <label class="switch">
                <input type="checkbox" className="form-control" defaultChecked={!hideSwitch}
                  onClick={e => {
                    if (hideSwitch === false) {
                      blockHide = true;
                    } else {
                      blockHide = false;
                    }
                  }} />
                <span class="slider round" title="Hide"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

const InputSwitch = ({ hSwitch, dSwitch, swLabel }) => {
  return (
    <div className="form-group">
      <div className="row mb-1 m-auto">
        <div className="col">
          <div className="row border">
            <div className="col col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
              <label>{swLabel}</label>
            </div>
            <div className="col d-flex flex-column justify-content-center align-items-center">
              <label class="switch">
                <input type="checkbox" className="form-control" defaultChecked={hSwitch}
                  onClick={dSwitch} />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col">
        </div>
      </div>
    </div>
  )
}

const AddSym = ({ showItemsBtn, addItem, addLabel }) => {
  let plusBtn = "";
  if (showItemsBtn === "ShowItemBtn") {
    plusBtn = (
      <button className="col extcredits solidgreen m-1"
        onClick={addItem}>
        <img className="gear mt-2 mb-2" title={addLabel} alt={addLabel} src="./itemicons/plus.svg" />
      </button>
    )
  } else {
    plusBtn = "";
  }
  return (
    <>
      {plusBtn}
    </>
  );
}

const Dropdown = ({ search, crsShow }) => {
  const showHideSearch = spData.noMenuSearch ? "d-none" : "d-block";
  const showHideCredits = spData.noMenuCredits ? "d-none" : "d-block";
  const menuClass = `dropdown-menu${dropDownIsOpen ? " show d-flex flex-column justify-content-center align-items-center" : " disNone"}`;
  return (
    <div className="dropdown"
      onClick={() => dropDownIsOpen = !dropDownIsOpen}>
      <button
        className="button indaco m-1 dropdown-toggle"
        id="menuButton"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
      >
        Menu
      </button>
      <div className={menuClass + " menuBG"} >
        <button className={showHideSearch + " col menuItem green m-1"}
          onClick={search}>
          {spData.menuSearchLabel}
        </button>
        <button className={showHideCredits + " col menuItem blue m-1"}
          onClick={crsShow}>
          {spData.menuCreditsLabel}
        </button>
      </div>
    </div>
  );
}

const DropdownCat = ({ items, id, catName, setCat }) => {
  const menuClass = `dropdown-menu${catDropDownIsOpen ? " show d-flex flex-column justify-content-start align-items-center" :
    " disNone"}`;
  return (
    <div className="dropdown"
      onClick={() => catDropDownIsOpen = !catDropDownIsOpen}>
      <button
        className="button indaco m-1 dropdown-toggle"
        id={id}
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
      >
        {catName}
      </button>
      <div className={menuClass + " menuBG"}>
        <button className="col menuItem green m-1"
          onClick={(e) => {
            setCat("Root", e);
          }}>
          Root
        </button>
        {
          items.map(({ id, title, icon }, i) => {
            return (
              <button className="col menuItem green m-1"
                onClick={(e) => {
                  setCat(title, e);
                }}>
                {title}
              </button>
            )
          })
        }
      </div>
    </div>
  );
}

const LoginGear = ({ handleShowButtons }) => {
  return (
    <img className="gear mt-2 mb-2" alt="Login" src="./img/gears.svg" onClick={() => handleShowButtons(true)} />
  );
}

const SettingsGear = ({ showItemsBtn }) => {
  const whiteOrCol = showItemsBtn ? "./img/colGear.svg" : "./img/gear.svg"
  return (
    <img className="gear mt-2 mb-2" alt="Settings" title="Settings" src={whiteOrCol} />
  );
}

const Alert = ({ alertShow, alertMsg, alertCol, children }) => {
  return (
    <div className={`mb-2 ${alertShow ? 'alert-shown' : 'alert-hidden'}`} >
      <div className="row text-center pt-2">
        <div className="col">
          <div className="row">
            <section className={"col pt-2 contenitore " + alertCol + " latowhite d-flex justify-content-center align-items-center "}>
              <div>
                <p className="norfont">{alertMsg}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImgElement = ({ type }) => {
  let imma = "";
  switch (type) {
    case "overlay":
      imma = (
        <img className="overlay" alt="Overlay" src={spData.LogoIcon} />
      )
      break;
    case "redPoint":
      imma = (
        <img className="gear menux mt-2 mb-2" title="Hidden" alt="Hidden" src="./img/point.svg" />
      )
      break;
    case "iRedPoint":
      imma = (
        <div class="col-2 borderleft itemx d-flex flex-column justify-content-center align-items-center">
          <img className="itemx mt-2 mb-2" title="Hidden" alt="Hidden" src="./img/point.svg" />
        </div>
      );
      break;
    case "logo":
      imma = (
        <img className="logo mt-2 mb-2" title="Home" alt="Logo" src={spData.LogoIcon}
          onClick={() => window.location.href = spData.homeLink} />
      );
      break;
    default:
      imma = "";
      break;
  }
  return (
    <>
      {imma}
    </>
  )
}

// const OverlayImg = () => {
//   return (
//     <img className="overlay" alt="Overlay" src={spData.LogoIcon} />
//   );
// }

// const RedPoint = () => {
//   return (
//     <img className="gear menux mt-2 mb-2" title="Hidden" alt="Hidden" src="./img/point.svg" />
//   );
// }

// const ItemRedPoint = () => {
//   return (
//     <div class="col-2 borderleft itemx d-flex flex-column justify-content-center align-items-center">
//       <img className="itemx mt-2 mb-2" title="Hidden" alt="Hidden" src="./img/point.svg" />
//     </div>
//   );
// }

// const LogoImg = () => {
//   return (
//     <img className="logo mt-2 mb-2" title="Home" alt="Logo" src={spData.LogoIcon}
//       onClick={() => window.location.href = spData.homeLink} />
//   );
// }

// FUNCTIONS

async function fetchUpPHP(file, url, key) {
  // console.log("fetchUpPHP...");
  var data = new FormData()
  data.append(key, file)
  await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': '*/*'
    },
    body: data
  }).then((response) => response.json())
    .then((json) => {
      nome = json.filename;
      // console.log("Image Upload:", nome);
    });
}

async function fetchUpConfig(file, url, key) {
  var data = new FormData()
  data.append(key, JSON.stringify(file))
  await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': '*/*'
    },
    body: data
  }).then((response) => response.json())
    .then((json) => {
      // console.log("Json status: " + json.status);
    });
}

async function fetchDownCredentials(url) {
  await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': '*/*'
    },
  }).then((response) => response.json())
    .then((json) => {
      credentials = json;
      // console.log("User: " + credentials.user);
      // console.log("Password: " + credentials.password);
    });
}

async function fetchDelPHP(itemIcon, url, key) {
  var data = new FormData()
  data.append(key, itemIcon)
  await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': '*/*'
    },
    body: data
  }).then((response) => response.json())
    .then((json) => {
      // console.log(json.status);
    });
}

async function hashUsrPsw(plaintextUser, plaintextPass) {
  const hashUsr = await bcrypt.hash(plaintextUser, 10);
  const hashPsw = await bcrypt.hash(plaintextPass, 10);
  return [hashUsr, hashPsw];
}

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

function Orologio() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);
  return (
    <div className="Orologio">
      {/* <ClockIcon /> */}
      <p className="medfont">
        {dateState.toLocaleString('it-IT', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false,
        })}
      </p>
      {/* <CalenderIcon /> */}
      <p className="smallfont">
        {' '}
        {dateState.toLocaleDateString('it-IT', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </p>
    </div>
  );
}

// MAIN

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoShow: false,
      addInfoShow: false,
      mainBtn: false,
      catFirst: true,
      itemsBtnShow: "null",
      items: [],
      rootItems: [],
      cats: [],
      resItems: [],
      catItems: [],
      creditsItems: [],
      menuShow: false,
      titleShow: false,
      logoShow: false,
      clockShow: false,
      titleDiaShow: false,
      menuDiaShow: false,
      logoDiaShow: false,
      loginDiaShow: false,
      addInfoDiaShow: false,
      loginEditDiaShow: false,
      infoDiaShow: false,
      itemEditDiaShow: false,
      itemDelDiaShow: false,
      itemAddDiaShow: false,
      itemVideoDiaShow: false,
      catEditDiaShow: false,
      catDelDiaShow: false,
      catAddDiaShow: false,
      crsEditDiaShow: false,
      crsDelDiaShow: false,
      crsAddDiaShow: false,
      crsDiaShow: false,
      searchDiaShow: false,
      catDiaShow: false,
      iocDiaShow: false,
      videoLink: tempItemLink,
      okShow: false,
      altOkShow: false,
      display: false,
      alertShow: false,
      alertMsg: "",
      alertCol: "",
      errShow: false,
      errMsg: "",
      errCol: "",
      upShow: false,
      activityChanged: false,
      cPos: "",
      disFieldB: false,
      disFieldBC: false,
      disFieldT: false,
      disFieldT2: false,
      disFieldT3: false,
      disFieldC: false,
      disFieldC2: false,
      disFieldC3: false,
      disFieldIA: true,
      disFieldIE: false,
      disFieldMS: false,
      disFieldMC: false,
      catSel: "Root",
      selectedCat: "Root",
      refresh: false,
      onlyRead: false,
      backStyle: {
        backgroundImage: "",
        backgroundColor: "",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: "fixed",
        position: "fixed",
        padding: "0",
        margin: "0",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        filter: "brightness(100%)",
        zIndex: "-1"
      },
      catStyle: {
        backgroundImage: "",
        backgroundColor: "",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: "fixed",
        position: "fixed",
        padding: "0",
        margin: "0",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        filter: "brightness(100%)",
        zIndex: "-1"
      }
    }
    this.itemEditDel = this.itemEditDel.bind(this);
    this.addItem = this.addItem.bind(this);
    // this.itemOrCat = this.itemOrCat.bind(this);
    this.catEditDel = this.catEditDel.bind(this);
    this.catAddItem = this.catAddItem.bind(this);
    this.crsEditDel = this.crsEditDel.bind(this);
    this.crsAddItem = this.crsAddItem.bind(this);
    this.itemVideo = this.itemVideo.bind(this);
    this.catCont = this.catCont.bind(this);
    this.search = this.search.bind(this);
    this.setCat = this.setCat.bind(this);
    this.showMainButtons = this.showMainButtons.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.loginSession = this.loginSession.bind(this);
  }

  componentDidMount() {
    fetch('./config/data.json').then(response => {
      response.json().then(settings => {
        // console.log(settings);
        spData = settings;
        // console.log("Apps: ", settings.items);
        this.setState({
          infoShow: spData.infoShow,
          addInfoShow: spData.addInfoShow,
          mainBtn: spData.mainBtn,
          catFirst: spData.catFirst,
          itemsBtnShow: spData.itemsBtnShow,
          menuShow: spData.menuShow,
          titleShow: spData.titleShow,
          logoShow: spData.logoShow,
          clockShow: spData.clockShow,
          items: spData.items,
          cats: spData.cats,
          creditsItems: spData.creditsItems,
          disFieldB: spData.noBackImage,
          disFieldBC: spData.noCatImage,
          disFieldT: spData.noFootTitle,
          disFieldT2: spData.noFootSubtitle,
          disFieldT3: spData.noFootSubtitle2,
          disFieldC: spData.noFootAddTitle,
          disFieldC2: spData.noFootAddSubtitle,
          disFieldC3: spData.noFootAddSubtitle2,
          disFieldMS: spData.noMenuSearch,
          disFieldMC: spData.noMenuCredits
        });
        document.title = spData.headTitle;
        if (!spData.noFootTitle) {
          document.querySelector('meta[name="description"]').setAttribute("content", spData.footTitle);
        } else if (!spData.noFootSubtitle) {
          document.querySelector('meta[name="description"]').setAttribute("content", spData.footSubtitle);
        } else if (!spData.noFootSubtitle2) {
          document.querySelector('meta[name="description"]').setAttribute("content", spData.footSubtitle2);
        }
        // console.log("BGOpacity:", (1 - spData.backgroundOpacity).toString());
        if (spData.noBackImage) {
          this.setState({
            backStyle: {
              backgroundImage: "none",
              backgroundColor: spData.backgroundColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed",
              position: "fixed",
              padding: "0",
              margin: "0",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              filter: "brightness(" + spData.backgroundOpacity.toString() + "%)",
              zIndex: "-1"
            }
          });
        } else {
          this.setState({
            backStyle: {
              backgroundImage: "url(" + spData.backgroundImage + ")",
              backgroundColor: spData.backgroundColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed",
              position: "fixed",
              padding: "0",
              margin: "0",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              filter: "brightness(" + spData.backgroundOpacity.toString() + "%)",
              zIndex: "-1"
            }
          });
        }

        if (spData.noCatImage) {
          this.setState({
            catStyle: {
              backgroundImage: "none",
              backgroundColor: spData.catColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed",
              position: "fixed",
              padding: "0",
              margin: "0",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              opacity: spData.catOpacity.toString(),
              zIndex: "-1"
            }
          });
        } else {
          this.setState({
            catStyle: {
              backgroundImage: "url(" + spData.catImage + ")",
              backgroundColor: spData.catColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed",
              position: "fixed",
              padding: "0",
              margin: "0",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              opacity: spData.catOpacity.toString(),
              zIndex: "-1"
            }
          });
        }

        // RESET FORMS TO CURRENT SETTINGS
        document.getElementById('loginForm').reset();
        document.getElementById('loginEditForm').reset();
        document.getElementById('titleForm').reset();
        document.getElementById('logoForm').reset();
        document.getElementById('menuForm').reset();
        document.getElementById('infoForm').reset();
        document.getElementById('creditForm').reset();
        document.getElementById('itemEditForm').reset();
        document.getElementById('itemAddForm').reset();
        document.getElementById('catEditForm').reset();
        document.getElementById('catAddForm').reset();
        document.getElementById('crsEditForm').reset();
        document.getElementById('crsAddForm').reset();
        document.getElementById('backEditForm').reset();
        document.getElementById('clockForm').reset();
        document.getElementById('searchForm').reset();
        this.itemCatSel("Root", spData.items);
        document.addEventListener('click', e => {
          currElement = document.elementFromPoint(e.clientX, e.clientY).id;
          this.hideDropdown();
        }, { passive: true });
        // console.log("Items: ", this.state.items);
        // console.log("Root Items: ", this.state.rootItems);
        // console.log("Check password: ", comparePassword("admin", password));
        // console.log("Hashed first password: ", hashPassword(password));
        // console.log("loginColor: ", spData.loginColor);
      })
        .catch(error => {
          window.location.reload(true);
          console.error("Errore: ", error);
        });
    })
  }

  componentDidUpdate() {
    // this.userInput.focus();
    // this.userChangeInput.focus();
    this.searchInput.focus();
  }

  // ACTIONS

  saveFile(file, url, key) {
    fetchUpConfig(file, url, key)
      .then(res => {
        console.log("Config Saved!");
        this.itemCatSel(tempCatTitle, spData.items);
        this.itemCatSel("Root", spData.items);
        // console.log("Save Conf. result=", res);
        // console.log("TempCat= ", tempCatTitle);
      });;
  }

  saveImgFile(file, url, op) {
    if (fileImg !== null) {
      fetchDelPHP(tempIcon, "./api/img-upload.php", url)
        .then(res => {
          // console.log("Seems deleted!");
          // console.log("Delete result=", res);
        });

    }
    if (fileCatImg !== null) {
      fetchDelPHP(tempCatIcon, "./api/img-upload.php", url)
        .then(res => {
          // console.log("Seems deleted!");
          // console.log("Delete result=", res);
        });

    }
    tempIcon = "";
    tempCatIcon = "";
    this.fireAlert("Loading data... Please wait.", "solidblue");
    this.setState({
      activityChanged: true
    })
    fetchUpPHP(file, "./api/img-upload.php", url)
      .then(res => {
        if (url === "logo" && op === "edit") {
          spData.LogoIcon = "./img/" + nome;
          this.fireAlert("Changes Made!", "solidgreen");
          this.setState({
            activityChanged: false
          });
        } else if (url === "icon" && op === "edit") {
          if (fileImg !== null) {
            // console.log("Icon edit TEMP4: ", temp4);
            array[temp].icon = "./itemicons/" + nome;
          }
          if (temp2 !== "") {
            array[temp].title = temp2;
          }
          if (temp3 !== "") {
            array[temp].link = temp3;
          }
          array[temp].video = temp4;
          array[temp].cat = temp5;
          array[temp].descr = temp6;
          if (blockHide !== "none") {
            array[temp].hidden = blockHide;
          }
          // console.log("SaveImageFile InPos: ", inPos);
          if (inPos !== "") {
            let index = 0;
            if (tempCatTitle !== "Root") {
              // console.log("tempCatTitle !== Root", inPos);
              index = this.state.catItems[inPos].id;
            } else {
              // console.log("tempCatTitle === Root", inPos);
              index = this.state.rootItems[inPos].id;
            }
            // console.log("Index: ", index);
            // console.log("temp: ", temp);
            newItem.icon = array[temp].icon;
            newItem.title = array[temp].title;
            newItem.link = array[temp].link;
            newItem.descr = array[temp].descr;
            newItem.video = array[temp].video;
            newItem.cat = array[temp].cat;
            newItem.id = index;
            newItem.hidden = array[temp].hidden;
            var noAddArray = [];
            if (index > temp) {
              array = this.addAfter(array, index + 1, newItem);
              for (let i = (index + 1); i < array.length; i++) {
                (array[i].id)++;
              }

              tempIcon = "";
              array.splice(temp, 1);
              for (let i = (temp); i < array.length; i++) {
                (array[i].id)--;
              }
              noAddArray = [...array];
              this.setState({ items: array });
              spData.items = noAddArray;
              console.log("index > temp = ", (index));
              this.itemEditDel("itemEdit", newItem.id, (index))
            } else {
              array = this.addAfter(array, index, newItem);
              for (let i = (index + 1); i < array.length; i++) {
                (array[i].id)++;
              }
              tempIcon = "";
              array.splice(temp + 1, 1);
              for (let i = (temp + 1); i < array.length; i++) {
                (array[i].id)--;
              }
              noAddArray = [...array];
              this.setState({ items: array });
              spData.items = noAddArray;
              console.log("Index = ", index);
              this.itemEditDel("itemEdit", newItem.id, index)
            }

            newItem = {
              "title": "",
              "link": "",
              "icon": "",
              "descr": "",
              "video": false,
              "cat": "",
              "id": 0,
              "hidden": false
            };
          }
          inPos = "";
          cgPos = "";
          currPos = "";
          temp2 = "";
          temp3 = "";
          temp4 = "";
          temp5 = tempCatTitle;
          temp6 = "";
          blockHide = "none";

          this.fireAlert("Changes Made!", "solidgreen");
        } else if (url === "icon" && op === "add") {
          // console.log("Icon add TEMP4: ", temp4);
          newItem.icon = "./itemicons/" + nome;
          newItem.title = temp2;
          newItem.link = temp3;
          newItem.descr = temp6;
          newItem.video = temp4;
          newItem.cat = temp5;
          if (blockHide !== "none") {
            newItem.hidden = blockHide;
          } else {
            newItem.hidden = false;
          }
          let index = 0;
          // console.log("Insert pos=", (inPos));
          if (arrayLength !== 0) {
            if (tempCatTitle !== "Root") {
              index = this.state.catItems[inPos].id;
            } else {
              index = this.state.rootItems[inPos].id;
            }
          }
          newItem.id = index;
          tempIcon = "";
          arrayAdd = this.addAfter(array, index, newItem);
          for (let i = (index + 1); i < arrayAdd.length; i++) {
            (arrayAdd[i].id)++;
          }
          this.setState({ items: arrayAdd });
          spData.items = arrayAdd;
          arrayAdd = [];
          arrayLength++;
          inPos = "";
          temp = "";
          temp2 = "";
          temp3 = "";
          temp4 = "";
          temp5 = tempCatTitle;
          temp6 = "";
          blockHide = "none";
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0,
            "hidden": false
          };
          this.setState({ disFieldIA: true });
          document.getElementById('itemAddForm').reset();
          this.fireAlert("Item added!", "solidgreen");
        } else if (url === "icon" && op === "addlast") {
          // console.log("Icon addLast TEMP4: ", temp4);
          newItem.icon = "./itemicons/" + nome;
          newItem.title = temp2;
          newItem.link = temp3;
          newItem.descr = temp6;
          newItem.video = temp4;
          newItem.cat = temp5;
          if (blockHide !== "none") {
            newItem.hidden = blockHide;
          } else {
            newItem.hidden = false;
          }
          newItem.id = arrayLength;
          inPos = arrayLength;
          // console.log("Pos: ", inPos);
          tempIcon = "";
          arrayAdd = this.addAfter(array, inPos, newItem);
          this.setState({ items: arrayAdd });
          spData.items = arrayAdd;
          // console.log("Array: ", array);
          // console.log("ArrayAdd: ", arrayAdd);
          // console.log("CatItems: ", spData.items);
          arrayAdd = [];
          arrayLength = arrayLength + 1;
          inPos = "";
          temp = "";
          temp2 = "";
          temp3 = "";
          temp4 = "";
          temp5 = tempCatTitle;
          temp6 = "";
          blockHide = "none";
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0,
            "hidden": false
          };
          this.setState({ disFieldIA: true });
          document.getElementById('itemAddForm').reset();
          this.fireAlert("Item added!", "solidgreen");
        } else if (url === "cat" && op === "edit") {
          if (fileImg !== null) {
            // console.log("Cat edit!");
            array[currPos].icon = "./itemicons/" + nome;
          }
          // console.log("temp2: ", temp2);
          if (temp2 !== "") {
            array[currPos].title = temp2;
            this.state.items.forEach(element => {
              if (element.cat === tempCatTitle) {
                element.cat = temp2;
              }
            })
          }
          if (blockHide !== "none") {
            array[currPos].hidden = blockHide;
          }
          if (temp !== "") {
            // console.log("CurrPos: ", currPos);
            // console.log("InPos: ", inPos);
            catNewItem.icon = array[currPos].icon;
            catNewItem.title = array[currPos].title;
            catNewItem.hidden = array[currPos].hidden;
            if (inPos > currPos) {
              arrayAdd = this.addAfter(array, inPos + 1, catNewItem);
              tempIcon = "";
              arrayAdd.splice(currPos, 1);
              this.setState({ cats: arrayAdd });
              spData.cats = arrayAdd;
            } else {
              arrayAdd = this.addAfter(array, inPos, catNewItem);
              tempIcon = "";
              arrayAdd.splice(currPos + 1, 1);
              this.setState({ cats: arrayAdd });
              spData.cats = arrayAdd;
            }
          }
          arrayAdd = [];
          temp2 = "";
          temp = "";
          fileImg = null;
          blockHide = "none";
          catNewItem = {
            "title": "",
            "icon": "",
            "hidden": false
          };
          this.fireAlert("Changes Made!", "solidgreen");
        } else if (url === "cat" && op === "add") {
          // console.log("CatAdd in Pos: ", inPos);
          catNewItem.icon = "./itemicons/" + nome;
          catNewItem.title = temp2;
          if (blockHide !== "none") {
            catNewItem.hidden = blockHide;
          } else {
            catNewItem.hidden = false;
          }
          tempIcon = "";
          arrayAdd = this.addAfter(array, inPos, catNewItem);
          // console.log("Insert pos=", (inPos));
          this.setState({ cats: arrayAdd });
          spData.cats = arrayAdd;
          arrayAdd = [];
          temp2 = "";
          temp = "";
          blockHide = "none";
          catNewItem = {
            "title": "",
            "icon": "",
            "hidden": false
          };
          document.getElementById('catAddForm').reset();
          this.fireAlert("Cat added!", "solidgreen");
        } else if (url === "cat" && op === "addlast") {
          // console.log("CatAddLast...");
          catNewItem.icon = "./itemicons/" + nome;
          catNewItem.title = temp2;
          if (blockHide !== "none") {
            catNewItem.hidden = blockHide;
          } else {
            catNewItem.hidden = false;
          }
          // console.log("CatNewItem: ", catNewItem);
          inPos = array.length;
          // console.log("Pos: ", inPos);
          tempIcon = "";
          arrayAdd = this.addAfter(array, inPos, catNewItem);
          this.setState({ cats: arrayAdd });
          spData.cats = arrayAdd;
          // console.log("Array: ", array);
          // console.log("ArrayAdd: ", arrayAdd);
          // console.log("CatItems: ", spData.cats);
          arrayAdd = [];
          temp2 = "";
          inPos = "";
          blockHide = "none";
          catNewItem = {
            "title": "",
            "icon": "",
            "hidden": false
          };
          document.getElementById('catAddForm').reset();
          this.fireAlert("Cat added!", "solidgreen");
        } else if (url === "back" && op === "edit") {
          spData.backgroundImage = "./img/" + nome;
          spData.backgroundColor = this.hexToRgb(tempColor) + ", 1)";
          this.setState({
            backStyle: {
              backgroundImage: "url(" + spData.backgroundImage + ")",
              backgroundColor: spData.backgroundColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed",
              position: "fixed",
              padding: "0",
              margin: "0",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              filter: "brightness(" + spData.backgroundOpacity.toString() + "%)",
              zIndex: "-1"
            }
          });
          this.fireAlert("Changes Made!", "solidgreen");
          this.setState({
            activityChanged: false
          });
        } else if (url === "backcat" && op === "edit") {
          spData.catImage = "./img/" + nome;
          spData.catColor = this.hexToRgb(tempCatColor) + ", 1)";
          this.setState({
            catStyle: {
              backgroundImage: "url(" + spData.catImage + ")",
              backgroundColor: spData.catColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed",
              position: "fixed",
              padding: "0",
              margin: "0",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              opacity: spData.catOpacity.toString(),
              zIndex: "-1"
            }
          });
          this.fireAlert("Changes Made!", "solidgreen");
          this.setState({
            activityChanged: false
          });
        }
        this.saveFile(spData, "./api/img-upload.php", "config");
        fileCatImg = null;
        fileImg = null;
      });
  }

  saveCrs(url, op) {
    if (url === "crs" && op === "add") {
      CrsNewItem.title = temp2;
      CrsNewItem.link = temp3;
      CrsNewItem.descr = temp4;
      arrayAdd = this.addAfter(array, inPos, CrsNewItem);
      this.setState({ creditsItems: arrayAdd });
      spData.creditsItems = arrayAdd;
      document.getElementById('crsAddForm').reset();
    } else if (url === "crs" && op === "addlast") {
      CrsNewItem.title = temp2;
      CrsNewItem.link = temp3;
      CrsNewItem.descr = temp4;
      inPos = array.length;
      arrayAdd = this.addAfter(array, inPos, CrsNewItem);
      this.setState({ creditsItems: arrayAdd });
      spData.creditsItems = arrayAdd;
      document.getElementById('crsAddForm').reset();
    } else if (url === "crs" && op === "edit") {
      if (temp2 !== "") {
        array[currPos].title = temp2;
      }
      if (temp3 !== "") {
        array[currPos].link = temp3;
      }
      if (temp4 !== "") {
        array[currPos].descr = temp4;
      }
      if (cgPos !== "") {
        // console.log("CurrPos: ", currPos);
        // console.log("InPos: ", inPos);
        CrsNewItem.title = array[currPos].title;
        CrsNewItem.link = array[currPos].link;
        CrsNewItem.descr = array[currPos].descr;
        if (inPos > currPos) {
          arrayAdd = this.addAfter(array, inPos + 1, CrsNewItem);
          arrayAdd.splice(currPos, 1);
          this.setState({ creditsItems: arrayAdd });
          spData.creditsItems = arrayAdd;
        } else {
          arrayAdd = this.addAfter(array, inPos, CrsNewItem);
          arrayAdd.splice(currPos + 1, 1);
          this.setState({ creditsItems: arrayAdd });
          spData.creditsItems = arrayAdd;
        }
      }
    }
    arrayAdd = [];
    temp = "";
    temp2 = "";
    temp3 = "";
    temp4 = "";
    cgPos = "";
    inPos = "";
    CrsNewItem = {
      "title": "",
      "link": "",
      "descr": ""
    };
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  hexToRgb(hex) {
    hex = hex.replace(/[^0-9A-F]/gi, '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return "rgba(" + r + ", " + g + ", " + b;
  }

  rgbToHex(rgb) {
    // console.log("spData: ", spData);
    // console.log("loginColor: ", spData.loginColor);
    // console.log("logoColor: ", spData.logoColor);
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    var r = parseInt(rgb[0]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  itemSearchReset = () => {
    document.getElementById('searchForm').reset();
    this.setState({ resItems: [] });
    temp = "";
    this.setState({
      onlyRead: false
    })
    this.setState({
      activityChanged: false
    })
  }

  itemSearch = () => {
    if (temp !== "") {
      let count = 0;
      for (let i = 0; i < this.state.items.length; i++) {
        if (this.state.items[i].title.toLowerCase().includes(temp.toLowerCase()) ||
          this.state.items[i].descr.toLowerCase().includes(temp.toLowerCase())) {
          newItem.icon = this.state.items[i].icon;
          newItem.title = this.state.items[i].title;
          newItem.link = this.state.items[i].link;
          newItem.descr = this.state.items[i].descr;
          newItem.video = this.state.items[i].video;
          newItem.cat = this.state.items[i].cat;
          newItem.id = this.state.items[i].id;
          newItem.hidden = this.state.items[i].hidden;
          arrayAdd = this.addAfter(arrayAdd, count, newItem);
          count++;
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0,
            "hidden": false
          };
        }
      }
      count = 0;
      // console.log("Insert pos=", (inPos));
      this.setState({ resItems: arrayAdd });
      arrayAdd = [];
      newItem = {
        "title": "",
        "link": "",
        "icon": "",
        "descr": "",
        "video": false,
        "cat": "",
        "id": 0,
        "hidden": false
      };
      this.fireAlert("Search results:", "solidgreen");
      this.setState({
        onlyRead: true
      })
      this.setState({
        activityChanged: true
      })
    } else {
      this.fireAlert("Enter at least one character.", "brick");
    }
  }

  itemCatSel = (cat, items) => {
    if (items.length > 0) {
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        if (items[i].cat.toLowerCase().includes(cat.toLowerCase())) {
          newItem.icon = items[i].icon;
          newItem.title = items[i].title;
          newItem.link = items[i].link;
          newItem.descr = items[i].descr;
          newItem.video = items[i].video;
          newItem.cat = items[i].cat;
          newItem.id = items[i].id;
          newItem.hidden = items[i].hidden;
          arrayAdd = this.addAfter(arrayAdd, count, newItem);
          count++;
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "Root",
            "id": 0,
            "hidden": false
          };
        }
      }
      count = 0;
      if (cat === "Root") {
        this.setState({ rootItems: arrayAdd });
      } else {
        this.setState({ catItems: arrayAdd });
      }
      arrayAdd = [];
      newItem = {
        "title": "",
        "link": "",
        "icon": "",
        "descr": "",
        "video": false,
        "cat": "Root",
        "id": 0,
        "hidden": false
      };
    }
  }

  fireAlert = (msg, color) => {
    this.setState({
      alertMsg: msg,
      alertCol: color,
      alertShow: true
    });
    setTimeout(() => this.setState({ alertShow: false }), 1500);
  }

  addAfter(array, index, newItem) {
    return [
      ...array.slice(0, index),
      newItem,
      ...array.slice(index)
    ];
  }

  // HEAD ACTIONS

  saveMenu = () => {
    if (disable1 !== "none") {
      spData.noMenuSearch = disable1;
    }
    if (temp !== "") {
      spData.menuSearchLabel = temp;
    }
    if (disable2 !== "none") {
      spData.noMenuCredits = disable2;
    }
    if (temp2 !== "") {
      spData.menuCreditsLabel = temp2;
    }
    spData.menuColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
    spData.menuOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
    if (blockHide !== "none") {
      spData.menuShow = blockHide;
    }
    this.fireAlert("Changes Made!", "solidgreen");
    this.saveFile(spData, "./api/img-upload.php", "config");
    temp = "";
    temp2 = "";
    blockHide = "none";

    disable1 = "none";
    disable2 = "none";
  }

  saveTitle = () => {
    if (temp !== "") {
      spData.headTitle = temp;
    }
    // console.log("Titolo: " + spData.headTitle);
    spData.headColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
    spData.headOpacity = parseFloat(tempOpacity.replace(/,/g, "."))/* .toFixed(1) */;
    spData.headTextColor = this.hexToRgb(tempTextColor) + ", 1)";
    spData.headColW = tempColW;
    // console.log("Colore: " + spData.headColor);
    if (blockHide !== "none") {
      spData.titleShow = blockHide;
    }
    blockHide = "none";
    temp = "";
    this.fireAlert("Changes Made!", "solidgreen");
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  saveLogo = () => {
    if (fileImg !== null) {
      tempIcon = spData.LogoIcon;
      this.saveImgFile(fileImg, "logo", "edit");
      spData.logoColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.logoOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
      spData.logoColW = tempColW;
      if (blockHide !== "none") {
        spData.logoShow = blockHide;
      }
      blockHide = "none";
    } else {
      spData.logoColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.logoOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
      spData.logoColW = tempColW;
      if (blockHide !== "none") {
        spData.logoShow = blockHide;
      }
      blockHide = "none";
      this.fireAlert("Changes Made!", "solidgreen");
      this.saveFile(spData, "./api/img-upload.php", "config");
    }
  }

  saveClock = () => {
    spData.clockColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
    spData.clockOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
    spData.clockTextColor = this.hexToRgb(tempTextColor) + ", 1)";
    spData.clockColW = tempColW;
    if (blockHide !== "none") {
      spData.clockShow = blockHide;
    }
    blockHide = "none";
    this.fireAlert("Changes Made!", "solidgreen");
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  saveBack = () => {
    var changes = false;

    if (fileImg !== null) {
      tempIcon = spData.backgroundImage;
      this.saveImgFile(fileImg, "back", "edit");
      changes = true;
    }

    console.log("Tempopacity:", tempOpacity);
    console.log("BackgroundOpacity:", spData.backgroundOpacity.toString());
    console.log("Tempopacity1:", tempOpacity1);
    console.log("CatBackgroundOpacity:", spData.catOpacity.toString());

    if (tempColor !== this.rgbToHex(spData.backgroundColor)
      || tempOpacity !== spData.backgroundOpacity.toString() || disable1 !== "none") {
      if (disable1 !== "none") {
        spData.noBackImage = disable1;
      }
      spData.backgroundColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.backgroundOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
      this.setState({
        activityChanged: true
      })

      if (spData.noBackImage) {
        this.setState({
          backStyle: {
            backgroundImage: "none",
            backgroundColor: spData.backgroundColor,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed",
            position: "fixed",
            padding: "0",
            margin: "0",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            filter: "brightness(" + spData.backgroundOpacity.toString() + "%)",
            zIndex: "-1"
          }
        });
      } else {
        this.setState({
          backStyle: {
            backgroundImage: "url(" + spData.backgroundImage + ")",
            backgroundColor: spData.backgroundColor,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed",
            position: "fixed",
            padding: "0",
            margin: "0",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            filter: "brightness(" + spData.backgroundOpacity.toString() + "%)",
            zIndex: "-1"
          }
        });
      }
      changes = true;
    }

    if (fileCatImg !== null) {
      tempCatIcon = spData.catImage;
      this.saveImgFile(fileCatImg, "backcat", "edit");
      changes = true;
    }

    if (tempCatColor !== this.rgbToHex(spData.catColor)
      || tempOpacity1 !== spData.catOpacity.toString() || disable2 !== "none") {
      if (disable2 !== "none") {
        spData.noCatImage = disable2;
      }
      spData.catColor = this.hexToRgb(tempCatColor) + ", " + tempOpacity1 + ")";
      spData.catOpacity = parseFloat(tempOpacity1.replace(/,/g, "."));
      this.setState({
        activityChanged: true
      })
      if (spData.noCatImage === true) {
        this.setState({
          catStyle: {
            backgroundImage: "none",
            backgroundColor: spData.catColor,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed",
            position: "fixed",
            padding: "0",
            margin: "0",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            opacity: spData.catOpacity.toString(),
            zIndex: "-1"
          }
        });
      } else {
        this.setState({
          catStyle: {
            backgroundImage: "url(" + spData.catImage + ")",
            backgroundColor: spData.catColor,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed",
            position: "fixed",
            padding: "0",
            margin: "0",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            opacity: spData.catOpacity.toString(),
            zIndex: "-1"
          }
        });
      }
      changes = true;
    }
    console.log("CATFirst: " + categoryFirst);
    if (categoryFirst !== "none") {
      spData.catFirst = categoryFirst;
      this.setState({
        catFirst: categoryFirst
      })
      categoryFirst = "none";
      changes = true;
    }

    if (!changes) {
      this.fireAlert("No changes made!", "solidblue");
    } else {
      this.fireAlert("Changes Made!", "solidgreen");
      this.saveFile(spData, "./api/img-upload.php", "config");
    }
  }

  saveInfo = () => {
    if (disable1 !== "none") {
      spData.noFootTitle = disable1;
    }
    if (temp !== "") {
      spData.footTitle = temp;
    }
    if (disable2 !== "none") {
      spData.noFootSubtitle = disable2;
    }
    if (temp2 !== "") {
      spData.footSubtitle = temp2;
    }
    if (disable3 !== "none") {
      spData.noFootSubtitle2 = disable3;
    }
    if (temp3 !== "") {
      spData.footSubtitle2 = temp3;
    }
    spData.footInfoColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
    spData.footInfoOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
    spData.footInfoTextColor = this.hexToRgb(tempTextColor) + ", 1)";
    spData.footInfoColW = tempColW;
    if (blockHide !== "none") {
      spData.infoShow = blockHide;
    }
    blockHide = "none";
    temp = "";
    temp2 = "";
    temp3 = "";
    disable1 = "none";
    disable2 = "none";
    disable3 = "none";
    this.fireAlert("Changes Made!", "solidgreen");
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  saveAddInfo = () => {
    if (disable1 !== "none") {
      spData.noFootAddTitle = disable1;
    }
    if (temp !== "") {
      spData.footAddTitle = temp;
    }
    if (disable2 !== "none") {
      spData.noFootAddSubtitle = disable2;
    }
    if (temp2 !== "") {
      spData.footAddSubtitle = temp2;
    }
    if (disable3 !== "none") {
      spData.noFootAddSubtitle2 = disable3;
    }
    if (temp3 !== "") {
      spData.footAddSubtitle2 = temp3;
    }

    spData.footAddColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
    spData.footAddOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
    spData.footAddTextColor = this.hexToRgb(tempTextColor) + ", 1)";
    spData.footAddColW = tempColW;
    if (blockHide !== "none") {
      spData.addInfoShow = blockHide;
    }
    blockHide = "none";
    temp = "";
    temp2 = "";
    temp3 = "";
    disable1 = "none";
    disable2 = "none";
    disable3 = "none";
    this.fireAlert("Changes Made!", "solidgreen");
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  // ITEM ACTIONS

  applyItemEdit = () => {
    array = [...this.state.items];
    catArray = [...this.state.catItems];
    if (noDescr === true) {
      temp6 = "";
    }

    // console.log("fileImg: ", fileImg);
    // console.log("temp2: ", temp2);
    // console.log("temp3: ", temp3);
    // console.log("temp4: ", temp4);
    // console.log("tempItemVideo: ", tempItemVideo);
    // console.log("temp5: ", temp5);
    // console.log("tempCatTitle: ", tempCatTitle);
    // console.log("temp6: ", temp6);
    // console.log("tempItemDescr: ", tempItemDescr);
    // console.log("cgPos: ", cgPos);
    // console.log("blockHide: ", blockHide);
    // console.log("tempItemHide: ", tempItemHide);

    if (fileImg !== null || temp2 !== "" || temp3 !== "" || temp4 !== tempItemVideo ||
      temp5 !== tempCatTitle || temp6 !== tempItemDescr || cgPos !== "" ||
      blockHide !== tempItemHide) {
      if (cgPos !== "") {
        if (temp5 === tempCatTitle) {
          inPos = parseInt(cgPos) - 1;
          // console.log("Edit inPos: ", inPos, " currPos: ", currPos);
          if (temp5 === "Root") {
            if (inPos < arrayLength && inPos >= 0 && inPos !== currPos) {
              this.saveImgFile(fileImg, "icon", "edit");
            } else {
              cgPos = "";
              this.fireAlert("Check position!", "brick");
            }
          } else {
            catArrayLength = catArray.length;
            console.log("CatItemLength: ", catArrayLength);
            if (inPos < catArrayLength && inPos >= 0 && inPos !== currPos) {
              this.saveImgFile(fileImg, "icon", "edit");
            } else {
              cgPos = "";
              this.fireAlert("Check position!", "brick");
            }
          }
        } else {
          this.setState({
            cPos: currPos
          })
          this.fireAlert("Don't change position & category at the same time!", "brick");
        }
      } else {
        // console.log("cgPos === \"\"");
        this.saveImgFile(fileImg, "icon", "edit");
      }
    } else {
      // console.log("fileImg - temp2 - temp3 are Null!!!");
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  applyItemAdd = (argo) => {
    console.log("Argo: ", argo);
    array = [...this.state.items];
    tempIcon = "";
    if (noDescr === true) {
      temp6 = "";
    }
    if (fileImg !== null && temp2 !== "" && temp3 !== "") {
      if (temp !== "") {
        inPos = parseInt(temp) - 1;

        // console.log("InPos: ", inPos);
        // console.log("ArrayLength: ", arrayLength);
        if (inPos <= (arrayLength) && inPos >= 0) {
          this.saveImgFile(fileImg, "icon", "add");
        } else {
          this.fireAlert("Fill in all fields / Check position.", "brick");
        }
      } else {
        this.saveImgFile(fileImg, "icon", "addlast");
      }
    } else {
      this.fireAlert("Fill in all fields / Check position.", "brick");
    }
  }

  applyItemDel = () => {
    var array = [...this.state.items];
    var index = parseInt(temp);
    if (index !== -1) {
      fetchDelPHP(tempIcon, "./api/img-upload.php", "icon");
      tempIcon = "";
      array.splice(index, 1);
      for (let i = (index); i < array.length; i++) {
        (array[i].id)--;
      }
      var noAddArray = [...array];
      // console.log("item array after: ", array);
      this.setState({ items: array });
      if (tempCatTitle !== "Root") {
        this.setState({ catItems: array });
      } else {
        this.setState({ rootItems: array });
      }
      spData.items = noAddArray;
    }
    temp = "";
    temp2 = "";
    temp3 = "";
    this.fireAlert("Item removed!", "solidgreen");
    this.saveFile(spData, "./api/img-upload.php", "config");
    setTimeout(() => this.setState({ itemDelDiaShow: false }), 1750);
  }

  // CAT ACTIONS

  applyCatEdit = () => {
    if (fileImg !== null || temp2 !== "" || temp !== "" || blockHide !== tempItemHide) {
      let dup = false;
      for (let i = 0; i < arrayLength; i++) {
        if (array[i].title.toLowerCase() === temp2.toLowerCase()) {
          // console.log("CAT Title Duplicated!!!");
          dup = true;
        }
      }
      if (temp !== "") {
        inPos = parseInt(temp) - 1;
        // console.log("InPos: ", inPos);
        if (inPos < arrayLength && inPos >= 0 && inPos !== currPos && !dup) {
          this.saveImgFile(fileImg, "cat", "edit");
        } else {
          this.fireAlert("No changes made or CAT name duplicated!", "solidblue");
        }
      } else {
        if (!dup) {
          this.saveImgFile(fileImg, "cat", "edit");
        } else {
          this.fireAlert("No changes made or CAT name duplicated!", "solidblue");
        }
      }
    } else {
      // console.log("fileImg - temp2 - temp are \"\"");
      this.fireAlert("No changes made or CAT name duplicated!", "solidblue");
    }
  }

  applyCatAdd = () => {
    array = [...this.state.cats];
    tempIcon = "";
    if (fileImg !== null && temp2 !== "") {
      let dup = false;
      for (let i = 0; i < arrayLength; i++) {
        if (array[i].title.toLowerCase() === temp2.toLowerCase()) {
          // console.log("CAT Title Duplicated!!!");
          dup = true;
        }
      }
      if (temp !== "") {
        inPos = parseInt(temp) - 1;
        // console.log("AddCat (temp full) InPos: ", inPos);
        if (inPos <= arrayLength && !dup && inPos >= 0) {
          this.saveImgFile(fileImg, "cat", "add");
        } else {
          this.fireAlert("Check Position!", "brick");
        }
      } else {
        // console.log("AddCat (temp Empty) inPos: ", inPos);
        if (!dup) {
          this.saveImgFile(fileImg, "cat", "addlast");
        } else {
          this.fireAlert("CAT name duplicated!", "brick");
        }
      }
      // console.log("AddCat InPos (out temp check): ", inPos);
    } else {
      this.fireAlert("Empty Icon or Title!", "brick");
    }
  }

  applyCatDel = () => {
    var array = [...this.state.cats];
    var index = currPos;
    if (index !== -1) {
      fetchDelPHP(tempIcon, "./api/img-upload.php", "icon");
      tempIcon = "";
      array.splice(index, 1);
      var noAddArray = [...array];
      this.setState({ cats: array });
      spData.cats = noAddArray;
    }
    this.state.items.forEach(element => {
      if (element.cat === tempCatTitle) {
        element.cat = "Root";
      }
    })
    currPos = "";
    temp2 = "";
    temp3 = "";
    this.fireAlert("Category removed!", "solidgreen");
    this.saveFile(spData, "./api/img-upload.php", "config");
    setTimeout(() => this.setState({ catDelDiaShow: false }), 1750);
  }

  // CREDITS ACTIONS

  applyCrsEdit = () => {
    if (temp2 !== tempCrsTitle || temp3 !== tempCrsLink || temp4 !== tempCrsDescr || cgPos !== "") {
      if (cgPos !== "") {
        inPos = parseInt(cgPos) - 1;
        // console.log("InPos: ", inPos);
        if (inPos < arrayLength && inPos >= 0 && inPos !== currPos) {
          this.saveCrs("crs", "edit");
          this.fireAlert("Changes Made!", "solidgreen");
          this.setState({
            activityChanged: true
          });
        } else {
          this.fireAlert("No changes made!", "solidblue");
        }
      } else {
        this.saveCrs("crs", "edit");
        this.fireAlert("Changes Made!", "solidgreen");
        this.setState({
          activityChanged: true
        });
      }
    } else {
      // console.log("fileImg - temp2 - temp are \"\"");
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  applyCrsAdd = () => {
    array = [...this.state.creditsItems];
    // console.log("Array Length: ", array.length);
    if (temp2 !== "" && temp3 !== "" && temp4 !== "") {
      if (temp !== "") {
        inPos = parseInt(temp) - 1;
        // console.log("InPos: ", inPos);
        if (inPos < arrayLength/*  && !dup */) {
          this.saveCrs("crs", "add");
          this.fireAlert("Credit added!", "solidgreen");
          this.setState({
            activityChanged: true
          });
        } else {
          this.fireAlert("Fill in all fields!", "brick");
        }
      } else {
        this.saveCrs("crs", "addlast");
        this.fireAlert("Credit added!", "solidgreen");
        this.setState({
          activityChanged: true
        });
      }
      // console.log("fileImg: ", fileImg);
      // console.log("temp: ", temp);
      // console.log("temp2: ", temp2);
      // console.log("temp3: ", temp3);
      // console.log("temp4: ", temp4);
      // console.log("tempItemVideo: ", tempItemVideo);
      // console.log("temp5: ", temp5);
      // console.log("tempCatTitle: ", tempCatTitle);
      // console.log("temp6: ", temp6);
      // console.log("tempItemDescr: ", tempItemDescr);
      // console.log("cgPos: ", cgPos);
      // console.log("inPos: ", inPos);
      // console.log("blockHide: ", blockHide);
      // console.log("tempItemHide: ", tempItemHide);
    } else {
      this.fireAlert("Fill in all fields!", "brick");
    }
  }

  applyCrsDel = () => {
    var array = [...this.state.creditsItems];
    var index = currPos;
    // console.log("Index: ", temp);
    if (index !== -1) {
      array.splice(index, 1);
      var noAddArray = [...array];
      this.setState({ creditsItems: array });
      spData.creditsItems = noAddArray;
    }
    currPos = "";
    temp2 = "";
    temp3 = "";
    temp4 = "";

    this.fireAlert("Credit removed!", "solidgreen");
    this.saveFile(spData, "./api/img-upload.php", "config");
    setTimeout(() => this.setState({ crsDelDiaShow: false }), 1750);
  }

  // LOGIN ACTIONS

  loginSession(id) {
    if (login === false) {
      this.showModal("login");
      this.userInput.focus();
      fetchDownCredentials("./api/img-upload.php");
    } else {
      this.showMainButtons();
    }
  }

  loginCheck = () => {
    // console.log("Login User: " + usrTmp);
    // console.log("Login Psw: " + pswTmp);
    comparePassword(pswTmp, credentials.password)
      .then(pass => {
        comparePassword(usrTmp, credentials.user)
          .then(user => {
            // console.log("PassResult: ", pass)
            // console.log("UserResult: ", user)
            if (user && pass && login === false) {
              login = true;
              usrTmp = "";
              pswTmp = "";
              this.showMainButtons();
              this.hideModal("login");
            } else {
              // if (!user) {
              // console.log("WRONG User: " + usrTmp);
              // }
              // if (!pass) {
              // console.log("WRONG Psw: " + pswTmp)
              // }
              this.fireAlert("Wrong user name or password!", "brick");
              login = false;
            }
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  loginEditCheck = () => {
    if (usrTmp !== "" || pswTmp !== "") {
      // console.log("User: " + usrTmp)
      // console.log("Psw: " + pswTmp)
      spData.loginColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.loginOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
      hashUsrPsw(usrTmp, pswTmp)
        .then(result => {
          // console.log(result)
          credentials.user = result[0];
          // console.log("User: " + usrTmp)
          // console.log("UserHash: " + spData.user)
          credentials.password = result[1];
          // console.log("Psw: " + pswTmp)
          // console.log("PswHash: " + spData.password)
          this.saveFile(credentials, "./api/img-upload.php", "credentials");
          usrTmp = "";
          pswTmp = "";
          this.saveFile(spData, "./api/img-upload.php", "config");
          this.fireAlert("Username and password changed successfully!", "solidgreen");
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      spData.loginColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.loginOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
      this.saveFile(spData, "./api/img-upload.php", "config");
      this.fireAlert("Changes Made!", "solidgreen");
    }
  }

  // SHOW MODALS

  showModal(id) {
    switch (id) {
      case "title":
        tempColW = spData.headColW;
        switch (spData.headColW) {
          case "col":
            radiobtn = document.getElementById("headColAuto");
            radiobtn.checked = true;
            break;
          case "col-1":
            radiobtn = document.getElementById("headCol1");
            radiobtn.checked = true;
            break;
          case "col-2":
            radiobtn = document.getElementById("headCol2");
            radiobtn.checked = true;
            break;
          case "col-3":
            radiobtn = document.getElementById("headCol3");
            radiobtn.checked = true;
            break;
          case "col-4":
            radiobtn = document.getElementById("headCol4");
            radiobtn.checked = true;
            break;
          case "col-5":
            radiobtn = document.getElementById("headCol5");
            radiobtn.checked = true;
            break;
          default:
          // will NOT execute because of the line preceding the switch.
        }
        tempColor = this.rgbToHex(spData.headColor);
        tempOpacity = spData.headOpacity.toString();
        tempTextColor = this.rgbToHex(spData.headTextColor);
        // console.log("Titolo Colore showModal:", this.rgbToHex(spData.headColor));
        this.setState({ titleDiaShow: true });
        break;
      case "login":
        this.setState({ loginDiaShow: true });
        break;
      case "loginEdit":
        tempColor = this.rgbToHex(spData.loginColor);
        tempOpacity = spData.loginOpacity.toString();
        this.setState({ loginEditDiaShow: true });
        break;
      case "menu":
        tempColor = this.rgbToHex(spData.menuColor);
        tempOpacity = spData.menuOpacity.toString();
        this.setState({ menuDiaShow: true });
        break;
      case "logo":
        tempColW = spData.logoColW;
        switch (spData.logoColW) {
          case "col":
            radiobtn = document.getElementById("logoColAuto");
            radiobtn.checked = true;
            break;
          case "col-1":
            radiobtn = document.getElementById("logoCol1");
            radiobtn.checked = true;
            break;
          case "col-2":
            radiobtn = document.getElementById("logoCol2");
            radiobtn.checked = true;
            break;
          case "col-3":
            radiobtn = document.getElementById("logoCol3");
            radiobtn.checked = true;
            break;
          case "col-4":
            radiobtn = document.getElementById("logoCol4");
            radiobtn.checked = true;
            break;
          case "col-5":
            radiobtn = document.getElementById("logoCol5");
            radiobtn.checked = true;
            break;
          default:
          // will NOT execute because of the line preceding the switch.
        }
        tempColor = this.rgbToHex(spData.logoColor);
        tempOpacity = spData.logoOpacity.toString();
        this.setState({ logoDiaShow: true });
        break;
      case "info":
        tempColW = spData.footInfoColW;
        switch (spData.footInfoColW) {
          case "col":
            radiobtn = document.getElementById("infoColAuto");
            radiobtn.checked = true;
            break;
          case "col-1":
            radiobtn = document.getElementById("infoCol1");
            radiobtn.checked = true;
            break;
          case "col-2":
            radiobtn = document.getElementById("infoCol2");
            radiobtn.checked = true;
            break;
          case "col-3":
            radiobtn = document.getElementById("infoCol3");
            radiobtn.checked = true;
            break;
          case "col-4":
            radiobtn = document.getElementById("infoCol4");
            radiobtn.checked = true;
            break;
          case "col-5":
            radiobtn = document.getElementById("infoCol5");
            radiobtn.checked = true;
            break;
          default:
          // will NOT execute because of the line preceding the switch.
        }
        tempColor = this.rgbToHex(spData.footInfoColor);
        tempOpacity = spData.footInfoOpacity.toString();
        tempTextColor = this.rgbToHex(spData.footInfoTextColor);
        this.setState({ infoDiaShow: true });
        break;
      case "addInfo":
        tempColW = spData.footAddColW;
        switch (spData.footAddColW) {
          case "col-md":
            radiobtn = document.getElementById("addInfoColAuto");
            radiobtn.checked = true;
            break;
          case "col-md-1":
            radiobtn = document.getElementById("addInfoCol1");
            radiobtn.checked = true;
            break;
          case "col-md-2":
            radiobtn = document.getElementById("addInfoCol2");
            radiobtn.checked = true;
            break;
          case "col-md-3":
            radiobtn = document.getElementById("addInfoCol3");
            radiobtn.checked = true;
            break;
          case "col-md-4":
            radiobtn = document.getElementById("addInfoCol4");
            radiobtn.checked = true;
            break;
          case "col-md-5":
            radiobtn = document.getElementById("addInfoCol5");
            radiobtn.checked = true;
            break;
          default:
          // will NOT execute because of the line preceding the switch.
        }
        tempColor = this.rgbToHex(spData.footAddColor);
        tempOpacity = spData.footAddOpacity.toString();
        tempTextColor = this.rgbToHex(spData.footAddTextColor);
        this.setState({ addInfoDiaShow: true });
        break;
      case "itemEdit":
        // console.log("CurrPos ", currPos);
        this.setState({
          cPos: currPos
        })
        this.setState({ itemEditDiaShow: true });
        break;
      case "itemDel":
        this.setState({ itemDelDiaShow: true });
        break;
      case "itemAdd":
        this.setState({ itemAddDiaShow: true });
        break;
      case "catEdit":
        this.setState({ catEditDiaShow: true });
        break;
      case "catDel":
        this.setState({ catDelDiaShow: true });
        break;
      case "catAdd":
        this.setState({ catAddDiaShow: true });
        break;
      case "cat":
        this.setState({ catDiaShow: true });
        break;
      case "crsEdit":
        this.setState({ crsEditDiaShow: true });
        break;
      case "crsDel":
        this.setState({ crsDelDiaShow: true });
        break;
      case "crsAdd":
        this.setState({ crsAddDiaShow: true });
        break;
      case "exCrs":
        this.setState({ crsDiaShow: true });
        break;
      case "itemOrCatAdd":
        this.setState({ iocDiaShow: true });
        break;
      case "itemVideo":
        this.setState({ itemVideoDiaShow: true });
        break;
      case "search":
        this.setState({ searchDiaShow: true });
        break;
      case "back":
        tempColor = this.rgbToHex(spData.backgroundColor);
        tempOpacity = spData.backgroundOpacity.toString();
        tempCatColor = this.rgbToHex(spData.catColor);
        tempOpacity1 = spData.catOpacity.toString();
        this.setState({ backEditDiaShow: true });
        break;
      case "clock":
        tempColW = spData.clockColW;
        switch (spData.clockColW) {
          case "col-md":
            radiobtn = document.getElementById("clockColAuto");
            radiobtn.checked = true;
            break;
          case "col-md-1":
            radiobtn = document.getElementById("clockCol1");
            radiobtn.checked = true;
            break;
          case "col-md-2":
            radiobtn = document.getElementById("clockCol2");
            radiobtn.checked = true;
            break;
          case "col-md-3":
            radiobtn = document.getElementById("clockCol3");
            radiobtn.checked = true;
            break;
          case "col-md-4":
            radiobtn = document.getElementById("clockCol4");
            radiobtn.checked = true;
            break;
          case "col-md-5":
            radiobtn = document.getElementById("clockCol5");
            radiobtn.checked = true;
            break;
          default:
          // will NOT execute because of the line preceding the switch.
        }
        tempColor = this.rgbToHex(spData.clockColor);
        tempOpacity = spData.clockOpacity.toString();
        tempTextColor = this.rgbToHex(spData.clockTextColor);
        this.setState({ clockDiaShow: true });
        break;
      default:
      // will NOT execute because of the line preceding the switch.
    }
  };

  // HIDE MODALS

  hideModal(id) {
    switch (id) {
      case "title":
        this.setState({ titleDiaShow: false });
        document.getElementById('titleOpRange').value = "";
        document.getElementById('titleForm').reset();
        break;
      case "menu":
        this.setState({
          disFieldMS: spData.noMenuSearch
        });
        this.setState({
          disFieldMC: spData.noMenuCredits
        });
        disable1 = "none";
        disable2 = "none";
        this.setState({ menuDiaShow: false });
        document.getElementById('menuOpRange').value = "";
        document.getElementById('menuForm').reset();
        break;
      case "login":
        this.setState({ loginDiaShow: false });
        document.getElementById('loginForm').reset();
        break;
      case "loginedit":
        this.setState({ loginEditDiaShow: false });
        document.getElementById('loginOpRange').value = "";
        document.getElementById('loginEditForm').reset();
        break;
      case "logo":
        this.setState({ logoDiaShow: false });
        document.getElementById('logoOpRange').value = "";
        document.getElementById('logoForm').reset();
        break;
      case "info":
        this.setState({
          disFieldT: spData.noFootTitle
        });
        this.setState({
          disFieldT2: spData.noFootSubtitle
        });
        this.setState({
          disFieldT3: spData.noFootSubtitle2
        });
        disable1 = "none";
        disable2 = "none";
        disable3 = "none";
        this.setState({ infoDiaShow: false });
        document.getElementById('infoOpRange').value = "";
        document.getElementById('infoForm').reset();
        break;
      case "addInfo":
        this.setState({
          disFieldC: spData.noFootAddTitle
        });
        this.setState({
          disFieldC2: spData.noFootAddSubtitle
        });
        this.setState({
          disFieldC3: spData.noFootAddSubtitle2
        });
        disable1 = "none";
        disable2 = "none";
        disable3 = "none";
        this.setState({ addInfoDiaShow: false });
        document.getElementById('addInfoOpRange').value = "";
        document.getElementById('creditForm').reset();
        break;
      case "itemEdit":
        this.setState({ itemEditDiaShow: false });
        temp = "";
        document.getElementById('itemEditForm').reset();
        break;
      case "itemDel":
        this.setState({ itemDelDiaShow: false });
        break;
      case "itemAdd":
        this.setState({ itemAddDiaShow: false });
        temp5 = tempCatTitle;
        this.setState({ disFieldIA: true });
        document.getElementById('itemAddForm').reset();
        break;
      case "catedit":
        this.setState({ catEditDiaShow: false });
        document.getElementById('catEditForm').reset();
        break;
      case "catdel":
        this.setState({ catDelDiaShow: false });
        break;
      case "catadd":
        this.setState({ catAddDiaShow: false });
        document.getElementById('catAddForm').reset();
        break;
      case "cat":
        this.setState({ catDiaShow: false });
        tempCatTitle = "Root";
        temp5 = tempCatTitle;
        this.setState({
          catSel: tempCatTitle
        })
        this.setState({ catItems: [] });
        // console.log("Current Cat: ", this.state.catSel);
        this.containerCat.scrollTop = 0;
        break;
      case "crsedit":
        this.setState({ crsEditDiaShow: false });
        document.getElementById('crsEditForm').reset();
        break;
      case "crsdel":
        this.setState({ crsDelDiaShow: false });
        break;
      case "crsadd":
        this.setState({ crsAddDiaShow: false });
        document.getElementById('crsAddForm').reset();
        break;
      case "excrs":
        this.setState({ crsDiaShow: false });
        this.containerCrs.scrollTop = 0;
        break;
      case "video":
        this.setState({ itemVideoDiaShow: false });
        this.stopVideos();
        break;
      case "itemorcat":
        this.setState({ iocDiaShow: false });
        break;
      case "back":
        this.setState({
          disFieldB: spData.noBackImage
        });
        this.setState({
          disFieldBC: spData.noCatImage
        });
        disable1 = "none";
        disable2 = "none";
        categoryFirst = "none";
        this.setState({ backEditDiaShow: false });
        document.getElementById('catOpRange').value = "";
        document.getElementById('backOpRange').value = "";
        document.getElementById('backEditForm').reset();
        break;
      case "clock":
        this.setState({ clockDiaShow: false });
        document.getElementById('clockOpRange').value = "";
        document.getElementById('clockForm').reset();
        break;
      case "search":
        this.setState({ searchDiaShow: false });
        document.getElementById('searchForm').reset();
        this.setState({ resItems: [] });
        temp = "";
        this.setState({
          onlyRead: false
        })
        break;
      default:
      // will NOT execute because of the line preceding the switch.
    }
    tempColor = "";
    tempTextColor = "";
    tempColW = "";
    temp3 = "";
    temp4 = "";
    this.setState({
      activityChanged: false
    });
  };

  // ACTION BUTTONS

  itemsButtonShow(id) {
    if (this.state.itemsBtnShow !== id) {
      this.setState({
        itemsBtnShow: id
      })
    } else {
      this.setState({
        itemsBtnShow: false
      })
    }
  }

  showMainButtons() {
    if (this.state.mainBtn !== true) {
      this.setState({
        mainBtn: true
      })
      this.setState({ menuShow: true });
      this.setState({ titleShow: true });
      this.setState({ logoShow: true });
      this.setState({ clockShow: true });
      this.setState({ infoShow: true });
      this.setState({ addInfoShow: true });
    } else {
      this.setState({
        mainBtn: false
      })
      this.setState({ menuShow: spData.menuShow });
      this.setState({ titleShow: spData.titleShow });
      this.setState({ logoShow: spData.logoShow });
      this.setState({ clockShow: spData.clockShow });
      this.setState({ infoShow: spData.infoShow });
      this.setState({ addInfoShow: spData.addInfoShow });
      login = false;
      var array = [...this.state.items];
      if (this.state.itemsBtnShow !== false) {
        this.setState({
          itemsBtnShow: false
        })
      }
      spData.items = array;
      window.location.reload();
    }
  }

  // CATS OPERATION DIALOGS

  catAddItem() {
    this.hideModal("itemorcat");
    array = [...this.state.cats];
    arrayLength = (array.length);
    tempItemHide = false;
    // temp4 = false;
    document.getElementById('clearcatpos').value = "";
    document.getElementById('clearcattitle').value = "";
    this.showModal("catAdd");
  }

  catEditDel(op, pos) {
    currPos = pos;
    // console.log(op, " for ", pos);
    array = [...this.state.cats];
    arrayLength = (array.length);
    tempCatTitle = array[pos].title;
    tempIcon = array[pos].icon;
    tempItemHide = array[pos].hidden;
    // console.log("Cat Hide : ", tempItemHide);
    // console.log("HideBlock : ", blockHide);
    document.getElementById('clearcatswitchpos').value = "";
    if (op === "CatEdit") {
      this.showModal("catEdit");
    } else {
      this.showModal("catDel");
    }
  }

  // CREDITS OPERATION DIALOGS

  crsAddItem() {
    array = [...this.state.creditsItems];
    arrayLength = (array.length);
    document.getElementById('clearcrspos').value = "";
    document.getElementById('clearcrstitle').value = "";
    document.getElementById('clearcrslink').value = "";
    document.getElementById('clearcrsdescr').value = "";
    this.showModal("crsAdd");
  }

  crsEditDel(op, pos) {
    currPos = pos;
    // console.log(op, " for ", pos);
    array = [...this.state.creditsItems];
    arrayLength = (array.length);
    tempCrsTitle = array[pos].title;
    tempCrsLink = array[pos].link;
    tempCrsDescr = array[pos].descr;
    document.getElementById('clearcrsswitchpos').value = "";
    if (op === "CrsEdit") {
      this.showModal("crsEdit");
    } else {
      this.showModal("crsDel");
    }
  }

  // ITEMS OPERATION DIALOGS

  addItem() {
    this.hideModal("itemorcat");
    noDescr = true;
    array = [...this.state.items];
    arrayLength = (array.length);
    tempItemVideo = false;
    temp4 = false;
    // console.log("AppAdd Temp5: ", temp5);
    this.setState({
      catSel: temp5
    })
    tempCatTitle = temp5;
    tempItemHide = false;
    document.getElementById('clearitempos').value = "";
    document.getElementById('clearitemdescr').value = "";
    document.getElementById('clearitemtitle').value = "";
    document.getElementById('clearitemlink').value = "";
    this.showModal("itemAdd");
  }

  itemEditDel(op, id, pos) {
    temp = id;
    currPos = pos;
    // console.log(op, " for ", id, "pos ", currPos);
    array = [...this.state.items];
    // console.log("Array dialog before : ", array);
    arrayLength = (array.length);
    // console.log("Array dialog lenght: ", arrayLength);
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        tempItemTitle = array[i].title;
        // console.log("App name: ", tempItemTitle);
        tempItemLink = array[i].link;
        tempItemDescr = array[i].descr;
        tempItemHide = array[i].hidden;
        // console.log("Item Hide: ", tempItemHide);
        // console.log("HideBlock: ", blockHide);
        if (tempItemDescr === "") {
          noDescr = true;
          this.setState({
            disFieldIE: true
          });
        } else {
          noDescr = false;
          this.setState({
            disFieldIE: false
          });
        }
        // console.log(" App descr.: ", tempItemDescr);
        tempItemVideo = array[i].video;
        temp4 = array[i].video;
        temp5 = array[i].cat;
        temp6 = array[i].descr;
        blockHide = array[i].hidden;
        this.setState({
          catSel: temp5
        })

        tempCatTitle = temp5;
        // console.log(" Category: ", );
        tempIcon = array[i].icon;
      }
    }
    // console.log(id, " for ", pos);

    if (op === "itemEdit") {
      document.getElementById('clearitemswitchpos').value = "";
      this.showModal("itemEdit");
    } else {
      this.showModal("itemDel");
    }
  }

  // ITEM DIALOG

  itemVideo(id, cat) {
    temp3 = id;
    if (cat === "Root") {
      array = [...this.state.items];
    } else if (cat === "Search") {
      array = [...this.state.resItems];
    } else {
      array = [...this.state.catItems];
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        tempItemTitle = array[i].title;
        this.setState({
          videoLink: array[i].link
        })
      }
    }
    // console.log(id, " for ", pos);
    this.showModal("itemVideo");
  }

  // SERVICE FUNCTIONS

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  handleKeyDownSearch = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.itemSearch();
    }
  }

  hideDropdown = () => {
    if (dropDownIsOpen && currElement !== "menuButton") {
      this.setState({
        refresh: true
      });
      dropDownIsOpen = false;
      // console.log("dropDownIsOpen: ", dropDownIsOpen);
    } else {
      this.setState({
        refresh: false
      });
    }

    if (catDropDownIsOpen && currElement !== "editCatMenuButton" && currElement !== "addCatMenuButton") {
      this.setState({
        refresh: true
      });
      catDropDownIsOpen = false;
      // console.log("dropDownIsOpen: ", dropDownIsOpen);
    } else {
      this.setState({
        refresh: false
      });
    }
  }

  setCat(catName, e) {
    e.preventDefault();
    temp5 = catName;
    this.setState({
      catSel: catName
    })
    // console.log("CatName: ", catName);
  }

  search() {
    this.showModal("search");
    this.searchInput.focus();
  }

  stopVideos = () => {
    this.setState({
      videoLink: ""
    })
  }

  catCont(pos) {
    array = [...this.state.cats];
    // console.log("Cat Array: ", array);
    tempCatTitle = array[pos].title;
    temp5 = tempCatTitle;
    // console.log("Current Cat In: ", tempCatTitle);
    this.itemCatSel(array[pos].title, this.state.items);
    this.showModal("cat");
  }

  // PAGE RENDER

  render() {
    const { mainBtn } = this.state;
    const { catFirst } = this.state;
    const { disFieldB } = this.state;
    const { disFieldBC } = this.state;
    const { disFieldT } = this.state;
    const { disFieldT2 } = this.state;
    const { disFieldT3 } = this.state;
    const { disFieldC } = this.state;
    const { disFieldC2 } = this.state;
    const { disFieldC3 } = this.state;
    const { disFieldIA } = this.state;
    const { disFieldIE } = this.state;
    const { disFieldMS } = this.state;
    const { disFieldMC } = this.state;

    const showHideFootTitle = spData.noFootTitle ? "d-none" : "d-block";
    const showHideFootSub = spData.noFootSubtitle ? "d-none" : "d-block";
    const showHideFootSub2 = spData.noFootSubtitle2 ? "d-none" : "d-block";
    const showHideCrTitle = spData.noFootAddTitle ? "d-none" : "d-block";
    const showHideCrSub = spData.noFootAddSubtitle ? "d-none" : "d-block";
    const showHideCrSub2 = spData.noFootAddSubtitle2 ? "d-none" : "d-block";

    // PAGE COMPONENTS

    let buttons = "";
    let pageBody = "";

    let menuButtons = (
      <>
        <Dropdown search={this.search} crsShow={() => this.showModal("exCrs")}
          refresh={this.state.refresh} />
      </>
    );

    let eCatMenuButtons = (
      <DropdownCat items={this.state.cats} catName={this.state.catSel} id="editCatMenuButton"
        setCat={this.setCat} refresh={this.state.refresh} />
    )

    let aCatMenuButtons = (
      <DropdownCat items={this.state.cats} catName={this.state.catSel} id="addCatMenuButton"
        setCat={this.setCat} refresh={this.state.refresh} />
    )

    // PAGE HEAD

    let head = (
      <div className="row text-center mt-2 mb-2">
        <div className="col">
          <div className="row">
            {/* MENU */}
            <Element eleShow={this.state.menuShow} mainBtn={this.state.mainBtn} id="HeadMenu" sfondo={spData.menuColor} colore={spData.menuTextColor} z={1} colW="col-md-1">
              {menuButtons}
              <EditElement editEleShow={this.state.mainBtn} hidden={spData.menuShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.showModal("menu")}>
                  Edit Menu
                </button>
              </EditElement>
            </Element>
            {/* TITOLO */}
            <Element eleShow={this.state.titleShow} mainBtn={this.state.mainBtn} id="HeadTitle" sfondo={spData.headColor} colore={spData.headTextColor} z={""} colW={spData.headColW}>
              <div>
                <p className="medfont">{spData.headTitle}</p>
              </div>
              <EditElement editEleShow={this.state.mainBtn} hidden={spData.titleShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.showModal("title")}>
                  Edit Title
                </button>
              </EditElement>
            </Element>
            {/* LOGO */}
            <Element eleShow={this.state.logoShow} mainBtn={this.state.mainBtn} id="HeadLogo" sfondo={spData.logoColor} colore="white" z={""} colW={spData.logoColW}>
              <ImgElement type={"logo"} />
              <EditElement editEleShow={this.state.mainBtn} hidden={spData.logoShow}>
                <button className="col latowhite flexbutton solidgreen m-1" onClick={() => this.showModal("logo")}>
                  Edit Logo
                </button>
              </EditElement>
            </Element>
            {/* OROLOGIO */}
            <Element eleShow={this.state.clockShow} mainBtn={this.state.mainBtn} id="HeadDate" sfondo={spData.clockColor} colore={spData.clockTextColor} z={""} colW={spData.clockColW}>
              <Orologio />
              <EditElement editEleShow={this.state.mainBtn} hidden={spData.clockShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.showModal("clock")}>
                  Edit Clock
                </button>
              </EditElement>
            </Element>
            {/* SETTINGS */}
            <Element eleShow={true} mainBtn={this.state.mainBtn} id="HeadSettings"
              sfondo={spData.loginColor} colore={""} z={""}
              colW="col-md-1">
              <LoginGear handleShowButtons={this.loginSession} />
              <EditElement editEleShow={this.state.mainBtn} hidden={true}>
                <button className="col latowhite flexbutton solidgreen m-1" onClick={() => this.showModal("loginEdit")}>
                  Edit Login
                </button>
              </EditElement>
            </Element>
          </div>
        </div>
      </div>
    )

    // PAGE MAIN BUTTONS

    if (mainBtn === false) {
      buttons = ""
    } else {
      buttons = (
        <>
          <div className="row">
            <button className="col button solidindaco m-1"
              onClick={() => this.itemsButtonShow("ShowItemBtn")}>
              <SettingsGear showItemsBtn={this.state.itemsBtnShow} />
            </button>
            <AddSym showItemsBtn={this.state.itemsBtnShow} addItem={() => this.showModal("itemOrCatAdd")}
              addLabel={"Add Item or Category"} />
            <button className="col button solidbrick m-1"
              onClick={() => this.showModal("back")}>
              Preferences
            </button>
          </div>
        </>
      )
    }

    // PAGE BODY

    if (catFirst === true) {
      // console.log("CateFirst= ", catFirst)
      pageBody = (
        <>
          {/* CATEGORIES */}
          {
            this.state.cats.map(({ id, title, icon, hidden }, i) => {
              return (
                <Cat showItemsBtn={this.state.itemsBtnShow} key={i} pos={i}
                  title={title} icon={icon} catEditDel={this.catEditDel}
                  catCont={this.catCont} itemHide={hidden} hidden={hidden} />
              )
            })
          }
          {/* APPS */}
          {
            this.state.rootItems.map(({ id, title, link, descr, cat, icon, video, hidden }, i) => {
              return (
                <Item showItemsBtn={this.state.itemsBtnShow} key={i} pos={i} id={id}
                  title={title} link={link} descr={descr} cat={cat} icon={icon} video={video}
                  itemEditDel={this.itemEditDel} itemVideo={this.itemVideo} itemHide={hidden} hidden={hidden} />
              )
            })
          }
        </>
      )
    } else {
      // console.log("CateFirst Else= ", catFirst)
      pageBody = (
        <>
          {/* APPS */}
          {
            this.state.rootItems.map(({ id, title, link, descr, cat, icon, video, hidden }, i) => {
              return (
                <Item showItemsBtn={this.state.itemsBtnShow} key={i} pos={i} id={id}
                  title={title} link={link} descr={descr} cat={cat} icon={icon} video={video}
                  itemEditDel={this.itemEditDel} itemVideo={this.itemVideo} itemHide={hidden} hidden={hidden} />
              )
            })
          }
          {/* CATEGORIES */}
          {
            this.state.cats.map(({ id, title, icon, hidden }, i) => {
              return (
                <Cat showItemsBtn={this.state.itemsBtnShow} key={i} pos={i}
                  title={title} icon={icon} catEditDel={this.catEditDel}
                  catCont={this.catCont} itemHide={hidden} hidden={hidden} />
              )
            })
          }
        </>
      )
    }

    // PAGE FOOTER
    let foot = (
      <div className="row mt-2 mb-2 zindex1">
        <div className="col">
          <div className="row">
            {/* INFO */}
            <Element eleShow={this.state.infoShow} mainBtn={this.state.mainBtn} id="FootInfo" sfondo={spData.footInfoColor} colore={spData.footInfoTextColor} z={""} colW={spData.footInfoColW}>
              <div>
                <p className={showHideFootTitle + " medfont"}>{spData.footTitle}</p>
                <p className={showHideFootSub + " smallfont"}>{spData.footSubtitle}</p>
                <p className={showHideFootSub2 + " smallfont"}>{spData.footSubtitle2}</p>
              </div>
              <EditElement editEleShow={this.state.mainBtn} hidden={spData.infoShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.showModal("info")}>
                  Edit Info
                </button>
              </EditElement>
            </Element>
            {/* CREDITI */}
            <Element eleShow={this.state.addInfoShow} mainBtn={this.state.mainBtn} id="FootAddInfo" sfondo={spData.footAddColor} colore={spData.footAddTextColor} z={""} colW={spData.footAddColW}>
              <div>
                <p className={showHideCrTitle + " smallfont"}>{spData.footAddTitle}</p>
                <p className={showHideCrSub + " smallfont"}><i>{spData.footAddSubtitle}</i></p>
                <p className={showHideCrSub2 + " verysmallfont"}>{spData.footAddSubtitle2}</p>
              </div>
              <EditElement editEleShow={this.state.mainBtn} hidden={spData.addInfoShow}>
                <button className="col flexbutton brick m-1" onClick={() => this.showModal("addInfo")}>
                  Edit Add Info
                </button>
              </EditElement>
            </Element>
          </div>
        </div>
      </div >
    )

    // HTML ELEMENTS

    return (
      <>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div style={this.state.backStyle}></div>
        <div class="contenitore">
          <section>
            {/* LOGIN DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.loginDiaShow}
              handleClose={() => this.hideModal("login")} handleSave={this.loginCheck}
              saveLabel="Apply">
              <div className="modal-content">
                <ModalTitle title="Login"></ModalTitle>
                <div className="modal-body">
                  <form id="loginForm">
                    {/* User */}
                    <div className="form-group">
                      <div className="row text-center mb-1 m-auto">
                        <div className="col">
                          <div className="row border">
                            <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                              <label>User</label>
                            </div>
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                              <input type="text" className="form-control border-0"
                                ref={(input) => { this.userInput = input; }} onChange={e => usrTmp = e.target.value} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Password */}
                    <div className="form-group">
                      <div className="row text-center mb-1 m-auto">
                        <div className="col">
                          <div className="row border">
                            <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                              <label>Psw</label>
                            </div>
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                              <input type="password" autocomplete="on" className="form-control border-0" onChange={e => pswTmp = e.target.value} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* LOGIN EDIT DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.loginEditDiaShow}
              handleClose={() => this.hideModal("loginedit")} handleSave={this.loginEditCheck}
              saveLabel="Apply">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Login"></ModalTitle>
                <div className="modal-body">
                  <form id="loginEditForm" autocomplete="off">
                    {/* User */}
                    <div className="form-group">
                      <div className="row text-center mb-1 m-auto">
                        <div className="col">
                          <div className="row border">
                            <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                              <label>User</label>
                            </div>
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                              <input type="text" className="form-control border-0"
                                ref={(input) => { this.userChangeInput = input; }} onChange={e => usrTmp = e.target.value} autocomplete="off" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Password */}
                    <div className="form-group">
                      <div className="row text-center mb-1 m-auto">
                        <div className="col">
                          <div className="row border">
                            <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                              <label>Psw</label>
                            </div>
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                              <input type="password" autocomplete="new-password" className="form-control border-0" onChange={e => pswTmp = e.target.value} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Back color */}
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.loginColor}
                          rgbToHex={this.rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.loginOpacity} id="loginOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* MENU DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.menuDiaShow}
              handleClose={() => this.hideModal("menu")} handleSave={this.saveMenu}
              saveLabel="Apply">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Menu"></ModalTitle>
                <div className="modal-body">
                  <form id="menuForm">
                    {/* Search */}
                    <InputInfos label="Search"
                      disField={disFieldMS}
                      stateDisBlk={e => {
                        if (this.state.disFieldMS === false) {
                          this.setState({
                            disFieldMS: true
                          });
                          disable1 = true;
                        } else {
                          this.setState({
                            disFieldMS: false
                          });
                          disable1 = false;
                        }
                      }}
                      title={spData.menuSearchLabel}
                      hideSwitch={spData.noMenuSearch}
                      tempo={e => temp = e.target.value}>
                    </InputInfos>
                    {/* Credit */}
                    <InputInfos label="Credits"
                      disField={disFieldMC}
                      stateDisBlk={e => {
                        if (this.state.disFieldMC === false) {
                          this.setState({
                            disFieldMC: true
                          });
                          disable2 = true;
                        } else {
                          this.setState({
                            disFieldMC: false
                          });
                          disable2 = false;
                        }
                      }}
                      title={spData.menuCreditsLabel}
                      hideSwitch={spData.noMenuCredits}
                      tempo={e => temp2 = e.target.value}>
                    </InputInfos>
                    {/* Back color */}
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.menuColor}
                          rgbToHex={this.rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.menuOpacity} id="menuOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.menuShow}></InputHideBlocks>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
              {/* </MenuDialog> */}
            </EleDialog>
            {/* TITLE DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.titleDiaShow}
              handleClose={() => this.hideModal("title")} handleSave={this.saveTitle}
              saveLabel="Apply">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Title (Site name)"></ModalTitle>
                <div className="modal-body">
                  <form id="titleForm" onKeyDown={this.handleKeyDown}>
                    <InputTitle label="Name" edit="Edit Item" tempTitle={spData.headTitle}
                      tempo={e => temp = e.target.value} >
                    </InputTitle>
                    <InputWidth idAuto="headColAuto" idCol1="headCol1" idCol2="headCol2" idCol3="headCol3" idCol4="headCol4" idCol5="headCol5"
                      valAuto="col" valCol1="col-1" valCol2="col-2" valCol3="col-3" valCol4="col-4" valCol5="col-5"></InputWidth>
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.headColor}
                          rgbToHex={this.rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                        <div className="col-1"></div>
                        <InputTextColor textColor={spData.headTextColor} rgbToHex={this.rgbToHex}></InputTextColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.headOpacity} id="titleOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.titleShow}></InputHideBlocks>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
              {/* </TitleDialog> */}
            </EleDialog>
            {/* CLOCK DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.clockDiaShow}
              handleClose={() => this.hideModal("clock")} handleSave={this.saveClock}
              saveLabel="Apply">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Clock"></ModalTitle>
                <div className="modal-body">
                  <form id="clockForm">
                    <InputWidth idAuto="clockColAuto" idCol1="clockCol1" idCol2="clockCol2" idCol3="clockCol3" idCol4="clockCol4" idCol5="clockCol5"
                      valAuto="col-md" valCol1="col-md-1" valCol2="col-md-2" valCol3="col-md-3" valCol4="col-md-4" valCol5="col-md-5"></InputWidth>
                    {/* Back & Text colors */}
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.clockColor}
                          rgbToHex={this.rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                        <div className="col-1"></div>
                        <InputTextColor textColor={spData.clockTextColor} rgbToHex={this.rgbToHex}></InputTextColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.clockOpacity} id="clockOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.clockShow}></InputHideBlocks>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* LOGO DIALOG (Removed ActivityChanged)*/}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.logoDiaShow}
              handleClose={() => this.hideModal("logo")} handleSave={this.saveLogo}
              saveLabel="Apply">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Logo"></ModalTitle>
                <div className="modal-body">
                  <form id="logoForm">
                    <InputFile></InputFile>
                    <InputWidth idAuto="logoColAuto" idCol1="logoCol1" idCol2="logoCol2" idCol3="logoCol3" idCol4="logoCol4" idCol5="logoCol5"
                      valAuto="col" valCol1="col-1" valCol2="col-2" valCol3="col-3" valCol4="col-4" valCol5="col-5"></InputWidth>
                    {/* Back color */}
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.logoColor}
                          rgbToHex={this.rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.logoOpacity} id="logoOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.logoShow}></InputHideBlocks>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* INFO DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.infoDiaShow}
              handleClose={() => this.hideModal("info")} handleSave={this.saveInfo}
              saveLabel="Apply">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Foot Info"></ModalTitle>
                <div className="modal-body">
                  <form id="infoForm">
                    <InputInfos label="Info"
                      disField={disFieldT}
                      stateDisBlk={e => {
                        if (this.state.disFieldT === false) {
                          this.setState({
                            disFieldT: true
                          });
                          disable1 = true;
                        } else {
                          this.setState({
                            disFieldT: false
                          });
                          disable1 = false;
                        }
                      }}
                      title={spData.footTitle}
                      hideSwitch={spData.noFootTitle}
                      tempo={e => temp = e.target.value}>
                    </InputInfos>
                    <InputInfos label="Info #2"
                      disField={disFieldT2}
                      stateDisBlk={e => {
                        if (this.state.disFieldT2 === false) {
                          this.setState({
                            disFieldT2: true
                          });
                          disable2 = true;
                        } else {
                          this.setState({
                            disFieldT2: false
                          });
                          disable2 = false;
                        }
                      }}
                      title={spData.footSubtitle}
                      hideSwitch={spData.noFootSubtitle}
                      tempo={e => temp2 = e.target.value}>
                    </InputInfos>
                    <InputInfos label="Info #3"
                      disField={disFieldT3}
                      stateDisBlk={e => {
                        if (this.state.disFieldT3 === false) {
                          this.setState({
                            disFieldT3: true
                          });
                          disable3 = true;
                        } else {
                          this.setState({
                            disFieldT3: false
                          });
                          disable3 = false;
                        }
                      }}
                      title={spData.footSubtitle2}
                      hideSwitch={spData.noFootSubtitle2}
                      tempo={e => temp3 = e.target.value}>
                    </InputInfos>
                    <InputWidth idAuto="infoColAuto" idCol1="infoCol1" idCol2="infoCol2" idCol3="infoCol3" idCol4="infoCol4" idCol5="infoCol5"
                      valAuto="col" valCol1="col-1" valCol2="col-2" valCol3="col-3" valCol4="col-4" valCol5="col-5"></InputWidth>
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.footInfoColor}
                          rgbToHex={this.rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                        <div className="col-1"></div>
                        <InputTextColor textColor={spData.footInfoTextColor} rgbToHex={this.rgbToHex}></InputTextColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.footInfoOpacity} id="infoOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.infoShow}></InputHideBlocks>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* ADDINFO DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.addInfoDiaShow}
              handleClose={() => this.hideModal("addInfo")} handleSave={this.saveAddInfo}
              saveLabel="Apply">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Foot additional Info"></ModalTitle>
                <div className="modal-body">
                  <form id="creditForm">
                    <InputInfos label="Add Info"
                      disField={disFieldC}
                      stateDisBlk={e => {
                        if (this.state.disFieldC === false) {
                          this.setState({
                            disFieldC: true
                          });
                          disable1 = true;
                        } else {
                          this.setState({
                            disFieldC: false
                          });
                          disable1 = false;
                        }
                      }}
                      title={spData.footAddTitle}
                      hideSwitch={spData.noFootAddTitle}
                      tempo={e => temp = e.target.value}>
                    </InputInfos>
                    <InputInfos label="Add Info #2"
                      disField={disFieldC2}
                      stateDisBlk={e => {
                        if (this.state.disFieldC2 === false) {
                          this.setState({
                            disFieldC2: true
                          });
                          disable2 = true;
                        } else {
                          this.setState({
                            disFieldC2: false
                          });
                          disable2 = false;
                        }
                      }}
                      title={spData.footAddSubtitle}
                      hideSwitch={spData.noFootAddSubtitle}
                      tempo={e => temp2 = e.target.value}>
                    </InputInfos>
                    <InputInfos label="Add Info #3"
                      disField={disFieldC3}
                      stateDisBlk={e => {
                        if (this.state.disFieldC3 === false) {
                          this.setState({
                            disFieldC3: true
                          });
                          disable3 = true;
                        } else {
                          this.setState({
                            disFieldC3: false
                          });
                          disable3 = false;
                        }
                      }}
                      title={spData.footAddSubtitle2}
                      hideSwitch={spData.noFootAddSubtitle2}
                      tempo={e => temp3 = e.target.value}>
                    </InputInfos>
                    <InputWidth idAuto="addInfoColAuto" idCol1="addInfoCol1" idCol2="addInfoCol2" idCol3="addInfoCol3" idCol4="addInfoCol4" idCol5="addInfoCol5"
                      valAuto="col-md" valCol1="col-md-1" valCol2="col-md-2" valCol3="col-md-3" valCol4="col-md-4" valCol5="col-md-5"></InputWidth>
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.footAddColor}
                          rgbToHex={this.rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                        <div className="col-1"></div>
                        <InputTextColor textColor={spData.footAddTextColor} rgbToHex={this.rgbToHex}></InputTextColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.footAddOpacity} id="addInfoOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.addInfoShow}></InputHideBlocks>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* BACKEDIT DIALOG ****** CHECK FOR ELEMENTS */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.backEditDiaShow}
              handleClose={() => this.hideModal("back")} handleSave={this.saveBack}
              saveLabel="Apply">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Preferences"></ModalTitle>
                <div className="modal-body">
                  <form id="backEditForm">
                    {/* MAIN PIC */}
                    <div className="form-group">
                      <div className="row text-center mb-1 m-auto">
                        <div className="col">
                          <div className="row border">
                            <div className="col borderight pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                              <label>Main pic</label>
                            </div>
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                              <input type="file" disabled={disFieldB} id="files" className="form-control boxs border-0" name="icon" onChange={e => fileImg = e.target.files[0]} />
                            </div>

                            <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                              <label class="switch">
                                <input type="checkbox" className="form-control" defaultChecked={spData.noBackImage} onClick={e => {
                                  if (this.state.disFieldB === false) {
                                    this.setState({
                                      disFieldB: true
                                    });
                                    disable1 = true;
                                  } else {
                                    this.setState({
                                      disFieldB: false
                                    });
                                    disable1 = false;
                                  }
                                }} />
                                <span class="slider round" title="No image"></span>
                              </label>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    {/* CAT CREDIT PIC */}
                    <div className="form-group">
                      <div className="row text-center mb-1 m-auto">
                        <div className="col">
                          <div className="row border">
                            <div className="col borderight pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                              <label>Cats/Credit pic</label>
                            </div>
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                              <input type="file" disabled={disFieldBC} id="catfiles" className="form-control boxs border-0" name="icon" onChange={e => fileCatImg = e.target.files[0]} />
                            </div>
                            <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                              <label class="switch">
                                <input type="checkbox" className="form-control" defaultChecked={spData.noCatImage} onClick={e => {
                                  if (this.state.disFieldBC === false) {
                                    this.setState({
                                      disFieldBC: true
                                    });
                                    disable2 = true;
                                  } else {
                                    this.setState({
                                      disFieldBC: false
                                    });
                                    disable2 = false;
                                  }
                                }} />
                                <span class="slider round" title="No image"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* MAIN BACK COLOR */}
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Main back color" backColor={spData.backgroundColor}
                          rgbToHex={this.rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                      </div>
                    </div>
                    {/* MAIN BRIGHTNESS */}
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <div className="col">
                          <div className="row border">
                            <div className="col pt-1 pb-1 p-0 latomenu d-flex flex-column justify-content-center align-items-center">
                              <label>Main Brightness</label>
                            </div>

                            <div className="col d-flex flex-column justify-content-center align-items-center p-0">
                              <div className="row" style={{ width: "100%" }}>

                                <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                                  <img className="plusminus" title="-" alt="-" src="./itemicons/rangeMinus.svg" />
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center p-0">
                                  <input type="range" className="form-range border-0 p-0" min="0" max="200" step="10" list="tickmarks" defaultValue={spData.backgroundOpacity} id="backOpRange" onChange={e => tempOpacity = e.target.value} ></input>
                                  <datalist id="tickmarks">
                                    <option value={"0"}></option>
                                    <option value={"50"}></option>
                                    <option className="tick" value={"100"}></option>
                                    <option value={"150"}></option>
                                    <option value={"200"}></option>
                                  </datalist>
                                </div>
                                <div className="col-1 d-flex flex-column justify-content-center align-items-center">
                                  <img className="plusminus" title="+" alt="+" src="./itemicons/rangePlus.svg" />
                                </div>

                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    {/* CAT CREDIT BACK COLOR */}
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Cat/Credit back color" backColor={spData.catColor}
                          rgbToHex={this.rgbToHex} tempo={e => tempCatColor = e.target.value}></InputBackColor>
                      </div>
                    </div>
                    {/* CAT BACK OPACITY */}
                    <InputOpacity opacity={spData.catOpacity} id="catOpRange" tempo={e => tempOpacity1 = e.target.value}></InputOpacity>
                    {/* CAT BEFORE ITEMS */}
                    <InputSwitch hSwitch={spData.catFirst}
                      dSwitch={e => {
                        if (spData.catFirst === false) {
                          categoryFirst = true;
                        } else {
                          categoryFirst = false;
                        }
                      }}
                      swLabel={"Category before Items"}>
                    </InputSwitch>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* CAT DIALOG */}
            <EleDialog mainTheme="modal-main-dark" footTheme="modal-footer-dark" hideMidBtn={true} hideApply={true} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.catDiaShow}
              handleClose={() => this.hideModal("cat")}>
              <div className="modal-content noBG">
                <div className="modal-header darkBG">
                  <h5 className="modal-title latowhite" >{tempCatTitle}</h5>
                </div>
                <div style={this.state.catStyle}></div>
                <div ref={el => this.containerCat = el} className="modal-body-dark">
                  <div className="textcenter">
                    <div className="row stickydivtop">
                      <AddSym showItemsBtn={this.state.itemsBtnShow} addItem={this.addItem} addLabel={"Add Item"} />
                    </div>
                    {
                      this.state.catItems.map(({ id, title, link, descr, cat, icon, video, hidden }, i) => {
                        return (
                          <Item showItemsBtn={this.state.itemsBtnShow} key={i} pos={i} id={id}
                            title={title} link={link} descr={descr} cat={cat} icon={icon} video={video}
                            itemVideo={this.itemVideo} itemEditDel={this.itemEditDel} itemHide={hidden} hidden={hidden} />
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </EleDialog>
            {/* ITEM EDIT DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.itemEditDiaShow}
              handleClose={() => this.hideModal("itemEdit")} handleSave={this.applyItemEdit}
              saveLabel="Edit">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Item"></ModalTitle>
                <div className="modal-body">
                  <form id="itemEditForm">
                    <InputFile></InputFile>
                    <InputPosition edit="Edit Item" pos={this.state.cPos} id="clearitemswitchpos" ></InputPosition>

                    <InputTitle label="Title" edit="Edit Item" tempTitle={tempItemTitle}
                      tempo={e => temp2 = e.target.value} >
                    </InputTitle>
                    <InputLink edit="Edit Item" tempLink={tempItemLink} ></InputLink>
                    {/* Descr. */}
                    <InputInfos label="Descr."
                      disField={disFieldIE}
                      stateDisBlk={e => {
                        if (this.state.disFieldIE === false) {
                          this.setState({
                            disFieldIE: true
                          });
                          noDescr = true;
                        } else {
                          this.setState({
                            disFieldIE: false
                          });
                          noDescr = false;
                        }
                      }}
                      title={tempItemDescr}
                      hideSwitch={noDescr}
                      tempo={e => temp6 = e.target.value}>
                    </InputInfos>
                    <InputVideo></InputVideo>
                    <InputSwitch hSwitch={tempItemHide}
                      dSwitch={e => {
                        if (tempItemHide === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                      }}
                      swLabel={"Hide"}>
                    </InputSwitch>
                    {/* Category */}
                    <InputCat catMenuB={eCatMenuButtons}></InputCat>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* ITEM ADD DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.itemAddDiaShow}
              handleClose={() => this.hideModal("itemAdd")} handleSave={() => this.applyItemAdd("test")}
              saveLabel="Add">
              <div className="modal-content noborder">
                <ModalTitle title="Add Item"></ModalTitle>
                <div className="modal-body">
                  <form id="itemAddForm">
                    <InputFile></InputFile>
                    {/* Position */}
                    <InputPosition edit="Add Item" pos={currPos} id="clearitempos" ></InputPosition>
                    {/* Title */}
                    <InputTitle label="Title" edit="Add Item" id="clearitemtitle"
                      tempo={e => temp2 = e.target.value}>
                    </InputTitle>
                    {/* Link */}
                    <InputLink edit="Add Item" id="clearitemlink"></InputLink>
                    {/* Descr. */}
                    <InputInfos label="Descr."
                      disField={disFieldIA}
                      stateDisBlk={e => {
                        if (this.state.disFieldIA === false) {
                          this.setState({
                            disFieldIA: true
                          });
                          noDescr = true;
                        } else {
                          this.setState({
                            disFieldIA: false
                          });
                          noDescr = false;
                        }
                      }}
                      title=""
                      hideSwitch={noDescr}
                      tempo={e => temp6 = e.target.value}
                      id="clearitemdescr">
                    </InputInfos>
                    {/* Video */}
                    <InputVideo></InputVideo>
                    {/* Hide */}
                    <InputSwitch hSwitch={tempItemHide}
                      dSwitch={e => {
                        if (tempItemHide === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                      }}
                      swLabel={"Hide"}>
                    </InputSwitch>
                    {/* Category */}
                    <InputCat catMenuB={aCatMenuButtons}></InputCat>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* ITEM DEL DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.itemDelDiaShow}
              handleClose={() => this.hideModal("itemDel")} handleSave={this.applyItemDel}
              saveLabel="Remove">
              <div className="modal-content noborder">
                <ModalTitle title={"Permanently delete " + tempItemTitle + " item?"}></ModalTitle>
                <div className="modal-body">
                  <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                </div>
              </div>
            </EleDialog>
            {/* CAT EDIT DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.catEditDiaShow}
              handleClose={() => this.hideModal("catedit")} handleSave={this.applyCatEdit}
              saveLabel="Edit">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Category"></ModalTitle>
                <div className="modal-body">
                  <form id="catEditForm">
                    <InputFile></InputFile>
                    <InputPosition edit="Edit Item" pos={currPos} id="clearcatswitchpos" ></InputPosition>
                    <InputTitle label="Title" edit="Edit Item" tempTitle={tempCatTitle}
                      tempo={e => temp2 = e.target.value}>
                    </InputTitle>
                    <InputSwitch hSwitch={tempItemHide}
                      dSwitch={e => {
                        if (tempItemHide === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                      }}
                      swLabel={"Hide"}>
                    </InputSwitch>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* CAT ADD DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.catAddDiaShow}
              handleClose={() => this.hideModal("catadd")} handleSave={this.applyCatAdd}
              saveLabel="Add">
              <div className="modal-content noborder">
                <ModalTitle title="Add Category"></ModalTitle>
                <div className="modal-body">
                  <form id="catAddForm">
                    <InputFile></InputFile>
                    <InputPosition edit="Add Item" id="clearcatpos" ></InputPosition>
                    <InputTitle label="Title" edit="Add Item" id="clearcattitle"
                      tempo={e => temp2 = e.target.value}>
                    </InputTitle>
                    <InputSwitch hSwitch={tempItemHide}
                      dSwitch={e => {
                        if (tempItemHide === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                      }}
                      swLabel={"Hide"}>
                    </InputSwitch>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg}
                      alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* CAT DEL DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.catDelDiaShow}
              handleClose={() => this.hideModal("catdel")} handleSave={this.applyCatDel}
              saveLabel="Remove">
              <div className="modal-content noborder">
                <ModalTitle title={"Permanently delete " + tempCatTitle + " category?"}></ModalTitle>
                <div className="modal-body">
                  <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                </div>
              </div>
            </EleDialog>
            {/* ITEM OR CAT DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={false} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.iocDiaShow}
              handleClose={() => this.hideModal("itemorcat")} handleSave={this.addItem} handleMidBtn={this.catAddItem}
              saveLabel="Item" midBtnLabel="Category">
              <div className="modal-content noborder">
                <ModalTitle title="Add Item or Category?"></ModalTitle>
              </div>
            </EleDialog>
            {/* CREDITS DIALOG */}
            <EleDialog mainTheme="modal-main-dark" footTheme="modal-footer-dark" hideMidBtn={true} hideApply={true} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.crsDiaShow}
              handleClose={() => this.hideModal("excrs")}>
              <div className="modal-content noBG">
                <div className="modal-header darkBG">
                  <h5 className="modal-title latowhite" >{spData.menuCreditsLabel}</h5>
                </div>
                <div style={this.state.catStyle}></div>
                <div ref={el => this.containerCrs = el} className="modal-body-dark">
                  <div className="textcenter">
                    <div className="row stickydivtop">
                      <AddSym showItemsBtn={this.state.itemsBtnShow} addItem={this.crsAddItem} addLabel={"Add Credit"} />
                    </div>
                    {
                      this.state.creditsItems.map(({ id, title, link, descr, }, i) => {
                        return (
                          <Credit showItemsBtn={this.state.itemsBtnShow} key={i} pos={i}
                            title={title} link={link} descr={descr} crsEditDel={this.crsEditDel}
                            crsAddItem={this.crsAddItem} />
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </EleDialog>
            {/* CREDITS ADD DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.crsAddDiaShow}
              handleClose={() => this.hideModal("crsadd")} handleSave={this.applyCrsAdd}
              saveLabel="Add">
              <div className="modal-content noborder">
                <ModalTitle title="Add Credit"></ModalTitle>
                <div className="modal-body">
                  <form id="crsAddForm">
                    <InputPosition edit="Add Item" id="clearcrspos" ></InputPosition>
                    <InputTitle label="Title" edit="Add Item" id="clearcrstitle"
                      tempo={e => temp2 = e.target.value}>
                    </InputTitle>
                    <InputLink edit="Add Item" id="clearcrslink"></InputLink>
                    {/* Descr. */}
                    <InputTitle label="Descr." edit="Add Item" tempTitle={tempItemTitle} id="clearcrsdescr"
                      tempo={e => temp4 = e.target.value}>
                    </InputTitle>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* CREDITS EDIT DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.crsEditDiaShow}
              handleClose={() => this.hideModal("crsedit")} handleSave={this.applyCrsEdit}
              saveLabel="Edit">
              <div className="modal-content noborder">
                <ModalTitle title="Edit Credit"></ModalTitle>
                <div className="modal-body">
                  <form id="crsEditForm">
                    <InputPosition edit="Edit Item" pos={currPos} id="clearcrsswitchpos" ></InputPosition>
                    <InputTitle label="Title" edit="Edit Item" tempTitle={tempCrsTitle}
                      tempo={e => temp2 = e.target.value}>
                    </InputTitle>
                    <InputLink edit="Edit Item" tempLink={tempCrsLink} ></InputLink>
                    <InputTitle label="Descr." edit="Edit Item" tempTitle={tempCrsDescr}
                      tempo={e => temp4 = e.target.value}>
                    </InputTitle>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* CREDITS DEL DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.crsDelDiaShow}
              handleClose={() => this.hideModal("crsdel")} handleSave={this.applyCrsDel}
              saveLabel="Remove">
              <div className="modal-content noborder">
                <ModalTitle title={"Permanently delete " + tempCrsTitle + " credit?"}></ModalTitle>
                <div className="modal-body">
                  <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                </div>
              </div>
            </EleDialog>
            {/* SEARCH DIALOG */}
            <EleDialog mainTheme="modal-main-dark" footTheme="modal-footer darkBG" hideMidBtn={false} hideApply={false} hideClose={false}
              activityChanged={this.state.activityChanged} eleDiaShow={this.state.searchDiaShow} saveLabel="Search" midBtnLabel="Reset"
              handleClose={() => this.hideModal("search")} handleSave={this.itemSearch} handleMidBtn={this.itemSearchReset}>
              <div className="modal-content noborder">
                <div className="modal-header-dark">
                  <h5 className="modal-title-dark" >{spData.menuSearchLabel}</h5>
                </div>
                <div className="modal-body-dark darkBG">
                  <form id="searchForm" onKeyDown={this.handleKeyDownSearch}>
                    <div className="form-group stickydivtop">
                      <input type="text" className="form-control contenitore pt-2" ref={(input) => { this.searchInput = input; }} onChange={e => temp = e.target.value} placeholder={spData.menuSearchLabel + "..."} readOnly={this.state.onlyRead} />
                    </div>
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                    {/* RESITEMS */}
                    <div className="textcenter">
                      {
                        this.state.resItems.map(({ id, title, link, descr, icon, video, hidden }, i) => {
                          return (
                            <Item key={i} pos={i} id={id}
                              title={title} link={link} descr={descr} cat={"Search"} icon={icon} video={video}
                              itemVideo={this.itemVideo} itemHide={hidden} hidden={hidden} />
                          )
                        })
                      }
                    </div>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* ITEM VIDEO DIALOG */}
            <EleDialog mainTheme="modal-main darkBG" footTheme="modal-footer-dark" hideMidBtn={true} hideApply={true} hideClose={false}
              activityChanged={false} eleDiaShow={this.state.itemVideoDiaShow}
              handleClose={() => this.hideModal("video")}>
              <div className="modal-content darkBG">
                <div className="row mb-1 m-1 modal-header-dark">
                  <div className="col">
                    <div className="row">
                      <div className="col-md-3 mb-1 d-flex flex-column justify-content-center align-items-center">
                        <ImgElement type={"overlay"}></ImgElement>
                        {/* <OverlayImg></OverlayImg> */}
                      </div>
                      <div className="col-md latotitle d-flex flex-column justify-content-center align-items-center">
                        <center>"{tempItemTitle}"</center>
                      </div>
                      <div className="col-md-3">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-body align-items-center darkBG">
                  <center>
                    <iframe width="100%" height="350" src={this.state.videoLink} frameborder="0" allowfullscreen="true" title="videoFrame"></iframe>
                  </center>
                </div>
              </div>
            </EleDialog>
            <div className="stickytop">
              {head}
              {buttons}
            </div>
            <div className="textcenter">
              {pageBody}
              {foot}
            </div>
          </section >
        </div >
      </>
    );
  }
}

// ========================================

const header = ReactDOM.createRoot(document.getElementById("root"));
header.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);