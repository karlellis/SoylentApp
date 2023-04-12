import React from "react";
import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
// import "./bootstrap/js/bootstrap.bundle.min.js"
// import { ReactComponent as GearIcon } from "./srcimg/gear.svg";
const bcrypt = require("bcryptjs")
var fileImg = null;
var fileCatImg = null;
// var tempUser = "";
// var tempPsw = "";
var cgPos = "";
var currPos = "";
var temp = "";
var temp2 = "";
var temp3 = "";
var temp4 = "";
var temp5 = "Root";
var temp6 = "";
var disable1 = false;
var disable2 = false;
var disable3 = false;
var noDescr = false;
var tempID = 0;
var tempColor = "#0077c8";
var tempOpacity = 0.7;
var tempOpacity1 = 0.7;
var tempCatColor = "#0077c8";
var tempTextColor = "#0077c8";
var tempColW = "";
var radiobtn = "";
var tempAppTitle = "";
var tempAppDescr = "...";
var tempAppLink = "";
var tempAppVideo = false;
var tempCatTitle = "";
var tempExCrsTitle = "";
var tempExCrsLink = "";
var tempExCrsDescr = "";
var tempAppCat = "";
var tempIcon = "";
var tempCatIcon = "";
var arrayLength = 0;
var login = false;
var array = [];
var arrayAdd = [];
var inPos = "";
var blockHide = "none";
var appNewItem = {
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
var appDescr = {
  "title": "",
  "icon": "",
  "descr": ""
};
var exCrsNewItem = {
  "title": "",
  "link": "",
  "descr": ""
};
var nome = "";
var credentials = require("./initSec.json");
var spData = require("./initData.json");

// const sleep = (milliseconds) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

const App = ({ showAppsBtn, pos, id, title, link, descr, icon, video, appEditDel, appVideo, appDescr }) => {
  const [isActive, setIsActive] = useState(false);

  const linkOrVideo = video
    ?
    (<a title={title} onClick={() => appVideo("AppVideo", id)}>
      <img className="apps" title={title} alt={title} src={icon} />
    </a>)
    :
    (< a title={title} href={link} target="_blank" >
      <img className="apps" title={title} alt={title} src={icon} />
    </a>);

  let appBtn = "";
  let descrButton = "";

  if (descr !== "") {
    descrButton = (
      <>
        {isActive &&
          <div className="row medfonts descr fade-in-image lato text-center m-auto mt-5 mb-5"
            style={{
              backgroundImage: "url(" + icon + ")",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed",
              width: "16em"
            }}>
            <b style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>{descr}</b>
          </div>
        }
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
      </>
    )
  } else {
    descrButton = (
      <h4><p className="lato"><b>{title}</b></p></h4>
    );
  };
  if (showAppsBtn === "ShowAppBtn") {
    appBtn = (
      <div className="appcontainer">
        {!isActive && linkOrVideo}
        {descrButton}
        <div className="row btncontainer">
          <button className="col appbutton solidgreen m-1" onClick={() => appEditDel("AppEdit", id, pos)}>
            Edit
          </button>
          <button className="col-1 appbutton black m-1 pad01">
            {pos + 1} {/* {this.props.id} */}
          </button>
          <button className="col appbutton solidbrick m-1" onClick={() => appEditDel("AppDel", id)}>
            Remove
          </button>
        </div>
      </div>
    )
  } else {
    appBtn = (
      <div className="appcontainer">
        {!isActive && linkOrVideo}
        {descrButton}
      </div>
    )
  }
  return (
    <>
      {appBtn}
    </>
  );
}

const AppSearchRes = ({ id, title, link, descr, icon, video, appVideo }) => {
  const [isActive, setIsActive] = useState(false);
  const linkOrVideo = video
    ?
    (<a title={title} onClick={() => appVideo("AppVideo", id)}>
      <img className="apps" title={title} alt={title} src={icon} />
    </a>)
    :
    (< a title={title} href={link} target="_blank" >
      <img className="apps" title={title} alt={title} src={icon} />
    </a>);
  let appBtn = "";
  let descrButton = "";

  // if (descr !== "") {
  //   descrButton = (
  //     <>
  //       {isActive &&
  //         <div className="row smallfonts lato text-center m-auto mb-5">
  //           <i>{descr}</i>
  //         </div>
  //       }
  //       <h4>
  //         <div className="row lato text-center m-1">
  //           <div className="col">
  //             <div className="row">
  //               <div className="col d-flex flex-column justify-content-center align-items-center">
  //                 <b>{title}</b>
  //               </div>
  //               <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
  //                 onClick={() => setIsActive(!isActive)}>
  //                 <b>{isActive ? '-' : '+'}</b>
  //                 {/* <b>+</b> */}
  //               </div>
  //             </div>
  //           </div>
  //           {/* {isActive && <i className="row smallfonts">{content}</i>} */}
  //         </div>
  //       </h4>
  //     </>

  //     // <Accordion title={this.props.title} content={this.props.descr} />

  //     // <h4><p className="lato pointer" onClick={() => this.props.appDescr("AppDescr", this.props.id)}><b>{this.props.title}</b></p></h4>

  //     // <h4>
  //     //   <div className="row lato text-center m-auto">
  //     //     <div className="col">
  //     //       <div className="row">
  //     //         <div className="col d-flex flex-column justify-content-center align-items-center">
  //     //           <b>{title}</b>
  //     //         </div>
  //     //         <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
  //     //           onClick={() => appDescr("AppDescr", id)}>
  //     //           <b>+</b>
  //     //         </div>
  //     //       </div>
  //     //     </div>
  //     //   </div>
  //     // </h4>
  //   )
  // } else {
  //   descrButton = (
  //     <h4><p className="lato"><b>{title}</b></p></h4>
  //   );
  // };

  if (descr !== "") {
    descrButton = (
      <>
        {isActive &&
          <div className="row medfonts descr fade-in-image lato text-center m-auto mt-5 mb-5"
            style={{
              backgroundImage: "url(" + icon + ")",
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed",
              width: "16em"
            }}>
            <b style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>{descr}</b>
          </div>
        }
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
      </>
    )
  } else {
    descrButton = (
      <h4><p className="lato"><b>{title}</b></p></h4>
    );
  };

  appBtn = (
    <div className="appcontainer">
      {!isActive && linkOrVideo}
      {descrButton}
    </div>
  )
  return (
    <>
      {appBtn}
    </>
  );
}

const Menu = ({ menuShow, children, mainBtn }) => {
  const showHideClassName = menuShow ? "d-block" : "d-none";
  const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
  return (
    <section id="HeadMenu" style={{ backgroundColor: spData.menuColor, color: spData.menuTextColor }} className={showHideClassName + " " + justifyCenterEnd + " col-md-1 d-flex flex-column align-items-center"}>
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

const Crediti = ({ creditShow, children, infoShow, mainBtn }) => {
  const showHideClassName = creditShow ? "d-block" : "d-none";
  const justifyCenterEnd = mainBtn ? "justify-content-end" : "justify-content-center";
  return (
    <section id="FootCrediti" style={{ backgroundColor: spData.footCreditColor, color: spData.footCreditTextColor }} className={showHideClassName + " " + justifyCenterEnd + " " + spData.footCreditColW + " latoplain d-flex flex-column align-items-center"}>
      {children}
    </section>
  );
};

const EditCrediti = ({ editCreditShow, children, hidden }) => {
  const showHideClassName = editCreditShow ? "d-block" : "d-none";
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

const Conferma = ({ alShow, children }) => {
  const showHideClassName = alShow ? "display-block" : "display-none";
  return (
    <div className={showHideClassName}>
      {children}
    </div>
  );
};

const Upload = ({ upShow, children }) => {
  const showHideClassName = upShow ? "display-block" : "display-none";
  return (
    <div className={showHideClassName}>
      {children}
    </div>
  );
};

const Errore = ({ alErrShow, children }) => {
  const showHideClassName = alErrShow ? "display-block" : "display-none";
  return (
    <div className={showHideClassName}>
      {children}
    </div>
  );
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

const AppOrCatDialog = ({ handleApp, handleCat, aocDiaShow, children }) => {
  const showHideClassName = aocDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleApp}>App</button>
          <button type="button" className="btn btn-success" data-dismiss="modal" onClick={handleCat}>Category</button>
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

const BackEditDialog = ({ handleSave, handleClose, backEditDiaShow, children, activityChanged, disField }) => {
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

const AppVideoDialog = ({ handleClose, appVideoDiaShow, children, activityChanged }) => {
  const showHideClassName = appVideoDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main darkBG">
        {children}
        <div className="modal-footer-dark">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const ExCrsDialog = ({ handleClose, exCrsDiaShow, children, activityChanged }) => {
  const showHideClassName = exCrsDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main-dark">
        {children}
        <div className="modal-footer-dark">
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
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

const AppDescrDialog = ({ handleSave, handleClose, appDescrDiaShow, children, activityChanged }) => {
  const showHideClassName = appDescrDiaShow ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="descr-dark">
        {children}
        <div className="modal-footer-dark">
          {/* <button type="button" className="btn btn-primary" onClick={handleSave}>Show</button> */}
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

const AppEditDialog = ({ handleSave, handleClose, appEditDiaShow, children, activityChanged }) => {
  const showHideClassName = appEditDiaShow ? "modal display-block" : "modal display-none";
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

const AppDelDialog = ({ handleSave, handleClose, appDelDiaShow, children, activityChanged }) => {
  const showHideClassName = appDelDiaShow ? "modal display-block" : "modal display-none";
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

const AppAddDialog = ({ handleSave, handleClose, appAddDiaShow, children, activityChanged }) => {
  const showHideClassName = appAddDiaShow ? "modal display-block" : "modal display-none";
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

const ExCrsEditDialog = ({ handleSave, handleClose, exCrsEditDiaShow, children, activityChanged }) => {
  const showHideClassName = exCrsEditDiaShow ? "modal display-block" : "modal display-none";
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

const ExCrsDelDialog = ({ handleSave, handleClose, exCrsDelDiaShow, children, activityChanged }) => {
  const showHideClassName = exCrsDelDiaShow ? "modal display-block" : "modal display-none";
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

const ExCrsAddDialog = ({ handleSave, handleClose, exCrsAddDiaShow, children, activityChanged }) => {
  const showHideClassName = exCrsAddDiaShow ? "modal display-block" : "modal display-none";
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

const CreditDialog = ({ handleSave, handleClose, creditDiaShow, children }) => {
  const showHideClassName = creditDiaShow ? "modal display-block" : "modal display-none";
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
          <button type="button" disabled={(activityChanged) ? true : false} className="btn btn-primary" onClick={handleUpload}>Apply & Close</button>
          <button type="button" /* disabled={(activityChanged) ? true : false} */ className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <h4>
        <div className="row lato text-center m-auto">
          <div className="col">
            <div className="row">
              <div className="col d-flex flex-column justify-content-center align-items-center">
                <b>{title}</b>
              </div>
              <div className="col-2 borderleft pointer d-flex flex-column justify-content-center align-items-center"
                onClick={() => setIsActive(!isActive)}>
                <b>{isActive ? '-' : '+'}</b>
                {/* <b>+</b> */}
              </div>
            </div>
          </div>
          {/* {isActive && <i className="row smallfonts">{content}</i>} */}
        </div>
      </h4>
      <div className="row smallfonts lato text-center m-auto">
        {isActive && <i>{content}</i>}
      </div>
    </>


    // <div>
    //   <div onClick={() => setIsActive(!isActive)}>
    //     <div className="lato pointer"><h4><b>{title}</b></h4></div>
    //     <div>{isActive ? '-' : '+'}</div>
    //   </div>
    //   {isActive && <div className="lato smallfonts"><i>{content}</i></div>}
    // </div>
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
      console.log("Image Upload:", nome);
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

async function fetchDelPHP(appIcon, url, key) {
  var data = new FormData()
  data.append(key, appIcon)
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
      creditShow: false,
      mainBtn: false,
      appsBtnShow: "null",
      appItems: [],
      rootAppItems: [],
      catItems: [],
      resAppItems: [],
      catAppItems: [],
      creditsItems: [],
      menuShow: false,
      titleShow: false,
      logoShow: false,
      clockShow: false,
      titleDiaShow: false,
      menuDiaShow: false,
      logoDiaShow: false,
      loginDiaShow: false,
      creditDiaShow: false,
      loginEditDiaShow: false,
      infoDiaShow: false,
      appEditDiaShow: false,
      appDelDiaShow: false,
      appAddDiaShow: false,
      appVideoDiaShow: false,
      catEditDiaShow: false,
      catDelDiaShow: false,
      catAddDiaShow: false,
      searchDiaShow: false,
      catDiaShow: false,
      appDescrDiaShow: false,
      creditsDiaShow: false,
      aocDiaShow: false,
      videoLink: tempAppLink,
      alShow: false,
      alErrShow: false,
      upShow: false,
      activityChanged: false,
      disFieldB: false,
      disFieldBC: false,
      disField: false,
      disField2: false,
      disField3: false,
      disFieldC: false,
      disFieldC2: false,
      disFieldC3: false,
      disFieldAA: true,
      disFieldAE: false,
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
    this.appEditDel = this.appEditDel.bind(this);
    this.appAddItem = this.appAddItem.bind(this);
    this.appOrCatItem = this.appOrCatItem.bind(this);
    this.catEditDel = this.catEditDel.bind(this);
    this.catAddItem = this.catAddItem.bind(this);
    this.appVideo = this.appVideo.bind(this);
    this.appDescr = this.appDescr.bind(this);
    this.catCont = this.catCont.bind(this);
    this.resAppVideo = this.resAppVideo.bind(this);
    this.catAppVideo = this.catAppVideo.bind(this);
    this.exCrsShow = this.exCrsShow.bind(this);
    this.search = this.search.bind(this);
    this.setCat = this.setCat.bind(this);
    this.showMainButtons = this.showMainButtons.bind(this);
    this.headLogoEdit = this.headLogoEdit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.loginSession = this.loginSession.bind(this);
    this.loginEditSession = this.loginEditSession.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.loginCheck = this.loginCheck.bind(this);
    this.loginEditCheck = this.loginEditCheck.bind(this);
  }

  componentDidMount() {
    fetch('./config/data.json').then(response => {
      response.json().then(settings => {
        spData = settings;
        // console.log("Apps: ", settings.appItems);
        this.setState({
          infoShow: spData.infoShow,
          creditShow: spData.creditShow,
          mainBtn: spData.mainBtn,
          appsBtnShow: spData.appsBtnShow,
          menuShow: spData.menuShow,
          titleShow: spData.titleShow,
          logoShow: spData.logoShow,
          clockShow: spData.clockShow,
          appItems: spData.appItems,
          catItems: spData.catItems,
          disFieldB: spData.noBackImage,
          disFieldBC: spData.noCatImage,
          disField: spData.noFootTitle,
          disField2: spData.noFootSubtitle,
          disField3: spData.noFootSubtitle2,
          disFieldC: spData.noFootCreditiTitle,
          disFieldC2: spData.noFootCreditiSubtitle,
          disFieldC3: spData.noFootCreditiSubtitle2
        });
        document.title = spData.headTitle;
        if (spData.footTitle !== "") {
          document.querySelector('meta[name="description"]').setAttribute("content", spData.footTitle);
        } else if (spData.footSubtitle !== "") {
          document.querySelector('meta[name="description"]').setAttribute("content", spData.footSubtitle);
        } else {
          document.querySelector('meta[name="description"]').setAttribute("content", spData.footSubtitle2);
        }
        // console.log("BGOpacity:", (1 - spData.backgroundOpacity).toString());
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
              // backgroundImage: "url(" + spData.backgroundImage + ")",
              backgroundColor: spData.backgroundColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed"
            }
          });
        }

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
              // backgroundImage: "url(" + spData.catImage + ")",
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
        document.getElementById('appEditForm').reset();
        document.getElementById('appAddForm').reset();
        document.getElementById('catEditForm').reset();
        document.getElementById('catAddForm').reset();
        document.getElementById('backEditForm').reset();
        document.getElementById('clockForm').reset();
        document.getElementById('searchForm').reset();
        // console.log("Apps: ", this.state.appItems);
        this.appCatSearch("Root", spData.appItems);
        // console.log("Root Apps: ", this.state.rootAppItems);
        // console.log("Check password: ", comparePassword("admin", password));
        // console.log("Hashed first password: ", hashPassword(password));
      })
    })
    // document.title = spData.headTitle;
    // document.querySelector('meta[name="description"]').setAttribute("content", spData.footTitle);
  }

  componentDidUpdate() {
    this.userInput.focus();
    this.userChangeInput.focus();
    this.searchInput.focus();
    // console.log("Apps: ", this.state.appItems);
    // this.appRootSearch("Root");
  }

  saveFile(file, url, key) {
    fetchUpConfig(file, url, key)
      .then(res => {
        console.log("Config Saved!");
        // this.appCatSearch("Root", spData.appItems);
        this.appCatSearch(tempCatTitle, spData.appItems);
        this.appCatSearch("Root", spData.appItems);
        // console.log("Save Conf. result=", res);
        console.log("TempCat= ", tempCatTitle);
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
    this.setState({ alErrShow: false });
    this.setState({ upShow: true });
    this.setState({ alShow: false });
    this.setState({
      activityChanged: true
    })
    fetchUpPHP(file, "./api/img-upload.php", url)
      .then(res => {
        if (url === "logo" && op === "edit") {
          spData.LogoIcon = "./img/" + nome;
          this.setState({ upShow: false });
          this.setState({ alShow: true });
          this.setState({ alErrShow: false });
          // console.log("File correctly Uploaded!");
          this.setState({
            activityChanged: false
          });
          this.saveFile(spData, "./api/img-upload.php", "config");
          this.hideModal("logo");
        } else if (url === "icon" && op === "edit") {
          if (fileImg !== null) {
            // console.log("Icon edit!");
            array[temp].icon = "./appicons/" + nome;
          }
          if (temp2 !== "") {
            array[temp].title = temp2;
          }
          if (temp3 !== "") {
            array[temp].link = temp3;
          }
          array[temp].video = temp4;
          array[temp].cat = temp5;
          // if (temp6 !== "") {
          array[temp].descr = temp6;
          // }
          if (inPos !== "") {
            let index = 0;
            if (tempCatTitle !== "Root") {
              index = this.state.catAppItems[inPos].id;
            } else {
              index = this.state.rootAppItems[inPos].id;
            }
            // console.log("Index: ", index);
            // console.log("temp: ", temp);
            appNewItem.icon = array[temp].icon;
            appNewItem.title = array[temp].title;
            appNewItem.link = array[temp].link;
            appNewItem.descr = array[temp].descr;
            appNewItem.video = array[temp].video;
            appNewItem.cat = array[temp].cat;
            appNewItem.id = index;
            if (index > temp) {
              array = this.addAfter(array, index + 1, appNewItem);
              for (let i = (index + 1); i < array.length; i++) {
                (array[i].id)++;
              }

              tempIcon = "";
              array.splice(temp, 1);
              for (let i = (temp); i < array.length; i++) {
                (array[i].id)--;
              }
              var noAddArray = [...array];
              this.setState({ appItems: array });
              spData.appItems = noAddArray;
            } else {
              array = this.addAfter(array, index, appNewItem);
              for (let i = (index + 1); i < array.length; i++) {
                (array[i].id)++;
              }
              tempIcon = "";
              array.splice(temp + 1, 1);
              for (let i = (temp + 1); i < array.length; i++) {
                (array[i].id)--;
              }
              var noAddArray = [...array];
              this.setState({ appItems: array });
              spData.appItems = noAddArray;
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
          noDescr = false;
          tempID = 0;
          appNewItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0
          };
          this.setState({ upShow: false });
          this.setState({ alShow: true });
          this.setState({ alErrShow: false });
          // console.log("Edit Icon correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
          // document.getElementById('clearappswitchpos').value = "";
          // document.getElementById('clearappeditdescr').value = "";
        } else if (url === "icon" && op === "add") {
          appNewItem.icon = "./appicons/" + nome;
          appNewItem.title = temp2;
          appNewItem.link = temp3;
          appNewItem.descr = temp6;
          appNewItem.video = temp4;
          appNewItem.cat = temp5;
          let index = 0;
          // console.log("Insert pos=", (inPos));
          if (tempCatTitle !== "Root") {
            index = this.state.catAppItems[inPos].id;
          } else {
            index = this.state.rootAppItems[inPos].id;
          }
          appNewItem.id = index;
          tempIcon = "";
          arrayAdd = this.addAfter(array, index, appNewItem);
          for (let i = (index + 1); i < arrayAdd.length; i++) {
            (arrayAdd[i].id)++;
          }
          this.setState({ appItems: arrayAdd });
          spData.appItems = arrayAdd;
          arrayAdd = [];
          arrayLength++;
          inPos = "";
          temp = "";
          temp2 = "";
          temp3 = "";
          temp4 = "";
          temp5 = tempCatTitle;
          temp6 = "";
          tempID = 0;
          appNewItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0
          };
          // this.setState({ disFieldAA: true });
          this.setState({ upShow: false });
          this.setState({ alShow: true });
          this.setState({ alErrShow: false });
          // console.log("Add Icon correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
        } else if (url === "icon" && op === "addlast") {
          appNewItem.icon = "./appicons/" + nome;
          appNewItem.title = temp2;
          appNewItem.link = temp3;
          appNewItem.descr = temp6;
          appNewItem.video = temp4;
          appNewItem.cat = temp5;
          appNewItem.id = arrayLength;
          inPos = arrayLength;
          console.log("Pos: ", inPos);
          tempIcon = "";
          arrayAdd = this.addAfter(array, inPos, appNewItem);
          this.setState({ appItems: arrayAdd });
          spData.appItems = arrayAdd;
          // console.log("Array: ", array);
          // console.log("ArrayAdd: ", arrayAdd);
          // console.log("CatItems: ", spData.appItems);
          arrayAdd = [];
          arrayLength = arrayLength + 1;
          inPos = "";
          temp = "";
          temp2 = "";
          temp3 = "";
          temp4 = "";
          // this.setState({
          //   catSel: tempCatTitle
          // });
          temp5 = tempCatTitle;
          temp6 = "";
          tempID = 0;
          appNewItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "video": false,
            "cat": "",
            "id": 0
          };
          // this.setState({ disFieldAA: true });
          this.setState({ upShow: false });
          this.setState({ alShow: true });
          this.setState({ alErrShow: false });
          // console.log("Add Last Icon correctly Uploaded!");
          // this.setState({
          //   activityChanged: false
          // });
          // spData.appItems.pop();
          this.saveFile(spData, "./api/img-upload.php", "config");
          // this.setState(previousState => ({
          //   appItems: [...previousState.appItems, spData.appAdd]
          // }));
        } else if (url === "cat" && op === "edit") {
          if (fileImg !== null) {
            // console.log("Cat edit!");
            array[currPos].icon = "./appicons/" + nome;
          }
          // console.log("temp2: ", temp2);
          if (temp2 !== "") {
            array[currPos].title = temp2;
            this.state.appItems.forEach(element => {
              if (element.cat === tempCatTitle) {
                element.cat = temp2;
              }
            })
          }
          if (temp !== "") {
            console.log("CurrPos: ", currPos);
            console.log("InPos: ", inPos);
            catNewItem.icon = array[currPos].icon;
            catNewItem.title = array[currPos].title;
            if (inPos > currPos) {
              arrayAdd = this.addAfter(array, inPos + 1, catNewItem);
              tempIcon = "";
              arrayAdd.splice(currPos, 1);
              this.setState({ catItems: arrayAdd });
              spData.catItems = arrayAdd;
            } else {
              arrayAdd = this.addAfter(array, inPos, catNewItem);
              tempIcon = "";
              arrayAdd.splice(currPos + 1, 1);
              this.setState({ catItems: arrayAdd });
              spData.catItems = arrayAdd;
            }
          }
          arrayAdd = [];
          temp2 = "";
          temp = "";
          catNewItem = {
            "title": "",
            "icon": ""
          };
          this.setState({ upShow: false });
          this.setState({ alShow: true });
          this.setState({ alErrShow: false });
          // console.log("Edit Cat correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
        } else if (url === "cat" && op === "add") {
          console.log("CatAdd in Pos: ", inPos);
          catNewItem.icon = "./appicons/" + nome;
          catNewItem.title = temp2;
          tempIcon = "";
          arrayAdd = this.addAfter(array, inPos, catNewItem);
          // console.log("Insert pos=", (inPos));
          this.setState({ catItems: arrayAdd });
          spData.catItems = arrayAdd;
          arrayAdd = [];
          temp2 = "";
          temp = "";
          catNewItem = {
            "title": "",
            "icon": ""
          };
          this.setState({ upShow: false });
          this.setState({ alShow: true });
          this.setState({ alErrShow: false });
          // console.log("Add Icon correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
        } else if (url === "cat" && op === "addlast") {
          console.log("CatAddLast...");
          catNewItem.icon = "./appicons/" + nome;
          catNewItem.title = temp2;
          console.log("CatNewItem: ", catNewItem);
          inPos = arrayLength;
          console.log("Pos: ", inPos);
          tempIcon = "";
          arrayAdd = this.addAfter(array, inPos, catNewItem);
          this.setState({ catItems: arrayAdd });
          spData.catItems = arrayAdd;
          // console.log("Array: ", array);
          // console.log("ArrayAdd: ", arrayAdd);
          // console.log("CatItems: ", spData.catItems);
          arrayAdd = [];
          temp2 = "";
          catNewItem = {
            "title": "",
            "icon": ""
          };
          this.setState({ upShow: false });
          this.setState({ alShow: true });
          this.setState({ alErrShow: false });
          // console.log("Add Last Icon correctly Uploaded!");
          this.saveFile(spData, "./api/img-upload.php", "config");
        } else if (url === "back" && op === "edit") {
          spData.backgroundImage = "./img/" + nome;
          spData.backgroundColor = this.hexToRgb(tempColor) + ", 1)";
          this.setState({
            backStyle: {
              backgroundImage: "linear-gradient(rgba(255,255,255," + (1 - spData.backgroundOpacity).toString() + "), rgba(255,255,255," + (1 - spData.backgroundOpacity).toString() + ")), url(" + spData.backgroundImage + ")",
              // backgroundImage: "url(" + spData.backgroundImage + ")",
              backgroundColor: spData.backgroundColor,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: "fixed"
              // opacity: spData.backgroundOpacity
            }
          });
          this.setState({ upShow: false });
          this.setState({ alShow: true });
          this.setState({ alErrShow: false });
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
              // opacity: spData.catOpacity
            }
          });
          this.setState({ upShow: false });
          this.setState({ alShow: true });
          this.setState({ alErrShow: false });
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
    // spData.headColor = this.hexToRgb(tempColor) + ", 0.95)";
    spData.headTextColor = this.hexToRgb(tempTextColor) + ", 1)";
    spData.headColW = tempColW;
    // console.log("Colore: " + spData.headColor);
    if (blockHide !== "none") {
      spData.titleShow = blockHide;
    }
    blockHide = "none";
    temp = "";
    this.setState({ alShow: true });
    this.setState({ alErrShow: false });
    this.saveFile(spData, "./api/img-upload.php", "config");

  }

  appSearchReset = () => {
    this.setState({ alShow: false });
    this.setState({ alErrShow: false });
    document.getElementById('searchForm').reset();
    this.setState({ resAppItems: [] });
    temp = "";
  }

  appSearch = () => {
    if (temp !== "") {
      let count = 0;
      for (let i = 0; i < this.state.appItems.length; i++) {
        if (this.state.appItems[i].title.toLowerCase().includes(temp.toLowerCase()) ||
          this.state.appItems[i].descr.toLowerCase().includes(temp.toLowerCase())) {
          appNewItem.icon = this.state.appItems[i].icon;
          appNewItem.title = this.state.appItems[i].title;
          appNewItem.link = this.state.appItems[i].link;
          appNewItem.descr = this.state.appItems[i].descr;
          appNewItem.video = this.state.appItems[i].video;
          appNewItem.cat = this.state.appItems[i].cat;
          appNewItem.id = this.state.appItems[i].id;
          arrayAdd = this.addAfter(arrayAdd, count, appNewItem);
          count++;
          appNewItem = {
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
      this.setState({ resAppItems: arrayAdd });
      arrayAdd = [];
      appNewItem = {
        "title": "",
        "link": "",
        "icon": "",
        "descr": "",
        "video": false,
        "cat": "",
        "id": 0
      };
      this.setState({ alShow: true });
      this.setState({ alErrShow: false });
    } else {
      this.setState({ alErrShow: true });
      this.setState({ alShow: false });
    }
  }

  appCatSearch = (cat, items) => {
    if (items.length > 0) {
      // console.log("AppCatSearch...", items.length);
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        // console.log("Analyzing App Pos: ", i, " - Title: ", items[i].title);
        if (items[i].cat.toLowerCase().includes(cat.toLowerCase())) {
          // console.log("App Pos: ", i, " - Title: ", items[i].title, " is in Cat: ", cat, " CatPos: ", count);
          appNewItem.icon = items[i].icon;
          appNewItem.title = items[i].title;
          appNewItem.link = items[i].link;
          appNewItem.descr = items[i].descr;
          appNewItem.video = items[i].video;
          appNewItem.cat = items[i].cat;
          appNewItem.id = items[i].id;
          // console.log("App Pos: ", count, " - Title: ", items[i].title);
          arrayAdd = this.addAfter(arrayAdd, count, appNewItem);
          // console.log("ArrayAdd: ", arrayAdd);
          count++;
          appNewItem = {
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
        this.setState({ rootAppItems: arrayAdd });
      } else {
        this.setState({ catAppItems: arrayAdd });
      }
      arrayAdd = [];
      appNewItem = {
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
    spData.clockOpacity = parseFloat(tempOpacity.replace(/,/g, "."))/* .toFixed(1) */;
    // spData.clockColor = this.hexToRgb(tempColor) + ", 0.7)";
    spData.clockTextColor = this.hexToRgb(tempTextColor) + ", 1)";
    spData.clockColW = tempColW;
    if (blockHide !== "none") {
      spData.clockShow = blockHide;
    }
    blockHide = "none";
    this.setState({ alShow: true });
    this.setState({ alErrShow: false });
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  saveMenu = () => {
    // console.log(tempColor);
    spData.menuColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
    spData.menuOpacity = parseFloat(tempOpacity.replace(/,/g, "."))/* .toFixed(1) */;
    // spData.menuOpacity = parseInt(tempOpacity);
    if (blockHide !== "none") {
      spData.menuShow = blockHide;
    }
    this.setState({ alShow: true });
    this.setState({ alErrShow: false });
    this.saveFile(spData, "./api/img-upload.php", "config");
    blockHide = "none";
  }

  saveInfo = () => {
    if (temp !== "") {
      spData.footTitle = temp;
    }
    if (spData.noFootTitle === true) {
      spData.footTitle = "";
    }
    if (temp2 !== "") {
      spData.footSubtitle = temp2;
    }
    if (spData.noFootSubtitle === true) {
      spData.footSubtitle = "";
    }
    if (temp3 !== "") {
      spData.footSubtitle2 = temp3;
    }
    if (spData.noFootSubtitle2 === true) {
      spData.footSubtitle2 = "";
    }
    spData.footInfoColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
    spData.footInfoOpacity = parseFloat(tempOpacity.replace(/,/g, "."))/* .toFixed(1) */;
    // spData.footInfoColor = this.hexToRgb(tempColor) + ", 0.7)";
    spData.footInfoTextColor = this.hexToRgb(tempTextColor) + ", 1)";
    spData.footInfoColW = tempColW;
    if (blockHide !== "none") {
      spData.infoShow = blockHide;
    }
    blockHide = "none";
    temp = "";
    temp2 = "";
    temp3 = "";
    this.setState({ alShow: true });
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  saveCredit = () => {
    if (temp !== "") {
      spData.footCreditiTitle = temp;
    }
    if (disable1 === true) {
      spData.noFootCreditiTitle = true;
      spData.footCreditiTitle = "";
    }
    if (temp2 !== "") {
      spData.footCreditiSubtitle = temp2;
    }
    if (disable2 === true) {
      spData.noFootCreditiSubtitle = true;
      spData.footCreditiSubtitle = "";
    }
    if (temp3 !== "") {
      spData.footCreditiSubtitle2 = temp3;
    }
    if (disable3 === true) {
      spData.noFootCreditiSubtitle2 = true;
      spData.footCreditiSubtitle2 = "";
    }
    spData.footCreditColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
    spData.footCreditOpacity = parseFloat(tempOpacity.replace(/,/g, "."))/* .toFixed(1) */;
    // spData.footCreditColor = this.hexToRgb(tempColor) + ", 0.7)";
    spData.footCreditTextColor = this.hexToRgb(tempTextColor) + ", 1)";
    spData.footCreditColW = tempColW;
    if (blockHide !== "none") {
      spData.creditShow = blockHide;
    }
    blockHide = "none";
    temp = "";
    temp2 = "";
    temp3 = "";
    disable1 = false;
    disable2 = false;
    disable3 = false;
    this.setState({ alShow: true });
    this.saveFile(spData, "./api/img-upload.php", "config");
  }

  applyAppEdit = () => {
    array = [...this.state.appItems];
    console.log("FileImg: ", fileImg);
    console.log("cgPos: ", cgPos);
    console.log("Temp2: ", temp2);
    console.log("Temp3: ", temp3);
    console.log("Temp4: ", temp4, " ", tempAppVideo);
    console.log("Temp5: ", temp5, " ", tempCatTitle);
    console.log("Temp6: ", temp6, " ", tempAppDescr);
    if (noDescr === true) {
      temp6 = "";
    }
    if (fileImg !== null || temp2 !== "" || temp3 !== "" || temp4 !== tempAppVideo || temp5 !== tempCatTitle || temp6 !== tempAppDescr || cgPos !== "") {
      if (cgPos !== "") {
        inPos = parseInt(cgPos) - 1;
        console.log("Edit inPos: ", inPos, " currPos: ", currPos);
        if (inPos < arrayLength && inPos >= 0 && inPos !== currPos) {
          this.saveImgFile(fileImg, "icon", "edit");
        } else {
          this.setState({ alShow: false });
          this.setState({ alErrShow: true });
        }
      } else {
        // console.log("cgPos === \"\"");
        this.saveImgFile(fileImg, "icon", "edit");
      }
    } else {
      // console.log("fileImg - temp2 - temp3 are Null!!!");
      this.setState({ alShow: false });
      this.setState({ alErrShow: true });
    }
  }

  applyAppAdd = () => {
    array = [...this.state.appItems];
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
        console.log("InPos: ", inPos);
        if (inPos < arrayLength) {
          this.saveImgFile(fileImg, "icon", "add");
        } else {
          this.setState({ alShow: false });
          this.setState({ alErrShow: true });
        }
      } else {
        this.saveImgFile(fileImg, "icon", "addlast");
      }
    } else {
      this.setState({ alShow: false });
      this.setState({ alErrShow: true });
    }
  }

  applyAppDel = () => {
    var array = [...this.state.appItems];
    var index = temp;
    console.log("AppDel ID: ", temp);
    if (index !== -1) {
      fetchDelPHP(tempIcon, "./api/img-upload.php", "icon");
      tempIcon = "";
      array.splice(index, 1);
      for (let i = (index); i < array.length; i++) {
        (array[i].id)--;
      }
      var noAddArray = [...array];
      this.setState({ appItems: array });
      spData.appItems = noAddArray;
    }
    temp = "";
    temp2 = "";
    temp3 = "";
    this.setState({ alShow: true });
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
          console.log("CAT Title Duplicated!!!");
          dup = true;
        }
      }
      if (temp !== "") {
        inPos = parseInt(temp) - 1;
        // console.log("InPos: ", inPos);
        if (inPos < arrayLength && inPos >= 0 && inPos !== currPos && !dup) {
          this.saveImgFile(fileImg, "cat", "edit");
        } else {
          this.setState({ alShow: false });
          this.setState({ alErrShow: true });
        }
      } else {
        if (!dup) {
          this.saveImgFile(fileImg, "cat", "edit");
        } else {
          this.setState({ alShow: false });
          this.setState({ alErrShow: true });
        }
      }
    } else {
      // console.log("fileImg - temp2 - temp are \"\"");
      this.setState({ alShow: false });
      this.setState({ alErrShow: true });
    }
  }

  applyCatAdd = () => {
    array = [...this.state.catItems];
    // console.log("Image: ", fileImg);
    // console.log("Name: ", temp2);
    // console.log("Link: ", temp3);
    // console.log("Pos: ", temp);
    tempIcon = "";
    if (fileImg !== null && temp2 !== "") {
      let dup = false;
      for (let i = 0; i < arrayLength; i++) {
        if (array[i].title.toLowerCase() === temp2.toLowerCase()) {
          console.log("CAT Title Duplicated!!!");
          dup = true;
        }
      }
      if (temp !== "") {
        inPos = parseInt(temp) - 1;
        // console.log("InPos: ", inPos);
        if (inPos < arrayLength && !dup) {
          this.saveImgFile(fileImg, "cat", "add");
        } else {
          this.setState({ alShow: false });
          this.setState({ alErrShow: true });
        }
      } else {
        if (!dup) {
          this.saveImgFile(fileImg, "cat", "addlast");
        } else {
          this.setState({ alShow: false });
          this.setState({ alErrShow: true });
        }
      }
    } else {
      this.setState({ alShow: false });
      this.setState({ alErrShow: true });
    }
  }

  applyCatDel = () => {
    var array = [...this.state.catItems];
    var index = currPos;
    // console.log("Index: ", temp);
    if (index !== -1) {
      fetchDelPHP(tempIcon, "./api/img-upload.php", "icon");
      tempIcon = "";
      array.splice(index, 1);
      var noAddArray = [...array];
      this.setState({ catItems: array });
      spData.catItems = noAddArray;
    }
    this.state.appItems.forEach(element => {
      if (element.cat === tempCatTitle) {
        element.cat = "Root";
      }
    })
    currPos = "";
    temp2 = "";
    temp3 = "";
    this.setState({ alShow: true });
    this.saveFile(spData, "./api/img-upload.php", "config");
    this.setState({
      activityChanged: true
    });
  }

  saveBack = () => {
    // console.log("NoImage:", spData.noBackImage);
    // console.log("disField:", this.state.disField);
    if (fileImg !== null) {
      tempIcon = spData.backgroundImage;
      this.saveImgFile(fileImg, "back", "edit");
    } else {
      spData.backgroundColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.backgroundOpacity = parseFloat(tempOpacity.replace(/,/g, "."))/* .toFixed(1) */;
      // spData.backgroundColor = this.hexToRgb(tempColor) + ", 1)";
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
            // opacity: spData.backgroundOpacity
          }
        });
      } else {
        this.setState({
          backStyle: {
            backgroundImage: "linear-gradient(rgba(255,255,255," + (1 - spData.backgroundOpacity).toString() + "), rgba(255,255,255," + (1 - spData.backgroundOpacity).toString() + ")), url(" + spData.backgroundImage + ")",
            // backgroundImage: "url(" + spData.backgroundImage + ")",
            backgroundColor: spData.backgroundColor,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed"
            // opacity: spData.backgroundOpacity
          }
        });
      }
      this.setState({ upShow: false });
      this.setState({ alShow: true });
      this.setState({ alErrShow: false });
      this.saveFile(spData, "./api/img-upload.php", "config");
    }

    if (fileCatImg !== null) {
      tempCatIcon = spData.catImage;
      this.saveImgFile(fileCatImg, "backcat", "edit");
    } else {
      spData.catColor = this.hexToRgb(tempCatColor) + ", " + tempOpacity1 + ")";
      spData.catOpacity = parseFloat(tempOpacity1.replace(/,/g, "."))/* .toFixed(1) */;
      // spData.catColor = this.hexToRgb(tempCatColor) + ", 1)";
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
            // opacity: spData.catOpacity
          }
        });
      } else {
        this.setState({
          catStyle: {
            backgroundImage: "linear-gradient(rgba(255,255,255," + (1 - spData.catOpacity).toString() + "), rgba(255,255,255," + (1 - spData.catOpacity).toString() + ")), url(" + spData.catImage + ")",
            // backgroundImage: "url(" + spData.catImage + ")",
            backgroundColor: spData.catColor,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: "fixed"
            // opacity: spData.catOpacity
          }
        });
      }
      this.setState({ upShow: false });
      this.setState({ alShow: true });
      this.setState({ alErrShow: false });
      this.saveFile(spData, "./api/img-upload.php", "config");
    }
  }

  saveLogo = () => {
    if (fileImg !== null) {
      tempIcon = spData.LogoIcon;
      this.saveImgFile(fileImg, "logo", "edit");
      spData.logoColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.logoOpacity = parseFloat(tempOpacity.replace(/,/g, "."))/* .toFixed(1) */;
      // spData.logoColor = this.hexToRgb(tempColor) + ", 0.7)";
      spData.logoColW = tempColW;
      if (blockHide !== "none") {
        spData.logoShow = blockHide;
      }
      blockHide = "none";
    } else {
      spData.logoColor = this.hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.logoOpacity = parseFloat(tempOpacity.replace(/,/g, "."))/* .toFixed(1) */;
      // spData.logoColor = this.hexToRgb(tempColor) + ", 0.7)";
      spData.logoColW = tempColW;
      if (blockHide !== "none") {
        spData.logoShow = blockHide;
      }
      blockHide = "none";
      this.setState({ upShow: false });
      this.setState({ alShow: true });
      this.setState({ alErrShow: false });
      this.saveFile(spData, "./api/img-upload.php", "config");
      this.hideModal("logo");
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
    // tempUser = "";
    // tempPsw = "";
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
              this.setState({ alShow: true });
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
          this.setState({ alShow: true });
          this.setState({ alErrShow: false });
        })
        .catch(err => {
          console.log(err)
        })

    } else {
      this.setState({ alShow: false });
      this.setState({ alErrShow: true });
    }
  }

  showModal(id) {
    switch (id) {
      case "title":
        temp = spData.headTitle;
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
        tempColW = spData.footCreditColW;
        switch (spData.footCreditColW) {
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
        tempColor = this.rgbToHex(spData.footCreditColor);
        tempOpacity = spData.footCreditOpacity.toString();
        tempTextColor = this.rgbToHex(spData.footCreditTextColor);
        this.setState({ creditDiaShow: true });
        break;
      case "appEdit":
        console.log("CurrPos ", currPos);
        this.setState({ appEditDiaShow: true });
        break;
      case "appDel":
        this.setState({ appDelDiaShow: true });
        break;
      case "appAdd":
        this.setState({ appAddDiaShow: true });
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
      case "appOrCatAdd":
        this.setState({ aocDiaShow: true });
        break;
      case "appVideo":
        this.setState({ appVideoDiaShow: true });
        break;
      case "appDescr":
        this.setState({ appDescrDiaShow: true });
        break;
      case "exCrs":
        this.setState({ exCrsDiaShow: true });
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
        this.setState({ infoDiaShow: false });
        document.getElementById('infoForm').reset();
        break;
      case "credit":
        this.setState({
          disFieldC: spData.noFootCreditiTitle
        });
        this.setState({
          disFieldC2: spData.noFootCreditiSubtitle
        });
        this.setState({
          disFieldC3: spData.noFootCreditiSubtitle2
        });

        this.setState({ creditDiaShow: false });
        document.getElementById('creditForm').reset();
        break;
      case "appedit":
        this.setState({ appEditDiaShow: false });
        temp = "";
        document.getElementById('appEditForm').reset();
        break;
      case "appdel":
        this.setState({ appDelDiaShow: false });
        break;
      case "appadd":
        this.setState({ appAddDiaShow: false });
        temp5 = tempCatTitle;
        this.setState({ disFieldAA: true });
        document.getElementById('appAddForm').reset();
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
        this.setState({ catAppItems: [] });
        console.log("Current Cat: ", this.state.catSel);
        break;
      case "video":
        this.setState({ appVideoDiaShow: false });
        this.stopVideos();
        break;
      case "appdescr":
        this.setState({ appDescrDiaShow: false });
        break;
      case "apporcat":
        this.setState({ aocDiaShow: false });
        break;
      case "excrs":
        this.setState({ exCrsDiaShow: false });
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
        this.setState({ resAppItems: [] });
        this.setState({ alShow: false });
        this.setState({ alErrShow: false });
        temp = "";
    }
    this.setState({ alShow: false });
    this.setState({ alErrShow: false });
    tempColor = "";
    tempTextColor = "";
    tempColW = "";
    temp3 = "";
    this.setState({
      activityChanged: false
    });
  };

  hideAlert = () => {
    this.setState({ alShow: false });
  };

  appsButtonShow(id) {
    if (this.state.appsBtnShow !== id) {
      this.setState({
        appsBtnShow: id
      })
    } else {
      this.setState({
        appsBtnShow: false
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
      this.setState({ creditShow: true });
    } else {
      this.setState({
        mainBtn: false
      })
      this.setState({ menuShow: spData.menuShow });
      this.setState({ titleShow: spData.titleShow });
      this.setState({ logoShow: spData.logoShow });
      this.setState({ clockShow: spData.clockShow });
      this.setState({ infoShow: spData.infoShow });
      this.setState({ creditShow: spData.creditShow });
      login = false;
      var array = [...this.state.appItems];
      if (this.state.appsBtnShow !== false) {
        this.setState({
          appsBtnShow: false
        })
      }
      spData.appItems = array;
      window.location.reload();
    }
  }

  headLogoEdit(id) {
    this.showModal("logo");
  }

  headTitleEdit(id) {
    this.showModal("title");
    // console.log("Title Edit Clicked:", id);
  }

  headMenuEdit(id) {
    this.showModal("menu");
  }

  backEdit(id) {
    this.showModal("back");
    // console.log("Background Edit Clicked:");
  }

  clockEdit(id) {
    this.showModal("clock");
    // console.log("Clock Edit Clicked:");
  }

  footCreditsEdit(id) {
    this.showModal("credit");
    // console.log("Credits Edit Clicked:", id);
  }

  footInfoEdit(id) {
    this.showModal("info");
    // console.log("Info Edit Clicked:", id);
  }

  appOrCatItem() {
    if (temp5 !== "Root") {
      this.appAddItem();
    } else {
      this.showModal("appOrCatAdd");
    }
  }

  catEditDel(op, pos) {
    currPos = pos;
    console.log(op, " for ", pos);
    array = [...this.state.catItems];
    arrayLength = (array.length);
    tempCatTitle = array[pos].title;
    tempIcon = array[pos].icon;
    console.log("Cat name: ", tempCatTitle);
    document.getElementById('clearcatswitchpos').value = "";
    if (op === "CatEdit") {
      this.showModal("catEdit");
    } else {
      this.showModal("catDel");
    }
  }

  catAddItem() {
    this.hideModal("apporcat");
    array = [...this.state.catItems];
    arrayLength = (array.length);
    temp4 = false;
    document.getElementById('clearcatpos').value = "";
    document.getElementById('clearcattitle').value = "";
    this.showModal("catAdd");
    // console.log("CATAdding IT!");
  }

  appAddItem(id, pos) {
    this.hideModal("apporcat");
    noDescr = true;
    array = [...this.state.appItems];
    arrayLength = (array.length);
    tempAppVideo = false;
    temp4 = false;
    console.log("AppAdd Temp5: ", temp5);
    this.setState({
      catSel: temp5
    })
    tempCatTitle = temp5;
    document.getElementById('clearapppos').value = "";
    // document.getElementById('clearappswitchpos').value = "";
    document.getElementById('clearappdescr').value = "";
    document.getElementById('clearapptitle').value = "";
    document.getElementById('clearapplink').value = "";
    this.showModal("appAdd");
    // console.log("APPAdding IT!");
  }

  appEditDel(op, id, pos) {
    temp = id;
    currPos = pos;
    console.log(op, " for ", id, "pos ", currPos);
    array = [...this.state.appItems];
    arrayLength = (array.length);
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        tempAppTitle = array[i].title;
        console.log("App name: ", tempAppTitle);
        tempAppLink = array[i].link;
        tempAppDescr = array[i].descr;
        if (tempAppDescr === "") {
          noDescr = true;
          this.setState({
            disFieldAE: true
          });
        } else {
          noDescr = false;
          this.setState({
            disFieldAE: false
          });
        }
        console.log(" App descr.: ", tempAppDescr);
        tempAppVideo = array[i].video;
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
    document.getElementById('clearappswitchpos').value = "";
    // document.getElementById('clearappeditdescr').value = "";
    if (op === "AppEdit") {
      this.showModal("appEdit");
    } else {
      this.showModal("appDel");
    }
  }

  appDescr(name, id) {
    temp3 = id;
    array = [...this.state.appItems];
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        tempAppDescr = array[i].descr;
        tempAppTitle = array[i].title;
      }
    }
    // console.log(id, " for ", pos);
    this.showModal("appDescr");
  }

  appVideo(name, id) {
    temp3 = id;
    array = [...this.state.appItems];
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        tempAppTitle = array[i].title;
        this.setState({
          videoLink: array[i].link
        })
      }
    }
    // console.log(id, " for ", pos);
    this.showModal("appVideo");
  }

  catCont(id, pos) {
    array = [...this.state.catItems];
    // console.log("Cat Array: ", array);
    tempCatTitle = array[pos].title;
    temp5 = tempCatTitle;
    console.log("Current Cat In: ", tempCatTitle);
    this.appCatSearch(array[pos].title, this.state.appItems);
    this.showModal("cat");
  }

  resAppVideo(name, id) {
    temp3 = id;
    array = [...this.state.resAppItems];
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        tempAppTitle = array[i].title;
        this.setState({
          videoLink: array[i].link
        })
      }
    }
    // console.log(id, " for ", pos);
    this.showModal("appVideo");
  }

  catAppVideo(name, id) {
    temp3 = id;
    array = [...this.state.catAppItems];
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        tempAppTitle = array[i].title;
        this.setState({
          videoLink: array[i].link
        })
      }
    }
    // console.log(id, " for ", pos);
    this.showModal("appVideo");
  }

  exCrsShow() {
    this.showModal("exCrs");
  }

  setCat(catName, e) {
    e.preventDefault();
    temp5 = catName;
    this.setState({
      catSel: catName
    })
    console.log("CatName: ", catName);
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
    const { disField: disField } = this.state;
    const { disField2: disField2 } = this.state;
    const { disField3: disField3 } = this.state;
    const { disFieldC: disFieldC } = this.state;
    const { disFieldC2: disFieldC2 } = this.state;
    const { disFieldC3: disFieldC3 } = this.state;
    const { disFieldAA: disFieldAA } = this.state;
    const { disFieldAE: disFieldAE } = this.state;
    let buttons = "";

    let menuButtons = (
      <>
        <Dropdown search={this.search} exCrsShow={this.exCrsShow} />
      </>
    );

    let catMenuButtons = (
      <DropdownCat items={this.state.catItems} catName={this.state.catSel} setCat={this.setCat} />
    )

    let head = (
      <div className="row text-center mt-2 mb-2">
        <div className="col">
          <div className="row">
            <Menu menuShow={this.state.menuShow} mainBtn={this.state.mainBtn}>
              {/* MENU */}
              {menuButtons}
              <EditMenu editMenuShow={this.state.mainBtn} hidden={spData.menuShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.headMenuEdit("MenuEdit")}>
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
                <button className="col flexbutton solidgreen m-1" onClick={() => this.headTitleEdit("TitleEdit")}>
                  Edit Title
                </button>
              </EditTitolo>
            </Titolo>
            <Logo logoShow={this.state.logoShow} mainBtn={this.state.mainBtn}>
              {/* LOGO */}
              <LogoImg />
              <EditLogo editLogoShow={this.state.mainBtn} hidden={spData.logoShow}>
                <button className="col latowhite flexbutton solidgreen m-1" onClick={() => this.headLogoEdit("LogoEdit")}>
                  Edit Logo
                </button>
              </EditLogo>
            </Logo>
            <Clock clockShow={this.state.clockShow} mainBtn={this.state.mainBtn}>
              {/* OROLOGIO */}
              <Orologio />
              <EditClock editClockShow={this.state.mainBtn} hidden={spData.clockShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.clockEdit()}>
                  Edit Clock
                </button>
              </EditClock>
            </Clock>
            {/* SETTINGS */}
            <Set clockShow={this.state.clockShow} mainBtn={this.state.mainBtn}>
              <SettingsGear handleShowButtons={this.loginSession} />
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
              onClick={() => this.appsButtonShow("ShowAppBtn")}>
              App Settings
            </button>
            <button className="col button solidbrick m-1"
              onClick={() => this.backEdit()}>
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
                <p className="medfont">{spData.footTitle}</p>
                <p className="smallfont">{spData.footSubtitle}</p>
                <p className="smallfont">{spData.footSubtitle2}</p>
              </div>
              <EditInfo editInfoShow={this.state.mainBtn} hidden={spData.infoShow}>
                <button className="col flexbutton solidgreen m-1" onClick={() => this.footInfoEdit("InfoEdit")}>
                  Edit Info
                </button>
              </EditInfo>
            </Info>
            {/* CREDITI */}
            <Crediti creditShow={this.state.creditShow} infoShow={this.state.infoShow} mainBtn={this.state.mainBtn}>
              <div>
                <p className="smallfont">{spData.footCreditiTitle}</p>
                <p className="smallfont"><i>{spData.footCreditiSubtitle}</i></p>
                <p className="verysmallfont">{spData.footCreditiSubtitle2}</p>
              </div>
              <EditCrediti editCreditShow={this.state.mainBtn} hidden={spData.creditShow}>
                <button className="col flexbutton brick m-1" onClick={() => this.footCreditsEdit("CreditsEdit")}>
                  Edit Credits
                </button>
              </EditCrediti>
            </Crediti>
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

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
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

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                        <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Error! Fill in at least one field.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Errore>
                      </form>
                    </div>
                  </div>
                </LoginEditDialog>
                <MenuDialog menuDiaShow={this.state.menuDiaShow} handleClose={() => this.hideModal("menu")} handleSave={this.saveMenu}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Menu wallpaper change</h5>
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

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                        <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Error! Enter at least one character.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Errore>
                      </form>
                    </div>
                  </div>
                </MenuDialog>
                <TitleDialog titleDiaShow={this.state.titleDiaShow} handleClose={() => this.hideModal("title")} handleSave={this.saveTitle}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Change site name</h5>
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

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                        <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Error! Enter at least one character.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Errore>
                      </form>
                    </div>
                  </div>
                </TitleDialog>
                <ClockDialog clockDiaShow={this.state.clockDiaShow} handleClose={() => this.hideModal("clock")} handleSave={this.saveClock}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Clock wallpaper change</h5>
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

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                        <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Error! Enter at least one character.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Errore>
                      </form>
                    </div>
                  </div>
                </ClockDialog>
                <LogoDialog logoDiaShow={this.state.logoDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("logo")} handleUpload={this.saveLogo}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Change logo</h5>
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
                            {/* <div className="col-1"></div>
                        <div className="col">
                          <div className="row">
                          </div>
                        </div> */}
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
                            {/* <div className="col-1"></div>
                        <div className="col">
                          <div className="row">
                          </div>
                        </div> */}
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

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                        <Upload upShow={this.state.upShow} handleClose={this.hideAlert}>
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
                      <h5 className="modal-title" >Edit site info</h5>
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
                                  <input type="text" disabled={disField} className="form-control border-0" defaultValue={spData.footTitle} onChange={e => temp = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label className="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootTitle} onClick={e => {
                                      if (this.state.disField === false) {
                                        this.setState({
                                          disField: true
                                        });
                                        spData.noFootTitle = true;
                                      } else {
                                        this.setState({
                                          disField: false
                                        });
                                        spData.noFootTitle = false;
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
                                  <input type="text" disabled={disField2} className="form-control border-0" defaultValue={spData.footSubtitle} onChange={e => temp2 = e.target.value} /*placeholder={spData.footSubtitle}*/ />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootSubtitle} onClick={e => {
                                      if (this.state.disField2 === false) {
                                        this.setState({
                                          disField2: true
                                        });
                                        spData.noFootSubtitle = true;
                                      } else {
                                        this.setState({
                                          disField2: false
                                        });
                                        spData.noFootSubtitle = false;
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
                                  <input type="text" disabled={disField3} className="form-control border-0" defaultValue={spData.footSubtitle2} onChange={e => temp3 = e.target.value} /*placeholder={spData.footSubtitle2}*/ />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootSubtitle2} onClick={e => {
                                      if (this.state.disField3 === false) {
                                        this.setState({
                                          disField3: true
                                        });
                                        spData.noFootSubtitle2 = true;
                                      } else {
                                        this.setState({
                                          disField3: false
                                        });
                                        spData.noFootSubtitle2 = false;
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
                            {/* <div className="col-1"></div>
                        <div className="col">
                          <div className="row">
                          </div>
                        </div> */}
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

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                      </form>
                    </div>
                  </div>
                </InfoDialog>
                <CreditDialog creditDiaShow={this.state.creditDiaShow} handleClose={() => this.hideModal("credit")} handleSave={this.saveCredit}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit site credits</h5>
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
                                  <input type="text" disabled={disFieldC} className="form-control border-0" defaultValue={spData.footCreditiTitle} onChange={e => temp = e.target.value} /*placeholder={spData.footCreditiTitle}*/ />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootCreditiTitle} onClick={e => {
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
                                  <input type="text" disabled={disFieldC2} className="form-control border-0" defaultValue={spData.footCreditiSubtitle} onChange={e => temp2 = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootCreditiSubtitle} onClick={e => {
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
                                  <input type="text" disabled={disFieldC3} className="form-control border-0" defaultValue={spData.footCreditiSubtitle2} onChange={e => temp3 = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={spData.noFootCreditiSubtitle2} onClick={e => {
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
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.footCreditColor)} onChange={e => tempColor = e.target.value} />
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
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.footCreditTextColor)} onChange={e => tempTextColor = e.target.value} />
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
                                  <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.footCreditOpacity} id="creditOpRange" onChange={e => tempOpacity = e.target.value} ></input>
                                </div>
                              </div>
                            </div>
                            {/* <div className="col-1"></div>
                        <div className="col">
                          <div className="row">
                          </div>
                        </div> */}
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

                                    <input type="checkbox" className="form-control" defaultChecked={!spData.creditShow} onClick={e => {
                                      if (spData.creditShow === false) {
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
                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                      </form>
                    </div>
                  </div>
                </CreditDialog>
                <BackEditDialog backEditDiaShow={this.state.backEditDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("back")} handleSave={this.saveBack}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Page Background</h5>
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
                                  <label>Cats</label>
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
                            {/* <div className="col-1"></div>
                        <div className="col">
                          <div className="row border">
                            <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                              <label>Opacity</label>
                            </div>
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                              <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.backgroundOpacity} id="backOpRange" onChange={e => tempOpacity = e.target.value} ></input>
                            </div>
                          </div>
                        </div> */}
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
                            {/* <div className="col-1"></div>
                        <div className="col">
                          <div className="row">
                          </div>
                        </div> */}
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="row mb-1 m-auto">
                            <div className="col">
                              <div className="row border">
                                <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                                  <label>Cat back color</label>
                                </div>
                                <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="color" className="form-control border-0 p-0" defaultValue={this.rgbToHex(spData.catColor)} onChange={e => tempCatColor = e.target.value} />
                                </div>
                              </div>
                            </div>
                            {/* <div className="col-1"></div>
                        <div className="col">
                          <div className="row border">
                            <div className="col pt-1 pb-1 latomenu d-flex flex-column justify-content-center align-items-center">
                              <label>Opacity</label>
                            </div>
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                              <input type="range" class="form-range border-0 p-0" min="0" max="1" step="0.1" defaultValue={spData.catOpacity} id="catOpRange" onChange={e => tempOpacity1 = e.target.value} ></input>
                            </div>
                          </div>
                        </div> */}
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
                            {/* <div className="col-1"></div>
                        <div className="col">
                          <div className="row">
                          </div>
                        </div> */}
                          </div>
                        </div>

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                        <Upload upShow={this.state.upShow} handleClose={this.hideAlert}>
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
                          this.state.catAppItems.map(({ id, title, link, descr, icon, video }, i) => {
                            return (
                              <App showAppsBtn={this.state.appsBtnShow} key={i} pos={i} id={id}
                                title={title} link={link} descr={descr} icon={icon} video={video}
                                appVideo={this.catAppVideo} appEditDel={this.appEditDel} appDescr={this.appDescr} />
                            )
                          })
                        }
                        <AppAdd showAppsBtn={this.state.appsBtnShow} /* title={title} link={link} icon={icon} */ addItem={this.appOrCatItem} />
                      </div>
                    </div>
                  </div>
                </CatDialog>
                <AppEditDialog appEditDiaShow={this.state.appEditDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("appedit")} handleSave={this.applyAppEdit}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Edit Web Application</h5>
                    </div>
                    <div className="modal-body">
                      <form id="appEditForm">

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
                                  <input type="text" className="form-control border-0" placeholder={currPos + 1} id="clearappswitchpos" /* onChange={e => cgPos = e.target.value} /> */
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
                                  <input type="text" className="form-control border-0" defaultValue={tempAppTitle} onChange={e => temp2 = e.target.value} /*placeholder={tempAppTitle}*/ />
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
                                  <input type="text" className="form-control border-0" defaultValue={tempAppLink} onChange={e => temp3 = e.target.value} /*placeholder={tempAppLink}*/ />
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
                                  <input type="text" disabled={disFieldAE} className="form-control border-0" defaultValue={tempAppDescr} onChange={e => temp6 = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={noDescr} onClick={e => {
                                      if (this.state.disFieldAE === false) {
                                        this.setState({
                                          disFieldAE: true
                                        });
                                        noDescr = true;
                                      } else {
                                        this.setState({
                                          disFieldAE: false
                                        });
                                        noDescr = false;
                                      }
                                    }} />
                                    <span class="slider round" title="Hide"></span>
                                  </label>
                                </div>

                                {/* <div className="col d-flex flex-column justify-content-center align-items-center">
                                  <input type="text" className="form-control border-0" defaultValue={tempAppDescr} onChange={e => temp6 = e.target.value} />
                                </div> */}
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
                                    <input type="checkbox" className="form-control" defaultChecked={tempAppVideo} onClick={e => {
                                      if (tempAppVideo === false) {
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

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                        <Upload upShow={this.state.upShow} handleClose={this.hideAlert}>
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
                        <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
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
                        </Errore>
                      </form>
                    </div>
                  </div>
                </AppEditDialog>
                <AppAddDialog appAddDiaShow={this.state.appAddDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("appadd")} handleSave={this.applyAppAdd}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Add Web Application</h5>
                    </div>
                    <div className="modal-body">
                      <form id="appAddForm">

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
                                  <input type="text" placeholder="Leave blank for last..." id="clearapppos" className="form-control border-0"
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
                                  <input type="text" className="form-control border-0" id="clearapptitle" onChange={e => temp2 = e.target.value} />
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
                                  <input type="text" className="form-control border-0" id="clearapplink" onChange={e => temp3 = e.target.value} />
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
                                  <input type="text" disabled={disFieldAA} className="form-control border-0" defaultValue={tempAppDescr} id="clearappdescr" onChange={e => temp6 = e.target.value} />
                                </div>
                                <div className="col-2 border d-flex flex-column justify-content-center align-items-center">
                                  <label class="switch">
                                    <input type="checkbox" className="form-control" defaultChecked={noDescr} onClick={e => {
                                      if (this.state.disFieldAA === false) {
                                        this.setState({
                                          disFieldAA: true
                                        });
                                        noDescr = true;
                                      } else {
                                        this.setState({
                                          disFieldAA: false
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
                                  <input type="text" className="form-control border-0" placeholder="Description..." id="clearappdescr" onChange={e => temp6 = e.target.value} />
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
                                    <input type="checkbox" className="form-control" defaultChecked={tempAppVideo} onClick={e => {
                                      if (tempAppVideo === false) {
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

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore solidgreen latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">App added!</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Conferma>
                        <Upload upShow={this.state.upShow} handleClose={this.hideAlert}>
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
                        <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Error! Fill in all fields / Check position.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Errore>
                      </form>
                    </div>
                  </div>
                </AppAddDialog>
                <AppDelDialog appDelDiaShow={this.state.appDelDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("appdel")} handleSave={this.applyAppDel}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Permanently delete {tempAppTitle} application?</h5>
                    </div>
                    <div className="modal-body">
                      <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                      </Conferma>
                    </div>
                  </div>
                </AppDelDialog>
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
                                  <input type="text" className="form-control border-0" defaultValue={tempCatTitle} onChange={e => temp2 = e.target.value} /*placeholder={tempAppTitle}*/ />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                        <Upload upShow={this.state.upShow} handleClose={this.hideAlert}>
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
                        <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
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
                        </Errore>
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

                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                        <Upload upShow={this.state.upShow} handleClose={this.hideAlert}>
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
                        <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
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
                        </Errore>
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
                      <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                      </Conferma>
                    </div>
                  </div>
                </CatDelDialog>
                <AppOrCatDialog aocDiaShow={this.state.aocDiaShow} activityChanged={this.state.activityChanged} handleApp={this.appAddItem} handleCat={this.catAddItem}>
                  <div className="modal-content noborder">
                    <div className="modal-header">
                      <h5 className="modal-title" >Add App or Category?</h5>
                    </div>
                  </div>
                </AppOrCatDialog>
                <ExCrsDialog exCrsDiaShow={this.state.exCrsDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("excrs")} handleSave={this.applyAppEdit}>
                  <div className="modal-content noborder">
                    <div className="modal-header-dark">
                      <h5 className="modal-title-dark" >Credits</h5>
                    </div>
                    <div className="modal-body-dark darkBG text-center">
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("https://infinityfree.net/");
                          }}>
                          <h2><font color="white">
                            InfinityFree
                          </font></h2>
                          <h5><font color="Chartreuse">Free hosting with unlimited disk space and bandwidth.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("https://softwarelli.rf.gd/");
                          }}>
                          <h2><font color="white">
                            Softwarelli
                          </font></h2>
                          <h5><font color="Chartreuse">Solo software gratuito. No ads.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("https://letsencrypt.org");
                          }}>
                          <h2><font color="white">
                            Let's Encrypt
                          </font></h2>
                          <h5><font color="Chartreuse">Let's Encrypt is a free, automated, and open Certificate Authority.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("http://www.archive.org");
                          }}>
                          <h2><font color="white">
                            Internet Archive
                          </font></h2>
                          <h5><font color="Chartreuse">Worldwide Public Domain Archive.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("http://www.icecast.org/");
                          }}>
                          <h2><font color="white">
                            IceCast
                          </font></h2>
                          <h5><font color="Chartreuse">Icecast is free server software for streaming multimedia.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("https://nginx.org/");
                          }}>
                          <h2><font color="white">
                            NGiNX
                          </font></h2>
                          <h5><font color="Chartreuse">nginx [engine x] is an HTTP, reverse, mail and TCP/UDP proxy server.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("https://sourceforge.net/projects/truckliststudio/");
                          }}>
                          <h2><font color="white">
                            TrucklistStudio Home Page
                          </font></h2>
                          <h5><font color="Chartreuse">TrucklistStudio is a Media playlist broadcasting software.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("http://www.blender.org/");
                          }}>
                          <h2><font color="white">
                            Blender
                          </font></h2>
                          <h5><font color="Chartreuse">Blender is the free open source 3D suite.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("http://www.videolan.org/");
                          }}>
                          <h2><font color="white">
                            VLC
                          </font></h2>
                          <h5><font color="Chartreuse">VLC, open source multimedia player.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("http://www.gimp.org/");
                          }}>
                          <h2><font color="white">
                            GIMP
                          </font></h2>
                          <h5><font color="Chartreuse">GNU Image Manipulation Program.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("https://inkscape.org");
                          }}>
                          <h2><font color="white">
                            Inkscape
                          </font></h2>
                          <h5><font color="Chartreuse">Inkscape is a Free and open source vector graphics editor for GNU/Linux, Windows and macOS.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("http://www.ubuntu.com/");
                          }}>
                          <h2><font color="white">
                            UBUNTU
                          </font></h2>
                          <h5><font color="Chartreuse">Linux Ubuntu Distro.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("https://www.jamendo.com/artist/368585/blue-daze");
                          }}>
                          <h2><font color="white">
                            Blue Daze
                          </font></h2>
                          <h5><font color="Chartreuse">Thanks for the great Jingles.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("https://freedns.afraid.org/");
                          }}>
                          <h2><font color="white">
                            FreeDNS
                          </font></h2>
                          <h5><font color="Chartreuse">Free DNS - Dynamic DNS - Static DNS subdomain and domain hosting</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                      {/* ---------------------- CREDIT ------------------------------- */}
                      <div className="row">
                        <button className="col extcredits green m-1"
                          onClick={() => {
                            window.open("https://github.com/video-dev/hls.js");
                          }}>
                          <h2><font color="white">
                            hls.js
                          </font></h2>
                          <h5><font color="Chartreuse">hls.js is a JavaScript library which implements an HTTP Live Streaming client.
                            It relies on HTML5 video and MediaSource Extensions for playback.</font></h5>
                        </button>
                      </div>
                      {/* ---------------------- END CREDIT ------------------------------- */}
                    </div>
                  </div>
                </ExCrsDialog>
                <SearchDialog searchDiaShow={this.state.searchDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("search")} handleSave={this.appSearch} handleReset={this.appSearchReset}>
                  <div className="modal-content noborder">
                    <div className="modal-header-dark">
                      <h5 className="modal-title-dark" >Search</h5>
                    </div>
                    <div className="modal-body-dark darkBG">
                      <form id="searchForm" onKeyDown={this.handleKeyDown}>
                        <div className="form-group">
                          <input type="text" className="form-control contenitore pt-2" ref={(input) => { this.searchInput = input; }} onChange={e => temp = e.target.value} placeholder={"Search..."} />
                        </div>
                        <Conferma alShow={this.state.alShow} handleClose={this.hideAlert}>
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
                        </Conferma>
                        <Errore alErrShow={this.state.alErrShow} handleClose={this.hideAlert}>
                          <div className="row text-center pt-2">
                            <div className="col">
                              <div className="row">
                                <section className="col pt-2 contenitore brick latowhite d-flex justify-content-center align-items-center ">
                                  <div>
                                    <p className="norfont">Error! Enter at least one character.</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                          </div>
                        </Errore>
                        {/* RESAPPS */}
                        <div className="textcenter">
                          {
                            this.state.resAppItems.map(({ id, title, link, descr, icon, video }, i) => {
                              return (
                                <AppSearchRes key={i} pos={i} id={id}
                                  title={title} link={link} descr={descr} icon={icon} video={video}
                                  appVideo={this.resAppVideo} appDescr={this.appDescr} />
                              )
                            })
                          }
                        </div>
                      </form>
                    </div>
                  </div>
                </SearchDialog>
                <AppVideoDialog appVideoDiaShow={this.state.appVideoDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("video")} handleSave={this.applyAppEdit}>
                  <div className="modal-content darkBG">
                    <div className="modal-header-dark">
                      <h5 className="modal-title-dark" >"{tempAppTitle}"</h5>
                    </div>
                    <div className="modal-body align-items-center darkBG">
                      <center>
                        <iframe width="100%" height="350" src={this.state.videoLink} frameborder="0" allowfullscreen="true"></iframe>
                      </center>
                    </div>
                  </div>
                </AppVideoDialog>
                <AppDescrDialog appDescrDiaShow={this.state.appDescrDiaShow} activityChanged={this.state.activityChanged} handleClose={() => this.hideModal("appdescr")} handleSave={this.applyAppEdit}>
                  <div className="modal-content darkBG">
                    <div className="modal-header-dark">
                      <h5 className="modal-title-dark" >"{tempAppTitle}"</h5>
                    </div>
                    <div className="modal-body align-items-center darkBG">
                      <center>
                        <div className="lato medfonts"><i>{tempAppDescr}</i></div>
                      </center>
                    </div>
                  </div>
                </AppDescrDialog>
                <div className="stickytop">
                  {head}
                  {buttons}
                </div>
                {/* BODY */}
                <div className="textcenter">
                  {/* CATEGORIES */}
                  {
                    this.state.catItems.map(({ id, title, icon }, i) => {
                      return (
                        <Cat showAppsBtn={this.state.appsBtnShow} key={i} pos={i}
                          title={title} icon={icon} catEditDel={this.catEditDel}
                          catAddItem={this.catAddItem} catCont={this.catCont} />
                      )
                    })
                  }
                  {/* APPS */}
                  {
                    this.state.rootAppItems.map(({ id, title, link, descr, icon, video }, i) => {
                      return (
                        <App showAppsBtn={this.state.appsBtnShow} key={i} pos={i} id={id}
                          title={title} link={link} descr={descr} icon={icon} video={video}
                          appEditDel={this.appEditDel} addItem={this.appOrCatItem} appVideo={this.appVideo} appDescr={this.appDescr} />
                      )
                    })
                  }
                  <AppAdd showAppsBtn={this.state.appsBtnShow} /* title={title} link={link} icon={icon} */ addItem={this.appOrCatItem} />
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

