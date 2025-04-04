import React from "react";
// import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";

import { hexToRgb, rgbToHex } from './methods/colorUtils';
import {
  Item, Cat, Credit, Element, EditElement, EleDialog
} from './methods/elements';
import {
  ImgElement, ModalTitle, InputFile, InputPosition, InputTitle,
  InputLink, InputCat, InputWidth, InputBackColor,
  InputTextColor, InputOpacity, InputVideo, InputInfos,
  InputHideBlocks, InputSwitch, AddSym, LoginGear,
  SettingsGear, Dropdown, DropdownCat, Alert
} from './methods/simpleComp';
import {
  fetchUpPHP, fetchUpConfig, fetchDelPHP, fetchDownCredentials,
  hashUsrPsw, comparePassword, Orologio, FormChanges
} from './methods/functions';

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
var tempHideDescr = true;
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
var rootArray = [];
var rootArrayLength = 0;
var arrayAdd = [];
var inPos = "";
var blockHide = "none";
var categoryFirst = "none";
var dropDownIsOpen = false;
var catDropDownIsOpen = false;
var currElement = "";
var newItem = {
  "title": "",
  "link": "",
  "icon": "",
  "descr": "",
  "hideDescr": true,
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
export var nome = "";
export var credentials = require("./initSec.json");
export var spData = require("./initData.json");
export var changeFlag = false;

// MAIN

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      changed: "",
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

  // POST UTILS

  saveConf(file, url, key) {
    fetchUpConfig(file, url, key)
      .then(res => {
        console.log("Config Saved!");
        // REFRESH ALL ITEMS CATEGORY
        this.state.cats.forEach(element => {
          if (element.title === tempCatTitle)
            this.itemCatSel(element.title, spData.items);
        })
        // this.itemCatSel(tempCatTitle, spData.items);
        this.itemCatSel("Root", spData.items);
        changeFlag = false;
        // console.log("Save Conf. result=", res);
        // console.log("SaveTempCat= ", tempCatTitle);
      });
  }

  catItemActions(file, url, op) {
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
    // this.setState({
    //   activityChanged: true
    // })
    fetchUpPHP(file, "./api/img-upload.php", url)
      .then(res => {
        if (url === "logo" && op === "edit") {
          spData.LogoIcon = "./img/" + nome;
          this.fireAlert("Changes Made!", "solidgreen");
          // this.setState({
          //   activityChanged: false
          // });
        } else if (url === "icon" && op === "edit") {
          if (fileImg !== null) {
            // console.log("Icon edit TEMP4: ", temp4);
            array[temp].icon = "./itemicons/" + nome;
          }
          if (temp2 !== "") {
            array[temp].title = temp2;
            tempItemTitle = array[temp].title;
          }
          if (temp3 !== "") {
            array[temp].link = temp3;
            tempItemLink = array[temp].link;
          }
          array[temp].video = temp4;
          tempItemVideo = temp4;

          // console.log("Actions TempCAT = " + tempCatTitle);
          array[temp].cat = temp5;
          // tempCatTitle = temp5;

          // console.log("TempItemDescr = " + temp6);
          array[temp].descr = temp6;
          tempItemDescr = temp6;

          array[temp].hideDescr = noDescr;
          tempHideDescr = noDescr;

          if (blockHide !== "none") {
            array[temp].hidden = blockHide;
            tempItemHide = blockHide;
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
            // console.log("TempItemTitle: ", tempItemTitle);
            newItem.descr = array[temp].descr;
            newItem.hideDescr = array[temp].hideDescr;
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
              // console.log("index > temp = ", (index));
              temp = newItem.id;
              currPos = index;
              // this.itemEditDel("itemEdit", newItem.id, (index))
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
              // console.log("Index = ", index);
              temp = newItem.id;
              currPos = index;
              // this.itemEditDel("itemEdit", newItem.id, index)
            }
            newItem = {
              "title": "",
              "link": "",
              "icon": "",
              "descr": "",
              "hideDescr": true,
              "video": false,
              "cat": "",
              "id": 0,
              "hidden": false
            };
          }
          inPos = "";
          cgPos = "";
          // currPos = "";
          temp2 = "";
          temp3 = "";

          // temp4 = tempItemVideo;
          // temp5 = tempCatTitle;
          // temp6 = tempItemDescr;
          // noDescr = tempHideDescr;
          // blockHide = tempItemHide;

          // temp4 = tempItemVideo;
          // temp5 = tempCatTitle;
          // temp6 = "";
          // noDescr = tempHideDescr;
          // blockHide = "none";
          this.fireAlert("Changes Made!", "solidgreen");
        } else if (url === "icon" && op === "add") {
          // console.log("Icon add TEMP4: ", temp4);
          newItem.icon = "./itemicons/" + nome;
          newItem.title = temp2;
          newItem.link = temp3;
          newItem.descr = temp6;
          newItem.hideDescr = noDescr;
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
            if (temp5 !== "Root") {
              // console.log("tempCatTitle = Cat", inPos);
              index = this.state.catItems[inPos].id;
            } else {
              index = this.state.rootItems[inPos].id;
            }
          }
          newItem.id = index;

          // console.log("Index iD=", (index));
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
          tempCatTitle = temp5;
          temp6 = "";
          blockHide = "none";
          newItem = {
            "title": "",
            "link": "",
            "icon": "",
            "descr": "",
            "hideDescr": true,
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
          newItem.hideDescr = noDescr;
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
            "hideDescr": true,
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
            array[currPos].icon = "./itemicons/" + nome;
          }
          if (temp2 !== "") {
            array[currPos].title = temp2;
            this.state.items.forEach(element => {
              if (element.cat === tempCatTitle) {
                element.cat = temp2;
              }
            });
            tempCatTitle = temp2;
          }
          if (blockHide !== "none") {
            array[currPos].hidden = blockHide;
            tempItemHide = blockHide;
          }
          if (cgPos !== "") {
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
          inPos = "";
          cgPos = "";
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
          spData.backgroundColor = hexToRgb(tempColor) + ", 1)";
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
          // this.setState({
          //   activityChanged: false
          // });
        } else if (url === "backcat" && op === "edit") {
          spData.catImage = "./img/" + nome;
          spData.catColor = hexToRgb(tempCatColor) + ", 1)";
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
          // this.setState({
          //   activityChanged: false
          // });
        }
        this.saveConf(spData, "./api/img-upload.php", "config");
        fileCatImg = null;
        fileImg = null;
      });
  }

  crsActions(url, op) {
    if (url === "crs" && op === "add") {
      CrsNewItem.title = temp2;
      CrsNewItem.link = temp3;
      CrsNewItem.descr = temp4;
      arrayAdd = this.addAfter(array, inPos, CrsNewItem);
      this.setState({ creditsItems: arrayAdd });
      spData.creditsItems = arrayAdd;
      temp = "";
      temp2 = "";
      temp3 = "";
      temp4 = "";
      cgPos = "";
      inPos = "";
      document.getElementById('crsAddForm').reset();
    } else if (url === "crs" && op === "addlast") {
      CrsNewItem.title = temp2;
      CrsNewItem.link = temp3;
      CrsNewItem.descr = temp4;
      inPos = array.length;
      arrayAdd = this.addAfter(array, inPos, CrsNewItem);
      this.setState({ creditsItems: arrayAdd });
      spData.creditsItems = arrayAdd;
      temp = "";
      temp2 = "";
      temp3 = "";
      temp4 = "";
      cgPos = "";
      inPos = "";
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
    this.saveConf(spData, "./api/img-upload.php", "config");
  }

  // UTILS

  itemSearchReset = () => {
    document.getElementById('searchForm').reset();
    this.setState({ resItems: [] });
    temp = "";
    this.setState({
      onlyRead: false
    })
    // Keep Only This
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
          newItem.hideDescr = this.state.items[i].hideDescr;
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
            "hideDescr": true,
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
        "hideDescr": true,
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
        if (items[i].cat === cat) {
          newItem.icon = items[i].icon;
          newItem.title = items[i].title;
          newItem.link = items[i].link;
          newItem.descr = items[i].descr;
          newItem.hideDescr = items[i].hideDescr;
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
            "hideDescr": true,
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
        // console.log("Root Items Refreshed");
      } else {
        this.setState({ catItems: arrayAdd });
        // console.log(cat + " Items Refreshed");
      }
      // for (let ind = 0; ind < arrayAdd.length; ind++) {
      //   console.log("catitems=", (arrayAdd[ind]));
      // }
      arrayAdd = [];
      newItem = {
        "title": "",
        "link": "",
        "icon": "",
        "descr": "",
        "hideDescr": true,
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
    // console.log("FormChanged?: ", FormChanges("menuForm")[0])
    if (/* FormChanges("menuForm")[0] */changeFlag) {
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
      spData.menuColor = hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.menuOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
      if (blockHide !== "none") {
        spData.menuShow = blockHide;
      }
      this.fireAlert("Changes Made!", "solidgreen");
      this.saveConf(spData, "./api/img-upload.php", "config");
      temp = "";
      temp2 = "";
      blockHide = "none";

      disable1 = "none";
      disable2 = "none";
    } else {
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  saveTitle = () => {
    // console.log("FormChanged?: ", FormChanges("titleForm")[0])
    if (/* FormChanges("titleForm")[0] */changeFlag) {
      if (temp !== "") {
        spData.headTitle = temp;
      }
      // console.log("Titolo: " + spData.headTitle);
      spData.headColor = hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.headOpacity = parseFloat(tempOpacity.replace(/,/g, "."))/* .toFixed(1) */;
      spData.headTextColor = hexToRgb(tempTextColor) + ", 1)";
      spData.headColW = tempColW;
      // console.log("Colore: " + spData.headColor);
      if (blockHide !== "none") {
        spData.titleShow = blockHide;
      }
      blockHide = "none";
      temp = "";
      this.fireAlert("Changes Made!", "solidgreen");
      this.saveConf(spData, "./api/img-upload.php", "config");
      this.setState({
        changed: spData.headColW
      });
    } else {
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  saveLogo = () => {
    if (/* FormChanges("logoForm")[0] */changeFlag) {
      if (fileImg !== null) {
        tempIcon = spData.LogoIcon;
        this.catItemActions(fileImg, "logo", "edit");
        spData.logoColor = hexToRgb(tempColor) + ", " + tempOpacity + ")";
        spData.logoOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
        spData.logoColW = tempColW;
        if (blockHide !== "none") {
          spData.logoShow = blockHide;
        }
        blockHide = "none";
      } else {
        spData.logoColor = hexToRgb(tempColor) + ", " + tempOpacity + ")";
        spData.logoOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
        spData.logoColW = tempColW;
        if (blockHide !== "none") {
          spData.logoShow = blockHide;
        }
        blockHide = "none";
        this.fireAlert("Changes Made!", "solidgreen");
        this.saveConf(spData, "./api/img-upload.php", "config");
        this.setState({
          changed: spData.logoColW
        });
      }
    } else {
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  saveClock = () => {
    if (/* FormChanges("clockForm")[0] */changeFlag) {
      spData.clockColor = hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.clockOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
      spData.clockTextColor = hexToRgb(tempTextColor) + ", 1)";
      spData.clockColW = tempColW;
      if (blockHide !== "none") {
        spData.clockShow = blockHide;
      }
      blockHide = "none";
      this.fireAlert("Changes Made!", "solidgreen");
      this.saveConf(spData, "./api/img-upload.php", "config");
      this.setState({
        changed: spData.clockColW
      });
    } else {
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  saveBack = () => {
    if (/* FormChanges("backEditForm")[0] */changeFlag) {
      var changes = false;

      if (fileImg !== null) {
        tempIcon = spData.backgroundImage;
        this.catItemActions(fileImg, "back", "edit");
        changes = true;
      }

      // console.log("Tempopacity:", tempOpacity);
      // console.log("BackgroundOpacity:", spData.backgroundOpacity.toString());
      // console.log("Tempopacity1:", tempOpacity1);
      // console.log("CatBackgroundOpacity:", spData.catOpacity.toString());

      if (tempColor !== rgbToHex(spData.backgroundColor)
        || tempOpacity !== spData.backgroundOpacity.toString() || disable1 !== "none") {
        if (disable1 !== "none") {
          spData.noBackImage = disable1;
        }
        spData.backgroundColor = hexToRgb(tempColor) + ", " + tempOpacity + ")";
        spData.backgroundOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
        // this.setState({
        //   activityChanged: true
        // })

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
        this.catItemActions(fileCatImg, "backcat", "edit");
        changes = true;
      }

      if (tempCatColor !== rgbToHex(spData.catColor)
        || tempOpacity1 !== spData.catOpacity.toString() || disable2 !== "none") {
        if (disable2 !== "none") {
          spData.noCatImage = disable2;
        }
        spData.catColor = hexToRgb(tempCatColor) + ", " + tempOpacity1 + ")";
        spData.catOpacity = parseFloat(tempOpacity1.replace(/,/g, "."));
        // this.setState({
        //   activityChanged: true
        // })
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
      // console.log("CATFirst: " + categoryFirst);
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
        this.saveConf(spData, "./api/img-upload.php", "config");
        fileCatImg = null;
        fileImg = null;
      }
    } else {
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  saveInfo = () => {
    if (/* FormChanges("infoForm")[0] */changeFlag) {
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
      spData.footInfoColor = hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.footInfoOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
      spData.footInfoTextColor = hexToRgb(tempTextColor) + ", 1)";
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
      this.saveConf(spData, "./api/img-upload.php", "config");
      this.setState({
        changed: spData.footInfoColW
      });
    } else {
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  saveAddInfo = () => {
    if (/* FormChanges("creditForm")[0] */changeFlag) {
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

      spData.footAddColor = hexToRgb(tempColor) + ", " + tempOpacity + ")";
      spData.footAddOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
      spData.footAddTextColor = hexToRgb(tempTextColor) + ", 1)";
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
      this.saveConf(spData, "./api/img-upload.php", "config");
      this.setState({
        changed: spData.footAddColW
      });
    } else {
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  // ITEM ACTIONS

  applyItemEdit = () => {
    array = [...this.state.items];
    rootArray = [...this.state.rootItems];
    catArray = [...this.state.catItems];

    // if (noDescr === true) {
    //   temp6 = "";
    // }

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

    // if (fileImg !== null || temp2 !== "" || temp3 !== "" || temp4 !== tempItemVideo ||
    //   temp5 !== tempCatTitle || temp6 !== tempItemDescr || cgPos !== "" ||
    //   blockHide !== tempItemHide) {
    if (/* FormChanges("itemEditForm")[0] || temp5 !== tempCatTitle || */ changeFlag) {
      if (cgPos !== "") {
        if (temp5 === tempCatTitle) {
          inPos = parseInt(cgPos) - 1;
          // console.log("Edit inPos: ", inPos, " currPos: ", currPos);
          if (temp5 === "Root") {
            rootArrayLength = rootArray.length;
            if (inPos < rootArrayLength && inPos >= 0 /* && inPos !== currPos */) {
              this.catItemActions(fileImg, "icon", "edit");
            } else {
              cgPos = "";
              inPos = "";
              this.fireAlert("Check position!", "brick");
            }
          } else {
            catArrayLength = catArray.length;
            // console.log("CatItemLength: ", catArrayLength);
            if (inPos < catArrayLength && inPos >= 0 /* && inPos !== currPos */) {
              this.catItemActions(fileImg, "icon", "edit");
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
        this.catItemActions(fileImg, "icon", "edit");
      }
    } else {
      // console.log("fileImg - temp2 - temp3 are Null!!!");
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  applyItemAdd = () => {
    // console.log("Argo: ", argo);
    rootArray = [...this.state.rootItems];
    catArray = [...this.state.catItems];
    array = [...this.state.items];
    tempIcon = "";

    // if (noDescr === true) {
    //   temp6 = "";
    // }

    if (fileImg !== null && temp2 !== "" && temp3 !== "") {
      if (temp !== "") {
        inPos = parseInt(temp) - 1;
        if (temp5 === "Root") {
          rootArrayLength = rootArray.length;
          if (inPos < (rootArrayLength) && inPos >= 0) {
            this.catItemActions(fileImg, "icon", "add");
          } else {
            this.fireAlert("Check position.", "brick");
          }
        } else {
          catArrayLength = catArray.length;
          if (inPos < (catArrayLength) && inPos >= 0) {
            this.catItemActions(fileImg, "icon", "add");
          } else {
            this.fireAlert("Check position.", "brick");
          }
        }
        // console.log("InPos: ", inPos);
        // console.log("ArrayLength: ", arrayLength);

        // if (inPos <= (arrayLength) && inPos >= 0) {
        //   this.saveImgFile(fileImg, "icon", "add");
        // } else {
        //   this.fireAlert("Fill in all fields / Check position.", "brick");
        // }

      } else {
        this.catItemActions(fileImg, "icon", "addlast");
      }
    } else {
      this.fireAlert("Fill in all fields!", "brick");
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
    this.saveConf(spData, "./api/img-upload.php", "config");
    this.setState({
      activityChanged: true
    });
    setTimeout(() => {
      this.setState({ itemDelDiaShow: false });
      this.setState({ activityChanged: false });
    }, 1750);
  }

  // CAT ACTIONS

  applyCatEdit = () => {
    // console.log("fileIMG: ", fileImg);
    // console.log("temp2: ", temp2);
    // console.log("cgPos: ", cgPos);
    // console.log("blockHide: ", blockHide);
    // console.log("tempItemHide: ", tempItemHide);
    // if (fileImg !== null || temp2 !== "" || cgPos !== ""
    //   || blockHide !== "none") {
    if (/* FormChanges("catEditForm")[0] */changeFlag) {
      let dup = false;
      for (let i = 0; i < arrayLength; i++) {
        if (array[i].title.toLowerCase() === temp2.toLowerCase()) {
          // console.log("CAT Title Duplicated!!!");
          dup = true;
        }
      }
      if (cgPos !== "") {
        inPos = parseInt(cgPos) - 1;
        // console.log("CAT InPos: ", inPos);
        if (inPos < arrayLength && inPos >= 0 /* && inPos !== currPos && !dup */) {
          if (!dup) {
            this.catItemActions(fileImg, "cat", "edit");
          } else {
            this.fireAlert("CAT name duplicated!", "brick");
          }
          // this.saveImgFile(fileImg, "cat", "edit");
        } else {
          this.fireAlert("Check position!", "brick");
        }
      } else {
        if (!dup) {
          this.catItemActions(fileImg, "cat", "edit");
        } else {
          this.fireAlert("CAT name duplicated!", "brick");
        }
      }
    } else {
      // console.log("fileImg - temp2 - temp are \"\"");
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  applyCatAdd = () => {
    array = [...this.state.cats];
    arrayLength = (array.length);
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
        if (inPos < arrayLength && !dup && inPos >= 0) {
          this.catItemActions(fileImg, "cat", "add");
        } else {
          this.fireAlert("Check Position!", "brick");
        }
      } else {
        // console.log("AddCat (temp Empty) inPos: ", inPos);
        if (!dup) {
          this.catItemActions(fileImg, "cat", "addlast");
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
    this.saveConf(spData, "./api/img-upload.php", "config");
    this.setState({
      activityChanged: true
    });
    setTimeout(() => {
      this.setState({ catDelDiaShow: false });
      this.setState({ activityChanged: false });
    }, 1750);
  }

  // CREDITS ACTIONS

  applyCrsEdit = () => {
    if (/* FormChanges("crsEditForm")[0] */changeFlag) {
      // if (temp2 !== tempCrsTitle || temp3 !== tempCrsLink || temp4 !== tempCrsDescr || cgPos !== "") {
      if (cgPos !== "") {
        inPos = parseInt(cgPos) - 1;
        // console.log("InPos: ", inPos);
        if (inPos < arrayLength && inPos >= 0 && inPos !== currPos) {
          this.crsActions("crs", "edit");
          this.fireAlert("Changes Made!", "solidgreen");
          // this.setState({
          //   activityChanged: true
          // });
        } else {
          this.fireAlert("Check Position!", "brick");
        }
      } else {
        this.crsActions("crs", "edit");
        this.fireAlert("Changes Made!", "solidgreen");
        // this.setState({
        //   activityChanged: true
        // });
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
          this.crsActions("crs", "add");
          this.fireAlert("Credit added!", "solidgreen");
          // this.setState({
          //   activityChanged: true
          // });
        } else {
          this.fireAlert("Check position!", "brick");
        }
      } else {
        this.crsActions("crs", "addlast");
        this.fireAlert("Credit added!", "solidgreen");
        // this.setState({
        //   activityChanged: true
        // });
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
    this.saveConf(spData, "./api/img-upload.php", "config");
    setTimeout(() => this.setState({ crsDelDiaShow: false }), 1750);
  }

  // LOGIN ACTIONS

  loginSession(id) {
    if (login === false) {
      this.showModal("login");
      this.userInput.focus();
      fetchDownCredentials("./api/img-upload.php", credentials);
    } else {
      this.showMainButtons();
    }
  }

  loginCheck = () => {
    // console.log("Login User: " + usrTmp);
    // console.log("Login Psw: " + pswTmp);
    comparePassword(pswTmp, credentials.password, bcrypt)
      .then(pass => {
        comparePassword(usrTmp, credentials.user, bcrypt)
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
    if (/* FormChanges("loginEditForm")[0] */changeFlag) {
      if (usrTmp !== "" || pswTmp !== "") {
        // console.log("User: " + usrTmp)
        // console.log("Psw: " + pswTmp)
        spData.loginColor = hexToRgb(tempColor) + ", " + tempOpacity + ")";
        spData.loginOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
        hashUsrPsw(usrTmp, pswTmp, bcrypt)
          .then(result => {
            // console.log(result)
            credentials.user = result[0];
            // console.log("User: " + usrTmp)
            // console.log("UserHash: " + spData.user)
            credentials.password = result[1];
            // console.log("Psw: " + pswTmp)
            // console.log("PswHash: " + spData.password)
            this.saveConf(credentials, "./api/img-upload.php", "credentials");
            usrTmp = "";
            pswTmp = "";
            this.saveConf(spData, "./api/img-upload.php", "config");
            this.fireAlert("Username and password changed successfully!", "solidgreen");
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        spData.loginColor = hexToRgb(tempColor) + ", " + tempOpacity + ")";
        spData.loginOpacity = parseFloat(tempOpacity.replace(/,/g, "."));
        this.saveConf(spData, "./api/img-upload.php", "config");
        this.fireAlert("Changes Made!", "solidgreen");
      }
    } else {
      this.fireAlert("No changes made!", "solidblue");
    }
  }

  // SHOW MODALS

  showModal(id) {
    switch (id) {
      case "title":
        tempColW = spData.headColW;
        this.setState({
          changed: spData.headColW
        });
        // setTimeout(() => console.log("changed = ", this.state.changed), 500);

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

        tempColor = rgbToHex(spData.headColor);
        tempOpacity = spData.headOpacity.toString();
        tempTextColor = rgbToHex(spData.headTextColor);
        // console.log("Titolo Colore showModal:", this.rgbToHex(spData.headColor));
        this.setState({ titleDiaShow: true });
        break;
      case "login":
        this.setState({ loginDiaShow: true });
        break;
      case "loginEdit":
        tempColor = rgbToHex(spData.loginColor);
        tempOpacity = spData.loginOpacity.toString();
        this.setState({ loginEditDiaShow: true });
        break;
      case "menu":
        tempColor = rgbToHex(spData.menuColor);
        tempOpacity = spData.menuOpacity.toString();
        this.setState({ menuDiaShow: true });
        break;
      case "logo":
        tempColW = spData.logoColW;
        this.setState({
          changed: spData.logoColW
        });
        // setTimeout(() => console.log("changed = ", this.state.changed), 500);

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
        tempColor = rgbToHex(spData.logoColor);
        tempOpacity = spData.logoOpacity.toString();
        this.setState({ logoDiaShow: true });
        break;
      case "info":
        tempColW = spData.footInfoColW;
        this.setState({
          changed: spData.footInfoColW
        });
        // setTimeout(() => console.log("changed = ", this.state.changed), 500);

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
        tempColor = rgbToHex(spData.footInfoColor);
        tempOpacity = spData.footInfoOpacity.toString();
        tempTextColor = rgbToHex(spData.footInfoTextColor);
        this.setState({ infoDiaShow: true });
        break;
      case "addInfo":
        tempColW = spData.footAddColW;
        this.setState({
          changed: spData.footAddColW
        });
        // setTimeout(() => console.log("changed = ", this.state.changed), 500);

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
        tempColor = rgbToHex(spData.footAddColor);
        tempOpacity = spData.footAddOpacity.toString();
        tempTextColor = rgbToHex(spData.footAddTextColor);
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
        // $('#target-div').load('https://archive.org/details/arcade_tetris #theatre-ia-wrap');
        this.setState({ itemVideoDiaShow: true });
        break;
      case "search":
        this.setState({ searchDiaShow: true });
        break;
      case "back":
        tempColor = rgbToHex(spData.backgroundColor);
        tempOpacity = spData.backgroundOpacity.toString();
        tempCatColor = rgbToHex(spData.catColor);
        tempOpacity1 = spData.catOpacity.toString();
        this.setState({ backEditDiaShow: true });
        break;
      case "clock":
        tempColW = spData.clockColW;
        this.setState({
          changed: spData.clockColW
        });
        // setTimeout(() => console.log("changed = ", this.state.changed), 500);

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
        tempColor = rgbToHex(spData.clockColor);
        tempOpacity = spData.clockOpacity.toString();
        tempTextColor = rgbToHex(spData.clockTextColor);
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
        blockHide = "none";
        temp = "";
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
        temp = "";
        temp2 = "";
        blockHide = "none";
        document.getElementById('menuOpRange').value = "";
        document.getElementById('menuForm').reset();
        break;
      case "login":
        this.setState({ loginDiaShow: false });
        document.getElementById('loginForm').reset();
        break;
      case "loginedit":
        this.setState({ loginEditDiaShow: false });
        usrTmp = "";
        pswTmp = "";
        document.getElementById('loginOpRange').value = "";
        document.getElementById('loginEditForm').reset();
        break;
      case "logo":
        this.setState({ logoDiaShow: false });
        blockHide = "none";
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
        this.setState({ infoDiaShow: false });
        disable1 = "none";
        disable2 = "none";
        disable3 = "none";
        blockHide = "none";
        temp = "";
        temp2 = "";
        temp3 = "";
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
        this.setState({ addInfoDiaShow: false });
        blockHide = "none";
        temp = "";
        temp2 = "";
        temp3 = "";
        disable1 = "none";
        disable2 = "none";
        disable3 = "none";
        document.getElementById('addInfoOpRange').value = "";
        document.getElementById('creditForm').reset();
        break;
      case "itemEdit":
        this.setState({ itemEditDiaShow: false });
        inPos = "";
        cgPos = "";
        temp2 = "";
        temp3 = "";
        temp4 = tempItemVideo;
        temp5 = tempCatTitle;
        temp6 = "";
        noDescr = tempHideDescr;
        blockHide = "none";
        temp = "";
        document.getElementById('itemEditForm').reset();
        break;
      case "itemDel":
        blockHide = "none";
        this.setState({ itemDelDiaShow: false });
        break;
      case "itemAdd":
        this.setState({ itemAddDiaShow: false });
        inPos = "";
        temp = "";
        temp2 = "";
        temp3 = "";
        temp4 = "";
        temp6 = "";
        blockHide = "none";
        temp5 = tempCatTitle;
        this.setState({ disFieldIA: true });
        document.getElementById('itemAddForm').reset();
        break;
      case "catedit":
        this.setState({ catEditDiaShow: false });
        document.getElementById('catEditForm').reset();
        temp2 = "";
        inPos = "";
        cgPos = "";
        fileImg = null;
        blockHide = "none";
        break;
      case "catdel":
        blockHide = "none";
        this.setState({ catDelDiaShow: false });
        break;
      case "catadd":
        this.setState({ catAddDiaShow: false });
        temp2 = "";
        temp = "";
        blockHide = "none";
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
        temp = "";
        temp2 = "";
        temp3 = "";
        temp4 = "";
        cgPos = "";
        inPos = "";
        document.getElementById('crsEditForm').reset();
        break;
      case "crsdel":
        this.setState({ crsDelDiaShow: false });
        break;
      case "crsadd":
        this.setState({ crsAddDiaShow: false });
        temp = "";
        temp2 = "";
        temp3 = "";
        temp4 = "";
        cgPos = "";
        inPos = "";
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
        this.setState({ backEditDiaShow: false });
        disable1 = "none";
        disable2 = "none";
        categoryFirst = "none";
        fileCatImg = null;
        fileImg = null;
        document.getElementById('catOpRange').value = "";
        document.getElementById('backOpRange').value = "";
        document.getElementById('backEditForm').reset();
        break;
      case "clock":
        this.setState({ clockDiaShow: false });
        blockHide = "none";
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
        this.setState({
          activityChanged: false
        });
        break;
      default:
      // will NOT execute because of the line preceding the switch.
    }
    tempColor = "";
    tempTextColor = "";
    tempColW = "";
    temp3 = "";
    temp4 = "";
    fileCatImg = null;
    fileImg = null;
    changeFlag = false;
    // To Fix Search Button Enable after Video Play

    // this.setState({
    //   activityChanged: false
    // });
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
        tempHideDescr = array[i].hideDescr;
        tempItemHide = array[i].hidden;
        // console.log("Item Hide: ", tempItemHide);
        // console.log("HideBlock: ", blockHide);
        if (tempHideDescr === true) {
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
        // console.log(" Category: ", tempCatTitle);
        // console.log(" BlockHide: ", blockHide);
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
    console.log("CatName: ", temp5);
    this.itemCatSel(catName, spData.items);
    changeFlag = true;
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
          refresh={this.state.refresh} drpIsOpen={dropDownIsOpen} oClickDrpIO={() => dropDownIsOpen = !dropDownIsOpen} />
      </>
    );

    let eCatMenuButtons = (
      <DropdownCat items={this.state.cats} catName={this.state.catSel} id="editCatMenuButton"
        setCat={this.setCat} refresh={this.state.refresh} drpIsOpen={catDropDownIsOpen}
        oClickDrpIO={() => catDropDownIsOpen = !catDropDownIsOpen} />
    )

    let aCatMenuButtons = (
      <DropdownCat items={this.state.cats} catName={this.state.catSel} id="addCatMenuButton"
        setCat={this.setCat} refresh={this.state.refresh} drpIsOpen={catDropDownIsOpen}
        oClickDrpIO={() => catDropDownIsOpen = !catDropDownIsOpen} />
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
                  catCont={() => this.catCont(i)} itemHide={hidden} hidden={hidden} />
              )
            })
          }
          {/* APPS */}
          {
            this.state.rootItems.map(({ id, title, link, descr, hideDescr, cat, icon, video, hidden }, i) => {
              return (
                <Item showItemsBtn={this.state.itemsBtnShow} key={i} pos={i} id={id}
                  title={title} link={link} descr={descr} hideDescr={hideDescr} cat={cat} icon={icon} video={video}
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
            this.state.rootItems.map(({ id, title, link, descr, hideDescr, cat, icon, video, hidden }, i) => {
              return (
                <Item showItemsBtn={this.state.itemsBtnShow} key={i} pos={i} id={id}
                  title={title} link={link} descr={descr} hideDescr={hideDescr} cat={cat} icon={icon} video={video}
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
                  catCont={() => this.catCont(i)} itemHide={hidden} hidden={hidden} />
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
          <section className="row">
            {/* VERSIONE */}
            <div title="SoylentApp v1.6.6"
              className="col mt-2 version latoplain d-flex justify-content-end align-items-center"
              onClick={() => window.open("https://github.com/karlellis/SoylentApp")}>
              <b>SoylentApp</b>
            </div>
            <div title="SoylentApp v1.6.6"
              className="col mt-2 version latoplain d-flex justify-content-start align-items-center"
              onClick={() => window.open("https://github.com/karlellis/SoylentApp")}>
              v1.6.6
            </div>
          </section>
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
              saveLabel="Login">
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
                                ref={(input) => { this.userChangeInput = input; }} onChange={e => {
                                  usrTmp = e.target.value;
                                  changeFlag = true;
                                }} autocomplete="off" />
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
                              <input type="password" autocomplete="new-password" className="form-control border-0" onChange={e => {
                                pswTmp = e.target.value;
                                changeFlag = true;
                              }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Back color */}
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.loginColor}
                          rgbToHex={rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
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
                          rgbToHex={rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.menuOpacity} id="menuOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.menuShow}
                      switchClick={e => {
                        if (spData.menuShow === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                      }}>
                    </InputHideBlocks>
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
                      valAuto="col" valCol1="col-1" valCol2="col-2" valCol3="col-3" valCol4="col-4" valCol5="col-5"
                      tempoColW={e => { tempColW = e.target.value; }} tColW={this.state.changed}>
                    </InputWidth>
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.headColor}
                          rgbToHex={rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                        <div className="col-1"></div>
                        <InputTextColor textColor={spData.headTextColor} rgbToHex={rgbToHex}
                          tempo={e => { tempTextColor = e.target.value; }}>
                        </InputTextColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.headOpacity} id="titleOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.titleShow}
                      switchClick={e => {
                        if (spData.titleShow === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                      }}>
                    </InputHideBlocks>
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
                      valAuto="col-md" valCol1="col-md-1" valCol2="col-md-2" valCol3="col-md-3" valCol4="col-md-4" valCol5="col-md-5"
                      tempoColW={e => { tempColW = e.target.value; }} tColW={this.state.changed}>
                    </InputWidth>
                    {/* Back & Text colors */}
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.clockColor}
                          rgbToHex={rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                        <div className="col-1"></div>
                        <InputTextColor textColor={spData.clockTextColor} rgbToHex={rgbToHex}
                          tempo={e => { tempTextColor = e.target.value; }}>
                        </InputTextColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.clockOpacity} id="clockOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.clockShow}
                      switchClick={e => {
                        if (spData.clockShow === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                      }}>
                    </InputHideBlocks>
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
                    <InputFile fileIn={e => { fileImg = e.target.files[0]; }}></InputFile>
                    <InputWidth idAuto="logoColAuto" idCol1="logoCol1" idCol2="logoCol2" idCol3="logoCol3" idCol4="logoCol4" idCol5="logoCol5"
                      valAuto="col" valCol1="col-1" valCol2="col-2" valCol3="col-3" valCol4="col-4" valCol5="col-5"
                      tempoColW={e => { tempColW = e.target.value; }} tColW={this.state.changed}>
                    </InputWidth>
                    {/* Back color */}
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.logoColor}
                          rgbToHex={rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.logoOpacity} id="logoOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.logoShow}
                      switchClick={e => {
                        if (spData.logoShow === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                      }}>
                    </InputHideBlocks>
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
                      valAuto="col" valCol1="col-1" valCol2="col-2" valCol3="col-3" valCol4="col-4" valCol5="col-5"
                      tempoColW={e => { tempColW = e.target.value; }} tColW={this.state.changed}>
                    </InputWidth>
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.footInfoColor}
                          rgbToHex={rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                        <div className="col-1"></div>
                        <InputTextColor textColor={spData.footInfoTextColor} rgbToHex={rgbToHex}
                          tempo={e => { tempTextColor = e.target.value; }}>
                        </InputTextColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.footInfoOpacity} id="infoOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.infoShow}
                      switchClick={e => {
                        if (spData.infoShow === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                      }}>
                    </InputHideBlocks>
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
                      valAuto="col-md" valCol1="col-md-1" valCol2="col-md-2" valCol3="col-md-3" valCol4="col-md-4" valCol5="col-md-5"
                      tempoColW={e => { tempColW = e.target.value; }} tColW={this.state.changed}>
                    </InputWidth>
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <InputBackColor bcLabel="Back color" backColor={spData.footAddColor}
                          rgbToHex={rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
                        <div className="col-1"></div>
                        <InputTextColor textColor={spData.footAddTextColor} rgbToHex={rgbToHex}
                          tempo={e => { tempTextColor = e.target.value; }}>
                        </InputTextColor>
                      </div>
                    </div>
                    <InputOpacity opacity={spData.footAddOpacity} id="addInfoOpRange" tempo={e => tempOpacity = e.target.value}></InputOpacity>
                    <InputHideBlocks hideSwitch={spData.addInfoShow}
                      switchClick={e => {
                        if (spData.addInfoShow === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                      }}>
                    </InputHideBlocks>
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
                              <input type="file" disabled={disFieldB} id="files" className="form-control boxs border-0" name="icon"
                                onChange={e => {
                                  fileImg = e.target.files[0];
                                  changeFlag = true;
                                }} />
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
                                  };
                                  changeFlag = true;
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
                              <input type="file" disabled={disFieldBC} id="catfiles" className="form-control boxs border-0" name="icon"
                                onChange={e => {
                                  fileCatImg = e.target.files[0];
                                  changeFlag = true;
                                }} />
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
                                  };
                                  changeFlag = true;
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
                          rgbToHex={rgbToHex} tempo={e => tempColor = e.target.value}></InputBackColor>
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
                                  <input type="range" className="form-range border-0 p-0" min="0" max="200" step="10" list="tickmarks" defaultValue={spData.backgroundOpacity} id="backOpRange"
                                    onChange={e => {
                                      tempOpacity = e.target.value;
                                      changeFlag = true;
                                    }} >
                                  </input>
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
                          rgbToHex={rgbToHex} tempo={e => tempCatColor = e.target.value}></InputBackColor>
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
                      this.state.catItems.map(({ id, title, link, descr, hideDescr, cat, icon, video, hidden }, i) => {
                        return (
                          <Item showItemsBtn={this.state.itemsBtnShow} key={i} pos={i} id={id}
                            title={title} link={link} descr={descr} hideDescr={hideDescr} cat={cat} icon={icon} video={video}
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
                    <InputFile fileIn={e => { fileImg = e.target.files[0]; }} ></InputFile>
                    <InputPosition edit="Edit Item" pos={this.state.cPos}
                      tempo={e => { cgPos = e.target.value; }} id="clearitemswitchpos" >
                    </InputPosition>
                    <InputTitle label="Title" edit="Edit Item" tempTitle={tempItemTitle}
                      tempo={e => temp2 = e.target.value} >
                    </InputTitle>
                    <InputLink edit="Edit Item" tempLink={tempItemLink}
                      tempo={e => { temp3 = e.target.value; }} >
                    </InputLink>
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
                        // changeFlag = true;
                      }}
                      title={tempItemDescr}
                      hideSwitch={tempHideDescr}
                      tempo={e => {
                        temp6 = e.target.value
                        // changeFlag = true;
                      }}>
                    </InputInfos>
                    <InputVideo tmpVideo={tempItemVideo}
                      tempo={e => {
                        if (tempItemVideo === false) {
                          temp4 = true;
                        } else {
                          temp4 = false;
                        }
                        // changeFlag = true;
                      }}>
                    </InputVideo>
                    <InputSwitch hSwitch={tempItemHide}
                      dSwitch={e => {
                        if (tempItemHide === false) {
                          blockHide = true;
                        } else {
                          blockHide = false;
                        }
                        // changeFlag = true;
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
              handleClose={() => this.hideModal("itemAdd")} handleSave={() => this.applyItemAdd()}
              saveLabel="Add">
              <div className="modal-content noborder">
                <ModalTitle title="Add Item"></ModalTitle>
                <div className="modal-body">
                  <form id="itemAddForm">
                    <InputFile fileIn={e => { fileImg = e.target.files[0]; }} ></InputFile>
                    {/* Position */}
                    <InputPosition edit="Add Item" pos={currPos}
                      tempo={e => { temp = e.target.value; }} id="clearitempos" >
                    </InputPosition>
                    {/* Title */}
                    <InputTitle label="Title" edit="Add Item" id="clearitemtitle"
                      tempo={e => temp2 = e.target.value}>
                    </InputTitle>
                    {/* Link */}
                    <InputLink edit="Add Item" id="clearitemlink"
                      tempo={e => { temp3 = e.target.value; }}>
                    </InputLink>
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
                    <InputVideo tmpVideo={tempItemVideo}
                      tempo={e => {
                        if (tempItemVideo === false) {
                          temp4 = true;
                        } else {
                          temp4 = false;
                        }
                      }}>
                    </InputVideo>
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
                    <div className="form-group">
                      <div className="row mb-1 m-auto">
                        <div className="col">
                          <div className="row border">
                            <div className="col pt-1 pb-1 padlr latomenu d-flex flex-column justify-content-center align-items-center">
                              <label>Category</label>
                            </div>
                            <div className="col d-flex flex-column justify-content-center align-items-center">
                              {tempCatTitle}
                              {/* {catMenuB} */}
                            </div>
                          </div>
                        </div>
                        <div className="col-1"></div>
                        <div className="col">
                        </div>
                      </div>
                    </div>
                    {/* <InputCat catMenuB={aCatMenuButtons}></InputCat> */}
                    <Alert alertShow={this.state.alertShow} alertMsg={this.state.alertMsg} alertCol={this.state.alertCol}></Alert>
                  </form>
                </div>
              </div>
            </EleDialog>
            {/* ITEM DEL DIALOG */}
            <EleDialog mainTheme="modal-main" footTheme="modal-footer" hideMidBtn={true} hideApply={false} hideClose={false}
              activityChanged={this.state.activityChanged} eleDiaShow={this.state.itemDelDiaShow}
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
                    <InputFile fileIn={e => { fileImg = e.target.files[0]; }}></InputFile>
                    <InputPosition edit="Edit Item" pos={currPos}
                      tempo={e => { cgPos = e.target.value; }} id="clearcatswitchpos" >
                    </InputPosition>
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
                    <InputFile fileIn={e => { fileImg = e.target.files[0]; }}></InputFile>
                    <InputPosition edit="Add Item" id="clearcatpos"
                      tempo={e => { temp = e.target.value; }}>
                    </InputPosition>
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
              activityChanged={this.state.activityChanged} eleDiaShow={this.state.catDelDiaShow}
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
                    <InputPosition edit="Add Item" id="clearcrspos"
                      tempo={e => { temp = e.target.value; }}>
                    </InputPosition>
                    <InputTitle label="Title" edit="Add Item" id="clearcrstitle"
                      tempo={e => temp2 = e.target.value}>
                    </InputTitle>
                    <InputLink edit="Add Item" id="clearcrslink"
                      tempo={e => { temp3 = e.target.value; }}>
                    </InputLink>
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
                    <InputPosition edit="Edit Item" pos={currPos} id="clearcrsswitchpos"
                      tempo={e => { cgPos = e.target.value; }}>
                    </InputPosition>
                    <InputTitle label="Title" edit="Edit Item" tempTitle={tempCrsTitle}
                      tempo={e => temp2 = e.target.value}>
                    </InputTitle>
                    <InputLink edit="Edit Item" tempLink={tempCrsLink}
                      tempo={e => { temp3 = e.target.value; }}>
                    </InputLink>
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
                        this.state.resItems.map(({ id, title, link, descr, hideDescr, icon, video, hidden }, i) => {
                          return (
                            <Item key={i} pos={i} id={id}
                              title={title} link={link} descr={descr} hideDescr={hideDescr} cat={"Search"} icon={icon} video={video}
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
                      </div>
                      <div className="col-md latotitle d-flex flex-column justify-content-center align-items-center">
                        <center>"{tempItemTitle}"</center>
                      </div>
                      <div className="col-md-3">
                        {/* <button onClick={e => {
                          console.log("FullScreen Requested!")
                          var el = document.getElementById("myvideo");
                          if (el.requestFullscreen) {
                            el.requestFullscreen();
                          } else if (el.msRequestFullscreen) {
                            el.msRequestFullscreen();
                          } else if (el.mozRequestFullScreen) {
                            el.mozRequestFullScreen();
                          } else if (el.webkitRequestFullscreen) {
                            el.webkitRequestFullscreen();
                          }
                        }}>
                          [ ]
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-body align-items-center darkBG">
                  <center>
                    <iframe id="myvideo" class="iframeStyle"
                      src={this.state.videoLink} frameborder="0"
                      allowfullscreen="true" title="videoFrame">
                    </iframe>
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