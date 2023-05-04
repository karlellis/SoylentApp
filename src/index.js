import React from "react";
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
// import "./bootstrap/js/bootstrap.bundle.min.js"
// import { ReactComponent as GearIcon } from "./srcimg/gear.svg";
const bcrypt = require("bcryptjs")
var fileImg = null;
var fileCatImg = null;
var cgPos = "";
var currPos = "";
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
var tempCrsTitle = "";
var tempCrsLink = "";
var tempCrsDescr = "";
var tempIcon = "";
var tempCatIcon = "";
var arrayLength = 0;
var login = false;
var array = [];
var arrayAdd = [];
var inPos = "";
var blockHide = "none";
var newItem = {
  "title": "",
  "link": "",
  "icon": "",
  "descr": "",
  "video": false,
  "cat": "Root",
  "id": 0
};
var catNewItem = {
  "title": "",
  "icon": ""
};
var CrsNewItem = {
  "title": "",
  "link": "",
  "descr": ""
};
var nome = "";
var credentials = require("./initSec.json");
var spData = require("./initData.json");

const Item = ({ showItemsBtn, pos, id, title, link, descr, icon, video, itemEditDel, itemVideo }) => {
  const [isActive, setIsActive] = useState(false);

  const linkOrVideo = video
    ?
    // (<a title={title} onClick={() => itemVideo("itemVideo", id)}>
    (<img className="items" title={title} alt={title} src={icon}
      onClick={() => itemVideo("itemVideo", id)} />)
    //  </a>) 
    :
    (< a title={title} href={link} target="_blank" >
      <img className="items" title={title} /* href={link} target="_blank" */
        alt={title} src={icon} />
      {/* // onClick={() => window.location.href = link}/>) */}
    </a>);

  let itemBtn = "";
  let descrTxt = "";
  let titleTxt = "";

  if (descr !== "") {
    descrTxt = (
      // <>
      // { isActive && 
      // <div className="row medfonts descr fade-in-image lato text-center m-auto mt-5 mb-5"
      <div className={`${isActive ? 'descr-shown row medfonts lato text-center m-auto' : 'descr-hidden'}`}
        // <div className={`row medfonts descr lato text-center m-auto mt-5 mb-5 ${isActive ? 'alert-shown' : 'alert-hidden'}`}
        style={{
          backgroundImage: "url(" + icon + ")",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // backgroundAttachment: "fixed",
        }}>
        <b style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>{descr}</b>
      </div>
      // }
    )
    titleTxt = (
      <h4>
        <div className="row lato text-center m-1">
          <div className="col">
            <div className="row">
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <b>{title}</b>
              </div>
              <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
                onClick={() => setIsActive(!isActive)}>
                <b>{isActive ? '-' : '+'}</b>
              </div>
            </div>
          </div>
        </div>
      </h4>
    )
    {/* </> */ }

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
              {/* <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
                  onClick={() => setIsActive(!isActive)}>
                  <b>{isActive ? '-' : '+'}</b>
                </div> */}
            </div>
          </div>
        </div>
      </h4>
      // <h4><p className="lato"><b>{title}</b></p></h4>
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
            {pos + 1} {/* {this.props.id} */}
          </button>
          <button className="col itembutton solidbrick m-1" onClick={() => itemEditDel("itemDel", id, pos)}>
            Remove
          </button>
        </div>
        {/* </div> */}
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
        {/* </div> */}
      </div>
    )
  }
  return (
    <>
      {itemBtn}
    </>
  );
}

const ItemSearchRes = ({ id, title, link, descr, icon, video, itemVideo }) => {
  const [isActive, setIsActive] = useState(false);
  const linkOrVideo = video
    ?
    // (<a title={title} onClick={() => itemVideo("itemVideo", id)}>
    (<img className="items" title={title} alt={title} src={icon}
      onClick={() => itemVideo("itemVideo", id)} />)
    // </a>)
    :
    (< a title={title} href={link} target="_blank" >
      <img className="items" title={title} alt={title} src={icon} />
    </a>);
  let itemBtn = "";
  let descrTxt = "";
  let titleTxt = "";

  if (descr !== "") {
    descrTxt = (
      // <>
      // { isActive && 
      // <div className="row medfonts descr fade-in-image lato text-center m-auto mt-5 mb-5"
      <div className={`${isActive ? 'descr-shown row medfonts lato text-center m-auto' : 'descr-hidden'}`}
        // <div className={`row medfonts descr lato text-center m-auto mt-5 mb-5 ${isActive ? 'alert-shown' : 'alert-hidden'}`}
        style={{
          backgroundImage: "url(" + icon + ")",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          // backgroundAttachment: "fixed",
        }}>
        <b style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>{descr}</b>
      </div>
      // }
    )
    titleTxt = (
      <h4>
        <div className="row lato text-center m-1">
          <div className="col">
            <div className="row">
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <b>{title}</b>
              </div>
              <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
                onClick={() => setIsActive(!isActive)}>
                <b>{isActive ? '-' : '+'}</b>
              </div>
            </div>
          </div>
        </div>
      </h4>
    )
    {/* </> */ }
    // <>
    //   {isActive &&
    //     // <div className="row medfonts descr fade-in-image lato text-center m-auto mt-5 mb-5"
    //     <div className={`${isActive ? 'descr-shown row medfonts lato text-center m-auto' : 'descr-hidden'}`}
    //       style={{
    //         backgroundImage: "url(" + icon + ")",
    //         backgroundPosition: 'center',
    //         backgroundRepeat: 'no-repeat',
    //         // backgroundAttachment: "fixed",
    //         width: "16em"
    //       }}>
    //       <b style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>{descr}</b>
    //     </div>
    //   }
    //   <h4>
    //     <div className="row lato text-center m-1">
    //       <div className="col">
    //         <div className="row">
    //           <div className="col d-flex flex-column justify-content-center align-items-center">
    //             <b>{title}</b>
    //           </div>
    //           <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
    //             onClick={() => setIsActive(!isActive)}>
    //             <b>{isActive ? '-' : '+'}</b>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </h4>
    // </>
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
              {/* <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
                  onClick={() => setIsActive(!isActive)}>
                  <b>{isActive ? '-' : '+'}</b>
                </div> */}
            </div>
          </div>
        </div>
      </h4>
      // <h4><p className="lato"><b>{title}</b></p></h4>
    );
    // descrTxt = (

    //   <h4>
    //     <div className="row lato text-center m-1">
    //       <div className="col">
    //         <div className="row">
    //           <div className="col d-flex flex-column justify-content-center align-items-center">
    //             <b>{title}</b>
    //           </div>
    //           {/* <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
    //             onClick={() => setIsActive(!isActive)}>
    //             <b>{isActive ? '-' : '+'}</b>
    //           </div> */}
    //         </div>
    //       </div>
    //     </div>
    //   </h4>

    //   // <h4><p className="lato"><b>{title}</b></p></h4>
    // );
  };

  itemBtn = (
    <div className="itemcontainer">
      <div className="iconcontainer box box2">
        {!isActive && linkOrVideo}
        {descrTxt}
      </div>
      {titleTxt}
      {/* </div> */}
    </div>
  )
  // itemBtn = (
  //   <div className="itemcontainer">
  //     <div className="iconcontainer box box2">
  //       {!isActive && linkOrVideo}
  //       {descrTxt}
  //     </div>
  //   </div>
  // )
  return (
    <>
      {itemBtn}
    </>
  );
}

const Menu = ({ menuShow, children, mainBtn }) => {
  const showHideClassName = menuShow ? "d-block" : "d-none";
  const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
  return (
    <section id="HeadMenu" style={{ backgroundColor: spData.menuColor, color: spData.menuTextColor, zIndex: 1 }} className={showHideClassName + " " + justifyCenterEnd + " col-md-1 d-flex flex-column align-items-center"}>
      {children}
    </section>
  );
};

const EditMenu = ({ editMenuShow, children, hidden }) => {
  const showHideClassName = editMenuShow ? "d-block" : "d-none";
  const hide = hidden ? "" : <RedPoint />
  return (
    <div className={showHideClassName + " stretch d-flex justify-content-center align-items-center"}>
      {children} {hide}
    </div>
  );
};

const Info = ({ infoShow, children, mainBtn }) => {
  const showHideClassName = infoShow ? "d-block" : "d-none";
  const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
  return (
    <section id="FootInfo" style={{ backgroundColor: spData.footInfoColor, color: spData.footInfoTextColor }} className={showHideClassName + " " + justifyCenterEnd + " " + spData.footInfoColW + " latoplain d-flex flex-column align-items-center"}>
      {children}
    </section>
  );
};

const EditInfo = ({ editInfoShow, children, hidden }) => {
  const showHideClassName = editInfoShow ? "d-block" : "d-none";
  const hide = hidden ? "" : <RedPoint />
  return (
    <div className={showHideClassName + " stretch d-flex justify-content-center align-items-center"}>
      {children} {hide}
    </div>
  );
};

const AddInfo = ({ addInfoShow, children, mainBtn }) => {
  const showHideClassName = addInfoShow ? "d-block" : "d-none";
  const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
  return (
    <section id="FootAddInfo" style={{ backgroundColor: spData.footAddColor, color: spData.footAddTextColor }} className={showHideClassName + " " + justifyCenterEnd + " " + spData.footAddColW + " latoplain d-flex flex-column align-items-center"}>
      {children}
    </section>
  );
};

const EditAddInfo = ({ editAddInfoShow, children, hidden }) => {
  const showHideClassName = editAddInfoShow ? "d-block" : "d-none";
  const hide = hidden ? "" : <RedPoint />
  return (
    <div className={showHideClassName + " stretch d-flex justify-content-center align-items-center"}>
      {children} {hide}
    </div>
  );
};

const Titolo = ({ titleShow, children, mainBtn }) => {
  const showHideClassName = titleShow ? "d-block" : "d-none";
  const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
  return (
    <section id="HeadTitle" style={{ backgroundColor: spData.headColor, color: spData.headTextColor }} className={showHideClassName + " " + justifyCenterEnd + " " + spData.headColW + " latoplain d-flex flex-column align-items-center"}>
      {children}
    </section>
  );
};

const EditTitolo = ({ editTitleShow, children, hidden }) => {
  const showHideClassName = editTitleShow ? "d-block" : "d-none";
  const hide = hidden ? "" : <RedPoint />
  return (
    <div className={showHideClassName + " stretch d-flex justify-content-center align-items-center"}>
      {children} {hide}
    </div>
  );
};

const Logo = ({ logoShow, children, mainBtn }) => {
  const showHideClassName = logoShow ? "d-block" : "d-none";
  const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
  return (
    <section id="HeadLogo" style={{ backgroundColor: spData.logoColor }} className={showHideClassName + " " + justifyCenterEnd + " " + spData.logoColW + " d-flex flex-column justify-content-end align-items-center"}>
      {children}
    </section>
  );
};

const EditLogo = ({ editLogoShow, children, hidden }) => {
  const showHideClassName = editLogoShow ? "d-block" : "d-none";
  const hide = hidden ? "" : <RedPoint />
  return (
    <div className={showHideClassName + " stretch d-flex justify-content-center align-items-center"}>
      {children} {hide}
    </div>
  );
};