class SettingsGear extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const gearClick = () => {
      this.props.handleShowButtons(true);
    }
    return (
      <img className="gear mt-2 mb-2" alt="Settings Mode" src="./img/gears.svg" onClick={() => gearClick()} />
    );
  }
}

class RedPoint extends React.Component {
  constructor(props) {
    super(props);
  }
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
//       (<a title={this.props.title} onClick={() => this.props.appVideo("AppVideo", this.props.id)}>
//         <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
//       </a>)
//       :
//       (< a title={this.props.title} href={this.props.link} target="_blank" >
//         <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
//       </a>);

//     let appBtn = "";
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
//     if (this.props.showAppsBtn === "ShowAppBtn") {
//       appBtn = (
//         <div className="appcontainer">
//           {linkOrVideo}
//           {descrButton}
//           {/* <h4><p className="lato"><b>{this.props.title}</b></p></h4> */}
//           <div className="row btncontainer">
//             <button className="col appbutton solidgreen m-1" onClick={() => this.props.appEditDel("AppEdit", this.props.id, this.props.pos)}>
//               Edit
//             </button>
//             <button className="col-1 appbutton black m-1 pad01">
//               {this.props.pos + 1} {/* {this.props.id} */}
//             </button>
//             <button className="col appbutton solidbrick m-1" onClick={() => this.props.appEditDel("AppDel", this.props.id)}>
//               Remove
//             </button>
//           </div>
//         </div>
//       )
//     } else {
//       appBtn = (
//         <div className="appcontainer">
//           {linkOrVideo}
//           {descrButton}
//           {/* <h4><p className="lato"><b>{this.props.title}</b></p></h4> */}
//         </div>
//       )
//     }
//     return (
//       <>
//         {appBtn}
//       </>
//     );
//   }
// }

class AppAdd extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let appBtn = ""
    if (this.props.showAppsBtn === "ShowAppBtn") {
      appBtn = (
        <div className="appcontainer">
          < a title="Add Item" onClick={() => this.props.addItem()} >
            <img className="apps" title="Add Item" alt="Add Item" src="./appicons/ac_add.svg" />
          </a>
          <h4><p className="lato"><b>Add Item</b></p></h4>
          <div className="row btncontainer">
            <button className="col addbutton solidgreen m-1" onClick={() => this.props.addItem()}>
              Add Item
            </button>
          </div>
        </div>
      )
    } else {
      appBtn = "";
    }
    return (
      <>
        {appBtn}
      </>
    );
  }
}