const Clock = ({ clockShow, children, mainBtn }) => {
  const showHideClassName = clockShow ? "d-block" : "d-none";
  const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
  return (
    <section id="HeadDate" style={{ backgroundColor: spData.clockColor, color: spData.clockTextColor }} className={showHideClassName + " " + justifyCenterEnd + " " + spData.clockColW + " latoplain d-flex flex-column align-items-center"}>
      {children}
    </section>
  );
};

const EditClock = ({ editClockShow, children, hidden }) => {
  const showHideClassName = editClockShow ? "d-block" : "d-none";
  const hide = hidden ? "" : <RedPoint />
  return (
    <div className={showHideClassName + " stretch d-flex justify-content-center align-items-center"}>
      {children} {hide}
    </div>
  );
};

const Set = ({ children, mainBtn }) => {
  const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
  return (
    <section id="HeadSettings" className={justifyCenterEnd + " col-md-1 indaco d-flex flex-column align-items-center"}>
      {children}
    </section>
  );
};

const EditSet = ({ editSetShow, children }) => {
  const showHideClassName = editSetShow ? "d-block" : "d-none";
  return (
    <div className={showHideClassName + " stretch d-flex justify-content-center align-items-center"}>
      {children}
    </div>
  );
};

// const Ok = ({ okShow, display, children }) => {
//   const showHideClassName = okShow ? "dispaly-block fade-in-image" : "fade-out-image";
//   const displayClassName = display ? "" : " display-none";
//   return (
//     <div className={showHideClassName + displayClassName}>
//       {children}
//     </div>
//   );
// };

const Ok = ({ okShow, children }) => {
  // const showHideClassName = okShow ? "dispaly-block fade-in-image" : "fade-out-image";
  // const displayClassName = display ? "" : " display-none";
  // const setShowingAlert = React.useState(false);
  // const [isShowingAlert, setShowingAlert] = React.useState(false);

  // return (
  //   <div className={`ontopabsolute ${okShow ? 'alert-shown' : 'alert-hidden'}`} >
  //     {children}
  //   </div>
  // );

  return (
    <div className={`mb-2 ${okShow ? 'alert-shown' : 'alert-hidden'}`} >
      {children}
    </div>
  );

};

const Upload = ({ upShow, children }) => {
  // const showHideClassName = upShow ? "display-block" : "display-none";
  // return (
  //   <div className={showHideClassName}>
  //     {children}
  //   </div>
  // );

  return (
    <div className={`mb-2 ${upShow ? 'alert-shown' : 'alert-hidden'}`} >
      {children}
    </div>
  );
};

const Error = ({ errShow, children }) => {
  // return (
  //   <div className={`ontopabsolute ${errShow ? 'alert-shown' : 'alert-hidden'}`} >
  //     {children}
  //   </div>
  // );

  return (
    <div className={`mb-2 ${errShow ? 'alert-shown' : 'alert-hidden'}`} >
      {children}
    </div>
  );

  // const showHideClassName = errShow ? "display-block" : "display-none";
  // return (
  //   <div className={showHideClassName}>
  //     {children}
  //   </div>
  // );
};