// class AppCatRes extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     const linkOrVideo = this.props.video
//       ?
//       (<a title={this.props.title} onClick={() => this.props.appVideo("AppVideo", this.props.id)}>
//         <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
//       </a>)
//       :
//       (< a title={this.props.title} href={this.props.link} target="_blank" >
//         <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
//       </a>);

//     let appBtn = ""
//     let descrButton = "";
//     if (this.props.descr !== "") {
//       descrButton = (
//         <Accordion title={this.props.title} content={this.props.descr} />
//         // <h4><p className="lato pointer" onClick={() => this.props.appDescr("AppDescr", this.props.id)}><b>{this.props.title}</b></p></h4>
//         // <div className="row">
//         //   <div className="col"><h4><p className="lato"><b>{this.props.title}</b></p></h4></div>
//         //   <div className="col-1"><h4><p className="lato pointer" onClick={() => this.props.appDescr("AppDescr", this.props.id)}><b>+</b></p></h4></div>
//         // </div>
//       )
//     } else {
//       descrButton = (
//         <h4><p className="lato"><b>{this.props.title}</b></p></h4>
//       );
//     };
//     if (this.props.showAppsBtn === "ShowAppBtn") {
//       appBtn = (
//         <div className="appcontainer">
//           {linkOrVideo}
//           {descrButton}
//           {/* <h4><p className="lato"><b>{this.props.title}</b></p></h4> */}
//           <div className="row btncontainer">
//             <button className="col appbutton solidgreen m-1" onClick={() => this.props.appEditDel("AppEdit", this.props.id, this.props.pos)}>
//               Edit
//             </button>
//             <button className="col-1 appbutton black m-1 pad01">
//               {this.props.pos + 1} {/* {this.props.id} */}
//             </button>
//             <button className="col appbutton solidbrick m-1" onClick={() => this.props.appEditDel("AppDel", this.props.id)}>
//               Remove
//             </button>
//           </div>
//         </div>
//       )
//     } else {
//       appBtn = (
//         <div className="appcontainer">
//           {linkOrVideo}
//           {descrButton}
//           {/* <p className="smallfont"><i>{this.props.descr}</i></p>
//           <h4><p className="lato"><b>{this.props.title}</b></p></h4> */}
//         </div>
//       )
//     }
//     return (
//       <>
//         {appBtn}
//       </>
//     );
//   }
// }

// class AppSearchRes extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     const linkOrVideo = this.props.video
//       ?
//       (<a title={this.props.title} onClick={() => this.props.appVideo("AppVideo", this.props.id)}>
//         <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
//       </a>)
//       :
//       (< a title={this.props.title} href={this.props.link} target="_blank" >
//         <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
//       </a>);

//     let appBtn = ""
//     let descrButton = "";
//     if (this.props.descr !== "") {
//       descrButton = (
//         <Accordion title={this.props.title} content={this.props.descr} />
//         // <h4><p className="lato pointer" onClick={() => this.props.appDescr("AppDescr", this.props.id)}><b>{this.props.title}</b></p></h4>
//       )
//     } else {
//       descrButton = (
//         <h4><p className="lato"><b>{this.props.title}</b></p></h4>
//       );
//     };
//     appBtn = (
//       <div className="appcontainer">
//         {linkOrVideo}
//         {descrButton}
//         {/* <p className="smallfont"><i>{this.props.descr}</i></p>
//         <h4><p className="lato"><b>{this.props.title}</b></p></h4> */}
//       </div>
//     )
//     return (
//       <>
//         {appBtn}
//       </>
//     );
//   }
// }

class Cat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let catBtn = ""
    if (this.props.showAppsBtn === "ShowAppBtn" && this.props.title !== "Add Item") {
      catBtn = (
        <div className="appcontainer">
          <a title={this.props.title} onClick={() => this.props.catCont("catCont", this.props.pos)}>
            <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
          </a>
          <h4><p className="lato"><b>{this.props.title}</b></p></h4>
          <div className="row btncontainer">
            <button className="col appbutton solidgreen m-1" onClick={() => this.props.catEditDel("CatEdit", this.props.pos)}>
              Edit
            </button>
            <button className="col-1 appbutton black m-1 pad01">
              {this.props.pos + 1}
            </button>
            <button className="col appbutton solidbrick m-1" onClick={() => this.props.catEditDel("CatDel", this.props.pos)}>
              Remove
            </button>
          </div>
        </div>
      )
    } else {
      catBtn = (
        <div className="appcontainer">
          <a title={this.props.title} onClick={() => this.props.catCont("catCont", this.props.pos)}>
            <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
          </a>
          <h4><p className="lato"><b>{this.props.title}</b></p></h4>
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
    if (this.props.showCreditBtn === "ShowCreditBtn" && this.props.title !== "Add Item") {
      creditBtn = (
        <div className="appcontainer">
          <a title={this.props.title} onClick={() => this.props.appVideo("AppVideo", this.props.pos)}>
            {/* < a title={this.props.title} href={this.props.link} target="_blank"> */}
            <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
          </a>
          <h4><p className="lato"><b>{this.props.title}</b></p></h4>
          <div className="row btncontainer">
            <button className="col appbutton solidgreen m-1" onClick={() => this.props.appEditDel("AppEdit", this.props.pos)}>
              Edit
            </button>
            <button className="col appbutton solidbrick m-1" onClick={() => this.props.appEditDel("AppDel", this.props.pos)}>
              Remove
            </button>
          </div>
        </div>
      )
    } else if (this.props.title === "Add Item") {
      creditBtn = (
        <div className="appcontainer">
          < a title={this.props.title} target="_blank" onClick={() => this.props.appAddItem("AddItem", this.props.pos)} >
            <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
          </a>
          <h4><p className="lato"><b>{this.props.title}</b></p></h4>
          <div className="row btncontainer">
            <button className="col addbutton solidgreen m-1" onClick={() => this.props.appAddItem("AddItem", this.props.pos)}>
              Add Item
            </button>
          </div>
        </div>
      )
    } else {
      creditBtn = (
        <div className="appcontainer">
          < a title={this.props.title} onClick={() => this.props.appVideo("AppVideo", this.props.pos)}>
            {/* < a title={this.props.title} href={this.props.link} target="_blank" > */}
            <img className="apps" title={this.props.title} alt={this.props.title} src={this.props.icon} />
          </a>
          <h4><p className="lato"><b>{this.props.title}</b></p></h4>
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
  // constructor(props) {
  //   super(props);
  // }

  state = {
    isOpen: false
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
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

          <button className="col menuItem green m-1"
            onClick={() => {
              // window.location = "./searching.php";
              this.props.search();
            }}>
            Search
          </button>
          <button className="col menuItem blue m-1"
            onClick={() => {
              // window.location = "./credits.html";
              this.props.exCrsShow();
            }}>
            Credits
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