const MenuDialog = ({ handleSave, handleClose, menuDiaShow, children }) => {
  const showHideClassName = menuDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Apply</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const ItemOrCatDialog = ({ handleItem, handleCat, handleClose, iocDiaShow, children }) => {
  const showHideClassName = iocDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleItem}>Item</button>
          <button type="button" className="btn btn-success" data-dismiss="modal" onClick={handleCat}>Category</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const TitleDialog = ({ handleSave, handleClose, titleDiaShow, children }) => {
  const showHideClassName = titleDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Apply</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const ClockDialog = ({ handleSave, handleClose, clockDiaShow, children }) => {
  const showHideClassName = clockDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Apply</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const InfoDialog = ({ handleSave, handleClose, infoDiaShow, children }) => {
  const showHideClassName = infoDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Apply</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const BackEditDialog = ({ handleSave, handleClose, backEditDiaShow, children, activityChanged }) => {
  const showHideClassName = backEditDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Apply</button>
          <button type="button" /* disabled={(activityChanged) ? true : false} */ className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const ItemVideoDialog = ({ handleClose, itemVideoDiaShow, children, activityChanged }) => {
  const showHideClassName = itemVideoDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main darkBG">
        {children}
        <div className="modal-footer-dark">
          <button type="button" /* disabled={(activityChanged) ? true : false} */ className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const CrsDialog = ({ handleClose, crsDiaShow, children, activityChanged }) => {
  const showHideClassName = crsDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main-dark">
        {children}
        <div className="modal-footer-dark">
          <button type="button" /* disabled={(activityChanged) ? true : false} */ className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const CatDialog = ({ handleClose, catDiaShow, children, activityChanged }) => {
  const showHideClassName = catDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main-dark">
        {children}
        <div className="modal-footer-dark">
          <button type="button" /* disabled={(activityChanged) ? true : false} */ className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const SearchDialog = ({ handleClose, handleSave, handleReset, searchDiaShow, children, activityChanged }) => {
  const showHideClassName = searchDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main-dark">
        {children}
        <div className="modal-footer darkBG">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Search</button>
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleReset}>Reset</button>
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const ItemEditDialog = ({ handleSave, handleClose, itemEditDiaShow, children, activityChanged }) => {
  const showHideClassName = itemEditDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Apply</button>
          <button type="button" /* disabled={(activityChanged) ? true : false} */ className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const ItemDelDialog = ({ handleSave, handleClose, itemDelDiaShow, children, activityChanged }) => {
  const showHideClassName = itemDelDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Remove</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const ItemAddDialog = ({ handleSave, handleClose, itemAddDiaShow, children, activityChanged }) => {
  const showHideClassName = itemAddDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName /* + " ontop" */}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Add</button>
          <button type="button" /* disabled={(activityChanged) ? true : false} */ className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const CatEditDialog = ({ handleSave, handleClose, catEditDiaShow, children, activityChanged }) => {
  const showHideClassName = catEditDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Edit</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const CatDelDialog = ({ handleSave, handleClose, catDelDiaShow, children, activityChanged }) => {
  const showHideClassName = catDelDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Remove</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const CatAddDialog = ({ handleSave, handleClose, catAddDiaShow, children, activityChanged }) => {
  const showHideClassName = catAddDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Add</button>
          <button type="button" /* disabled={(activityChanged) ? true : false} */ className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const CrsEditDialog = ({ handleSave, handleClose, crsEditDiaShow, children, activityChanged }) => {
  const showHideClassName = crsEditDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Apply</button>
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const CrsDelDialog = ({ handleSave, handleClose, crsDelDiaShow, children, activityChanged }) => {
  const showHideClassName = crsDelDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Remove</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const CrsAddDialog = ({ handleSave, handleClose, crsAddDiaShow, children, activityChanged }) => {
  const showHideClassName = crsAddDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleSave}>Add</button>
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const AddInfoDialog = ({ handleSave, handleClose, addInfoDiaShow, children }) => {
  const showHideClassName = addInfoDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSave}>Apply</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const LoginEditDialog = ({ handleEditLogin, handleClose, loginEditDiaShow, children }) => {
  const showHideClassName = loginEditDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleEditLogin}>Apply</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const LoginDialog = ({ handleLogin, handleClose, loginDiaShow, children }) => {
  const showHideClassName = loginDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const LogoDialog = ({ handleUpload, handleClose, logoDiaShow, children, activityChanged }) => {
  const showHideClassName = logoDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleUpload}>Apply</button>
          <button type="button" /* disabled={(activityChanged) ? true : false} */ className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

async function fetchUpPHP(file, url, key) {
  // console.log("fetchUpPHP...");
  var data = new FormData()
  data.append(key, file)
  const response = await fetch(url, {
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
  const response = await fetch(url, {
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
  const response = await fetch(url, {
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
  const response = await fetch(url, {
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

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoShow: false,
      addInfoShow: false,
      mainBtn: false,
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
      // appDescrDiaShow: false,
      // creditsDiaShow: false,
      iocDiaShow: false,
      videoLink: tempItemLink,
      okShow: false,
      display: false,
      errShow: false,
      upShow: false,
      activityChanged: false,
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
      backStyle: {
        backgroundImage: "",
        backgroundColor: "",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: "fixed"
      },
      catStyle: {
        backgroundImage: "",
        backgroundColor: "",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: "fixed"
      }
    }
    this.itemEditDel = this.itemEditDel.bind(this);
    this.addItem = this.addItem.bind(this);
    this.itemOrCat = this.itemOrCat.bind(this);
    this.catEditDel = this.catEditDel.bind(this);
    this.catAddItem = this.catAddItem.bind(this);
    this.crsEditDel = this.crsEditDel.bind(this);
    this.crsAddItem = this.crsAddItem.bind(this);
    this.itemVideo = this.itemVideo.bind(this);
    // this.appDescr = this.appDescr.bind(this);
    this.catCont = this.catCont.bind(this);
    this.resItemVideo = this.resItemVideo.bind(this);
    this.catItemVideo = this.catItemVideo.bind(this);
    this.crsShow = this.crsShow.bind(this);
    this.search = this.search.bind(this);
    this.setCat = this.setCat.bind(this);
    this.showMainButtons = this.showMainButtons.bind(this);
    // this.headLogoEdit = this.headLogoEdit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.loginSession = this.loginSession.bind(this);
    this.loginEditSession = this.loginEditSession.bind(this);
    // this.saveTitle = this.saveTitle.bind(this);
    // this.loginCheck = this.loginCheck.bind(this);
    // this.loginEditCheck = this.loginEditCheck.bind(this);
  }

  componentDidMount() {
    fetch('./config/data.json').then(response => {
      response.json().then(settings => {
        spData = settings;
        // console.log("Apps: ", settings.items);
        this.setState({
          infoShow: spData.infoShow,
          addInfoShow: spData.addInfoShow,
          mainBtn: spData.mainBtn,
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
              backgroundAttachment: "fixed"
            }
          });
        } else {
          this.setState({
            backStyle: {
              backgroundImage: "linear-gradient(rgba(255,255,255," + (1 - spData.backgroundOpacity).toString() + "), rgba(255,255,255," + (1 - spData.backgroundOpacity).toString() + ")), url(" + spData.backgroundImage + ")",
              backgroundColor: spData.backgroundColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed"
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
              backgroundAttachment: "fixed"
            }
          });
        } else {
          this.setState({
            catStyle: {
              backgroundImage: "linear-gradient(rgba(255,255,255," + (1 - spData.catOpacity).toString() + "), rgba(255,255,255," + (1 - spData.catOpacity).toString() + ")), url(" + spData.catImage + ")",
              backgroundColor: spData.catColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed"
            }
          });
        }

        // Reset form states to current settings
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
        this.itemCatSearch("Root", spData.items);
        // console.log("Apps: ", this.state.items);
        // console.log("Root Apps: ", this.state.rootItems);
        // console.log("Check password: ", comparePassword("admin", password));
        // console.log("Hashed first password: ", hashPassword(password));
      })
    })
  }

  componentDidUpdate() {
    this.userInput.focus();
    this.userChangeInput.focus();
    this.searchInput.focus();
  }

  saveFile(file, url, key) {
    fetchUpConfig(file, url, key)
      .then(res => {
        console.log("Config Saved!");
        this.itemCatSearch(tempCatTitle, spData.items);
        this.itemCatSearch("Root", spData.items);
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
    this.showAlert("up");
    // this.setState({ errShow: false });
    // this.setState({ upShow: true });
    // this.setState({ okShow: false });
    this.setState({
      activityChanged: true
    })
    fetchUpPHP(file, "./api/img-upload.php", url)
      .then(res => {
        if (url === "logo" && op === "edit") {
          spData.LogoIcon = "./img/" + nome;
          this.showAlert("ok");
          // this.setState({ upShow: false });
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
          // console.log("File correctly Uploaded!");
          this.setState({
            activityChanged: false
          });
          this.saveFile(spData, "./api/img-upload.php", "config");
          // this.hideModal("logo");
        } else if (url === "icon" && op === "edit") {
          if (fileImg !== null) {
            // console.log("Icon edit!");
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
          if (inPos !== "") {
            let index = 0;
            if (tempCatTitle !== "Root") {
              index = this.state.catItems[inPos].id;
            } else {
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
              var noAddArray = [...array];
              this.setState({ items: array });
              spData.items = noAddArray;
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
              var noAddArray = [...array];
              this.setState({ items: array });
              spData.items = noAddArray;
            }
          }
          inPos = "";
          cgPos = "";
          currPos = "";
          temp = "";
          temp2 = "";
          temp3 = "";
          temp4 = "";
          temp5 = tempCatTitle;
          temp6 = "";
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0
          };
          this.showAlert("ok");
          // this.setState({ upShow: false });
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
          // console.log("Edit Icon correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
        } else if (url === "icon" && op === "add") {
          newItem.icon = "./itemicons/" + nome;
          newItem.title = temp2;
          newItem.link = temp3;
          newItem.descr = temp6;
          newItem.video = temp4;
          newItem.cat = temp5;
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
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0
          };
          this.showAlert("ok");
          // this.setState({ upShow: false });
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
          // console.log("Add Icon correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
        } else if (url === "icon" && op === "addlast") {
          newItem.icon = "./itemicons/" + nome;
          newItem.title = temp2;
          newItem.link = temp3;
          newItem.descr = temp6;
          newItem.video = temp4;
          newItem.cat = temp5;
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
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0
          };
          this.showAlert("ok");
          // this.setState({ upShow: false });
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
          // console.log("Add Last Icon correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
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
          if (temp !== "") {
            // console.log("CurrPos: ", currPos);
            // console.log("InPos: ", inPos);
            catNewItem.icon = array[currPos].icon;
            catNewItem.title = array[currPos].title;
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
          catNewItem = {
            "title": "",
            "icon": ""
          };
          this.showAlert("ok");
          // this.setState({ upShow: false });
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
          // console.log("Edit Cat correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
        } else if (url === "cat" && op === "add") {
          // console.log("CatAdd in Pos: ", inPos);
          catNewItem.icon = "./itemicons/" + nome;
          catNewItem.title = temp2;
          tempIcon = "";
          arrayAdd = this.addAfter(array, inPos, catNewItem);
          // console.log("Insert pos=", (inPos));
          this.setState({ cats: arrayAdd });
          spData.cats = arrayAdd;
          arrayAdd = [];
          temp2 = "";
          temp = "";
          catNewItem = {
            "title": "",
            "icon": ""
          };
          this.showAlert("ok");
          // this.setState({ upShow: false });
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
          // console.log("Add Icon correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
        } else if (url === "cat" && op === "addlast") {
          // console.log("CatAddLast...");
          catNewItem.icon = "./itemicons/" + nome;
          catNewItem.title = temp2;
          // console.log("CatNewItem: ", catNewItem);
          inPos = arrayLength;
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
          catNewItem = {
            "title": "",
            "icon": ""
          };
          this.showAlert("ok");
          // this.setState({ upShow: false });
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
          // console.log("Add Last Icon correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
        } else if (url === "back" && op === "edit") {
          spData.backgroundImage = "./img/" + nome;
          spData.backgroundColor = this.hexToRgb(tempColor) + ", 1)";
          this.setState({
            backStyle: {
              backgroundImage: "linear-gradient(rgba(255,255,255," + (1 - spData.backgroundOpacity).toString() + "), rgba(255,255,255," + (1 - spData.backgroundOpacity).toString() + ")), url(" + spData.backgroundImage + ")",
              backgroundColor: spData.backgroundColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed"
            }
          });
          this.showAlert("ok");
          // this.setState({ upShow: false });
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
          // console.log("File correctly Uploaded!");
          this.setState({
            activityChanged: false
          });
        } else if (url === "backcat" && op === "edit") {
          spData.catImage = "./img/" + nome;
          spData.catColor = this.hexToRgb(tempCatColor) + ", 1)";
          this.setState({
            catStyle: {
              backgroundImage: "linear-gradient(rgba(255,255,255," + (1 - spData.catOpacity).toString() + "), rgba(255,255,255," + (1 - spData.catOpacity).toString() + ")), url(" + spData.catImage + ")",
              // backgroundImage: "url(" + spData.catImage + ")",
              backgroundColor: spData.catColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed"
            }
          });
          this.showAlert("ok");
          // this.setState({ upShow: false });
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
          // console.log("File correctly Uploaded!");
          this.setState({
            activityChanged: false
          });
        }
        this.saveFile(spData, "./api/img-upload.php", "config");
        fileImg = null;
        // console.log("Result=", user);
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
      arrayAdd = [];
      temp2 = "";
      temp3 = "";
      temp4 = "";
      temp = "";
      CrsNewItem = {
        "title": "",
        "link": "",
        "descr": ""
      };
    } else if (url === "crs" && op === "addlast") {
      CrsNewItem.title = temp2;
      CrsNewItem.link = temp3;
      CrsNewItem.descr = temp4;
      inPos = arrayLength;
      arrayAdd = this.addAfter(array, inPos, CrsNewItem);
      this.setState({ creditsItems: arrayAdd });
      spData.creditsItems = arrayAdd;
      arrayAdd = [];
      temp2 = "";
      temp3 = "";
      temp4 = "";
      temp = "";
      CrsNewItem = {
        "title": "",
        "link": "",
        "descr": ""
      };
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
      if (temp !== "") {
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
      arrayAdd = [];
      temp2 = "";
      temp3 = "";
      temp4 = "";
      temp = "";
      CrsNewItem = {
        "title": "",
        "link": "",
        "descr": ""
      };
      this.showAlert("ok");
      // this.setState({ upShow: false });
      // this.setState({ okShow: true });
      // this.setState({ errShow: false });
    }
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
    rgb = rgb.replace(/[^\d,]/g, '').split(',');
    var r = parseInt(rgb[0]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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
    this.showAlert("ok");
    // this.setState({ okShow: true });
    // this.setState({ errShow: false });
    this.saveFile(spData, "./api/img-upload.php", "config");

  }

  itemSearchReset = () => {
    this.showAlert("all");
    // this.setState({ okShow: false });
    // this.setState({ errShow: false });
    document.getElementById('searchForm').reset();
    this.setState({ resItems: [] });
    temp = "";
  }
  showAlert(id) {
    switch (id) {
      case "ok":
        this.setState({ okShow: true });
        this.setState({ errShow: false });
        this.setState({ upShow: false });
        setTimeout(() => this.setState({ okShow: false }), 2000);
        break;
      case "err":
        this.setState({ errShow: true });
        this.setState({ okShow: false });
        this.setState({ upShow: false });
        setTimeout(() => this.setState({ errShow: false }), 2000);
        break;
      case "up":
        this.setState({ errShow: false });
        this.setState({ okShow: false });
        this.setState({ upShow: true });
        break;
      case "all":
        this.setState({ errShow: false });
        this.setState({ okShow: false });
        this.setState({ upShow: false });
        break;
    }
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
          arrayAdd = this.addAfter(arrayAdd, count, newItem);
          count++;
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0
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
        "id": 0
      };
      this.showAlert("ok");
      // this.setState({ okShow: true });
      // this.setState({ errShow: false });
      // setTimeout(() => this.setState({ okShow: false }), 2000);
    } else {
      this.showAlert("err");
    }
  }

  itemCatSearch = (cat, items) => {
    if (items.length > 0) {
      // console.log("AppCatSearch...", items.length);
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        // console.log("Analyzing App Pos: ", i, " - Title: ", items[i].title);
        if (items[i].cat.toLowerCase().includes(cat.toLowerCase())) {
          // console.log("App Pos: ", i, " - Title: ", items[i].title, " is in Cat: ", cat, " CatPos: ", count);
          newItem.icon = items[i].icon;
          newItem.title = items[i].title;
          newItem.link = items[i].link;
          newItem.descr = items[i].descr;
          newItem.video = items[i].video;
          newItem.cat = items[i].cat;
          newItem.id = items[i].id;
          // console.log("App Pos: ", count, " - Title: ", items[i].title);
          arrayAdd = this.addAfter(arrayAdd, count, newItem);
          // console.log("ArrayAdd: ", arrayAdd);
          count++;
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "Root",
            "id": 0
          };
        }
      }
      count = 0;
      // console.log("Insert pos=", (inPos));
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
        "cat": ""
      };
    }
  }

  saveClock = () => {
    // console.log(tempColor);
    spData.clockColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
    spData.clockOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
    spData.clockTextColor = this.hexToRgb(tempTextColor) + ", 1)";
    spData.clockColW = tempColW;
    if (blockHide !== "none") {
      spData.clockShow = blockHide;
    }
    blockHide = "none";
    this.showAlert("ok");
    // this.setState({ okShow: true });
    // this.setState({ errShow: false });
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  saveMenu = () => {
    if (disable1 !== "none") {
      spData.noMenuSearch = disable1;
    }
    if (temp !== "")
      spData.menuSearchLabel = temp;
    if (disable2 !== "none") {
      spData.noMenuCredits = disable2;
    }
    if (temp2 !== "")
      spData.menuCreditsLabel = temp2;
    // console.log(tempColor);
    spData.menuColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
    spData.menuOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
    if (blockHide !== "none") {
      spData.menuShow = blockHide;
    }

    this.showAlert("ok");
    // this.setState({ okShow: true });
    // this.setState({ errShow: false });
    this.saveFile(spData, "./api/img-upload.php", "config");
    temp = "";
    temp2 = "";
    blockHide = "none";
    disable1 = "none";
    disable2 = "none";
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
    this.showAlert("ok");
    // this.setState({ okShow: true });
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  saveCredit = () => {
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
    this.showAlert("ok");
    // this.setState({ okShow: true });
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  applyItemEdit = () => {
    array = [...this.state.items];
    // console.log("FileImg: ", fileImg);
    // console.log("cgPos: ", cgPos);
    // console.log("Temp2: ", temp2);
    // console.log("Temp3: ", temp3);
    // console.log("Temp4: ", temp4, " ", tempItemVideo);
    // console.log("Temp5: ", temp5, " ", tempCatTitle);
    // console.log("Temp6: ", temp6, " ", tempItemDescr);
    if (noDescr === true) {
      temp6 = "";
    }
    if (fileImg !== null || temp2 !== "" || temp3 !== "" || temp4 !== tempItemVideo || temp5 !== tempCatTitle || temp6 !== tempItemDescr || cgPos !== "") {
      if (cgPos !== "") {
        inPos = parseInt(cgPos) - 1;
        // console.log("Edit inPos: ", inPos, " currPos: ", currPos);
        if (inPos < arrayLength && inPos >= 0 && inPos !== currPos) {
          this.saveImgFile(fileImg, "icon", "edit");
        } else {
          this.showAlert("err");
          // this.setState({ okShow: false });
          // this.setState({ errShow: true });
        }
      } else {
        // console.log("cgPos === \"\"");
        this.saveImgFile(fileImg, "icon", "edit");
      }
    } else {
      // console.log("fileImg - temp2 - temp3 are Null!!!");
      this.showAlert("err");
      // this.setState({ okShow: false });
      // this.setState({ errShow: true });
    }
  }

  applyItemAdd = () => {
    array = [...this.state.items];
    // console.log("Image: ", fileImg);
    // console.log("Name: ", temp2);
    // console.log("Link: ", temp3);
    // console.log("Pos: ", temp);
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
          this.showAlert("err");
          // this.setState({ okShow: false });
          // this.setState({ errShow: true });
        }
      } else {
        this.saveImgFile(fileImg, "icon", "addlast");
      }
    } else {
      this.showAlert("err");
      // this.setState({ okShow: false });
      // this.setState({ errShow: true });
    }
  }

  applyItemDel = () => {
    var array = [...this.state.items];
    var index = parseInt(temp);
    // console.log("itemDel ID: ", index);
    // console.log("item array before: ", array);
    // console.log("State items: ", this.state.items);
    // console.log("Array lenght: ", array.length);
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
    this.showAlert("ok");
    // this.setState({ okShow: true });
    this.saveFile(spData, "./api/img-upload.php", "config");
    this.setState({
      activityChanged: true
    });
  }

  addAfter(array, index, newItem) {
    return [
      ...array.slice(0, index),
      newItem,
      ...array.slice(index)
    ];
  }

  applyCatEdit = () => {
    if (fileImg !== null || temp2 !== "" || temp !== "") {
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
          this.showAlert("err");
          // this.setState({ okShow: false });
          // this.setState({ errShow: true });
        }
      } else {
        if (!dup) {
          this.saveImgFile(fileImg, "cat", "edit");
        } else {
          this.showAlert("err");
          // this.setState({ okShow: false });
          // this.setState({ errShow: true });
        }
      }
    } else {
      // console.log("fileImg - temp2 - temp are \"\"");
      this.showAlert("err");
      // this.setState({ okShow: false });
      // this.setState({ errShow: true });
    }
  }

  applyCatAdd = () => {
    array = [...this.state.cats];
    // console.log("Image: ", fileImg);
    // console.log("Name: ", temp2);
    // console.log("Link: ", temp3);
    // console.log("Pos: ", temp);
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
        // console.log("InPos: ", inPos);
        if (inPos <= arrayLength && !dup && inPos >= 0) {
          this.saveImgFile(fileImg, "cat", "add");
        } else {
          this.showAlert("err");
          // this.setState({ okShow: false });
          // this.setState({ errShow: true });
        }
      } else {
        if (!dup) {
          this.saveImgFile(fileImg, "cat", "addlast");
        } else {
          this.showAlert("err");
          // this.setState({ okShow: false });
          // this.setState({ errShow: true });
        }
      }
    } else {
      this.showAlert("err");
      // this.setState({ okShow: false });
      // this.setState({ errShow: true });
    }
  }

  applyCatDel = () => {
    var array = [...this.state.cats];
    var index = currPos;
    // console.log("item array before: ", array);
    // console.log("State items: ", this.state.cats);
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
    this.showAlert("ok");
    this.saveFile(spData, "./api/img-upload.php", "config");
    this.setState({
      activityChanged: true
    });
    // console.log("item array after: ", array);
  }

  applyCrsEdit = () => {
    if (temp2 !== "" || temp3 !== "" || temp4 !== "" || temp !== "") {
      if (temp !== "") {
        inPos = parseInt(temp) - 1;
        // console.log("InPos: ", inPos);
        if (inPos < arrayLength && inPos >= 0 && inPos !== currPos) {
          this.saveCrs("crs", "edit");
          this.showAlert("ok");
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
        } else {
          this.showAlert("err");
          // this.setState({ okShow: false });
          // this.setState({ errShow: true });
        }
      } else {
        this.saveCrs("crs", "edit");
        this.showAlert("ok");
        // this.setState({ okShow: true });
        // this.setState({ errShow: false });
      }
    } else {
      // console.log("fileImg - temp2 - temp are \"\"");
      this.showAlert("err");
      // this.setState({ okShow: false });
      // this.setState({ errShow: true });
    }
  }

  applyCrsAdd = () => {
    array = [...this.state.creditsItems];
    // console.log("Name: ", temp2);
    // console.log("Link: ", temp3);
    // console.log("Descr: ", temp4);
    // console.log("Pos: ", temp);
    // tempIcon = "";
    if (temp2 !== "" && temp3 !== "" && temp4 !== "") {
      if (temp !== "") {
        inPos = parseInt(temp) - 1;
        // console.log("InPos: ", inPos);
        if (inPos < arrayLength/*  && !dup */) {
          this.saveCrs("crs", "add");
          this.showAlert("ok");
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
        } else {
          this.showAlert("err");
          // this.setState({ okShow: false });
          // this.setState({ errShow: true });
        }
      } else {
        this.saveCrs("crs", "addlast");
        this.showAlert("ok");
        // this.setState({ okShow: true });
        // this.setState({ errShow: false });
      }
    } else {
      this.showAlert("err");
      // this.setState({ okShow: false });
      // this.setState({ errShow: true });
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
    this.showAlert("ok");
    // this.setState({ okShow: true });
    this.saveFile(spData, "./api/img-upload.php", "config");
    this.setState({
      activityChanged: true
    });
  }

  saveBack = () => {
    // console.log("NoImage:", spData.noBackImage);
    // console.log("disFieldT:", this.state.disFieldT);
    if (fileImg !== null) {
      tempIcon = spData.backgroundImage;
      this.saveImgFile(fileImg, "back", "edit");
    } else {
      spData.backgroundColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.backgroundOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
      this.setState({
        activityChanged: true
      })
      if (spData.noBackImage === true) {
        this.setState({
          backStyle: {
            backgroundImage: "none",
            backgroundColor: spData.backgroundColor,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed"
          }
        });
      } else {
        this.setState({
          backStyle: {
            backgroundImage: "linear-gradient(rgba(255,255,255," + (1 - spData.backgroundOpacity).toString() + "), rgba(255,255,255," + (1 - spData.backgroundOpacity).toString() + ")), url(" + spData.backgroundImage + ")",
            backgroundColor: spData.backgroundColor,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed"
          }
        });
      }
      this.showAlert("ok");
      // this.setState({ upShow: false });
      // this.setState({ okShow: true });
      // this.setState({ errShow: false });
      this.saveFile(spData, "./api/img-upload.php", "config");
    }

    if (fileCatImg !== null) {
      tempCatIcon = spData.catImage;
      this.saveImgFile(fileCatImg, "backcat", "edit");
    } else {
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
            backgroundAttachment: "fixed"
          }
        });
      } else {
        this.setState({
          catStyle: {
            backgroundImage: "linear-gradient(rgba(255,255,255," + (1 - spData.catOpacity).toString() + "), rgba(255,255,255," + (1 - spData.catOpacity).toString() + ")), url(" + spData.catImage + ")",
            backgroundColor: spData.catColor,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed"
          }
        });
      }
      this.showAlert("ok");
      // this.setState({ upShow: false });
      // this.setState({ okShow: true });
      // this.setState({ errShow: false });
      this.saveFile(spData, "./api/img-upload.php", "config");
    }
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
      this.showAlert("ok");
      // this.setState({ upShow: false });
      // this.setState({ okShow: true });
      // this.setState({ errShow: false });
      this.saveFile(spData, "./api/img-upload.php", "config");
      // this.hideModal("logo");
    }
  }

  loginSession(id) {
    if (login === false) {
      this.showModal("login");
      this.userInput.focus();
      fetchDownCredentials("./api/img-upload.php");
    } else {
      this.showMainButtons();
    }
  }

  loginEditSession(id) {
    this.showModal("loginEdit");
  }

  loginCheck = () => {
    // console.log("Login User: " + temp);
    // console.log("Login Psw: " + temp2);
    comparePassword(temp2, credentials.password)
      .then(pass => {
        comparePassword(temp, credentials.user)
          .then(user => {
            // console.log("PassResult: ", pass)
            // console.log("UserResult: ", user)
            if (user && pass && login === false) {
              login = true;
              temp = "";
              temp2 = "";
              this.showMainButtons();
              this.hideModal("login");
            } else {
              // if (!user) {
              // console.log("WRONG User: " + temp);
              // }
              // if (!pass) {
              // console.log("WRONG Psw: " + temp2)
              // }
              this.showAlert("ok");
              // this.setState({ okShow: true });
              login = false;
            }
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  loginEditCheck = () => {
    if (temp !== "" || temp2 !== "") {
      // console.log("User: " + temp)
      // console.log("Psw: " + temp2)
      hashUsrPsw(temp, temp2)
        .then(result => {
          // console.log(result)
          credentials.user = result[0];
          // console.log("User: " + temp)
          // console.log("UserHash: " + spData.user)
          credentials.password = result[1];
          // console.log("Psw: " + temp2)
          // console.log("PswHash: " + spData.password)
          this.saveFile(credentials, "./api/img-upload.php", "credentials");
          temp = "";
          temp2 = "";
          this.showAlert("ok");
          // this.setState({ okShow: true });
          // this.setState({ errShow: false });
        })
        .catch(err => {
          console.log(err)
        })

    } else {
      this.showAlert("err");
      // this.setState({ okShow: false });
      // this.setState({ errShow: true });
    }
  }

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
        }
        tempColor = this.rgbToHex(spData.footInfoColor);
        tempOpacity = spData.footInfoOpacity.toString();
        tempTextColor = this.rgbToHex(spData.footInfoTextColor);
        this.setState({ infoDiaShow: true });
        break;
      case "credit":
        tempColW = spData.footAddColW;
        switch (spData.footAddColW) {
          case "col-md":
            radiobtn = document.getElementById("creditColAuto");
            radiobtn.checked = true;
            break;
          case "col-md-1":
            radiobtn = document.getElementById("creditCol1");
            radiobtn.checked = true;
            break;
          case "col-md-2":
            radiobtn = document.getElementById("creditCol2");
            radiobtn.checked = true;
            break;
          case "col-md-3":
            radiobtn = document.getElementById("creditCol3");
            radiobtn.checked = true;
            break;
          case "col-md-4":
            radiobtn = document.getElementById("creditCol4");
            radiobtn.checked = true;
            break;
          case "col-md-5":
            radiobtn = document.getElementById("creditCol5");
            radiobtn.checked = true;
        }
        tempColor = this.rgbToHex(spData.footAddColor);
        tempOpacity = spData.footAddOpacity.toString();
        tempTextColor = this.rgbToHex(spData.footAddTextColor);
        this.setState({ addInfoDiaShow: true });
        break;
      case "itemEdit":
        // console.log("CurrPos ", currPos);
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
        }
        tempColor = this.rgbToHex(spData.clockColor);
        tempOpacity = spData.clockOpacity.toString();
        tempTextColor = this.rgbToHex(spData.clockTextColor);
        this.setState({ clockDiaShow: true });
        break;
    }
  };

  hideModal(id, e) {
    switch (id) {
      case "title":
        this.setState({ titleDiaShow: false });
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
        document.getElementById('menuForm').reset();
        break;
      case "login":
        this.setState({ loginDiaShow: false });
        document.getElementById('loginForm').reset();
        break;
      case "loginedit":
        this.setState({ loginEditDiaShow: false });
        document.getElementById('loginEditForm').reset();
        break;
      case "logo":
        this.setState({ logoDiaShow: false });
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
        document.getElementById('infoForm').reset();
        break;
      case "credit":
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
        break;
      case "video":
        this.setState({ itemVideoDiaShow: false });
        this.stopVideos();
        break;
      case "itemorcat":
        this.setState({ iocDiaShow: false });
        break;
      case "back":
        this.setState({ backEditDiaShow: false });
        document.getElementById('backEditForm').reset();
        break;
      case "clock":
        this.setState({ clockDiaShow: false });
        document.getElementById('clockForm').reset();
        break;
      case "search":
        this.setState({ searchDiaShow: false });
        document.getElementById('searchForm').reset();
        this.setState({ resItems: [] });
        this.showAlert("false");
        this.showAlert("all");
        // this.setState({ okShow: false });
        // this.setState({ errShow: false });
        temp = "";
    }
    this.showAlert("all");
    // this.setState({ okShow: false });
    // this.setState({ errShow: false });
    tempColor = "";
    tempTextColor = "";
    tempColW = "";
    temp3 = "";
    this.setState({
      activityChanged: false
    });
  };

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

  itemOrCat() {
    this.showModal("itemOrCatAdd");
  }

  catEditDel(op, pos) {
    currPos = pos;
    // console.log(op, " for ", pos);
    array = [...this.state.cats];
    arrayLength = (array.length);
    tempCatTitle = array[pos].title;
    tempIcon = array[pos].icon;
    // console.log("Cat name: ", tempCatTitle);
    document.getElementById('clearcatswitchpos').value = "";
    if (op === "CatEdit") {
      this.showModal("catEdit");
    } else {
      this.showModal("catDel");
    }
  }

  catAddItem() {
    this.hideModal("itemorcat");
    array = [...this.state.cats];
    arrayLength = (array.length);
    temp4 = false;
    document.getElementById('clearcatpos').value = "";
    document.getElementById('clearcattitle').value = "";
    this.showModal("catAdd");
    // console.log("CATAdding IT!");
  }

  crsAddItem() {
    array = [...this.state.creditsItems];
    arrayLength = (array.length);
    temp4 = false;
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

  addItem(id, pos) {
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
    document.getElementById('clearitempos').value = "";
    // document.getElementById('clearitemswitchpos').value = "";
    document.getElementById('clearitemdescr').value = "";
    document.getElementById('clearitemtitle').value = "";
    document.getElementById('clearitemlink').value = "";
    this.showModal("itemAdd");
    // console.log("APPAdding IT!");
  }

  itemEditDel(op, id, pos) {
    temp = id;
    currPos = pos;
    // console.log(op, " for ", id, "pos ", currPos);
    array = [...this.state.items];
    console.log("Array dialog before : ", array);
    arrayLength = (array.length);
    console.log("Array dialog lenght: ", arrayLength);
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        tempItemTitle = array[i].title;
        console.log("App name: ", tempItemTitle);
        tempItemLink = array[i].link;
        tempItemDescr = array[i].descr;
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
      // console.log("Array dialog after : ", array);
      this.showModal("itemDel");
    }
  }

  itemVideo(name, id) {
    temp3 = id;
    array = [...this.state.items];
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

  catCont(id, pos) {
    array = [...this.state.cats];
    // console.log("Cat Array: ", array);
    tempCatTitle = array[pos].title;
    temp5 = tempCatTitle;
    // console.log("Current Cat In: ", tempCatTitle);
    this.itemCatSearch(array[pos].title, this.state.items);
    this.showModal("cat");
  }

  resItemVideo(name, id) {
    temp3 = id;
    array = [...this.state.resItems];
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

  catItemVideo(name, id) {
    temp3 = id;
    array = [...this.state.catItems];
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

  crsShow() {
    this.showModal("exCrs");
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

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  render() {
    const { mainBtn: mainBtn } = this.state;
    const { disFieldB: disFieldB } = this.state;
    const { disFieldBC: disFieldBC } = this.state;
    const { disFieldT: disFieldT } = this.state;
    const { disFieldT2: disFieldT2 } = this.state;
    const { disFieldT3: disFieldT3 } = this.state;
    const { disFieldC: disFieldC } = this.state;
    const { disFieldC2: disFieldC2 } = this.state;
    const { disFieldC3: disFieldC3 } = this.state;
    const { disFieldIA: disFieldIA } = this.state;
    const { disFieldIE: disFieldIE } = this.state;
    const { disFieldMS: disFieldMS } = this.state;
    const { disFieldMC: disFieldMC } = this.state;

    const showHideFootTitle = spData.noFootTitle ? "d-none" : "d-block";
    const showHideFootSub = spData.noFootSubtitle ? "d-none" : "d-block";
    const showHideFootSub2 = spData.noFootSubtitle2 ? "d-none" : "d-block";
    const showHideCrTitle = spData.noFootAddTitle ? "d-none" : "d-block";
    const showHideCrSub = spData.noFootAddSubtitle ? "d-none" : "d-block";
    const showHideCrSub2 = spData.noFootAddSubtitle2 ? "d-none" : "d-block";
    let buttons = "";

    let menuButtons = (
      <>
        <Dropdown search={this.search} crsShow={this.crsShow} />
      </>
    );

    let catMenuButtons = (
      <DropdownCat items={this.state.cats} catName={this.state.catSel} setCat={this.setCat} />
    )

    let head = (
      <div className="row text-center mt-2 mb-2">
        <div className="col">
          <div className="row">
            <Menu menuShow={this.state.menuShow} mainBtn={this.state.mainBtn}>
              {/* MENU */}
              {menuButtons}
              <EditMenu editMenuShow={this.state.mainBtn} hidden={spData.menuShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.showModal("menu")}>
                  Edit Menu
                </button>
              </EditMenu>
            </Menu>
            <Titolo titleShow={this.state.titleShow} mainBtn={this.state.mainBtn}>
              {/* TITOLO */}
              <div>
                <p className="medfont">{spData.headTitle}</p>
              </div>
              <EditTitolo editTitleShow={this.state.mainBtn} hidden={spData.titleShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.showModal("title")}>
                  Edit Title
                </button>
              </EditTitolo>
            </Titolo>
            <Logo logoShow={this.state.logoShow} mainBtn={this.state.mainBtn}>
              {/* LOGO */}
              <LogoImg />
              <EditLogo editLogoShow={this.state.mainBtn} hidden={spData.logoShow}>
                <button className="col latowhite flexbutton solidgreen m-1" onClick={() => this.showModal("logo")}>
                  Edit Logo
                </button>
              </EditLogo>
            </Logo>
            <Clock clockShow={this.state.clockShow} mainBtn={this.state.mainBtn}>
              {/* OROLOGIO */}
              <Orologio />
              <EditClock editClockShow={this.state.mainBtn} hidden={spData.clockShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.showModal("clock")}>
                  Edit Clock
                </button>
              </EditClock>
            </Clock>
            {/* SETTINGS */}
            <Set clockShow={this.state.clockShow} mainBtn={this.state.mainBtn}>
              <LoginGear handleShowButtons={this.loginSession} />
              <EditSet editSetShow={this.state.mainBtn}>
                <button className="col latowhite flexbutton solidgreen m-1" onClick={() => this.loginEditSession("LoginEdit")}>
                  Edit Login
                </button>
              </EditSet>
            </Set>
          </div>
        </div>
      </div>
    )

    if (mainBtn === false) {
      buttons = ""
    } else {
      buttons = (
        <>
          <div className="row">
            <button className="col button solidindaco m-1"
              onClick={() => this.itemsButtonShow("ShowItemBtn")}>
              <SettingsGear></SettingsGear>
            </button>
            <button className="col button solidbrick m-1"
              onClick={() => this.showModal("back")}>
              Background
            </button>
          </div>
        </>
      )
    }

    let foot = (
      <div className="row mt-2 mb-2">
        <div className="col">
          <div className="row">
            {/* INFO */}
            <Info infoShow={this.state.infoShow} mainBtn={this.state.mainBtn}>
              <div>
                <p className={showHideFootTitle + " medfont"}>{spData.footTitle}</p>
                <p className={showHideFootSub + " smallfont"}>{spData.footSubtitle}</p>
                <p className={showHideFootSub2 + " smallfont"}>{spData.footSubtitle2}</p>
              </div>
              <EditInfo editInfoShow={this.state.mainBtn} hidden={spData.infoShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.showModal("info")}>
                  Edit Info
                </button>
              </EditInfo>
            </Info>
            {/* CREDITI */}
            <AddInfo addInfoShow={this.state.addInfoShow} infoShow={this.state.infoShow} mainBtn={this.state.mainBtn}>
              <div>
                <p className={showHideCrTitle + " smallfont"}>{spData.footAddTitle}</p>
                <p className={showHideCrSub + " smallfont"}><i>{spData.footAddSubtitle}</i></p>
                <p className={showHideCrSub2 + " verysmallfont"}>{spData.footAddSubtitle2}</p>
              </div>
              <EditAddInfo editAddInfoShow={this.state.mainBtn} hidden={spData.addInfoShow}>
                <button className="col flexbutton brick m-1" onClick={() => this.showModal("credit")}>
                  Edit Add Info
                </button>
              </EditAddInfo>
            </AddInfo>
          </div>
        </div>
      </div >
    )

    return (
      // TITOLO, OROLOGIO E BUTTONS
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div class="whiteback">
          <div style={this.state.backStyle}>
            <div class="contenitore">
              <section>
                <LoginDialog loginDiaShow={this.state.loginDiaShow} handleClose={() => this.hideModal("login")} handleLogin={this.loginCheck}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" >Login</h5>
                    </div>
                    <div className="modal-body">
                      <form id="loginForm">

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>User</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0"
                                    ref={(input) => { this.userInput = input; }} onChange={e => temp = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Psw</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="password" autocomplete="on" className="form-control border-0" onChange={e => temp2 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Wrong user name or password!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                      </form>
                    </div>
                  </div>
                </LoginDialog>
                <LoginEditDialog loginEditDiaShow={this.state.loginEditDiaShow} handleClose={() => this.hideModal("loginedit")} handleEditLogin={this.loginEditCheck}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Login</h5>
                    </div>
                    <div className="modal-body">
                      <form id="loginEditForm" autocomplete="off">

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>User</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0"
                                    ref={(input) => { this.userChangeInput = input; }} onChange={e => temp = e.target.value} autocomplete="off" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Psw</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="password" autocomplete="new-password" className="form-control border-0" onChange={e => temp2 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Username and password changed successfully!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Error errShow={this.state.errShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Fill in at least one field.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                      </form>
                    </div>
                  </div>
                </LoginEditDialog>
                <MenuDialog menuDiaShow={this.state.menuDiaShow} handleClose={() => this.hideModal("menu")} handleSave={this.saveMenu}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Menu</h5>
                    </div>
                    <div className="modal-body">
                      <form id="menuForm">

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Back color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.menuColor)} onChange={e => tempColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Opacity</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.menuOpacity} id="menuOpRange" onChange={e => tempOpacity = e.target.value} ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Search</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" disabled={disFieldMS} className="form-control border-0" defaultValue={spData.menuSearchLabel} onChange={e => temp = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label className="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noMenuSearch} onClick={e => {
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
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Credit</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" disabled={disFieldMC} className="form-control border-0" defaultValue={spData.menuCreditsLabel} onChange={e => temp2 = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label className="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noMenuCredits} onClick={e => {
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
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Hide</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={!spData.menuShow} onClick={e => {
                                      if (spData.menuShow === false) {
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

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Error errShow={this.state.errShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Enter at least one character.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                      </form>
                    </div>
                  </div>
                </MenuDialog>
                <TitleDialog titleDiaShow={this.state.titleDiaShow} handleClose={() => this.hideModal("title")} handleSave={this.saveTitle}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Title (Site name)</h5>
                    </div>
                    <div className="modal-body">
                      <form id="titleForm" onKeyDown={this.handleKeyDown}>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Name</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" defaultValue={spData.headTitle} onChange={e => temp = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

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
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="headColAuto" value="col" onChange={e => tempColW = e.target.value} /> Auto </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="headCol1" value="col-1" onChange={e => tempColW = e.target.value} /> 1 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="headCol2" value="col-2" onChange={e => tempColW = e.target.value} /> 2 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="headCol3" value="col-3" onChange={e => tempColW = e.target.value} /> 3 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="headCol4" value="col-4" onChange={e => tempColW = e.target.value} /> 4 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="headCol5" value="col-5" onChange={e => tempColW = e.target.value} /> 5 </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Back color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.headColor)} onChange={e => tempColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Text color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.headTextColor)} onChange={e => tempTextColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Opacity</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.headOpacity} id="titleOpRange" onChange={e => tempOpacity = e.target.value} ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Hide</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={!spData.titleShow} onClick={e => {
                                      if (spData.titleShow === false) {
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

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Error errShow={this.state.errShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Enter at least one character.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                      </form>
                    </div>
                  </div>
                </TitleDialog>
                <ClockDialog clockDiaShow={this.state.clockDiaShow} handleClose={() => this.hideModal("clock")} handleSave={this.saveClock}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Clock</h5>
                    </div>
                    <div className="modal-body">
                      <form id="clockForm">

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
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="clockColAuto" value="col-md" onChange={e => tempColW = e.target.value} /> Auto </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="clockCol1" value="col-md-1" onChange={e => tempColW = e.target.value} /> 1 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="clockCol2" value="col-md-2" onChange={e => tempColW = e.target.value} /> 2 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="clockCol3" value="col-md-3" onChange={e => tempColW = e.target.value} /> 3 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="clockCol4" value="col-md-4" onChange={e => tempColW = e.target.value} /> 4 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="clockCol5" value="col-md-5" onChange={e => tempColW = e.target.value} /> 5 </label>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Back color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.clockColor)} onChange={e => tempColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Text color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.clockTextColor)} onChange={e => tempTextColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Opacity</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.clockOpacity} id="clockOpRange" onChange={e => tempOpacity = e.target.value} ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Hide</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={!spData.clockShow} onClick={e => {
                                      if (spData.clockShow === false) {
                                        blockHide = true;
                                      } else {
                                        blockHide = false;
                                      }
                                    }} />
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

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Error errShow={this.state.errShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Enter at least one character.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                      </form>
                    </div>
                  </div>
                </ClockDialog>
                <LogoDialog logoDiaShow={this.state.logoDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("logo")} handleUpload={this.saveLogo}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Logo</h5>
                    </div>
                    <div className="modal-body">
                      <form id="logoForm">

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="file" className="form-control boxs border-0" name="image" onChange={e => fileImg = e.target.files[0]} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

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
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="logoColAuto" value="col" onChange={e => tempColW = e.target.value} /> Auto </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="logoCol1" value="col-1" onChange={e => tempColW = e.target.value} /> 1 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="logoCol2" value="col-2" onChange={e => tempColW = e.target.value} /> 2 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="logoCol3" value="col-3" onChange={e => tempColW = e.target.value} /> 3 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="logoCol4" value="col-4" onChange={e => tempColW = e.target.value} /> 4 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="logoCol5" value="col-5" onChange={e => tempColW = e.target.value} /> 5 </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Back color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.logoColor)} onChange={e => tempColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Opacity</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.logoOpacity} id="logoOpRange" onChange={e => tempOpacity = e.target.value} ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Hide</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={!spData.logoShow} onClick={e => {
                                      if (spData.logoShow === false) {
                                        blockHide = true;
                                      } else {
                                        blockHide = false;
                                      }
                                    }} />
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

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Upload upShow={this.state.upShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Loading data... Please wait.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Upload>
                      </form>
                    </div>
                  </div>
                </LogoDialog>
                <InfoDialog infoDiaShow={this.state.infoDiaShow} handleClose={() => this.hideModal("info")} handleSave={this.saveInfo}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Foot Info</h5>
                    </div>
                    <div className="modal-body">
                      <form id="infoForm">

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Info</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" disabled={disFieldT} className="form-control border-0" defaultValue={spData.footTitle} onChange={e => temp = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label className="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootTitle} onClick={e => {
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
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Info #2</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" disabled={disFieldT2} className="form-control border-0" defaultValue={spData.footSubtitle} onChange={e => temp2 = e.target.value} /*placeholder={spData.footSubtitle}*/ />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootSubtitle} onClick={e => {
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
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Info #3</label>
                                </div>

                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" disabled={disFieldT3} className="form-control border-0" defaultValue={spData.footSubtitle2} onChange={e => temp3 = e.target.value} /*placeholder={spData.footSubtitle2}*/ />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootSubtitle2} onClick={e => {
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
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="form-group" >
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Width</label>
                                </div>
                                <div className="col pt-1 pb-1">
                                  <div className="row m-auto">
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="infoColAuto" value="col" onChange={e => tempColW = e.target.value} /> Auto </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="infoCol1" value="col-1" onChange={e => tempColW = e.target.value} /> 1 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="infoCol2" value="col-2" onChange={e => tempColW = e.target.value} /> 2 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="infoCol3" value="col-3" onChange={e => tempColW = e.target.value} /> 3 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="infoCol4" value="col-4" onChange={e => tempColW = e.target.value} /> 4 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="infoCol5" value="col-5" onChange={e => tempColW = e.target.value} /> 5 </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Back color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.footInfoColor)} onChange={e => tempColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Text color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.footInfoTextColor)} onChange={e => tempTextColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Opacity</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.footInfoOpacity} id="infoOpRange" onChange={e => tempOpacity = e.target.value} ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Hide</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={!spData.infoShow} onClick={e => {
                                      if (spData.infoShow === false) {
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

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                      </form>
                    </div>
                  </div>
                </InfoDialog>
                <AddInfoDialog addInfoDiaShow={this.state.addInfoDiaShow} handleClose={() => this.hideModal("credit")} handleSave={this.saveCredit}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Foot additional Info</h5>
                    </div>
                    <div className="modal-body">
                      <form id="creditForm">

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Credit</label>
                                </div>

                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" disabled={disFieldC} className="form-control border-0" defaultValue={spData.footAddTitle} onChange={e => temp = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootAddTitle} onClick={e => {
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
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Credit #2</label>
                                </div>

                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" disabled={disFieldC2} className="form-control border-0" defaultValue={spData.footAddSubtitle} onChange={e => temp2 = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootAddSubtitle} onClick={e => {
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
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Credit #3</label>
                                </div>

                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" disabled={disFieldC3} className="form-control border-0" defaultValue={spData.footAddSubtitle2} onChange={e => temp3 = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootAddSubtitle2} onClick={e => {
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
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="form-group" >
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Width</label>
                                </div>
                                <div className="col pt-1 pb-1">
                                  <div className="row m-auto">
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="creditColAuto" value="col-md" onChange={e => tempColW = e.target.value} /> Auto </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="creditCol1" value="col-md-1" onChange={e => tempColW = e.target.value} /> 1 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="creditCol2" value="col-md-2" onChange={e => tempColW = e.target.value} /> 2 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="creditCol3" value="col-md-3" onChange={e => tempColW = e.target.value} /> 3 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="creditCol4" value="col-md-4" onChange={e => tempColW = e.target.value} /> 4 </label>
                                    </div>
                                    <div className="col radio">
                                      <label class="radio-inline"> <input type="radio" name="blockWidth" id="creditCol5" value="col-md-5" onChange={e => tempColW = e.target.value} /> 5 </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Back color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.footAddColor)} onChange={e => tempColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Text color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.footAddTextColor)} onChange={e => tempTextColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Opacity</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.footAddOpacity} id="creditOpRange" onChange={e => tempOpacity = e.target.value} ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Hide</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">

                                    <input type="checkbox" className="form-control" defaultChecked={!spData.addInfoShow} onClick={e => {
                                      if (spData.addInfoShow === false) {
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
                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                      </form>
                    </div>
                  </div>
                </AddInfoDialog>
                <BackEditDialog backEditDiaShow={this.state.backEditDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("back")} handleSave={this.saveBack}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Backgrounds</h5>
                    </div>
                    <div className="modal-body">
                      <form id="backEditForm">

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col borderight pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Main</label>
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
                                        spData.noBackImage = true;
                                      } else {
                                        this.setState({
                                          disFieldB: false
                                        });
                                        spData.noBackImage = false;
                                      }
                                    }} />
                                    <span class="slider round" title="No image"></span>
                                  </label>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col borderight pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Cats/Credit</label>
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
                                        spData.noCatImage = true;
                                      } else {
                                        this.setState({
                                          disFieldBC: false
                                        });
                                        spData.noCatImage = false;
                                      }
                                    }} />
                                    <span class="slider round" title="No image"></span>
                                  </label>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Main back color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.backgroundColor)} onChange={e => tempColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Opacity</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.backgroundOpacity} id="backOpRange" onChange={e => tempOpacity = e.target.value} ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Cat/Credit back color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.catColor)} onChange={e => tempCatColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Opacity</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.catOpacity} id="catOpRange" onChange={e => tempOpacity1 = e.target.value} ></input>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Upload upShow={this.state.upShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Loading data... Please wait.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Upload>
                      </form>
                    </div>
                  </div>
                </BackEditDialog>
                <CatDialog catDiaShow={this.state.catDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("cat")}>
                  <div className="modal-content noBG">
                    <div className="modal-header darkBG">
                      <h5 className="modal-title latowhite" >{tempCatTitle}</h5>
                    </div>
                    <div style={this.state.catStyle} className="modal-body-dark">
                      <div className="textcenter">
                        {
                          this.state.catItems.map(({ id, title, link, descr, icon, video }, i) => {
                            return (
                              <Item showItemsBtn={this.state.itemsBtnShow} key={i} pos={i} id={id}
                                title={title} link={link} descr={descr} icon={icon} video={video}
                                itemVideo={this.catItemVideo} itemEditDel={this.itemEditDel} />
                            )
                          })
                        }
                        <ItemAdd showItemsBtn={this.state.itemsBtnShow} addItem={this.addItem} />
                      </div>
                    </div>
                  </div>
                </CatDialog>
                <ItemEditDialog itemEditDiaShow={this.state.itemEditDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("itemEdit")} handleSave={this.applyItemEdit}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Item</h5>
                    </div>
                    <div className="modal-body">
                      <form id="itemEditForm">

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

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Pos</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" placeholder={currPos + 1} id="clearitemswitchpos"
                                    onChange={e => {
                                      cgPos = e.target.value;
                                    }
                                    } />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Title</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" defaultValue={tempItemTitle} onChange={e => temp2 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Link</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" defaultValue={tempItemLink} onChange={e => temp3 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Descr.</label>
                                </div>

                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" disabled={disFieldIE} className="form-control border-0" defaultValue={tempItemDescr} onChange={e => temp6 = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={noDescr} onClick={e => {
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
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Video</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={tempItemVideo} onClick={e => {
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

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Category</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  {catMenuButtons}
                                </div>
                              </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col">
                            </div>
                          </div>
                        </div>

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Upload upShow={this.state.upShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Loading data... Please wait.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Upload>
                        <Error errShow={this.state.errShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">No changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                      </form>
                    </div>
                  </div>
                </ItemEditDialog>
                <ItemAddDialog itemAddDiaShow={this.state.itemAddDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("itemAdd")} handleSave={this.applyItemAdd}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Add Item</h5>
                    </div>
                    <div className="modal-body">
                      <form id="itemAddForm">

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

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Pos</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" placeholder="Leave blank for last..." id="clearitempos" className="form-control border-0"
                                    onChange={e => {
                                      temp = e.target.value;
                                    }
                                    } />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Title</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" id="clearitemtitle" onChange={e => temp2 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Link</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" id="clearitemlink" onChange={e => temp3 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Descr.</label>
                                </div>

                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" disabled={disFieldIA} className="form-control border-0" defaultValue={tempItemDescr} id="clearitemdescr" onChange={e => temp6 = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={noDescr} onClick={e => {
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
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Descr.</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" placeholder="Description..." id="clearitemdescr" onChange={e => temp6 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Video</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={tempItemVideo} onClick={e => {
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

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Category</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  {catMenuButtons}
                                </div>
                              </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col">
                            </div>
                          </div>
                        </div>

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Item added!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Upload upShow={this.state.upShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Loading data... Please wait.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Upload>
                        <Error errShow={this.state.errShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Fill in all fields / Check position.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                      </form>
                    </div>
                  </div>
                </ItemAddDialog>
                <ItemDelDialog itemDelDiaShow={this.state.itemDelDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("itemDel")} handleSave={this.applyItemDel}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Permanently delete {tempItemTitle} item?</h5>
                    </div>
                    <div className="modal-body">
                      <Ok okShow={this.state.okShow}>
                        <div className="row text-center pt-2">
                          <div className="col">
                            <div className="row">
                              <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                <div>
                                  <p className="norfont">Application removed!</p>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </Ok>
                    </div>
                  </div>
                </ItemDelDialog>
                <CatEditDialog catEditDiaShow={this.state.catEditDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("catedit")} handleSave={this.applyCatEdit}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Category</h5>
                    </div>
                    <div className="modal-body">
                      <form id="catEditForm">

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

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Pos</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" placeholder={currPos + 1} id="clearcatswitchpos" className="form-control border-0"
                                    onChange={e => {
                                      temp = e.target.value;
                                    }
                                    } />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Title</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" defaultValue={tempCatTitle} onChange={e => temp2 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Upload upShow={this.state.upShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Loading data... Please wait.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Upload>
                        <Error errShow={this.state.errShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">No changes made or CAT name duplicated!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                      </form>
                    </div>
                  </div>
                </CatEditDialog>
                <CatAddDialog catAddDiaShow={this.state.catAddDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("catadd")} handleSave={this.applyCatAdd}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Add Category</h5>
                    </div>
                    <div className="modal-body">
                      <form id="catAddForm">

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

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Pos</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" placeholder="Leave blank for last..." id="clearcatpos" className="form-control border-0"
                                    onChange={e => {
                                      temp = e.target.value;
                                    }
                                    } />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Title</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" id="clearcattitle" onChange={e => temp2 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Cat added!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Upload upShow={this.state.upShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Loading data... Please wait.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Upload>
                        <Error errShow={this.state.errShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Fill in all fields or CAT name duplicated!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                      </form>
                    </div>
                  </div>
                </CatAddDialog>
                <CatDelDialog catDelDiaShow={this.state.catDelDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("catdel")} handleSave={this.applyCatDel}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Permanently delete {tempCatTitle} category?</h5>
                    </div>
                    <div className="modal-body">
                      <Ok okShow={this.state.okShow}>
                        <div className="row text-center pt-2">
                          <div className="col">
                            <div className="row">
                              <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                <div>
                                  <p className="norfont">Category removed!</p>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </Ok>
                    </div>
                  </div>
                </CatDelDialog>
                <ItemOrCatDialog iocDiaShow={this.state.iocDiaShow} activityChanged={this.state.activityChanged} handleItem={this.addItem} handleCat={this.catAddItem} handleClose={() => this.hideModal("itemorcat")}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Add Item or Category?</h5>
                    </div>
                  </div>
                </ItemOrCatDialog>

                <CrsDialog crsDiaShow={this.state.crsDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("excrs")} handleSave={this.applyItemEdit}>
                  <div className="modal-content noBG">
                    <div className="modal-header darkBG">
                      <h5 className="modal-title latowhite" >{spData.menuCreditsLabel}</h5>
                    </div>
                    <div style={this.state.catStyle} className="modal-body-dark">
                      <div className="textcenter">
                        {
                          this.state.creditsItems.map(({ id, title, link, descr, }, i) => {
                            return (
                              <Credit showItemsBtn={this.state.itemsBtnShow} key={i} pos={i}
                                title={title} link={link} descr={descr} crsEditDel={this.crsEditDel}
                                crsAddItem={this.crsAddItem} />
                            )
                          })
                        }
                        <CrsAdd showItemsBtn={this.state.itemsBtnShow} /* title={title} link={link} icon={icon} */ addItem={this.crsAddItem} />
                      </div>
                    </div>
                  </div>

                </CrsDialog>
                <CrsAddDialog crsAddDiaShow={this.state.crsAddDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("crsadd")} handleSave={this.applyCrsAdd}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Add Credit</h5>
                    </div>
                    <div className="modal-body">
                      <form id="crsAddForm">

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Pos</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" placeholder="Leave blank for last..." id="clearcrspos" className="form-control border-0"
                                    onChange={e => {
                                      temp = e.target.value;
                                    }
                                    } />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Title</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" id="clearcrstitle" onChange={e => temp2 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Link</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" id="clearcrslink" onChange={e => temp3 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Descr.</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" id="clearcrsdescr" onChange={e => temp4 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Credit added!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Upload upShow={this.state.upShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Loading data... Please wait.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Upload>
                        <Error errShow={this.state.errShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Fill in all fields!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                      </form>
                    </div>
                  </div>
                </CrsAddDialog>
                <CrsEditDialog crsEditDiaShow={this.state.crsEditDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("crsedit")} handleSave={this.applyCrsEdit}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Credit</h5>
                    </div>
                    <div className="modal-body">
                      <form id="crsEditForm">

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Pos</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" placeholder={currPos + 1} id="clearcrsswitchpos" className="form-control border-0"
                                    onChange={e => {
                                      temp = e.target.value;
                                    }
                                    } />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Title</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" defaultValue={tempCrsTitle} onChange={e => temp2 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Link</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" defaultValue={tempCrsLink} onChange={e => temp3 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row text-center mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col-2 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Descr.</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" defaultValue={tempCrsDescr} onChange={e => temp4 = e.target.value} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Ok okShow={this.state.okShow}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Upload upShow={this.state.upShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Loading data... Please wait.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Upload>
                        <Error errShow={this.state.errShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidblue latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">No changes made!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                      </form>
                    </div>
                  </div>
                </CrsEditDialog>
                <CrsDelDialog crsDelDiaShow={this.state.crsDelDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("crsdel")} handleSave={this.applyCrsDel}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Permanently delete {tempCrsTitle} credit?</h5>
                    </div>
                    <div className="modal-body">
                      <Ok okShow={this.state.okShow}>
                        <div className="row text-center pt-2">
                          <div className="col">
                            <div className="row">
                              <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                <div>
                                  <p className="norfont">Credit removed!</p>
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      </Ok>
                    </div>
                  </div>
                </CrsDelDialog>

                <SearchDialog searchDiaShow={this.state.searchDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("search")} handleSave={this.itemSearch} handleReset={this.itemSearchReset}>
                  <div className="modal-content noborder">
                    <div className="modal-header-dark">
                      <h5 className="modal-title-dark" >Search</h5>
                    </div>
                    <div className="modal-body-dark darkBG">
                      <form id="searchForm" onKeyDown={this.handleKeyDown}>
                        <div className="form-group">
                          <input type="text" className="form-control contenitore pt-2" ref={(input) => { this.searchInput = input; }} onChange={e => temp = e.target.value} placeholder={"Search..."} />
                        </div>
                        <Ok okShow={this.state.okShow} display={this.state.display}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Search results:</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Ok>
                        <Error errShow={this.state.errShow} >
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Enter at least one character.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Error>
                        {/* RESITEMS */}
                        <div className="textcenter">
                          {
                            this.state.resItems.map(({ id, title, link, descr, icon, video }, i) => {
                              return (
                                <ItemSearchRes key={i} pos={i} id={id}
                                  title={title} link={link} descr={descr} icon={icon} video={video}
                                  itemVideo={this.resItemVideo} />
                              )
                            })
                          }
                        </div>
                      </form>
                    </div>
                  </div>
                </SearchDialog>
                <ItemVideoDialog itemVideoDiaShow={this.state.itemVideoDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("video")} handleSave={this.applyItemEdit}>
                  <div className="modal-content darkBG">

                    <div className="row mb-1 m-1 modal-header-dark">
                      <div className="col">
                        <div className="row">
                          <div className="col-md-3 mb-1 d-flex flex-column justify-content-center align-items-center">
                            <OverlayImg></OverlayImg>
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
                        <iframe width="100%" height="350" src={this.state.videoLink} frameborder="0" allowfullscreen="true"></iframe>
                      </center>
                    </div>
                  </div>
                </ItemVideoDialog>

                <div className="stickytop">
                  {head}
                  {buttons}
                </div>
                {/* BODY */}
                <div className="textcenter">
                  {/* CATEGORIES */}
                  {
                    this.state.cats.map(({ id, title, icon }, i) => {
                      return (
                        <Cat showItemsBtn={this.state.itemsBtnShow} key={i} pos={i}
                          title={title} icon={icon} catEditDel={this.catEditDel}
                          /* catAddItem={this.catAddItem} */ catCont={this.catCont} />
                      )
                    })
                  }
                  {/* APPS */}
                  {
                    this.state.rootItems.map(({ id, title, link, descr, icon, video }, i) => {
                      return (
                        <Item showItemsBtn={this.state.itemsBtnShow} key={i} pos={i} id={id}
                          title={title} link={link} descr={descr} icon={icon} video={video}
                          itemEditDel={this.itemEditDel} /* addItem={this.itemOrCat} */ itemVideo={this.itemVideo} />
                      )
                    })
                  }
                  <ItemAdd showItemsBtn={this.state.itemsBtnShow} /* title={title} link={link} icon={icon} */ addItem={this.itemOrCat} />
                  {/* FOOTER */}
                  {foot}
                </div>
              </section>
            </div>
          </div>
        </div>
        {/* Bootstrap JS */}
        <script src="./bootstrap/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous">
        </script>
      </body>

    );
  }
}

class LoginGear extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const gearClick = () => {
      this.props.handleShowButtons(true);
    }
    return (
      <img className="gear mt-2 mb-2" alt="Login" src="./img/gears.svg" onClick={() => gearClick()} />
    );
  }
}

class SettingsGear extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const gearClick = () => {
    //   this.props.handleShowButtons(true);
    // }
    return (
      <img className="gear mt-2 mb-2" alt="Settings" title="Settings" src="./img/gear.svg" /* onClick={() => gearClick()} */ />
    );
  }
}

class OverlayImg extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <img className="overlay" alt="Overlay" src={spData.LogoIcon} /* onClick={() => gearClick()}  */ />
    );
  }
}

class RedPoint extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <img className="gear mt-2 mb-2" title="Hidden" alt="Hidden" src="./img/point.svg" />
    );
  }
}

class LogoImg extends React.Component {
  constructor(props) {
    super(props);
  }
  link = spData.homeLink;
  render() {
    const logoClick = () => {
      window.location.href = spData.homeLink;
    }
    return (
      <img className="logo mt-2 mb-2" title="Home" alt="Logo" src={spData.LogoIcon}
        onClick={() => logoClick()} />
    );
  }
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {

//     const linkOrVideo = this.props.video
//       ?
//       (<a title={this.props.title} onClick={() => this.props.itemVideo("itemVideo", this.props.id)}>
//         <img className="items" title={this.props.title} alt={this.props.title} src={this.props.icon} />
//       </a>)
//       :
//       (< a title={this.props.title} href={this.props.link} target="_blank" >
//         <img className="items" title={this.props.title} alt={this.props.title} src={this.props.icon} />
//       </a>);

//     let itemBtn = "";
//     let descrButton = "";
//     if (this.props.descr !== "") {
//       descrButton = (
//         // <Accordion title={this.props.title} content={this.props.descr} />

//         // <h4><p className="lato pointer" onClick={() => this.props.appDescr("AppDescr", this.props.id)}><b>{this.props.title}</b></p></h4>

//         <h4>
//           <div className="row lato text-center m-auto">
//             <div className="col">
//               <div className="row">
//                 <div className="col d-flex flex-column justify-content-center align-items-center">
//                   <b>{this.props.title}</b>
//                 </div>
//                 <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
//                   onClick={() => this.props.appDescr("AppDescr", this.props.id)}>
//                   <b>+</b>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </h4>
//       )
//     } else {
//       descrButton = (
//         <h4><p className="lato"><b>{this.props.title}</b></p></h4>
//       );
//     };
//     if (this.props.showItemsBtn === "ShowItemBtn") {
//       itemBtn = (
//         <div className="itemcontainer">
//           {linkOrVideo}
//           {descrButton}
//           {/* <h4><p className="lato"><b>{this.props.title}</b></p></h4> */}
//           <div className="row btncontainer">
//             <button className="col itembutton solidgreen m-1" onClick={() => this.props.itemEditDel("itemEdit", this.props.id, this.props.pos)}>
//               Edit
//             </button>
//             <button className="col-1 itembutton black m-1 pad01">
//               {this.props.pos + 1} {/* {this.props.id} */}
//             </button>
//             <button className="col itembutton solidbrick m-1" onClick={() => this.props.itemEditDel("itemDel", this.props.id)}>
//               Remove
//             </button>
//           </div>
//         </div>
//       )
//     } else {
//       itemBtn = (
//         <div className="itemcontainer">
//           {linkOrVideo}
//           {descrButton}
//           {/* <h4><p className="lato"><b>{this.props.title}</b></p></h4> */}
//         </div>
//       )
//     }
//     return (
//       <>
//         {itemBtn}
//       </>
//     );
//   }
// }

class ItemAdd extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let itemBtn = ""
    if (this.props.showItemsBtn === "ShowItemBtn") {
      itemBtn = (
        <div className="itemcontainer">
          <div className="iconcontainer box box2">
            {/* < a title="Add Item" onClick={() => this.props.addItem()} > */}
            <img className="items" title="Add Item" alt="Add Item" src="./itemicons/ac_add.svg"
              onClick={() => this.props.addItem()} />
            {/* </a> */}
          </div>
          <h4>
            <div className="row lato text-center m-1">
              <div className="col">
                <div className="row">
                  <div className="col d-flex flex-column justify-content-center align-items-center">
                    <b>Add Item</b>
                  </div>
                  {/* <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
                      onClick={() => setIsActive(!isActive)}>
                      <b>{isActive ? '-' : '+'}</b>
                    </div> */}
                </div>
              </div>
            </div>
          </h4>

          {/* <h4><p className="lato"><b>Add Item</b></p></h4> */}

          <div className="row btncontainer">
            <button className="col addbutton solidgreen m-1" onClick={() => this.props.addItem()}>
              Add Item
            </button>
          </div>
        </div>
      )
    } else {
      itemBtn = "";
    }
    return (
      <>
        {itemBtn}
      </>
    );
  }
}

class CrsAdd extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let crsBtn = ""
    if (this.props.showItemsBtn === "ShowItemBtn") {
      crsBtn = (

        <div className="row">
          <button className="col extcredits solidgreen m-1"
            onClick={() => this.props.addItem()}>
            {/* <b><h2><font color="white"> */}
            <img className="plus mt-2 mb-1" title="Add Item" alt="Add Item" src="./itemicons/plus.svg" />
            {/* + */}
            {/* </font></h2></b> */}
            <h5><font color="Chartreuse">Add Item</font></h5>
          </button>
        </div>

      )
    } else {
      crsBtn = "";
    }
    return (
      <>
        {crsBtn}
      </>
    );
  }
}

class Cat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let catBtn = ""
    if (this.props.showItemsBtn === "ShowItemBtn") {
      catBtn = (
        <div className="itemcontainer">
          <div className="iconcontainer box box2">
            {/* <a title={this.props.title} onClick={() => this.props.catCont("catCont", this.props.pos)}> */}
            <img className="items" title={this.props.title} alt={this.props.title} src={this.props.icon}
              onClick={() => this.props.catCont("catCont", this.props.pos)} />
            {/* </a> */}
          </div>
          <h4>
            <div className="row lato text-center m-1">
              <div className="col">
                <div className="row">
                  <div className="col d-flex flex-column justify-content-center align-items-center">
                    <b>{this.props.title}</b>
                  </div>
                  {/* <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
                      onClick={() => setIsActive(!isActive)}>
                      <b>{isActive ? '-' : '+'}</b>
                    </div> */}
                </div>
              </div>
            </div>
          </h4>

          {/* <h4><p className="lato"><b>{this.props.title}</b></p></h4> */}

          <div className="row btncontainer">
            <button className="col itembutton solidgreen m-1" onClick={() => this.props.catEditDel("CatEdit", this.props.pos)}>
              Edit
            </button>
            <button className="col-1 itembutton black m-1 pad01">
              {this.props.pos + 1}
            </button>
            <button className="col itembutton solidbrick m-1" onClick={() => this.props.catEditDel("CatDel", this.props.pos)}>
              Remove
            </button>
          </div>

        </div>
      )
    } else {
      catBtn = (
        <div className="itemcontainer">
          <div className="iconcontainer box box2">
            {/* <a title={this.props.title} onClick={() => this.props.catCont("catCont", this.props.pos)}> */}
            <img className="items" title={this.props.title} alt={this.props.title} src={this.props.icon}
              onClick={() => this.props.catCont("catCont", this.props.pos)} />
            {/* </a> */}
          </div>
          <h4>
            <div className="row lato text-center m-1">
              <div className="col">
                <div className="row">
                  <div className="col d-flex flex-column justify-content-center align-items-center">
                    <b>{this.props.title}</b>
                  </div>
                  {/* <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
                      onClick={() => setIsActive(!isActive)}>
                      <b>{isActive ? '-' : '+'}</b>
                    </div> */}
                </div>
              </div>
            </div>
          </h4>

          {/* <h4><p className="lato"><b>{this.props.title}</b></p></h4> */}


        </div>
      )
    }
    return (
      <>
        {catBtn}
      </>
    );
  }
}

class Credit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let creditBtn = ""
    if (this.props.showItemsBtn === "ShowItemBtn") {
      creditBtn = (
        <>
          <div className="row">
            <button className="col extcredits green m-1"
              onClick={() => {
                window.open(this.props.link);
              }}>
              <h2><font color="white">
                {this.props.title}
              </font></h2>
              <h5><font color="Chartreuse">{this.props.descr}</font></h5>
            </button>
          </div>
          <div className="row btncontainer">
            <button className="col itembutton solidgreen m-1" onClick={() => this.props.crsEditDel("CrsEdit", this.props.pos)}>
              Edit
            </button>
            <button className="col-1 itembutton black m-1 pad01">
              {this.props.pos + 1}
            </button>
            <button className="col itembutton solidbrick m-1" onClick={() => this.props.crsEditDel("CrsDel", this.props.pos)}>
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
              window.open(this.props.link);
            }}>
            <h2><font color="white">
              {this.props.title}
            </font></h2>
            <h5><font color="Chartreuse">{this.props.descr}</font></h5>
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
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const showHideSearch = /* this.props.menuSearch */ spData.noMenuSearch ? "d-none" : "d-block";
    const showHideCredits = /* this.props.menuCredits */ spData.noMenuCredits ? "d-none" : "d-block";
    const menuClass = `dropdown-menu${this.state.isOpen ? " show d-flex flex-column justify-content-center align-items-center" : " disNone"}`;
    return (
      <div className="dropdown" onClick={this.toggleOpen}>

        <button
          className="button indaco m-1 dropdown-toggle"
          type="button"
          // id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          Menu
        </button>
        <div className={menuClass + " menuBG"} /* aria-labelledby="dropdownMenuButton" */>

          <button className={showHideSearch + " col menuItem green m-1"}
            onClick={() => {
              // window.location = "./searching.php";
              this.props.search();
            }}>
            {spData.menuSearchLabel}
          </button>
          <button className={showHideCredits + " col menuItem blue m-1"}
            onClick={() => {
              // window.location = "./credits.html";
              this.props.crsShow();
            }}>
            {spData.menuCreditsLabel}
          </button>
        </div>
      </div>
    );
  }
}

class DropdownCat extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    isOpen: false
  };

  changeText(selected) {
    this.setState({ selCat: selected });
  }

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show d-flex flex-column justify-content-start align-items-center" : " disNone"}`;

    return (
      <div className="dropdown" onClick={this.toggleOpen}>

        <button
          className="button indaco m-1 dropdown-toggle"
          type="button"
          // id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          {this.props.catName}
        </button>
        <div className={menuClass + " menuBG"} /* aria-labelledby="dropdownMenuButton" */>
          <button className="col menuItem green m-1"
            onClick={(e) => {
              // window.location = "./searching.php";
              this.changeText("Root")
              this.props.setCat("Root", e);
            }}>
            Root
          </button>

          {
            this.props.items.map(({ id, title, icon }, i) => {
              return (
                <button className="col menuItem green m-1"
                  onClick={(e) => {
                    // window.location = "./searching.php";
                    this.changeText(title)
                    this.props.setCat(title, e);
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

// ========================================

const header = ReactDOM.createRoot(document.getElementById("root"));
header.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);